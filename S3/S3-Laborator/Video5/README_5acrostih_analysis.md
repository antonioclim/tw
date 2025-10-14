# 5acrostih (A–H): analiză tehnică și comentarii didactice

_Generat: 2025-10-13T14:11:20_

## Context
Acest set de scripturi demonstrează construirea unui **acrostih** (șir format din inițialele cuvintelor) în JavaScript/Node.js. Variantele arată stiluri expresive (`map`→`join`), **filtrare de stopwords**, tokenizare **din text liber** cu expresii regulate, **majuscule**, o **funcție pură** reutilizabilă și un mic **CLI**. Scopul didactic: practică pe procesare de șiruri, expresii regulate, imutabilitatea colecțiilor și ergonomia CLI.

### 5acrostihA.js
**Varianta A — pas‑cu‑pas (intermediar).** Expune vectorul cu inițiale și, opțional, concatenarea în șir — util didactic pentru a vedea etapele.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map, Array.prototype.join.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `5`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihA.js
```

**Cod sursă (extras):**
```javascript
/**
 * Acrostih: extrage prima literă din fiecare cuvânt și formează un nou șir.
 * Explicație:
 *   - folosim `map` pentru a extrage prima literă a fiecărui cuvânt
 *   - rezultatul este un array cu inițialele cuvintelor
 *   - folosim `join` pentru a concatena inițialele într-un singur șir
 * Poate fi util pentru a genera acronime sau coduri scurte (ca parte dintr-o aplicație mai mare):
 *   - generarea de coduri unice pentru elemente (ex: coduri de produse, etichete)
 *   - crearea de acronime pentru titluri sau denumiri lungi
 *   - generarea de identificatori (tip UUID) pentru utilizatori sau entități
 *   - in combinatie cu baze de date sau sisteme de autentificare
 */


const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];

// 1) map -> extragem prima literă a fiecărui cuvânt
const initialsArray = words.map((w) => w[0]);      // ["t","q","b","f","j","o","t","l","d"]
console.log(initialsArray);

// 2) (opțional) join -> un singur șir
const acrostic = initialsArray.join("");           // "tqbfjotld"
console.log(acrostic);

// => "tqbfjotld"
```

### 5acrostihB.js
**Varianta B — concisă (`map` + `join`).** Transformarea într‑un singur *pipeline* (mai succintă, aceeași complexitate).
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map, Array.prototype.join.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `3`, complexitate ciclomatică (aprox.) ≈ `2`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihB.js
```

**Cod sursă (extras):**
```javascript
/** Varianta B — concisă, cu `map` + `join`
* Deosebirile dintre 5acrostihA.js și 5acrostihB.js sunt minore,
* dar suficiente pentru a justifica existența ambelor variante în demo-uri didactice.
* Deosebiri:
*    1) în 5acrostihA.js se face pas‑cu‑pas (intermediar), iar aici totul într‑un singur pas
*    2) în 5acrostihA.js se afișează inițialele ca array, apoi ca șir; aici doar ca șir
* La ce ajută?
*    - arată flexibilitatea lui `map` și `join`
*    - arată că există mai multe moduri de a rezolva aceeași problemă
*/




const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];

const acrostic = words.map((w) => w[0]).join("");
console.log(acrostic); // "tqbfjotld"

// => "tqbfjotld"
```

### 5acrostihC.js
**Varianta C — inițiale majuscule.** Aplică `toUpperCase()` pe `w[0]` înainte de `join`.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map, Array.prototype.join.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `0`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihC.js
```

**Cod sursă (extras):**
```javascript
/** Varianta C — cu inițiale litere mari */

const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];

const acrosticUpper = words
  .map((w) => w[0].toUpperCase())
  .join("");
console.log(acrosticUpper); 


