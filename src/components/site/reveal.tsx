"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Subtle fade-up reveal on scroll.
 * Deliberately restrained (16px, 0.55s, once) to keep the editorial feel.
 *
 * Hydration-safe on purpose: the rendered element type must be identical on
 * the server and on the client's first render. Branching the tree on
 * `useReducedMotion()` (which reads matchMedia synchronously on the client
 * but returns null during SSR) changed <motion.div> into a plain <div> for
 * reduced-motion users and shifted every React useId below it, breaking
 * Radix hydration (aria-controls/id mismatches). Accessibility is instead
 * handled by <MotionConfig reducedMotion="user"> in page.tsx, which makes
 * framer-motion skip transform animations for reduced-motion users without
 * altering the rendered tree.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.65, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}
