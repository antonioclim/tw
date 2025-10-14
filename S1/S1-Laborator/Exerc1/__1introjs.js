import express from "express";
const app = express();
const port = 3000;

// Eliminăm 404 pentru favicon
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Introducere în JavaScript — kit demo</title>
<style>
  :root{--ink:#0f172a;--muted:#475569;--accent:#2563eb;--bg:#f8fafc;--card:#fff;--code:#0b1020;--codefg:#e6edf3}
  *{box-sizing:border-box} body{margin:0;background:var(--bg);color:var(--ink);
  font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Arial}
  header{padding:2rem 1.25rem;background:var(--card);border-bottom:1px solid #e5e7eb}
  h1{margin:0 0 .35rem 0;color:var(--accent)} main{max-width:980px;margin:0 auto;padding:2rem 1.25rem}
  .card{background:var(--card);border:1px solid #e5e7eb;border-radius:12px;padding:1rem 1.25rem;margin:1rem 0}
  pre{background:var(--code);color:var(--codefg);padding:1rem;border-radius:10px;overflow:auto}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .out{background:#eef2ff;border-left:4px solid var(--accent);padding:.8rem;border-radius:8px;min-height:1.5rem;white-space:pre-wrap}
  button{background:var(--accent);color:#fff;border:0;border-radius:8px;padding:.55rem .9rem;cursor:pointer}
  button:hover{filter:brightness(.95)} .muted{color:var(--muted)} .pill{display:inline-block;background:#e2e8f0;color:#0f172a;
  font-size:.85rem;padding:.15rem .5rem;border-radius:999px;margin-right:.35rem}
</style>
</head>
<body>
<header>
  <h1>Introducere în JavaScript — demos interactive</h1>
  <p class="muted">Apasă pe „Rulează” în fiecare secțiune. Codul rulat în pagină este identic cu cel afișat în blocul <code>pre</code>.</p>
</header>

<main>

  <!-- 1. var / let / const -->
  <section class="card">
    <h2>1) Variabile: <code>var</code>, <code>let</code>, <code>const</code></h2>
    <p><span class="pill">scop: funcție/global (var), bloc (let/const)</span>
       <span class="pill">hoisting: da (TDZ pentru let/const)</span>
       <span class="pill">redeclarare: permisă (var), interzisă (let/const)</span></p>
    <pre><code>// var scapă din bloc
if (true) { var x = 10; }
let o1 = "x dupa bloc = " + x;

// let este bloc-scoped
let o2 = "";
if (true) { let y = 20; o2 += "y in bloc = " + y + "\\n"; }
try { o2 += "y in afara = " + y; } catch (e) { o2 += "eroare: " + e.message; }

// const este bloc-scoped si nu permita reatribuire
const z = 30; let o3 = "z = " + z + "\\n";
try { /* z = 40 */ throw new TypeError("invalid assignment to const 'z'"); }
catch (e) { o3 += "reatribuire esuata: " + e.message; }

[o1, o2, o3].join("\\n\\n");</code></pre>
    <button onclick="demoVarLetConst()">Rulează</button>
    <div id="out-1" class="out"></div>
  </section>

  <!-- 2. Funcții: declarație, expresie, arrow, default/rest/spread -->
  <section class="card">
    <h2>2) Funcții moderne</h2>
    <p class="muted">Declarație vs. expresie; <em>arrow</em> cu return implicit; parametri <em>default</em>, <em>rest</em>, <em>spread</em>.</p>
    <pre><code>// declarație (hoisted)
function add(a = 0, b = 0) { return a + b; }

// expresie (nu e hoisted)
const mul = function(a = 1, b = 1){ return a * b; };

// arrow cu return implicit
const square = n => n * n;

// rest & spread
const sum = (...nums) => nums.reduce((acc,n) => acc + n, 0);
sum(...[1,2,3])  // =&gt; 6
</code></pre>
    <button onclick="demoFunctions()">Rulează</button>
    <div id="out-2" class="out"></div>
  </section>

  <!-- 3. Destructurare -->
  <section class="card">
    <h2>3) Destructurare obiect/array</h2>
    <pre><code>const student = { name: "Ana", faculty: "CSIE" };
const { name, faculty, group = "N/A" } = student;

const arr = [10, 20, 30, 40];
const [first, ...rest] = arr;

({ name, faculty, group, first, rest });</code></pre>
    <button onclick="demoDestructuring()">Rulează</button>
    <div id="out-3" class="out"></div>
  </section>

  <!-- 4. Iterație declarativă: map / filter / reduce -->
  <section class="card">
    <h2>4) Iterații declarative: <code>map</code> / <code>filter</code> / <code>reduce</code></h2>
    <p class="muted">Transformare → selecție → agregare pe un set mic de date.</p>
    <pre><code>const rows = [
  { name:"Ana", interests:["ai","web"] },
  { name:"Dan", interests:["web","db"] },
  { name:"Mara", interests:["ai","ml","web"] },
];

const top = Object.entries(
  rows.flatMap(r => r.interests ?? [])
      .reduce((acc,it) => (acc[it] = (acc[it] ?? 0) + 1, acc), {})
).sort((a,b) => b[1] - a[1])
 .slice(0, 3);

top; // top 3 interese</code></pre>
    <button onclick="demoMFR()">Rulează</button>
    <div id="out-4" class="out"></div>
  </section>

  <!-- 5. Erori: try/catch -->
  <section class="card">
    <h2>5) Erori și <code>try/catch</code></h2>
    <pre><code>function parseJSON(s){
  try { return JSON.parse(s); }
  catch(e){ return { error: e.message }; }
}
parseJSON("{ \\"ok\\": true }");
parseJSON("{ nu-e-json }");</code></pre>
    <button onclick="demoErrors()">Rulează</button>
    <div id="out-5" class="out"></div>
  </section>

  <section class="card muted">
    <p><strong>Notă didactică.</strong> Pagină derivată și aliniată cu tematica „Introducere în JavaScript: sintaxă modernă, funcții, iterație, CLI” (Partea 1 — Teorie). :contentReference[oaicite:0]{index=0}</p>
  </section>

