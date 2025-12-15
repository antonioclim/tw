const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();
app.use(cors());
app.use(express.json());

/**
 * In-memory dataset (for teaching/demo purposes).
 * A "note" has: { id: number, content: string }
 */
let nextId = 1;
let notes = [
  { id: nextId++, content: 'Redux: store, actions, reducers' },
  { id: nextId++, content: 'Async actions: middleware, pending/fulfilled/rejected' },
  { id: nextId++, content: 'Immutability: never mutate state directly' }
];

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 's12-notes-api', port: PORT, count: notes.length });
});

// Simple human-friendly landing page (useful when opening the API from the dashboard)
app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Seminar 12 Notes API</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 0; background: #0b1020; color: #e8eefc; }
      .wrap { max-width: 920px; margin: 0 auto; padding: 28px; }
      .card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); border-radius: 14px; padding: 18px; }
      h1 { margin: 0 0 6px 0; }
      p, li { color: #a7b2cf; }
      code { background: rgba(0,0,0,0.25); padding: 2px 6px; border-radius: 8px; color: #e8eefc; }
      a { color: #7aa2ff; }
      pre { background: rgba(0,0,0,0.30); padding: 12px; border-radius: 10px; overflow: auto; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>Seminar 12 – Notes API</h1>
      <p>Express server for Step 4 (Redux async). Default port: <code>${PORT}</code>.</p>

      <div class="card">
        <h2>Endpoints</h2>
        <ul>
          <li><code>GET /health</code> – status + number of notes</li>
          <li><code>GET /notes</code> – list notes (array)</li>
          <li><code>POST /notes</code> – create note (<code>{ content }</code>)</li>
          <li><code>PUT /notes/:id</code> – update note (<code>{ content }</code>)</li>
          <li><code>DELETE /notes/:id</code> – delete note</li>
        </ul>

        <p>Quick links: <a href="/health">/health</a> · <a href="/notes">/notes</a></p>

        <h3>Example payloads</h3>
        <pre>POST /notes
{
  "content": "A new note"
}</pre>

        <p><strong>Sugestie:</strong> UI-ul din Step 4 (port 3004) va apela acest API la <code>http://127.0.0.1:${PORT}</code> (sau <code>http://localhost:${PORT}</code>).</p>
      </div>
    </div>
  </body>
</html>`);
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { content } = req.body || {};
  if (typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ error: 'content must be a non-empty string' });
  }
  notes = [...notes, { id: nextId++, content: content.trim() }];
  res.json(notes);
});

app.put('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { content } = req.body || {};
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }
  if (typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ error: 'content must be a non-empty string' });
  }
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'note not found' });

  notes = notes.map(n => n.id === id ? { ...n, content: content.trim() } : n);
  res.json(notes);
});

app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'id must be a number' });
  }
  notes = notes.filter(n => n.id !== id);
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`[s12-notes-api] listening on http://127.0.0.1:${PORT} (also: http://localhost:${PORT})`);
  console.log(`[s12-notes-api] endpoints: GET /health, GET /notes, POST /notes, DELETE /notes/:id`);
});
