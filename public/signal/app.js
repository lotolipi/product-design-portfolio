import {openWorkspace,saveNote,saveScenario} from './storage.js';
import {percentMark} from '/signal/percent.js';
const main = document.querySelector('main'), status = document.querySelector('#status');
const dialog = document.querySelector('dialog');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const get = id => document.getElementById(id);
const cite = e => `<button class="cite" data-source="${e.id}">Inspect ${e.id} · ${e.dataset_id}</button>`;
let ws, selected = [], filter = '', draft, route, savedId;
const question = 'Should NOVA launch a premium botanical beverage?';
const tones = {'Supports':['+','#216447'],'Contradicts':['⇄','#a12c40'],'Qualifies':['[ ]','#80520a'],'Context differs':['⇉','#3838b5'],'Inconclusive':['?','#565960'],'Supersedes':['→','#69418c']};
function details(e) {
  return `<small>${esc(e.version)} · ${esc(e.classification)}</small><h2>${esc(e.claim)}</h2>
  <p>${esc(e.construct)} · ${esc(e.result)}</p><dl>${['population','method','period','limitation','locator'].map(k=>`<dt>${k}</dt><dd>${esc(e[k])}</dd>`).join('')}</dl>
  ${e.records.map(row=>`<p><code>${esc(Object.entries(row).map(([k,v])=>k+' = '+v).join(' · '))}</code></p>`).join('')}
  <a href="/signal/data/evidence.csv" target="_blank" rel="noopener">Evidence register ↗</a>
  ${e.file ? ` · <a href="/signal/data/${esc(e.file)}" target="_blank" rel="noopener">Open ${esc(e.file)} ↗</a>` : ''}`;
}

// LVIS: source-derived quantitative specimen; unknowns remain textual.
function metric(e, matrix=false) {
  const rows=e.records;
  if(!rows.length || !rows.every(r=>r.n!==undefined && r.positive_n!==undefined))return '';
  const n=rows.reduce((s,r)=>s+Number(r.n),0), positive=rows.reduce((s,r)=>s+Number(r.positive_n),0);
  if(!Number.isFinite(n)||!Number.isFinite(positive)||n<=0||positive<0||positive>n)return '';
  const percent=100*positive/n, label=percent.toFixed(1).replace(/\.0$/,'')+'%';
  return `<figure class="lvis-metric"><div><small>${esc(e.id)} · ${esc(e.construct)}</small><div class="lvis-number">${label}</div></div><div class="lvis-mark">${percentMark(percent,matrix)}</div><figcaption>${esc(e.population)} · ${positive}/${n} · Synthetic · ${esc(e.dataset_id)}${matrix?' · One dot ≈ one percentage point.':''}</figcaption></figure>`;
}

