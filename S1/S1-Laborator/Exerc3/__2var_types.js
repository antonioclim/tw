import express from "express";
const app = express();
const port = 3000;

// evităm 404 pentru favicon
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>S2 — Variabile & Tipuri (kit interactiv)</title>
<style>
  :root{--ink:#0f172a;--muted:#475569;--accent:#2563eb;--bg:#f8fafc;--card:#fff;--code:#0b1020;--codefg:#e6edf3}
  *{box-sizing:border-box} body{margin:0;background:var(--bg);color:var(--ink);
  font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Arial}
  header{padding:2rem 1.25rem;background:var(--card);border-bottom:1px solid #e5e7eb}
  h1{margin:0 0 .35rem 0;color:var(--accent)}
  main{max-width:980px;margin:0 auto;padding:2rem 1.25rem}
  .card{background:var(--card);border:1px solid #e5e7eb;border-radius:12px;padding:1rem 1.25rem;margin:1rem 0}
  pre{background:var(--code);color:var(--codefg);padding:1rem;border-radius:10px;overflow:auto}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .out{background:#eef2ff;border-left:4px solid var(--accent);padding:.8rem;border-radius:8px;min-height:1.5rem;white-space:pre-wrap}
  .pill{display:inline-block;background:#e2e8f0;color:#0f172a;font-size:.85rem;padding:.15rem .5rem;border-radius:999px;margin-right:.35rem}
  .muted{color:var(--muted)}
  button{background:var(--accent);color:#fff;border:0;border-radius:8px;padding:.55rem .9rem;cursor:pointer}
  button:hover{filter:brightness(.95)}
  footer{padding:2rem 1.25rem;color:var(--muted)}
</style>
</head>
<body>
<header>
  <h1>S2 — Variabile & Tipuri</h1>
  <p class="muted">Apasă „Rulează” în fiecare secțiune. Codul executat este identic cu cel din blocurile <code>pre</code>. REPL/Console sunt recomandate ca „loc de joacă” controlat.</p>
</header>

<main>

  <!-- 1. Declarare & atribuire -->
  <section class="card">
    <h2>1) Declarare & atribuire</h2>
    <p><span class="pill">variabila = „cutie etichetată”</span><span class="pill">folosește „;” pentru claritate</span></p>
    <pre><code>// Declarare + atribuire
var x = 32;
x;           // ⇒ 32

// Reatribuire
x = 45;
x;           // ⇒ 45

// Mai multe pe o singură linie (didactic)
var m1 = "Grover", m2 = "Cookie Monster", m3 = "Animal";</code></pre>
    <button onclick="demoDeclAssign()">Rulează</button>
    <div id="out-1" class="out"></div>
  </section>

  <!-- 2. Nume & camelCase -->
  <section class="card">
    <h2>2) Nume descriptive & <code>camelCase</code></h2>
    <p class="muted">Evitați cuvintele rezervate; numele sunt pentru oameni la fel de mult ca pentru mașini.</p>
    <pre><code>const taxRate = 0.19;          // bun
const packageDimensions = "20x30x10";
let shippingCity = "Santa Barbara";
shippingCity = "Los Angeles";

// Rezervate (NU folosiți): var, const, true, false, etc.</code></pre>
    <button onclick="demoNames()">Rulează</button>
    <div id="out-2" class="out"></div>
  </section>

  <!-- 3. var / let / const -->
  <section class="card">
    <h2>3) Mutabilitate: <code>var</code> vs <code>let</code> vs <code>const</code></h2>
    <p><span class="pill">var/let: mutabile</span><span class="pill">const: legătură imuabilă (fail-fast la reatribuire)</span></p>
    <pre><code>// const pentru fapte „fixe”
const dozen = 12, halfDozen = 6, bakersDozen = 13;

// let/var pentru stări care evoluează
let cookieCount = 5;
cookieCount = 6;  // ✔

/* Reatribuire const ⇒ eșuează (intenționat) */</code></pre>
    <button onclick="demoVLC()">Rulează</button>
    <div id="out-3" class="out"></div>
  </section>

  <!-- 4. Strings -->
  <section class="card">
    <h2>4) Strings: delimitatori & „citate în citate”</h2>
    <p class="muted">„Orice între ghilimele” — duble sau simple, dar simetrice.</p>
    <pre><code>"This is a 'quote' inside double quotes"
'This is a "quote" inside single quotes'

// Greșit: delimitatori nesimetrici → eroare de sintaxă</code></pre>
    <button onclick="demoStrings()">Rulează</button>
    <div id="out-4" class="out"></div>
  </section>

  <!-- 5. Numbers & Math -->
  <section class="card">
    <h2>5) Numere & <code>Math</code></h2>
    <p class="muted"><code>Math.round(n)</code> (rotunjire); <code>Math.random()</code> (pseudoaleator în [0,1)).</p>
    <pre><code>Math.round(12.1);  // 12
Math.round(12.9);  // 13
// 3 valori pseudo-aleatoare
[Math.random(), Math.random(), Math.random()]</code></pre>
    <button onclick="demoMath()">Rulează</button>
    <div id="out-5" class="out"></div>
  </section>

  <!-- 6. Booleeni & === -->
  <section class="card">
    <h2>6) Booleeni & comparație strictă <code>===</code></h2>
    <p class="muted"><code>true</code>/<code>false</code> sunt cuvinte cheie; nu le confundați cu identificatori. Evitați <code>=</code> în loc de <code>===</code>.</p>
    <pre><code>let where = "Santa Barbara", other = "Los Angeles";
