# 📘 S4 — Obiecte și Programare Asincronă în Node.js

> **Seminar S4** | Curs de Tehnologii Web | ASE-CSIE  
> Programare Orientată pe Obiecte, Closures, Excepții și Promises în JavaScript

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S4-Teorie](#s4-teorie)
  - [S4-Laborator](#s4-laborator)
  - [S4-Appendix](#s4-appendix)
- [Cele 7 module de laborator](#-cele-7-module-de-laborator)
- [Concepte cheie](#-concepte-cheie)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Teme propuse](#-teme-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S4 introduce **programarea orientată pe obiecte** și **programarea asincronă** în JavaScript/Node.js. Este un seminar esențial care face tranziția de la prelucrarea funcțională (S2-S3) către paradigme mai avansate necesare pentru dezvoltarea de aplicații web.

### Ce vei învăța:

| Concept | Descriere |
|---------|-----------|
| **Clase ES6** | Declarare, constructori, metode, câmpuri private (`#`) |
| **Moștenire** | `extends`, `super()`, ierarhii de clase |
| **Compoziție** | Obiecte care conțin alte obiecte |
| **Closures** | Funcții care „țin minte" contextul lexical |
| **Memoizare** | Cache pentru rezultate costisitoare |
| **Prototipuri** | Extinderea tipurilor built-in |
| **Excepții** | `throw`, `try/catch`, validare input |
| **Promises** | `.then()`, `async/await`, cereri HTTP |

---

## 📁 Structura repository-ului

```
S4/
├── 📂 S4-Teorie/                                    # Materialele teoretice
│   ├── 📄 S4explicativ – Obiecte și programare...pdf    # PDF rezumat explicativ
│   └── 📄 Teorie (multă) – Obiecte și programare...pdf  # PDF teoretic complet
│
├── 📂 S4-Laborator/                                 # Scripturi și prezentări animate
│   ├── 📄 S4v01stream.js                                # Video 1: Clase și Stream-uri
│   ├── 📂 S4v01stream-show/                             # Prezentare animată Video 1
│   │   ├── player.html                                  # Player interactiv
│   │   ├── player_inline.html                           # Variantă inline
│   │   └── frames.json                                  # Cadre animație
│   │
│   ├── 📄 S4v2robots.js                                 # Video 2: Moștenire și Compoziție
│   ├── 📂 S4v2robots-show/                              # Prezentare animată Video 2
│   │
│   ├── 📄 S4v3fibo_mem.js                               # Video 3: Closures și Memoizare
│   ├── 📂 S4v3fibo_mem-show/                            # Prezentare animată Video 3
│   │
│   ├── 📄 S4v4capitalizaWords.js                        # Video 4: Extindere Prototipuri
│   ├── 📂 S4v4capitalizaWords-show/                     # Prezentare animată Video 4
│   │
│   ├── 📄 S4v5orderCoffee.js                            # Video 5: Excepții
│   ├── 📂 S4v5orderCoffee-show/                         # Prezentare animată Video 5
│   │
│   ├── 📄 S4v6partA_country_bounds.js                   # Video 6A: Promises cu .then()
│   ├── 📂 S4v6partA_country_bounds-show/                # Prezentare animată Video 6A
│   │
│   ├── 📄 S4v6partB_country_bounds.js                   # Video 6B: async/await
│   ├── 📂 S4v6partB_country_bounds-show/                # Prezentare animată Video 6B
│   │
│   └── 📦 S4-scripturi.zip                              # Arhivă cu toate scripturile
│
└── 📂 S4-Appendix/                                  # Materiale suplimentare și teme
    ├── 📄 Ghid de abordare TEMA 1 TW.pdf                # Ghid pentru Tema 1
    ├── 📄 S4 (optional) Guided HOMEWORK...pdf           # Temă ghidată: Employee Management
    ├── 📦 S4 (optional) Guided_HOMEWORK...kit.zip       # Kit pentru tema ghidată
    ├── 🔗 TEMAoptionalaREZOLVARE_Judet-Orase...url      # Link YouTube: soluție temă
    └── 🔗 TEMAoptionalaREZOLVARE_Search-Airline.url     # Link YouTube: soluție temă
```

---

## 📚 Conținutul detaliat

### S4-Teorie

| Document | Conținut | Pagini |
|----------|----------|:------:|
| `S4explicativ...pdf` | Rezumat cu explicații esențiale | ~10 |
| `Teorie (multă)...pdf` | Documentație completă cu exemple extinse | ~50+ |

**Subiecte acoperite:**
- Obiecte și clase în JavaScript
- Câmpuri private și publice
- Getteri și setteri
- Moștenire și polimorfism
- Closures și scope
- Event loop și asincronism
- Promises și async/await

---

### S4-Laborator

Fiecare modul conține:
- **Script `.js`** — codul sursă demonstrativ
- **Folder `-show/`** — prezentare HTML animată pas-cu-pas

#### 🎬 Prezentările animate

Folderele `-show/` conțin **prezentări interactive** care arată evoluția codului linie cu linie, cu explicații pentru fiecare pas. Deschideți `player.html` în browser pentru a vizualiza.

**Caracteristici:**
- Animație pas-cu-pas a construcției codului
- Note explicative pentru fiecare bloc
- Highlight pe liniile curente
- Control play/pause/viteză

---

### S4-Appendix

| Fișier | Descriere |
|--------|-----------|
| `Ghid de abordare TEMA 1 TW.pdf` | Instrucțiuni detaliate pentru prima temă |
| `Guided HOMEWORK - Employee Management...pdf` | Temă opțională ghidată pas-cu-pas |
| `Guided_HOMEWORK...kit.zip` | Fișiere starter pentru tema Employee Management |
| `TEMAoptionalaREZOLVARE_*.url` | Link-uri YouTube cu rezolvări video |

---

## 🎯 Cele 7 module de laborator

### 📹 Video 1: Stream-uri și Clase (`S4v01stream.js`)

**Concepte:** Clase ES6, câmpuri private (`#`), getteri, proprietăți statice, moștenire.

```javascript
class Stream {
  #value;              // câmp privat
  #nextValue;
  static #count = 0;   // proprietate statică privată

  constructor(value, nextValue) {
    this.#value = value;
    this.#nextValue = nextValue;
    Stream.#count++;
  }

  get value() { return this.#value; }
  
  get next() {
    this.#value = this.#nextValue(this.#value);
    return this.#value;
  }

  static get count() { return Stream.#count; }
}

// Moștenire
class NextIntegerStream extends Stream {
  constructor() {
    super(0, value => value + 1);
  }
}
```

**Temă:** Implementați un `EvenStream` care generează numere pare pornind de la o valoare dată.

---

### 📹 Video 2: Roboți — Moștenire și Compoziție (`S4v2robots.js`)

**Concepte:** Moștenire cu `extends`, compoziție (has-a), modificarea prototipului.

```javascript
class Robot {
  constructor(name) { this.name = name; }
  move() { console.log(`${this.name} is moving`); }
}

class Weapon {
  constructor(description) { this.description = description; }
  fire() { console.log(`${this.description} is firing`); }
}

// Moștenire + Compoziție
class CombatRobot extends Robot {
  constructor(name) {
    super(name);
    this.weapons = [];  // compoziție: Robot ARE arme
  }

  addWeapon(w) { this.weapons.push(w); }

  fire() {
    for (const w of this.weapons) w.fire();
  }
}

// Extindere prototip la runtime
Robot.prototype.fly = function() {
  console.log(`${this.name} is flying`);
};
```

**Temă:** Implementați `Software` → `Browser` → `Plugin` cu aceeași structură.

---

### 📹 Video 3: Fibonacci cu Memoizare (`S4v3fibo_mem.js`)

**Concepte:** Closures, memoizare, cache pentru optimizare.

```javascript
function fibGen() {
  const cache = [1, 1];  // closure păstrează cache-ul

  const fib = (index) => {
    if (index < cache.length) {
      console.log('found ' + index);  // din cache
      return cache[index];
    } else {
      console.log('calculated ' + index);  // calculat
      cache[index] = fib(index - 1) + fib(index - 2);
      return cache[index];
    }
  };

  return fib;  // returnează funcția cu acces la cache
}

const fib = fibGen();
fib(5);  // calculează și memorează
fib(3);  // găsit în cache!
```

**De ce funcționează:** Funcția `fib` „ține minte" variabila `cache` din contextul în care a fost creată (closure).

**Temă:** Implementați exponențierea recursivă cu memoizare.

---

### 📹 Video 4: Extinderea Prototipurilor (`S4v4capitalizaWords.js`)

**Concepte:** Adăugarea de metode la tipuri built-in prin prototip.

```javascript
// Adăugăm metodă la String.prototype
String.prototype.capitalizeWords = function() {
  return this.replace(/\b[a-z]/g, match => match.toUpperCase());
};

console.log("this words will be capitalized.".capitalizeWords());
// → "This Words Will Be Capitalized."
```

**⚠️ Atenție:** Extinderea prototipurilor native este controversată — poate cauza conflicte.

**Temă:** Implementați `Number.prototype.times(fn)` astfel încât `3.times(() => console.log('hi'))` să afișeze „hi" de 3 ori.

---

### 📹 Video 5: Excepții și Validare (`S4v5orderCoffee.js`)

**Concepte:** `throw`, `try/catch`, validare input, pattern enum.

```javascript
const orderCoffee = (type) => {
  const types = {
    SPECIAL: 'SPECIAL',
    REGULAR: 'REGULAR'
  };

  if (Object.values(types).indexOf(type) === -1) {
    throw new Error('coffee error');  // aruncă excepție
  } else {
    console.log(`preparing ${type} coffee`);
  }
};

try {
  orderCoffee('REGULAR');     // OK
  orderCoffee('INVALID');     // aruncă eroare
} catch (err) {
  console.warn(err);          // prinde eroarea
}
```

**Temă:** Implementați `increaseSalary(salaries, percent)` care aruncă excepții dacă parametrii nu sunt valizi.

---

### 📹 Video 6A: Promises cu `.then()` (`S4v6partA_country_bounds.js`)

**Concepte:** Promise, `.then()`, `fetch`, cereri HTTP asincrone.

```javascript
const fetch = require('node-fetch');

function getObjectFromUrl(url) {
  return new Promise(resolve =>
    fetch(url)
      .then(response => response.text())
      .then(text => resolve(JSON.parse(text)))
  );
}

function getCountryBounds(country) {
  return new Promise(resolve =>
    getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`)
      .then(object => resolve({
        minLatitude: object[0].boundingbox[0],
        maxLatitude: object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3],
      }))
  );
}

// Utilizare
getCountryBounds('Romania')
  .then(bounds => console.log(bounds));
```

---

### 📹 Video 6B: async/await (`S4v6partB_country_bounds.js`)

**Concepte:** `async`, `await`, sintaxă modernă pentru Promises.

```javascript
const fetch = require('node-fetch');

async function getObjectFromUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  return JSON.parse(text);
}

