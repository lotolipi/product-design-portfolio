"use client";

import { useEffect, useState } from "react";

/**
 * Prototype 01 opening motion. Replay on every full page load during prototype
 * review so the animation is discoverable on iPhone and desktop.
 * Reduced-motion preference always takes precedence.
 */
export default function OpeningMotion() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".co-site .co-hero");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    hero.classList.add("loto-md02-hero-ready", "loto-md02-first-visit");
    setShowIntro(true);
    const timeout = window.setTimeout(() => setShowIntro(false), 1450);
    const onChange = () => {
      if (reduced.matches) {
        window.clearTimeout(timeout);
        setShowIntro(false);
        hero.classList.remove("loto-md02-hero-ready", "loto-md02-first-visit");
      }
    };
    reduced.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(timeout);
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
