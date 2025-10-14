# 3formatter (A–F): analiză tehnică și comentarii didactice

_Generat: 2025-10-13T13:10:33_

## Context
Aceste scripturi implementează o funcție `format` de **substituție a placeholder‑elor numerice** în șabloane de șir (`{0}`, `{1}`, …), ilustrând două strategii: (1) **iterare pe indici** (A) și (2) **regex global cu funcție de înlocuire** (B–E), plus o **interfață CLI** (F). Scopul didactic: regular expressions, `String.prototype.replace`, semnături alternative și politici de eroare (tolerantă vs strictă).

### 3formatterA.js
**Varianta A — pas‑cu‑pas.** Construiește regex‑ul pentru fiecare index și aplică `replace` iterativ (buclă peste indici). Avantaj: simplitate; Dezavantaj: multiple treceri peste șir (câte una per indice).
**Stil & API-uri:** arrow functions (ES6), rest/spread (`...args`), regular expressions, String.prototype.replace with callback, console I/O.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `9`, complexitate ciclomatică (aprox.) ≈ `2`.
**Complexitate asimptotică:** timpul de formatat este `O(|s| + m)` unde `|s|` = lungimea șablonului, `m` = numărul de înlocuiri; spațiul suplimentar este `O(|s|)` pentru șirul rezultat.
**Explicații pe cod (esențial):**
- Modelul de substituție folosește **placeholdere** `{i}` cu indici zecimali.
- `String.prototype.replace` cu regex global `/\{(\d+)\}/g` și funcție de înlocuire oferă acces la **captura** `(\d+)` (`index`).
- Conversia la număr (`Number(index)`) evită accesul textual; se validează limitele (`i < args.length`).

**Rulare în Node.js:**
```bash
node 3formatterA.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta A — pas‑cu‑pas: iterează indiciile și înlocuiește toate aparițiile {i}.
 * Sintaxa ES6 pentru funcții săgeată
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - ...args este un array cu argumentele suplimentare (de la 1 încolo)
 *   - pentru fiecare argument, se construiește un RegExp care să găsească toate aparițiile {i}
 */
const format = (s, ...args) => {
  let out = String(s);
  for (let i = 0; i < args.length; i++) {
    const re = new RegExp("\\{" + i + "\\}", "g"); // /{i}/g
    out = out.replace(re, String(args[i]));
  }
  return out;
};

console.log(format("this is a {0} string and we've {1} it", "nice", "formatted"));
// -> this is a nice string and we've formatted it
```

### 3formatterB.js
**Varianta B — regex unic + callback.** O singură trecere globală cu `/\{(\d+)\}/g`; dacă indicele depășește numărul de argumente, **păstrează** tokenul original (comportament tolerant).
**Stil & API-uri:** arrow functions (ES6), rest/spread (`...args`), regular expressions, String.prototype.replace with callback, console I/O.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `6`, complexitate ciclomatică (aprox.) ≈ `2`.
**Complexitate asimptotică:** timpul de formatat este `O(|s| + m)` unde `|s|` = lungimea șablonului, `m` = numărul de înlocuiri; spațiul suplimentar este `O(|s|)` pentru șirul rezultat.
**Explicații pe cod (esențial):**
- Modelul de substituție folosește **placeholdere** `{i}` cu indici zecimali.
- `String.prototype.replace` cu regex global `/\{(\d+)\}/g` și funcție de înlocuire oferă acces la **captura** `(\d+)` (`index`).
- Conversia la număr (`Number(index)`) evită accesul textual; se validează limitele (`i < args.length`).

**Rulare în Node.js:**
```bash
node 3formatterB.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta B — regex unic + funcție de înlocuire.
 * Sintaxa ES6 pentru funcții săgeată
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - ...args este un array cu argumentele suplimentare (de la 1 încolo)
 *   - se folosește un singur RegExp care să găsească toate aparițiile {i}
 *   - funcția de înlocuire primește ca parametri match (ce s-a găsit) și index (captura din paranteze)
 *   - index este convertit în număr și folosit pentru a accesa args[i]
 *   - dacă i e în afara limitelor, se returnează match (adică nu se înlocuiește)
 */


const format = (s, ...args) =>
  String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    return i < args.length ? String(args[i]) : match;
  });

console.log(format("this is a {0} string and we've {1} it", "nice", "formatted"));

// -> this is a nice string and we've formatted it
```

