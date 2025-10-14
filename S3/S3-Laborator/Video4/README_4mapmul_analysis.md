# 4mapmul (A–D): analiză tehnică și comentarii didactice

_Generat: 2025-10-13T13:44:07_

## Context
Aceste scripturi ilustrează folosirea lui `Array.prototype.map` pentru a **înmulți** fiecare element al unui tablou numeric cu un factor (implicit `2`), în mai multe stiluri (expresie concisă, funcție helper, variabilă intermediară, **CLI**). Setul este util pentru introducerea stilului funcțional, a imutabilității colecțiilor și a ergonomiei CLI în Node.js.

### 4mapmulA.js
**Varianta A — expresie concisă în `console.log`.** Demonstrează *arrow function* fără acolade (return **implicit**).
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `2`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** timp `O(n)` (o trecere peste cei `n` itemi), spațiu `O(n)` pentru rezultatul mapării.
**Explicații pe cod (esențial):**
- `map(f)` **nu modifică** tabloul sursă; construiește un **tablou nou** mapând fiecare element `x` la `f(x)`; ordinea elementelor se păstrează.
- Funcția de mapare `x => x * mul` este o **funcție pură** (nu are efecte secundare) — condiție recomandată pentru predictibilitate.

**Rulare în Node.js:**
```bash
node 4mapmulA.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta A — direct în `console.log`: sample.map(x => x * 2)
 * Exemplu simplu de funcție săgeată concisă.
 * Explicatie:
 *   - fără acolade, deci o singură expresie
 *   - valoarea expresiei este returnată implicit
 */

// "use strict";
const sample = [1, 2, 3, 4, 5];
console.log(sample.map((x) => x * 2));

// => [ 2, 4, 6, 8, 10 ]
```

### 4mapmulB.js
**Varianta B — funcție ajutătoare `double`.** Separă funcția de transformare de apel, crescând lizibilitatea și favorizând reutilizarea/testarea.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `3`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** timp `O(n)` (o trecere peste cei `n` itemi), spațiu `O(n)` pentru rezultatul mapării.
**Explicații pe cod (esențial):**
- `map(f)` **nu modifică** tabloul sursă; construiește un **tablou nou** mapând fiecare element `x` la `f(x)`; ordinea elementelor se păstrează.
- Funcția de mapare `x => x * mul` este o **funcție pură** (nu are efecte secundare) — condiție recomandată pentru predictibilitate.

**Rulare în Node.js:**
```bash
node 4mapmulB.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta B — funcție ajutătoare `double` și apoi `sample.map(double)`
 * (aceeași logică; dar ceva mai lizibil în demouri didactice)
 * Explicație:
 *   - funcția `double` primește un număr și returnează dublul său
 *   - `sample.map(double)` aplică funcția `double` fiecărui element din array
 *   - rezultatul este un nou array cu valorile dublate
 */


const sample = [1, 2, 3, 4, 5];
const double = (x) => { return x * 2; };
console.log(sample.map(double));


// => [ 2, 4, 6, 8, 10 ]
```

### 4mapmulC.js
**Varianta C — variabilă intermediară.** Reține rezultatul în `doubled` înainte de afișare — util în **debugging** și pentru pași suplimentari.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `3`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** timp `O(n)` (o trecere peste cei `n` itemi), spațiu `O(n)` pentru rezultatul mapării.
**Explicații pe cod (esențial):**
- `map(f)` **nu modifică** tabloul sursă; construiește un **tablou nou** mapând fiecare element `x` la `f(x)`; ordinea elementelor se păstrează.
- Funcția de mapare `x => x * mul` este o **funcție pură** (nu are efecte secundare) — condiție recomandată pentru predictibilitate.

**Rulare în Node.js:**
```bash
node 4mapmulC.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta C — map într-o variabilă intermediară, apoi afișare
 * (același efect, dar mai ușor de inspectat - debugging)
 * Explicație:
 *   - folosim `sample.map(...)` pentru a crea un nou array cu valorile dublate
 *   - rezultatul este stocat în variabila `doubled`
 *   - apoi afișăm conținutul lui `doubled`
 */


const sample = [1, 2, 3, 4, 5];
const doubled = sample.map((x) => x * 2);
console.log(doubled);

// => [ 2, 4, 6, 8, 10 ]
```

