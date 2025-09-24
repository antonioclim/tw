// ===== Data sources =====
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
    { user:'u3', lessonId:201, score:70, status:'done' },
  ]
};

async function loadFromAPI(){
  try{
    // Proxy endpoints to FAZA6 (avoid CORS): /proxy/courses, /proxy/courses/:id/lessons
    const courses = await (await fetch('/proxy/courses')).json();
    const lessons = [];
    for(const c of courses){
      const ls = await (await fetch(`/proxy/courses/${c.id}/lessons`)).json();
      for(const l of ls){ lessons.push({ id:l.id, title:l.title, lang:l.lang, duration:l.duration }); }
    }
    // No progress API in FAZA6 → fallback to sample scores for demo
    return { lessons, progress: SAMPLE.progress };
  }catch(err){
    console.warn('API load failed; fallback to sample', err);
    status('API failed → using sample', true);
    return SAMPLE;
  }
}

// ===== Utils =====
function aggregate(lessons, progress){
  const by=new Map();
  for(const p of progress){
    const l = lessons.find(x=>x.id===p.lessonId); if(!l) continue;
    const rec = by.get(l.id) || { lessonId:l.id, title:l.title, lang:l.lang, duration:l.duration, scores:[] };
    rec.scores.push(p.score);
    by.set(l.id, rec);
  }
  const rows = [...by.values()].map(r=> ({...r, avgScore: Math.round(r.scores.reduce((a,b)=>a+b,0)/r.scores.length || 0)}));
  const totalDuration = rows.reduce((a,b)=>a+b.duration,0);
  return { rows, totalDuration };
}
function toCSV(rows){ const header=['lessonId','title','lang','duration','avgScore']; const esc=v=>'"'+String(v).replaceAll('"','""')+'"'; return '\ufeff'+header.join(',')+'\n'+rows.map(r=>header.map(h=>esc(r[h])).join(',')).join('\n'); }
function toExcelXML(rows){
  const cells = r => `<Cell><Data ss:Type='Number'>${r.lessonId}</Data></Cell>`+
                     `<Cell><Data ss:Type='String'>${r.title}</Data></Cell>`+
                     `<Cell><Data ss:Type='String'>${r.lang}</Data></Cell>`+
                     `<Cell><Data ss:Type='Number'>${r.duration}</Data></Cell>`+
                     `<Cell><Data ss:Type='Number'>${r.avgScore}</Data></Cell>`;
  const Row = r => `<Row>${cells(r)}</Row>`;
  const rowsXML = rows.map(Row).join('');
  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Worksheet ss:Name="Report">
  <Table>
   <Row>
    <Cell><Data ss:Type="String">lessonId</Data></Cell>
    <Cell><Data ss:Type="String">title</Data></Cell>
    <Cell><Data ss:Type="String">lang</Data></Cell>
    <Cell><Data ss:Type="String">duration</Data></Cell>
    <Cell><Data ss:Type="String">avgScore</Data></Cell>
   </Row>
   ${rowsXML}
  </Table>
 </Worksheet>
</Workbook>`;
}
function sortRows(arr,{key,dir}){ const s=[...arr].sort((a,b)=> a[key]<b[key]?-1:a[key]>b[key]?1:0 ); return dir==='asc'?s:s.reverse(); }
function filterRows(arr,{q,lang,minScore}){ return arr.filter(r => (!q || (r.title+' '+r.lang).toLowerCase().includes(q.toLowerCase())) && (!lang || r.lang===lang) && (r.avgScore>=minScore)); }
function paginate(arr,{page,perPage}){ const st=(page-1)*perPage; return arr.slice(st,st+perPage); }
function dl(name,text,mime='text/plain;charset=utf-8'){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:mime})); a.download=name; a.click(); URL.revokeObjectURL(a.href);}
function status(msg, warn=false){ const el=document.getElementById('status'); el.textContent=msg; el.style.color = warn? 'var(--danger)':'var(--accent)'; }

// ===== Persistence =====
const LS_KEY='f9_prefs';
function saveState(){ localStorage.setItem(LS_KEY, JSON.stringify({state, sort:state.sort, page:state.page})); }
function loadState(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)||''); }catch{ return null } }

// ===== State & Elements =====
const state={ q:'', lang:'', minScore:0, sort:{key:'title',dir:'asc'}, page:1, perPage:20, mode:'sample' };
let rows=[], totalDuration=0, filtered=[], pages=1;

const qEl = document.getElementById('q'), langEl=document.getElementById('lang'), minEl=document.getElementById('minScore'), perEl=document.getElementById('perPage'), resetEl=document.getElementById('reset'), modeEl=document.getElementById('mode');
const tbl=document.getElementById('tbl'), tbody=tbl.querySelector('tbody'), pageInfo=document.getElementById('pageInfo'), totalP=document.getElementById('total');
const prevBtn=document.getElementById('prev'), nextBtn=document.getElementById('next'), csvBtn=document.getElementById('csv'), jsonBtn=document.getElementById('json'), xlsBtn=document.getElementById('xls');
const donut=document.getElementById('donut'), stacked=document.getElementById('stacked'), drop=document.getElementById('drop');

// Restore persisted
const persisted = loadState();
if(persisted){ Object.assign(state, persisted.state||{}); applyToUI(); }

// Init load
loadData().then(()=> render());

async function loadData(){
  status('Loading '+state.mode+' data…');
  const src = state.mode==='api' ? await loadFromAPI() : SAMPLE;
  const agg = aggregate(src.lessons, src.progress);
  rows = agg.rows; totalDuration = agg.totalDuration;
  status('Loaded '+state.mode+' data.');
}

function applyToUI(){
  qEl.value = state.q; langEl.value = state.lang; minEl.value = String(state.minScore); perEl.value = String(state.perPage); modeEl.value = state.mode;
}

function onChange(){ state.page=1; saveState(); render(); }

// Events
qEl.addEventListener('input', ()=>{ state.q=qEl.value; onChange(); });
langEl.addEventListener('change', ()=>{ state.lang=langEl.value; onChange(); });
minEl.addEventListener('input', ()=>{ state.minScore=Number(minEl.value)||0; onChange(); });
perEl.addEventListener('change', ()=>{ state.perPage=Number(perEl.value)||20; onChange(); });
modeEl.addEventListener('change', async ()=>{ state.mode=modeEl.value; saveState(); await loadData(); render(); });
resetEl.addEventListener('click', ()=>{ Object.assign(state,{q:'',lang:'',minScore:0,sort:{key:'title',dir:'asc'},page:1}); applyToUI(); saveState(); render(); });
tbl.querySelectorAll('th').forEach(th => th.addEventListener('click', ()=>{ const k=th.dataset.key; state.sort = { key:k, dir:(state.sort.key===k && state.sort.dir==='asc')?'desc':'asc' }; onChange(); }));
prevBtn.addEventListener('click', ()=>{ if(state.page>1){ state.page--; saveState(); render(); } });
nextBtn.addEventListener('click', ()=>{ if(state.page<pages){ state.page++; saveState(); render(); } });
csvBtn.addEventListener('click', ()=> dl('report.csv', toCSV(filtered)) );
jsonBtn.addEventListener('click', ()=> dl('report.json', JSON.stringify({ meta:{ generatedAt:new Date().toISOString(), schema:'lesson-report@1' }, rows: filtered }, null, 2), 'application/json') );
xlsBtn.addEventListener('click', ()=> dl('report.xls', toExcelXML(filtered), 'application/vnd.ms-excel') );

// Drag & drop import
;['dragenter','dragover'].forEach(evt=> drop.addEventListener(evt, e=>{e.preventDefault(); drop.classList.add('drag');}));
;['dragleave','drop'].forEach(evt=> drop.addEventListener(evt, e=>{e.preventDefault(); drop.classList.remove('drag');}));
drop.addEventListener('drop', async e=>{
  const file = e.dataTransfer.files[0]; if(!file) return;
  const text = await file.text();
  try{
    const obj = JSON.parse(text);
    if(!Array.isArray(obj.rows)) throw new Error('rows missing');
    // Accept either exact shape or compute avgScore if scores provided
    rows = obj.rows.map(r=> ({ lessonId:r.lessonId??r.id, title:r.title, lang:r.lang, duration:Number(r.duration)||0, avgScore:Number(r.avgScore)||0 }));
    totalDuration = rows.reduce((a,b)=>a+b.duration,0);
    status('Report loaded from file.');
    render();
  }catch(err){
    status('Invalid JSON', true); console.error(err);
  }
});

// Render
function render(){
  filtered = filterRows(sortRows(rows, state.sort), state);
  pages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  const pageRows = paginate(filtered, state);
  tbody.innerHTML = pageRows.map(r=> `<tr><td>${r.title}</td><td>${r.lang}</td><td>${r.duration}</td><td>${r.avgScore}</td></tr>`).join('');
  pageInfo.textContent = ` Pagina ${state.page}/${pages} `;
  totalP.textContent = `Total estimated time: ${totalDuration} minutes`;
  drawDonut(filtered); drawStacked(filtered);
}

// Donut chart: share by language
function drawDonut(rows){
  const W=240,H=160,cx=120,cy=80,R=60,r=35;
  const sum = rows.reduce((a,b)=> a + 1, 0) || 1;
  const parts = Object.entries(rows.reduce((m,r)=> (m[r.lang]=(m[r.lang]||0)+1,m), {}));
  const colors = { ro:'#7aa2f7', en:'#a6e3a1', other:'#f38ba8' };
  let start=0, arcs='';
  for(const [lang,count] of parts){
    const frac = count/sum, end = start + frac*2*Math.PI;
    const x0 = cx + R*Math.cos(start), y0 = cy + R*Math.sin(start);
    const x1 = cx + R*Math.cos(end),   y1 = cy + R*Math.sin(end);
    const large = (end-start) > Math.PI ? 1 : 0;
    arcs += `<path d="M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} Z" fill="${colors[lang]||colors.other}" opacity="0.85"></path>`;
    start=end;
  }
  const hole = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--bg)"></circle>`;
  donut.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%">${arcs}${hole}</svg>`;
}

// Stacked bars: duration vs avgScore (normalized 0..1)
function drawStacked(rows){
  const W=500,H=160,pad=20,bw=Math.max(10,Math.floor((W-2*pad)/Math.max(1,rows.length)));
  const maxD = Math.max(1, ...rows.map(r=>r.duration)), maxS = 100;
  const bars = rows.map((r,i)=>{
    const dH = Math.round((r.duration/maxD)*(H-2*pad));
    const sH = Math.round((r.avgScore/maxS)*(H-2*pad));
    const x = pad + i*bw; const yD = H-pad-dH; const yS = yD - sH;
    return `<rect x="${x}" y="${yD}" width="${bw-2}" height="${dH}" fill="#89b4fa"></rect>
            <rect x="${x}" y="${yS}" width="${bw-2}" height="${sH}" fill="#94e2d5" opacity="0.85"></rect>`;
  }).join('');
  stacked.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%">${bars}</svg>`;
}