### 3formatterC.js
**Varianta C — argumente sub formă de vector.** Semnătura `format(s, arr)` separă clar *șablonul* de *colectia de valori* (util pentru surse externe/JSON).
**Stil & API-uri:** arrow functions (ES6), rest/spread (`...args`), regular expressions, String.prototype.replace with callback, console I/O.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `6`, complexitate ciclomatică (aprox.) ≈ `3`.
**Complexitate asimptotică:** timpul de formatat este `O(|s| + m)` unde `|s|` = lungimea șablonului, `m` = numărul de înlocuiri; spațiul suplimentar este `O(|s|)` pentru șirul rezultat.
**Explicații pe cod (esențial):**
- Modelul de substituție folosește **placeholdere** `{i}` cu indici zecimali.
- `String.prototype.replace` cu regex global `/\{(\d+)\}/g` și funcție de înlocuire oferă acces la **captura** `(\d+)` (`index`).
- Conversia la număr (`Number(index)`) evită accesul textual; se validează limitele (`i < args.length`).

**Rulare în Node.js:**
```bash
node 3formatterC.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta C — primește argumentele sub formă de vector.
 * Sintaxa ES6 pentru funcții săgeată
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - arr este un array cu argumentele (de la 0 încolo)
 *   - se folosește un singur RegExp care să găsească toate aparițiile {i}
 *   - funcția de înlocuire primește ca parametri match (ce s-a găsit) și index (captura din paranteze)
 *   - index este convertit în număr și folosit pentru a accesa arr[i]
 *   - dacă i e în afara limitelor, se returnează match (adică nu se înlocuiește)
 */
const format = (s, arr) =>
  String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    return Array.isArray(arr) && i < arr.length ? String(arr[i]) : match;
  });

console.log(format("this is a {0} string and we've {1} it", ["nice", "formatted"]));

// -> this is a nice string and we've formatted it


// Exemplu cu array vid:
// console.log(format("this is a {0} string and we've {1} it", []));
```

### 3formatterD.js
**Varianta D — strictă.** Dacă lipsește un argument pentru un placeholder, aruncă **eroare** (fail‑fast). Bună pentru detectarea timpurie a incongruențelor.
**Stil & API-uri:** arrow functions (ES6), rest/spread (`...args`), regular expressions, String.prototype.replace with callback, console I/O.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `7`, complexitate ciclomatică (aprox.) ≈ `3`.
**Complexitate asimptotică:** timpul de formatat este `O(|s| + m)` unde `|s|` = lungimea șablonului, `m` = numărul de înlocuiri; spațiul suplimentar este `O(|s|)` pentru șirul rezultat.
**Explicații pe cod (esențial):**
- Modelul de substituție folosește **placeholdere** `{i}` cu indici zecimali.
- `String.prototype.replace` cu regex global `/\{(\d+)\}/g` și funcție de înlocuire oferă acces la **captura** `(\d+)` (`index`).
- Conversia la număr (`Number(index)`) evită accesul textual; se validează limitele (`i < args.length`).

**Rulare în Node.js:**
```bash
node 3formatterD.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta D — strictă: lipsește un argument -> eroare.
 * Sintaxa ES6 pentru funcții săgeată
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - ...args este un array cu argumentele suplimentare (de la 1 încolo)
 *   - se folosește un singur RegExp care să găsească toate aparițiile {i}
 *   - funcția de înlocuire primește ca parametri match (ce s-a găsit) și index (captura din paranteze)
 *   - index este convertit în număr și folosit pentru a accesa args[i]
 *   - dacă i e în afara limitelor, se aruncă o eroare (adică nu se înlocuiește)
 * (/\{(\d+)\}/g unde:
 *       / este delimitatorul, \{ scăpat, (\d+) captura, \} scăpat, g global)
 *       \ este caracter de evadare (escape character)
 *       d+ înseamnă cifre (digit) una sau mai multe (+)
 *       g înseamnă global (toate aparițiile, nu doar prima)
 */
const format = (s, ...args) =>
  String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    if (i >= args.length) throw new Error(`Missing argument for placeholder {${i}}`);
    return String(args[i]);
  });

console.log(format("this is a {0} string and we've {1} it", "nice", "formatted"));

// -> this is a nice string and we've formatted it
```

