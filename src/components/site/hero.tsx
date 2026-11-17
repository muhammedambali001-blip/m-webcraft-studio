import Image from "next/image";
import { ArrowRight } from "lucide-react";

/*
 * Hero — the first screen. Everything here is server-rendered and fully
 * visible at first paint: no opacity/entrance gate and no JavaScript.
 * (Lighthouse lab evidence showed that animating above-fold content from
 * opacity 0 makes the real largest element LCP-ineligible and delays the
 * first screen, so the hero renders instantly while the premium scroll
 * reveals are kept for the sections below the fold.)
 */
export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ivory">
      {/* soft warm glow behind the portrait side */}
      <div
        aria-hidden="true"
        className="warm-glow pointer-events-none absolute -top-24 right-[-10%] h-[46rem] w-[46rem]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:grid lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-28 lg:pt-36">
        {/* ------------------------------ LEFT ------------------------------ */}
        <div className="max-w-2xl">
          <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.22em] text-forest/75">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            M-WebCraft Studio
            <span className="text-gold" aria-hidden="true">|</span>
            Website Design &amp; AI Solutions
          </p>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.12] text-forest sm:text-5xl sm:leading-[1.08] lg:text-[3.6rem]">
            Websites That Turn Visitors Into{" "}
            <em className="text-gold-deep">Customer Enquiries.</em>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
            I help businesses build professional websites, use AI chatbots and
            automate simple business tasks so they can attract enquiries, serve
            customers better and save time.
          </p>

          <div className="mt-7 flex items-center gap-4 rounded-2xl border border-espresso/10 bg-white/80 p-4 pr-6 shadow-sm backdrop-blur-sm">
            <Image
              src="/muhammed-ambali-about.webp"
              alt=""
              aria-hidden="true"
              width={803}
              height={794}
              sizes="48px"
              loading="eager"
              className="size-12 shrink-0 rounded-full border border-gold/40 object-cover object-top"
            />
            <p className="text-sm leading-relaxed text-charcoal/85">
              I&apos;m <span className="font-bold text-forest">Muhammed Ambali</span>,
              Website Designer and AI Developer, and the CEO and Founder of
              M-WebCraft Studio.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-espresso shadow-sm transition-colors hover:bg-forest hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Start a Project
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-forest/30 bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Explore My Services
            </a>
          </div>
        </div>

        {/* ------------------------------ RIGHT ------------------------------ */}
        <div className="relative mx-auto mt-16 w-full max-w-[420px] pb-8 lg:mt-0 lg:max-w-[460px]">
          {/* offset decorative arch outlines */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 hidden h-full w-full rounded-t-full border border-gold/45 sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 hidden h-full w-full rounded-t-full border border-forest/15 sm:block"
          />

          {/* arch portrait */}
          <figure className="relative aspect-[2/3] w-full overflow-hidden rounded-t-full border-[6px] border-white bg-espresso/10 shadow-[0_24px_60px_-24px_rgba(53,37,29,0.45)]">
            <Image
              src="/muhammed-ambali-portrait.webp"
              alt="Muhammed Ambali, CEO and Founder of M-WebCraft Studio, wearing a dark brown three-piece suit and glasses, standing confidently with hands in his pockets"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 92vw"
              className="object-cover object-top"
            />
          </figure>

          {/* identity label */}
          <figcaption className="absolute -bottom-1 left-1/2 w-[86%] -translate-x-1/2 rounded-2xl border border-border bg-white/95 px-5 py-4 text-center shadow-[0_12px_32px_-14px_rgba(7,59,43,0.35)] backdrop-blur">
            <p className="font-serif text-lg font-semibold text-forest">
              Muhammed Ambali
            </p>
            <span
              className="mx-auto my-2 block h-px w-10 bg-gold"
              aria-hidden="true"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold-deep">
              CEO &amp; Founder
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-charcoal/55">
              M-WebCraft Studio
            </p>
          </figcaption>
        </div>
      </div>
    </section>
  );
}
