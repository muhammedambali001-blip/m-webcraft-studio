"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, site, buildWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";

function LogoChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl border border-border bg-white px-3 py-1.5 shadow-sm",
        className,
      )}
    >
      <Image
        src="/m-webcraft-studio-logo.png"
        alt="M-WebCraft Studio logo"
        width={1254}
        height={1254}
        priority
        className="h-9 w-9 object-contain"
      />
      <span className="hidden min-[420px]:block font-serif text-lg font-semibold leading-none text-forest">
        M-WebCraft <span className="text-gold-deep">Studio</span>
      </span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-ivory/92 shadow-[0_2px_16px_rgba(7,59,43,0.06)] backdrop-blur-md"
          : "bg-ivory/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          aria-label="M-WebCraft Studio — back to top"
          className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <LogoChip />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-charcoal/75 transition-colors hover:bg-forest/5 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden sm:inline-flex rounded-full bg-gold px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-espresso shadow-sm hover:bg-forest hover:text-ivory"
          >
            <a href="#contact">Start a Project</a>
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="outline"
                size="icon"
                aria-label="Open navigation menu"
                className="size-11 rounded-xl border-border bg-white text-forest hover:bg-forest hover:text-ivory"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              aria-describedby={undefined}
              className="w-[86vw] max-w-sm border-l-border bg-ivory p-0"
            >
              <SheetHeader className="border-b border-border bg-white px-5 py-4">
                <SheetTitle asChild>
                  <div>
                    <LogoChip />
                    <span className="sr-only">M-WebCraft Studio navigation</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-semibold text-charcoal transition-colors hover:bg-forest/5 hover:text-forest"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-bold tracking-[0.14em] uppercase text-espresso"
                >
                  Start a Project
                </a>

                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-ivory"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/25 bg-white px-4 py-3 text-sm font-semibold text-forest"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    Email
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
