const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 8080;

// --- „Bază de date” in-memory (suficientă pentru laborator) ---
let nextId = 8;
let books = [
  { id: 1, title: 'React', content: 'Componente, proprietăţi, stare, efecte', pages: 280 },
  { id: 2, title: 'Redux', content: 'Store, acţiuni, reductoare, middleware', pages: 196 },
  { id: 3, title: 'PrimeReact', content: 'DataTable, Dialog, filtrare, paginare, sortare', pages: 144 },
  { id: 4, title: 'Algoritmi', content: 'Divide et impera, programare dinamică, grafuri', pages: 420 },
  { id: 5, title: 'Baze de date', content: 'Model relaţional, interogări, normalizare', pages: 360 },
  { id: 6, title: 'Metodologia cercetării', content: 'Ipoteze, design, validitate, replicabilitate', pages: 220 },
  { id: 7, title: 'Vizualizare de date', content: 'Percepţie, codare, integritate a reprezentării', pages: 510 }
];

function normaliseString(x) {
  return String(x ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function parseNonNegativeInt(x, fallback) {
  const n = Number.parseInt(x, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function parseStrictPositiveInt(x, fallback) {
  const n = Number.parseInt(x, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
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

function applySorting(list, sortField, sortOrder) {
  if (!sortField) return list;

  const allowed = new Set(['id', 'title', 'content', 'pages']);
  if (!allowed.has(sortField)) return list;

  const order = Number(sortOrder) === -1 ? -1 : 1;

  // Collator pentru consistenţă (diacritice) la sortarea textuală.
  const collator = new Intl.Collator('ro', { sensitivity: 'base' });

  const sorted = [...list].sort((a, b) => {
    const av = a[sortField];
    const bv = b[sortField];

    // Sortare numerică pentru id/pages (mărimi, nu şiruri).
    if (sortField === 'id' || sortField === 'pages') {
      const an = Number(av);
      const bn = Number(bv);
      const delta = (Number.isFinite(an) ? an : 0) - (Number.isFinite(bn) ? bn : 0);
      if (delta !== 0) return delta * order;
      // Tie-break determinist.
      return Number(a.id) - Number(b.id);
    }

    // Sortare lexicală pentru câmpuri textuale.
    const as = String(av ?? '');
    const bs = String(bv ?? '');
    const cmp = collator.compare(as, bs);
    if (cmp !== 0) return cmp * order;

    // Tie-break determinist.
    return Number(a.id) - Number(b.id);
  });

  return sorted;
}

function responsePayload(query) {
  // 1) filtrare
  let result = filterBooks(query);

  // 2) sortare (aplicată asupra întregului set filtrat)
  result = applySorting(result, query.sortField, query.sortOrder);

  // 3) paginare: fereastra [first, first + rows)
  const first = parseNonNegativeInt(query.first, 0);
  const rows = parseStrictPositiveInt(query.rows, 5);

  const records = result.slice(first, first + rows);

  return {
    count: result.length, // total după filtrare (necesar paginatorului)
    records,
    first,
    rows
  };
}

function computeStats(filtered) {
  const pagesList = filtered
    .map((b) => Number(b.pages))
    .filter((n) => Number.isFinite(n) && n > 0);

  const n = pagesList.length;

  const sortedPages = [...pagesList].sort((a, b) => a - b);

  const minPages = n ? sortedPages[0] : 0;
  const maxPages = n ? sortedPages[n - 1] : 0;

  const meanPages = n ? Math.round((pagesList.reduce((s, x) => s + x, 0) / n) * 10) / 10 : 0;

  const medianPages = n
    ? (n % 2 === 1 ? sortedPages[(n - 1) / 2] : (sortedPages[n / 2 - 1] + sortedPages[n / 2]) / 2)
    : 0;

  // Intervalizare pragmatică (didactic): patru clase de mărime.
  const ranges = [
    { label: '≤ 200 pagini', value: pagesList.filter((p) => p <= 200).length },
    { label: '201–400 pagini', value: pagesList.filter((p) => p >= 201 && p <= 400).length },
    { label: '401–800 pagini', value: pagesList.filter((p) => p >= 401 && p <= 800).length },
    { label: '> 800 pagini', value: pagesList.filter((p) => p > 800).length }
  ];

  const topByPages = [...filtered]
    .sort((a, b) => Number(b.pages) - Number(a.pages))
    .slice(0, 10)
    .map((b) => ({ title: b.title, pages: b.pages }));

  return {
    count: filtered.length,
    ranges,
    topByPages,
    pagesList,
    summary: { minPages, medianPages, meanPages, maxPages }
  };
}

app.get('/', (req, res) => {
  res.json({
    nume: 'S13v4 Books API',
    descriere: 'API minimal pentru CRUD + filtrare/paginare/sortare + statistici (grafice) — laborator.',
    endpoints: [
      'GET    /books?title=...&content=...&first=0&rows=5&sortField=title&sortOrder=1',
      'POST   /books?first=...&rows=...&sortField=...&sortOrder=...',
      'PUT    /books/:id?first=...&rows=...&sortField=...&sortOrder=...',
      'DELETE /books/:id?first=...&rows=...&sortField=...&sortOrder=...',
      'GET    /books/stats?title=...&content=...'
    ]
  });
});

app.get('/books', (req, res) => {
  res.json(responsePayload(req.query));
});

app.get('/books/stats', (req, res) => {
  const filtered = filterBooks(req.query);
  res.json(computeStats(filtered));
});

app.post('/books', (req, res) => {
  const { title, content, pages } = req.body || {};

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({ message: 'Titlul şi conţinutul trebuie să fie şiruri de caractere.' });
  }

  const t = title.trim();
  const c = content.trim();
  if (!t || !c) {
    return res.status(400).json({ message: 'Titlul şi conţinutul nu pot fi goale.' });
  }

  const p = Number.parseInt(pages, 10);
  if (!Number.isFinite(p) || p <= 0) {
    return res.status(400).json({ message: 'Numărul de pagini trebuie să fie un întreg pozitiv.' });
  }

  books.push({ id: nextId++, title: t, content: c, pages: p });
  res.json(responsePayload(req.query));
});

app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = books.findIndex((b) => b.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Cartea nu a fost găsită.' });
  }

  const { title, content, pages } = req.body || {};

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({ message: 'Titlul şi conţinutul trebuie să fie şiruri de caractere.' });
  }

  const t = title.trim();
  const c = content.trim();
  if (!t || !c) {
    return res.status(400).json({ message: 'Titlul şi conţinutul nu pot fi goale.' });
  }

  const p = Number.parseInt(pages, 10);
  if (!Number.isFinite(p) || p <= 0) {
    return res.status(400).json({ message: 'Numărul de pagini trebuie să fie un întreg pozitiv.' });
  }

  books[idx] = { ...books[idx], title: t, content: c, pages: p };
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
  console.log(`S13v4 Books API rulează la http://localhost:${PORT}`);
});
