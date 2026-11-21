"use client";

import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { services } from "@/data/content";

/**
 * Five premium service cards + a CTA card.
 * "Learn more" opens the M-WebCraft Assistant pre-loaded with a question
 * about that service, a live demonstration of the chatbot offering.
 */
export function Services() {
  const askAbout = (question: string) => {
    window.dispatchEvent(
      new CustomEvent("mwebcraft:ask", { detail: question }),
    );
  };

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          label="My Services"
          title="What I Can Do for Your Business."
          description="Practical website design, AI and automation services, each one aimed at helping your business attract more customer enquiries."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={(index % 3) * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_44px_-18px_rgba(7,59,43,0.28)] sm:p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gold/12 text-forest transition-colors group-hover:bg-forest group-hover:text-gold-light">
                  <service.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-forest">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
                  {service.description}
                </p>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-deep">
                  {service.listLabel}
                </p>
                <ul className="mt-2.5 space-y-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-charcoal/80"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold-deep"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => askAbout(service.askQuestion)}
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-bold text-forest transition-all hover:gap-3 hover:text-gold-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  aria-label={`Learn more about ${service.title}. Opens the M-WebCraft Assistant`}
                >
                  Learn more
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          ))}

          {/* CTA card completing the grid */}
          <Reveal delay={0.16}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-forest p-7 text-ivory shadow-[0_18px_44px_-18px_rgba(7,59,43,0.45)]">
              <div>
                <span
                  className="block h-px w-10 bg-gold"
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-serif text-2xl font-semibold leading-snug">
                  Have a project in mind?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">
                  Let&apos;s discuss the right solution for your business.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-ivory hover:text-forest"
              >
                Start a Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
