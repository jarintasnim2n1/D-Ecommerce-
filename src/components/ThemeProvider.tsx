"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type AccentColor = "green" | "coral" | "gold" | "purple";
type Currency = "USD" | "ETH" | "BTC" | "USDT";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  accentColor: AccentColor;
  currency: Currency;
  setTheme: (t: Theme) => void;
  setAccentColor: (c: AccentColor) => void;
  setCurrency: (c: Currency) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  resolvedTheme: "light",
  accentColor: "green",
  currency: "USD",
  setTheme: () => {},
  setAccentColor: () => {},
  setCurrency: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

const accentColors: Record<AccentColor, { castleton: string; castletonLight: string; castletonDark: string }> = {
  green: { castleton: "#004242", castletonLight: "#005C5C", castletonDark: "#002E2E" },
  coral: { castleton: "#FF6B4A", castletonLight: "#FF8A70", castletonDark: "#E5553A" },
  gold: { castleton: "#D4A574", castletonLight: "#E8C9A0", castletonDark: "#B8865A" },
  purple: { castleton: "#8B5CF6", castletonLight: "#A78BFA", castletonDark: "#7C3AED" },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [accentColor, setAccentColorState] = useState<AccentColor>("green");
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((resolved: "light" | "dark") => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
    setResolvedTheme(resolved);
  }, []);

  const applyAccentColor = useCallback((color: AccentColor) => {
    const el = document.documentElement;
    const c = accentColors[color];
    el.style.setProperty("--color-castleton", c.castleton);
    el.style.setProperty("--color-castleton-light", c.castletonLight);
    el.style.setProperty("--color-castleton-dark", c.castletonDark);
    el.style.setProperty("--color-ring", c.castleton);
  }, []);

  useEffect(() => {
    setMounted(true);

    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    const savedAccent = (localStorage.getItem("accentColor") as AccentColor) || "green";
    const savedCurrency = (localStorage.getItem("currency") as Currency) || "USD";

    setThemeState(savedTheme);
    setAccentColorState(savedAccent);
    setCurrencyState(savedCurrency);

    applyTheme(resolveTheme(savedTheme));
    applyAccentColor(savedAccent);

    if (savedCurrency) localStorage.setItem("currency", savedCurrency);
  }, [applyTheme, applyAccentColor]);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        applyTheme(getSystemTheme());
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, mounted, applyTheme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    applyTheme(resolveTheme(t));
  }, [applyTheme]);

  const setAccentColor = useCallback((c: AccentColor) => {
    setAccentColorState(c);
    localStorage.setItem("accentColor", c);
    applyAccentColor(c);
  }, [applyAccentColor]);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, accentColor, currency, setTheme, setAccentColor, setCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
}
