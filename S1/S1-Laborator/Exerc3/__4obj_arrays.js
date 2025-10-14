import express from "express";
const app = express();
const port = 3000;

// Evită 404 la favicon în timpul exercițiilor
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="ro"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>S3 — Obiecte, tablouri & claritate a codului</title>
<style>
:root{--ink:#0f172a;--muted:#475569;--accent:#2563eb;--bg:#f8fafc;--card:#fff;--code:#0b1020;--codefg:#e6edf3}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial}
header{padding:2rem 1.25rem;background:var(--card);border-bottom:1px solid #e5e7eb}
h1{margin:0 0 .3rem 0;color:var(--accent)}main{max-width:980px;margin:0 auto;padding:2rem 1.25rem}
.card{background:var(--card);border:1px solid #e5e7eb;border-radius:12px;padding:1rem 1.25rem;margin:1rem 0}
pre{background:var(--code);color:var(--codefg);padding:1rem;border-radius:10px;overflow:auto}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.out{background:#eef2ff;border-left:4px solid var(--accent);padding:.8rem;border-radius:8px;min-height:1.5rem;white-space:pre-wrap}
button{background:var(--accent);color:#fff;border:0;border-radius:8px;padding:.55rem .9rem;cursor:pointer}
button:hover{filter:brightness(.95)}
.pill{display:inline-block;background:#e2e8f0;color:#0f172a;font-size:.85rem;padding:.15rem .5rem;border-radius:999px;margin-right:.35rem}
.muted{color:var(--muted)}
.grid{display:grid;gap:1rem}@media(min-width:880px){.grid{grid-template-columns:1fr 1fr}}
</style></head>
<body>
<header>
  <h1>S3 — Obiecte, tablouri & claritate a codului</h1>
  <p class="muted">Apasă „Rulează” în fiecare secțiune. Codul executat este identic cu cel afișat.</p>
</header>

<main>

  <!-- 1. Obiecte: literal, acces, stergere -->
  <section class="card">
    <h2>1) Obiecte: literal, acces, ștergere</h2>
    <p><span class="pill">literal: {}</span><span class="pill">acces: punct &amp; [cheie]</span><span class="pill">ștergere: delete</span></p>
    <pre><code>// creare & populare
let bird = {};
bird["genus"] = "corvus";  // notare cu paranteze (cheie arbitrară)
bird.commonName = "crow";  // notare cu punct (cheie identificator curat)
const before = { genus: bird.genus, commonName: bird.commonName };

// ștergere proprietate
delete bird.commonName;
const after = { hasCommonName: ("commonName" in bird) };

({ before, after });</code></pre>
    <button onclick="demoObjects()">Rulează</button>
    <div id="out-obj" class="out"></div>
  </section>

  <!-- 2. Referințe vs copii -->
  <section class="card">
    <h2>2) „Referințe” vs copii (shallow/deep)</h2>
    <p class="muted">Atribuirea unui obiect nu copiază valoarea: ambele variabile indică aceeași referință; folosiți <code>{...obj}</code> sau <code>Object.assign</code> pentru shallow, <code>JSON.stringify/parse</code> pentru deep (în limitele JSON).</p>
    <pre><code>const animal = { genus: "corvus", species: "corax" };
const alias = animal;              // aliasare (aceeași referință)
alias.genus = "ursus";

const shallow1 = Object.assign({}, animal);
const shallow2 = { ...animal };
const deep = JSON.parse(JSON.stringify(animal));

({ animal, shallow1, shallow2, deep, aliasSame: (alias === animal) });</code></pre>
    <button onclick="demoRefs()">Rulează</button>
    <div id="out-ref" class="out"></div>
  </section>

  <!-- 3. Array-uri: bază -->
  <section class="card">
    <h2>3) Tablouri: ordinea & indexarea de la 0</h2>
    <pre><code>let days = ["Mon","Tue","Wed"];
const first = days[0];    // "Mon"
const len = days.length;  // 3
({ days, first, len });</code></pre>
    <button onclick="demoArrayBase()">Rulează</button>
    <div id="out-arr1" class="out"></div>
  </section>

  <!-- 4. Manipulare: push/pop, unshift/shift, splice -->
  <section class="card">
    <h2>4) Manipularea tablourilor</h2>
    <pre><code>let counties = ["Belknap","Carroll","Grafton","Rockingham"];
const thirdBefore = counties[2];
counties[2] = "Cheshire";          // înlocuire la index
counties[counties.length] = "Merrimack"; // adăugare la final cu length
counties.push("Coos");             // idiomatic: push
const last = counties.pop();       // eliminare de la final
counties.unshift("Hillsborough");  // adăugare la început
const first = counties.shift();    // eliminare de la început
// NU folosi delete pe indici -> folosește splice:
counties.splice(2, 1);             // elimină 1 element de la index 2 (compactează)
({ thirdBefore, last, first, counties, length: counties.length });</code></pre>
    <button onclick="demoArrayOps()">Rulează</button>
    <div id="out-arr2" class="out"></div>
  </section>

  <!-- 5. Claritate: whitespace & comentarii -->
  <section class="card">
    <h2>5) Claritate: whitespace & comentarii</h2>
    <p class="muted">Spațiile/întoarcerile de linie nu schimbă semnificația în majoritatea cazurilor, dar sporesc lizibilitatea; comentariile documentează intenția și pot dezactiva temporar codul pentru depanare.</p>
    <pre><code>// variantă „compactă”
function sum(a,b){return a+b}
// variantă lizibilă
function sum2(a, b) {
  // adună doi operanzi numeric-convertibili
  return a + b;
}
({ compact: sum(2,3), readable: sum2(2,3) });</code></pre>
    <button onclick="demoClarity()">Rulează</button>
    <div id="out-clar" class="out"></div>
  </section>

  <!-- 6. Regex de bază -->
  <section class="card">
    <h2>6) Expresii regulate (regex) — <code>test</code>, <code>i</code>, <code>^</code>, <code>$</code>, escaparea <code>.</code></h2>
    <pre><code>const s1="This is a string.", s2="Another line", s3="this appears Here", s4="Disparate THIS case";