### 4mapmulD.js
**Varianta D — CLI parametric.** `parseArgs` → `--arr=...` și `--mul=...`; parsează lista (CSV), convertește la `Number`, filtrează non‑finite și aplică maparea.
**Stil & API‑uri:** funcții săgeată (ES6), funcții clasice (ES5), Array.prototype.map, iterație `for`, CLI Node.js.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `15`, complexitate ciclomatică (aprox.) ≈ `8`.
**Complexitate asimptotică:** timp `O(n)` (o trecere peste cei `n` itemi), spațiu `O(n)` pentru rezultatul mapării.
**Explicații pe cod (esențial):**
- `map(f)` **nu modifică** tabloul sursă; construiește un **tablou nou** mapând fiecare element `x` la `f(x)`; ordinea elementelor se păstrează.
- Funcția de mapare `x => x * mul` este o **funcție pură** (nu are efecte secundare) — condiție recomandată pentru predictibilitate.

**Rulare în Node.js:**
```bash
node 4mapmulD.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta D — CLI parametric - permite specificarea array-ului și a multiplicatorului din linia de comandă:
 *   node script.js --arr=1,2,3,4,5 --mul=2
 * Dacă nu se dau argumente, folosește [1,2,3,4,5] și multiplicatorul 2.
 * Explicație:
 *   - parseArgs: funcție care parsează argumentele din linia de comandă în obiect
 *   - arr: șir cu elementele separate prin virgulă, de exemplu "1,2,3,4,5" 
 * Utilitate practică: permite reutilizarea scriptului cu diferite seturi de date.
 *   - mul: multiplicatorul, de exemplu 2
 *   - se folosește map pentru a crea un nou array cu valorile înmulțite
 *   - rezultatul este afișat în consolă
 */
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const [k, v] = argv[i].split("=");
    if (k && k.startsWith("--")) args[k.slice(2)] = v ?? "";
  }
  return args;
}

const args = parseArgs(process.argv);
const arr = args.arr
  ? String(args.arr).split(",").map(s => Number(s.trim())).filter(Number.isFinite)
  : [1, 2, 3, 4, 5];

const mul = Number.isFinite(Number(args.mul)) ? Number(args.mul) : 2;

const out = arr.map(x => x * mul);
console.log(out);
```

---
## Discuție transversală
- **Stil funcțional vs imperativ.** `map` declară *ce* transformare aplicăm; bucla `for` detaliază *cum*. Pentru colecții mari, diferențele practice depind de runtime și JIT, dar ambele sunt `O(n)` în timp.
- **Imutabilitate.** Rezultatul `map` este un **nou tablou**, iar sursa rămâne neschimbată — proprietate esențială pentru compunerea pașilor de prelucrare și testare.
- **Tipuri numerice.** JavaScript folosește IEEE‑754 *double*; pentru integrale mari sau precizie fixă există `BigInt` — vezi variațiunea **G**.
- **Date mari.** Pentru fluxuri lungi, streaming/iterator poate reduce presiunea de memorie — vezi variațiunea **J** (iterator).
## Lansări rapide (toate scripturile)
```bash
for f in 4mapmul*.js; do echo "== $f =="; node "$f"; done
```

## Variațiuni didactice propuse (E–J)
- `4mapmulE_forLoop.js` — buclă **imperativă** (o singură trecere, `O(1)` extra).
- `4mapmulF_reduceMap.js` — **map cu `reduce`** (didactic; evită apelul `map`).
- `4mapmulG_bigint.js` — suport pentru **BigInt** (nu amestecați cu `Number`).
- `4mapmulH_typedArray.js` — **TypedArray** (`Float64Array`), util pentru procesări numerice dense.
- `4mapmulI_benchmark.js` — micro‑benchmark: `map` vs `for` vs `reduce`.
- `4mapmulJ_iterator.js` — **generator**/iterator care emite pe rând valorile înmulțite (memorie `O(1)`).

---
## Referințe (APA, ediția a 7‑a)
- Backus, J. (1978). Can programming be liberated from the von Neumann style? A functional style and its algebra of programs. *Communications of the ACM, 21*(8), 613–641. https://doi.org/10.1145/359576.359579
- Hutton, G. (1999). A tutorial on the universality and expressiveness of fold. *Journal of Functional Programming, 9*(4), 355–372. https://doi.org/10.1017/S0956796899003500
- IEEE. (2019). IEEE Standard for Floating‑Point Arithmetic (IEEE Std 754‑2019). https://doi.org/10.1109/IEEESTD.2019.8766229
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT Press. https://doi.org/10.7551/mitpress/11838.001.0001
