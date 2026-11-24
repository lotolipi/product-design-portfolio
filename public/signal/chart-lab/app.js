import {specs} from './data.js';
import {percentMark} from '../percent.js';

const format = n => Number(n.toFixed(2)).toLocaleString('en-IN');
const svg = (body, height) => `<svg viewBox="0 0 320 ${height}" aria-hidden="true">${body}</svg>`;
const label = (x,y,value,anchor='start') => `<text x="${x}" y="${y}" text-anchor="${anchor}">${value}</text>`;
const rule = (x,y,x2,y2,style='rule') => `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" class="${style}"/>`;
const dot = (x,y,r,selected) => `<circle cx="${x}" cy="${y}" r="${r}" class="${selected?'active':'muted'}"/>`;
const bar = (x,y,w,h,selected) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${selected?'active':'muted'}"/>`;

function plot(type, rows, unit, index) {
  const value = rows[index][1];
  if (['dots','rings','hero'].includes(type)) return percentMark(value,type==='dots');
  if (type==='process') return '<ol>'+rows.map(([name],i)=>`<li aria-current="${i===index?'step':'false'}"><b>${i+1}</b>${name}</li>`).join('')+'</ol>';
  if (type==='relationship') return '<div class="independent">'+rows.map(([name,n],i)=>`<div class="${i===index?'chosen':''}">${percentMark(n)}<strong>${format(n)}%</strong>${name}</div>`).join('')+'</div>';
  const max=Math.max(...rows.flatMap(r=>r.slice(1).map(Math.abs)));
  if(type==='stack') {
    let x=0;
    return svg(rows.map(([name,n],i)=>{
      const w=3.2*n, start=x; x+=w;
      return bar(start,24,w,36,i===index)+label(start+w/2,82,name,'middle')+label(start+w/2,16,format(n)+'%','middle');
    }).join(''),94);
  }
  if(type==='circles') {
    const materials=['accent','muted'].map(tone=>
      `<radialGradient id="sphere-${tone}" cx=".32" cy=".27" r=".85"><stop stop-color="var(--wash)"/><stop offset=".55" stop-color="var(--${tone})"/><stop offset="1" stop-color="var(--ink)"/></radialGradient>`).join('');
    return svg('<defs>'+materials+'</defs>'+rows.map(([name,n],i)=>{
      const x=32+64*i, radius=28*Math.sqrt(n/max);
      return `<circle cx="${x}" cy="54" r="${radius}" fill="url(#sphere-${i===index?'accent':'muted'})"/>`+label(x,i%2?119:103,name,'middle');
    }).join(''),129);
  }
  if(type==='slope') {
    const y=n=>128-100*n/max;
    const lines=rows.map(([,a,b],i)=>rule(35,y(a),284,y(b),i===index?'selected-line':'rule'));
    lines.push(lines.splice(index,1)[0]);
    return svg(lines.join('')+label(35,152,'Prior','middle')+label(284,152,'Current','middle')+
      label(35,y(value)-7,format(value),'middle')+label(284,y(rows[index][2])-7,format(rows[index][2]),'middle'),162);
  }
  if(type==='line'||type==='sensitivity') {
    const values=rows.map(r=>r[1]), low=Math.min(0,...values), high=unit==='%'?100:Math.max(...values);
    const x=i=>33+i*258/(rows.length-1), y=n=>130-(n-low)*108/(high-low);
    const points=values.map((n,i)=>x(i)+','+y(n)).join(' ');
    return svg(rule(30,y(0),296,y(0))+label(22,y(0)+4,'0','end')+
      rule(30,22,296,22)+label(22,26,high,'end')+
      `<polyline points="${points}" fill="none" class="selected-line"/>`+
      rows.map(([name,n],i)=>dot(x(i),y(n),i===index?6:3,true)+label(x(i),152,type==='sensitivity'?Number(name)/1000+'k':name,'middle')).join(''),164);
  }
  const signed=type==='diverge', extent=unit==='%'&&!signed?100:max;
  const zero=signed?196:106, scale=(signed?95:150)/extent;
  return svg(rule(zero,8,zero,rows.length*28+6)+rows.map(([name,n],i)=>{
    const y=14+28*i, w=Math.abs(n)*scale;
    return label(4,y+9,name)+bar(n<0?zero-w:zero,y,w,10,i===index)+label(314,y+9,format(n),'end');
  }).join(''),rows.length*28+12);
}
const captions=[
 'Positive concept interest among respondents aged 18–34.','Positive response at ₹99. Each dot represents one percentage point.',
 'Positive concept interest within each age group. Bars share a 0–100% scale.','Positive response falls as the tested price rises.',
 'Circle area represents positive concept interest within each market.','Independent samples measure different constructs. Each ring has its own denominator.',
 'Stages show sequence only.','Revenue change from the prior year. The vertical rule marks zero.',
 'Modelled profit or loss in lakh INR. The vertical rule marks break-even.','Unit contribution as a share of net receipt. Bars share a 0–100% scale.',
 'Response split at ₹79. The full strip represents 600 responses.','Positive concept interest across all age groups.',
 'Potential store counts by market.','Prior and current revenue in crore INR on a common linear scale.',
 'Modelled pilot profit in lakh INR by unit volume. The horizontal zero line marks break-even.'
];
const titles=['Concept interest','The ₹99 response','Interest by age','The price curve','Five markets','Two readings of demand','From question to review','Category momentum','Pilot or national launch?','Margin per unit','Inside the ₹79 response','The overall reading','Potential reach','Revenue across two periods','Pilot break-even'];
const catalogue=document.querySelector('#catalogue');
specs.forEach(([type,title,source,rows,unit],i)=>{
  const card=document.createElement('article');
  card.className=type;
  card.innerHTML=`<header><small>${String(i+1).padStart(2,'0')} / ${title}</small><h2>${titles[i]}</h2></header><figure><div class="plate"><output aria-live="polite"></output><div class="plot"></div></div><figcaption>${captions[i]}<small>${source} · ${type==='process'?'Conceptual':'Synthetic'}</small></figcaption></figure>
  ${rows.length>1?`<label>Inspect <select>${rows.map(([name],j)=>`<option value="${j}">${name}</option>`).join('')}</select></label>`:''}
  <details><summary>Data table</summary><table><thead><tr><th>Label</th><th>${type==='slope'?'Prior · crore INR':unit||'Stage'}</th>${type==='slope'?'<th>Current · crore INR</th>':''}</tr></thead><tbody>${rows.map(r=>'<tr><th scope="row">'+r[0]+'</th>'+r.slice(1).map(n=>'<td>'+format(n)+'</td>').join('')+'</tr>').join('')}</tbody></table></details>`;
  const update=(j=0)=>{
    const [name,...values]=rows[j];
    card.querySelector('output').innerHTML=`<span>${name}</span><strong>${format(values.at(-1))}<em>${unit.trim()}</em></strong>`;
    card.querySelector('.plot').innerHTML=plot(type,rows,unit,j);
  };
  card.querySelector('select')?.addEventListener('change',e=>update(Number(e.target.value)));
  update(); catalogue.append(card);
});
document.querySelector('#palette').onchange=e=>document.body.classList.toggle('dark',e.target.value==='dark');
