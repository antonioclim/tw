import { useEffect, useMemo, useState } from 'react'

const DEFAULT_BASE_URL = 'http://127.0.0.1:8080'

function normaliseBaseUrl(value) {
  const v = (value || '').trim()
  if (!v) return DEFAULT_BASE_URL
  return v.endsWith('/') ? v.slice(0, -1) : v
}

async function readJsonSafely(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return { _raw: text }
  }
}

function toCurl({ method, url, body }) {
  const m = method.toUpperCase()
  if (m === 'GET') {
    return `curl -i "${url}"`
  }
  if (!body) {
    return `curl -i -X ${m} "${url}"`
  }
  // Windows-friendly (cmd/powershell) version (double quotes)
  const bodyStr = JSON.stringify(body).replace(/"/g, '\\"')
  return `curl -i -X ${m} -H "Content-Type: application/json" -d "${bodyStr}" "${url}"`
}

export default function App() {
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL)
  const apiBase = useMemo(() => normaliseBaseUrl(baseUrl), [baseUrl])

  const [noteText, setNoteText] = useState('')
  const [deleteId, setDeleteId] = useState('')

  const [loading, setLoading] = useState(false)
  const [statusPill, setStatusPill] = useState({ ok: false, label: 'unknown' })

  const [notes, setNotes] = useState([])

  const [lastRequest, setLastRequest] = useState(null)
  const [lastResponse, setLastResponse] = useState(null)
  const [lastError, setLastError] = useState(null)

  const callApi = async ({ method, path, body }) => {
    const url = `${apiBase}${path}`
    const started = performance.now()

    setLastError(null)
    setLastResponse(null)
    setLoading(true)

    setLastRequest({ method, url, body: body ?? null, curl: toCurl({ method, url, body }) })

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 9000)

      const res = await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      })

      clearTimeout(timeout)

      const data = await readJsonSafely(res)
      const ms = Math.round(performance.now() - started)

      const headers = {}
      res.headers.forEach((v, k) => {
        headers[k] = v
      })

      const responsePayload = {
        ok: res.ok,
        status: res.status,
        ms,
        data,
        headers
      }

      setLastResponse(responsePayload)
      return responsePayload
    } catch (err) {
      const ms = Math.round(performance.now() - started)
      const message = err?.name === 'AbortError'
        ? `Timeout after ${ms}ms (request aborted).`
        : (err?.message || String(err))
      setLastError({ message, ms })
      return { ok: false, status: 0, ms, data: null }
    } finally {
      setLoading(false)
    }
  }

  const getHealth = async () => {
    const r = await callApi({ method: 'GET', path: '/health' })
    if (r.ok) {
      setStatusPill({ ok: true, label: `API OK (${r.ms}ms)` })
    } else {
      setStatusPill({ ok: false, label: 'API not reachable' })
    }
    return r
  }

  const getNotes = async () => {
    const r = await callApi({ method: 'GET', path: '/notes' })
    if (r.ok && Array.isArray(r.data)) {
      setNotes(r.data)
    }
    return r
  }

  const postNote = async () => {
    const content = (noteText || '').trim()
    if (!content) return
    const r = await callApi({ method: 'POST', path: '/notes', body: { content } })
    if (r.ok) {
      setNoteText('')
      await getNotes()
    }
  }

  const deleteNoteById = async (id) => {
    const v = String(id || '').trim()
    if (!v) return
    const r = await callApi({ method: 'DELETE', path: `/notes/${encodeURIComponent(v)}` })
    if (r.ok) {
      setDeleteId('')
      await getNotes()
    }
  }

  // On first load, we attempt a health check.
  // If the API is not started yet, the UI explains what to do.
  useEffect(() => {
    getHealth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="page">
      <header className="header">
        <h1>Tool – API Playground (Postman Lite)</h1>
        <p className="lead">
          Un client minimal, construit în React, pentru a exersa practic endpoint-urile
          <span className="code"> s12-notes-api</span>:
          <span className="code"> GET /health</span>, <span className="code"> GET /notes</span>,
          <span className="code"> POST /notes</span>, <span className="code"> DELETE /notes/:id</span>.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
          <span className={`pill ${statusPill.ok ? 'ok' : 'bad'}`}>{statusPill.label}</span>
          <span className="pill">UI port: <strong>3005</strong></span>
          <span className="pill">API default: <strong>127.0.0.1:8080</strong></span>
        </div>
      </header>

      <div className="grid">
        <section className="card">
          <h2>1) Configurare rapidă</h2>
          <p>
            Într-un flux de predare, porniţi mai întâi <strong>Notes API</strong> din Dashboard (port <strong>8080</strong>).
            Apoi, aici, verificaţi conectivitatea prin <strong>GET /health</strong>.
          </p>
          <label className="label">API Base URL</label>
          <input
            className="input"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder={DEFAULT_BASE_URL}
            spellCheck={false}
          />
          <div className="small" style={{ marginTop: 10 }}>
            Sugestie: folosim <strong>127.0.0.1</strong> (nu <em>localhost</em>) pentru a evita diferenţe de rezoluţie IPv4/IPv6 în anumite browsere.
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
            <button className="btn btnPrimary" onClick={getHealth} disabled={loading}>GET /health</button>
            <button className="btn" onClick={getNotes} disabled={loading}>GET /notes</button>
            <button className="btn" onClick={() => window.open(`${apiBase}/health`, '_blank')}>
              Open /health in browser
            </button>
            <button className="btn" onClick={() => window.open(`${apiBase}/notes`, '_blank')}>
              Open /notes in browser
            </button>
          </div>

          <hr />

          <div className="warn">
            <strong>Observaţie didactică:</strong> aceasta nu este o clonă de Postman.
            Este intenţionat „mică”, astfel încât să vedem clar legătura dintre:
            <span className="code"> metoda HTTP</span>, <span className="code"> URL</span>, <span className="code"> body JSON</span>
            şi <span className="code"> răspunsul serverului</span>.
          </div>
        </section>

        <section className="card">
          <h2>2) POST /notes – creare notă</h2>
          <p>
            Acum încercăm un request de tip <strong>POST</strong> cu body JSON.
            Serverul va genera un <span className="code">id</span> şi va adăuga nota în listă.
          </p>
          <label className="label">content</label>
          <textarea
            className="textarea"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Ex.: Notă demo pentru Seminar 12…"
          />

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            <button className="btn btnPrimary" onClick={postNote} disabled={loading || !noteText.trim()}>
              POST /notes
            </button>
            <button className="btn" onClick={getNotes} disabled={loading}>Refresh list</button>
          </div>

          <div className="small" style={{ marginTop: 10 }}>
            Într-un proiect real, aici aţi valida input-ul (lungime, caractere) şi aţi trata erori de tip
            4xx/5xx separat, eventual cu toast-uri sau boundary-uri de erori.
          </div>
        </section>

        <section className="card">
          <h2>3) DELETE /notes/:id – ştergere</h2>
          <p>
            Ştergerea este o operaţie idempotentă: dacă un <span className="code">id</span> nu există, serverul poate răspunde diferit în funcţie de implementare.
            În demo-ul nostru, folosim această operaţie pentru a ilustra fluxul async din <strong>Step 4</strong>.
          </p>

          <div className="grid2">
            <div>
              <label className="label">id</label>
              <input
                className="input"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                placeholder="Ex.: 2"
                spellCheck={false}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <button className="btn btnDanger" onClick={() => deleteNoteById(deleteId)} disabled={loading || !deleteId.trim()}>
                DELETE /notes/:id
              </button>
              <button className="btn" onClick={getNotes} disabled={loading}>Refresh</button>
            </div>
          </div>

          <hr />

          <h3>List (live)</h3>
          <p className="muted">
            După un <strong>GET /notes</strong>, aici puteţi şterge direct din listă (butonul „Delete”).
          </p>

          <div style={{ display: 'grid', gap: 10 }}>
            {notes.length === 0 ? (
              <div className="muted">Nu există note încă. Rulaţi <strong>GET /notes</strong> sau creaţi una cu <strong>POST /notes</strong>.</div>
            ) : (
              notes.map((n) => (
                <div className="noteItem" key={n.id}>
                  <div>
                    <div><strong>#{n.id}</strong> — {n.content}</div>
                    <div className="noteMeta">createdAt: {n.createdAt || '—'}</div>
                  </div>
                  <button className="btn btnDanger mini" onClick={() => deleteNoteById(n.id)} disabled={loading}>Delete</button>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="card">
          <h2>4) Ultima cerere / ultimul răspuns</h2>
          <p>
            În Postman, acest lucru apare implicit în UI.
            Aici îl afişăm deliberat „pe faţă”, pentru a putea discuta despre:
            <strong> status code</strong>, <strong>headers</strong>, <strong>body</strong> şi diferenţa dintre erori de reţea şi erori de aplicaţie.
          </p>

          {lastRequest ? (
            <>
              <h3>Request</h3>
              <pre>{JSON.stringify({ method: lastRequest.method, url: lastRequest.url, body: lastRequest.body }, null, 2)}</pre>
              <div className="small" style={{ marginTop: 10 }}>
                Echivalent cURL (util pentru demonstraţii rapide în terminal):
              </div>
              <pre>{lastRequest.curl}</pre>
            </>
          ) : (
            <div className="muted">Nicio cerere încă. Apăsaţi unul dintre butoanele de mai sus.</div>
          )}

          <hr />

          {loading ? (
            <div className="pill">Loading…</div>
          ) : lastError ? (
            <div className="warn">
              <strong>Network / runtime error</strong>
              <div style={{ marginTop: 6 }}>{lastError.message}</div>
              <div className="small" style={{ marginTop: 6 }}>
                Dacă API nu rulează: porniţi <strong>Notes API</strong> din Dashboard (port 8080) şi reîncercaţi.
              </div>
            </div>
          ) : lastResponse ? (
            <>
              <h3>Response</h3>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                <span className={`pill ${lastResponse.ok ? 'ok' : 'bad'}`}>status: {lastResponse.status}</span>
                <span className="pill">time: {lastResponse.ms}ms</span>
              </div>
              <pre>{JSON.stringify(lastResponse.data, null, 2)}</pre>
              <div className="small" style={{ marginTop: 10 }}>Headers (selected):</div>
              <pre>{JSON.stringify(lastResponse.headers, null, 2)}</pre>
            </>
          ) : (
            <div className="muted">Răspunsul va apărea aici după primul request.</div>
          )}

          <hr />

          <div className="okBox">
            <strong>Legătură cu Step 4 (Redux async):</strong>
            în <em>Step 4</em>, butonul „Delete” execută în esenţă acelaşi <span className="code">DELETE /notes/:id</span>,
            doar că request-ul este orchestrat prin Redux (acţiune async + reducer cu stări pending/fulfilled/rejected).
          </div>
        </section>
      </div>

      <footer className="footer">
        <div>
          Tip: pentru o demonstraţie completă, porniţi din Dashboard: <strong>Notes API</strong> → <strong>Tool – API Playground</strong> → <strong>Step 4</strong>.
        </div>
      </footer>
    </div>
  )
}
