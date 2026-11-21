import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { navLinks, site, buildWhatsAppUrl } from "@/data/site";
import { services } from "@/data/content";

/**
 * Footer — logo on a clean white chip (never a white-background logo
 * directly on a dark surface), navigation, services and contact details.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-forest-deep text-ivory">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr]">
          {/* brand column */}
          <div>
            <span className="inline-block rounded-xl bg-white p-2.5 shadow-sm">
              <Image
                src="/m-webcraft-studio-logo.png"
                alt="M-WebCraft Studio logo"
                width={1254}
                height={1254}
                quality={90}
                sizes="56px"
                className="h-14 w-14 object-contain"
              />
            </span>
            <p className="mt-5 font-serif text-xl font-semibold text-ivory">
              {site.founder}
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-light">
              CEO &amp; Founder, M-WebCraft Studio
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/65">
              Professional websites, AI chatbots and practical business
              automation solutions for businesses.
            </p>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-light">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks
                .filter((l) =>
                  ["#home", "#about", "#services", "#portfolio", "#contact"].includes(
                    l.href,
                  ),
                )
                .map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-ivory/70 transition-colors hover:text-gold-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {/* services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-light">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-sm text-ivory/70 transition-colors hover:text-gold-light"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold-light">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-start gap-2.5 text-sm text-ivory/70 transition-colors hover:text-gold-light"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-gold-light" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 text-sm text-ivory/70 transition-colors hover:text-gold-light"
                >
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold-light" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-espresso transition-colors hover:bg-ivory hover:text-forest"
            >
              Start a Project
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-7 sm:flex-row">
          {/* suppressHydrationWarning: the year is computed from the clock, so a
              server/client timezone split around New Year must not log a
              hydration warning. */}
          <p className="text-xs text-ivory/55" suppressHydrationWarning>
            © {year} M-WebCraft Studio. All rights reserved.
          </p>
          <p className="text-xs text-ivory/55">
            Website Designer &amp; AI Developer based in Nigeria, available worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
