// FAZA9 — public/main.js (all features)

// Sample data
const SAMPLE = {
  lessons: [
    { id:101, title:'Variabile', lang:'ro', duration:8 },
    { id:102, title:'Funcții',   lang:'ro', duration:10 },
    { id:201, title:'HTTP',      lang:'en', duration:9 }
  ],
  progress: [
    { user:'u1', lessonId:101, score:80, status:'done' },
    { user:'u1', lessonId:102, score:60, status:'done' },
    { user:'u2', lessonId:101, score:90, status:'done' },
    { user:'u3', lessonId:201, score:70, status:'done' }
  ]
};

// API via proxy to FAZA6
async function loadFromAPI(){
  try{
    const rc = await fetch('/proxy/courses');
    if(!rc.ok) throw new Error('bad gateway');
    const courses = await rc.json();
    const lessons = [];
    for(const c of courses){
      const rl = await fetch(`/proxy/courses/${c.id}/lessons`);
      if(!rl.ok) throw new Error('bad gateway');
      const ls = await rl.json();
      for(const l of ls){ lessons.push({ id:l.id, title:l.title, lang:l.lang, duration:l.duration }); }
    }
    status(`Loaded ${courses.length} courses / ${lessons.length} lessons from API.`);
    return { lessons, progress: SAMPLE.progress };
  }catch(err){
    console.warn('API load failed; fallback to sample', err);
    status('API failed → using sample', true);
    return SAMPLE;
  }
}

