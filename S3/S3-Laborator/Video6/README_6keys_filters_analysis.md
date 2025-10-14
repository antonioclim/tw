# 6keys&filters (A–H): analiză tehnică și comentarii didactice

_Generat: 2025-10-13T14:40:44_

## Context
Setul **6keys&filtersA–H** ilustrează filtrarea tablourilor de **obiecte** în JavaScript/Node.js, folosind criterii date ca perechi `cheie: valoare` (și, în variante avansate, **predicate**). Sunt acoperite stiluri funcționale (cu `filter`+`every`), bucle explicite (pentru depănare), insensibilitate la majuscule pentru string‑uri, CLI minim, abordări defensive și formulări concis‑idiomatice.

### 6keys&filtersA.js
**Varianta A — filtru generic (egalitate strictă).** Predicat construit cu `Object.keys(...).every(...)`; soluție idiomatică, lizibilă.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.filter, Array.prototype.every, Object.keys, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `15`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersA.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersA — filtru generic: egalitate strictă pe fiecare cheie din criteriu.
 * T(n) = O(n * k), n = #obiecte, k = #chei; S(n) = O(1) adițional.
 */
const getFilteredObjects = (array, criteria) => {
  return array.filter((obj) =>
    Object.keys(criteria).every((k) => obj[k] === criteria[k])
  );
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

const result = getFilteredObjects(laptops, { processor: "i5", ram: 8 });
console.log("result:", result);
```

### 6keys&filtersB.js
**Varianta B — bucle explicite (didactic).** Echivalent logic cu A, utilă pentru *debugging* cu breakpoints și control fin.
**Stil & API‑uri:** funcții săgeată (ES6), Object.keys, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `20`, complexitate ciclomatică (aprox.) ≈ `5`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersB.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersB — bucle explicite (didactic).
 * Echivalent logic cu A, util pentru depănare cu breakpoints.
 */
const getFilteredObjects = (array, criteria) => {
  const out = [];
  for (const obj of array) {
    let ok = true;
    for (const k of Object.keys(criteria)) {
      if (obj[k] !== criteria[k]) { ok = false; break; }
    }
    if (ok) out.push(obj);
  }
  return out;
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
```

### 6keys&filtersC.js
**Varianta C — insensibil la majuscule pentru string‑uri.** Păstrează egalitatea strictă pentru non‑string.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.filter, Array.prototype.every, Object.keys, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `17`, complexitate ciclomatică (aprox.) ≈ `3`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersC.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersC — comparație insensibilă la majuscule pentru string‑uri.
 * Menține egalitatea strictă pentru tipurile non‑string.
 */
const eq = (a, b) => (typeof a === "string" && typeof b === "string")
  ? a.toLowerCase() === b.toLowerCase()
  : a === b;

const getFilteredObjects = (array, criteria) => {
  return array.filter((obj) =>
    Object.keys(criteria).every((k) => eq(obj[k], criteria[k]))
  );
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
```

### 6keys&filtersD.js
**Varianta D — criterii ca **valori** sau **predicat** (funcție).** Ex.: `{ ram: v => v >= 8, processor: "i5" }`.
**Stil & API‑uri:** funcții săgeată (ES6), funcții clasice (ES5), Array.prototype.filter, Object.keys, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `19`, complexitate ciclomatică (aprox.) ≈ `4`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersD.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersD — criterii ca valori sau funcții‑predicat.
 * Ex.: { ram: v => v >= 8, processor: "i5" }
 */
const match = (obj, criteria) => {
  for (const key of Object.keys(criteria)) {
    const expected = criteria[key];
    const actual = obj[key];
    const ok = (typeof expected === "function") ? expected(actual) : actual === expected;
    if (!ok) return false;
  }
  return true;
};

const getFilteredObjects = (array, criteria) => array.filter(o => match(o, criteria));

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: v => v >= 8 }));
```

### 6keys&filtersE.js
**Varianta E — CLI minimalist.** Construiește `criteria` din argumente `--brand=... --processor=... --ram=...`.
**Stil & API‑uri:** funcții săgeată (ES6), funcții clasice (ES5), Array.prototype.filter, Array.prototype.every, Object.keys, CLI Node.js, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `25`, complexitate ciclomatică (aprox.) ≈ `11`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersE.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersE — CLI minimalist: node "6keys&filtersE.js" --processor=i5 --ram=8 --brand=HP
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

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

const criteria = {};
if (args.brand) criteria.brand = args.brand;
if (args.processor) criteria.processor = args.processor;
if (args.ram && Number.isFinite(Number(args.ram))) criteria.ram = Number(args.ram);

const result = Object.keys(criteria).length
  ? laptops.filter((o) => Object.keys(criteria).every((k) => o[k] === criteria[k]))
  : laptops;

console.log("result:", result);
```

### 6keys&filtersF.js
**Varianta F — defensivă.** Respinge obiectele care **nu au** cheile din criteriu (`k in obj`) înainte de comparație.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.filter, Object.keys, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `19`, complexitate ciclomatică (aprox.) ≈ `4`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersF.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersF — defensiv: respinge obiectele fără cheile din criteriu.
 */
const getFilteredObjects = (array, criteria) => {
  return array.filter((obj) => {
    for (const k of Object.keys(criteria)) {
      if (!(k in obj)) return false;
      if (obj[k] !== criteria[k]) return false;
    }
    return true;
  });
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

const extended = laptops.concat([{ brand: "Other", cpu: "i5", memory: 8 }]);
console.log("result:", getFilteredObjects(extended, { processor: "i5", ram: 8 }));
```

### 6keys&filtersG.js
**Varianta G — stil funcțional cu `Object.entries`.** Precomputează perechile `[k,v]` și le verifică prin `every`.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.filter, Array.prototype.every, Object.entries, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `13`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersG.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersG — stil funcțional cu Object.entries(...).every(...).
 */
const getFilteredObjects = (array, criteria) => {
  const entries = Object.entries(criteria);
  return array.filter((obj) => entries.every(([k, v]) => obj[k] === v));
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
```

### 6keys&filtersH.js
**Varianta H — one‑liner concis.** Echivalent cu A, prezentat compact.
**Stil & API‑uri:** funcții săgeată (ES6), Array.prototype.filter, Array.prototype.every, Object.keys, "use strict".
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `11`, complexitate ciclomatică (aprox.) ≈ `1`.
**Complexitate asimptotică:** pentru `n` obiecte și `k` chei în criteriu, timpul este `O(n·k)`; spațiul suplimentar este `O(1)` (în afara rezultatului, care poate avea până la `n` elemente).
**Explicații pe cod (esențial):**
- `array.filter(...)` **nu modifică** tabloul sursă; construiește un **tablou nou** cu elementele care satisfac predicatul.
- `Object.keys(criteria).every(k => obj[k] === criteria[k])` verifică **conjunctiv** toate cheile: fiecare pereche cheie–valoare din criteriu trebuie satisfăcută.

**Rulare în Node.js:**
```bash
node 6keys&filtersH.js
```

**Cod sursă (extras):**
```javascript
"use strict";
/**
 * 6keys&filtersH — one‑liner concis.
 */
const getFilteredObjects = (array, criteria) =>
  array.filter((obj) => Object.keys(criteria).every((k) => obj[k] === criteria[k]));

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
```

---
## Discuție transversală
- **Expresiv vs. imperativ.** Variantele cu `filter(...every...)` declară *ce* condiție trebuie satisfăcută; buclele din B controlează *cum* se parcurge și se întrerupe (posibil mai clar în depanare).
- **Egalitate strictă și tipuri.** `===` evită coercițiile neașteptate; pentru stringuri insensibile la caz/diacritice, normalizați (variațiunea **J**).
- **Predicate în criteriu.** Varianta D arată cum extindem expresivitatea: fiecare valoare din criteriu poate fi fie o **valoare**, fie o **funcție** `expected(actual) → boolean`.
- **Complexitate.** Toate variantele corecte au timp `O(n·k)` (n = #obiecte, k = #chei verificate). Spațiul extra e `O(1)` în afara rezultatului (până la `n`).
- **Aplicații.** Filtrarea de colecții JSON (rezultate API), liste de produse/entități, pre‑filtrare în UI/ETL, validare rapidă prin predicate locale.
## Lansări rapide (toate scripturile)
```bash
for f in 6keys\&filters*.js; do echo "== $f =="; node "$f"; done
```

## Variațiuni didactice propuse (I–N)
- `6keys&filtersI_path.js` — **chei compuse** cu *dot‑path* (`"specs.cpu"`), prin helper `getByPath`.
- `6keys&filtersJ_locale.js` — **comparare insensibilă la majuscule** + **NFD** (eliminare diacritice) pentru limbile cu diacritice.
- `6keys&filtersK_in_or.js` — criterii cu **mulțimi**/`OR`: `{ brand: ["HP","Lenovo"], ram: v=>v>=8 }`.
- `6keys&filtersL_regex.js` — criterii cu **RegExp**: `{ brand: /^H.*/i }`.
- `6keys&filtersM.ts` — variantă **TypeScript** cu tipuri explicite pentru criterii.
- `6keys&filtersN_stream_ndjson.js` — procesare **NDJSON** (un obiect JSON pe linie) din fișier/STDIN, filtrare incrementală.

---
## Referințe (APA, ediția a 7‑a)
- Bray, T. (2017). The JavaScript Object Notation (JSON) Data Interchange Format (RFC 8259). RFC Editor. https://doi.org/10.17487/RFC8259
- Backus, J. (1978). Can programming be liberated from the von Neumann style? A functional style and its algebra of programs. *Communications of the ACM, 21*(8), 613–641. https://doi.org/10.1145/359576.359579
- Hughes, J. (1989). Why functional programming matters. *The Computer Journal, 32*(2), 98–107. https://doi.org/10.1093/comjnl/32.2.98
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT Press. https://doi.org/10.7551/mitpress/11838.001.0001
