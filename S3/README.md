# 📘 S3 — Pattern-uri Funcționale Practice în Node.js

> **Seminar S3** | Curs de Tehnologii Web | ASE-CSIE  
> Funcții și Array-uri în JavaScript: Filter, Map, Reduce și Prelucrare Funcțională a Datelor

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S3-Teorie](#s3-teorie)
  - [S3-Laborator](#s3-laborator)
  - [S3-Appendix](#s3-appendix)
- [Cele 6 module de laborator](#-cele-6-module-de-laborator)
- [Concepte cheie](#-concepte-cheie)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Exerciții propuse](#-exerciții-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S3 consolidează **pattern-urile de prelucrare funcțională** în JavaScript/Node.js, aprofundând conceptele introduse în S2. Accentul este pus pe:

- **Transformări expresive** cu `map`, `filter`, `reduce`
- **Expresii regulate** și procesarea textului cu suport Unicode
- **Prelucrare robustă** a datelor (validare, normalizare, internațional­izare)
- **Utilitare CLI** reproductibile și testabile

### Ce vei învăța:

| Concept | Descriere |
|---------|-----------|
| **Filtrare avansată** | Predicate complexe, criterii multiple, sensibilitate la caz |
| **Pipeline-uri map→reduce** | Single-pass vs. multi-pass, optimizări de memorie |
| **Formatare șiruri** | Placeholder substitution, regex, `Intl.*` pentru numere/date |
| **Procesare Unicode** | `\p{L}+`, normalizare NFD, comparații locale-aware |
| **Filtrare obiecte** | Criterii pe chei, dot-path, predicate funcționale |
| **Streaming** | Procesare linie-cu-linie pentru fișiere mari |

---

## 📁 Structura repository-ului

```
S3/
├── 📂 S3-Teorie/                                    # Materialul teoretic principal
│   └── 📄 S2verA (teorie) Funcții și array-uri...pdf    # PDF: Filter, Map, Reduce
│
├── 📂 S3-Laborator/                                 # Scripturi și fișe de laborator
│   ├── 📄 S2verB...pdf                                  # PDF laborator (varianta simplificată)
│   ├── 📄 S2verC...pdf                                  # PDF laborator (varianta completă)
│   ├── 📦 Scripts.zip                                   # Arhivă cu toate scripturile
│   │
│   ├── 📂 Video1/ — Filtrare cuvinte (6 variante)
│   │   ├── 1wordsfiltersA.js → 1wordsfilterF.js
│   │   ├── 1wordsfilter (A–F)_analysis.html
│   │   ├── README_1wordsfilter.md
│   │   └── Laborator_Filtrare_Cuvinte_Unicode.docx
│   │
│   ├── 📂 Video2/ — Arii pătrate (5 variante)
│   │   ├── 2squareDimA.js → 2squareDimE.js
│   │   ├── 2squareDim_analysis.html
│   │   ├── README_2squareDim_analysis.md
│   │   └── 2squareDim_version_forBigData.zip
│   │
│   ├── 📂 Video3/ — Formatter șiruri (6 variante)
│   │   ├── 3formatterA.js → 3formatterF.js
│   │   ├── 3formatter_analysis.html
│   │   ├── README_3formatter_analysis.md
│   │   └── Laborator_Formatter_Regex_Escapari_Intl.docx
│   │
│   ├── 📂 Video4/ — Map × Multiply (4 variante)
│   │   ├── 4mapmulA.js → 4mapmulD.js
│   │   ├── 4mapmul_analysis.html
│   │   ├── README_4mapmul_analysis.md
│   │   └── Laborator_Map_Filter_Reduce_TypedArray_BigInt.docx
│   │
│   ├── 📂 Video5/ — Acrostih (8 variante)
│   │   ├── 5acrostihA.js → 5acrostihH.js
│   │   ├── 5acrostih_analysis.html
│   │   ├── README_5acrostih_analysis.md
│   │   └── Laborator_Acrostih_Unicode_Streaming.docx
│   │
│   └── 📂 Video6/ — Filtrare obiecte (8 variante)
│       ├── 6keys&filtersA.js → 6keys&filtersH.js
│       ├── 6keys_filters_analysis.html
│       ├── README_6keys_filters_analysis.md
│       └── Laborator_Keys_Filters_Predicate_Path_Unicode_NDJSON.docx
│
└── 📂 S3-Appendix/                                  # Materiale suplimentare
    ├── 📄 APPENDIX 1 - Ce este „use strict"...pdf       # Explicație detaliată strict mode
    ├── 📄 Note de seminar -3short...docx                # Note condensate
    └── 📄 Seminar 3 – Lecție clasă și temă...docx       # Fișă de lucru
```

---

## 📚 Conținutul detaliat

### S3-Teorie

| Document | Conținut |
|----------|----------|
| `S2verA (teorie) Funcții și array-uri...pdf` | Teoria metodelor `filter`, `map`, `reduce` cu exemple și diagrame |

---

### S3-Laborator

Laboratorul este organizat în **6 module video**, fiecare cu:
- **Scripturi în variante progresive** (A, B, C... până la F sau H)
- **Analiză HTML interactivă** — deschideți în browser pentru vizualizare formatată
- **README.md** — documentație detaliată cu explicații și complexități
- **Fișă de laborator DOCX** — exerciții și probleme pentru studenți

---

### S3-Appendix

| Document | Descriere |
|----------|-----------|
| `APPENDIX 1 - Ce este „use strict"...pdf` | Explicație comprehensivă a modului strict în JavaScript |
| `Note de seminar -3short...docx` | Note condensate pentru revizuire rapidă |
| `Seminar 3 – Lecție clasă și temă...docx` | Fișă de lucru pentru activități în clasă și temă |

---

## 🎯 Cele 6 module de laborator

### 📹 Video 1: Filtrarea cuvintelor (`1wordsfilter`)

**Problemă:** Filtrarea unui array de cuvinte după un cuvânt interzis și o lungime minimă.

| Script | Descriere | Caracteristici |
|--------|-----------|----------------|
| `1wordsfiltersA.js` | Schelet — doar structura | Punct de plecare |
| `1wordsfilterB.js` | Implementare clară cu `filter` | Predicate explicite, variabilă `result` |
| `1wordsfilterC.js` | Formă concisă (one-liner) | Arrow function cu expresie directă |
| `1wordsfilterD.js` | Cu `for` clasic (ES5) | Stil imperativ pentru comparație |
| `1wordsfilterE.js` | Cu sensibilitate la majuscule | `toLowerCase()` pentru comparație |
| `1wordsfilterF.js` | CLI complet | Argumente `--words`, `--forbidden`, `--minLength` |

```javascript
// Varianta C — cea mai concisă
const filterWords = (words, forbidden, minLen) =>
  words.filter(w => w !== forbidden && w.length >= minLen);
```

**Complexitate:** `O(n)` timp, `O(n)` spațiu (pentru rezultat)

---

### 📹 Video 2: Arii pătrate (`2squareDim`)

**Problemă:** Calculul sumei ariilor unor pătrate date prin lungimile laturilor.

| Script | Abordare | Observații |
|--------|----------|------------|
| `2squareDimA.js` | Doar `map` (returnează ariile) | Nu calculează suma |
| `2squareDimB.js` | `map` + `reduce` | Pipeline în doi pași |
| `2squareDimC.js` | Single-pass cu `reduce` | O singură parcurgere |
| `2squareDimD.js` | Cu `for` clasic | Stil imperativ |
| `2squareDimE.js` | Cu validare date | Tratează `null`, `NaN`, string-uri |

```javascript
// Varianta E — robustă pentru date „murdare"
const getTotalAreaSafe = (dims) =>
  dims
    .map(Number)                // conversie numerică
    .filter(Number.isFinite)    // elimină NaN/Infinity
    .map(side => side * side)
    .reduce((sum, a) => sum + a, 0);

getTotalAreaSafe([3, "5", null, 12]);  // → 178
```

**Bonus:** `2squareDim_version_forBigData.zip` — versiune streaming pentru fișiere mari

---

### 📹 Video 3: Formatter de șiruri (`3formatter`)

**Problemă:** Substituția placeholder-elor `{0}`, `{1}` într-un template string.

| Script | Funcționalitate |
|--------|-----------------|
| `3formatterA.js` | Bază — substituție simplă cu regex |
| `3formatterB.js` | Cu validare index |
| `3formatterC.js` | Cu escapare acolade `{{`, `}}` |
| `3formatterD.js` | Cu padding/aliniere |
| `3formatterE.js` | Cu suport `Intl.NumberFormat` |
| `3formatterF.js` | CLI complet (`--tpl`, `--args`) |

```javascript
// Pattern regex pentru placeholder-e
const format = (s, ...rest) =>
  String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    return i < rest.length ? String(rest[i]) : match;
  });

format("Hello, {0}! You have {1} messages.", "Ana", 5);
// → "Hello, Ana! You have 5 messages."
```

**Fișa de laborator** acoperă: regex avansate, escapări, `Intl.NumberFormat`, `Intl.DateTimeFormat`

---

### 📹 Video 4: Map × Multiply (`4mapmul`)

**Problemă:** Înmulțirea fiecărui element dintr-un array cu un factor.

| Script | Focus |
|--------|-------|
| `4mapmulA.js` | `map` de bază |
| `4mapmulB.js` | Cu `TypedArray` (performanță) |
| `4mapmulC.js` | Cu `BigInt` (numere mari) |
| `4mapmulD.js` | Benchmark comparativ |

```javascript
// Cu TypedArray pentru performanță
const arr = new Float64Array([1.5, 2.5, 3.5]);
const doubled = arr.map(x => x * 2);  // Float64Array [3, 5, 7]

// Cu BigInt pentru numere foarte mari
const big = [10n, 20n, 30n].map(x => x * 1000000000000n);
```

**Fișa de laborator** explorează: `TypedArray`, `BigInt`, micro-benchmarks

---

### 📹 Video 5: Generator de acrostih (`5acrostih`)

**Problemă:** Extragerea primei litere din fiecare cuvânt pentru a forma un acronim.

| Script | Evoluție |
|--------|----------|
| `5acrostihA.js` | `map` + `join` explicit |
| `5acrostihB.js` | Cu array separat pentru inițiale |
| `5acrostihC.js` | One-liner |
| `5acrostihD.js` | Cu regex Unicode `\p{L}` |
| `5acrostihE.js` | Cu normalizare (diacritice) |
| `5acrostihF.js` | Procesare multiline |
| `5acrostihG.js` | Detectare acrostih țintă |
| `5acrostihH.js` | Minimalist (2 linii) |

```javascript
// Varianta H — ultra-concisă
const words = ["the","quick","brown","fox"];
console.log(words.map(w => w[0]).join(""));  // "tqbf"

// Cu suport Unicode
const getAcrostic = text =>
  (text.match(/\p{L}+/gu) || []).map(w => w[0]).join("");
```

**Utilități practice:** generare acronime, coduri unice, identificatori

---

### 📹 Video 6: Filtrare obiecte (`6keys&filters`)

**Problemă:** Filtrarea unui array de obiecte după criterii pe chei.

| Script | Complexitate criteriilor |
|--------|--------------------------|
| `6keys&filtersA.js` | Egalitate strictă pe toate cheile |
| `6keys&filtersB.js` | Cu operatori `$gt`, `$lt` |
| `6keys&filtersC.js` | Cu `$in` (valoare în listă) |
| `6keys&filtersD.js` | Cu `$regex` |
| `6keys&filtersE.js` | Cu dot-path (`"specs.ram"`) |
| `6keys&filtersF.js` | Cu predicate funcționale |
| `6keys&filtersG.js` | Comparație locale-aware |
| `6keys&filtersH.js` | One-liner concis |

```javascript
// Varianta A — egalitate strictă
const getFilteredObjects = (array, criteria) =>
  array.filter(obj =>
    Object.keys(criteria).every(k => obj[k] === criteria[k])
  );

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

getFilteredObjects(laptops, { processor: "i5", ram: 8 });
// → [{ brand: "HP", ... }, { brand: "Lenovo", ... }]
```

**Fișa de laborator** acoperă: NDJSON streaming, criterii MongoDB-style, Unicode în chei

---

## 🧠 Concepte cheie

### Metodele array funcționale

| Metodă | Scop | Returnează |
|--------|------|------------|
| `filter(predicate)` | Selectează elementele care satisfac predicatul | Array nou (subset) |
| `map(transform)` | Transformă fiecare element | Array nou (aceeași lungime) |
| `reduce(accumulator, init)` | Agregă toate elementele într-o singură valoare | Orice tip |
| `every(predicate)` | Verifică dacă TOATE elementele satisfac predicatul | Boolean |
| `some(predicate)` | Verifică dacă CEL PUȚIN UN element satisface predicatul | Boolean |
| `find(predicate)` | Găsește primul element care satisface predicatul | Element sau `undefined` |

### Pipeline funcțional

```javascript
// Pattern tipic: filter → map → reduce
const result = data
  .filter(x => x.valid)           // selectare
  .map(x => x.value * 2)          // transformare
  .reduce((a, b) => a + b, 0);    // agregare
```

### Complexitate

| Pattern | Timp | Spațiu adițional |
|---------|------|------------------|
| `filter` | O(n) | O(n) — array nou |
| `map` | O(n) | O(n) — array nou |
| `reduce` | O(n) | O(1) — doar acumulator |
| `filter→map→reduce` | O(3n) = O(n) | O(2n) = O(n) |
| Single-pass reduce | O(n) | O(1) |

---

## 📈 Ghid de parcurgere

### Pentru începători:

```
1. Citește PDF-ul teoretic din S3-Teorie
       ↓
2. Rulează Video1 (1wordsfilterA→F) — înțelege filter
       ↓
3. Rulează Video2 (2squareDimA→E) — înțelege map + reduce
       ↓
4. Deschide fișierele *_analysis.html în browser
       ↓
5. Rezolvă exercițiile din fișele DOCX
```

### Pentru avansați:

```
1. Sari la Video5 și Video6 (cele mai complexe)
       ↓
2. Experimentează cu variante streaming (BigData.zip)
       ↓
3. Implementează criterii MongoDB-style ($gt, $in, $regex)
       ↓
4. Citește Appendix-ul despre "use strict"
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune minimă | Observații |
|------------|-----------------|------------|
| Node.js | 18+ | Pentru Unicode property escapes (`\p{L}`) și `Intl` |
| Editor | Orice | Recomandat: VS Code cu ESLint |
| Browser | Modern | Pentru fișierele `*_analysis.html` |

---

## 🚀 Rulare rapidă

```bash
# Clonare/descărcare repository
cd S3/S3-Laborator

# === Video 1: Filtrare cuvinte ===
cd Video1
node 1wordsfilterC.js
# → [ 'wolf', 'snake', 'lion', 'horse' ]

node 1wordsfilterF.js --words="bear,ant,crocodile,lioness" --forbidden=crocodile --minLength=4
# → [ 'bear', 'lioness' ]

# === Video 2: Arii pătrate ===
cd ../Video2
node 2squareDimE.js
# → result clean: 221
# → result dirty: 221

# === Video 3: Formatter ===
cd ../Video3
node 3formatterF.js --tpl="Salut, {0}! Ai {1} mesaje noi." --args="Maria,7"
# → Salut, Maria! Ai 7 mesaje noi.

# === Video 5: Acrostih ===
cd ../Video5
node 5acrostihH.js
# → tqbfjotld

# === Video 6: Filtrare obiecte ===
cd ../Video6
node 6keys\&filtersH.js
# → result: [ { brand: 'HP', ... }, { brand: 'Lenovo', ... } ]

# === Rulare toate variantele dintr-un modul ===
cd ../Video1
for f in *.js; do echo "== $f =="; node "$f"; done
```

---

## 📝 Exerciții propuse

### Nivel începător:

1. **Modifică `1wordsfilterC.js`** să filtreze și cuvintele care conțin litera „a".

2. **Adaugă în `2squareDimE.js`** suport pentru numere negative (le consideră 0).

3. **Extinde `5acrostihC.js`** să accepte textul ca argument CLI.

### Nivel intermediar:

4. **Implementează în `3formatter`** suport pentru `{key|uppercase}` și `{key|lowercase}`.

5. **Adaugă în `6keys&filters`** operatorul `$between` pentru intervale: `{ ram: { $between: [8, 16] } }`.

6. **Rescrie `2squareDim`** ca single-pass reduce (fără `map` separat).

### Nivel avansat:

7. **Implementează streaming** pentru `6keys&filters` — citește NDJSON linie cu linie și filtrează în flux.

8. **Adaugă suport** pentru criterii imbricate: `{ "specs.cpu.cores": { $gte: 4 } }`.

9. **Creează un benchmark** care compară performanța `map→reduce` vs. single-pass pentru 1M elemente.

---

## 📚 Referințe

### Documentație oficială
- [MDN: Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [MDN: Regular Expressions - Unicode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)

### Articole academice
- Dean, J., & Ghemawat, S. (2008). *MapReduce: Simplified data processing on large clusters.* Communications of the ACM.
- Thompson, K. (1968). *Regular expression search algorithm.* Communications of the ACM.

### Tutoriale recomandate
- [JavaScript.info: Array Methods](https://javascript.info/array-methods)
- [Eloquent JavaScript: Data](https://eloquentjavascript.net/04_data.html)

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

---

<div align="center">

**📖 Material didactic pentru Seminarul S3**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția transformărilor:**

```
Imperativ (for)      →    Declarativ (filter/map)    →    Expresiv (pipeline)
────────────────────────────────────────────────────────────────────────────
for (let i=0; ...)        arr.filter(x => ...)            arr
  if (cond) push(x)         .map(x => ...)                  .filter(valid)
                                                            .map(transform)
                                                            .reduce(aggregate)
```

</div>
