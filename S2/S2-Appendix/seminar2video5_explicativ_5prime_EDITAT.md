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

# Introducere în JS — VIDEO 5
Recursie, obiecte globale, CLI (Node.js) — Numere prime & Fibonacci

## 1. Context general al lecției

Această secțiune din „Introducere în JS” (VIDEO 5) focalizează trei direcții complementare: (i) citirea parametrilor din linia de comandă în mediul Node.js, (ii) recursia ca mecanism de definire a algoritmilor, și (iii) utilizarea obiectelor globale uzuale (`process`, `Math`, `console`). Studiul de caz principal este detecția numerelor prime; sarcina aplicativă este calculul elementului de ordin *n* al șirului Fibonacci, *n* fiind citit din linia de comandă.

## 2. Obiective de învățare

- Înțelegerea structurii `process.argv` și integrarea parametrilor CLI în scripturi Node.js.
- Aplicarea corectă a buclelor și evitarea erorilor logice (ex.: „return prea devreme”).
- Înțelegerea noțiunilor de bază despre numere prime și complexitate O(√n).
- Utilizarea recursiei pe exemplul șirului Fibonacci; compararea variantelor: naivă, iterativă, fast doubling.
- Conștientizarea limitelor numerice (IEEE‑754 `Number` vs `BigInt`) și a efectelor asupra performanței/rezultatelor.

## 3. Fundamente: obiecte globale Node, CLI și bune practici

- `process.argv` este un tablou: `[0]=node`, `[1]=script`, `[2+]` = argumentele reale. Pentru text multi‑cuvânt: `process.argv.slice(2).join(" ")`. Pentru numere: conversie explicită cu `Number(...)` sau coerciție `+arg`, urmată de `Number.isInteger(...)`. Folosiți `console.error` pentru erori și afișați un mesaj de utilizare când lipsesc parametri.[^1]

- `Math` oferă operații matematice (ex.: `Math.sqrt`). În testarea primalității, calculați limita o singură dată și iterați divizorii între 2 și `⌊√n⌋`. Tratați separat cazul `2` și săriți peste perechile pare pentru eficiență.

## 4. Studiu de caz: numere prime — de la erori tipice la variante robuste

### 4.1. Var 1 — 5primeA.js (verificare parametri CLI)

<pre class="codeblue"><code>// 5primeA.js — verificare parametri CLI
if (process.argv.length < 3) {
  console.log('not enough params');
} else {
  console.log('fine');
}</code></pre>

**Rol:** asigură prezența argumentului. Bază pentru variantele următoare.

### 4.2. Var 2 — 5primeB.js (versiune greșită; „return prea devreme”)

<pre class="codeblue"><code>// 5primeB.js — G R E Ș I T (return prea devreme)
const checkPrime = (n) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (!(n % i)) return false;
    return true; // ✗ iese la prima iterație în care n%2 != 0; nu mai testează 3,5,7...
  }
};
// CLI
process.argv.length < 3
  ? console.log('not enough params')
  : console.log(checkPrime(parseInt(process.argv[2])));</code></pre>

**Diagnostic:** pentru `n=21`, la `i=2` nu se găsește divizor, funcția întoarce `true` imediat, fără a mai testa `i=3` (divizor valid).

### 4.3. Var 3 — 5primeC.js (corectarea logicii)

<pre class="codeblue"><code>// 5primeC.js — corectarea logicii
const checkPrime = (n) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true; // ✓ după epuizarea tuturor divizorilor posibili
};
process.argv.length < 3
  ? console.log('not enough params')
  : console.log(checkPrime(parseInt(process.argv[2])));</code></pre>

### 4.4. Var 4 — 5primeD.js (ES6+ minimală, corectă)

<pre class="codeblue"><code>// 5primeD.js — ES6+ minimală, corectă
const isPrime = n => { n = Math.trunc(+n); if (n < 2) return false;
  for (let i = 2, L = Math.floor(Math.sqrt(n)); i <= L; i++) if (n % i === 0) return false;
  return true; };
process.argv[2] ? console.log(isPrime(process.argv[2])) : console.log('not enough params');</code></pre>

### 4.5. Var 5 — 5primeE.js (ES6+ cu optimizare pe impari)

<pre class="codeblue"><code>// 5primeE.js — ES6+ cu optimizare pe impari
const isPrime = n => { n = Math.trunc(+n); if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3, L = Math.floor(Math.sqrt(n)); i <= L; i += 2) if (n % i === 0) return false;
  return true; };
process.argv[2] ? console.log(isPrime(process.argv[2])) : console.log('not enough params');</code></pre>

### 4.6. Var 6 — 5primeF.js (one‑liner dens; alocă un array)

<pre class="codeblue"><code>// 5primeF.js — one‑liner dens (construcție de array a divizorilor)
const isPrime = n => (n = Math.trunc(+n)) > 1 &&
  !Array.from({length: Math.max(0, Math.floor(Math.sqrt(n)) - 1)}, (_, i) => i + 2)
   .some(d => n % d === 0);
process.argv[2] ? console.log(isPrime(process.argv[2])) : console.log('not enough params');</code></pre>

**Trade‑off:** elegant ca expresie, dar mai costisitor (creează un array al divizorilor). Pentru uz real, preferați **D** sau **E**.

## 5. Sarcina aplicativă: șirul lui Fibonacci (CLI + `BigInt`)

### 5.1. Variantă naiv recursivă (doar pentru n mic)

