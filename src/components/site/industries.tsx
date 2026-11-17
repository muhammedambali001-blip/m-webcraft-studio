import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { industries, industriesIntro } from "@/data/content";

/**
 * "Businesses I Help" — the types of businesses Muhammed works with.
 * Intentionally does NOT claim completed projects for every industry.
 */
export function Industries() {
  return (
    <section id="who-i-work-with" className="bg-ivory-dark/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          label="Who I Work With"
          title="Businesses I Help."
          description={industriesIntro}
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, index) => (
            <Reveal key={industry.label} delay={(index % 4) * 0.06}>
              <li className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_14px_32px_-16px_rgba(7,59,43,0.25)]">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-forest/8 text-forest transition-colors group-hover:bg-gold group-hover:text-espresso">
                  <industry.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold leading-snug text-charcoal">
                  {industry.label}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