// Utils
function aggregate(lessons, progress){
  const by=new Map();
  for(const p of progress){
    const l = lessons.find(x=>x.id===p.lessonId); if(!l) continue;
    const rec = by.get(l.id) || { lessonId:l.id, title:l.title, lang:l.lang, duration:l.duration, scores:[] };
    rec.scores.push(p.score); by.set(l.id, rec);
  }
  const rows = [...by.values()].map(r=> ({...r, avgScore: Math.round((r.scores.reduce((a,b)=>a+b,0)/r.scores.length)||0)}));
  const totalDuration = rows.reduce((a,b)=>a+b.duration,0);
  return { rows, totalDuration };
}
function toCSV(rows){ const header=['lessonId','title','lang','duration','avgScore']; const esc=v=>'"'+String(v).replaceAll('"','""')+'"'; return '\ufeff'+header.join(',')+'\n'+rows.map(r=>header.map(h=>esc(r[h])).join(',')).join('\n'); }
function toExcelXML(rows){
  const cells = r => `<Cell><Data ss:Type='Number'>${r.lessonId}</Data></Cell>`+`<Cell><Data ss:Type='String'>${r.title}</Data></Cell>`+`<Cell><Data ss:Type='String'>${r.lang}</Data></Cell>`+`<Cell><Data ss:Type='Number'>${r.duration}</Data></Cell>`+`<Cell><Data ss:Type='Number'>${r.avgScore}</Data></Cell>`;
  const Row = r => `<Row>${cells(r)}</Row>`; const rowsXML = rows.map(Row).join('');
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Report"><Table>
  <Row><Cell><Data ss:Type="String">lessonId</Data></Cell><Cell><Data ss:Type="String">title</Data></Cell><Cell><Data ss:Type="String">lang</Data></Cell><Cell><Data ss:Type="String">duration</Data></Cell><Cell><Data ss:Type="String">avgScore</Data></Cell></Row>
  ${rowsXML}
 </Table></Worksheet></Workbook>`;
}
function sortRows(arr,{key,dir}){ const s=[...arr].sort((a,b)=>a[key]<b[key]?-1:a[key]>b[key]?1:0); return dir==='asc'?s:s.reverse(); }
function filterRows(arr,{q,lang,minScore}){ return arr.filter(r => (!q || (r.title+' '+r.lang).toLowerCase().includes(q.toLowerCase())) && (!lang || r.lang===lang) && (r.avgScore>=minScore)); }
function paginate(arr,{page,perPage}){ const st=(page-1)*perPage; return arr.slice(st,st+perPage); }
function dl(name,text,mime='text/plain;charset=utf-8'){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:mime})); a.download=name; a.click(); URL.revokeObjectURL(a.href);}
function status(msg, warn=false){ const el=document.getElementById('status'); if(!el) return; el.textContent=msg; el.style.color=warn?'var(--danger)':'var(--accent)'; }

// Persistence
const LS_KEY='f9_prefs';
function saveState(){ localStorage.setItem(LS_KEY, JSON.stringify({state, sort:state.sort, page:state.page})); }
function loadState(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)||''); }catch{ return null } }

// State & Elements
const state={ q:'', lang:'', minScore:0, sort:{key:'title',dir:'asc'}, page:1, perPage:20, mode:'sample' };
let rows=[], totalDuration=0, filtered=[], pages=1;
const qEl = document.getElementById('q'), langEl=document.getElementById('lang'), minEl=document.getElementById('minScore'), perEl=document.getElementById('perPage'), resetEl=document.getElementById('reset'), clearEl=document.getElementById('clear'), modeEl=document.getElementById('mode');
const tbl=document.getElementById('tbl'), tbody=tbl.querySelector('tbody'), pageInfo=document.getElementById('pageInfo'), totalP=document.getElementById('total');
const prevBtn=document.getElementById('prev'), nextBtn=document.getElementById('next'), csvBtn=document.getElementById('csv'), jsonBtn=document.getElementById('json'), xlsBtn=document.getElementById('xls'), pdfBtn=document.getElementById('pdf');
const donut=document.getElementById('donut'), stacked=document.getElementById('stacked'), drop=document.getElementById('drop');

const persisted = loadState(); if(persisted){ Object.assign(state, persisted.state||{}); applyToUI(); }
loadData().then(()=> render());

async function loadData(){
  status('Loading '+state.mode+' data…');
  const src = state.mode==='api' ? await loadFromAPI() : SAMPLE;
  const agg = aggregate(src.lessons, src.progress);
  rows = agg.rows; totalDuration = agg.totalDuration;
  status('Loaded '+state.mode+' data.');
}

function applyToUI(){ if(qEl) qEl.value=state.q; if(langEl) langEl.value=state.lang; if(minEl) minEl.value=String(state.minScore); if(perEl) perEl.value=String(state.perPage); if(modeEl) modeEl.value=state.mode; }
function onChange(){ state.page=1; saveState(); render(); }

// Events
qEl.addEventListener('input', ()=>{ state.q=qEl.value; onChange(); });
langEl.addEventListener('change', ()=>{ state.lang=langEl.value; onChange(); });
minEl.addEventListener('input', ()=>{ state.minScore=Number(minEl.value)||0; onChange(); });
perEl.addEventListener('change', ()=>{ state.perPage=Number(perEl.value)||20; onChange(); });
modeEl.addEventListener('change', async ()=>{ state.mode=modeEl.value; saveState(); await loadData(); render(); });
resetEl.addEventListener('click', ()=>{ Object.assign(state,{q:'',lang:'',minScore:0,sort:{key:'title',dir:'asc'},page:1}); applyToUI(); saveState(); render(); });
clearEl.addEventListener('click', ()=>{ rows=[]; totalDuration=0; state.page=1; saveState(); render(); status('Table cleared. Import a JSON or switch source.'); });
tbl.querySelectorAll('th').forEach(th => th.addEventListener('click', ()=>{ const k=th.dataset.key; state.sort={key:k,dir:(state.sort.key===k&&state.sort.dir==='asc')?'desc':'asc'}; onChange(); }));
prevBtn.addEventListener('click', ()=>{ if(state.page>1){ state.page--; saveState(); render(); } });
nextBtn.addEventListener('click', ()=>{ if(state.page<pages){ state.page++; saveState(); render(); } });
csvBtn.addEventListener('click', ()=> dl('report.csv', toCSV(filtered)) );
jsonBtn.addEventListener('click', ()=> dl('report.json', JSON.stringify({ meta:{ generatedAt:new Date().toISOString(), schema:'lesson-report@1' }, rows: filtered }, null, 2), 'application/json') );
xlsBtn.addEventListener('click', ()=> dl('report.xls', toExcelXML(filtered), 'application/vnd.ms-excel') );
pdfBtn.addEventListener('click', ()=> exportPDF());

// Drag&drop guards
;['dragenter','dragover'].forEach(evt => drop && drop.addEventListener(evt, e=>{ e.preventDefault(); drop.classList.add('drag'); }));
;['dragleave','drop'].forEach(evt => drop && drop.addEventListener(evt, e=>{ e.preventDefault(); drop.classList.remove('drag'); }));
if (drop) drop.addEventListener('drop', async e=>{
  e.preventDefault();
  const file = e.dataTransfer.files[0]; if(!file) return;
  try{
    const obj = JSON.parse(await file.text());
    if(!Array.isArray(obj.rows)) throw new Error('rows missing');
    rows = obj.rows.map(r=> ({ lessonId:r.lessonId??r.id, title:r.title, lang:r.lang, duration:Number(r.duration)||0, avgScore:Number(r.avgScore)||0 }));
    totalDuration = rows.reduce((a,b)=>a+b.duration,0);
    status('Report loaded from file.');
    render();
  }catch(err){ status('Invalid JSON', true); console.error(err); }
});

// Render & charts
function render(){
  filtered = filterRows(sortRows(rows, state.sort), state);
  pages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  const pageRows = paginate(filtered, state);
  tbody.innerHTML = pageRows.map(r=> `<tr><td>${r.title}</td><td>${r.lang}</td><td>${r.duration}</td><td>${r.avgScore}</td></tr>`).join('');
  pageInfo.textContent = ` Pagina ${state.page}/${pages} `;
  totalP.textContent = `Total estimated time: ${totalDuration} minutes`;
  drawDonut(filtered); drawStacked(filtered);
}
function drawDonut(rows){
  const W=240,H=160,cx=120,cy=80,R=60,r=35; const sum=rows.length||1;
  const parts = Object.entries(rows.reduce((m,r)=> (m[r.lang]=(m[r.lang]||0)+1, m), {}));
  const colors={ ro:'#7aa2f7', en:'#a6e3a1', other:'#f38ba8' }; let start=0, arcs='';
  for(const [lang,count] of parts){ const frac=count/sum, end=start+frac*2*Math.PI;
    const x0=cx+R*Math.cos(start), y0=cy+R*Math.sin(start); const x1=cx+R*Math.cos(end), y1=cy+R*Math.sin(end);
    arcs += `<path d="M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 ${(end-start)>Math.PI?1:0} 1 ${x1} ${y1} Z" fill="${colors[lang]||colors.other}" opacity="0.85"></path>`;
    start=end;
  }
  donut.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%"><circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--bg)"></circle>${arcs}</svg>`;
}
function drawStacked(rows){
  const W=500,H=160,pad=20,bw=Math.max(10,Math.floor((W-2*pad)/Math.max(1,rows.length)));
  const maxD=Math.max(1,...rows.map(r=>r.duration)), maxS=100;
  const bars = rows.map((r,i)=>{
    const dH=Math.round((r.duration/maxD)*(H-2*pad)); const sH=Math.round((r.avgScore/maxS)*(H-2*pad));
    const x=pad+i*bw; const yD=H-pad-dH; const yS=yD - sH;
    return `<rect x="${x}" y="${yD}" width="${bw-2}" height="${dH}" fill="#89b4fa"></rect><rect x="${x}" y="${yS}" width="${bw-2}" height="${sH}" fill="#94e2d5" opacity="0.85"></rect>`;
  }).join('');
  stacked.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%">${bars}</svg>`;
}