function brief() {
  return `<div class="grid"><div><section><small>Provisional option B</small><h2>Controlled pilot</h2><p>Decide whether demand and unit economics justify a pilot. Owner unavailable.</p>
  ${metric(ws.evidence[0])}<p>${esc(ws.evidence[0].claim)} overall. Among ages 18–34, the extract shows ${esc(ws.evidence[0].result)}. ${cite(ws.evidence[0])}</p>
  ${metric(ws.evidence[1],true)}<p>In a separate price sample, the response at ₹99 was ${esc(ws.evidence[1].result)}. ${cite(ws.evidence[1])}</p>
  <a href="#room">Examine the evidence →</a></section><section><h2>Alternatives</h2>${ws.options.map(o=>`<p>${o.id} · ${esc(o.option)}</p>`).join('')}<a href="#alternatives">Compare financial assumptions →</a></section></div>
  <aside><small>Proposed pilot gates</small><h2>What would justify continuing?</h2><ul><li>Sell-through ≥70%</li><li>Repeat purchase ≥25%</li><li>Unit contribution margin ≥20%</li><li>Units ≥214,286</li><li>Cannibalisation ≤10%</li></ul><p>Outcomes unknown. The fixtures contain no observed pilot results.</p>${cite(ws.evidence[3])}</aside></div>`;
}
function historyView() {
  return `<h2>Decision annotations</h2>${ws.notes.length ? ws.notes.map(n=>{
    const [symbol,color]=tones[n.kind] || ['?','#565960'];
    return `<article class="note" style="--tone:${color}"><small>${esc(n.author)} · ${esc(n.time)}</small><h3 tabindex="-1" id="note-${esc(n.id)}">${symbol} ${esc(n.kind)}</h3><p>${esc(n.reason)}</p><details><summary>Inspect saved evidence versions</summary>${n.snapshots.map(details).join('')}</details></article>`;
  }).join('') : '<p>No annotations recorded.</p>'}`;
}
function room() {
  const questions=[...new Set(ws.evidence.map(e=>e.question))];
  return `<div class="grid"><section><label>Question <select id="filter"><option value="">All questions</option>${questions.map(q=>`<option ${q===filter?'selected':''}>${esc(q)}</option>`).join('')}</select></label>
  ${questions.filter(q=>!filter||q===filter).map(q=>`<h2>${esc(q)}</h2>${ws.evidence.filter(e=>e.question===q).map(e=>`<article><small>${e.id} · ${e.classification}</small><h3>${esc(e.claim)}${e.id==='E01'?' overall':''}</h3>${metric(e,e.id==="E02")}<p>${esc(e.limitation)}</p>${cite(e)}<br><label class="pick"><input type="checkbox" value="${e.id}" ${selected.includes(e.id)?'checked':''}> Select ${e.id}</label></article>`).join('')}`).join('')}</section>
  <aside><h2>Compare evidence</h2><p id="count"></p><button class="primary" id="compare">Reconcile pair</button> <button id="clear">Clear selection</button>${historyView()}</aside></div>`;
}
function reconcile() {
  const pair=selected.map(id=>ws.evidence.find(e=>e.id===id));
  if(pair.length!==2) return '<p>Select two evidence records to compare.</p><a href="#room">Open Evidence Room</a>';
  const missing=pair.some(e=>!e.records.length);
  return `<section><h2>Compare the source extracts</h2><div class="lvis-pair">${pair.map(e=>metric(e,e.id==="E02")||`<p>${esc(e.id)} · ${esc(e.result)}</p>`).join('')}</div>${['construct','result','population','method','period','locator','limitation'].map(k=>`<div class="row"><strong>${k}</strong>${pair.map(e=>`<div><small>${e.id} · synthetic</small><br>${esc(e[k])}</div>`).join('')}</div>`).join('')}
  <div class="actions">${pair.map(cite).join('')}</div></section><section><h2>Record your reading</h2><p>${selected.includes('E01')&&selected.includes('E02')?'The age-specific response at ₹99 is unknown. The two samples cannot be linked by age.':'Compare the populations, methods and limitations before classifying this pair.'}</p>
  <p><strong>${pair[0].id} → ${pair[1].id}</strong> · Classify how the first record relates to the second.</p><form><label>Relationship <select id="kind"><option value="">Choose a relationship</option>${ws.types.map(t=>`<option>${t}</option>`).join('')}</select></label>
  <p><label>Rationale or unresolved question<textarea id="reason" maxlength="2000" rows="3"></textarea></label></p><div id="error" class="error" role="alert"></div>
  ${missing?'<p>Source missing. Inspect the evidence register before recording this pair.</p>':''}${!['Insights','Owner'].includes(ws.role)?'<p>Read-only workspace role.</p>':''}
  <div class="actions"><button class="primary" ${missing||!['Insights','Owner'].includes(ws.role)?'disabled':''}>Save relationship</button><button type="submit" name="open" ${missing||!['Insights','Owner'].includes(ws.role)?'disabled':''}>Record open question</button><a href="#room">Cancel</a></div></form></section>`;
}
function updateSelection() {
  document.querySelectorAll('.pick input').forEach(el=>{
    el.disabled=selected.length===2&&!selected.includes(el.value);
    el.checked=selected.includes(el.value);
  });
  get('compare').disabled=selected.length!==2;
  get('count').textContent=selected.join(' + ') + ' · '+selected.length+' of 2 selected. '+(selected.length===2?'Remove one to replace it.':'Choose two distinct records.');
}
function remember() {
  try {sessionStorage.setItem('signal.d001',JSON.stringify({versions:selected.map(id=>ws.evidence.find(e=>e.id===id).version),filter,draft}))}
  catch { /* Saved annotations remain available from SQLite. */ }
}
function restore() {
  try {
    const previous=JSON.parse(sessionStorage.getItem('signal.d001'));
    if(!previous)return;
    const records=previous.versions.map(v=>ws.evidence.find(e=>e.version===v));
    if(records.length>2||records.some(e=>!e))return;
    selected=records.map(e=>e.id);
    filter=ws.evidence.some(e=>e.question===previous.filter)?previous.filter:'';
    draft=previous.draft;
  }catch { /* An unavailable or old session starts with an empty selection. */ }
}
const modelFields = {
  forecast_units: 'Forecast units',
  net_receipt_per_unit: 'Net receipt per unit (₹)',
  variable_cost_per_unit: 'Variable cost per unit (₹)',
  fixed_cost_inr: 'Fixed cost (₹)'
};
const fmt = new Intl.NumberFormat('en-IN');
let optionId = 'B';
function metrics(inputs) {
  const {forecast_units, net_receipt_per_unit, variable_cost_per_unit, fixed_cost_inr} = inputs;
  const unit = net_receipt_per_unit - variable_cost_per_unit;
  return {
    unit,
    profit: forecast_units * unit - fixed_cost_inr,
    margin: net_receipt_per_unit > 0 ? (100 * unit / net_receipt_per_unit).toFixed(1) + '%' : 'Undefined · zero net receipt',
    even: fixed_cost_inr == 0 ? '0 units' : unit > 0 ? fmt.format(Math.ceil(fixed_cost_inr / unit)) + ' units' : 'No finite break-even'
  };
}
function summary(inputs) {
  const m = metrics(inputs);
  return '₹' + fmt.format(m.profit) + ' modelled profit · ₹' + fmt.format(m.unit) + ' contribution/unit · ' + m.margin + ' margin · ' + m.even + ' to break even';
}
function alternatives() {
  const source = ws.options.find(o => o.id === optionId);
  const versions = ws.scenarios.filter(s => s.option === optionId);
  const current = versions[0]?.inputs || source;
  return `<p>Compare the four options using the same assumptions. Pilot outcomes remain unknown.</p>
    <section><h2>Fixture comparison</h2>${ws.options.map(o => `<article><small>Option ${esc(o.id)}</small><h3>${esc(o.option)}</h3><p>${esc(summary(o))}</p></article>`).join('')}
    <a href="/signal/data/options.csv" target="_blank" rel="noopener">Inspect options.csv ↗</a></section>
    <section><h2>Sensitivity model</h2><label>Alternative <select id="model-option">${ws.options.map(o => `<option value="${esc(o.id)}" ${o.id===optionId?'selected':''}>${esc(o.option)}</option>`).join('')}</select></label>
    <p>Change whole units or rupees to preview the effect. Profit equals units × (net receipt − variable cost) − fixed cost.</p>
    <form id="model-form" data-base="${versions[0]?.version || 0}"><fieldset><legend>Scenario assumptions</legend>
    ${Object.entries(modelFields).map(([key,label]) => `<label class="model-input">${label}<input required type="number" min="0" max="90000000" step="1" name="${key}" value="${esc(current[key])}"></label>`).join('')}</fieldset>
    <p>Starting estimate · ${esc(summary(current))}</p><p><strong>Preview</strong> <output id="forecast" aria-live="polite"></output></p>
    ${ws.role==='Finance'?'<button class="primary">Save assumption version</button>':'<p>Only Finance can save a version. This preview is local.</p>'}
    <p role="alert" id="model-error"></p></form>
    <details><summary>Assumption history (${versions.length})</summary>${versions.map(s => `<article>Version ${s.version} · ${esc(s.author)} · ${esc(s.time)}<p>${esc(summary(s.inputs))}</p>${Object.entries(modelFields).map(([k,l])=>`<div>${l}: ${fmt.format(s.inputs[k])}</div>`).join('')}</article>`).join('')}</details></section>`;
}
function bindModel() {
  const form = get('model-form');
  function preview() {
    const inputs = Object.fromEntries(Object.keys(modelFields).map(k => [k,form.elements[k].valueAsNumber]));
    const valid = form.checkValidity();
    get('forecast').textContent = valid ? summary(inputs) : 'Enter whole values from 0 to 90,000,000 in every field.';
    return valid ? inputs : null;
  }
  get('model-option').onchange = e => {optionId=e.target.value; render(); get('model-option').focus()};
  form.oninput = preview;
  preview();
  form.onsubmit = async event => {
    event.preventDefault();
    const inputs = preview();
    if (!inputs || ws.role!=='Finance' || saving) return;
    saving = true;
    const controls = [...form.elements, get('model-option')];
    controls.forEach(el=>el.disabled=true);
    try {
      const res = await saveScenario(ws,{option:optionId,base:Number(form.dataset.base),inputs});
      const record = await res.json();
      if (!res.ok) throw Error(record);
      ws.scenarios.unshift(record);
      if (route==='alternatives') {render(); get('model-option').focus()}
      status.textContent = 'Saved assumption version '+record.version+'.';
    } catch(error) {
      if (form.isConnected) get('model-error').textContent = error.message+' Your preview is retained. Reload to inspect saved versions.';
    } finally {saving=false; controls.forEach(el=>el.disabled=false)}
  };
}

