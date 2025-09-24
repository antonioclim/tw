import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import http from 'node:http'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')

const app  = express()
const PORT = process.env.PORT || 3009
const F6   = 'http://localhost:3006'

app.use('/public', express.static(PUBLIC_DIR))
app.get('/', (_req,res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')))
app.get('/favicon.ico', (_req,res) => res.status(204).end())

app.get('/proxy/courses', (_req,res) => proxy(`${F6}/api/courses`, res))
app.get('/proxy/courses/:id/lessons', (req,res) => proxy(`${F6}/api/courses/${req.params.id}/lessons`, res))

function proxy(target, res){
  try{
    const u   = new URL(target)
    const opt = { hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: 'GET' }
    const rq  = http.request(opt, rr => { res.writeHead(rr.statusCode || 502, rr.headers); rr.pipe(res) })
    rq.on('error', err => res.status(502).json({ error:{ code:'BAD_GATEWAY', message:String(err) } }))
    rq.end()
  }catch(err){
    res.status(500).json({ error:{ code:'PROXY_ERROR', message:String(err) } })
  }
}

app.listen(PORT, ()=> {
  console.log(`[FAZA9 v2] http://localhost:${PORT}`)
  console.log(`  • Serving static from: ${PUBLIC_DIR}`)
  console.log(`  • Proxy to FAZA6 at:  ${F6}`)
})
