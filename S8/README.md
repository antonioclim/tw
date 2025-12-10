# 🚀 S8 — Servicii RESTful și Express.js

> **Seminar S8** | Curs de Tehnologii Web | ASE-CSIE  
> Construirea unui API REST complet în Node.js cu Express.js, în 8 pași progresivi

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S8-Teorie](#s8-teorie)
  - [S8-Laborator](#s8-laborator)
  - [S8-Appendix](#s8-appendix)
- [Cei 8 pași de învățare](#-cei-8-pași-de-învățare)
- [Modelul de date](#-modelul-de-date)
- [Arhitectura API-ului](#-arhitectura-api-ului)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Testare cu Postman](#-testare-cu-postman)
- [Concepte cheie](#-concepte-cheie)
- [Exerciții propuse](#-exerciții-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S8 introduce **construirea de API-uri RESTful** folosind **Node.js** și **Express.js**. Este organizat ca un **starter kit didactic** în care fiecare pas adaugă un singur concept nou, permițând înțelegerea progresivă a arhitecturii REST.

### Ce vei învăța:

| Pas | Concept | Rezultat |
|-----|---------|----------|
| **1** | Server Express minimal | `GET /books` returnează JSON |
| **2** | Parsare body JSON | `POST /books` creează resurse |
| **3** | Parametri de rută | `DELETE /books/:id` șterge resurse |
| **4** | Router modular | Organizare cod pe module |
| **5** | A doua resursă | `/departments` — API multi-entitate |
| **6** | Middleware global | Logging pentru toate cererile |
| **7** | Middleware de validare | Separarea logicii de validare |
| **8** | Error handling | 404 + 500 global handler |

### Schema de porturi

```
┌─────────────────────────────────────────────────────────────┐
│                    ARHITECTURĂ SEMINAR                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Terminal 1:                    Terminal 2:                │
│   ┌─────────────────┐           ┌─────────────────┐        │
│   │  npm run menu   │           │  npm run step3  │        │
│   │   (server.js)   │           │   (step3.js)    │        │
│   │                 │           │                 │        │
│   │  PORT 3000      │           │  PORT 3001      │        │
│   │  ───────────    │           │  ───────────    │        │
│   │  • Meniu HTML   │           │  • API REST     │        │
│   │  • Documentație │           │  • /books       │        │
│   │  • /docs/*.html │           │  • /departments │        │
│   └─────────────────┘           └─────────────────┘        │
│                                                             │
│   ⚠️  Rulați UN SINGUR STEP pe portul 3001!                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Structura repository-ului

```
S8/
├── 📂 S8-Teorie/                                           # Materiale teoretice
│   └── 📄 C (teorie extins) Servicii RESTful...docx            # Documentație completă
│
├── 📂 S8-Laborator/                                        # Kit-ul principal
│   ├── 📄 READMES8kitNextlab.md                                # Ghid detaliat (17+ pagini)
│   └── 📦 S8kitNextlab.zip                                     # ⭐ Kit-ul de 8 pași
│       ├── server.js                                           # Server meniu (port 3000)
│       ├── db.js                                               # "Baza de date" în memorie
│       ├── Book.js                                             # Model carte
│       ├── package.json                                        # Scripturi npm
│       ├── 📂 steps/                                           # Cei 8 pași
│       │   ├── step1.js → step8.js
│       ├── 📂 routes/                                          # Routere modulare
│       │   └── departments.js
│       ├── 📂 public/                                          # Frontend meniu
│       │   └── index.html
│       └── 📂 docs/                                            # Documentație per pas
│           └── step1.html → step8.html
│
└── 📂 S8-Appendix/                                         # Materiale suplimentare
    ├── 📄 C (teorie extins)...docx                             # Copie teorie
    ├── 📄 READMES8simplif-rest-express-starterkit.md           # Kit simplificat (6 pași)
    ├── 📦 S8simplif-rest-express-starterkit.zip                # Varianta simplificată
    ├── 📦 S8 Explicatii pas cu pas (docx)...zip                # Explicații DOCX
    └── 📄 S8a.html → S8h.html                                  # 8 prezentări HTML interactive
```

---

## 📚 Conținutul detaliat

### S8-Teorie

| Document | Conținut |
|----------|----------|
| **Servicii RESTful cu Node.js și Express.js** | Principii REST, metode HTTP, coduri de status, middleware, error handling |

**Subiecte acoperite:**
- Arhitectura REST (Representational State Transfer)
- Metodele HTTP: GET, POST, PUT, PATCH, DELETE
- Coduri de status: 200, 201, 204, 400, 404, 409, 500
- Express.js: routing, middleware, error handling
- Organizarea codului în proiecte reale

---

### S8-Laborator

Kit-ul principal conține:

#### 📦 S8kitNextlab.zip — Starter Kit în 8 pași

| Fișier | Rol |
|--------|-----|
| `server.js` | Server de meniu pe port 3000 |
| `db.js` | Date în memorie (books + departments) |
| `steps/step1.js` → `step8.js` | Cele 8 versiuni progresive ale API-ului |
| `routes/departments.js` | Router modular pentru departments |
| `public/index.html` | Pagina de meniu interactivă |
| `docs/step1.html` → `step8.html` | Documentație HTML pentru fiecare pas |

---

### S8-Appendix

| Fișier | Descriere |
|--------|-----------|
| `READMES8simplif...md` | README pentru kit-ul simplificat (6 pași) |
| `S8simplif...zip` | Variantă mai scurtă a kit-ului |
| `S8 Explicatii...zip` | Documente Word cu explicații detaliate |
| `S8a.html` → `S8h.html` | **8 prezentări HTML interactive** cu teorie și exemple |

#### Prezentările HTML (S8a-S8h)

| Fișier | Subiect |
|--------|---------|
| `S8a.html` | Fundamentele API-urilor RESTful și Express.js |
| `S8b.html` | Metodele HTTP și operațiile CRUD |
| `S8c.html` | Middleware în Express.js |
| `S8d.html` | Routing și parametri |
| `S8e.html` | Validare și sanitizare |
| `S8f.html` | Error handling |
| `S8g.html` | Securitate de bază |
| `S8h.html` | Best practices și deployment |

---

## 🎯 Cei 8 pași de învățare

### Vizualizare progresie

```
Pas 1          Pas 2          Pas 3          Pas 4
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ GET      │ → │ GET      │ → │ GET      │ → │ GET      │
│ /books   │   │ POST     │   │ POST     │   │ POST     │
│          │   │ /books   │   │ DELETE   │   │ DELETE   │
│          │   │          │   │ /books/:id   │ /status  │
└──────────┘   └──────────┘   └──────────┘   └──────────┘

Pas 5          Pas 6          Pas 7          Pas 8
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ /books   │ → │ + logging│ → │ + validare → │ + 404    │
│ /departments │ middleware│   │ middleware│   │ + 500    │
│ (CRUD)   │   │          │   │          │   │ handler  │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
```

### Detaliu pași

---

### 📘 Pasul 1 — Server Express minimal + `GET /books`

**Scop:** Prima aplicație Express care răspunde cu JSON.

```javascript
const express = require('express');
const { books } = require('./db');

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('<h1>STEP 1 – Server Express simplu</h1>');
});

app.get('/books', (req, res) => {
  const sorted = [...books].sort((a, b) =>
    a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
  );
  res.json(sorted);
});

app.listen(PORT, () => {
  console.log(`Server pornit pe http://localhost:${PORT}`);
});
```

**Endpoint-uri:** `GET /` · `GET /books`

**Ce învățăm:**
- Structura minimală Express: `app.get()`, `app.listen()`
- Răspuns JSON cu `res.json()`
- Import date din module locale

---

### 📘 Pasul 2 — `POST /books` + validare minimă

**Scop:** Crearea de resurse noi cu validare.

```javascript
app.use(express.json());  // Middleware pentru parsarea JSON

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      error: 'Câmpurile title și author sunt obligatorii.'
    });
  }

  const newBook = { id: generateBookId(), title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});
```

**Endpoint-uri:** `GET /books` · `POST /books`

**Ce învățăm:**
- Middleware `express.json()` pentru parsarea body-ului
- `req.body` — accesarea datelor din cerere
- Coduri de status: `201 Created`, `400 Bad Request`

---

### 📘 Pasul 3 — `DELETE /books/:id` (parametri de rută)

**Scop:** Ștergerea resurselor și utilizarea parametrilor URL.

```javascript
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Cartea nu a fost găsită.' });
  }

  books.splice(index, 1);
  res.status(204).send();  // No Content
});
```

**Endpoint-uri:** `GET /books` · `POST /books` · `DELETE /books/:id`

**Ce învățăm:**
- `req.params` — parametri din URL (`:id`)
- Codul `204 No Content` — succes fără body
- Codul `404 Not Found` — resursă inexistentă

---

### 📘 Pasul 4 — Router modular `/status`

**Scop:** Organizarea codului cu Express Router.

```javascript
// routes/status.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

