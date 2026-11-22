"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
/** Route-aware, optional motion. Does not touch the existing once-per-session opening. */
export default function PhaseTwoMotion() {
 const pathname=usePathname();
 useEffect(()=>{
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(!("IntersectionObserver" in window))return;
  const targets=Array.from(document.querySelectorAll<HTMLElement>(
   ".co-case-page .chapter, .co-site .co-principle, .resume-shell .resume-intro, .resume-shell .resume-job, .resume-shell .resume-bottom"
  ));
  if(!targets.length)return;
  let observer:IntersectionObserver|null=null;
  const stop=()=>{
   observer?.disconnect();
   observer=null;
   document.documentElement.classList.remove("loto-phase2");
   targets.forEach(target=>target.classList.remove("loto-p2-visible"));
  };
  const sync=()=>{
   stop();
   if(media.matches)return;
   // All content remains visible until enhancement is activated.
   observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
     if(entry.isIntersecting){
      entry.target.classList.add("loto-p2-visible");
      observer?.unobserve(entry.target);
     }
    });
   },{threshold:0.08,rootMargin:"0px 0px -24px 0px"});
   targets.forEach(target=>observer?.observe(target));
   document.documentElement.classList.add("loto-phase2");
  };
  media.addEventListener("change",sync);
  sync();
  return()=>{
   media.removeEventListener("change",sync);
   stop();
  };
 },[pathname]);
 return null;
}