const r1 = (where === other);  // false
other = "Santa Barbara";
const r2 = (where === other);  // true
[r1, r2];</code></pre>
    <button onclick="demoBooleans()">Rulează</button>
    <div id="out-6" class="out"></div>
  </section>

</main>

<footer>
  <small>Material aliniat transcriptului încărcat pentru S2 (Variabile & tipuri). :contentReference[oaicite:0]{index=0}</small>
</footer>

<script>
  const pretty = v => typeof v === "string" ? v : JSON.stringify(v, null, 2);

  function demoDeclAssign(){
    var x = 32;
    let out = "x = " + x + "\\n";
    x = 45;
    out += "x (după reatribuire) = " + x + "\\n";
    var m1 = "Grover", m2 = "Cookie Monster", m3 = "Animal";
    out += "monștri: " + [m1,m2,m3].join(", ");
    document.getElementById("out-1").textContent = out;
  }

  function demoNames(){
    const taxRate = 0.19;
    const packageDimensions = "20x30x10";
    let shippingCity = "Santa Barbara";
    shippingCity = "Los Angeles";
    document.getElementById("out-2").textContent =
      pretty({ taxRate, packageDimensions, shippingCity });
  }

  function demoVLC(){
    const dozen = 12, halfDozen = 6, bakersDozen = 13;
    let cookieCount = 5; cookieCount = 6;
    let out = "dozen=" + dozen + ", halfDozen=" + halfDozen + ", bakersDozen=" + bakersDozen + "\\n";
    out += "cookieCount (mutabil) = " + cookieCount + "\\n";
    try { /* z = 40 */ throw new TypeError("invalid assignment to const 'z'"); }
    catch(e){ out += "reatribuire const ⇒ " + e.message; }
    document.getElementById("out-3").textContent = out;
  }

  function demoStrings(){
    const a = "This is a 'quote' inside double quotes";
    const b = 'This is a "quote" inside single quotes';
    document.getElementById("out-4").textContent = pretty({ a, b });
  }

  function demoMath(){
    const r = [Math.round(12.1), Math.round(12.9)];
    const rnd = [Math.random(), Math.random(), Math.random()];
    document.getElementById("out-5").textContent = pretty({ round: r, random: rnd });
  }

  function demoBooleans(){
    let where = "Santa Barbara", other = "Los Angeles";
    const r1 = (where === other);
    other = "Santa Barbara";
    const r2 = (where === other);
    document.getElementById("out-6").textContent = pretty({ r1, r2 });
  }
</script>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
