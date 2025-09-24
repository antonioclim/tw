import express from 'express'
const app = express()
const PORT = process.env.PORT || 3010
app.get('/', (_req,res)=> res.type('text/plain').send('[FAZA10 helper] UI rulează cu Vite pe http://localhost:5176/#/'))
app.get('/favicon.ico', (_req,res)=> res.status(204).end())
app.listen(PORT, ()=> console.log(`[FAZA10 helper] http://localhost:${PORT} (Vite UI: http://localhost:5176)`))