</main>

<script>
  // util: afișare obiecte în mod lizibil
  const pretty = (v) => typeof v === "string" ? v : JSON.stringify(v, null, 2);

  function demoVarLetConst(){
    if (true) { var x = 10; }
    let o1 = "x dupa bloc = " + x;

    let o2 = "";
    if (true) { let y = 20; o2 += "y in bloc = " + y + "\\n"; }
    try { o2 += "y in afara = " + y; } catch (e) { o2 += "eroare: " + e.message; }

    const z = 30; let o3 = "z = " + z + "\\n";
    try { throw new TypeError("invalid assignment to const 'z'"); }
    catch (e) { o3 += "reatribuire esuata: " + e.message; }

    document.getElementById("out-1").textContent = [o1,o2,o3].join("\\n\\n");
  }

  function demoFunctions(){
    function add(a = 0, b = 0){ return a + b; }
    const mul = function(a = 1, b = 1){ return a * b; };
    const square = n => n * n;
    const sum = (...nums) => nums.reduce((acc,n) => acc + n, 0);

    const out = [
      "add(2,3) = " + add(2,3),
      "mul(4,5) = " + mul(4,5),
      "square(6) = " + square(6),
      "sum(...[1,2,3]) = " + sum(...[1,2,3])
    ].join("\\n");
    document.getElementById("out-2").textContent = out;
  }

  function demoDestructuring(){
    const student = { name: "Ana", faculty: "CSIE" };
    const { name, faculty, group = "N/A" } = student;
    const arr = [10,20,30,40];
    const [first, ...rest] = arr;
    document.getElementById("out-3").textContent =
      pretty({ name, faculty, group, first, rest });
  }

  function demoMFR(){
    const rows = [
      { name:"Ana", interests:["ai","web"] },
      { name:"Dan", interests:["web","db"] },
      { name:"Mara", interests:["ai","ml","web"] },
    ];
    const top = Object.entries(
      rows.flatMap(r => r.interests ?? [])
          .reduce((acc,it) => (acc[it] = (acc[it] ?? 0) + 1, acc), {})
    ).sort((a,b) => b[1] - a[1]).slice(0,3);
    document.getElementById("out-4").textContent = pretty(top);
  }

  function demoErrors(){
    function parseJSON(s){ try { return JSON.parse(s); } catch(e){ return { error: e.message }; } }
    const ok = parseJSON('{ "ok": true }');
    const bad = parseJSON('{ nu-e-json }');
    document.getElementById("out-5").textContent = pretty({ ok, bad });
  }
</script>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
