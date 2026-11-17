import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./reveal";
import { faqs } from "@/data/content";
import { buildWhatsAppUrl } from "@/data/site";

/**
 * Interactive FAQ accordion + a direct WhatsApp escape hatch.
 */
export function Faq() {
  return (
    <section id="faqs" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:px-8 lg:py-28">
        {/* left heading column */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            FAQs
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] text-forest sm:text-4xl">
            Frequently Asked Questions.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal/75">
            Quick answers to the questions business owners ask most about
            working with M-WebCraft Studio.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-ivory p-6">
            <p className="text-sm font-semibold text-forest">
              Still have a question?
            </p>
            <p className="mt-1.5 text-sm text-charcoal/70">
              Muhammed replies personally on WhatsApp.
            </p>
            <a
              href={buildWhatsAppUrl(
                "Hello Muhammed, I have a question about your services.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-gold hover:text-espresso"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>

        {/* accordion */}
        <Reveal delay={0.1} className="mt-12 lg:mt-0">
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-white px-6 shadow-[0_10px_36px_-20px_rgba(7,59,43,0.2)]"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="border-border/80 last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg font-semibold text-forest hover:no-underline hover:text-gold-deep [&>svg]:text-gold-deep">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-charcoal/75">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
