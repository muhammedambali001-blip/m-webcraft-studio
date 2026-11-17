import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { whyPoints } from "@/data/content";
import { site } from "@/data/site";

/**
 * Why Choose M-WebCraft Studio — seven grounded reasons, no invented claims.
 */
export function WhyMe() {
  const [sixPoints, seventh] = [
    whyPoints.slice(0, 6),
    whyPoints[6],
  ];

  return (
    <section id="why" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          label="Why Work With Me"
          title="Why Choose M-WebCraft Studio?"
          description={site.brandMessage}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sixPoints.map((point, index) => (
            <Reveal key={point.title} delay={(index % 3) * 0.08}>
              <div className="flex h-full gap-4 rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_14px_32px_-16px_rgba(7,59,43,0.25)]">
                <span
                  aria-hidden="true"
                  className="font-serif text-2xl font-semibold leading-none text-gold-deep/80"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold leading-snug text-forest">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">
                    {point.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* seventh point as a forest CTA card */}
          <Reveal delay={0.16}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-forest p-6 text-ivory">
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="font-serif text-2xl font-semibold leading-none text-gold-light"
                >
                  07
                </span>
                <div>
                  <h3 className="font-semibold leading-snug text-ivory">
                    {seventh.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                    {seventh.detail}
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-gold-light transition-all hover:gap-3"
              >
                Start a conversation
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
