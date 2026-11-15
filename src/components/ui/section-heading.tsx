import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[var(--accent)] uppercase font-semibold mb-3 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[var(--text-primary)] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
