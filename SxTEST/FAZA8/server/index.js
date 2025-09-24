import express from 'express'
const app = express()
const PORT = process.env.PORT || 3008

// Root: plain text (no HTML/CSP issues)
app.get('/', (_req,res)=> res
  .type('text/plain')
  .send('[FAZA8] helper OK\nUI (Vite dev): http://localhost:5174\n'))

// Favicon: return 204 to avoid 404 noise
app.get('/favicon.ico', (_req,res)=> res.status(204).end())

app.listen(PORT, ()=> console.log(`[FAZA8 helper] http://localhost:${PORT} (UI: http://localhost:5174)`))
