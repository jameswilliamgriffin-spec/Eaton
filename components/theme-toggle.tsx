"use client";

import { MoonStar, Sparkles, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "eaton-theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [showDebMode, setShowDebMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!showDebMode) return;
    const timer = window.setTimeout(() => setShowDebMode(false), 2600);
    return () => window.clearTimeout(timer);
  }, [showDebMode]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setShowDebMode(nextTheme === "dark");
    applyTheme(nextTheme);
    localStorage.setItem(storageKey, nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <span className="theme-toggle-stars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <SunMedium className="theme-toggle-sun" aria-hidden="true" />
        <MoonStar className="theme-toggle-moon" aria-hidden="true" />
        <span className="theme-toggle-thumb" aria-hidden="true">
          <span className="theme-toggle-thumb-glow" />
        </span>
        <span className="sr-only">{isDark ? "Dark" : "Light"} mode is active</span>
      </button>

      <div
        className={`deb-mode-toast ${showDebMode ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="deb-mode-toast-icon" aria-hidden="true">
          <Sparkles />
        </span>
        <span>
          <strong>Deb Mode</strong>
          <small>Activated</small>
        </span>
      </div>
    </>
  );
}
