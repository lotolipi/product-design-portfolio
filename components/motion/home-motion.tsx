"use client";
import { useEffect } from "react";

/** Progressive enhancement: all content remains visible without JavaScript. */
export default function HomeMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll<HTMLElement>(
      ".co-site .co-section-title, .co-site .co-feature, .co-site .co-principle, .co-site .co-about-story, .co-site .co-lotto-content, .co-site .co-contact > h2"
    );
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("loto-is-visible");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    targets.forEach(target => {
      target.classList.add("loto-reveal-ready");
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach(target => target.classList.remove("loto-reveal-ready", "loto-is-visible"));
    };
  }, []);
  return null;
}
