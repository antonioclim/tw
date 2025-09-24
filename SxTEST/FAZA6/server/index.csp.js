import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')

const app = express()
const PORT = process.env.PORT || 3006

app.use((req,res,next)=>{
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'")
  next()
})

app.use(express.static(PUBLIC_DIR))
app.get('/favicon.ico', (_req,res)=> res.status(204).end())
app.get('/', (_req,res)=> res.sendFile(path.join(PUBLIC_DIR,'index.html')))

app.listen(PORT, ()=> console.log(`[FAZA6] http://localhost:${PORT}  (serving ${PUBLIC_DIR})`))