async function getCountryBounds(country) {
  const object = await getObjectFromUrl(
    `https://nominatim.openstreetmap.org/search?country=${country}&format=json`
  );
  return {
    minLatitude: object[0].boundingbox[0],
    maxLatitude: object[0].boundingbox[1],
    minLongitude: object[0].boundingbox[2],
    maxLongitude: object[0].boundingbox[3]
  };
}

// Utilizare
getCountryBounds('Romania')
  .then(bounds => console.log(bounds));
```

**Temă:** Implementați o funcție care obține lista avioanelor de deasupra României (folosind OpenSky API).

---

## 🧠 Concepte cheie

### Clase ES6 vs. Funcții Constructor

| Aspect | Clase ES6 | Funcții Constructor |
|--------|-----------|---------------------|
| Sintaxă | `class Foo {}` | `function Foo() {}` |
| Moștenire | `extends` | `Object.create()` |
| Super | `super()` | `Parent.call(this)` |
| Câmpuri private | `#field` | Closure sau convention `_field` |

### Promises vs. async/await

| `.then()` | `async/await` |
|-----------|---------------|
| `fetch(url).then(r => r.json())` | `const r = await fetch(url); const data = await r.json();` |
| Callback chaining | Cod sincron aparent |
| Mai vechi, mai verbose | Modern, mai lizibil |
| Bun pentru paralelism (`Promise.all`) | Bun pentru secvențial |

