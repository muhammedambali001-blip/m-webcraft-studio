import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { processSteps } from "@/data/content";

/**
 * Four-step process — horizontal timeline on desktop, vertical on mobile.
 * Dark forest background for a strong mid-page rhythm change.
 */
export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-forest">
      {/* subtle decorative serif M watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-24 select-none font-serif text-[22rem] font-bold leading-none text-ivory/[0.04]"
      >
        M
      </span>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          dark
          label="How I Work"
          title="A Simple Process. Practical Digital Solutions."
          description="From the first conversation to launch day, you always know what is happening and what comes next."
        />

        <ol className="relative mt-16 space-y-12 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-y-0">
          {/* connector lines */}
          <span
            aria-hidden="true"
            className="absolute inset-y-6 left-[27px] w-px bg-gold/30 lg:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gold/30 lg:block"
          />

          {processSteps.map((step, index) => (
            <li
              key={step.number}
              className="relative pl-20 lg:pl-0"
            >
              <Reveal delay={index * 0.1}>
                <span className="absolute left-0 top-0 flex size-14 items-center justify-center rounded-full border-2 border-gold bg-forest-deep font-serif text-lg font-semibold text-gold-light shadow-[0_0_0_6px_rgba(7,59,43,1)] lg:static lg:shadow-none">
                  {step.number}
                </span>
                <div className="lg:mt-6">
                  <h3 className="flex items-center gap-2.5 font-serif text-xl font-semibold text-ivory">
                    <step.icon className="size-5 text-gold-light" aria-hidden="true" />
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/70">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-espresso transition-colors hover:bg-ivory hover:text-forest"
          >
            Begin With a Conversation
          </a>
        </Reveal>
      </div>
    </section>
  );
}
