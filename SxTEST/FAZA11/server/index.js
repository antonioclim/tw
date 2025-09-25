import express from 'express'
const app = express()
const PORT = process.env.PORT || 3011
app.get('/', (_req,res)=> res.type('text/plain').send('[FAZA11 helper] UI rulează cu Vite pe http://localhost:5177/'))
app.get('/favicon.ico', (_req,res)=> res.status(204).end())
app.listen(PORT, ()=> console.log(`[FAZA11 helper] http://localhost:${PORT} (Vite: http://localhost:5177/)`))
