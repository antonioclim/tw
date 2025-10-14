# 1wordsfilter (A–F): analiză tehnică și comentarii didactice

_Generat: 2025-10-13T09:56:57_

## Context
Setul de fișiere **A–F** ilustrează tehnici idiomatice de filtrare în JavaScript/Node.js asupra unui tablou de cuvinte, sub constrângeri simple (un **cuvânt interzis** și o **lungime minimă**). Scopul didactic este familiarizarea cu `Array.prototype.filter`, cu stilurile **ES6 (funcții săgeată)** și **ES5 (funcții clasice)**, cu ergonomia CLI și cu analiza complexității.

### 1wordsfilterB.js

**Variantă B.** Implementare „clară” cu predicate explicite într-o funcție săgeată; creează variabila `result` pentru lizibilitate, apoi o returnează.

**Stiluri și API-uri folosite:** use strict, arrow functions (ES6), Array.prototype.filter.

**Măsuri sumare:** linii de cod (excluzând comentarii/blank) ≈ `14`, complexitate ciclomatică aproximată ≈ `6`.

**Complexitate asimptotică:** timp `O(n)` (parcurgere liniară a celor `n` cuvinte), spațiu `O(n)` pentru rezultatul filtrat (cel mult `n`).

**Explicații pe cod (esențial):**
- `filter((word) => word !== forbiddenWord && word.length >= minLength)` păstrează exact cuvintele care **nu coincid** cu `forbiddenWord` și au **lungimea minimă** solicitată; `filter` nu modifică `words`, ci returnează un **tablou nou**.

**Rulare în Node.js:**
```bash
node 1wordsfilterB.js
```

**Utilitate aplicativă:** şablon de prelucrare text pentru filtrări de lexeme (de ex., eliminarea termenilor interzişi, prefiltrarea tokenilor pentru NLP, filtrarea listelor de taguri în UI).

**Observaţii didactice:** preferaţi `filter` pentru expresivitate; `for` este util când doriţi **control fin** (contorizări, întreruperi, profile de performanţă).


**Cod sursă (extras):**
```javascript
//Aici avem partea "lucrata"/functionala - sectiunea 1 a seminarului 3 (functii si array-uri)
// Parte prezentata in students.nextlab.tech
// Varianta B — variantă „inline” (fără helper), care face direct const result = words.filter(...); console.log(result)
"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

/**
 * Filtrare în doi pași: predicat cu if/return și returnarea lui `result`.
 */
const filterWords = (words, forbiddenWord, minLength) => {
  const result = words.filter((word) => {
    if (word !== forbiddenWord && word.length >= minLength) {
      return true;  // păstrăm elementul
    }
    return false;   // îl eliminăm (elementul)
  });
  return result;
};

console.log(filterWords(words, forbiddenWord, minLength));

// => [ 'wolf', 'snake', 'lion', 'horse' ]

// TRIVIA: Historically, the JS language was prototyped as Mocha and then LiveScript before being renamed JavaScript in 1995. 
// Those are historical names, not current synonyms. Still can be funny to say "Mocha" instead of "JavaScript" in a conversation.
// The name "JavaScript" was chosen for marketing reasons, to capitalize on the popularity of Java (JSE) at the time,
// even though the two languages are quite different in design and purpose.
// The language has evolved significantly since its inception, with major updates like ES6 (ECMAScript 2015) introducing many modern features.
// Today, JavaScript is a versatile language used for both client-side and server-side development, as well as in various frameworks and libraries.
```

### 1wordsfilterC.js

**Variantă C.** Formă concisă: funcție săgeată de o singură expresie, predicatul plasat direct în `filter`.

**Stiluri și API-uri folosite:** use strict, arrow functions (ES6), Array.prototype.filter.

**Măsuri sumare:** linii de cod (excluzând comentarii/blank) ≈ `7`, complexitate ciclomatică aproximată ≈ `2`.

**Complexitate asimptotică:** timp `O(n)` (parcurgere liniară a celor `n` cuvinte), spațiu `O(n)` pentru rezultatul filtrat (cel mult `n`).

**Explicații pe cod (esențial):**
- `filter((word) => word !== forbiddenWord && word.length >= minLength)` păstrează exact cuvintele care **nu coincid** cu `forbiddenWord` și au **lungimea minimă** solicitată; `filter` nu modifică `words`, ci returnează un **tablou nou**.

**Rulare în Node.js:**
```bash
node 1wordsfilterC.js
```

**Utilitate aplicativă:** şablon de prelucrare text pentru filtrări de lexeme (de ex., eliminarea termenilor interzişi, prefiltrarea tokenilor pentru NLP, filtrarea listelor de taguri în UI).

