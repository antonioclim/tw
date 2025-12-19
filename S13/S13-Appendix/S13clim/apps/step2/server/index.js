const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 8080;

// --- &ldquo;Bază de date&rdquo; in-memory (suficientă pentru laborator) ---
let nextId = 4;
let books = [
  { id: 1, title: 'React', content: 'Componente, proprietăţi, stare' },
  { id: 2, title: 'Redux', content: 'Store, acţiuni, reductoare' },
  { id: 3, title: 'PrimeReact', content: 'DataTable, Dialog, Button' },
];

function normaliseString(x) {
  return (x ?? '').toString().toLowerCase();
}

function parseNonNegativeInt(x, fallback) {
  const n = Number.parseInt(x, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function filterBooks(query) {
  let result = books;

  // Filtrare pe titlu (CONTAINS)
  if (query.title) {
    const t = normaliseString(query.title);
    result = result.filter((b) => normaliseString(b.title).includes(t));
  }

  // Filtrare pe conţinut (CONTAINS)
  if (query.content) {
    const c = normaliseString(query.content);
    result = result.filter((b) => normaliseString(b.content).includes(c));
  }

  return result;
}

function responsePayload(query) {
  // 1) filtrare
  const filtered = filterBooks(query);

  // 2) paginare: fereastra [first, first + rows)
  const first = parseNonNegativeInt(query.first, 0);
  const rows = parseNonNegativeInt(query.rows, 5);

  const records = filtered.slice(first, first + rows);

  return {
    count: filtered.length, // total după filtrare (necesar paginatorului)
    records,
    first,
    rows
  };
}

app.get('/', (req, res) => {
  res.json({
    nume: 'S13v2 Books API',
    descriere: 'API minimal pentru filtrare şi paginare (laborator).',
    endpoints: [
      'GET    /books?title=...&content=...&first=0&rows=5',
      'POST   /books?first=...&rows=...&title=...&content=...',
      'PUT    /books/:id?first=...&rows=...&title=...&content=...',
      'DELETE /books/:id?first=...&rows=...&title=...&content=...'
    ]
  });
});

app.get('/books', (req, res) => {
  res.json(responsePayload(req.query));
});

app.post('/books', (req, res) => {
  const { title, content } = req.body || {};

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({ message: 'Titlul şi conţinutul trebuie să fie şiruri de caractere.' });
  }

  const book = { id: nextId++, title, content };
  books.push(book);

  res.json(responsePayload(req.query));
});

app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body || {};

  const idx = books.findIndex((b) => b.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Cartea nu a fost găsită.' });
  }

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({ message: 'Titlul şi conţinutul trebuie să fie şiruri de caractere.' });
  }

  books[idx] = { ...books[idx], title, content };
  res.json(responsePayload(req.query));
});

app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = books.findIndex((b) => b.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Cartea nu a fost găsită.' });
  }

  books.splice(idx, 1);
  res.json(responsePayload(req.query));
});

app.listen(PORT, () => {
  console.log(`S13v2 Books API rulează la http://localhost:${PORT}`);
});
