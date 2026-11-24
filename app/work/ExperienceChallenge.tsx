"use client";
import {useState} from "react";
type Kind = "workatlas" | "signal" | "field-guide";
const scenarios = {
 workatlas:{title:"Who can move the work forward?",intro:"A blocked task has just moved from Nina to Dev. Choose whose edit should update the shared board.",options:["Nina, the former owner","Dev, the current owner"],feedback:["Nina’s edit should be rejected. Reassignment must revoke the former owner’s editing access.","Dev’s edit can update the board and activity history. Ownership and shared state stay aligned."],href:"#check-it-yourself",cta:"Try the full handoff"},
 signal:{title:"Two numbers. One decision?",intro:"67.2% concept interest among ages 18–34; 24% positive price response at ₹99 in a separate sample. What can you conclude?",options:["Young buyers will pay ₹99","The samples answer different questions"],feedback:["The evidence does not establish willingness to pay among young buyers. The samples cannot be joined that way.","Correct: the contexts differ. Inspect the source records before making a launch recommendation."],href:"/signal",cta:"Investigate the evidence"},
 "field-guide":{title:"Curiosity has no fixed route.",intro:"You have 45 minutes and want to explore textiles and printmaking. You find a loom worth ten extra minutes. What should the guide do?",options:["Extend the route without asking","Show which stop you would lose"],feedback:["An automatic extension hides the time trade-off. A visitor should retain control over the itinerary.","Make the trade-off visible before committing, and allow the visitor to restore the original route."],href:"/field-guide/index.html",cta:"Curate your visit"}
} as const;
export default function ExperienceChallenge({kind}:{kind:Kind}){
 const [choice,setChoice]=useState<number|null>(null);
 const s=scenarios[kind];
 return <section className="lot-experience" aria-labelledby="experience-title">
 <div className="lot-experience-inner"><p className="lot-experience-kicker">Experience first · Illustrative scenario</p>
 <h2 id="experience-title">{s.title}</h2><p>{s.intro}</p>
 <fieldset><legend>What would you choose?</legend>{s.options.map((option,i)=><label key={option}><input type="radio" name="experience-choice" checked={choice===i} onChange={()=>setChoice(i)}/><span>{option}</span></label>)}</fieldset>
 <div role="status" aria-live="polite">{choice!==null && <p>{s.feedback[choice]}</p>}</div>
 <div className="lot-experience-actions"><a href={s.href}>{s.cta} →</a><a href="#case-study-reading">Skip to design thinking ↓</a>{choice!==null&&<button type="button" onClick={()=>setChoice(null)}>Reset</button>}</div>
 </div></section>
}