// În step4.js:
const statusRouter = require('./routes/status');
app.use('/status', statusRouter);
```

**Endpoint-uri:** `GET /books` · `POST /books` · `DELETE /books/:id` · `GET /status`

**Ce învățăm:**
- `express.Router()` pentru modularizare
- `app.use('/prefix', router)` pentru montarea routerelor
- Separarea responsabilităților

---

### 📘 Pasul 5 — Router `/departments` + `db.js`

**Scop:** API cu multiple resurse.

```javascript
// routes/departments.js
const { departments, generateDepartmentId } = require('../db');

router.get('/', (req, res) => res.json(departments));

router.get('/:id', (req, res) => {
  const dept = departments.find(d => d.id === Number(req.params.id));
  if (!dept) return res.status(404).json({ error: 'Departament inexistent.' });
  res.json(dept);
});

router.post('/', validateDepartment, (req, res) => {
  const { name, floor } = req.body;
  const newDept = { id: generateDepartmentId(), name, floor };
  departments.push(newDept);
  res.status(201).json(newDept);
});

router.delete('/:id', (req, res) => {
  const index = departments.findIndex(d => d.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Departament inexistent.' });
  departments.splice(index, 1);
  res.status(204).send();
});
```

**Endpoint-uri Books:** `GET` · `POST` · `DELETE`  
**Endpoint-uri Departments:** `GET /departments` · `GET /departments/:id` · `POST /departments` · `DELETE /departments/:id`

---

### 📘 Pasul 6 — Middleware global de logging

**Scop:** Vizibilitate asupra tuturor cererilor HTTP.

```javascript
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
  });
  next();  // IMPORTANT: predă controlul mai departe
});
```

**Output în consolă:**
```
[2025-11-19T10:15:30.123Z] GET /books → 200 (3ms)
[2025-11-19T10:15:32.456Z] POST /books → 201 (5ms)
[2025-11-19T10:15:35.789Z] DELETE /books/1 → 204 (2ms)
```

**Ce învățăm:**
- Middleware-ul trebuie să apeleze `next()`
- Poziția middleware-ului contează (înainte de rute!)
- Event `res.on('finish')` pentru măsurarea timpului

---

### 📘 Pasul 7 — Validare prin middleware dedicat

**Scop:** Separarea logicii de validare de logica de business.

```javascript
function validateBook(req, res, next) {
  const { title, author } = req.body || {};

  if (!title || typeof title !== 'string') {
    return res.status(400).json({
      error: 'Câmpul "title" este obligatoriu și trebuie să fie string.'
    });
  }

  if (!author || typeof author !== 'string') {
    return res.status(400).json({
      error: 'Câmpul "author" este obligatoriu și trebuie să fie string.'
    });
  }

  next();  // Validare OK → continuă la handler
}