### 3formatterE.js
**Varianta E — funcție declarată (ES5).** Identic logic cu B, dar ca funcție numită; util pentru debugging și vizibilitate în stack traces.
**Stil & API-uri:** arrow functions (ES6), traditional functions (ES5), rest/spread (`...args`), regular expressions, String.prototype.replace with callback, console I/O.
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `7`, complexitate ciclomatică (aprox.) ≈ `2`.
**Complexitate asimptotică:** timpul de formatat este `O(|s| + m)` unde `|s|` = lungimea șablonului, `m` = numărul de înlocuiri; spațiul suplimentar este `O(|s|)` pentru șirul rezultat.
**Explicații pe cod (esențial):**
- Modelul de substituție folosește **placeholdere** `{i}` cu indici zecimali.
- `String.prototype.replace` cu regex global `/\{(\d+)\}/g` și funcție de înlocuire oferă acces la **captura** `(\d+)` (`index`).
- Conversia la număr (`Number(index)`) evită accesul textual; se validează limitele (`i < args.length`).

**Rulare în Node.js:**
```bash
node 3formatterE.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta E — funcție declarată (non‑arrow), aceeași logică ca B.
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - ...args este un array cu argumentele suplimentare (de la 1 încolo)
 *   - se folosește un singur RegExp care să găsească toate aparițiile {i}
 *   - funcția de înlocuire primește ca parametri match (ce s-a găsit) și index (captura din paranteze)
 *   - index este convertit în număr și folosit pentru a accesa args[i]
 *   - dacă i e în afara limitelor, se returnează match (adică nu se înlocuiește)
 * (/\{(\d+)\}/g unde:
 *       / este delimitatorul, \{ scăpat, (\d+) captura, \} scăpat, g global)
 *       \ este caracter de evadare (escape character)
 *       d+ înseamnă cifre (digit) una sau mai multe (+)
 *       g înseamnă global (toate aparițiile, nu doar prima)    
 */
function format(s, ...args) {
  return String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    return i < args.length ? String(args[i]) : match;
  });
}

console.log(format("this is a {0} string and we've {1} it", "nice", "formatted"));

// -> this is a nice string and we've formatted it
```

### 3formatterF.js
**Varianta F — CLI minimal.** `parseArgs` extrage `--tpl="..."` și `--args="a,b"`; rulează `format` și afișează rezultatul. Potrivit pentru *batch processing* sau integrare în scripturi.
**Stil & API-uri:** arrow functions (ES6), traditional functions (ES5), rest/spread (`...args`), regular expressions, String.prototype.replace with callback, console I/O, CLI arguments (Node.js).
**Măsuri:** linii de cod (fără comentarii/blank) ≈ `18`, complexitate ciclomatică (aprox.) ≈ `11`.
**Complexitate asimptotică:** timpul de formatat este `O(|s| + m)` unde `|s|` = lungimea șablonului, `m` = numărul de înlocuiri; spațiul suplimentar este `O(|s|)` pentru șirul rezultat.
**Explicații pe cod (esențial):**
- Modelul de substituție folosește **placeholdere** `{i}` cu indici zecimali.
- `String.prototype.replace` cu regex global `/\{(\d+)\}/g` și funcție de înlocuire oferă acces la **captura** `(\d+)` (`index`).
- Conversia la număr (`Number(index)`) evită accesul textual; se validează limitele (`i < args.length`).

**Rulare în Node.js:**
```bash
node 3formatterF.js
```

