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
/* Paginare (pentru randări care suportă paged media) */
@page { size: A4; margin: 1cm; @bottom-center { content: "Pagina " counter(page) " din " counter(pages); font-family: "Times New Roman", Times, serif; font-size: 11pt; color: #000; } }
</style>

# Introducere în JS — VIDEO 3
Pasul 4: Structuri de control — bucla for & numărarea aparițiilor de caractere

## 1. Context general al lecției

Acest material aparține cursului „Introducere în JS”, VIDEO 3, și vizează consolidarea înțelegerii structurilor de control (în mod special bucla `for`), precum și manipularea de șiruri în JavaScript. Sunt prezentate patru variante de scripturi pentru numărarea aparițiilor unui caracter într‑un text, de la abordarea imperativă clasică până la variante concise și integrarea argumentelor CLI în Node.js.

## 2. Obiective de învățare

- Aplicarea buclei `for` pentru parcurgerea caracter cu caracter a unui șir.
- Înțelegerea diferențelor dintre abordarea imperativă și cea funcțională în JavaScript.
- Utilizarea metodelor de șir (`charAt`, `split`) și înțelegerea diferențelor conceptuale/performanțiale.
- Integrarea argumentelor externe (CLI) folosind `process.argv` în Node.js.
- Analiza complexității, memoriei alocate și a cazurilor limită (diacritice, majuscule, normalizare).

## 3. Precondiții și mediu

- Node.js instalat; rulare din terminal (PowerShell/CMD/macOS Terminal).
- Editor (VS Code). Atenție la salvarea fișierelor înainte de rulare.
- Cunoștințe de bază: tipuri, șiruri, funcții, operatori, `console.log`.

## 4. Fundamente teoretice (șiruri, bucle, CLI)

### 4.1. Șiruri în JavaScript

Șiruri în JavaScript: `text.length` indică numărul de **unități de cod** (UTF‑16 code units), nu neapărat numărul de caractere Unicode. Metodele `charAt(i)`/indexarea `text[i]` operează pe unități de cod. Pentru emoji/diacritice compuse, folosiți la nevoie `Array.from(text)` (iterare pe code points).[^1]

### 4.2. Bucle `for`

Buclele `for`: forma tradițională `for (init; condiție; pas)` este utilă pentru parcurgeri indexate. Complexitatea tipică a unei treceri pe șir: **O(n)** timp, **O(1)** memorie (dacă nu alocăm colecții auxiliare).

### 4.3. `split` pentru numărare

`split` pentru numărare: `text.split(token).length - 1` oferă numărul de apariții **ne‑suprapuse** ale unui subșir `token`. Pentru un **singur caracter**, rezultatul este intuitiv. Pentru subșiruri mai lungi, aparițiile suprapuse nu sunt numărate.[^2]

### 4.4. CLI (Node.js)

CLI (Node.js): `process.argv` conține argumentele comenzii; `process.argv[0]` este `node`, `process.argv[1]` este scriptul, iar de la `process.argv[2]` încolo avem argumentele reale. `process.argv.slice(2).join(" ")` reface textul dacă a fost introdus ca o secvență de cuvinte separate.[^3]

## 5. Var. 1 — 3occurencesA.js (imperativ, for tradițional)

<pre class="codeblue"><code>// 3occurencesA.js — imperativ, for tradițional
function occurences(text, character) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) === character) {
      count++;
    }
  }
  return count;
}

console.log(occurences("an apple a day keeps the doctor away", "e"));</code></pre>

Se parcurge șirul cu un `for` indexat, se extrage fiecare unitate de cod cu `charAt(i)` și se compară strict (`===`) cu caracterul țintă; la egalitate, incrementăm `count`. Avantaje: control fin; claritate didactică; **O(1)** memorie. Limitări: mai mult cod; atenție la Unicode.

## 6. Var. 2 — 3occurencesB.js (funcțional prin split)

<pre class="codeblue"><code>// 3occurencesB.js — funcțional prin split
function occurences(text, character) {
  return text.split(character).length - 1;
}

console.log(occurences("an apple a day keeps the doctor away", "e"));</code></pre>

`split` împarte textul în bucăți folosind delimitatorul `character`; numărul de apariții este cu unu mai mic decât numărul de bucăți. Avantaje: concizie; evită bucla explicită. Limitări: alocă un array (O(n) memorie); pentru subșiruri mai lungi nu numără apariții suprapuse; `character === ""` este caz de evitat.

## 7. Var. 3 — 3occurencesC.js (arrow function, concis)

<pre class="codeblue"><code>// 3occurencesC.js — arrow function, concis
let occurences = (text, character) => text.split(character).length - 1;

console.log(occurences("an apple a day keeps the doctor away", "e"));</code></pre>

Identică logic cu Varianta 2, dar folosind sintaxa **arrow function** (ES6), cu return implicit. Avantaje: concizie/stil modern; Limitări: ca la Varianta 2.

## 8. Var. 4 — 3occurencesD.js (integrare CLI, implicit `e`)

<pre class="codeblue"><code>// 3occurencesD.js — integrare CLI, implicit 'e'
let occurences = (text, character) => text.split(character).length - 1;

