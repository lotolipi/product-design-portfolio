"use client";
import { useEffect, useState } from "react";
type Theme="bright"|"dark";
export default function ThemeToggle(){
 const [theme,setTheme]=useState<Theme>("bright");
 useEffect(()=>{try{const saved=window.localStorage.getItem("lotolipi-theme");const initial=saved==="dark"?"dark":"bright";setTheme(initial);document.documentElement.dataset.lotoTheme=initial;}catch{document.documentElement.dataset.lotoTheme="bright";}},[]);
 function switchTheme(){const next=theme==="bright"?"dark":"bright";setTheme(next);document.documentElement.dataset.lotoTheme=next;try{window.localStorage.setItem("lotolipi-theme",next)}catch{}}
 return <button type="button" className="loto-theme-toggle" onClick={switchTheme} aria-label={`${theme==="bright"?"DARK MODE":"BRIGHT MODE"} — switch colour theme`} aria-pressed={theme==="dark"} title="Switch colour theme"><span className="loto-theme-toggle-label">{theme==="bright"?"DARK MODE":"BRIGHT MODE"}</span><span className="loto-theme-toggle-track" aria-hidden="true"><span className="loto-theme-toggle-knob"/></span></button>;
}