"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { enquiryServiceOptions } from "@/data/content";
import { buildMailtoUrl, buildWhatsAppUrl, site } from "@/data/site";

/*
 * Enquiry form — plain React state validation.
 *
 * The previous react-hook-form + zod + resolver stack (~25 KB gz of JS
 * for five fields) was replaced by a ~1 KB validator that reproduces the
 * exact same field rules, messages, submit-time validation and
 * live-revalidation-after-first-attempt behaviour, so the form works
 * and feels identical while the initial bundle gets much lighter.
 */

interface ContactFormValues {
  name: string;
  email: string;
  business: string;
  service: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMPTY_VALUES: ContactFormValues = {
  name: "",
  email: "",
  business: "",
  service: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const business = values.business.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your full name";
  } else if (name.length < 2) {
    errors.name = "Please enter your full name";
  } else if (name.length > 120) {
    errors.name = "Please keep your name under 120 characters";
  }

  if (!email) {
    errors.email = "Please enter a valid email address";
  } else if (email.length > 200 || !EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (business.length > 160) {
    errors.business = "Please keep the business name under 160 characters";
  }

  if (!values.service.trim()) {
    errors.service = "Please choose the service you need";
  }

  if (!message) {
    errors.message = "Please describe your project in at least 10 characters";
  } else if (message.length < 10) {
    errors.message = "Please describe your project in at least 10 characters";
  } else if (message.length > 4000) {
    errors.message = "Please describe your project in under 4000 characters";
  }

  return errors;
}

/** Structured enquiry message shared by the WhatsApp and email channels. */
function buildEnquiryMessage(values: ContactFormValues): string {
  return [
    site.whatsappPrefill,
    "",
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    values.business.trim() ? `Business: ${values.business.trim()}` : null,
    `Service required: ${values.service.trim()}`,
    "",
    "Project details:",
    values.message.trim(),
  ]
    .filter((line) => line !== null)
    .join("\n");
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /** Update a field; after the first submit attempt, revalidate live. */
  function updateField<K extends keyof ContactFormValues>(
    field: K,
    value: string,
  ) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (attempted) setErrors(validate(next));
  }