console.log(process.argv.slice(2).join(" ").split("e").length - 1);</code></pre>

**Exemplu de rulare:**

<pre class="commandblack"><code>node 3occurencesD.js an apple a day keeps the doctor away
# → 4</code></pre>

Exemplul fixează caracterul căutat la `e`. Pentru o variantă mai generală, ultimul argument poate fi tratat ca „caracter” dacă are lungime 1; restul argumentelor compun textul.

<pre class="codeblue"><code>// 3occurencesD2.js — ultimul argument poate fi caracterul; altfel implicit 'e'
const a = process.argv.slice(2);
const token = (a.length > 1 && a.at(-1).length === 1) ? a.pop() : "e";
console.log(a.join(" ").split(token).length - 1);</code></pre>

## 9. Teorie vs practică — decizii de proiectare

- Sensibilitate la majuscule/minuscule: utilizați `toLowerCase()`/`toLocaleLowerCase('ro-RO')` pe text și caracter, dacă doriți insensibilitate la caz.
- Diacritice și normalizare Unicode: pentru texte cu diacritice compuse/precompuse, folosiți `normalize('NFC')` sau `normalize('NFD')` consecvent.
- Subșiruri mai lungi vs apariții suprapuse: `split` numără apariții ne‑suprapuse; pentru suprapuse utilizați expresii regulate cu lookahead.[^4]
- Performanță și memorie: varianta cu buclă `for` este O(1) memorie; `split` creează un array și implică alocări suplimentare.
- CLI UX: adăugați mesaje de utilizare și validări (ex.: caracter lipsă, text gol).

## 10. Sarcină practică (după video): funcție cu listă de numere → array

### 10.1. Parametrul este șir cu numere separate prin spații:

<pre class="codeblue"><code>function toNumberArray(listStr) {
  if (typeof listStr !== 'string') return [];
  return listStr.trim().split(/\s+/).map(Number).filter(Number.isFinite);
}

console.log(toNumberArray("1 2 3.5 4")); // [1, 2, 3.5, 4]</code></pre>

### 10.2. Parametrul este deja un array:

<pre class="codeblue"><code>function toNumberArrayFromArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(Number).filter(Number.isFinite);
}

console.log(toNumberArrayFromArray([1, "2", "x", 3])); // [1, 2, 3]</code></pre>

### 10.3. Variantă CLI:

<pre class="codeblue"><code>// toNumbers.js
const nums = process.argv.slice(2).map(Number).filter(Number.isFinite);
console.log(JSON.stringify(nums));

// Exemplu: node toNumbers.js 1 2 3.5 4 → [1,2,3.5,4]</code></pre>

## 11. Exemplu pentru apariții suprapuse (subșiruri)

<pre class="codeblue"><code>// numără apariții suprapuse ale subșirului `pat` în `text`
function countOverlapping(text, pat) {
  if (!pat) return 0;
  const re = new RegExp(`(?=${pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g');
  return (text.match(re) || []).length;
}

console.log(countOverlapping("aaaa", "aa")); // 3 (suprapuse)</code></pre>

## 12. Tabel comparativ (Var. 1–4)

| Variantă | Paradigmă | Avantaje | Limitări | Complexitate (timp/memorie) |
|:---------|:----------|:---------|:---------|:-----------------------------|
| 3occurencesA.js | Imperativă (for) | Clar, O(1) memorie | Mai mult cod; atenție la Unicode | O(n) / O(1) |
| 3occurencesB.js | Funcțională (split) | Concis, expresiv | Alocă array; non‑overlapping | O(n) / O(n) |
| 3occurencesC.js | Funcțională (arrow) | Concis + stil modern | Limitări identice cu split | O(n) / O(n) |
| 3occurencesD.js | CLI (join+split) | Integrare cu argv, utilitar | Implicit fix 'e'; lipsă validări | O(n) / O(n) |

## 13. Checklist pentru studenți

- Rulați fiecare variantă și notați diferențele de ieșire pentru litere diferite (ex.: 'a', 'e', 'p').
- Testați cazuri cu diacritice și majuscule; decideți dacă doriți insensibilitate la caz + normalizare.
- Implementați numărarea aparițiilor suprapuse pentru subșiruri (ex.: 'aaaa' și 'aa').
- Finalizați sarcina „listă de numere → array”; adăugați 3–5 teste proprii.

## 14. Concluzii

Cele patru variante conturează trecerea de la control explicit cu `for` la concizie funcțională și integrare CLI. În aplicații reale, alegeți între claritate, performanță și memorie în funcție de dimensiunea datelor și cerințele aplicației.

---

[^1]: Diferența dintre **code units** și **code points** poate afecta manipularea caracterelor cu diacritice/emoji; `Array.from` iterează pe code points.

[^2]: `split` numără apariții **ne‑suprapuse**; pentru suprapuse folosiți lookahead în expresii regulate.

[^3]: `process.argv` este specific **Node.js** și expune argumentele CLI începând de la indexul 2.

[^4]: Lookahead (ex.: `(?=pat)`) permite potriviri suprapuse fără a consuma caractere.
