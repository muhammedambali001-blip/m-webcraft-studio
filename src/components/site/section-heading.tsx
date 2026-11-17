import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Consistent section heading pattern:
 * small gold label with rule, serif headline, optional supporting text.
 */
export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  dark = false,
  className,
}: {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
          centered && "justify-center",
          dark ? "text-gold-light" : "text-gold-deep",
        )}
      >
        <span className={cn("h-px w-8", dark ? "bg-gold-light/70" : "bg-gold/70")} aria-hidden="true" />
        {label}
        <span className={cn("h-px w-8", dark ? "bg-gold-light/70" : "bg-gold/70")} aria-hidden="true" />
      </p>
      <h2
        className={cn(
          "font-serif mt-4 text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.15] font-semibold text-balance",
          dark ? "text-ivory" : "text-forest",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            dark ? "text-ivory/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
