import { MessageCircle } from "lucide-react";
import { Reveal } from "./reveal";
import { buildWhatsAppUrl } from "@/data/site";

/**
 * Final conversion band before the footer.
 */
export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-forest">
      {/* decorative watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 bottom-[-9rem] select-none font-serif text-[20rem] font-bold leading-none text-ivory/[0.05]"
      >
        M
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-24">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
            <span className="h-px w-8 bg-gold-light/70" aria-hidden="true" />
            Let&apos;s Work Together
            <span className="h-px w-8 bg-gold-light/70" aria-hidden="true" />
          </p>
          <h2
            id="final-cta-heading"
            className="mt-5 font-serif text-3xl font-semibold leading-[1.15] text-ivory sm:text-4xl lg:text-[2.9rem]"
          >
            Your Next Business Website Starts Here.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ivory/75 sm:text-lg">
            Whether you need a professional website, a redesign, an AI chatbot
            or business automation, let&apos;s discuss how I can help.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-ivory hover:text-forest sm:w-auto"
            >
              Start a Project
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-ivory/40 px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-forest sm:w-auto"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
