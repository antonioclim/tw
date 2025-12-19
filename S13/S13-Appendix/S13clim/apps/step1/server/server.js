const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let nextId = 3;

// Set minimal de date în memorie (seed) pentru a avea conţinut vizibil imediat.
let books = [
  { id: 1, title: 'Cod curat (Clean Code)', content: 'Un ghid de bune practici pentru meşteşugul programării agile.' },
  { id: 2, title: 'Programatorul pragmatic (The Pragmatic Programmer)', content: 'Un itinerar conceptual către maturitate profesională.' },
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title = '', content = '' } = req.body || {};
  const book = { id: nextId++, title, content };
  books.push(book);
  res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = books.findIndex((b) => b.id === id);

  if (idx === -1) {
    res.status(404).json({ error: 'Cartea nu a fost găsită.' });
    return;
  }

  const { title, content } = req.body || {};
  books[idx] = {
    ...books[idx],
    ...(title !== undefined ? { title } : {}),
    ...(content !== undefined ? { content } : {}),
  };

  res.json(books[idx]);
});

app.get('/', (req, res) => {
  res
    .type('text')
    .send('Serverul demo S13v1 rulează. Încercaţi: GET /books, POST /books, PUT /books/:id');
});

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`Serverul demo S13v1 ascultă pe http://localhost:${PORT}`);
});
