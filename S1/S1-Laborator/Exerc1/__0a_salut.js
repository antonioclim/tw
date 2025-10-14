import express from "express";
const app = express();
const port = 3000;

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<title>Salut + ziua săptămânii</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body {
    font-family: Arial, sans-serif;
    font-size: 500%; /* text general de ~5x mai mare */
    padding: 2rem;
  }
  input, button {
    font-size: 100%;   /* moștenit de la body (adică tot 5x mai mare) */
    padding: 0.5em 1em;
    margin: 0.5em 0;
  }
  #msg {
    margin-top: 1em;
    font-weight: bold;
    color: #2c3e50;
  }
</style>
</head>
<body>
  <label for="name">Nume:</label><br>
  <input id="name" type="text" placeholder="Introdu numele" /><br>
  <button id="go">Afișează</button>
  <p id="msg"></p>

  <script>
    function salut() {
      const nume = (document.getElementById('name').value || '').trim() || 'student';
      const acum = new Date();
      const zi = acum.toLocaleDateString('ro-RO', { weekday: 'long' });
      document.getElementById('msg').textContent = \`Salut \${nume}. Astăzi este \${zi}.\`;
    }
    document.getElementById('go').addEventListener('click', salut);
    document.getElementById('name').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') salut();
    });
  </script>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