// Export PDF via print-to-PDF
function exportPDF(){
  const tableHTML  = document.getElementById('tableWrap').outerHTML;
  const chartsHTML = document.getElementById('chartsWrap').outerHTML;
  const totalHTML  = document.getElementById('total').outerHTML;
  const style = `<style>
    body{font-family:system-ui,Segoe UI,Arial,sans-serif;color:#111;margin:1rem}
    h1{margin:0 0 .5rem 0;font-size:22px}
    .meta{font-size:12px;color:#333;margin:0 0 1rem 0}
    table{border-collapse:collapse;width:100%}
    th,td{border:1px solid #999;padding:6px 8px;text-align:left;font-size:12px}
    th{background:#f1f3f5}
    .chart{border:1px solid #999;border-radius:8px;padding:8px;margin-top:8px}
    .charts{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    @media print{ .pagebreak{page-break-before:always} }
  </style>`;
  const now = new Date().toISOString();
  const win = window.open('', '_blank', 'noopener,noreferrer,width=1024,height=768');
  win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>FAZA9 Report — ${now}</title>${style}</head><body>`);
  win.document.write(`<h1>FAZA9 Report — ${now}</h1>`);
  win.document.write(`<p class="meta">Filters: q="${state.q}", lang="${state.lang||'all'}", minScore=${state.minScore}, perPage=${state.perPage}, sort=${state.sort.key}/${state.sort.dir}, mode=${state.mode}</p>`);
  win.document.write(tableHTML); win.document.write(totalHTML); win.document.write(`<div class="pagebreak"></div>`); win.document.write(chartsHTML);
  win.document.write(`</body></html>`); win.document.close(); win.focus(); setTimeout(()=> win.print(), 250);
}
