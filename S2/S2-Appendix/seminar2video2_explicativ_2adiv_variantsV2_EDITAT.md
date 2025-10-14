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

# Introducere în JS — VIDEO 2
Paradigme (imperativ vs funcțional), Node.js CLI și verificarea divizibilității

**Notă de editare:** această versiune urmează cerințele de formatare (TNR 11 pt, spațiere 1.0, A4/1 cm, headinguri numerotate, stiluri pentru cod și comenzi, tabele cu linii subțiri).
## 1. Context general al lecției

Acest material face parte din lecția „Introducere în JS” (VIDEO 2) și clarifică principiile de bază ale limbajului JavaScript, modul de lucru cu Node.js în linia de comandă (CLI), trei variante de scripturi pentru verificarea divizibilității și decizii de proiectare între stiluri imperative și funcționale. La final, este propus un exercițiu aplicat: calculul numărului de caractere diferite între două șiruri. 

## 2. Obiective de învățare

- Înțelegerea diferențelor dintre stilul imperativ și cel funcțional în JavaScript.
- Utilizarea argumentelor din linia de comandă în Node.js (`process.argv`).
- Aplicarea operatorului modulo (%) și a coerciției numerice.
- Analiza compromisurilor concizie–lizibilitate–robustețe.
- Proiectarea unei funcții pure pentru o sarcină algoritmică (număr de caractere diferite).

## 3. Precondiții și mediu de lucru

- Node.js instalat și acces la un terminal (PowerShell/CMD/macOS Terminal).
- Editor de cod (ex.: Visual Studio Code); salvați explicit fișierele înainte de rulare.
- Cunoștințe de bază: variabile, funcții, operatori, șiruri, `console.log`.

## 4. Fundamente teoretice

### 4.1. Argumente CLI (`process.argv`)

`process.argv` este un tablou de șiruri care conține executabilul Node, calea scriptului și argumentele reale (începând cu indexul `2`).[^1]

<pre class="codeblue"><code>
// Exemplu: node 2adiv.js 10 2
[
  'C:\\Program Files\\nodejs\\node.exe',  // [0] executabilul Node
  'Z:\\...\\2adiv.js',                    // [1] scriptul
  '10',                                     // [2] primul argument real (n)
  '2'                                       // [3] al doilea argument real (d)
]
</code></pre>

### 4.2. Operatorul `%` (modulo)

Operatorul `%` întoarce restul împărțirii. În JavaScript, tipul numeric este IEEE‑754 (double). Rețineți că `-10 % 2 === -0`, iar `-0 === 0` este `true`.[^2]

### 4.3. Coerciția numerică (unary `+`)

Coerciția numerică: `+'10'` → `10`. Unary `+` convertește șirul în număr (`NaN` dacă nu reușește).

### 4.4. Paradigme (imperativ vs funcțional)

- **Imperativ:** accent pe pași și ramificări (`if/else`), claritate structurală.
- **Funcțional:** accent pe expresii, compoziție și imutabilitate; concizie cu arrow functions și destructurare.

## 5. Var. 1 — 2adiv.js (imperativ, „Varianta 1 video 2”)

<pre class="codeblue"><code>
// 2adiv.js — Varianta 1 (imperativă)
function checkDivisible(n, divisor) {
  if (n % divisor === 0) {
    return true;
  } else {
    return false;
  }
}

console.log(checkDivisible(10, 2));  // true
console.log(checkDivisible(10, 3));  // false
</code></pre>

**Analiză:** funcția `checkDivisible` folosește ramificare `if/else` pentru a întoarce explicit `true`/`false`. Forma poate fi comprimată la `return n % divisor === 0;`, fără a schimba semantica.

**Extensie CLI (aceeași paradigmă):**

<pre class="codeblue"><code>
// Extensie CLI (imperativ, aceeași paradigmă)
function checkDivisible(n, d) { return d !== 0 && (n % d === 0); }

const [,, nStr, dStr] = process.argv;
console.log(checkDivisible(+nStr, +dStr));
</code></pre>

## 6. Var. 2 — 2adivshort.js (funcțional, concis ES6, „tema acasă”)

<pre class="codeblue"><code>
// 2adivshort.js — Varianta 2 (funcțional, one‑liner ES6)
console.log((+process.argv[2] % +process.argv[3]) === 0);
</code></pre>

**Analiză:** one‑liner funcțional care convertește argumentele la numere, aplică `%` și compară cu `0`. Adecvat pentru utilitare minimale, acceptând lipsa validărilor explicite.

**Cazuri reale:**

<pre class="commandblack"><code>
node 2adivshort.js 10 2   # true
</code></pre>
<pre class="commandblack"><code>
node 2adivshort.js 10 3   # false
</code></pre>
<pre class="commandblack"><code>
node 2adivshort.js 10 0   # false (NaN % 0 → NaN; comparația dă false; nu există mesaj explicit)
</code></pre>
<pre class="commandblack"><code>
node 2adivshort.js 10 2.5 # true (divizibilitate în reals; poate fi indezirabil dacă vizați doar întregi)
</code></pre>

## 7. Var. 3 — 2adivno0.js (funcțional + protecție la d=0)

<pre class="codeblue"><code>
// 2adivno0.js — Varianta 3 (funcțional + protecție la d=0)
const [,, n, d] = process.argv;
console.log(+d !== 0 && (+n % +d === 0));
</code></pre>

