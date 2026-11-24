const topics=['Textiles','Printmaking','Ceramics','Photography'];
const exhibits=[
 ['Indigo loom',0,0,8,true],['Block-print demonstration',1,1,10,true],['Woven samples',0,0,7,true],['Ink and pressure',1,1,6,true],['Raised loom platform',0,0,8,false],['Contact sheets',3,1,7,true],['Clay vessels',2,2,7,true],['Kiln tests',2,2,6,true],['Glaze library',2,2,8,true],['Pigment transfers',1,1,7,true],['Portrait negatives',3,2,7,true],['Darkroom balcony',3,2,8,false]];
const rooms=['Cloth','Impression','Object'];
const $=id=>document.getElementById(id);
$('topics').innerHTML=topics.map((name,i)=>'<label><input type="checkbox" value="'+i+'" '+(i<2?'checked':'')+'>'+name+'</label>').join('');
function selected(){return [...document.querySelectorAll('#topics input:checked')].map(x=>+x.value)}
function limits(){document.querySelectorAll('#topics input').forEach(x=>x.disabled=!x.checked&&selected().length>=2)}
$('topics').onchange=limits;limits();
let anchor=null,route=[],minutes=45,extra=false;
function walk(a,b){return a===null?2+b*2:a===b?1:2*Math.abs(a-b)+1}
function cost(list,added){let t=added?10:0,prev=null;for(const e of list){t+=walk(prev,e[2])+e[3];prev=e[2]}return t}
function build(){let interests=selected(),seen=new Set();minutes=+$('budget').value;extra=false;route=[];
let candidates=exhibits.filter(e=>(!interests.length||interests.includes(e[1]))&&(!$('access').checked||e[4]));
if(anchor && candidates.includes(anchor)){route.push(anchor);seen.add(anchor[1]);candidates=candidates.filter(e=>e!==anchor)}
while(candidates.length&&route.length<4){candidates.sort((a,b)=>Number(seen.has(a[1]))-Number(seen.has(b[1])));let e=candidates.shift();if(cost([...route,e],false)<=minutes){route.push(e);seen.add(e[1])}}
$('feedback').textContent='';render()}
function shorter(){let list=route.slice();while(list.length>1&&cost(list,true)>minutes)list.pop();return list}
function render(){let list=extra?shorter():route,prev=null;
$('summary').textContent=list.length+' stops · '+cost(list,extra)+' of '+minutes+' minutes, including walking.'+($('access').checked?' Step-free route.':'');
$('stops').innerHTML=list.map((e,i)=>{let w=walk(prev,e[2]);prev=e[2];return '<li><strong>'+e[0]+'</strong> · '+rooms[e[2]]+'<br>'+topics[e[1]]+' · '+w+' min walk · '+(e[3]+(extra&&i===0?10:0))+' min viewing</li>'}).join('');
const svg=$('map').querySelector('svg');if(svg){svg.querySelector('g.route')?.remove();let points=['35,255'];let marks='';list.forEach((e,i)=>{let x=[115,300,485][e[2]],y=106+i*23;points.push(x+',255',x+','+y,x+',255');marks+='<circle cx="'+x+'" cy="'+y+'" r="10" fill="#783523"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle" font-size="12" fill="white">'+(i+1)+'</text>'});svg.insertAdjacentHTML('beforeend','<g class="route"><polyline points="'+points.join(' ')+'" fill="none" stroke="#783523" stroke-dasharray="4 4"/>'+marks+'</g>')}
let next=shorter(),removed=route.slice(next.length);$('change').innerHTML=route.length&&cost(next,true)<=minutes?'<p>'+ (extra?'You extended your first stop.':'Stay 10 minutes longer at '+route[0][0]+'? '+(removed.length?'This drops '+removed.map(e=>e[0]).join(', ')+'.':'Your remaining stops still fit.'))+'</p><button id="detour">'+(extra?'Restore original route':'Take the extra 10 minutes')+'</button>':'';if($('detour'))$('detour').onclick=()=>{extra=!extra;render();$('feedback').textContent=extra?'Route updated.':'Original route restored.';$('detour').focus()}}
$('form').onsubmit=e=>{e.preventDefault();build();$('plan').scrollIntoView()};fetch('./floor.svg').then(r=>r.text()).then(s=>{$('map').innerHTML=s;render()});build();
const clues=[
 'Follow one pale thread through the indigo grid. Where does it disappear beneath the warp?',
 'Look at the join between two impressions. A narrow seam gives away the edge of the block.',
 'Compare two edges of the same swatch. How does a tighter weave change its silhouette?',
 'Trace the darkest ridge of ink. Look for the place where pressure eases off.',
 'From the platform, follow the threads from the beam to the cloth taking shape below.',
 'Read the frames in sequence. Which small change turns a test exposure into a portrait?',
 'Circle a vessel and watch the rim change shape against the wall.',
 'Compare the fired samples side by side. Look for two surfaces that catch light differently.',
 'Pick two neighbouring glaze tiles. Trace where the colour pools along the lower edge.',
 'Look for the faint second impression beside the first. Which layer landed last?',
 'Imagine reversing the tones. Which detail would become the brightest part of the portrait?',
 'Look down from the balcony and follow the sequence from exposure to drying.'
];
const detail=$('object-detail');let activeObject=null;
function showGallery(room){
 $('gallery-tabs').innerHTML=rooms.map((name,i)=>'<button type="button" data-gallery="'+i+'" aria-pressed="'+(room===i)+'">'+name+'</button>').join('');
 $('objects').innerHTML=exhibits.map((e,i)=>e[2]===room?'<button type="button" data-room="'+room+'" data-exhibit="'+i+'"><small>'+topics[e[1]]+' · '+e[3]+' min</small><strong>'+e[0]+'</strong><span>Look closer ↗</span></button>':'').join('');
}
$('gallery-tabs').onclick=e=>{let b=e.target.closest('button');if(b){showGallery(+b.dataset.gallery);$('gallery-tabs').children[+b.dataset.gallery].focus()}};
$('objects').onclick=e=>{let b=e.target.closest('button');if(!b)return;activeObject=exhibits[+b.dataset.exhibit];let item=activeObject;
 $('object-text').innerHTML='<small>'+rooms[item[2]]+' · '+item[3]+' minutes</small><h3 id="object-title">'+item[0]+'</h3><p>'+clues[+b.dataset.exhibit]+'</p><p>'+ (item[4]?'Step-free viewing':'Raised display with steps')+'</p>';
 syncAccess();detail.showModal()};
$('close-object').onclick=()=>detail.close();
$('start-here').onclick=()=>{anchor=activeObject;let inputs=[...document.querySelectorAll('#topics input')];if(!inputs[anchor[1]].checked){if(selected().length===2)inputs[selected()[1]].checked=false;inputs[anchor[1]].checked=true}limits();build();detail.close();$('plan').scrollIntoView();$('plan').tabIndex=-1;$('plan').focus({preventScroll:true})};
function syncAccess(){
 const enabled=$('access').checked;
 $('object-access').checked=enabled;
 const blocked=enabled && activeObject && !activeObject[4];
 $('start-here').disabled=Boolean(blocked);
 $('access-hint').textContent=blocked?'This exhibit has steps. Close this view to choose a step-free exhibit.':enabled?'Every stop on your route will be step-free.':'';
}
function changeAccess(enabled){
 $('access').checked=enabled;
 if(enabled && anchor && !anchor[4])anchor=null;
 syncAccess();
 build();
}
$('access').onchange=e=>changeAccess(e.target.checked);
$('object-access').onchange=e=>changeAccess(e.target.checked);
showGallery(0);
