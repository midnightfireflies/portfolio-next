"use client";

import { createContext } from "react";

export type ThemePreference = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";

export interface ThemeContextType {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
  isDark: boolean;
  setTheme: (theme: ThemePreference) => void;
  cycleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  resolvedTheme: "dark",
  isDark: true,
  setTheme: () => {},
  cycleTheme: () => {},
});
