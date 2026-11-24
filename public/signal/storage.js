// Each browser owns its demo data. Only immutable synthetic fixtures are fetched.
let database;
const result = (value, status=200) => Response.json(value, {status});

function connection() {
  if (!database) database = new Promise((resolve,reject) => {
    const request=indexedDB.open('lotolipi-signal-v1',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('workspace');
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error);
  });
  return database;
}
async function transact(mode, action) {
  const db=await connection();
  return new Promise((resolve,reject)=>{
    const tx=db.transaction('workspace',mode);
    const store=tx.objectStore('workspace');
    const get=store.get('history');
    let output;
    get.onsuccess=()=>{
      const history=get.result || {notes:[],scenarios:[]};
      output=action(history);
      if(mode==='readwrite' && output.ok) store.put(history,'history');
    };
    tx.oncomplete=()=>resolve(output);
    tx.onabort=()=>reject(tx.error || Error('Browser storage unavailable.'));
  });
}
export async function openWorkspace(){
  const response=await fetch('/signal/workspace.json');
  if(!response.ok) throw Error('Workspace unavailable');
  const fixture=await response.json();
  try { Object.assign(fixture,await transact('readonly',history=>history)); }
  catch { /* The fixture remains readable when browser storage is unavailable. */ }
  return fixture;
}
export function saveNote(ws,{id,pair,kind,reason}) {
  if(ws.role!=='Insights') return result('Choose the Insights role to save a reading.',403);
  if(!Array.isArray(pair)||pair.length!==2||new Set(pair).size!==2||
     ![...ws.types,'Open question'].includes(kind)||!reason?.trim()||reason.length>2000)
    return result('Choose two sources, a classification and a rationale.',422);
  const snapshots=pair.map(v=>ws.evidence.find(e=>e.version===v));
  if(snapshots.some(e=>!e?.records.length)) return result('Source missing or changed.',409);
  return transact('readwrite',history=>{
    const prior=history.notes.find(n=>n.id===id);
    if(prior) return prior.kind===kind && prior.reason===reason && JSON.stringify(pair)===JSON.stringify(prior.pair)
      ? result(prior) : result('Submission changed. Reopen the pair.',409);
    const note={id,pair,kind,reason,snapshots,author:'Demo Insights',time:new Date().toISOString()};
    history.notes.unshift(note);
    return result(note,201);
  });
}
export function saveScenario(ws,{option,base,inputs}){
  if(ws.role!=='Finance') return result('Choose the Finance role to save assumptions.',403);
  const keys=['forecast_units','net_receipt_per_unit','variable_cost_per_unit','fixed_cost_inr'];
  if(!ws.options.some(o=>o.id===option)||!keys.every(k=>Number.isInteger(inputs[k]) && inputs[k]>=0 && inputs[k]<=90000000))
    return result('Check the scenario assumptions.',422);
  return transact('readwrite',history=>{
    const current=history.scenarios.find(s=>s.option===option)?.version || 0;
    if(current!==base) return result('A newer version exists. Reload to review it.',409);
    const record={option,version:base+1,inputs,author:'Demo Finance',time:new Date().toISOString()};
    history.scenarios.unshift(record);
    return result(record,201);
  });
}
