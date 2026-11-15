"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ThemeContext, ThemePreference, ResolvedTheme } from "./theme-context";

const STORAGE_KEY = "portfolio-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");
  const [mounted, setMounted] = useState(false);

  // Apply theme to DOM
  const applyTheme = useCallback((preference: ThemePreference) => {
    const active = preference === "system" ? getSystemTheme() : preference;
    setResolvedTheme(active);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", active);
      // Also update meta color-scheme
      document.documentElement.style.colorScheme = active;
    }
  }, []);

  // Initialize from storage or system on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
      if (stored === "dark" || stored === "light" || stored === "system") {
        setThemeState(stored);
        applyTheme(stored);
      } else {
        setThemeState("system");
        applyTheme("system");
      }
    } catch {
      applyTheme("system");
    }
    setMounted(true);
  }, [applyTheme]);

  // Listen to OS appearance changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Re-evaluate if user is on "system"
      const currentStored = (localStorage.getItem(STORAGE_KEY) as ThemePreference) || "system";
      if (currentStored === "system") {
        applyTheme("system");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Safari legacy fallback
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: ThemePreference) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // Handle restricted storage
      }
    },
    [applyTheme]
  );

  const cycleTheme = useCallback(() => {
    const sequence: ThemePreference[] = ["dark", "light", "system"];
    const nextIndex = (sequence.indexOf(theme) + 1) % sequence.length;
    setTheme(sequence[nextIndex]);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        isDark: resolvedTheme === "dark",
        setTheme,
        cycleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
