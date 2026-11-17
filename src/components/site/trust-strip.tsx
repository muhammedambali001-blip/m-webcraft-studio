import { Reveal } from "./reveal";
import { services } from "@/data/content";

/**
 * Trust strip: the five service pillars + the brand promise statement.
 * Sits directly under the hero.
 */
export function TrustStrip() {
  return (
    <section aria-label="Services overview" className="border-y border-border/70 bg-white">
      {/* service strip */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {services.map((service) => (
            <li
              key={service.id}
              className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-forest/80 sm:text-xs"
            >
              <service.icon className="size-4 text-gold-deep" aria-hidden="true" />
              {service.title
                .replace("Professional ", "")
                .replace("Affordable ", "")}
            </li>
          ))}
        </ul>
      </div>

      {/* brand promise */}
      <div className="border-t border-border/60 bg-ivory/60">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:py-16">
          <Reveal>
            <span className="mx-auto block h-px w-12 bg-gold" aria-hidden="true" />
            <p className="mt-6 font-serif text-2xl font-semibold leading-snug text-forest sm:text-3xl">
              Your business deserves more than just an online presence.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal/75 sm:text-lg">
              It deserves a website that clearly communicates what you offer,
              builds trust and makes it easy for potential customers to contact
              you.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
