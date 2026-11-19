"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

type Theme = "bright" | "dark";

/* Place the theme control in the page footer; never overlay content. */
export default function ThemeToggle() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("bright");
  const [footer, setFooter] = useState<HTMLElement | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("lotolipi-theme");
      const initial: Theme = saved === "dark" ? "dark" : "bright";
      setTheme(initial);
      document.documentElement.dataset.lotoTheme = initial;
    } catch {
      document.documentElement.dataset.lotoTheme = "bright";
    }
  }, []);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(".co-site > .co-footer, .co-case-page > footer, .lottolov-page > footer, .resume-shell footer, main > footer, body > footer");
    setFooter(target);
  }, [pathname]);

  function switchTheme() {
    const next: Theme = theme === "bright" ? "dark" : "bright";
    setTheme(next);
    document.documentElement.dataset.lotoTheme = next;
    try { window.localStorage.setItem("lotolipi-theme", next); } catch {}
  }

  const control = <button
    type="button"
    className="loto-theme-toggle"
    onClick={switchTheme}
    aria-label={theme === "bright" ? "Switch to dark mode" : "Switch to bright mode"}
    aria-pressed={theme === "dark"}
    title="Switch colour theme"
  >
    <span className="loto-theme-toggle-label">{theme === "bright" ? "DARK MODE" : "BRIGHT MODE"}</span>
    <span className="loto-theme-toggle-track" aria-hidden="true"><span className="loto-theme-toggle-knob" /></span>
  </button>;

  // Do not flash a floating control during hydration or route transitions.
  // Pages without a footer can provide an explicit footer before enabling this control.
  return footer ? createPortal(control, footer) : null;
}
