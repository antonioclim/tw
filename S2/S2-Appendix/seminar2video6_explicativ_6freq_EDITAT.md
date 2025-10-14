<style>
:root { --indent: 0.63cm; }
body, * { font-family: "Times New Roman", Times, serif; font-size: 11pt; line-height: 1.0; color: #000; }
p, ul, ol, li { margin-top: 0; margin-bottom: 0; }
h1, h2, h3 { color: #000; background: #fff; margin-top: 0.4em; margin-bottom: 0.2em; }
/* Numerotare automată pentru Heading 1/2/3 */
body { counter-reset: h1; }
h1 { counter-reset: h2; }
h2 { counter-reset: h3; }
h1::before { counter-increment: h1; content: counter(h1) ". "; }
h2::before { counter-increment: h2; content: counter(h1) "." counter(h2) ". "; }
h3::before { counter-increment: h3; content: counter(h1) "." counter(h2) "." counter(h3) ". "; }
/* Blocuri de cod / comenzi */
pre, code { font-family: "Times New Roman", Times, serif; font-size: 11pt; }
pre.codeblue { background: #DDEBF7; color: #000; padding: 3pt 4pt; margin-left: var(--indent); page-break-inside: avoid; white-space: pre; }
pre.commandblack { background: #000000; color: #ffffff; padding: 3pt 4pt; margin-left: var(--indent); page-break-inside: avoid; white-space: pre; }
table { border-collapse: collapse; width: 100%; }
th, td { border: 0.5pt solid #666; text-align: left; vertical-align: top; padding: 2pt 4pt; }
th { font-weight: 700; }
/* Pagină: A4, margini 1 cm; numerotare jos-centru */
@page { size: A4; margin: 1cm; @bottom-center { content: "Pagina " counter(page) " din " counter(pages); font-family: "Times New Roman", Times, serif; font-size: 11pt; color: #000; } }
</style>

# Introducere în JS — VIDEO 6
(Pasul 7: Structuri de control) Frecvențe relative ale literelor într-un text

## 1. Context general al lecției

Acest material continuă firul didactic din „Introducere în JS” și este aliniat cu VIDEO 6: Pasul 7 — Structuri de control. Exersăm parcurgerea colecțiilor (șiruri, tablouri, obiecte) pentru a calcula frecvențele relative ale literelor într‑un text, excluzând spațiul. Comparam soluții imperative cu soluții funcționale (ES6+), cu accent pe Unicode (diacritice), normalizare și integrare CLI (Node.js).

## 2. Obiective de învățare

- Utilizarea structurilor de control `for`, `for...of`, `for...in` și a `Object.keys/Object.entries` pentru iterare.
- Înțelegerea diferențelor dintre „caracter”, „unitate de cod” (UTF‑16) și „punct de cod” (Unicode).
- Aplicarea abordărilor imperative și funcționale pentru a construi o distribuție de frecvențe relative.
- Normalizarea și uniformizarea cazului (majuscule/minuscule) pentru texte cu diacritice românești.
- Integrarea cu CLI (Node.js) și evaluarea complexității (timp/memorie).

## 3. Fundamente teoretice (șiruri, Unicode, iterare)

- În JavaScript, un șir este o secvență de **unități de cod** UTF‑16. Indexarea (`text[i]`, `charAt`) lucrează pe unități de cod; în schimb, `for...of` iterează pe **puncte de cod** (caractere Unicode).
- „Literă” vs „caracter”: folosim `\p{L}` (Unicode property escapes, cu flagul `u`) pentru a selecta **literele**, necesitând Node 12+ (recomandat 18/20/22).
- Normalizare și caz: aplicați `normalize('NFC')` și `toLocaleLowerCase('ro-RO')` pentru a uniformiza diacriticele și majusculele.
- Frecvență relativă: `freq(x) = apariții(x) / total_litere`. Suma valorilor este 1 (în limitele erorilor de reprezentare).

## 4. Recapitulare: distribuție pe cuvinte (Variante A/B/C)

### 4.1. Var. A — 6freqA.js (imperativ, două treceri)

<pre class="codeblue"><code>// 6freqA.js — pe cuvinte (imperativ, două treceri)
const sampleString = 'azi e o zi ploioasa si zile ca aceastea vor mai fi de azi incolo';

const getCounts = (text) => {
  const words = text.split(' ');
  const result = Object.create(null);
  for (const w of words) result[w] = (result[w] || 0) + 1; // numărări
  for (const k in result) result[k] /= words.length;       // normalizare
  return result;
};

console.log(getCounts(sampleString));</code></pre>

**Comentarii:** `split(' ')` nu gestionează punctuația și spațiile multiple; pentru cuvinte reale, preferați `text.match(/\p{L}+/gu)` și `toLocaleLowerCase('ro-RO')`.

### 4.2. Var. B — 6freqB.js (funcțional, o trecere, Unicode corect)

<pre class="codeblue"><code>// 6freqB.js — pe cuvinte (funcțional, o trecere, Unicode corect)
const getCounts = (text) => {
  const words = (text.match(/\p{L}+/gu) || []).map(w => w.toLocaleLowerCase('ro-RO'));
  const n = words.length || 1;
  return words.reduce((acc, w) => (acc[w] = (acc[w] || 0) + 1/n, acc), Object.create(null));
};

const sampleString = 'azi e o zi ploioasă și zile ca acestea vor mai fi de azi încolo';
console.log(getCounts(sampleString));</code></pre>

### 4.3. Var. C — 6freqC.js (one‑liner, funcțional, Unicode)

<pre class="codeblue"><code>// 6freqC.js — one-liner pe cuvinte (funcțional, Unicode)
const getCounts = t =>
  (t.match(/\p{L}+/gu) || [])
    .map(x => x.toLocaleLowerCase('ro-RO'))
    .reduce((a, x, _, arr) => (a[x] = (a[x] || 0) + 1/arr.length, a), {});

console.log(getCounts('azi e o zi ploioasă și zile ca acestea vor mai fi de azi încolo'));</code></pre>

## 5. Frecvențe pe **litere** (excluzând spațiul)

### 5.1. Varianta L‑A — Imperativ (clară, Unicode corect)

<pre class="codeblue"><code>// 6freqL_A.js — literă cu literă (imperativ, două treceri)
const letterFreq = (text) => {
  const letters = (text.normalize('NFC').match(/\p{L}/gu) || [])
                   .map(ch => ch.toLocaleLowerCase('ro-RO'));
  const n = letters.length || 1;
  const counts = Object.create(null);
  for (const ch of letters) counts[ch] = (counts[ch] || 0) + 1;
  for (const k in counts) counts[k] /= n;
  return counts;
};

console.log(letterFreq('Azi e o zi ploioasă și zile ca acestea...'));</code></pre>

### 5.2. Varianta L‑B — Funcțional (o trecere, adunăm direct 1/n)

<pre class="codeblue"><code>// 6freqL_B.js — literă cu literă (funcțional, o trecere)
const letterFreq = (text) => {
  const letters = (text.normalize('NFC').match(/\p{L}/gu) || [])
                   .map(ch => ch.toLocaleLowerCase('ro-RO'));
  const n = letters.length || 1;
  return letters.reduce((acc, ch) => (acc[ch] = (acc[ch] || 0) + 1/n, acc), {});
};

console.log(letterFreq('Azi e o zi ploioasă și zile ca acestea...'));</code></pre>

### 5.3. Varianta L‑C — One‑liner (dens, Unicode corect)

<pre class="codeblue"><code>// 6freqL_C.js — literă cu literă (one-liner, Unicode corect)
const letterFreq = t =>
  ((a = (t.normalize('NFC').match(/\p{L}/gu) || []).map(x => x.toLocaleLowerCase('ro-RO'))),
   a.reduce((acc, x, _, arr) => (acc[x] = (acc[x] || 0) + 1/arr.length, acc), {}));

console.log(letterFreq('Azi e o zi ploioasă și zile ca acestea...'));</code></pre>

## 6. Variantă CLI (Node.js) — preia textul din linia de comandă

<pre class="codeblue"><code>// 6freq_cli_letters.js — variantă CLI (Node.js)
const letterFreq = t =>
  ((a = (t.normalize('NFC').match(/\p{L}/gu) || []).map(x => x.toLocaleLowerCase('ro-RO'))),
   a.reduce((acc, x, _, arr) => (acc[x] = (acc[x] || 0) + 1/arr.length, acc), {}));

const text = process.argv.slice(2).join(' ');
if (!text) { console.error('Utilizare: node 6freq_cli_letters.js <text...>'); process.exit(1); }
console.log(letterFreq(text));</code></pre>

**Exemplu:**

<pre class="commandblack"><code>node 6freq_cli_letters.js "Azi e o zi ploioasă și zile ca acestea..."</code></pre>

## 7. Structuri de control: `for`, `for...of`, `for...in`, `Object.entries`

- `for (let i = 0; i < n; i++)` — control clasic, eficient; potrivit pentru acces indexat.
- `for...of` — iterează elementele colecțiilor; pe șir, iterează **puncte de cod Unicode**.
- `for...in` — iterează cheile unui obiect; pentru perechi [cheie, valoare] folosiți `Object.entries(obj)`.
- În stil funcțional, `Array.prototype.reduce` acumulează frecvențe într‑o singură trecere.

## 8. Complexitate și „cazuri reale”

- Timp: **O(n)**, n = numărul de litere extrase. Memorie: **O(U)**, U = numărul de litere distincte.
- Unicode: pentru ăâîșț folosiți `normalize('NFC')` + `toLocaleLowerCase('ro-RO')`. `\p{L}` necesită flagul `u` și Node 12+.
- Obiect vs Map: `Object.create(null)` evită coliziuni pe prototip. `Map` e robust pentru chei arbitrare, dar necesită `.get/.set`.
- Afișare ordonată: folosiți sortarea perechilor `[literă, frecvență]` și, la nevoie, afișați doar top‑k.

**Sortarea frecvențelor și afișarea top‑k:**

<pre class="codeblue"><code>// Ordonare descrescător și afișare top‑k perechi [literă, frecvență]
const sortTop = (freq, k=5) =>
  Object.fromEntries(Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, k));

const f = ((t) => {
  const a = (t.normalize('NFC').match(/\p{L}/gu) || []).map(x => x.toLocaleLowerCase('ro-RO'));
  return a.reduce((acc, x, _, arr) => (acc[x] = (acc[x] || 0) + 1/arr.length, acc), {});
})('Azi e o zi ploioasă și zile ca acestea...');

console.log(sortTop(f, 5));</code></pre>

## 9. Exerciții pentru studenți

- Implementați `letterFreqForOf(text)` folosind strict `for...of` pe șir (după normalizare), fără `match`.
- Adăugați opțiune CLI `--top=K` pentru a afișa doar primele `K` litere după frecvență.
- Comparați runtime‑ul între varianta imperativă și cea funcțională pentru texte lungi (`console.time`).
- Extindeți la bigrame și trigrame; discutați utilitatea în preprocesarea limbajului natural.
- Adăugați `--ignore=â,î` etc. și analizați impactul asupra distribuției.

## 10. Tabel comparativ (Var. L‑A / L‑B / L‑C)

| Variantă | Paradigmă | Avantaje | Limitări | Complexitate (timp/memorie) |
|:---------|:----------|:---------|:---------|:-----------------------------|
| 6freqL_A.js | Imperativă, două treceri | Claritate, control fin | Două treceri; cod mai lung | O(n) / O(U) |
| 6freqL_B.js | Funcțională, o trecere | Concis, compozițional | Necesită `reduce`; atenție la lizibilitate | O(n) / O(U) |
| 6freqL_C.js | Funcțională, one‑liner | Dens, expresiv | Mai greu de întreținut | O(n) / O(U) |

## 11. Concluzii

Am văzut cum aceleași principii de iterare și agregare se aplică atât pentru frecvențe pe cuvinte, cât și — mai potrivit scopului VIDEO 6 — pe litere. Abordarea imperativă este predictibilă și eficientă, iar stilul funcțional oferă concizie și claritate compozițională. Gestionarea corectă a Unicode și a normalizării este esențială în limba română. Integrarea cu CLI transformă aceste funcții în instrumente utile în practică.

---

[^1]: `\p{L}` (Unicode property escapes) necesită flagul `u` și suport runtime (Node 12+; recomandat 18/20/22). În lipsa suportului, folosiți o listă explicită de litere sau biblioteci dedicate.

[^2]: `toLocaleLowerCase('ro-RO')` ajută la uniformizarea cazului pentru diacritice românești; aplicați `normalize('NFC')` pentru a evita discrepanțe între forme compuse/precompuse.
