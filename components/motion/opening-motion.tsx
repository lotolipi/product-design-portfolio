"use client";

import { useEffect, useState } from "react";

/** Branded intro once per tab session; scroll reveals progressively enhance existing sections. */
export default function OpeningMotion() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".co-site .co-hero");
    if (!hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    // Storage-blocked browsers skip the intro rather than replaying indefinitely.
    let firstVisit = false;
    try {
      firstVisit = window.sessionStorage.getItem("loto-md02-intro-seen") !== "1";
      if (firstVisit) window.sessionStorage.setItem("loto-md02-intro-seen", "1");
    } catch { /* Optional motion must never depend on storage. */ }
    hero.classList.add("loto-md02-hero-ready");
    if (firstVisit) {
      hero.classList.add("loto-md02-first-visit");
      setShowIntro(true);
    }
    const timeout = window.setTimeout(() => setShowIntro(false), firstVisit ? 1450 : 0);

    // Reuse the existing motion component; do not duplicate PR #14's hero animations.
    const targets = document.querySelectorAll<HTMLElement>(
      ".co-site .co-section-title, .co-site .co-feature, .co-site .co-principle, .co-site .co-about-story, .co-site .co-lotto-content, .co-site .co-contact > h2"
    );
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loto-is-visible");
          observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }) : null;
    if (observer) targets.forEach(target => {
      target.classList.add("loto-reveal-ready");
      observer.observe(target);
    });
    const onChange = () => {
      if (reduced.matches) {
        window.clearTimeout(timeout);
        setShowIntro(false);
        hero.classList.remove("loto-md02-hero-ready", "loto-md02-first-visit");
        observer?.disconnect();
        targets.forEach(target => target.classList.remove("loto-reveal-ready", "loto-is-visible"));
      }
    };
    reduced.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(timeout);
      observer?.disconnect();
      targets.forEach(target => target.classList.remove("loto-reveal-ready", "loto-is-visible"));
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
