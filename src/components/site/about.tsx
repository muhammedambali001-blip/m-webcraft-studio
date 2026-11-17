import Image from "next/image";
import { Reveal } from "./reveal";

/**
 * About section — the person behind the studio.
 * Reuses the uploaded photograph with a different crop and layout.
 */
export function About() {
  return (
    <section id="about" className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14 lg:px-8 lg:py-28">
        {/* photo */}
        <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-3xl border border-gold/45"
          />
          <figure className="relative aspect-square overflow-hidden rounded-3xl border-[6px] border-white shadow-[0_24px_60px_-28px_rgba(53,37,29,0.5)]">
            <Image
              src="/muhammed-ambali-about.jpg"
              alt="Muhammed Ambali, Website Designer and AI Developer, in his studio portrait wearing a dark brown three-piece suit"
              fill
              sizes="(min-width: 1024px) 36vw, 92vw"
              className="object-cover object-top"
            />
          </figure>
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -right-3 rounded-2xl bg-forest px-5 py-3 text-ivory shadow-lg"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light">
              Website Designer
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-ivory/80">
              &amp; AI Developer
            </p>
          </div>
        </Reveal>

        {/* content */}
        <Reveal delay={0.1} className="mt-16 lg:mt-0">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
            <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
            About Muhammed Ambali
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-[1.15] text-forest sm:text-4xl">
            The Person Behind M-WebCraft Studio.
          </h2>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-charcoal/80">
            <p>
              Many businesses offer excellent products and services, but still
              struggle to get more customer enquiries online. Sometimes,
              customers cannot easily find the information they need, understand
              what a business offers, or contact the business. An outdated
              website or lack of an online presence can make this even harder.
            </p>
            <p className="font-serif text-xl italic text-espresso sm:text-2xl">
              That&apos;s where I come in.
            </p>
            <p>
              I&apos;m{" "}
              <span className="font-bold text-forest">Muhammed Ambali</span>, a
              Website Designer and AI Developer, and the CEO and Founder of
              M-WebCraft Studio. I help small businesses build professional
              websites, use AI chatbots, and automate simple business tasks so
              they can attract enquiries, serve customers better, and save time.
            </p>
            <p>
              My focus is on creating practical digital solutions that help
              businesses present themselves professionally and make it easier
              for potential customers to take action.
            </p>
          </div>

          {/* signature */}
          <div className="mt-8 border-l-2 border-gold pl-5">
            <p className="font-serif text-2xl italic text-forest">
              Muhammed Ambali
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-charcoal/60">
              CEO &amp; Founder, M-WebCraft Studio
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
