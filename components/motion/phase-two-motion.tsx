"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
/** Route-aware, optional motion. Does not touch the existing once-per-session opening. */
export default function PhaseTwoMotion() {
 const pathname=usePathname();
 useEffect(()=>{
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(media.matches || !("IntersectionObserver" in window))return;
  const targets=Array.from(document.querySelectorAll<HTMLElement>(
   ".co-case-page .chapter, .co-site .co-principle, .resume-shell .resume-intro, .resume-shell .resume-job, .resume-shell .resume-bottom"
  ));
  if(!targets.length)return;
  // All content remains visible until enhancement is activated.
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(entry.isIntersecting){
     entry.target.classList.add("loto-p2-visible");
     observer.unobserve(entry.target);
    }
   });
  },{threshold:0.08,rootMargin:"0px 0px -24px 0px"});
  targets.forEach(target=>observer.observe(target));
  document.documentElement.classList.add("loto-phase2");
  const reset=()=>{if(media.matches){document.documentElement.classList.remove("loto-phase2");observer.disconnect();}};
  media.addEventListener("change",reset);
  return()=>{
   observer.disconnect();
   media.removeEventListener("change",reset);
   document.documentElement.classList.remove("loto-phase2");
   targets.forEach(target=>target.classList.remove("loto-p2-visible"));
  };
 },[pathname]);
 return null;
}