**Analiză:** destructurare pentru extragerea rapidă a argumentelor și **guard** (`+d !== 0`) pentru a evita împărțirea la zero.

**Cazuri reale:**

<pre class="commandblack"><code>
node 2adivno0.js 10 2   # true
</code></pre>
<pre class="commandblack"><code>
node 2adivno0.js 10 3   # false
</code></pre>
<pre class="commandblack"><code>
node 2adivno0.js 10 0   # false (protejare explicită)
</code></pre>

## 8. Teorie vs practică — decizii de proiectare

- **Lizibilitate vs concizie:** pentru materiale didactice, începeți cu varianta explicită; treceți treptat la una concisă.
- **Întregi vs zecimale:** decideți dacă impuneți întregi (`Number.isInteger(+n) && Number.isInteger(+d)`); documentați clar.
- **Mesaje de eroare/UX CLI:** pentru utilizatori finali, una‑două linii nu ajung; e util un `--help` și validări explicite.
- **Edge cases:** `-0`, numere foarte mari (posibile erori IEEE‑754), `NaN`, șiruri ne‑numerice.

## 9. Exercițiu aplicat: numărul de caractere diferite (șiruri egale ca lungime)

### 9.1. Variantă imperativă (clară și eficientă, O(n))

<pre class="codeblue"><code>
function countDiffChars(s1, s2) {
  if (typeof s1 !== 'string' || typeof s2 !== 'string') return -1;
  if (s1.length !== s2.length) return -1;
  let count = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) count++;
  }
  return count;
}

// Teste
console.log(countDiffChars("ana", "ana")); // 0
console.log(countDiffChars("ana", "are")); // 2
console.log(countDiffChars("abc", "abcd")); // -1
</code></pre>

### 9.2. Variantă funcțională (cu `Array.from` pentru code points)

<pre class="codeblue"><code>
function countDiffCharsF(s1, s2) {
  if (typeof s1 !== 'string' || typeof s2 !== 'string') return -1;
  const a = Array.from(s1); // code points corecte
  const b = Array.from(s2);
  if (a.length !== b.length) return -1;
  return a.reduce((acc, ch, i) => acc + (ch !== b[i] ? 1 : 0), 0);
}

// Teste
console.log(countDiffCharsF("măr", "mar")); // 1 (diacritice diferite)
console.log(countDiffCharsF("ana", "are")); // 2
</code></pre>

**Observații didactice:** normalizați diacriticele dacă e nevoie și decideți dacă faceți compararea case‑insensitive; utilizați `normalize('NFC')`/`normalize('NFD')` consecvent pe ambele șiruri.[^3]

### 9.3. Variantă CLI (rulare din terminal)

<pre class="codeblue"><code>
// hamming.js
function countDiffChars(s1, s2) {
  if (typeof s1 !== 'string' || typeof s2 !== 'string') return -1;
  if (s1.length !== s2.length) return -1;
  let c = 0;
  for (let i = 0; i < s1.length; i++) if (s1[i] != s2[i]) c++;
  return c;
}

const [,, s1, s2] = process.argv;
console.log(countDiffChars(s1, s2));

// Ex.: node hamming.js "ana" "are"   → 2
</code></pre>

<pre class="commandblack"><code>node hamming.js "ana" "are"   # 2</code></pre>

## 10. Tabel comparativ (Var. 1 / Var. 2 / Var. 3)

| Variantă | Paradigmă | Pro | Contra | Caz tipic de utilizare |
|:---------|:----------|:----|:-------|:------------------------|
| 2adiv.js | Imperativă | Lizibilitate, ușor de extins/testat | Mai mult cod; inițial fără argv | Material didactic, cod demonstrativ simplu |
| 2adivshort.js | Funcțională (one‑liner) | Ultra‑concis | Fără validări; zero/NaN/zecimale surprind | Script utilitar rapid, prototipare |
| 2adivno0.js | Funcțională + guard | Scurt + protecție la d=0 | Nu validează întregi/mesaje de eroare | Utilitar scurt cu minimă robustețe |

## 11. Checklist pentru studenți

- Rulează fiecare variantă cu un set de exemple: (10,2), (10,3), (10,0), (10,2.5) și notează diferențele.
- Scrie 3–5 rânduri despre imperativ vs funcțional în contextul acestor scripturi.
- Implementează funcția de diferențe de caractere (ambele variante) și testează cu șiruri cu diacritice și majuscule.
- Opțional: creează o versiune robustă CLI cu `--help` și validări (mesaje clare; `process.exit(1)` la input invalid).

## 12. Concluzii

Cele trei variante prezintă un arc pedagogic: de la claritatea imperativă la concizia funcțională și apoi la un minim de robustețe. Exercițiul cu numărul de caractere diferite conectează teoria cu practica algoritmică.

---

[^1]: `process.argv` este specific **Node.js** (nu face parte din standardul ECMAScript) și este disponibil doar în runtime‑ul Node.

[^2]: În JavaScript, `-0` compară egal cu `0` în sensul `-0 === 0` → `true`, dar `1 / -0` produce `-Infinity`.

[^3]: `Array.from` iterează pe **code points**, fiind mai corect pentru Unicode decât indexarea pe unități de cod.
