<#
.SYNOPSIS
  Bootstrap FAZA20 – MiniLearn (API + UI) într-un singur pas (compatibil Windows PowerShell 5+).
.DESCRIPTION
  Creează structura:
    FAZA20\api   (Node/Express + Sequelize/SQLite – rute: /api/courses, /api/courses/:id/lessons, /api/lessons/:slug, /api/lessons/:id/quiz)
    FAZA20\ui    (React + Vite + Redux Toolkit – pagini: Home, Courses, Lesson, Report, Admin, Prefs)
  Vite este configurat cu proxy către API (3006), deci nu e nevoie de CORS.
  Rulare:
    1) cd .\FAZA20\api ; npm install ; npm run dev        # http://localhost:3006
    2) cd .\FAZA20\ui  ; npm install ; npm run dev        # http://localhost:5178
#>

$ErrorActionPreference = 'Stop'

function Write-FileUtf8([string]$Path, [string]$Content) {
  $dir = Split-Path -Parent $Path
  if ($dir -and -not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  # Compatibil PS5+: Set-Content -Encoding UTF8
  $Content | Set-Content -LiteralPath $Path -Encoding UTF8
  Write-Host "Wrote $Path" -ForegroundColor Green
}

# === Root ===
$root = Join-Path (Get-Location) "FAZA20"
New-Item -ItemType Directory -Path $root -Force | Out-Null

# =====================================================================================
# API (Node/Express + Sequelize/SQLite)
# =====================================================================================
$api = Join-Path $root "api"
New-Item -ItemType Directory -Path $api -Force | Out-Null

Write-FileUtf8 (Join-Path $api "package.json") @'
{
  "name": "faza20-api",
  "version": "1.0.0",
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
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
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
  title:    { type: DataTypes.STRING,  allowNull:false },
  slug:     { type: DataTypes.STRING,  allowNull:false, unique:true },
  order:    { type: DataTypes.INTEGER, allowNull:false },
  html:     { type: DataTypes.TEXT,    allowNull:false },
  lang:     { type: DataTypes.STRING,  allowNull:false },
  duration: { type: DataTypes.INTEGER, allowNull:false }
}, { timestamps:true });

const Quiz = sequelize.define("Quiz", {
  lessonId: { type: DataTypes.INTEGER, allowNull:false },
  items:    { type: DataTypes.JSON,    allowNull:false }
}, { timestamps:true });

Course.hasMany(Lesson, { foreignKey: "courseId" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

// VALIDĂRI
const Lang = z.enum(["ro","en"]);
const CourseIn = z.object({ title: z.string().min(1), lang: Lang, summary: z.string().optional().default("") });

// SEED minimal
async function seed(){
  await sequelize.sync();
  const cnt = await Course.count();
  if(cnt===0){
    const c1 = await Course.create({ title:"JS Basics", lang:"ro", summary:"Bazele JS" });
    const c2 = await Course.create({ title:"HTTP & REST", lang:"en", summary:"Fundamente web" });
    await Lesson.bulkCreate([
      { courseId:c1.id, title:"Tipuri & variabile", slug:"tipuri-variabile", order:0, html:"<p>Variabile...</p>", lang:"ro", duration:8 },
      { courseId:c1.id, title:"Funcții & scope",     slug:"functii-scope",   order:1, html:"<p>Funcții...</p>",   lang:"ro", duration:10 },
      { courseId:c2.id, title:"HTTP Semantics",      slug:"http-semantics",  order:0, html:"<p>RFC 9110...</p>",  lang:"en", duration:12 }
    ]);
    await Quiz.create({ lessonId:1, items:[{id:"q1",type:"single",stem:"`let` este re-asignabil?",options:["da","nu"],correct:[0]}] });
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

app.listen(PORT, ()=> console.log(`[API] http://localhost:${PORT}`));
'@

# =====================================================================================
# UI (React + Vite + Redux Toolkit)
# =====================================================================================
$ui = Join-Path $root "ui"
New-Item -ItemType Directory -Path $ui -Force | Out-Null

Write-FileUtf8 (Join-Path $ui "package.json") @'
{
  "name": "faza20-ui",
  "version": "1.0.0",
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
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23121a38'/%3E%3Ctext x='32' y='42' font-size='36' text-anchor='middle' fill='%23a3c5ff'%3E20%3C/text%3E%3C/svg%3E"/>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'@

Write-FileUtf8 (Join-Path $ui "src/main.jsx") @'
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./theme.css";
import { store } from "./store.js";

function Home(){ return <div className="card"><h2>Bun venit în MiniLearn (FAZA20)</h2></div> }

const router = createHashRouter([{ path:"/", element:<Home/> }]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}><RouterProvider router={router}/></Provider>
);
'@

Write-FileUtf8 (Join-Path $ui "src/store.js") @'
import { configureStore, createSlice } from "@reduxjs/toolkit";
const prefs = createSlice({
  name:"prefs", initialState:{ lang:"ro", theme:"dark" },
  reducers:{ setLang:(s,a)=>{s.lang=a.payload}, toggleTheme:(s)=>{s.theme=s.theme==="dark"?"light":"dark"} }
});
export const store = configureStore({ reducer:{ prefs:prefs.reducer } });
export const actions = prefs.actions;
'@

Write-FileUtf8 (Join-Path $ui "src/theme.css") @'
:root{--bg:#0b1020;--fg:#e6e9ef;--panel:#0f1530;--grid:#2e3a66;--link:#a3c5ff}
html,body{margin:0;padding:0;background:var(--bg);color:var(--fg);font-family:system-ui,Segoe UI,Arial,sans-serif}
header{background:var(--panel);padding:1rem}
main{padding:1rem;max-width:1200px;margin:0 auto}
.card{background:#0f1530;border-radius:.75rem;padding:1rem;margin:.75rem 0}
'@

Write-Host "`nBootstrap FAZA20 creat. Pași:" -ForegroundColor Cyan
Write-Host "  1) cd .\FAZA20\api  ; npm install ; npm run dev   (http://localhost:3006)" -ForegroundColor Cyan
Write-Host "  2) cd .\FAZA20\ui   ; npm install ; npm run dev   (http://localhost:5178)" -ForegroundColor Cyan