let rx = /this/; const r0 = [rx.test(s1), rx.test(s2), rx.test(s3), rx.test(s4)];
rx = /this/i;    const r1 = [rx.test(s1), rx.test(s2), rx.test(s3), rx.test(s4)];
const r2 = [/^this/i.test(s1), /this$/i.test(s1), /\\./.test("v.1")];
({ r0, r1, r2 });</code></pre>
    <button onclick="demoRegex()">Rulează</button>
    <div id="out-rx" class="out"></div>
  </section>

</main>

<script>
const pretty = v => typeof v === "string" ? v : JSON.stringify(v, null, 2);

function demoObjects(){
  let bird = {};
  bird["genus"] = "corvus";
  bird.commonName = "crow";
  const before = { genus: bird.genus, commonName: bird.commonName };
  delete bird.commonName;
  const after = { hasCommonName: ("commonName" in bird) };
  document.getElementById("out-obj").textContent = pretty({ before, after });
}

function demoRefs(){
  const animal = { genus: "corvus", species: "corax" };
  const alias = animal;
  alias.genus = "ursus";
  const shallow1 = Object.assign({}, animal);
  const shallow2 = { ...animal };
  const deep = JSON.parse(JSON.stringify(animal));
  document.getElementById("out-ref").textContent =
    pretty({ animal, shallow1, shallow2, deep, aliasSame: (alias === animal) });
}

function demoArrayBase(){
  let days = ["Mon","Tue","Wed"];
  const first = days[0]; const len = days.length;
  document.getElementById("out-arr1").textContent = pretty({ days, first, len });
}

function demoArrayOps(){
  let counties = ["Belknap","Carroll","Grafton","Rockingham"];
  const thirdBefore = counties[2];
  counties[2] = "Cheshire";
  counties[counties.length] = "Merrimack";
  counties.push("Coos");
  const last = counties.pop();
  counties.unshift("Hillsborough");
  const first = counties.shift();
  counties.splice(2, 1);
  document.getElementById("out-arr2").textContent =
    pretty({ thirdBefore, last, first, counties, length: counties.length });
}

function demoClarity(){
  function sum(a,b){return a+b}
  function sum2(a, b) { return a + b; }
  document.getElementById("out-clar").textContent =
    pretty({ compact: sum(2,3), readable: sum2(2,3) });
}

function demoRegex(){
  const s1="This is a string.", s2="Another line", s3="this appears Here", s4="Disparate THIS case";
  let rx = /this/; const r0 = [rx.test(s1), rx.test(s2), rx.test(s3), rx.test(s4)];
  rx = /this/i;    const r1 = [rx.test(s1), rx.test(s2), rx.test(s3), rx.test(s4)];
  const r2 = [/^this/i.test(s1), /this$/i.test(s1), /\\./.test("v.1")];
  document.getElementById("out-rx").textContent = pretty({ r0, r1, r2 });
}
</script>
</body></html>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