**Cod sursă (extras):**
```javascript
/**
 * Varianta F — CLI: node 3formatterF.js --tpl="..." --args="a,b"
 * Explicație:
 *   - parseArgs: parsează argumentele din linia de comandă în obiect
 *   - tpl: șablonul (template) cu {0}, {1}, ...
 * Utilitate practică: permite reutilizarea scriptului cu diferite șabloane și liste de valori.
 *   - args: șir cu argumentele separate prin virgulă, de exemplu "nice,formatted"
 *   - list: vectorul cu argumentele, obținut prin split + trim
 */
function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const [k, v] = argv[i].split("=");
    if (k && k.startsWith("--")) out[k.slice(2)] = v ?? "";
  }
  return out;
}

const { tpl, args } = parseArgs(process.argv);
const list = (args ? args.split(",") : []).map(s => s.trim());

const format = (s, ...rest) =>
  String(s).replace(/\{(\d+)\}/g, (m, index) => {
    const i = Number(index);
    return i < rest.length ? String(rest[i]) : m;
  });

const template = tpl ?? "this is a {0} string and we've {1} it";
const values   = list.length ? list : ["nice", "formatted"];

console.log(format(template, ...values));


// Exemplu de rulare:
//   node formatter_F_cli.js --tpl="this is a {0} string and we've {1} it" --args="nice,formatted"
//   node formatter_F_cli.js --args="nice,formatted"
```

---
## Discuție transversală
- **Designul API‑ului.** `format(s, ...args)` este ergonomic pentru apeluri directe; `format(s, arr)` e mai potrivit când valorile vin din surse externe (JSON, CLI).
- **Politica de eroare.** Variantele **tolerante** (B, C, E) păstrează tokenul `{i}` dacă lipsește un argument; varianta **strictă** (D) aruncă excepție. Alegeți în funcție de necesarul de robustețe.
- **Complexitate.** O singură trecere cu regex global are, în practică, cost liniar în funcție de numărul potrivirilor; varianta A creează un regex per indice (mai multe treceri).
- **Escapare.** Pentru a include acolade literale, o tehnică este transformarea `{{`→`{` și `}}`→`}` **înainte** de substituție (vezi variațiunea I).
- **Internaționalizare.** Pentru numerice și date, folosiți `Intl.NumberFormat` și `Intl.DateTimeFormat` (vezi variațiunea L); specificarea localelor urmează etichetele BCP‑47 (ex. `en‑GB`).
## Lansări rapide (toate scripturile)
```bash
for f in 3formatter*.js; do echo "== $f =="; node "$f"; done
```

## Variațiuni didactice propuse (G–L)
- `3formatterG_named.js` — **placeholdere denumite** (`{name}`) și numerice; acceptă obiect sau vector.
- `3formatterH_padAlign.js` — mini‑specificatori `:{align}{width}` (ex. `{0:>8}`, `{1:^10}`) pentru aliniere/padding.
- `3formatterI_escapeBraces.js` — **escapare** `{{`/`}}` pentru acolade literale.
- `3formatterJ_cli.js` — CLI robust: `--tpl`, `--argsJson` (vector JSON) sau `--namedJson` (obiect JSON); ieșire JSON.
- `3formatterK.ts` — versiune TypeScript cu tipare explicite.
- `3formatterL_intl.js` — hook‑uri cu `Intl.NumberFormat` / `Intl.DateTimeFormat` pentru numere/date/lb. britanică (`en‑GB`).

---
## Referințe (APA, ediția a 7‑a)
- Thompson, K. (1968). Regular expression search algorithm. *Communications of the ACM, 11*(6), 419–422. https://doi.org/10.1145/363347.363387
- Bray, T. (2017). The JavaScript Object Notation (JSON) Data Interchange Format (RFC 8259). RFC Editor. https://doi.org/10.17487/RFC8259
- Phillips, A., & Davis, M. (2009). Tags for Identifying Languages (BCP 47, RFC 5646). RFC Editor. https://doi.org/10.17487/RFC5646
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to algorithms* (4th ed.). MIT Press. https://doi.org/10.7551/mitpress/11838.001.0001