**Observaţii didactice:** preferaţi `filter` pentru expresivitate; `for` este util când doriţi **control fin** (contorizări, întreruperi, profile de performanţă).


**Cod sursă (extras):**
```javascript
//Varianta C — funcție săgeată concisă (o singură expresie)
// Sintaxa ES6 pentru funcții săgeată

"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

/**
 * o singură expresie; predicatul direct în filter.
 */
const filterWords = (words, forbiddenWord, minLength) =>
  words.filter((word) => word !== forbiddenWord && word.length >= minLength);

console.log(filterWords(words, forbiddenWord, minLength));

// => [ 'wolf', 'snake', 'lion', 'horse' ]
```

### 1wordsfilterD.js

**Variantă D.** Echivalentă logic cu C, dar utilizează **funcție clasică** (ES5) pentru `filterWords`. Utilă pentru a ilustra două stiluri sintactice.

**Stiluri și API-uri folosite:** use strict, arrow functions (ES6), traditional functions (ES5), Array.prototype.filter.

**Măsuri sumare:** linii de cod (excluzând comentarii/blank) ≈ `8`, complexitate ciclomatică aproximată ≈ `3`.

**Complexitate asimptotică:** timp `O(n)` (parcurgere liniară a celor `n` cuvinte), spațiu `O(n)` pentru rezultatul filtrat (cel mult `n`).

**Explicații pe cod (esențial):**
- `filter((word) => word !== forbiddenWord && word.length >= minLength)` păstrează exact cuvintele care **nu coincid** cu `forbiddenWord` și au **lungimea minimă** solicitată; `filter` nu modifică `words`, ci returnează un **tablou nou**.

**Rulare în Node.js:**
```bash
node 1wordsfilterD.js
```

**Utilitate aplicativă:** şablon de prelucrare text pentru filtrări de lexeme (de ex., eliminarea termenilor interzişi, prefiltrarea tokenilor pentru NLP, filtrarea listelor de taguri în UI).

**Observaţii didactice:** preferaţi `filter` pentru expresivitate; `for` este util când doriţi **control fin** (contorizări, întreruperi, profile de performanţă).


**Cod sursă (extras):**
```javascript
// Varianta D — seamana cu varianta C, dar folosind o funcție normală în loc de funcție săgeată
// Sintaxa ES5 pentru funcții normale
// Prima parte ramane la fel cu varianta C
"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

// Inlocuim constanta filterWords cu o functie normala filterWords

//DEL:  const filterWords = (words, forbiddenWord, minLength) =>
//DEL:    words.filter((word) => word !== forbiddenWord && word.length >= minLength);
// construim o functie filterWords care sa primeasca 3 parametrii: words, forbiddenWord, minLength
// si sa returneze un array cu cuvintele care nu sunt egale cu forbiddenWord si au lungimea mai mare sau egala cu minLength
function filterWords(words, forbiddenWord, minLength) {
  return words.filter((word) => word !== forbiddenWord && word.length >= minLength);
}

//Evident, apelam functia cu cei 3 parametri in final (la fel ca inainte)
console.log(filterWords(words, forbiddenWord, minLength));

// => [ 'wolf', 'snake', 'lion', 'horse' ]
```

### 1wordsfilterE.js

**Variantă E.** Elimină helper-ul și face totul *inline*; aceeași logică cu B, dar fără variabilă intermediară, destinată conciziei.

**Stiluri și API-uri folosite:** use strict, arrow functions (ES6), Array.prototype.filter.

**Măsuri sumare:** linii de cod (excluzând comentarii/blank) ≈ `6`, complexitate ciclomatică aproximată ≈ `2`.

**Complexitate asimptotică:** timp `O(n)` (parcurgere liniară a celor `n` cuvinte), spațiu `O(n)` pentru rezultatul filtrat (cel mult `n`).

**Explicații pe cod (esențial):**
- `filter((word) => word !== forbiddenWord && word.length >= minLength)` păstrează exact cuvintele care **nu coincid** cu `forbiddenWord` și au **lungimea minimă** solicitată; `filter` nu modifică `words`, ci returnează un **tablou nou**.

**Rulare în Node.js:**
```bash
node 1wordsfilterE.js
```

**Utilitate aplicativă:** şablon de prelucrare text pentru filtrări de lexeme (de ex., eliminarea termenilor interzişi, prefiltrarea tokenilor pentru NLP, filtrarea listelor de taguri în UI).

**Observaţii didactice:** preferaţi `filter` pentru expresivitate; `for` este util când doriţi **control fin** (contorizări, întreruperi, profile de performanţă).


