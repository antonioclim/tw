import express from "express";
const app = express();
const port = 3000;

// Evităm 404 pentru favicon în timpul exercițiilor
app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="ro"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>S3 — Obiecte, tablouri & claritate a codului</title>
<style>
:root{--ink:#0f172a;--muted:#475569;--accent:#2563eb;--bg:#f8fafc;--card:#fff;--code:#0b1020;--codefg:#e6edf3}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial}
header{padding:2rem 1.25rem;background:var(--card);border-bottom:1px solid #e5e7eb}
h1{margin:0 0 .3rem 0;color:var(--accent)}
main{max-width:980px;margin:0 auto;padding:2rem 1.25rem}
.card{background:var(--card);border:1px solid #e5e7eb;border-radius:12px;padding:1rem 1.25rem;margin:1rem 0}
pre{background:var(--code);color:var(--codefg);padding:1rem;border-radius:10px;overflow:auto}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.out{background:#eef2ff;border-left:4px solid var(--accent);padding:.8rem;border-radius:8px;min-height:1.5rem;white-space:pre-wrap}
button{background:var(--accent);color:#fff;border:0;border-radius:8px;padding:.55rem .9rem;cursor:pointer}
button:hover{filter:brightness(.95)}
.muted{color:var(--muted)}
.pill{display:inline-block;background:#e2e8f0;color:#0f172a;font-size:.85rem;padding:.15rem .5rem;border-radius:999px;margin-right:.35rem}
.grid{display:grid;gap:1rem}
@media(min-width:880px){.grid{grid-template-columns:1fr 1fr}}
.quiz-question{margin:1rem 0}
.quiz-option{margin:.25rem 0;display:block}
.feedback{margin-top:.5rem;font-weight:bold}
</style></head>
<body>
<header>
  <h1>S3 — Obiecte, tablouri & mini-quiz </h1>
  <p class="muted">Apasă „Rulează” în fiecare secțiune. Codul executat este identic cu cel afișat.</p>
</header>

<main>

  <!-- 1) Obiecte: literal, acces, ștergere -->
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

  <!-- 2) „Referințe” vs copii -->
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

  <!-- 3) Tablouri: bază -->
  <section class="card">
    <h2>3) Tablouri: ordinea & indexarea de la 0</h2>
    <pre><code>let days = ["Mon","Tue","Wed"];
const first = days[0];    // "Mon"
const len = days.length;  // 3
({ days, first, len });</code></pre>
    <button onclick="demoArrayBase()">Rulează</button>
    <div id="out-arr1" class="out"></div>
  </section>

  <!-- 4) Manipularea tablourilor -->
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

  <!-- 5) Claritate: whitespace & comentarii -->
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

  <!-- 6) Regex de bază -->
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

  <!-- 7) Greșeli tipice & strategii — Mini-quiz (10 întrebări) -->
  <section class="card">
    <h2>7) Greșeli tipice & strategii — Mini-quiz (10 întrebări)</h2>

    <!-- Q1 -->
    <div class="quiz-question">
      <p><strong>Q1:</strong> Ce se întâmplă dacă folosim <code>delete arr[2]</code> pe un array?</p>
      <label class="quiz-option"><input type="radio" name="q1" value="a"> Elimină elementul și compactează array-ul</label>
      <label class="quiz-option"><input type="radio" name="q1" value="b"> Lasă un „hole” (undefined la acel index)</label>
      <label class="quiz-option"><input type="radio" name="q1" value="c"> Aruncă o eroare</label>
      <button onclick="checkQ(1,'b')">Verifică</button>
      <div id="fb1" class="feedback"></div>
    </div>

    <!-- Q2 -->
    <div class="quiz-question">
      <p><strong>Q2:</strong> Care este diferența între un obiect copiat prin <code>=</code> și unul copiat cu <code>{...obj}</code>?</p>
      <label class="quiz-option"><input type="radio" name="q2" value="a"> Ambele creează o copie independentă</label>
      <label class="quiz-option"><input type="radio" name="q2" value="b"> Primul doar alias-ează (referință), al doilea face shallow copy</label>
      <label class="quiz-option"><input type="radio" name="q2" value="c"> Ambele creează o copie profundă (deep copy)</label>
      <button onclick="checkQ(2,'b')">Verifică</button>
      <div id="fb2" class="feedback"></div>
    </div>

    <!-- Q3 -->
    <div class="quiz-question">
      <p><strong>Q3:</strong> Care e rolul comentariilor în claritatea codului?</p>
      <label class="quiz-option"><input type="radio" name="q3" value="a"> Schimbă comportamentul codului la execuție</label>
      <label class="quiz-option"><input type="radio" name="q3" value="b"> Explică intenția programatorului și îmbunătățește lizibilitatea</label>
      <label class="quiz-option"><input type="radio" name="q3" value="c"> Optimizează automat codul la runtime</label>
      <button onclick="checkQ(3,'b')">Verifică</button>
      <div id="fb3" class="feedback"></div>
    </div>

    <!-- Q4 -->
    <div class="quiz-question">
      <p><strong>Q4:</strong> Cum este indexat un array în JavaScript?</p>
      <label class="quiz-option"><input type="radio" name="q4" value="a"> De la 0</label>
      <label class="quiz-option"><input type="radio" name="q4" value="b"> De la 1</label>
      <label class="quiz-option"><input type="radio" name="q4" value="c"> În funcție de setările motorului JS</label>
      <button onclick="checkQ(4,'a')">Verifică</button>
      <div id="fb4" class="feedback"></div>
    </div>

    <!-- Q5 -->
    <div class="quiz-question">
      <p><strong>Q5:</strong> Ce face metoda <code>splice(2,1)</code> pe un array?</p>
      <label class="quiz-option"><input type="radio" name="q5" value="a"> Șterge elementul de la index 2 și compactează array-ul</label>
      <label class="quiz-option"><input type="radio" name="q5" value="b"> Lasă „hole” la index 2</label>
      <label class="quiz-option"><input type="radio" name="q5" value="c"> Șterge toate elementele</label>
      <button onclick="checkQ(5,'a')">Verifică</button>
      <div id="fb5" class="feedback"></div>
    </div>

    <!-- Q6 -->
    <div class="quiz-question">
      <p><strong>Q6:</strong> Ce returnează <code>/this/i.test("This is it")</code>?</p>
      <label class="quiz-option"><input type="radio" name="q6" value="a"> true</label>
      <label class="quiz-option"><input type="radio" name="q6" value="b"> false</label>
      <label class="quiz-option"><input type="radio" name="q6" value="c"> Eroare de sintaxă</label>
      <button onclick="checkQ(6,'a')">Verifică</button>
      <div id="fb6" class="feedback"></div>
    </div>

    <!-- Q7 -->
    <div class="quiz-question">
      <p><strong>Q7:</strong> Ce este „shallow copy”?</p>
      <label class="quiz-option"><input type="radio" name="q7" value="a"> Copiere completă inclusiv a obiectelor imbricate</label>
      <label class="quiz-option"><input type="radio" name="q7" value="b"> Copiere doar a nivelului superior; obiectele imbricate rămân referințe</label>
      <label class="quiz-option"><input type="radio" name="q7" value="c"> O altă denumire pentru deep copy</label>
      <button onclick="checkQ(7,'b')">Verifică</button>
      <div id="fb7" class="feedback"></div>
    </div>

    <!-- Q8 -->
    <div class="quiz-question">
      <p><strong>Q8:</strong> Care e diferența între <code>push</code> și <code>unshift</code>?</p>
      <label class="quiz-option"><input type="radio" name="q8" value="a"> push adaugă la început, unshift la final</label>
      <label class="quiz-option"><input type="radio" name="q8" value="b"> push adaugă la final, unshift la început</label>
      <label class="quiz-option"><input type="radio" name="q8" value="c"> Ambele adaugă la început</label>
      <button onclick="checkQ(8,'b')">Verifică</button>
      <div id="fb8" class="feedback"></div>
    </div>

    <!-- Q9 -->
    <div class="quiz-question">
      <p><strong>Q9:</strong> De ce este recomandat să folosim comentarii clare?</p>
      <label class="quiz-option"><input type="radio" name="q9" value="a"> Pentru a înlocui documentația</label>
      <label class="quiz-option"><input type="radio" name="q9" value="b"> Pentru a explica intențiile și a facilita mentenanța</label>
      <label class="quiz-option"><input type="radio" name="q9" value="c"> Pentru a scurta codul</label>
      <button onclick="checkQ(9,'b')">Verifică</button>
      <div id="fb9" class="feedback"></div>
    </div>

    <!-- Q10 -->
    <div class="quiz-question">
      <p><strong>Q10:</strong> Ce simbol în regex marchează începutul unui șir?</p>
      <label class="quiz-option"><input type="radio" name="q10" value="a"> $</label>
      <label class="quiz-option"><input type="radio" name="q10" value="b"> ^</label>
      <label class="quiz-option"><input type="radio" name="q10" value="c"> .</label>
      <button onclick="checkQ(10,'b')">Verifică</button>
      <div id="fb10" class="feedback"></div>
    </div>
  </section>

