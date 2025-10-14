# 2squareDim (A–E): analiză tehnică și comentarii didactice

_Generat: 2025-10-13T12:58:48_

## Context
Seria **2squareDim A–E** explorează calculul ariilor pătratelor dintr-o listă de laturi și, în unele variante, **suma** acestor arii. Se compară stiluri (funcțional vs. imperativ), API‑uri (`map`, `reduce`), igiena datelor și comportamentul pe cazuri‑limită.

---
### 2squareDimA.js

**Scop.** Listează **ariile** fiecărei laturi cu `map` (nu agregă). Rezultatul este un tablou de arii.


**Măsuri sumare.** LoC≈`8`, complexitate (aprox.)≈`1`, funcții detectate: getTotalArea.


**Rulare în Node.js.**
```bash
node 2squareDimA.js
```


**Fragment de cod.**
```javascript
/**
 * Varianta A — doar transformare cu `map` (listează ariile fiecărui pătrat).
 * Sintaxa ES6 pentru funcții săgeată
 */


const getTotalArea = (squareDimensions) => {
  return squareDimensions.map((side) => {
    return side * side;
  });
};

const squareDimensions = [3, 5, 12, 3, 5, 3];
const result = getTotalArea(squareDimensions);
console.log("result: ", result);


// => [ 9, 25, 144, 9, 25, 9 ]
```


**Complexitate.** Toate variantele: timp `O(n)`. Spațiu: `O(n)` pentru A (creează listă de arii), respectiv `O(n)` dacă `map` este materializat în B–D; `E` poate evita valori invalide și returnează `0` pe listă vidă.


**Utilitate aplicativă.** Pattern general pentru **agregări**: energie totală, costuri, pixeli, histogramare. Pe seturi mari, folosiți o singură trecere (`reduce`) sau streaming.

---
### 2squareDimB.js

**Scop.** `map` + `reduce` pentru **suma ariilor**; `reduce` primește valoare inițială `0` (sigur pe tablouri vide).


**Măsuri sumare.** LoC≈`12`, complexitate (aprox.)≈`1`, funcții detectate: getTotalArea.


**Rulare în Node.js.**
```bash
node 2squareDimB.js
```


**Fragment de cod.**
```javascript
/**
 * Varianta B — `map` + `reduce` (suma ariilor).
 * Sintaxa ES6 pentru funcții săgeată
 */


const getTotalArea = (squareDimensions) => {
  return squareDimensions
    .map((side) => {
      return side * side;
    })
    .reduce((prev, current) => {
      return prev + current;
    }, 0);
};

const squareDimensions = [3, 5, 12, 3, 5, 3];
const result = getTotalArea(squareDimensions);
console.log("result: ", result);


// => 221
```


**Complexitate.** Toate variantele: timp `O(n)`. Spațiu: `O(n)` pentru A (creează listă de arii), respectiv `O(n)` dacă `map` este materializat în B–D; `E` poate evita valori invalide și returnează `0` pe listă vidă.


**Utilitate aplicativă.** Pattern general pentru **agregări**: energie totală, costuri, pixeli, histogramare. Pe seturi mari, folosiți o singură trecere (`reduce`) sau streaming.

---
### 2squareDimC.js

**Scop.** Echivalent cu B dar în stil **concis** (funcții săgeată fără acolade, o singură expresie pe etapă).


**Măsuri sumare.** LoC≈`7`, complexitate (aprox.)≈`1`, funcții detectate: getTotalArea.


**Rulare în Node.js.**
```bash
node 2squareDimC.js
```


**Fragment de cod.**
```javascript
/**
 * Varianta C — concisă (arrow fără acolade).
 * Sintaxa ES6 pentru funcții săgeată
 */


const getTotalArea = (squareDimensions) =>
  squareDimensions
    .map((side) => side * side)
    .reduce((prev, current) => prev + current, 0);


const squareDimensions = [3, 5, 12, 3, 5, 3];
const result = getTotalArea(squareDimensions);
console.log("result: ", result);


// => 221
```


**Complexitate.** Toate variantele: timp `O(n)`. Spațiu: `O(n)` pentru A (creează listă de arii), respectiv `O(n)` dacă `map` este materializat în B–D; `E` poate evita valori invalide și returnează `0` pe listă vidă.


**Utilitate aplicativă.** Pattern general pentru **agregări**: energie totală, costuri, pixeli, histogramare. Pe seturi mari, folosiți o singură trecere (`reduce`) sau streaming.

---
### 2squareDimD.js

**Scop.** `reduce` **fără valoare inițială** (primul element devine acumulator). Didactic: arată capcana pentru tabloul vid (`TypeError`).


**Măsuri sumare.** LoC≈`7`, complexitate (aprox.)≈`1`, funcții detectate: getTotalArea.


**Rulare în Node.js.**
```bash
node 2squareDimD.js
```