  async function submitEnquiry() {
    setSubmitting(true);
    try {
      // 1. Save the enquiry to the studio database (best effort — never blocks contact).
      try {
        await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            business: values.business.trim(),
            service: values.service.trim(),
            message: values.message.trim(),
          }),
        });
      } catch (error) {
        console.warn("Enquiry could not be saved, continuing with WhatsApp:", error);
      }

      // 2. Open WhatsApp with the enquiry pre-filled. Nothing is sent until the
      //    visitor presses send inside WhatsApp — honest, working fallback.
      window.open(buildWhatsAppUrl(buildEnquiryMessage(values)), "_blank", "noopener");

      toast.success("Your enquiry is ready to send", {
        description:
          "WhatsApp is opening with your details pre-filled. Just review and press send.",
      });

      setValues(EMPTY_VALUES);
      setErrors({});
      setAttempted(false);
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await submitEnquiry();
  }

  function sendByEmail() {
    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please complete the highlighted fields first.");
      return;
    }
    window.location.href = buildMailtoUrl(
      `Project Enquiry: ${values.service.trim()}`,
      buildEnquiryMessage(values),
    );
  }

  return (
    <section id="contact" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          label="Contact"
          title="Let's Build Something That Helps Your Business Grow."
          description="Tell me about your business, your current challenges and the digital solution you're looking for."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ---------------- contact info card ---------------- */}
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl bg-forest p-8 text-ivory shadow-[0_24px_60px_-28px_rgba(7,59,43,0.55)] sm:p-10">
              <span className="block h-px w-10 bg-gold" aria-hidden="true" />
              <h3 className="mt-6 font-serif text-2xl font-semibold sm:text-3xl">
                {site.founder}
              </h3>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-gold-light">
                CEO &amp; Founder, M-WebCraft Studio
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <li>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/55">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-flex items-center gap-2.5 font-medium text-ivory transition-colors hover:text-gold-light"
                  >
                    <Mail className="size-4 shrink-0 text-gold-light" aria-hidden="true" />
                    {site.email}
                  </a>
                </li>
                <li>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/55">
                    WhatsApp
                  </p>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2.5 font-medium text-ivory transition-colors hover:text-gold-light"
                  >
                    <MessageCircle className="size-4 shrink-0 text-gold-light" aria-hidden="true" />
                    {site.phoneDisplay}
                  </a>
                </li>
                <li>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/55">
                    Location
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2.5 font-medium text-ivory">
                    <MapPin className="size-4 shrink-0 text-gold-light" aria-hidden="true" />
                    Nigeria, working remotely with clients worldwide
                  </p>
                </li>
              </ul>

              <div className="mt-auto space-y-3 pt-10">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-ivory hover:text-forest"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Chat With Me on WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Project Enquiry: M-WebCraft Studio")}`}
                  className="flex items-center justify-center gap-2.5 rounded-full border border-ivory/35 px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-forest"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Send Me an Email
                </a>
              </div>
            </div>
          </Reveal>

          {/* ---------------- enquiry form card ---------------- */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-border bg-white p-8 shadow-[0_18px_44px_-24px_rgba(7,59,43,0.25)] sm:p-10">
              <h3 className="font-serif text-2xl font-semibold text-forest">
                Start Your Project Enquiry
              </h3>
              <p className="mt-2 text-sm text-charcoal/70">
                Fill in the form and WhatsApp will open with your enquiry
                pre-filled, so you stay in control of when it&apos;s sent.
              </p>

              <form
                onSubmit={onSubmit}
                className="mt-8 space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-name" className="text-sm font-semibold text-charcoal">
                      Full name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Adaeze Johnson"
                      aria-invalid={!!errors.name}
                      className="mt-2 rounded-xl border-input bg-ivory/70 px-4 py-3 focus-visible:ring-gold"
                      value={values.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                    <FieldError message={errors.name} />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-sm font-semibold text-charcoal">
                      Email address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@yourbusiness.com"
                      aria-invalid={!!errors.email}
                      className="mt-2 rounded-xl border-input bg-ivory/70 px-4 py-3 focus-visible:ring-gold"
                      value={values.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                    <FieldError message={errors.email} />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-business" className="text-sm font-semibold text-charcoal">
                      Business name{" "}
                      <span className="text-charcoal/45">(optional)</span>
                    </Label>
                    <Input
                      id="contact-business"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your business name"
                      className="mt-2 rounded-xl border-input bg-ivory/70 px-4 py-3 focus-visible:ring-gold"
                      value={values.business}
                      onChange={(e) => updateField("business", e.target.value)}
                    />
                    <FieldError message={errors.business} />
                  </div>
                  <div>
                    <Label htmlFor="contact-service" className="text-sm font-semibold text-charcoal">
                      Service required <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={values.service}
                      onValueChange={(value) => updateField("service", value)}
                    >
                      <SelectTrigger
                        id="contact-service"
                        aria-invalid={!!errors.service}
                        className="mt-2 w-full rounded-xl border-input bg-ivory/70 px-4 py-3 text-left data-[placeholder]:text-muted-foreground focus-visible:ring-gold"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border">
                        {enquiryServiceOptions.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="rounded-lg focus:text-forest"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError message={errors.service} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-message" className="text-sm font-semibold text-charcoal">
                    Project description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me about your business, what you offer, the challenges you're facing and the solution you have in mind…"
                    aria-invalid={!!errors.message}
                    className="mt-2 resize-y rounded-xl border-input bg-ivory/70 px-4 py-3 focus-visible:ring-gold"
                    value={values.message}
                    onChange={(e) => updateField("message", e.target.value)}
                  />
                  <FieldError message={errors.message} />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gold py-4 text-xs font-bold uppercase tracking-[0.14em] text-espresso hover:bg-forest hover:text-ivory"
                >
                  {submitting ? (
                    "Preparing your enquiry…"
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden="true" />
                      Submit Enquiry
                    </>
                  )}
                </Button>

                <p className="text-center text-xs leading-relaxed text-charcoal/55">
                  Submitting opens WhatsApp with your enquiry details
                  pre-filled. Nothing is sent until you press send in
                  WhatsApp. Enquiries may also be stored in the studio&apos;s
                  enquiry log.
                </p>

                <button
                  type="button"
                  onClick={sendByEmail}
                  className="mx-auto flex items-center justify-center gap-2 rounded-full border border-forest/25 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:bg-forest hover:text-ivory"
                >
                  <Mail className="size-3.5" aria-hidden="true" />
                  Send by email instead
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
