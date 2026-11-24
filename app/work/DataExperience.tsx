"use client";
import {useState} from "react";
type Kind="workatlas"|"signal"|"field-guide";
const regions=["Asia","Europe","Americas","Africa"] as const;
const counts=[[24,18,8,10],[19,22,5,14],[28,12,12,8],[15,24,6,15]];
const colors=["#a99bcf","#83a6d4","#e5a18a","#91c0ad"];
export default function DataExperience({kind}:{kind:Kind}){
 const [region,setRegion]=useState(0),[price,setPrice]=useState(99),[units,setUnits]=useState(10000),[minutes,setMinutes]=useState(45),[linger,setLinger]=useState(false);
 const [todo,active,blocked,done]=counts[region];
 const profit=(price-45)*units-400000;
 const stops=[["Textile archive",12],["Printing studio",linger?20:10],["Material library",13],["Sculpture gallery",15]] as const;
 let used=0;const route=stops.filter(([,m])=>{if(used+m+3>minutes)return false;used+=m+3;return true});
 const money=(n:number)=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
 return <section className="lvis-data" aria-label="Interactive data lab"><p className="lvis-kicker">Visual intelligence / Synthetic demonstration</p>
 {kind==="workatlas"?<>
 <h2>Work has a shape.</h2><p>Explore fictional distributed workspaces. Each tile represents one assignment, not a national statistic.</p>
 <label>Workspace <select value={region} onChange={e=>setRegion(Number(e.target.value))}>{regions.map((r,i)=><option key={r} value={i}>{r}</option>)}</select></label>
 <div className="lvis-hero" aria-live="polite"><strong>{blocked}</strong><span>blocked assignments / 60 · {(blocked/60*100).toFixed(1)}%</span></div>
 <svg viewBox="0 0 320 128" role="img" aria-label={`${todo} to do, ${active} in progress, ${blocked} blocked, ${done} completed`}>{Array.from({length:60},(_,i)=><rect key={i} x={4+i%15*21} y={4+Math.floor(i/15)*31} width="17" height="26" rx="4" fill={colors[i<todo?0:i<todo+active?1:i<60-done?2:3]}/>)}</svg>
 <div className="lvis-legend">{["To do","In progress","Blocked","Completed"].map((n,i)=><div key={n}><i style={{background:colors[i]}}/><span>{n}</span><b>{counts[region][i]}</b></div>)}</div>
 </>:kind==="signal"?<>
 <h2>What changes the outcome?</h2><p>Explore an illustrative launch model. Demand is an independent input, not a predicted response to price.</p>
 <div className="lvis-hero" aria-live="polite"><strong>{money(profit)}</strong><span>Modelled operating result</span></div>
 <label>Unit price · {money(price)}<input type="range" min="60" max="160" value={price} onChange={e=>setPrice(+e.target.value)}/></label>
 <label>Units sold · {units.toLocaleString("en-IN")}<input type="range" min="2000" max="20000" step="500" value={units} onChange={e=>setUnits(+e.target.value)}/></label>
 {([["Revenue",price*units],["Variable costs",45*units],["Fixed costs",400000]] as const).map(([n,v],i)=><div className="lvis-bar" key={n}><span>{n} · {money(v)}</span><div style={{width:(v/Math.max(price*units,45*units,400000)*100)+"%",background:colors[i]}}/></div>)}
 <p>Break-even: {Math.ceil(400000/(price-45)).toLocaleString("en-IN")} units. Assumptions: ₹45 variable cost per unit; ₹400,000 fixed costs.</p>
 </>:<>
 <h2>Curiosity takes time.</h2><p>Build a visit through a fictional exhibition. Each stop includes three minutes of transfer time.</p>
 <label>Available minutes · {minutes}<input type="range" min="15" max="90" step="5" value={minutes} onChange={e=>setMinutes(+e.target.value)}/></label>
 <label><input type="checkbox" checked={linger} onChange={e=>setLinger(e.target.checked)}/> Linger ten extra minutes in the printing studio</label>
 <div className="lvis-hero" aria-live="polite"><strong>{minutes-used}</strong><span>minutes free · {route.length} stops selected</span></div>
 <svg viewBox="0 0 320 90" role="img" aria-label={`Selected stops: ${route.map(s=>s[0]).join(", ")||"none"}`}><path d="M40 45H280" stroke="currentColor" strokeDasharray="4 5" opacity=".4"/>{stops.map((s,i)=><g key={s[0]}><circle cx={40+i*80} cy="45" r="25" fill={route.includes(s)?colors[i]:"#666"}/><text x={40+i*80} y="50" textAnchor="middle" fill="#15131b">{i+1}</text></g>)}</svg>
 <ol>{stops.map(s=><li key={s[0]}>{s[0]} · {s[1]} min · {route.includes(s)?"Included":"Deferred"}</li>)}</ol>
 </>}
 <button type="button" onClick={()=>{setRegion(0);setPrice(99);setUnits(10000);setMinutes(45);setLinger(false)}}>Reset scenario</button>
 <p className="lvis-note">Illustrative data only. Not measured product outcomes or population benchmarks.</p></section>
}
