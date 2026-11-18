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

    hero.classList.add("loto-md02-hero-ready");
    let firstVisit = false;
    try {
      firstVisit = sessionStorage.getItem("loto-md02-intro-seen") !== "1";
      if (firstVisit) sessionStorage.setItem("loto-md02-intro-seen", "1");
    } catch {
      // Storage may be disabled; motion must still be optional.
    }

    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (firstVisit) {
      setShowIntro(true);
      timeout = setTimeout(() => setShowIntro(false), 1450);
    }
    const onChange = () => {
      if (reduced.matches) {
        setShowIntro(false);
        hero.classList.remove("loto-md02-hero-ready");
      }
    };
    reduced.addEventListener("change", onChange);
    return () => {
      if (timeout) clearTimeout(timeout);
      reduced.removeEventListener("change", onChange);
      hero.classList.remove("loto-md02-hero-ready");
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