**Cod sursă (extras):**
```javascript
// variatiune din B - Variantă E — inline (fără helper), exact ca porțiunea de final din fișier
// Sintaxa ES6 pentru funcții săgeată
// B ≡ E ca logică/rezultat; B e mai "verbos" pentru a explica, E e mai concis pentru producție.
"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

// direct mapăm predicatul în `filter` și afișăm
const result = words.filter((word) => word !== forbiddenWord && word.length >= minLength);
console.log(result);
// => [ 'wolf', 'snake', 'lion', 'horse' ]
```

### 1wordsfilterF.js

**Variantă F.** Introduce o **interfață CLI minimală** și o implementare cu **buclă `for`** (ES5), utilă pentru control explicit al fluxului și pentru scenarii fără `filter`.

**Stiluri și API-uri folosite:** arrow functions (ES6), traditional functions (ES5), Array.prototype.filter, Array.prototype.map, for-loop iteration.

**Măsuri sumare:** linii de cod (excluzând comentarii/blank) ≈ `15`, complexitate ciclomatică aproximată ≈ `12`.

**Complexitate asimptotică:** timp `O(n)` (parcurgere liniară a celor `n` cuvinte), spațiu `O(n)` pentru rezultatul filtrat (cel mult `n`).

**Explicații pe cod (esențial):**
- `filter((word) => word !== forbiddenWord && word.length >= minLength)` păstrează exact cuvintele care **nu coincid** cu `forbiddenWord` și au **lungimea minimă** solicitată; `filter` nu modifică `words`, ci returnează un **tablou nou**.
- `parseArgs` construiește o hartă simplă din argumentele CLI de forma `--cheie=valoare`; permite rulările reproduse mai jos.
- Implementarea cu `for` inițializează un rezultat gol și adaugă elementele care satisfac **predicatul conjunctiv** (condiții cu `&&`).

**Rulare în Node.js:**
```bash
node 1wordsfilterF.js
```

**Exemple CLI (comenzi compuse):**
```bash
node 1wordsfilterF.js --words="fox,wolf,snake,crocodile,lioness,lynx" --forbidden=crocodile --minLength=4
node 1wordsfilterF.js --words="FOX,Wolf,Snake" --forbidden=fox --minLength=3
```

**Utilitate aplicativă:** şablon de prelucrare text pentru filtrări de lexeme (de ex., eliminarea termenilor interzişi, prefiltrarea tokenilor pentru NLP, filtrarea listelor de taguri în UI).

**Observaţii didactice:** preferaţi `filter` pentru expresivitate; `for` este util când doriţi **control fin** (contorizări, întreruperi, profile de performanţă).


**Cod sursă (extras):**
```javascript
// Varianta clasica, folosind iteratii for
// Sintaxa ES5 pentru funcții normale
/**
 * Ce se vede în fișier:
 *   Un parseArgs minimalist (--words=... --forbidden=... --minLength=...);
 *   Un "constructor" words din argumente (sau fallback la lista implicită);
 *   Calculează result cu același predicat și îl afișează.
 */


function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const [k, v] = argv[i].split("=");
    if (k && k.startsWith("--")) args[k.slice(2)] = v ?? true;
  }
  return args;
}

const args = parseArgs(process.argv);
const words = (args.words ? String(args.words).split(",") :
  ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"]).map(s => s.trim());

const forbiddenWord = args.forbidden ?? "crocodile";
const minLength = Number.isFinite(Number(args.minLength)) ? Number(args.minLength) : 4;

const result = words.filter((word) => word !== forbiddenWord && word.length >= minLength);
console.log(result);


/**
 * Exemple de rulare:
 *   node script.js (implicit (folosește datasetul din fișier))
 *   node script.js --words="bear,ant,crocodile,lioness,lynx" --forbidden=crocodile --minLength=4
 */
```

### 1wordsfiltersA.js

**Rol didactic.** Schemă de lucru inițială / șablon: definește setul comun de date și parametrii și invită completarea predicatului `filter`.

**Stiluri și API-uri folosite:** arrow functions (ES6).

**Măsuri sumare:** linii de cod (excluzând comentarii/blank) ≈ `15`, complexitate ciclomatică aproximată ≈ `1`.

**Complexitate asimptotică:** timp `O(n)` (parcurgere liniară a celor `n` cuvinte), spațiu `O(n)` pentru rezultatul filtrat (cel mult `n`).

**Explicații pe cod (esențial):**
- `filter((word) => word !== forbiddenWord && word.length >= minLength)` păstrează exact cuvintele care **nu coincid** cu `forbiddenWord` și au **lungimea minimă** solicitată; `filter` nu modifică `words`, ci returnează un **tablou nou**.

**Rulare în Node.js:**
```bash
node 1wordsfiltersA.js
```

**Utilitate aplicativă:** şablon de prelucrare text pentru filtrări de lexeme (de ex., eliminarea termenilor interzişi, prefiltrarea tokenilor pentru NLP, filtrarea listelor de taguri în UI).

