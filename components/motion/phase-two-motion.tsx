"use client";
import {useEffect} from "react";
/** Progressive reveal across routes. Existing opening-motion remains untouched. */
export default function PhaseTwoMotion(){
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  const targets=Array.from(document.querySelectorAll<HTMLElement>(".co-case-page .chapter, .co-site .co-principle"));
  if(!targets.length)return;
  // Add the enabling class only after targets and observer are ready.
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("loto-p2-visible");observer.unobserve(entry.target);}
  }),{threshold:0.08,rootMargin:"0px 0px -30px 0px"});
  targets.forEach(t=>observer.observe(t));
  document.documentElement.classList.add("loto-phase2");
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  const reset=()=>{if(media.matches){document.documentElement.classList.remove("loto-phase2");observer.disconnect();}};
  media.addEventListener("change",reset);
  return()=>{observer.disconnect();media.removeEventListener("change",reset);document.documentElement.classList.remove("loto-phase2");};
 },[]);
 return null;
}
