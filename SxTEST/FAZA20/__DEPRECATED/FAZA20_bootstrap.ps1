<#
.SYNOPSIS
  Bootstrap FAZA20 – MiniLearn (API + UI cu pagini: Home, Courses, Lesson, Report, Admin, Prefs).
.DESCRIPTION
  Creează structura:
    FAZA20\api  – Node/Express + Sequelize/SQLite (rute reale, seed minim; Zod validare)
    FAZA20\ui   – React + Vite + Redux Toolkit (Router, pagini, proxy spre API; export CSV/Excel/PDF; SVG)
  Rulare:
    1) cd .\FAZA20\api ; npm install ; npm run dev        # http://localhost:3006
    2) cd .\FAZA20\ui  ; npm install ; npm run dev        # http://localhost:5178  (proxy /api -> 3006)
#>

$ErrorActionPreference = 'Stop'

function Write-FileUtf8([string]$Path, [string]$Content) {
  $dir = Split-Path -Parent $Path
  if ($dir -and -not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $Content | Set-Content -LiteralPath $Path -Encoding UTF8
  Write-Host "Wrote $Path" -ForegroundColor Green
}

# === ROOT ===
$root = Join-Path (Get-Location) "FAZA20"
New-Item -ItemType Directory -Path $root -Force | Out-Null

# =====================================================================================
# API (Node/Express + Sequelize/SQLite + Zod) – FAZA6 consolidat
# =====================================================================================
$api = Join-Path $root "api"
New-Item -ItemType Directory -Path $api -Force | Out-Null

Write-FileUtf8 (Join-Path $api "package.json") @'
{
  "name": "faza20-api",
  "version": "1.1.0",
  "type": "module",
  "private": true,
  "scripts": { "dev": "node server/index.js" },
  "dependencies": {
    "express": "^4.19.2",
    "sequelize": "^6.37.3",
    "sqlite3": "^5.1.7",
    "zod": "^3.23.8"
  }
}
'@

Write-FileUtf8 (Join-Path $api "server/index.js") @'
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize, DataTypes } from "sequelize";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const dbFile     = path.join(__dirname, "minilearn.sqlite");

const app  = express();
const PORT = process.env.PORT || 3006;