**Observaţii didactice:** preferaţi `filter` pentru expresivitate; `for` este util când doriţi **control fin** (contorizări, întreruperi, profile de performanţă).


**Cod sursă (extras):**
```javascript
//Aici avem partea de baza, de la care pornim sectiunea 1 a seminarului 3 (functii si array-uri)
// Parte prezentata in students.nextlab.tech
// Setul de date comun: un array de cuvinte ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"]
// Criterii comune: forbiddenWord = "crocodile", minLength = 4
// Cerinta: sa se scrie o functie care sa returneze un array nou, care sa contina: 
// doar cuvintele care nu sunt egale cu forbiddenWord si care au lungimea mai mare sau egala decat minLength
const words = [
  "fox",
  "wolf",
  "snake",
  "crocodile",
  "lion",
  "cat",
  "crocodile",
  "horse"
];

const forbiddenWord = "crocodile";
const minLength = 4;
/**
 * Păstrează doar cuvintele diferite de `forbiddenWord` și cu lungime ≥ `minLength`.
 * Notă: `filter` NU modifică `words`, ci creează un tablou nou (immutabil).
 */

const filterWords = (words, forbiddenWord, minLength) => {
   //pas 1:  filter parcurge fiecare word din words;
   //pas 2: Predicatul conjunctiv: (word !== forbiddenWord) și (word.length >= minLength);
   //ppas 3: Doar elementele pentru care predicatul este true rămân în rezultat; ordinea elementelor este păstrată.
};

console.log(filterWords(words, forbiddenWord, minLength));
```

---
## Discuție transversală
- **Expresivitate vs control.** `filter` evidențiază „*ce*” trebuie păstrat, nu „*cum*”; bucla `for` oferă control pentru profilare, contorizări, ieșire anticipată.
- **Corectitudine.** Predicatul este **conjunctiv**: ne dorim elementele pentru care **ambele** condiții sunt adevărate (`!==` și `length ≥`).
- **Stabilitate ordinii.** `filter` păstrează ordinea elementelor; rezultatul este un **subtablou**.
- **Imutabilitate.** `filter` nu modifică taboul sursă – proprietate utilă pentru programare funcțională și testare.
- **Testare minimă.** Cazuri de utilitate: listă vidă; `minLength` = 0; `forbiddenWord` absent; sensibilitate la majuscule/minuscule.

## Lansări rapide (toate scripturile)
```bash
# rulează pe rând fiecare variantă din director
for f in 1wordsfilter*.js; do echo "== $f =="; node "$f"; done
```

## Variațiuni didactice suplimentare (G–L)
Vom include implementări complementare: sensibilitate la majuscule/minuscule, normalizare Unicode, generalizare la **liste** de termeni interziși, variantă **CLI** mai bogată, **streaming** din fișier/STDIN și o versiune **TypeScript** tipizată.

---
## Addendum: Variațiuni didactice (G–L)

### 1wordsfilterG_ignoreCase.js
**Idee-cheie.** Normalizare Unicode (NFD) + eliminarea diacriticelor și comparare insensibilă la majuscule/minuscule.

### 1wordsfilterH_forbiddenSet.js
**Idee-cheie.** Generalizare la o **mulțime** de termeni interziși (Set), păstrând criteriul de lungime.

### 1wordsfilterI_stream.js
**Idee-cheie.** Procesare **streaming** din fișier sau STDIN; tokenizare tolerantă (whitespace/CSV) și emiterea rezultatului ca JSON.

### 1wordsfilterJ.ts
**Idee-cheie.** Tipuri explicite (TypeScript) pentru contracte clare: `string[] × string × number → string[]`.

### 1wordsfilterK_reduce.js
**Idee-cheie.** Folosirea `reduce` pentru a evita o trecere separată cu `filter` (deși tot un tablou rezultat este materializat).

### 1wordsfilterL_composition.js
**Idee-cheie.** Compunere funcțională: funcții mici `notEq`, `minLen`, combinate prin `and`.

**Complexitate.** Toate păstrează `O(n)` timp; spațiul este `O(n)` pentru rezultatul filtrat. Variantele I (streaming) mențin `O(1)` memorie suplimentară pentru citire incrementală.

---
## Referințe (APA, ediția a 7-a)

- Backus, J. (1978). Can programming be liberated from the von Neumann style? A functional style and its algebra of programs. *Communications of the ACM, 21*(8), 613–641. https://doi.org/10.1145/359576.359579
- Hughes, J. (1989). Why functional programming matters. *The Computer Journal, 32*(2), 98–107. https://doi.org/10.1093/comjnl/32.2.98
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT Press. https://doi.org/10.7551/mitpress/11838.001.0001
