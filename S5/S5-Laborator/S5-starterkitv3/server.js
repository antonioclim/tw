// server.js – definește aplicația Express; exportă `app` (fără listen aici)
const path = require('path');
const express = require('express');
const pkg = require('./package.json'); // pentru meta-informații health
const app = express();

// Middleware pentru JSON
app.use(express.json());

// "Baza de date" în memorie pentru exemplul /api/cats
let cats = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Bogdan' }
];
let currentCatId = 3;

// Endpoint informativ/health simplu
app.get('/api', (req, res) => {
  res.json({ status: 'API is running' });
});

// Endpoint health detaliat
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    name: pkg.name,
    version: pkg.version,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// API – GET /api/cats
app.get('/api/cats', (req, res) => {
  res.json(cats);
});

// API – POST /api/cats
app.post('/api/cats', (req, res) => {
  const body = req.body || {};
  if (!body.name || typeof body.name !== 'string') {
    return res.status(400).json({ error: 'Nume invalid' });
  }
  const newCat = { id: currentCatId++, name: body.name.trim() };
  cats.push(newCat);
  res.status(201).json(newCat);
});

// API – PUT /api/cats/:id
app.put('/api/cats/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = cats.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const body = req.body || {};
  if (typeof body.name === 'string') {
    cats[idx].name = body.name.trim();
  }
  res.json(cats[idx]);
});

// API – DELETE /api/cats/:id
app.delete('/api/cats/:id', (req, res) => {
  const id = Number(req.params.id);
  const initial = cats.length;
  cats = cats.filter(c => c.id !== id);
  if (cats.length === initial) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

// Servirea statică a exemplelor
const examplesDir = path.join(__dirname, 'examples');
app.use('/', express.static(examplesDir));

// Index simplu pentru rădăcină
app.get('/', (req, res) => {
  res.sendFile(path.join(examplesDir, 'index.html'));
});

module.exports = app;
