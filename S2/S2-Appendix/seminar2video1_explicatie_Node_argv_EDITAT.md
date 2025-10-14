<style>
/* Stiluri de conformitate (vor fi respectate de majoritatea randărilor Markdown care permit HTML inline) */
:root { --indent: 0.63cm; }
body, * { font-family: "Times New Roman", Times, serif; font-size: 11pt; line-height: 1.0; color: #000; }
p, ul, ol, li { margin-top: 0; margin-bottom: 0; }
h1, h2, h3 { color: #000; background: #fff; margin-top: 0.4em; margin-bottom: 0.2em; }
pre, code { font-family: "Times New Roman", Times, serif; font-size: 11pt; }
pre.codeblue { background: #DDEBF7; color: #000; padding: 3pt 4pt; margin-left: var(--indent); page-break-inside: avoid; white-space: pre; }
pre.commandblack { background: #000000; color: #ffffff; padding: 3pt 4pt; margin-left: var(--indent); page-break-inside: avoid; white-space: pre; }
table { border-collapse: collapse; margin-left: 0; }
th, td { border: 0.5pt solid #666; text-align: left; vertical-align: top; padding: 2pt 4pt; }
th { font-weight: 700; }
</style>

# Explicații detaliate — 4 faze ale codului (Node.js)
„sayHello” și `process.argv` — ghid pentru studenți

## 1. Context general (ideea exercițiului)

Scopul este să definim o funcție `sayHello(name)` care întoarce un mesaj de salut și să alimentăm funcția cu argumente din linia de comandă (CLI), folosind Node.js. În timp ce codul evoluează prin 4 faze, observăm cum trecem de la o funcție goală, la o funcție corectă și cum incorporăm corect argumentele din linia de comandă.

## 2. Fundamente: ce este `process.argv`

În Node.js, variabila globală `process` descrie procesul curent (instanța programului). Proprietatea `process.argv` conține lista (array) de argumente cu care a fost lansat programul.[^1]

<pre class="codeblue"><code>
[
  'C:\\Program Files\\nodejs\\node.exe',  // [0] executabilul Node
  'Z:\\tw\\SxTEST\\FAZA1\\src\\hello.js', // [1] calea către scriptul tău
  'arg1', // [2] primul argument real introdus de utilizator
  'arg2', // [3] al doilea argument real
  // ... etc.
]
</code></pre>

De aceea, **`process.argv[2]`** este primul argument util. Pentru toate cuvintele introduse după script, folosiți `process.argv.slice(2)`; iar pentru un singur șir cu spații între cuvinte, adăugați `.join(" ")`.

## 3. Faza 1

**Cod inițial:**

<pre class="codeblue"><code>
let sayHello = function (name) {

}
</code></pre>

**Explicație:** A fost definită o function expression, dar corpul este gol — apelul ar întoarce `undefined`. Nu există nici `console.log`.

**Versiune minimă corectată pentru test intern:**

<pre class="codeblue"><code>
let sayHello = function (name) {
  return `Hello, ${name}!`;
};

console.log(sayHello("world")); // probă locală
</code></pre>

## 4. Faza 2

**Cod dat:**

<pre class="codeblue"><code>
let sayHello => (name) {
return `Hello, ${name}!`;
}

console.log(sayHello(process.argv[0]));
</code></pre>

**Probleme:** (1) Sintaxa arrow function este greșită; (2) `process.argv[0]` indică executabilul Node, nu argumentul utilizatorului.

**Corectare minimă:**

<pre class="codeblue"><code>
let sayHello = (name) => {
  return `Hello, ${name}!`;
};

console.log(sayHello(process.argv[2]));
</code></pre>

**Exemplu de rulare:**

<pre class="commandblack"><code>
node hello.js Ana
# → Hello, Ana!
</code></pre>

## 5. Faza 3

**Cod dat:**

<pre class="codeblue"><code>
let sayHello = (name) => `Hello, ${name}!`;

console.log(sayHello(process.argv[0]));
</code></pre>

**Ce s-a îmbunătățit:** formă concisă (implicit return). **Ce rămâne greșit:** încă se folosește `process.argv[0]`.

**Corectare:**

<pre class="codeblue"><code>
let sayHello = (name) => `Hello, ${name}!`;

console.log(sayHello(process.argv[2]));
</code></pre>

**Exemplu:**

<pre class="commandblack"><code>
node hello.js Maria
# → Hello, Maria!
</code></pre>

## 6. Faza 4

**Cod dat (final):**

<pre class="codeblue"><code>
let sayHello = (name) => `Hello, ${name}!`;

console.log(sayHello(process.argv.slice(2).join(" ")));
</code></pre>

**Exemple:**

<pre class="commandblack"><code>
node hello.js Ana
# → Hello, Ana!
</code></pre>

<pre class="commandblack"><code>
node hello.js Ana Maria
# → Hello, Ana Maria!
</code></pre>

<pre class="commandblack"><code>
node hello.js buna dimineata tuturor
# → Hello, buna dimineata tuturor!
</code></pre>

**Îmbunătățire recomandată (fallback implicit):**

<pre class="codeblue"><code>
let sayHello = (name) => `Hello, ${name || "world"}!`;

console.log(sayHello(process.argv.slice(2).join(" ")));
</code></pre>

## 7. Sinteză conceptuală (pe scurt)

- Function expression vs. function declaration; **arrow functions** (corp bloc vs. formă concisă).
- Template literals și interpolare: `` `Hello, ${name}!` ``.
- `process.argv`: `[0]` executabilul Node, `[1]` scriptul, `[2+]` argumentele reale.
- Pentru un singur cuvânt: `process.argv[2]`. Pentru mai multe cuvinte: `process.argv.slice(2).join(" ")`.

## 8. Erori tipice și cum le eviți

- Sintaxa greșită pentru arrow function: `let f => (x) { ... }` — corect: `let f = (x) => { ... }` sau `let f = (x) => expresie;`.
- Index nepotrivit: folosirea `process.argv[0]` în loc de `process.argv[2]` sau `slice(2)`.
- Uitarea `return` atunci când corpul arrow function are acolade.
- Fișiere nesalvate/zero bytes în editor — verificați mereu salvarea.

## 9. Bune practici

- Folosește `console.log` pentru a inspecta rapid `process.argv` când depanezi.
- Adaugă un comportament implicit (`name || "world"`) pentru robustețe.
- Păstrează lizibilitatea: nume explicite (`sayHello`), structură concisă.
- Menține consistența: alege un stil și aplică-l corect (arrow function sau function expression).

## 10. Tabel comparativ (evoluția pe faze)

| Fază | Cod (rezumat) | Problemă principală | Corectare / efect |
|:-----|:--------------|:---------------------|:------------------|
| Faza 1 | funcție goală | nu există `return` / nici afișare | adăugăm `return` și un `console.log` de test |
| Faza 2 | arrow function (greșită) + argv[0] | sintaxă incorectă + index greșit | corectăm sintaxa; folosim `argv[2]` |
| Faza 3 | arrow concisă + argv[0] | index greșit (calea Node) | folosim `argv[2]` (primul argument real) |
| Faza 4 | arrow concisă + slice(2).join(" ") | — | gestionăm mai multe cuvinte; opțional fallback `world` |

## 11. Versiune finală robustă (2 linii)

<pre class="codeblue"><code>
let sayHello = (name) => `Hello, ${name || "world"}!`;
console.log(sayHello(process.argv.slice(2).join(" ")));
</code></pre>

## 12. Teste rapide

<pre class="commandblack"><code>
node hello.js
# Hello, world!
</code></pre>

<pre class="commandblack"><code>
node hello.js Ana
# Hello, Ana!
</code></pre>

<pre class="commandblack"><code>
node hello.js Ana Maria
# Hello, Ana Maria!
</code></pre>

## 13. Exerciții sugerate pentru studenți

- Modificați scriptul astfel încât `--uppercase` să afișeze mesajul cu litere mari (ex.: `HELLO, ANA MARIA!`).
- Adăugați o opțiune `--prefix "Salut"` pentru a personaliza cuvântul de început (`Salut, Ana!`).
- Gestionați cazurile fără argumente, afișând un mesaj de utilizare (`Usage: node hello.js <nume...>`).
- Experimentați cu `process.argv` afișând toate elementele și observând indexarea pe diverse platforme (Windows/macOS/Linux).

---

[^1]: `process.argv` este specific **Node.js** (nu face parte din standardul ECMAScript) și este disponibil doar în aplicații rulate în runtime-ul Node.
