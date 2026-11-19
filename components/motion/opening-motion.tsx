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

    // A session cookie supplements sessionStorage for mobile in-app browsers
    // that recreate a page's sessionStorage context on reload.
    // Neither marker has a fixed expiry: a new browser session may replay the intro.
    const sessionKey = "loto-md02-intro-seen";
    let firstVisit = false;
    try {
      const seenInStorage = window.sessionStorage.getItem(sessionKey) === "1";
      const seenInCookie = document.cookie.split("; ").some(part => part === sessionKey + "=1");
      firstVisit = !seenInStorage && !seenInCookie;
      window.sessionStorage.setItem(sessionKey, "1");
      if (window.location.protocol === "https:") {
        document.cookie = sessionKey + "=1; Path=/; SameSite=Lax; Secure";
      } else {
        document.cookie = sessionKey + "=1; Path=/; SameSite=Lax";
      }
    } catch {
      // Optional motion must never replay endlessly if storage is blocked.
      firstVisit = false;
    }
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