<pre class="codeblue"><code>// fib_naiv.js — (exemplu didactic; cost exponențial)
function fibNaiv(n) {
  if (n <= 1) return n;
  return fibNaiv(n-1) + fibNaiv(n-2);
}
// Doar pentru n mic (ex.: n ≤ 35)</code></pre>

Complexitate: O(φ^n) apeluri; doar pentru n mic (ex.: n ≤ 35).

### 5.2. Variantă iterativă (O(n), `BigInt`)

<pre class="codeblue"><code>// fib_iter.js — iterativ, O(n), BigInt
function fibIter(n) {
  n = Number(n);
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) throw new Error("n trebuie să fie întreg nenegativ");
  let a = 0n, b = 1n;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}</code></pre>

### 5.3. „Fast doubling” (O(log n), `BigInt`)

<pre class="codeblue"><code>// fib_fast.js — fast doubling (O(log n)), BigInt
function fibPair(n) {
  if (n === 0n) return [0n, 1n];
  const [a, b] = fibPair(n >> 1n);
  const c = a * (2n * b - a);      // F(2k)
  const d = a * a + b * b;         // F(2k+1)
  return (n & 1n) ? [d, c + d] : [c, d];
}
function fibFast(n) {
  n = BigInt(n);
  if (n < 0n) throw new Error("n trebuie să fie nenegativ");
  return fibPair(n)[0];
}</code></pre>

### 5.4. Variantă CLI (Node.js)

<pre class="codeblue"><code>// fib_cli.js — integrare CLI
"use strict";
const [,, arg] = process.argv;
if (arg === undefined) {
  console.error("Utilizare: node fib_cli.js <n>");
  process.exit(1);
}
try {
  const n = BigInt(arg);                 // permite n mare; respinge non-numerice
  if (n < 0n) throw new Error("n negativ");
  // Alegeți metoda în funcție de mărime
  const res = (n < 1_000n)
    ? (() => { let a=0n,b=1n; for (let i=0n;i<n;i++) [a,b]=[b,a+b]; return a; })()
    : fibFast(n);
  console.log(res.toString());
} catch (e) {
  console.error("Eroare: n trebuie să fie un întreg nenegativ (ex.: 10, 1000).");
  process.exit(1);
}</code></pre>

**Exemplu de rulare:**

<pre class="commandblack"><code>node fib_cli.js 1000
# → valoarea F(1000) ca BigInt (zeci de cifre)</code></pre>

## 6. Teorie vs practică — recomandări

- Pentru *prime*: preferați 5primeD (clar) sau 5primeE (ușor mai eficient). Pentru n foarte mari, considerați teste probabilistice (Miller–Rabin).
- Pentru *Fibonacci*: evitați recursia naivă; folosiți varianta **iterativă** sau **fast doubling** cu `BigInt`.
- Validați intrarea (CLI): mesaje de utilizare clare; `process.exit(1)` la erori.
- Nu amestecați `Number` cu `BigInt` în aceeași expresie; convertiți coerent tipurile.[^2]
- Node.js nu garantează optimizarea recursiei în coadă (TCO); evitați recursia profundă pe input mare.[^3]

## 7. Tabel comparativ — variante pentru primalitate

| Variantă | Descriere | Avantaje | Limitări | Complexitate (timp/memorie) |
|:---------|:----------|:---------|:---------|:-----------------------------|
| 5primeB.js | Gresit (return prea devreme) | Ușor de sesizat în lecții | Rezultat fals pozitiv | O(√n) / O(1) |
| 5primeC.js | Corect (buclă + `return` după buclă) | Claritate didactică | Ușor mai verbos | O(√n) / O(1) |
| 5primeD.js | Corect minimal ES6+ | Concis, limită calculată o dată | — | O(√n) / O(1) |
| 5primeE.js | Corect + optimizare impari | Mai puține iterații | Complexitate ușor crescută a codului | O(√n/2) / O(1) |
| 5primeF.js | One‑liner cu array | Expresiv, demonstrativ | Alocă array; overhead | O(√n) / O(√n) |

## 8. Exerciții pentru studenți

- Extindeți testul de primalitate pentru a respinge intrările non‑întregi și negative (mesaje clare).
- Implementați `fibMemo(n)` (memoizare) și comparați timpii cu `fibIter` și `fibFast`.
- Construiți `prime_cli.js` cu opțiunea `--list <N>` pentru a afișa toate numerele prime ≤ N (sita lui Eratostene, O(n log log n)).
- Scrieți teste automate (cu `node:test` + `assert`) pentru 5primeD/E și `fibFast`, incluzând cazuri‑limită și valori mari.

## 9. Concluzii

Am abordat cap‑coadă integrarea parametrilor de linie de comandă în Node.js, detecția numerelor prime (cu erori tipice și corecții), și calculul șirului Fibonacci prin metode adecvate scalării (iterativ și fast doubling), însoțite de considerații privind numericile (`Number` vs `BigInt`). Exemplele și exercițiile propuse conectează teoria cu practica reală în dezvoltarea de utilitare CLI robuste.

---

[^1]: `process.argv` (Node.js) expune argumentele CLI; `[2+]` reprezintă argumentele reale. Afișați mesaje de utilizare și cod de ieșire nenul la erori.

[^2]: În JavaScript nu se pot amesteca `Number` și `BigInt` în aceeași expresie; convertiți coerent tipurile.

[^3]: JavaScript (V8/Node) nu garantează optimizarea recursiei în coadă (TCO) — recursia adâncă poate depăși stiva.
