"use client";

import { useEffect, useState } from "react";

/**
 * Motion Direction 02 — progressive, non-blocking visual introduction.
 * The original hero, navigation, links and content render immediately.
 */
export default function OpeningMotion() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".co-site .co-hero");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    // ?replayMotion=1 allows deliberate QA replay without clearing session storage.
    // Reduced-motion preferences always take precedence.
    const replayRequested = new URLSearchParams(window.location.search).get("replayMotion") === "1";
    let firstVisit = replayRequested;
    try {
      firstVisit = replayRequested || sessionStorage.getItem("loto-md02-intro-seen") !== "1";
      if (firstVisit) sessionStorage.setItem("loto-md02-intro-seen", "1");
    } catch {
      // Storage may be disabled; motion must still be optional.
    }

    // Synchronize the hero reveal with the first-visit curtain, rather than
    // letting both animations compete for attention.
    hero.classList.add("loto-md02-hero-ready");
    if (firstVisit) hero.classList.add("loto-md02-first-visit");
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (firstVisit) {
      setShowIntro(true);
      timeout = setTimeout(() => setShowIntro(false), 1450);
    }
    const onChange = () => {
      if (reduced.matches) {
        setShowIntro(false);
        hero.classList.remove("loto-md02-hero-ready", "loto-md02-first-visit");
      }
    };
    reduced.addEventListener("change", onChange);
    return () => {
      if (timeout) clearTimeout(timeout);
      reduced.removeEventListener("change", onChange);
      hero.classList.remove("loto-md02-hero-ready", "loto-md02-first-visit");
    };
  }, []);

  return showIntro ? (
    <div className="loto-md02-intro" aria-hidden="true">
      <div className="loto-md02-intro-scene">
        <span className="loto-md02-piece loto-md02-piece-input"><i/><i/><i/></span>
        <span className="loto-md02-piece loto-md02-piece-clarity"><i/><i/><i/></span>
        <span className="loto-md02-piece loto-md02-piece-spark">✳</span>
        <span className="loto-md02-intro-label">FROM COMPLEXITY TO CLARITY</span>
      </div>
    </div>
  ) : null;
}