</main>

<script>
// util: afișare JSON lizibil
const pretty = v => typeof v === "string" ? v : JSON.stringify(v, null, 2);

// 1) Obiecte
function demoObjects(){
  let bird = {};
  bird["genus"] = "corvus";
  bird.commonName = "crow";
  const before = { genus: bird.genus, commonName: bird.commonName };
  delete bird.commonName;
  const after = { hasCommonName: ("commonName" in bird) };
  document.getElementById("out-obj").textContent = pretty({ before, after });
}

// 2) Referințe vs copii
function demoRefs(){
  const animal = { genus: "corvus", species: "corax" };
  const alias = animal; // aceeași referință
  alias.genus = "ursus";
  const shallow1 = Object.assign({}, animal);
  const shallow2 = { ...animal };
  const deep = JSON.parse(JSON.stringify(animal));
  document.getElementById("out-ref").textContent =
    pretty({ animal, shallow1, shallow2, deep, aliasSame: (alias === animal) });
}

// 3) Array bază
function demoArrayBase(){
  let days = ["Mon","Tue","Wed"];
  const first = days[0]; const len = days.length;
  document.getElementById("out-arr1").textContent = pretty({ days, first, len });
}

// 4) Operații array
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

// 5) Claritate
function demoClarity(){
  function sum(a,b){return a+b}
  function sum2(a, b) { return a + b; }
  document.getElementById("out-clar").textContent =
    pretty({ compact: sum(2,3), readable: sum2(2,3) });
}