function render() {
  route=location.hash.slice(1)||'brief';
  const title=({brief:question,room:'Evidence Room',reconcile:'Reconcile',alternatives:'Alternatives'})[route]||'Unknown view';
  document.title=title+' · Signal';
  main.innerHTML=`<small>D001 / NOVA Project Fizz · Synthetic</small><h1 tabindex="-1">${esc(title)}</h1>`+
    (route==='alternatives'?alternatives():route==='brief'?brief():route==='room'?room():route==='reconcile'?reconcile():'<a href="#brief">Return to brief</a>');
  document.querySelectorAll('nav a').forEach(a=>{a.removeAttribute('aria-current');if(a.hash==='#'+route)a.setAttribute('aria-current','page')});
  if(route==='alternatives') bindModel();
  if(route==='room')updateSelection();
  if(get('reason')&&draft){get('reason').value=draft.reason;get('kind').value=draft.kind}
}
main.onclick=e=>{
  const source=e.target.dataset.source;
  if(source){get('detail').innerHTML=details(ws.evidence.find(x=>x.id===source));dialog.showModal()}
  if(e.target.id==='compare')location.hash='reconcile';
  if(e.target.id==='clear'){selected=[];updateSelection();remember();status.textContent='Selection cleared.'}
};
get('close').onclick=()=>dialog.close();
main.onchange=e=>{
  if(e.target.matches('.pick input')){
    selected=e.target.checked?[...selected,e.target.value]:selected.filter(x=>x!==e.target.value);
    updateSelection();remember();status.textContent=get('count').textContent;
  }
  if(e.target.id==='filter'){filter=e.target.value;remember();render();get('filter').focus()}
};
main.oninput=event=>{
  if(!get('reason')) return;
  const field=event.target;
  if(field.getAttribute('aria-invalid')==='true' && field.value.trim()){
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    get('error').textContent='';
  }
  draft={id:crypto.randomUUID(),kind:get('kind').value,reason:get('reason').value};
  remember();
};
let saving=false;
main.onsubmit=async e=>{
  if(route==='alternatives')return;
  e.preventDefault();
  if(saving)return;
  const kind=e.submitter?.name==='open'?'Open question':get('kind').value;
  const reason=get('reason').value.trim();
  if(!kind||!reason){get('error').textContent=!kind?'Choose a relationship.':'Enter a rationale or question.';const field=get(!kind?'kind':'reason');field.setAttribute('aria-invalid','true');field.setAttribute('aria-describedby','error');field.focus();return}
  draft ||= {id:crypto.randomUUID(),kind:get('kind').value,reason};
  const payload={id:draft.id,kind,reason,pair:selected.map(id=>ws.evidence.find(e=>e.id===id).version)};
  saving=true;
  const controls=[...e.target.elements];controls.forEach(c=>c.disabled=true);
  try{
    const response=await saveNote(ws,payload);
    const note=await response.json();if(!response.ok)throw Error(note);
    ws.notes=[note,...ws.notes.filter(n=>n.id!==note.id)];savedId=note.id;draft=null;remember();
    status.textContent='Saved '+kind+'.';location.hash='room';
  }catch(err){get('error').textContent='Save incomplete. '+err.message;controls.forEach(c=>c.disabled=false)}
  finally{saving=false}
};
window.onhashchange=()=>{
  if(location.hash==='#main'){history.replaceState(null,'','#'+route);main.focus();return}
  if(route==='reconcile'&&(saving||(draft&&!confirm('Discard your edited draft? Cancel to keep editing.')))){
    history.replaceState(null,'','#reconcile');return;
  }
  draft=null;remember();render();(get('note-'+savedId)||main.querySelector('h1')).focus();savedId=null;
};
try{
  ws=await openWorkspace();restore();render();
  get('demo-role').onchange=e=>{
    if(draft && !confirm('Discard your edited draft to change role?')){e.target.value=ws.role;return}
    draft=null;remember();ws.role=e.target.value;render();
  };
}catch{main.textContent='Workspace unavailable. Reload to retry.'}
