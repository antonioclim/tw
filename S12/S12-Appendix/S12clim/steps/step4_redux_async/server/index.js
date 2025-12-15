const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory demo data (mirrors the tutorial idea: notes have `id` and `content`)
const notes = [
  { id: 1, content: 'First demo note' },
  { id: 2, content: 'Second demo note' }
];

app.get('/notes', (req, res) => {
  res.json(notes);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Notes server running on http://localhost:${PORT}`);
});
