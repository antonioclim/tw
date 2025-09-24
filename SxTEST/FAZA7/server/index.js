import express from 'express'
const app = express()
const PORT = process.env.PORT || 3007
// --- ET / nu mai întoarce HTML (care poate fi „încurcat” de CSP injectat), ci text simplu – mesajele „default-src 'none'” dispar ---
// --- GET /favicon.ico → 204 (nici un conținut) — nu mai apare 404 și nu se forțează încărcări de favicon sau inline style de către extensii ---



// --- date mock (nicio schimbare) ---
const courses = [
  { id:1, title:'React Basics', lang:'en', lessons:2 },
  { id:2, title:'JS Refresher', lang:'ro', lessons:1 }
]
const lessons = {
  1: [
    { id:11, title:'Components', lang:'en', duration:8, html:'<p>Components…</p>' },
    { id:12, title:'State & Props', lang:'en', duration:9, html:'<p>State & Props…</p>' }
  ],
  2: [
    { id:21, title:'Functions', lang:'ro', duration:7, html:'<p>Functions…</p>' }
  ]
}

// --- API ---
app.get('/api/courses', (_req,res)=> res.json(courses))
app.get('/api/courses/:id/lessons', (req,res)=> res.json(lessons[req.params.id] || []))

// --- Index minimal (evităm HTML/CSP; răspundem text/plain) ---
app.get('/', (_req,res)=>{
  res.type('text/plain').send(
    '[FAZA7 API] OK\n' +
    'Endpoints:\n' +
    '  GET /api/courses\n' +
    '  GET /api/courses/:id/lessons\n' +
    'UI (Vite dev): http://localhost:5173/#/courses\n'
  )
})

// --- favicon: 204 No Content (ca să nu vedem 404 + mesaje CSP pe favicon) ---
app.get('/favicon.ico', (_req,res)=> res.status(204).end())

app.listen(PORT, ()=> {
  console.log(`[FAZA7 API] http://localhost:${PORT}  (Vite dev UI on http://localhost:5173)`)
})
