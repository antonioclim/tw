import express from "express";
const app = express();
const port = 3000;

/** (opțional) elimină 404 pentru favicon */
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.send(`<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<title>Diferențe între var, let și const — demo interactiv</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root{--ink:#0f172a;--muted:#475569;--accent:#2563eb;--bg:#f8fafc;--card:#ffffff;--code:#0b1020;--codefg:#e6edf3}
  body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Arial}
  header{padding:2rem 1.25rem;background:var(--card);border-bottom:1px solid #e5e7eb}
  h1{margin:0;color:var(--accent)}
  main{max-width:980px;margin:0 auto;padding:2rem 1.25rem}
  .card{background:var(--card);border:1px solid #e5e7eb;border-radius:12px;padding:1rem 1.25rem;margin:1.25rem 0}
  .grid{display:grid;gap:1rem}
  @media(min-width:880px){.grid{grid-template-columns:1fr 1fr}}
  h2{margin:.2rem 0 0.6rem}
  .meta{color:var(--muted);margin:0 0 .6rem}
  pre{background:var(--code);color:var(--codefg);padding:1rem;border-radius:10px;overflow:auto}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .out{background:#eef2ff;border-left:4px solid var(--accent);padding:.8rem;border-radius:8px;min-height:1.5rem;white-space:pre-wrap}
  button{background:var(--accent);color:#fff;border:0;border-radius:8px;padding:.55rem .9rem;cursor:pointer}
  button:hover{filter:brightness(0.95)}
  .pill{display:inline-block;font-size:.85rem;background:#e2e8f0;color:#0f172a;padding:.15rem .5rem;border-radius:999px;margin-right:.35rem}
  .warn{color:#b45309}
</style>
</head>
<body>
<header>
  <h1>Diferențe între <code>var</code>, <code>let</code> și <code>const</code></h1>
  <p class="meta">Fiecare secțiune are un rezumat, un fragment de cod și un buton care execută codul, afișând rezultatul imediat.</p>
  <button onclick="runAll()">Rulează tot</button>
</header>

<main>

  <!-- VAR -->
  <section class="card">
    <h2><code>var</code></h2>
    <p class="meta">
      <span class="pill">scop: funcție / global</span>
      <span class="pill">hoisting: DA (inițializare <em>undefined</em>)</span>
      <span class="pill">redeclarare: permisă</span>
      <span class="pill">reatribuire: permisă</span>
    </p>
    <div class="grid">
      <div>
        <p><strong>Idee:</strong> variabilele <code>var</code> ignoră limitele blocurilor <code>{}</code> și sunt vizibile în afara lor (dacă nu sunt în altă funcție).</p>
        <pre><code>// exemplu: „scapă” din bloc
if (true) {
  var x = 10;
}
"Valoarea lui x este " + x;

// redeclarare
var x = 99;
"Redeclarat x = " + x;</code></pre>
        <button onclick="runVar()">Rulează exemplul</button>
      </div>
      <div>
        <div id="out-var" class="out"></div>
      </div>
    </div>
  </section>

  <!-- LET -->
  <section class="card">
    <h2><code>let</code></h2>
    <p class="meta">
      <span class="pill">scop: bloc</span>
      <span class="pill">hoisting: DA, dar în <em>Temporal Dead Zone</em> (<span class="warn">nu poate fi folosit înainte de declarație</span>)</span>
      <span class="pill">redeclarare: interzisă în același bloc</span>
      <span class="pill">reatribuire: permisă</span>
    </p>
    <div class="grid">
      <div>
        <p><strong>Idee:</strong> <code>let</code> este vizibil doar în blocul curent; folosirea înainte de linia declarației aruncă eroare (TDZ).</p>
        <pre><code>let msg = "";
if (true) {
  let y = 20;
  msg += "y în bloc = " + y + "\\n";
}
try {
  msg += "y în afara blocului = " + y;
} catch (e) {
  msg += "eroare: " + e.message;
}
msg;</code></pre>
        <button onclick="runLet()">Rulează exemplul</button>
      </div>
      <div>
        <div id="out-let" class="out"></div>
      </div>
    </div>
  </section>

  <!-- CONST -->
  <section class="card">
    <h2><code>const</code></h2>
    <p class="meta">
      <span class="pill">scop: bloc</span>
      <span class="pill">hoisting: DA, dar în TDZ</span>
      <span class="pill">redeclarare: interzisă</span>
      <span class="pill">reatribuire: interzisă (atenție: <em>obiectele pot fi mutate</em>)</span>
    </p>
    <div class="grid">
      <div>
        <p><strong>Idee:</strong> <code>const</code> cere inițializare imediată; nu poate fi reatribuit, însă proprietățile unui obiect declarat cu <code>const</code> pot fi modificate.</p>
        <pre><code>const z = 30;
let out = "z = " + z + "\\n";
try { z = 40; } 
catch (e) { out += "reatribuire eșuată: " + e.message + "\\n"; }

const obj = { a: 1 };
obj.a = 2;        // mutăm proprietatea (e permis)
out += "obj.a = " + obj.a;
out;</code></pre>
        <button onclick="runConst()">Rulează exemplul</button>
      </div>
      <div>
        <div id="out-const" class="out"></div>
      </div>
    </div>
  </section>

</main>

<script>
  // --- VAR demo ---
  function runVar(){
    let log = "";
    if (true) { var x = 10; }
    log += "x după bloc = " + x + "\\n";
    var x = 99; // redeclarare OK
    log += "x după redeclarare = " + x;
    document.getElementById("out-var").textContent = log;
  }

  // --- LET demo ---
  function runLet(){
    let msg = "";
    if (true) {
      let y = 20;
      msg += "y în bloc = " + y + "\\n";
    }
    try { msg += "y în afara blocului = " + y; }
    catch(e){ msg += "eroare: " + e.message; }
    document.getElementById("out-let").textContent = msg;
  }

  // --- CONST demo ---
  function runConst(){
    const z = 30;
    let out = "z = " + z + "\\n";
    try { 
      // @ts-ignore – intenționat provoacă eroare
      z = 40; 
    } catch(e){
      out += "reatribuire eșuată: " + e.message + "\\n";
    }
    const obj = { a: 1 };
    obj.a = 2; // mutarea proprietății este permisă
    out += "obj.a = " + obj.a;
    document.getElementById("out-const").textContent = out;
  }

  function runAll(){ runVar(); runLet(); runConst(); }
</script>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