**Fragment de cod.**
```javascript
/**
 * Varianta D — `reduce` fără valoare inițială (funcționează doar pe vector ne‑vid).
 * Sintaxa ES6 pentru funcții săgeată
 * Atenție: pe [] ar arunca eroare — în cod real preferați varianta cu „, 0”.
 * De exemplu, dacă inputul ar fi fost []
 *  const squareDimensions = [];
 * atunci ar fi apărut eroarea: TypeError: Reduce of empty array with no initial value
 * Dar cu , 0 adica reduce((prev, current) => prev + current, 0) ar fi returnat 0.
 */



const getTotalArea = (squareDimensions) =>
  squareDimensions
    .map((side) => side * side)
    .reduce((prev, current) => prev + current); // ideal ar tb. să fie , prev + current, 0 pt. cazul []

const squareDimensions = [3, 5, 12, 3, 5, 3];
const result = getTotalArea(squareDimensions);
console.log("result: ", result);


// => 221
```


**Complexitate.** Toate variantele: timp `O(n)`. Spațiu: `O(n)` pentru A (creează listă de arii), respectiv `O(n)` dacă `map` este materializat în B–D; `E` poate evita valori invalide și returnează `0` pe listă vidă.


**Utilitate aplicativă.** Pattern general pentru **agregări**: energie totală, costuri, pixeli, histogramare. Pe seturi mari, folosiți o singură trecere (`reduce`) sau streaming.

---
### 2squareDimE.js

**Scop.** **Igienă minimă a datelor** (convertiri, filtrare `NaN`/∞) și protecție la intrări goale (`0`).


**Măsuri sumare.** LoC≈`10`, complexitate (aprox.)≈`1`, funcții detectate: getTotalAreaSafe.


**Rulare în Node.js.**
```bash
node 2squareDimE.js
```


**Fragment de cod.**
```javascript
/**
 * Varianta E (opțional) — igienă minimă a datelor (convertire la număr + filtrare finite),
 * apoi `map` + `reduce`.
 * Exemple:
 *  - set curat:        [3, 5, 12, 3, 5, 3]         -> 221
 *  - set „murdar”:     [3, "5", 12, null, 3, 5, 3] -> 221 (null -> 0; totalul rămâne 221)
 * Acesta este o variantă robustă, care poate prelucra și date „murdare”!!!
 */
const getTotalAreaSafe = (squareDimensions) =>
  squareDimensions
    .map(Number)               // conversie numerică
    .filter(Number.isFinite)   // elimină NaN / ±Infinity (păstrează 0)
    .map((side) => side * side)
    .reduce((sum, a) => sum + a, 0);

// Demonstrație:
const clean = [3, 5, 12, 3, 5, 3];
const dirty = [3, "5", 12, null, 3, 5, 3];

console.log("result clean: ", getTotalAreaSafe(clean)); // 221
console.log("result dirty: ", getTotalAreaSafe(dirty)); // 221

// Exemplu cu set vid:
// console.log("result empty: ", getTotalAreaSafe([]));     // 0
```


**Complexitate.** Toate variantele: timp `O(n)`. Spațiu: `O(n)` pentru A (creează listă de arii), respectiv `O(n)` dacă `map` este materializat în B–D; `E` poate evita valori invalide și returnează `0` pe listă vidă.


**Utilitate aplicativă.** Pattern general pentru **agregări**: energie totală, costuri, pixeli, histogramare. Pe seturi mari, folosiți o singură trecere (`reduce`) sau streaming.

---
## Discuție transversală
- **Funcțional vs. imperativ.** `map→reduce` declară *ce* calculăm, în timp ce un `for` precizează *cum*. Ambele rămân `O(n)`.
- **Numerice.** Pătratul numerelor mari într‑un `double` poate produce erori de rotunjire; dacă domeniul e extrem, luați în calcul **BigInt** sau metode de sumare compensată.
- **Testare.** Acoperiți: lista vidă, valori nevalide, stringuri numerice, outliers.

## Lansare rapidă (toate variantele)
```bash
for f in 2squareDim*.js; do echo "== $f =="; node "$f"; done
```

---
## Referințe (APA, ediția a 7‑a)

- Dean, J., & Ghemawat, S. (2008). MapReduce: Simplified data processing on large clusters. *Communications of the ACM, 51*(1), 107–113. https://doi.org/10.1145/1327452.1327492
- IEEE. (2019). *IEEE Standard for Floating-Point Arithmetic (IEEE Std 754‑2019).* IEEE. https://doi.org/10.1109/IEEESTD.2019.8766229
- Goldberg, D. (1991). What every computer scientist should know about floating‑point arithmetic. *ACM Computing Surveys, 23*(1), 5–48. https://doi.org/10.1145/103162.103163
- Higham, N. J. (2002). *Accuracy and stability of numerical algorithms* (2nd ed.). SIAM. https://doi.org/10.1137/1.9780898718027
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT Press. https://doi.org/10.7551/mitpress/11838.001.0001