### Closure — Vizualizare

```javascript
function outer() {
  let secret = 42;           // variabilă locală
  
  return function inner() {
    return secret;           // inner „vede" secret
  };
}

const getSecret = outer();   // outer() se termină
console.log(getSecret());    // 42 — secret încă există!
```

---

## 📈 Ghid de parcurgere

### Pentru începători:

```
1. Citește PDF-ul "S4explicativ" pentru teorie
       ↓
2. Deschide player.html din S4v01stream-show în browser
       ↓
3. Urmărește animația și rulează S4v01stream.js
       ↓
4. Continuă cu Video 2, 3, 4 în ordine
       ↓
5. Video 5 și 6 sunt mai avansate — lasă-le la final
```

### Pentru avansați:

```
1. Sari direct la Video 6A și 6B (async)
       ↓
2. Compară stilul .then() cu async/await
       ↓
3. Rezolvă temele din Appendix
       ↓
4. Citește PDF-ul "Teorie (multă)" pentru detalii
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune | Observații |
|------------|----------|------------|
| Node.js | 18+ | Pentru câmpuri private de clasă (`#`) |
| npm | 9+ | Pentru instalare dependențe |
| Browser | Modern | Pentru prezentările animate |

**Dependență pentru Video 6:**
```bash
npm install node-fetch
```