// => "TQBFJOTLD"
```

### 5acrostihD.js
**Varianta D — fără cuvinte de legătură.** Elimină *stopwords* cu un `Set` pentru căutare `O(1)` amortizat.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map, Array.prototype.filter, Array.prototype.join, Set (stopwords).
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `7`, complexitate ciclomatică (aprox.) ≈ `2`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihD.js
```

**Cod sursă (extras):**
```javascript
/** Varianta D — fără cuvinte de legătură 
 *  Poate fi util pentru acronime (ex. NATO, UNESCO, etc.)
 *  Pot fi extinse cu alte cuvinte de legătură (ex. în, și, cu, de, la, pe, pentru, etc.)
 *  Sau chiar cu semne de punctuație (ex. ,, ., !, ?, ;, :, -, _, etc.)
*/



const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
const stopwords = new Set(["the","a","an"]);

const acrosticNoStops = words
  .filter((w) => !stopwords.has(w.toLowerCase()))
  .map((w) => w[0])
  .join("");

console.log(acrosticNoStops); 
// =>  "qbfjotld"
```

### 5acrostihE.js
**Varianta E — din text liber.** Tokenizare cu regex `split(/[^A-Za-z]+/)`; îndepărtează tokenii goi şi mizează pe litere ASCII.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map, Array.prototype.filter, Array.prototype.join.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `7`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihE.js
```

**Cod sursă (extras):**
```javascript
// Varianta E se deosebeste de D prin faptul ca extrage cuvintele dintr-un text liber, nu dintr-un array predefinit
/** Varianta E — din text liber, fără cuvinte de legătură
 * Explicație:
 *   - /[^A-Za-z]+/: expresie regulată care găsește orice secvență de caractere care nu sunt litere
 */

const raw = "the quick brown fox, jumps over the 33 lazy dogs";
const words = raw
  .split(/[^A-Za-z]+/)           // separăm prin orice nu‑e literă
  .map((w) => w.trim())
  .filter((w) => w.length > 0);

const acrostic = words.map((w) => w[0]).join("");
console.log(acrostic); 

// => "tqbfjotld"
```

### 5acrostihF.js
**Varianta F — funcție pură.** `acrosticFromWords(words)` separă clar calculul de IO — ideal pentru testare.
**Stil & API‑uri:** funcții săgeată (ES6), funcții clasice (ES5), Array.prototype.map, Array.prototype.join.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `5`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihF.js
```

**Cod sursă (extras):**
```javascript
/**
 * Funcție pură: primește o listă de cuvinte și întoarce acrostihul.
 */
function acrosticFromWords(words) {
  return words.map((w) => w[0]).join("");
}

const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
console.log(acrosticFromWords(words));

// => "tqbfjotld"
```

### 5acrostihG.js
**Varianta G — CLI.** Parametri: `--text="..."` sau `--words="a,b,c"`; parsează intrarea şi calculează acrostihul.
**Stil & API‑uri:** funcții săgeată (ES6), funcții clasice (ES5), Array.prototype.map, Array.prototype.filter, Array.prototype.join, CLI Node.js.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `25`, complexitate ciclomatică (aprox.) ≈ `8`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihG.js
```

**Cod sursă (extras):**
```javascript
/**
 * Utilizare:
 *   node 5acrostihG.js --text="the quick brown fox jumps over the lazy dog"
 *   node 5acrostihG.js --words="the,quick,brown,fox,jumps,over,the,lazy,dog"
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

let words = [];
if (args.text) {
  words = String(args.text)
    .split(/[^A-Za-z]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
} else if (args.words) {
  words = String(args.words)
    .split(",")
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
} else {
  // fallback (exemplul canonic)
  words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
}

const acrostic = words.map((w) => w[0]).join("");
console.log(acrostic);
```

### 5acrostihH.js
**Varianta H — minimală (2 linii).** Evidenţiază expresivitatea `map`→`join` (didactic).
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.map, Array.prototype.join.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `2`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru un text de lungime `T` și `n` cuvinte, extragerea inițialelor este `O(T)` pentru tokenizare (sau `O(n)` dacă tabloul de cuvinte e deja dat) și `O(n)` pentru mapare/join; spațiu `O(n)` pentru rezultatul acrostihului.
**Explicații pe cod (esențial):**
- `map(w => w[0])` extrage **prima literă** din fiecare cuvânt; `join("")` concatenează într‑un singur șir.
- `filter` se folosește fie pentru a elimina cuvinte de legătură (*stopwords*), fie pentru a curăța tokeni goi după `split`.

**Rulare în Node.js:**
```bash
node 5acrostihH.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta H — doar din doua linii de cod
 * Funcție care primește un array de cuvinte și returnează acronimul    
 * Explicație:
 *   - `words.map((w) => w[0])`: creează un nou array cu prima literă din fiecare cuvânt
 *   - `.join("")`: unește literele într-un singur șir, fără spații între ele
 */