app.use(express.json({ limit: "256kb" }));
app.use((req,res,next)=>{
  res.setHeader("Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  next();
});
app.get("/favicon.ico", (_req,res)=> res.status(204).end());

// DB
const sequelize = new Sequelize({ dialect: "sqlite", storage: dbFile, logging:false });

const Course = sequelize.define("Course", {
  title:   { type: DataTypes.STRING,  allowNull:false },
  lang:    { type: DataTypes.STRING,  allowNull:false },
  summary: { type: DataTypes.TEXT,    allowNull:true  }
}, { timestamps:true });

const Lesson = sequelize.define("Lesson", {
  courseId: { type: DataTypes.INTEGER, allowNull:false },
  title:    { type: DataTypes.STRING,  allowNull:false },
  slug:     { type: DataTypes.STRING,  allowNull:false, unique:true },
  order:    { type: DataTypes.INTEGER, allowNull:false },
  html:     { type: DataTypes.TEXT,    allowNull:false },
  lang:     { type: DataTypes.STRING,  allowNull:false },
  duration: { type: DataTypes.INTEGER, allowNull:false }
}, { timestamps:true });

const Quiz = sequelize.define("Quiz", {
  lessonId: { type: DataTypes.INTEGER, allowNull:false },
  items:    { type: DataTypes.JSON,    allowNull:false } // {id,type,stem,options[],correct[],feedback[]}
}, { timestamps:true });

Course.hasMany(Lesson, { foreignKey: "courseId" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

// VALIDĂRI Zod
const Lang = z.enum(["ro","en"]);
const CourseIn = z.object({ title: z.string().min(1), lang: Lang, summary: z.string().optional().default("") });
const LessonIn = z.object({
  courseId: z.number().int().positive(),
  title:    z.string().min(1),
  slug:     z.string().min(1),
  order:    z.number().int().nonnegative(),
  html:     z.string().min(1),
  lang:     Lang,
  duration: z.number().int().positive()
});

// SEED minimal
async function seed(){
  await sequelize.sync();
  const cnt = await Course.count();
  if(cnt===0){
    const c1 = await Course.create({ title:"JS Basics", lang:"ro", summary:"Bazele JS" });
    const c2 = await Course.create({ title:"HTTP & REST", lang:"en", summary:"Fundamente web" });
    const l1 = await Lesson.create({ courseId:c1.id, title:"Tipuri & variabile", slug:"tipuri-variabile", order:0, html:"<h2>Variabile</h2><p>let/const/var…</p>", lang:"ro", duration:8 });
    const l2 = await Lesson.create({ courseId:c1.id, title:"Funcții & scope",     slug:"functii-scope",   order:1, html:"<h2>Funcții</h2><p>Declarare, arrow…</p>",     lang:"ro", duration:10 });
    const l3 = await Lesson.create({ courseId:c2.id, title:"HTTP Semantics",      slug:"http-semantics",  order:0, html:"<h2>HTTP</h2><p>Status, metode…</p>",       lang:"en", duration:12 });
    await Quiz.create({ lessonId:l1.id, items:[{id:"q1",type:"single",stem:"`let` este re-asignabil?",options:["da","nu"],correct:[0],feedback:["Corect","Nu"]}] });
  }
}
await seed();

// ROUTES
app.get("/api/health", (_req,res)=> res.json({ status:"ok", ts: Date.now() }));

app.get("/api/courses", async (_req,res)=>{
  const rows = await Course.findAll({ order:[["id","ASC"]] });
  res.json(rows.map(r=>r.toJSON()));
});

app.post("/api/courses", async (req,res)=>{
  const p = CourseIn.safeParse(req.body);
  if(!p.success) return res.status(400).json({ error:{ code:"VALIDATION_ERROR", issues:p.error.issues } });
  const row = await Course.create(p.data);
  res.status(201).json(row.toJSON());
});

app.get("/api/courses/:id/lessons", async (req,res)=>{
  const rows = await Lesson.findAll({ where:{ courseId: req.params.id }, order:[["order","ASC"]] });
  res.json(rows.map(r=>r.toJSON()));
});

app.get("/api/lessons/:slug", async (req,res)=>{
  const row = await Lesson.findOne({ where:{ slug: req.params.slug }});
  if(!row) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  res.json(row.toJSON());
});

app.get("/api/lessons/:id/quiz", async (req,res)=>{
  const q = await Quiz.findOne({ where:{ lessonId: req.params.id }});
  if(!q) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  res.json(q.toJSON());
});

app.listen(PORT, ()=> console.log(`[API] http://localhost:${PORT}`));
'@

# =====================================================================================
# UI (React + Vite + Redux Toolkit) – FAZA7/10/11/12 integrate – pagini complete
# =====================================================================================
$ui = Join-Path $root "ui"
New-Item -ItemType Directory -Path $ui -Force | Out-Null

Write-FileUtf8 (Join-Path $ui "package.json") @'
{
  "name": "faza20-ui",
  "version": "1.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "react-redux": "^9.1.2",
    "@reduxjs/toolkit": "^2.2.5"
  },
  "devDependencies": { "vite": "^5.4.8" }
}
'@

Write-FileUtf8 (Join-Path $ui "vite.config.js") @'
import { defineConfig } from "vite";
export default defineConfig({
  server: {
    port: 5178,
    proxy: { "/api": "http://localhost:3006" }
  },
  build: { sourcemap: true },
  optimizeDeps: { esbuildOptions: { sourcemap: true } }
});
'@

Write-FileUtf8 (Join-Path $ui "index.html") @'
<!doctype html>
<html lang="ro">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>FAZA20 - MiniLearn</title>
    <link rel="icon"
      href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23121a38'/%3E%3Ctext x='32' y='42' font-size='36' text-anchor='middle' fill='%23a3c5ff'%3E20%3C/text%3E%3C/svg%3E"/>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'@

Write-FileUtf8 (Join-Path $ui "src/theme.css") @'
:root{--bg:#0b1020;--fg:#e6e9ef;--panel:#0f1530;--grid:#2e3a66;--link:#a3c5ff}
html,body{margin:0;padding:0;background:var(--bg);color:var(--fg);font-family:system-ui,Segoe UI,Arial,sans-serif}
a{color:var(--link);text-decoration:underline}
header{background:var(--panel);padding:1rem}
main{padding:1rem;max-width:1200px;margin:0 auto}
.card{background:#0f1530;border-radius:.75rem;padding:1rem;margin:.75rem 0}
table{width:100%;border-collapse:collapse} th,td{border:1px solid var(--grid);padding:.5rem .6rem;text-align:left} th{background:#121a38}
.controls{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;margin:.5rem 0}
.hint{opacity:.7}
.chart{border:1px solid var(--grid);border-radius:.6rem;padding:.5rem;min-height:140px}
.light body, .light main{ background:#f5f7fb; color:#0c1020 }
'@

# -- store.js (prefs + progress + selectors) --
Write-FileUtf8 (Join-Path $ui "src/store.js") @'
import { configureStore, createSlice, createSelector } from "@reduxjs/toolkit";
const LS="ml_prefs";
const load = ()=> { try{ return JSON.parse(localStorage.getItem(LS)||"{}") }catch{ return {} } };
const save = (s)=> { try{ localStorage.setItem(LS, JSON.stringify({ prefs: s.prefs })) }catch{} };

const prefs = createSlice({
  name:"prefs", initialState:{ lang:"ro", theme:"dark" },
  reducers:{ setLang:(s,a)=>{ s.lang=a.payload }, toggleTheme:(s)=>{ s.theme=s.theme==="dark"?"light":"dark" } }
});
const progress = createSlice({
  name:"progress", initialState:{ byLesson:{}, attempts:[] },
  reducers:{
    mark:(s,a)=>{ const {id,score}=a.payload; s.byLesson[id]={status:"done",score}; s.attempts.push({id,score,ts:Date.now()}); },
    reset:(s)=>{ s.byLesson={}; s.attempts=[]; }
  }
});

export const store = configureStore({ reducer:{ prefs:prefs.reducer, progress:progress.reducer }, preloadedState: load() });
store.subscribe(()=> save(store.getState()));
export const actions = { ...prefs.actions, ...progress.actions };

// selectors
export const selectAttempts = s=> s.progress.attempts;
export const selectAvgScore = createSelector(selectAttempts, A=> A.length? Math.round(A.reduce((a,b)=>a+b.score,0)/A.length):0);
export const selectTopK = k => createSelector(selectAttempts, A=> [...A].sort((x,y)=>y.score-x.score).slice(0,k));
'@

# -- Shell + Router --
Write-FileUtf8 (Join-Path $ui "src/shell/Shell.jsx") @'
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store.js";

export default function Shell(){
  const dispatch = useDispatch();
  const theme = useSelector(s=> s.prefs.theme);
  const link = ({isActive})=>({ textDecoration: isActive? "underline double" : "underline" });
  return (<div className={theme==="light"?"light":""}>
    <header>
      <h1>FAZA20 – MiniLearn</h1>
      <nav>
        <NavLink to="/" style={link}>Acasă</NavLink>{" "}
        <NavLink to="/courses" style={link}>Cursuri</NavLink>{" "}
        <NavLink to="/report" style={link}>Raport</NavLink>{" "}
        <NavLink to="/admin" style={link}>Admin</NavLink>{" "}
        <NavLink to="/prefs" style={link}>Preferințe</NavLink>{" "}
        <button onClick={()=> dispatch(actions.toggleTheme())}>Tema ({theme})</button>
      </nav>
    </header>
    <main><Outlet/></main>
  </div>);
}
'@

Write-FileUtf8 (Join-Path $ui "src/pages/Home.jsx") @'
import React from "react";
export default function Home(){
  return <div className="card"><h2>Bun venit în MiniLearn (FAZA20)</h2><p>Platformă de micro-învățare: cursuri, lecții, quiz, progres, raportare și export.</p></div>;
}
'@

# -- Courses: fetch /api/courses, sort/filter --
Write-FileUtf8 (Join-Path $ui "src/pages/Courses.jsx") @'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses(){
  const [data,setData] = useState([]);
  const [q,setQ] = useState(""); const [lang,setLang] = useState(""); const [sort,setSort]=useState({key:"title",dir:"asc"});

  async function load(){
    try{ const r = await fetch("/api/courses"); if(!r.ok) throw 0; setData(await r.json()); }
    catch{ setData([]); }
  }
  useEffect(()=>{ load(); },[]);

  const filtered = data.filter(c => (!q || c.title.toLowerCase().includes(q.toLowerCase())) && (!lang || c.lang===lang));
  const sorted = [...filtered].sort((a,b)=> a[sort.key]<b[sort.key]?-1:a[sort.key]>b[sort.key]?1:0);
  const rows = sort.dir==="asc"? sorted : sorted.reverse();

  return <div className="card">
    <h2>Cursuri</h2>
    <div className="controls">
      <input placeholder="Caută..." value={q} onChange={e=>setQ(e.target.value)}/>
      <select value={lang} onChange={e=>setLang(e.target.value)}><option value="">(toate)</option><option>ro</option><option>en</option></select>
    </div>
    <table>
      <thead><tr>
        <th onClick={()=> setSort({key:"title",dir:sort.key==="title"&&sort.dir==="asc"?"desc":"asc"})}>Title</th>
        <th onClick={()=> setSort({key:"lang", dir:sort.key==="lang" &&sort.dir==="asc"?"desc":"asc"})}>Lang</th>
        <th>→</th>
      </tr></thead>
      <tbody>
        {rows.map(c=> <tr key={c.id}>
          <td>{c.title}</td><td>{c.lang}</td><td><Link to={`/lesson/${c.id}`}>lecții »</Link></td>
        </tr>)}
      </tbody>
    </table>
  </div>;
}
'@

# -- Lesson: fetch /api/courses/:id/lessons --
Write-FileUtf8 (Join-Path $ui "src/pages/Lesson.jsx") @'
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Lesson(){
  const { id } = useParams();
  const [data,setData] = useState([]);
  useEffect(()=>{ (async()=>{
    try{ const r = await fetch(`/api/courses/${id}/lessons`); if(!r.ok) throw 0; setData(await r.json()); }
    catch{ setData([]); }
  })() },[id]);

  return <div className="card">
    <h2>Lecții pentru curs {id}</h2>
    {data.length===0? <p>(fără lecții sau API indisponibil)</p> :
    <table><thead><tr><th>Title</th><th>Lang</th><th>Duration</th></tr></thead>
      <tbody>{data.map(l=> <tr key={l.id}><td>{l.title}</td><td>{l.lang}</td><td>{l.duration}</td></tr>)}</tbody></table>}
    <p><Link to="/courses">← Înapoi</Link></p>
  </div>;
}
'@

# -- Report: agregări + export CSV/Excel/PDF + grafice minime (SVG) --
Write-FileUtf8 (Join-Path $ui "src/pages/Report.jsx") @'
import React, { useEffect, useState } from "react";

const toCSV = rows => {
  const header=["lessonId","title","lang","duration","avgScore"];
  const esc = v => "\"" + String(v).replaceAll("\"","\"\"") + "\"";
  return "\\ufeff" + header.join(",") + "\\n" + rows.map(r=> header.map(h=>esc(r[h])).join(",")).join("\\n");
};
const toExcelXML = rows => {
  const cells=r=>`<Cell><Data ss:Type='Number'>${r.lessonId}</Data></Cell><Cell><Data ss:Type='String'>${r.title}</Data></Cell><Cell><Data ss:Type='String'>${r.lang}</Data></Cell><Cell><Data ss:Type='Number'>${r.duration}</Data></Cell><Cell><Data ss:Type='Number'>${r.avgScore}</Data></Cell>`;
  const Row=r=>`<Row>${cells(r)}</Row>`; const rowsXML=rows.map(Row).join('');
  return `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Report"><Table><Row><Cell><Data ss:Type="String">lessonId</Data></Cell><Cell><Data ss:Type="String">title</Data></Cell><Cell><Data ss:Type="String">lang</Data></Cell><Cell><Data ss:Type="String">duration</Data></Cell><Cell><Data ss:Type="String">avgScore</Data></Cell></Row>${rowsXML}</Table></Worksheet></Workbook>`;
};
const dl=(name,text,mime='text/plain;charset=utf-8')=>{const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:mime})); a.download=name; a.click(); URL.revokeObjectURL(a.href)};

function aggregate(lessons, progress){
  const by=new Map();
  for(const p of progress){
    const l = lessons.find(x=>x.id===p.lessonId); if(!l) continue;
    const rec = by.get(l.id) || { lessonId:l.id, title:l.title, lang:l.lang, duration:l.duration, scores:[] };
    rec.scores.push(p.score); by.set(l.id, rec);
  }
  const rows=[...by.values()].map(r=>({...r, avgScore: Math.round((r.scores.reduce((a,b)=>a+b,0)/r.scores.length)||0)}));
  const totalDuration = rows.reduce((a,b)=>a+b.duration,0);
  return { rows, totalDuration };
}

export default function Report(){
  const [lessons,setLessons]=useState([]);
  const [progress] = useState([{user:"u1",lessonId:1,score:80},{user:"u1",lessonId:2,score:60},{user:"u2",lessonId:1,score:90}]);
  const [q,setQ]=useState(""); const [lang,setLang]=useState(""); const [min,setMin]=useState(0);
  const [sort,setSort]=useState({key:"title",dir:"asc"}); const [page,setPage]=useState(1); const [per,setPer]=useState(20);

  useEffect(()=>{ (async()=>{
    try{
      const rc=await fetch("/api/courses"); if(!rc.ok) throw 0;
      const courses=await rc.json(); const res=[];
      for(const c of courses){ const r=await fetch(`/api/courses/${c.id}/lessons`); if(r.ok){ const ls=await r.json(); for(const l of ls) res.push({id:l.id,title:l.title,lang:l.lang,duration:l.duration}) } }
      setLessons(res);
    }catch{ setLessons([]); }
  })() },[]);

  const ag = aggregate(lessons, progress);
  const filtered = ag.rows.filter(r => (!q || (r.title+' '+r.lang).toLowerCase().includes(q.toLowerCase())) && (!lang || r.lang===lang) && (r.avgScore>=min));
  const sorted = [...filtered].sort((a,b)=> a[sort.key]<b[sort.key]?-1:a[sort.key]>b[sort.key]?1:0); const rows = sort.dir==="asc"?sorted:sorted.reverse();
  const pages = Math.max(1, Math.ceil(rows.length / per)); const pageRows = rows.slice((page-1)*per, (page-1)*per+per);

  function exportPDF(){
    const tableHTML = document.getElementById('rptTbl')?.outerHTML || '';
    const style = `<style>body{font-family:system-ui;color:#111;margin:1rem}table{border-collapse:collapse;width:100%}th,td{border:1px solid #999;padding:6px 8px}</style>`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>MiniLearn Report</title>${style}</head><body>${tableHTML}</body></html>`;
    let w=null; try{ w=window.open('','_blank','noopener,noreferrer,width=1024,height=768') }catch{}
    if(w && w.document){ w.document.open(); w.document.write(html); w.document.close(); w.focus(); setTimeout(()=> w.print(), 250); return; }
    const iframe=document.createElement('iframe'); iframe.style.width='0'; iframe.style.height='0'; document.body.appendChild(iframe);
    const doc=iframe.contentDocument||iframe.contentWindow.document; doc.open(); doc.write(html); doc.close(); setTimeout(()=>{ doc.defaultView.print(); document.body.removeChild(iframe) },300);
  }

  // grafic minimal donut + stacked
  const donut = (()=> {
    const W=240,H=160,cx=120,cy=80,R=60,r=35;
    const sum = rows.length || 1;
    const parts = Object.entries(rows.reduce((m,r)=> (m[r.lang]=(m[r.lang]||0)+1, m), {}));
    let start=0, arcs=''; const colors={ro:"#7aa2f7", en:"#a6e3a1", other:"#f38ba8"};
    for(const [lg,ct] of parts){
      const frac=ct/sum, end=start+frac*2*Math.PI;
      const x0=cx+R*Math.cos(start), y0=cy+R*Math.sin(start);
      const x1=cx+R*Math.cos(end),   y1=cy+R*Math.sin(end);
      arcs += \`<path d="M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 \${(end-start)>Math.PI?1:0} 1 ${x1} ${y1} Z" fill="\${colors[lg]||colors.other}" opacity="0.85"></path>\`;
      start=end;
    }
    return \`<svg viewBox="0 0 \${W} \${H}" width="100%" height="100%"><circle cx="\${cx}" cy="\${cy}" r="\${r}" fill="#fff0"/>\${arcs}</svg>\`;
  })();

  const stacked = (()=> {
    const W=500,H=160,pad=20,bw=Math.max(10,Math.floor((W-2*pad)/Math.max(1,rows.length)));
    const maxD=Math.max(1,...rows.map(r=>r.duration)), maxS=100;
    const bars=rows.map((r,i)=>{ const dH=Math.round((r.duration/maxD)*(H-2*pad)), sH=Math.round((r.avgScore/maxS)*(H-2*pad));
      const x=pad+i*bw, yD=H-pad-dH, yS=yD-sH;
      return \`<rect x="\${x}" y="\${yD}" width="\${bw-2}" height="\${dH}" fill="#89b4fa"></rect>
              <rect x="\${x}" y="\${yS}" width="\${bw-2}" height="\${sH}" fill="#94e2d5" opacity="0.85"></rect>\`;
    }).join('');
    return \`<svg viewBox="0 0 \${W} \${H}" width="100%" height="100%">\${bars}</svg>\`;
  })();

  return <div className="card">
    <h2>Raport</h2>
    <div className="controls">
      <input placeholder="Caută..." value={q} onChange={e=>{setQ(e.target.value); setPage(1)}}/>
      <select value={lang} onChange={e=>{setLang(e.target.value); setPage(1)}}><option value="">(toate)</option><option>ro</option><option>en</option></select>
      <label>Scor minim: <input type="number" min="0" max="100" value={min} onChange={e=>{setMin(Number(e.target.value)||0); setPage(1)}} style={{width:"5rem"}}/></label>
      <label>Per pagină: <select value={per} onChange={e=>{setPer(Number(e.target.value)); setPage(1)}}><option>10</option><option>20</option><option>50</option></select></label>
    </div>

    <table id="rptTbl">
      <thead><tr>
        <th onClick={()=>setSort({key:"title",   dir:sort.key==="title"   &&sort.dir==="asc"?"desc":"asc"})}>Title</th>
        <th onClick={()=>setSort({key:"lang",    dir:sort.key==="lang"    &&sort.dir==="asc"?"desc":"asc"})}>Lang</th>
        <th onClick={()=>setSort({key:"duration",dir:sort.key==="duration"&&sort.dir==="asc"?"desc":"asc"})}>Duration</th>
        <th onClick={()=>setSort({key:"avgScore",dir:sort.key==="avgScore"&&sort.dir==="asc"?"desc":"asc"})}>Avg</th>
      </tr></thead>
      <tbody>{pageRows.map(r=> <tr key={r.lessonId}><td>{r.title}</td><td>{r.lang}</td><td>{r.duration}</td><td>{r.avgScore}</td></tr>)}</tbody>
    </table>

    <div className="controls"><button onClick={()=> setPage(p=> Math.max(1,p-1))}>Prev</button><span> Pagina {page}/{pages} </span><button onClick={()=> setPage(p=> Math.min(pages,p+1))}>Next</button></div>
    <div className="controls">
      <button onClick={()=> dl("report.csv", toCSV(rows))}>Export CSV</button>
      <button onClick={()=> dl("report.xls", toExcelXML(rows), "application/vnd.ms-excel")}>Export Excel</button>
      <button onClick={exportPDF}>Export PDF</button>
    </div>

    <div className="controls"><span className="hint">Grafice:</span></div>
    <div className="controls">
      <div className="chart" dangerouslySetInnerHTML={{__html: donut}}></div>
      <div className="chart" dangerouslySetInnerHTML={{__html: stacked}}></div>
    </div>
  </div>;
}
'@

# -- Admin: POST /api/courses --
Write-FileUtf8 (Join-Path $ui "src/pages/Admin.jsx") @'
import React, { useState } from "react";
export default function Admin(){
  const [title,setTitle]=useState(""); const [lang,setLang]=useState("ro"); const [summary,setSummary]=useState(""); const [msg,setMsg]=useState("");
  async function create(){
    setMsg("...");
    try{
      const r = await fetch("/api/courses",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ title, lang, summary }) });
      const t = await r.text(); if(!r.ok) throw new Error(t);
      setMsg("Creat!"); setTitle(""); setSummary("");
    }catch(e){ setMsg("Eroare: "+e.message); }
  }
  return <div className="card">
    <h2>Admin – Curs nou</h2>
    <div className="controls">
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
      <select value={lang} onChange={e=>setLang(e.target.value)}><option>ro</option><option>en</option></select>
      <input placeholder="Summary" value={summary} onChange={e=>setSummary(e.target.value)} style={{minWidth:"18rem"}}/>
      <button onClick={create}>Creează</button> <span>{msg}</span>
    </div>
  </div>;
}
'@

# -- Preferințe: limbă/temă persistente --
Write-FileUtf8 (Join-Path $ui "src/pages/Prefs.jsx") @'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store.js";
export default function Prefs(){
  const dispatch = useDispatch();
  const prefs = useSelector(s=> s.prefs);
  return <div className="card">
    <h2>Preferințe</h2>
    <div className="controls">
      <label>Limba: <select value={prefs.lang} onChange={e=> dispatch(actions.setLang(e.target.value))}><option>ro</option><option>en</option></select></label>
      <button onClick={()=> dispatch(actions.toggleTheme())}>Comută tema ({prefs.theme})</button>
    </div>
    <pre>{JSON.stringify(prefs,null,2)}</pre>
  </div>;
}
'@

# -- Router main.jsx (toate paginile + Shell) --
Write-FileUtf8 (Join-Path $ui "src/main.jsx") @'
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./theme.css";
import { store } from "./store.js";
import Shell from "./shell/Shell.jsx";
import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import Lesson from "./pages/Lesson.jsx";
import Report from "./pages/Report.jsx";
import Admin from "./pages/Admin.jsx";
import Prefs from "./pages/Prefs.jsx";

const router = createHashRouter([
  { path:"/", element:<Shell/>, children:[
    { index:true, element:<Home/> },
    { path:"courses", element:<Courses/> },
    { path:"lesson/:id", element:<Lesson/> },
    { path:"report", element:<Report/> },
    { path:"admin", element:<Admin/> },
    { path:"prefs", element:<Prefs/> }
  ]}
], { future:{ v7_startTransition:true, v7_relativeSplatPath:true } });

createRoot(document.getElementById("root")).render(
  <Provider store={store}><RouterProvider router={router} future={{ v7_startTransition:true, v7_relativeSplatPath:true }}/></Provider>
);
'@

Write-Host "`nBootstrap FAZA20 scris. Pași:" -ForegroundColor Cyan
Write-Host "  1) cd .\FAZA20\api  ; npm install ; npm run dev   (http://localhost:3006)" -ForegroundColor Cyan
Write-Host "  2) cd .\FAZA20\ui   ; npm install ; npm run dev   (http://localhost:5178)" -ForegroundColor Cyan