// Utilizare pe rută:
app.post('/books', validateBook, (req, res) => {
  // Handlerul se concentrează doar pe logica de salvare
  const newBook = { id: generateBookId(), ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});
```

**Ce învățăm:**
- Middleware poate fi aplicat pe rute specifice
- Separarea validării de business logic
- Pattern reutilizabil pentru validări complexe

---

### 📘 Pasul 8 — API complet: 404 + Error Handler global

**Scop:** Gestionarea coerentă a tuturor erorilor.

```javascript
// Toate rutele definite mai sus...

// Handler 404 — pentru rute inexistente (ÎNAINTE de error handler)
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Ruta nu a fost găsită.'
  });
});

// Handler global de erori — semnătură cu 4 argumente!
app.use((err, req, res, next) => {
  console.error('=== EROARE GLOBALĂ ===');
  console.error(err.stack);

  res.status(500).json({
    error: 'Eroare internă a serverului.',
    message: err.message
  });
});
```

**Testare error handler:**
```javascript
app.get('/error-test', (req, res, next) => {
  const err = new Error('Eroare intenționată pentru test.');
  next(err);  // Transmite eroarea către error handler
});
```

**Endpoint complet final:**

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| GET | `/` | Overview API |
| GET | `/books` | Lista cărți |
| POST | `/books` | Adaugă carte |
| DELETE | `/books/:id` | Șterge carte |
| GET | `/departments` | Lista departamente |
| GET | `/departments/:id` | Un departament |
| POST | `/departments` | Adaugă departament |
| DELETE | `/departments/:id` | Șterge departament |
| GET | `/error-test` | Testare error handler |

---

## 💾 Modelul de date

### `db.js` — Baza de date în memorie

```javascript
const books = [
  { id: 1, title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling' },
  { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' },
  { id: 3, title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling' },
  { id: 4, title: 'Fantastic Beasts and Where to Find Them', author: 'J.K. Rowling' }
];

const departments = [
  { id: 1, name: 'Gryffindor Library', floor: 1 },
  { id: 2, name: 'Ravenclaw Archive', floor: 2 },
  { id: 3, name: 'Slytherin Restricted Section', floor: -1 }
];
```

**⚠️ Notă:** Datele se resetează la fiecare repornire a serverului (sunt în memorie).

---

## 🏗️ Arhitectura API-ului

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│                  (Browser / Postman / curl)                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP Request
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS APP                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  MIDDLEWARE PIPELINE                      │  │
│  │                                                           │  │
│  │  1. express.json()          → Parsează body JSON          │  │
│  │  2. Logging middleware      → Loghează cererea            │  │
│  │  3. Rute / Routere          → Procesează cererea          │  │
│  │  4. 404 Handler             → Rute negăsite               │  │
│  │  5. Error Handler           → Erori interne               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────┐  ┌──────────────────┐  ┌─────────────────┐    │
│  │   /books    │  │   /departments   │  │    /status      │    │
│  │   Router    │  │      Router      │  │     Router      │    │
│  │             │  │                  │  │                 │    │
│  │ GET  /      │  │ GET  /           │  │ GET  /          │    │
│  │ POST /      │  │ GET  /:id        │  │                 │    │
│  │ DELETE /:id │  │ POST /           │  │                 │    │
│  │             │  │ DELETE /:id      │  │                 │    │
│  └─────────────┘  └──────────────────┘  └─────────────────┘    │
│                              │                                  │
│                              ▼                                  │
│                      ┌───────────────┐                          │
│                      │     db.js     │                          │
│                      │  (in-memory)  │                          │
│                      │               │                          │
│                      │ books[]       │                          │
│                      │ departments[] │                          │
│                      └───────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📈 Ghid de parcurgere

### Pentru începători (3-4 ore)

```
1. Citește documentul DOCX din S8-Teorie
       ↓
2. Dezarhivează S8kitNextlab.zip
       ↓
3. npm install && npm run menu
       ↓
4. Deschide http://localhost:3000 în browser
       ↓
5. Într-un alt terminal: npm run step1
       ↓
6. Testează GET /books în browser
       ↓
7. Treci la step2, step3... în ordine
       ↓
8. La fiecare pas, citește docs/stepX.html
```

### Pentru avansați (1-2 ore)

```
1. Sari direct la step8.js și analizează codul
       ↓
2. Importă colecția Postman și testează toate endpoint-urile
       ↓
3. Modifică db.js — adaugă noi câmpuri
       ↓
4. Implementează PUT /books/:id (actualizare)
       ↓
5. Adaugă un nou router pentru o resursă proprie
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune | Observații |
|------------|----------|------------|
| Node.js | 18+ | Runtime JavaScript |
| npm | 9+ | Package manager |
| Express | 4.21+ | Framework web |
| Postman | Latest | Testare API (opțional) |

### Alternative la Postman

- **Insomnia** — alternativă open-source
- **Thunder Client** — extensie VS Code
- **REST Client** — extensie VS Code
- **curl** — linie de comandă

---

## 🚀 Rulare rapidă

```bash
# 1. Dezarhivare și instalare
unzip S8kitNextlab.zip
cd S8-rest-express-8steps
npm install

# 2. Terminal 1: Pornește meniul (port 3000)
npm run menu
# → Deschide http://localhost:3000

# 3. Terminal 2: Pornește un pas (port 3001)
npm run step1    # sau step2, step3, ..., step8

# 4. Testare în browser
# http://localhost:3001/books
```

### Scripturi npm disponibile

| Script | Comandă | Descriere |
|--------|---------|-----------|
| `npm start` | `npm run menu` | Server meniu (port 3000) |
| `npm run step1` | `node step1.js` | Pasul 1 — GET simplu |
| `npm run step2` | `node step2.js` | Pasul 2 — POST |
| `npm run step3` | `node step3.js` | Pasul 3 — DELETE |
| `npm run step4` | `node step4.js` | Pasul 4 — Router modular |
| `npm run step5` | `node step5.js` | Pasul 5 — Departments |
| `npm run step6` | `node step6.js` | Pasul 6 — Logging |
| `npm run step7` | `node step7.js` | Pasul 7 — Validare |
| `npm run step8` | `node step8.js` | Pasul 8 — Complet |

---

## 🧪 Testare cu Postman

### GET /books

```
Method: GET
URL: http://localhost:3001/books
Headers: (none required)
Body: (none)

Response: 200 OK
[
  { "id": 1, "title": "...", "author": "..." },
  ...
]
```

### POST /books

```
Method: POST
URL: http://localhost:3001/books
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien"
}

Response: 201 Created
{
  "id": 5,
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien"
}
```

### DELETE /books/:id

```
Method: DELETE
URL: http://localhost:3001/books/3
Headers: (none required)
Body: (none)

Response: 204 No Content
(empty body)
```

### Testare 404

```
Method: GET
URL: http://localhost:3001/nonexistent

Response: 404 Not Found
{
  "error": "Ruta nu a fost găsită."
}
```

### Testare Error Handler

```
Method: GET
URL: http://localhost:3001/error-test

Response: 500 Internal Server Error
{
  "error": "Eroare internă a serverului.",
  "message": "Eroare intenționată pentru test."
}
```

---

## 🧠 Concepte cheie

### Metodele HTTP și semnificația lor

| Metodă | CRUD | Idempotent | Safe | Descriere |
|--------|------|------------|------|-----------|
| GET | Read | ✅ | ✅ | Obține resurse |
| POST | Create | ❌ | ❌ | Creează resurse noi |
| PUT | Update (full) | ✅ | ❌ | Înlocuiește complet |
| PATCH | Update (partial) | ❌ | ❌ | Modifică parțial |
| DELETE | Delete | ✅ | ❌ | Șterge resurse |

### Coduri de status HTTP

| Cod | Nume | Când se folosește |
|-----|------|-------------------|
| **200** | OK | Cerere reușită (GET, PUT, PATCH) |
| **201** | Created | Resursă creată (POST) |
| **204** | No Content | Succes fără body (DELETE) |
| **400** | Bad Request | Input invalid |
| **404** | Not Found | Resursă inexistentă |
| **409** | Conflict | Conflict (ex: ID duplicat) |
| **500** | Internal Server Error | Eroare server |

### Middleware în Express

```javascript
// Middleware = funcție cu (req, res, next)

// 1. Middleware global (toate rutele)
app.use((req, res, next) => {
  console.log('Cerere primită');
  next();  // OBLIGATORIU!
});

// 2. Middleware pe rută specifică
app.post('/books', validateBook, saveBook);

// 3. Error middleware (4 argumente!)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

### Diferența: `req.params` vs `req.query` vs `req.body`

```javascript
// URL: POST /books/42?sort=asc
// Body: { "title": "Test" }

app.post('/books/:id', (req, res) => {
  req.params.id;    // "42"     - din URL path
  req.query.sort;   // "asc"    - din query string (?sort=asc)
  req.body.title;   // "Test"   - din body JSON
});
```

---

## 📝 Exerciții propuse

### Nivel 1 — Înțelegere

1. **Testează toate endpoint-urile** din pasul 8 cu Postman și verifică răspunsurile.

2. **Adaugă câmpul `year`** la cărți în `db.js` și modifică validarea.

3. **Creează o cerere POST invalidă** (fără `title`) și observă răspunsul 400.

### Nivel 2 — Aplicare

4. **Implementează `PUT /books/:id`** pentru actualizarea completă a unei cărți.

5. **Adaugă filtrare** pe `GET /books?author=Rowling` pentru a returna doar cărțile unui autor.

6. **Creează un nou router `/users`** cu operații CRUD complete.

### Nivel 3 — Sinteză

7. **Implementează paginare** pe `GET /books?page=1&limit=10`.

8. **Adaugă rate limiting** — maxim 100 cereri/minut per IP.

9. **Conectează la SQLite** în loc de array-uri în memorie (pregătire pentru S9-S10).

---

## 📚 Referințe

### Documentație oficială
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MDN: HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [MDN: HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### Tutoriale recomandate
- [REST API Tutorial](https://restfulapi.net/)
- [Express.js Crash Course](https://www.youtube.com/watch?v=L72fhGm1tfE)

### Instrumente
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [httpstat.us](https://httpstat.us/) — Testare coduri de status

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

---

<div align="center">

**🚀 Material didactic pentru Seminarul S8**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția API-ului în 8 pași:**

```
Step 1     Step 2     Step 3     Step 4     Step 5     Step 6     Step 7     Step 8
──────     ──────     ──────     ──────     ──────     ──────     ──────     ──────
  GET   →   POST   →  DELETE  →  Router  → 2 resurse→ Logging → Validare→  Erori
/books    /books    /books/:id  modular   /depts    middleware middleware  404+500
```

---

**De la date hardcodate la API complet:**

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│   db.js    │ ──▶ │  Express   │ ──▶ │ Middleware │ ──▶ │   Client   │
│  (date)    │     │  (routing) │     │ (validare) │     │ (Postman)  │
└────────────┘     └────────────┘     └────────────┘     └────────────┘
```

</div>