const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
console.log(words.map((w) => w[0]).join("")); 

// => "tqbfjotld"
```

---
## Discuție transversală
- **Tokenizare.** `split(/[^A-Za-z]+/)` este un model simplu pentru ASCII; pentru suport internațional (diacritice), preferați **Unicode property escapes** (vezi variațiunea I).
- **Stopwords.** `Set` oferă test de apartenență eficient; *normalizarea* (`toLowerCase`, NFD/diacritice) este utilă în limbi cu diacritice (vezi variațiunea J).
- **Imutabilitate.** `map`/`filter` creează tablouri noi (nu modifică sursa) — ușurează testarea și compoziția pașilor.
- **Complexitate.** Tokenizarea este `O(T)`; construirea acrostihului este `O(n)`. Consum de memorie `O(n)` pentru tokeni și rezultat. Pentru texte foarte mari, luați în calcul **iteratoare/streaming** (vezi variațiunea L).
## Lansări rapide (toate scripturile)
```bash
for f in 5acrostih*.js; do echo "== $f =="; node "$f"; done
```

## Variațiuni didactice propuse (I–N)
- `5acrostihI_unicode.js` — **tokenizare Unicode** cu `\p{L}+` (diacritice) și opțiune pentru `toUpperCase`.
- `5acrostihJ_stopwords_locale.js` — **stopwords** parametrizabil, cu **normalizare NFD** (înlăturarea diacriticelor) și `toLowerCase`.
- `5acrostihK_module.mjs` — modul ES (`export`) cu funcții reutilizabile și exemplu minimal de test cu `node:test`.
- `5acrostihL_stream.js` — **streaming** din fișier/STDIN (iterator asincron), memorie `O(1)` extra.
- `5acrostihM_telestich.js` — „**telestih**” (ultima literă a fiecărui cuvânt) și opțional „mesostih” (literă interioară).
- `5acrostihN_detect.js` — verifică dacă textul/șirul de cuvinte **encodează** un acrostih dat (`--target=...`).

---
## Referințe (APA, ediția a 7‑a)
- Thompson, K. (1968). Regular expression search algorithm. *Communications of the ACM, 11*(6), 419–422. https://doi.org/10.1145/363347.363387
- Knuth, D. E., Morris, J. H., & Pratt, V. R. (1977). Fast pattern matching in strings. *SIAM Journal on Computing, 6*(2), 323–350. https://doi.org/10.1137/0206024
- Aho, A. V., & Corasick, M. J. (1975). Efficient string matching: An aid to bibliographic search. *Communications of the ACM, 18*(6), 333–340. https://doi.org/10.1145/360825.360855
- Yergeau, F. (2003). UTF-8, a transformation format of ISO 10646 (RFC 3629). RFC Editor. https://doi.org/10.17487/RFC3629
- Bray, T. (2017). The JavaScript Object Notation (JSON) Data Interchange Format (RFC 8259). RFC Editor. https://doi.org/10.17487/RFC8259
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT Press. https://doi.org/10.7551/mitpress/11838.001.0001