// 6) Regex
function demoRegex(){
  const s1="This is a string.", s2="Another line", s3="this appears Here", s4="Disparate THIS case";
  let rx = /this/; const r0 = [rx.test(s1), rx.test(s2), rx.test(s3), rx.test(s4)];
  rx = /this/i;    const r1 = [rx.test(s1), rx.test(s2), rx.test(s3), rx.test(s4)];
  const r2 = [/^this/i.test(s1), /this$/i.test(s1), /\\./.test("v.1")];
  document.getElementById("out-rx").textContent = pretty({ r0, r1, r2 });
}

// Quiz – verificare + feedback explicativ & strategii
function checkQ(n, correct){
  const val = document.querySelector('input[name="q'+n+'"]:checked');
  const fb = document.getElementById("fb"+n);
  if(!val){ fb.textContent = "Selectează un răspuns!"; return; }
  if(val.value === correct){
    fb.textContent = "✔ Corect!";
    if(n===1) fb.textContent += " Explicație: delete lasă un hole; strategie corectă: folosește splice pentru a menține array compact.";
    if(n===2) fb.textContent += " Explicație: '=' dă referință (alias), '{...obj}' face shallow copy; strategie: pentru deep copy folosește JSON sau librării dedicate.";
    if(n===3) fb.textContent += " Explicație: comentariile sporesc lizibilitatea; strategie: comentează intenția, nu fiecare linie banală.";
    if(n===4) fb.textContent += " Explicație: array-urile sunt indexate de la 0; strategie: fii atent la off-by-one.";
    if(n===5) fb.textContent += " Explicație: splice(2,1) elimină și compactează; strategie: evită 'delete arr[i]' pe tablouri.";
    if(n===6) fb.textContent += " Explicație: /this/i e case-insensitive, 'This' se potrivește; strategie: folosește flag-uri potrivite (i, g, m).";
    if(n===7) fb.textContent += " Explicație: shallow copy copiază doar nivelul superior; strategie: pentru structură adâncă, deep copy.";
    if(n===8) fb.textContent += " Explicație: push adaugă la final, unshift la început; strategie: pentru performanță, preferă push/pop.";
    if(n===9) fb.textContent += " Explicație: comentariile utile reduc costul de mentenanță; strategie: menține-le actualizate.";
    if(n===10) fb.textContent += " Explicație: '^' marchează începutul; '$' marchează sfârșitul; strategie: delimitează clar ancorele.";
  } else {
    fb.textContent = "✘ Incorect.";
    if(n===1) fb.textContent += " De ce e greșit: delete nu compactează; strategie: folosește splice, nu delete, pe tablouri.";
    if(n===2) fb.textContent += " De ce e greșit: '=' nu copiază; strategie: folosește spread/Object.assign pentru shallow, nu '='.";
    if(n===3) fb.textContent += " De ce e greșit: comentariile nu afectează execuția; strategie: scrie comentarii orientate pe intenție.";
    if(n===4) fb.textContent += " De ce e greșit: JS nu indexează de la 1; strategie: verifică întotdeauna indici + length.";
    if(n===5) fb.textContent += " De ce e greșit: splice nu lasă găuri și nu șterge „tot”; strategie: cunoaște semantica metodelor.";
    if(n===6) fb.textContent += " De ce e greșit: flag-ul 'i' ignoră capitalizarea; strategie: testează regex-urile într-un REPL.";
    if(n===7) fb.textContent += " De ce e greșit: shallow ≠ deep; strategie: analizează adâncimea structurii înainte de copiere.";
    if(n===8) fb.textContent += " De ce e greșit: push nu adaugă la început; strategie: alege metoda în funcție de poziția dorită.";
    if(n===9) fb.textContent += " De ce e greșit: comentariile nu înlocuiesc documentația; strategie: folosește-le pentru intenții și cazuri-limită.";
    if(n===10) fb.textContent += " De ce e greșit: '$' este sfârșitul; strategie: memorează perechea ^ (start) / $ (end).";
  }
}
</script>
</body></html>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
