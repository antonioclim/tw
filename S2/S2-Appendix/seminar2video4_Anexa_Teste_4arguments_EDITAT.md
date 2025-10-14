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

# Anexă — Teste automate pentru intercalarea a două (și N) array‑uri
„Introducere în JS” — VIDEO 4

## 1. Scopul anexei și acoperirea testelor

Această anexă oferă o baterie de **teste automatizate** ce pot fi rulate local cu runner‑ul integrat din Node.js (`node:test`). Testele acoperă: (i) cazuri pozitive (lungimi egale; elemente string/number), (ii) cazuri‑limită (array‑uri goale), (iii) validări de intrare (non‑array → `TypeError`), (iv) **politici diferite** pentru nepotriviri de lungime (returnare `-1` vs **aruncare** de eroare) și (v) **generalizarea** pentru **N** array‑uri (`interleaveN`).

## 2. Instrucțiuni de rulare

- Asigurați‑vă că aveți **Node.js v18+** (ideal v20+):

<pre class="commandblack"><code>node --version</code></pre>

- Descărcați arhiva ZIP, dezarhivați într‑un folder local.

- În terminal, navigați în folder și rulați suita de teste:

<pre class="commandblack"><code>node --test</code></pre>

<pre class="commandblack"><code>node --test interleave.test.js   # rulează doar fișierul de test</code></pre>

<pre class="commandblack"><code>npm test                         # dacă există script aferent în package.json</code></pre>

## 3. Fișiere incluse

| Fișier | Conținut |
|:-------|:---------|
| interleave.js | implementări: imperativ, funcțional, strict, generalizare la N |
| interleave.test.js | bateria de teste `node:test` + `assert` |
| package.json | script convenabil de test (opțional) |
| README_TESTE.md | instrucțiuni rapide, observații |

## 4. Implementări ilustrative (`interleave.js`)

<pre class="codeblue"><code>// interleave.js — variante ilustrative
function assertIsArray(a, name) {
  if (!Array.isArray(a)) throw new TypeError(`${name} trebuie să fie array`);
}

// 1) Varianta „imperativă” (2 array‑uri), politică LOOSENED: întoarce -1 la lungimi diferite
function interleaveLoose(a, b) {
  assertIsArray(a, 'a'); assertIsArray(b, 'b');
  if (a.length !== b.length) return -1;
  const out = [];
  for (let i = 0; i < a.length; i++) {
    out.push(a[i], b[i]);
  }
  return out;
}

// 2) Varianta STRICTĂ: aruncă eroare la lungimi diferite
function interleaveStrict(a, b) {
  assertIsArray(a, 'a'); assertIsArray(b, 'b');
  if (a.length !== b.length) {
    throw new Error('Lungimi diferite');
  }
  return a.flatMap((x, i) => [x, b[i]]);
}

// 3) Generalizare la N array‑uri (STRICTĂ): toate lungimi identice
function interleaveN(...arrays) {
  if (arrays.length === 0) return [];
  const lens = arrays.map(a => {
    assertIsArray(a, 'argument');
    return a.length;
  });
  if (!lens.every(L => L === lens[0])) {
    throw new Error('Toate array‑urile trebuie să aibă aceeași lungime');
  }
  const n = lens[0];
  const out = [];
  for (let i = 0; i < n; i++) {
    for (const arr of arrays) out.push(arr[i]);
  }
  return out;
}

module.exports = { interleaveLoose, interleaveStrict, interleaveN };</code></pre>

## 5. Fragment din test (`interleave.test.js`)

<pre class="codeblue"><code>// interleave.test.js — fragment ilustrativ
const assert = require('assert');
const { test, describe } = require('node:test');
const { interleaveLoose, interleaveStrict, interleaveN } = require('./interleave');

describe('interleaveStrict (aruncă la lungimi diferite)', () => {
  test('basic', () => {
    assert.deepStrictEqual(interleaveStrict([1,2], [3,4]), [1,3,2,4]);
  });
  test('mismatch -> Error', () => {
    assert.throws(() => interleaveStrict([1,2], [3]), /Lungimi diferite/);
  });
});

describe('interleaveLoose (–1 la lungimi diferite)', () => {
  test('arrayuri egale', () => {
    assert.deepStrictEqual(interleaveLoose(['a','b'], ['x','y']), ['a','x','b','y']);
  });
  test('mismatch -> –1', () => {
    assert.strictEqual(interleaveLoose([1], [2,3]), -1);
  });
});

describe('interleaveN (generalizare la N array‑uri)', () => {
  test('3 array‑uri (lungimi egale)', () => {
    assert.deepStrictEqual(interleaveN([1,2], ['a','b'], [true,false]), [1,'a',true, 2,'b',false]);
  });
});</code></pre>

## 6. Politici la nepotriviri de lungime

| API | Politică | Observații |
|:----|:---------|:-----------|
| interleaveLoose(a, b) | returnează `-1` | Validări tip pentru non‑array, returnează –1 dacă `a.length !== b.length` |
| interleaveStrict(a, b) | aruncă `Error` | Validări tip și mesaj explicit „Lungimi diferite” |
| interleaveN(...arrays) | aruncă `Error` | Toate array‑urile trebuie să aibă aceeași lungime |

## 7. Checklist de acoperire

- Testați cu elemente de tip diferit (numere, șiruri, booleeni).
- Adăugați cazuri cu array‑uri goale (a=[], b=[]).
- Verificați că non‑array (ex.: `interleaveLoose(3, [])`) aruncă `TypeError`.
- Pentru `interleaveN`, testați 2, 3 și 4 array‑uri cu aceeași lungime.
- Introduceți și cazuri negative la `interleaveN` (lungimi diferite).

## 8. Observații finale

Păstrați aceeași **politică** în toată aplicația și documentați‑o clar în README și în capul fișierelor de test. Recomandăm, în scop didactic, menținerea ambelor variante (Loose/Strict) pentru a evidenția diferența de design API.

---

[^1]: Modulele de testare `node:test` și `assert` sunt disponibile nativ în Node.js v18+; nu necesită instalare separată.

[^2]: Exemplul de test pentru `interleaveStrict` este prelucrat conform anexei originale; păstrați mesajul de eroare pentru a potrivi expresia regulată.

[^3]: În proiecte reale, documentați clar politica la nepotriviri (–1 vs Error) și păstrați-o consecventă în API și în teste.
