import express from "express";
const app = express();
const port = 3000;

// opțional: elimină 404 pentru favicon
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<title>Salut + butoane DA/NU</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { font-family: Arial, sans-serif; margin: 2rem; }
  .hidden { display: none; }
  .panel { margin-top: 1rem; }
  label, input, button, p { font-size: 1.2rem; }
  #arena { position: relative; height: 240px; border: 1px dashed #999; border-radius: 8px; margin-top: 1rem; padding: .75rem; }
  #btnNu { position: absolute; }
  #btnDa, #btnNu { padding: .6rem 1rem; font-size: 1.1rem; border-radius: 8px; border: 1px solid #444; cursor: pointer; background: #f7f7f7; }
  #btnDa:hover { background:#e6ffe6; }
  #btnNu:hover { background:#ffecec; }
  #msg { font-weight: bold; margin-top: .75rem; }
</style>
</head>
<body>
  <label for="name">Nume:</label>
  <input id="name" type="text" placeholder="Introdu numele">
  <button id="go">Continuă</button>

  <div id="panel" class="panel hidden">
    <p id="msg"></p>

    <div id="arena" aria-label="Zonă de joacă pentru butoane">
      <button id="btnDa" type="button">DA, sunt</button>
      <button id="btnNu" type="button">NU</button>
    </div>
  </div>

<script>
  const go = document.getElementById('go');
  const nameInput = document.getElementById('name');
  const panel = document.getElementById('panel');
  const msg = document.getElementById('msg');
  const arena = document.getElementById('arena');
  const btnDa = document.getElementById('btnDa');
  const btnNu = document.getElementById('btnNu');

  function showMessage() {
    const nume = (nameInput.value || '').trim() || 'prietene';
    msg.textContent = \`Salut \${nume}. Fraiere, chiar crezi că ești mai bun decât ChatGPT?\`;
    panel.classList.remove('hidden');
    placeButtons();
  }

  // plasează butoanele inițial (DA fix, NU într-o poziție aleatoare)
  function placeButtons() {
    // DA: poziție fixă în stânga-sus
    btnDa.style.position = 'absolute';
    btnDa.style.left = '12px';
    btnDa.style.top = '12px';

    moveNuRandom(); // NU: aleator
  }

  // mută butonul "NU" într-o poziție aleatoare, dar vizibilă în interiorul arenei
  function moveNuRandom() {
    // măsurători curente
    const aRect = arena.getBoundingClientRect();
    const nRect = btnNu.getBoundingClientRect();

    const maxLeft = aRect.width - nRect.width - 8;  // 8px marjă
    const maxTop  = aRect.height - nRect.height - 8;

    // limite minime
    const left = Math.max(8, Math.floor(Math.random() * (maxLeft > 8 ? maxLeft : 8)));
    const top  = Math.max(8, Math.floor(Math.random() * (maxTop  > 8 ? maxTop  : 8)));

    btnNu.style.left = left + 'px';
    btnNu.style.top  = top  + 'px';
  }

  // evenimente
  go.addEventListener('click', showMessage);
  nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') showMessage(); });

  // dacă utilizatorul încearcă să se apropie de "NU", îl mutăm
  ['mouseenter', 'mouseover', 'focus', 'mousedown', 'touchstart'].forEach(ev => {
    btnNu.addEventListener(ev, (e) => {
      e.preventDefault();
      moveNuRandom();
    }, { passive: false });
  });

  // acțiuni la click pe DA / NU
  btnDa.addEventListener('click', () => {
    alert('Bine, încrederea e importantă. Spor la treabă! 😄');
  });
  btnNu.addEventListener('click', (e) => {
    // în caz că reușește să dea click, tot îl mutăm imediat
    e.preventDefault();
    moveNuRandom();
  });
</script>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
