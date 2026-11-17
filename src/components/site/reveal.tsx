"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
 * Reveal — progressive-enhancement scroll reveal.
 *
 * Replaces the previous framer-motion whileInView wrapper (~35 KB of
 * runtime JS) with one shared IntersectionObserver and two CSS rules in
 * globals.css (.js .reveal / .is-visible). The DOM classes are toggled
 * directly on the node, never through React state, so server HTML and
 * the client's first render stay identical — no hydration mismatches.
 *
 * Without JavaScript the `js` class is never added to <html>, so every
 * section is simply visible (no content is ever trapped behind JS).
 * The global prefers-reduced-motion rule in globals.css neutralises the
 * transition for users who opt out of motion.
 */

/* One observer instance for the whole page — cheap for ~25 elements. */
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (!observer && typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      // Same trigger line as the previous framer viewport margin: -60px.
      { rootMargin: "0px 0px -60px 0px" },
    );
  }
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    if (!obs) {
      // No IntersectionObserver support (very old browsers): show content.
      el.classList.add("is-visible");
      return;
    }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={
        delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined
      }
    >
      {children}
    </div>
  );
}