---

## 🚀 Rulare rapidă

```bash
# Clonare/descărcare repository
cd S4/S4-Laborator

# === Video 1: Stream-uri ===
node S4v01stream.js
# → constant[0] = 1
# → nextInteger[0] = 1
# → ...

# === Video 2: Roboți ===
node S4v2robots.js
# → some robot is moving
# → pew pew laser is firing
# → firing all weapons
# → some combat robot is flying

# === Video 3: Fibonacci ===
node S4v3fibo_mem.js
# → found 1
# → calculated 5
# → ...

# === Video 4: Capitalize ===
node S4v4capitalizaWords.js
# → This Words Will Be Capitalized.

# === Video 5: Excepții ===
node S4v5orderCoffee.js
# → preparing REGULAR coffee
# → Error: coffee error

# === Video 6: Async (necesită node-fetch) ===
npm install node-fetch
node S4v6partA_country_bounds.js
# → { minLatitude: '43.618682', maxLatitude: '48.265274', ... }

# === Prezentări animate ===
# Deschide în browser:
# S4-Laborator/S4v01stream-show/player.html
```

---

## 📝 Teme propuse

### Din videoclipuri:

1. **Video 1:** Implementați `EvenStream` — generează numere pare de la o valoare inițială.

2. **Video 2:** Implementați ierarhia `Software` → `Browser` (cu `Plugin`-uri).

3. **Video 3:** Implementați exponențierea recursivă cu memoizare.

4. **Video 4:** Implementați `Number.prototype.times(fn)`.

5. **Video 5:** Implementați `increaseSalary(arr, percent)` cu validare.

6. **Video 6:** Obțineți lista avioanelor de deasupra României (OpenSky API).

### Din Appendix:

- **Employee Management Application** — aplicație CRUD ghidată
- **Județ-Orașe-Locuitori** — prelucrare date geografice
- **Search-Airline** — căutare în date despre companii aeriene

---

## 📚 Referințe

### Documentație oficială
- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)

### API-uri folosite
- [OpenStreetMap Nominatim](https://nominatim.org/release-docs/develop/api/Overview/)
- [OpenSky Network API](https://openskynetwork.github.io/opensky-api/)

### Tutoriale recomandate
- [JavaScript.info: Classes](https://javascript.info/classes)
- [JavaScript.info: Async/await](https://javascript.info/async-await)

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

---

<div align="center">

**📖 Material didactic pentru Seminarul S4**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția paradigmelor:**

```
Funcțional (S2-S3)     →     OOP (S4)          →     Async (S4+)
─────────────────────────────────────────────────────────────────
map/filter/reduce           class/extends            Promise
funcții pure                this/super               async/await
imutabilitate               encapsulare              non-blocking
```

</div>
