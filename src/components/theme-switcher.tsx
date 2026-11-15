"use client";

import React, { useContext } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { ThemeContext, ThemePreference } from "./theme-context";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  className?: string;
  variant?: "segmented" | "compact";
}

export function ThemeSwitcher({ className, variant = "segmented" }: ThemeSwitcherProps) {
  const { theme, resolvedTheme, setTheme } = useContext(ThemeContext);

  const options: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
    {
      value: "dark",
      label: "Dark theme",
      icon: <Moon className="w-3.5 h-3.5" />,
    },
    {
      value: "light",
      label: "Light theme",
      icon: <Sun className="w-3.5 h-3.5" />,
    },
    {
      value: "system",
      label: "System theme",
      icon: <Laptop className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme preference"
      className={cn(
        "inline-flex items-center p-0.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] transition-colors",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            title={`${opt.label} ${opt.value === "system" ? `(currently ${resolvedTheme})` : ""}`}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "relative flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
              isActive
                ? "bg-[var(--card-bg)] text-[var(--accent)] font-semibold shadow-sm border border-[var(--border-accent)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
            )}
          >
            {opt.icon}
            <span className="capitalize hidden sm:inline text-[11px]">{opt.value}</span>
          </button>
        );
      })}
    </div>
  );
}
