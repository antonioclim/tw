# 🚀 S8 – Servicii RESTful și Express.js – Starter Kit

> Kit didactic pentru construirea treptată a unui API RESTful în **Node.js** cu **Express.js**, structurat în 6 pași progresivi.

---

## 📋 Cuprins

- [Scopul Kit-ului](#-scopul-kit-ului)
- [Structura Proiectului](#-structura-proiectului)
- [Cerințe de Sistem](#-cerințe-de-sistem)
- [Instalare Rapidă](#-instalare-rapidă)
- [Pornirea Kit-ului](#-pornirea-kit-ului)
- [Modelul de Date](#-modelul-de-date)
- [Configurarea Postman](#-configurarea-postman)
- [Pașii de Învățare](#-pașii-de-învățare)
  - [Pasul 1 – Server Simplu + GET](#pasul-1--server-simplu--get-books)
  - [Pasul 2 – POST + Validare](#pasul-2--post-books--validare-minimă)
  - [Pasul 3 – DELETE + Parametri](#pasul-3--parametri-de-rută--delete-booksid)
  - [Pasul 4 – Router Modular](#pasul-4--router-modular--endpoint-status)
  - [Pasul 5 – Middleware Logging](#pasul-5--middleware-de-logging)
  - [Pasul 6 – Error Handling](#pasul-6--handler-global-de-erori)
- [Probleme Frecvente](#-probleme-frecvente-și-soluții)
- [Extensii pentru Proiecte Reale](#-extensii-pentru-proiecte-reale)
- [Principii RESTful](#-principii-restful-fundamentale)

---

## 🎯 Scopul Kit-ului

Acest proiect este conceput ca **suport de laborator** pentru tema:

### **„S8 – Servicii RESTful și Express.js"**

### 🎓 Obiective Principale

✅ **Înțelegerea API-urilor RESTful** – construirea serviciilor web peste HTTP  
✅ **Stăpânirea Express.js** – rutare, middleware, gestionare erori  
✅ **Operații CRUD** – Create, Read, Update, Delete pe resurse  
✅ **Testare cu Postman** – verificarea comportamentului API-ului  
✅ **Pregătire pentru producție** – integrare cu baze de date reale

### 📚 Metodologia Didactică

Învățarea este structurată în **6 pași progresivi**, fiecare adăugând **un singur concept nou**, menținând restul codului similar pentru claritate și continuitate.

**Aceeași resursă, evoluție progresivă:**
- 🎯 Resursa centrală: `books` (listă de cărți)
- 📈 Complexitate crescândă: de la GET simplu la error handling complet
- 🔄 Cod reutilizabil: fiecare pas construiește pe cel anterior

---

## 📁 Structura Proiectului

```
S8-rest-express-starterkit/
│
├── 📦 package.json              # Scripturi npm + dependențe
├── 📦 package-lock.json         # Lock file pentru versiuni
├── 📄 README.md                 # Documentația completă (acest fișier)
│
├── 🌐 server.js                 # Server de meniu (port 3000)
│
├── 📘 step1.js                  # Pasul 1 – GET /books (sortat)
├── 📘 step2.js                  # Pasul 2 – POST /books + validare
├── 📘 step3.js                  # Pasul 3 – DELETE /books/:id
├── 📘 step4.js                  # Pasul 4 – Router modular + /status
├── 📘 step5.js                  # Pasul 5 – Middleware logging
├── 📘 step6.js                  # Pasul 6 – Error handling complet
│
├── 📂 docs/                     # Documentație HTML pentru fiecare pas
│   ├── step1.html
│   ├── step2.html
│   ├── step3.html
│   ├── step4.html
│   ├── step5.html
│   └── step6.html
│
└── 📂 public/
    └── index.html               # Pagina de meniu interactivă
```

---

## 🔌 Schema de Porturi

### ⚠️ IMPORTANT: Toți pașii rulează pe ACELAȘI port!

| Server | Port | Observații |
|--------|------|------------|
| 🌐 **Meniu** (`server.js`) | `3000` | Pornește **mereu** pentru navigare |
| 📘 **Step 1-6** (`step1.js` ... `step6.js`) | `3001` | Rulează **doar unul odată**! |

### 🔴 Regulă Critică

```
⚠️ Opriți un step înainte de a porni altul!
⚠️ Un singur stepX.js activ pe portul 3001 la un moment dat!
```

**De ce?**  
Dacă încercați să porniți `step2` în timp ce `step1` încă rulează, veți primi eroarea:
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Soluția:**  
```bash
# În terminalul unde rulează step1:
CTRL + C  # oprește serverul

# Apoi pornești următorul:
npm run step2
```

---

## 💻 Cerințe de Sistem

### Software Necesar

| Tool | Versiune Minimă | Verificare | Link |
|------|----------------|------------|------|
| **Node.js** | ≥ 18.x | `node -v` | [nodejs.org](https://nodejs.org/) |
| **npm** | (vine cu Node) | `npm -v` | - |
| **Editor** | - | - | [VS Code](https://code.visualstudio.com/) |
| **Postman** | Latest | - | [postman.com](https://www.postman.com/) |

### Verificare Rapidă

```bash
# Verificați versiunile instalate:
node -v   # Ex: v18.17.0
npm -v    # Ex: 9.6.7
```

---

## ⚙️ Instalare Rapidă

### Pașii de Instalare

#### 1️⃣ Dezarhivare

Extrageți kit-ul într-un director local:
```
Z:\tw\SxTEST\FAZA8\S8-rest-express-starterkit
```

#### 2️⃣ Navigare

```bash
cd Z:\tw\SxTEST\FAZA8\S8-rest-express-starterkit
```

#### 3️⃣ Instalare Dependențe

```bash
npm install
```

**Ce instalează?**
- `express@^4.19.0` – framework-ul web

#### 4️⃣ Verificare package.json

Fișierul `package.json` ar trebui să conțină:

```json
{
  "name": "s8-rest-express-starterkit",
  "version": "1.0.0",
  "description": "Kit didactic pentru REST API cu Express.js",
  "scripts": {
    "menu": "node server.js",
    "step1": "node step1.js",
    "step2": "node step2.js",
    "step3": "node step3.js",
    "step4": "node step4.js",
    "step5": "node step5.js",
    "step6": "node step6.js"
  },
  "dependencies": {
    "express": "^4.19.0"
  }
}
```

---

## 🎮 Pornirea Kit-ului

### Workflow Recomandat

#### 🌐 Pas 1: Pornește Meniul (Opțional dar Util)

```bash
npm run menu
```

Deschide în browser:
```
http://localhost:3000/
```

**Ce oferă meniul?**
- 📋 Lista completă a pașilor
- 🔗 Butoane pentru deschiderea fiecărui API
- 📖 Link-uri către documentația HTML
- 🎯 Navigare intuitivă între pași

> 💡 **Sfat:** Păstrați meniul deschis într-un tab separat pentru acces rapid la documentație!

---

#### 📘 Pas 2: Rulează un Step Individual

##### Exemplu pentru Step 1:

```bash
npm run step1
```

**Output așteptat:**
```
STEP 1 running at http://localhost:3001
Server pentru Pasul 1 pornit pe portul 3001
```

##### Acum API-ul este disponibil la:
```
http://localhost:3001/books
```

---

#### 🔄 Pas 3: Schimbă între Pași

**Pentru a trece la alt pas:**

```bash
# În terminalul unde rulează step1:
CTRL + C

# Pornește următorul pas:
npm run step2
```

**Output așteptat:**
```
STEP 2 running at http://localhost:3001
Server pentru Pasul 2 pornit pe portul 3001
```

---

### 📊 Rezumat Comenzi

| Comandă | Acțiune | Port |
|---------|---------|------|
| `npm run menu` | Pornește meniul | 3000 |
| `npm run step1` | Rulează Pasul 1 | 3001 |
| `npm run step2` | Rulează Pasul 2 | 3001 |
| `npm run step3` | Rulează Pasul 3 | 3001 |
| `npm run step4` | Rulează Pasul 4 | 3001 |
| `npm run step5` | Rulează Pasul 5 | 3001 |
| `npm run step6` | Rulează Pasul 6 | 3001 |

---

## 📊 Modelul de Date

### Structura Resursei `books`

Toate fișierele `stepX.js` folosesc **același model simplu** – un array în memorie:

```javascript
let books = [
  { 
    id: 1, 
    title: 'Clean Code', 
    author: 'Robert C. Martin' 
  },
  { 
    id: 2, 
    title: 'The Pragmatic Programmer', 
    author: 'Andrew Hunt, David Thomas' 
  },
  { 
    id: 3, 
    title: "Harry Potter and the Philosopher's Stone", 
    author: 'J.K. Rowling' 
  }
];
```

### 🎯 Scop Didactic

✅ **Exemplu clar** de resursă RESTful  
✅ **Ușor de vizualizat** în browser și Postman  
✅ **Rapid de modificat** pentru experimente  
✅ **Fără dependențe** – nu necesită bază de date

### 🔄 Schema Câmpurilor

| Câmp | Tip | Obligatoriu | Descriere |
|------|-----|-------------|-----------|
| `id` | `number` | ✅ Da | Identificator unic |
| `title` | `string` | ✅ Da | Titlul cărții |
| `author` | `string` | ✅ Da | Autorul cărții |

### 🚀 Tranziția către Producție

În aplicații reale, acest array devine:

**SQL (PostgreSQL, MySQL, SQLite):**
```javascript
const books = await db.query('SELECT * FROM books');
```

**NoSQL (MongoDB):**
```javascript
const books = await Book.find();
```

**ORM (Sequelize, TypeORM):**
```javascript
const books = await Book.findAll();
```

> 💡 **Important:** Structura Express rămâne aproape identică – doar sursă datelor se schimbă!

---

## 🔧 Configurarea Postman

### Setup Rapid în 4 Pași

#### 1️⃣ Creează o Colecție

- Deschide Postman
- Click: **New** → **Collection**
- Nume: `S8 REST Express`

#### 2️⃣ Creează Request-uri Template

Vom crea 3 request-uri de bază pe care le vei reutiliza:

---

##### 📗 GET – Citire Cărți

```
Method: GET
URL: http://localhost:3001/books
Headers: (nu este necesar)
Body: (nu este necesar)
```

**Salvează ca:** `GET All Books`

---

##### 📘 POST – Creare Carte

```
Method: POST
URL: http://localhost:3001/books
Headers:
  Content-Type: application/json
Body → raw → JSON:
{
  "id": 4,
  "title": "Test Book",
  "author": "Grupa 1"
}
```

**Salvează ca:** `POST New Book`

---

##### 📕 DELETE – Ștergere Carte

```
Method: DELETE
URL: http://localhost:3001/books/4
Headers: (nu este necesar)
Body: (nu este necesar)
```

**Salvează ca:** `DELETE Book by ID`

> ⚠️ **Notă:** Schimbă `4` cu ID-ul real al cărții pe care vrei să o ștergi!

---

#### 3️⃣ Variabile de Mediu (Opțional)

Pentru flexibilitate, poți crea o variabilă pentru port:

**Environment Variables:**
```
baseUrl = http://localhost:3001
```

**Apoi în requests:**
```
{{baseUrl}}/books
{{baseUrl}}/books/4
```

---

#### 4️⃣ Teste Automate (Bonus)

Poți adăuga **teste automate** în tab-ul Tests:

```javascript
// Pentru GET /books
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is an array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});
```

---

## 📖 Pașii de Învățare

---

## Pasul 1 – Server Simplu + GET /books

**📁 Fișier:** `step1.js`  
**🔌 Port:** `3001`  
**⏱️ Durata:** 15-20 minute

### 🎯 Concept Nou

Primul server Express + rută GET care returnează lista de cărți **sortată alfabetic**.

### 💡 Ce Înveți

✅ Inițializarea unui server Express  
✅ Definirea unei rute `GET`  
✅ Trimiterea răspunsurilor JSON  
✅ Sortarea datelor înainte de răspuns  
✅ Legătura dintre rută și metodă HTTP

### 💻 Cod Minimal (Concept)

```javascript
const express = require('express');
const app = express();

let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas' },
  { id: 3, title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling' }
];

// Ruta principală - returnează cărți sortate alfabetic
app.get('/books', (req, res) => {
  const sorted = [...books].sort((a, b) => 
    a.title.localeCompare(b.title)
  );
  res.json(sorted);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`STEP 1 running at http://localhost:${PORT}`);
});
```

### 🚀 Cum Rulezi

```bash
npm run step1
```

### ✅ Testare Completă

#### 📱 Test 1: Browser

```
http://localhost:3001/books
```

**Rezultat așteptat:**
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin"
  },
  {
    "id": 3,
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "J.K. Rowling"
  },
  {
    "id": 2,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas"
  }
]
```

> 💡 Observă ordinea alfabetică după `title`!

---

#### 🔧 Test 2: Postman

```
GET http://localhost:3001/books
```

**Verificări:**
- ✅ Status: `200 OK`
- ✅ Content-Type: `application/json`
- ✅ Body: Array cu 3 cărți
- ✅ Ordine alfabetică după titlu

---

### 🎓 Observații Didactice

#### De ce `res.json()`?

```javascript
res.json(sorted);  // ✅ Preferabil
// vs
res.send(JSON.stringify(sorted));  // ❌ Mai complicat
```

**Avantaje `res.json()`:**
- Setează automat `Content-Type: application/json`
- Convertește automat obiectul în JSON
- Cod mai curat și mai expresiv

---

#### De ce sortăm datele?

```javascript
const sorted = [...books].sort((a, b) => 
  a.title.localeCompare(b.title)
);
```

**Principii:**
- ✅ **Procesare server-side** – clientul primește date gata procesate
- ✅ **Consistență** – ordinea este mereu aceeași
- ✅ **Exemplu practic** – ilustrează transformarea datelor

> 💡 **Notă:** `[...books]` creează o copie – nu modificăm array-ul original!

---

### 🧪 Exerciții de Extindere

#### Exercițiu 1: Endpoint fără Sortare

Adaugă o rută nouă care returnează cărțile în ordinea originală:

```javascript
app.get('/books/raw', (req, res) => {
  res.json(books);
});
```

**Testează:**
```
GET http://localhost:3001/books/raw
```

---

#### Exercițiu 2: Counter de Cărți

Implementează un endpoint care returnează numărul total de cărți:

```javascript
app.get('/books/count', (req, res) => {
  res.json({ 
    count: books.length,
    timestamp: new Date().toISOString()
  });
});
```

**Testează:**
```
GET http://localhost:3001/books/count
```

**Rezultat așteptat:**
```json
{
  "count": 3,
  "timestamp": "2025-11-18T10:30:00.000Z"
}
```

---

#### Exercițiu 3: Filtrare după Autor

Adaugă posibilitatea de a filtra cărțile după autor:

```javascript
app.get('/books/by-author/:authorName', (req, res) => {
  const { authorName } = req.params;
  const filtered = books.filter(book => 
    book.author.toLowerCase().includes(authorName.toLowerCase())
  );
  res.json(filtered);
});
```

**Testează:**
```
GET http://localhost:3001/books/by-author/robert
```

---

### 📋 Checklist Pas 1

- [ ] Server pornește fără erori
- [ ] `GET /books` returnează 200 OK
- [ ] Cărțile sunt sortate alfabetic
- [ ] JSON-ul este valid și formatat
- [ ] Browser afișează datele corect
- [ ] Postman primește răspunsul corect

---

## Pasul 2 – POST /books + Validare Minimă

**📁 Fișier:** `step2.js`  
**🔌 Port:** `3001`  
**⏱️ Durata:** 20-25 minute

### 🎯 Concept Nou

Trimiterea de date în corpul cererii și crearea de resurse noi cu **validare**.

### 💡 Ce Înveți

✅ Middleware `express.json()` pentru parsarea body-ului  
✅ Metoda `POST` pentru crearea resurselor  
✅ Validarea datelor din `req.body`  
✅ Coduri HTTP corecte (201, 400, 409)  
✅ Prevenirea duplicatelor

### 🆕 Diferențe față de Pasul 1

#### 1. Middleware pentru Parsarea JSON

```javascript
// TREBUIE adăugat ÎNAINTE de rute!
app.use(express.json());
```

**Ce face?**
- Parsează automat body-ul JSON
- Pune datele în `req.body`
- Fără el, `req.body` va fi `undefined`!

---

#### 2. Rută POST cu Validare

```javascript
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  
  // Validare: câmpuri obligatorii
  if (!id || !title || !author) {
    return res.status(400).json({ 
      error: 'Câmpurile id, title și author sunt obligatorii' 
    });
  }
  
  // Validare: tipuri de date
  if (typeof id !== 'number') {
    return res.status(400).json({ 
      error: 'Câmpul id trebuie să fie număr' 
    });
  }
  
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ 
      error: 'Câmpul title trebuie să fie string ne-vid' 
    });
  }
  
  // Validare: duplicat
  if (books.find(b => b.id === id)) {
    return res.status(409).json({ 
      error: `O carte cu id=${id} există deja` 
    });
  }
  
  // Creare resursă nouă
  const newBook = { id, title, author };
  books.push(newBook);
  
  // Succes: 201 Created
  res.status(201).json(newBook);
});
```

### 🚀 Cum Rulezi

```bash
# Oprește step1 dacă rulează:
CTRL + C

# Pornește step2:
npm run step2
```

### ✅ Testare Completă în Postman

#### 📱 Test 1: GET Inițial

```
GET http://localhost:3001/books
```

**Rezultat:** 3 cărți (lista inițială)

---

#### 📱 Test 2: POST Valid – Succes

```
POST http://localhost:3001/books
Body (raw, JSON):
{
  "id": 4,
  "title": "Design Patterns",
  "author": "Erich Gamma"
}
```

**Rezultat așteptat:**
```
Status: 201 Created
Body:
{
  "id": 4,
  "title": "Design Patterns",
  "author": "Erich Gamma"
}
```

---

#### 📱 Test 3: GET După POST

```
GET http://localhost:3001/books
```

**Rezultat:** 4 cărți (include noua carte)

---

#### 📱 Test 4: POST Invalid – Lipsește Title

```
POST http://localhost:3001/books
Body:
{
  "id": 5,
  "author": "Anonim"
}
```

**Rezultat așteptat:**
```
Status: 400 Bad Request
Body:
{
  "error": "Câmpurile id, title și author sunt obligatorii"
}
```

---

#### 📱 Test 5: POST Invalid – ID Duplicat

```
POST http://localhost:3001/books
Body:
{
  "id": 4,
  "title": "Alt Titlu",
  "author": "Alt Autor"
}
```

**Rezultat așteptat:**
```
Status: 409 Conflict
Body:
{
  "error": "O carte cu id=4 există deja"
}
```

---

#### 📱 Test 6: POST Invalid – ID Nu e Număr

```
POST http://localhost:3001/books
Body:
{
  "id": "patru",
  "title": "Carte Nouă",
  "author": "Autor Nou"
}
```

**Rezultat așteptat:**
```
Status: 400 Bad Request
Body:
{
  "error": "Câmpul id trebuie să fie număr"
}
```

---

### 📊 Coduri HTTP Folosite

| Cod | Nume | Când se folosește |
|-----|------|-------------------|
| `200 OK` | Succes | GET reușit |
| `201 Created` | Creat | POST reușit – resursă nouă |
| `400 Bad Request` | Cerere invalidă | Date lipsă sau invalide |
| `409 Conflict` | Conflict | Resursă duplicată |

---

### 🎓 Observații Didactice

#### De ce 201 în loc de 200?

```javascript
res.status(201).json(newBook);  // ✅ Corect
// vs
res.status(200).json(newBook);  // ❌ Semantic incorect
```

**Motive:**
- `201 Created` indică explicit că s-a creat o resursă nouă
- Respectă standardul HTTP/REST
- Ajută clienții să distingă între citire și creare

---

#### De ce `return` în validări?

```javascript
if (!id) {
  return res.status(400).json({...});  // ✅ Cu return
}
// Cod continuă doar dacă validarea trece
```

**Fără `return`:**
```javascript
if (!id) {
  res.status(400).json({...});  // ❌ Fără return
}
books.push(newBook);  // ⚠️ Execută și acest cod!
// Eroare: Cannot set headers after they are sent
```

---

### 🧪 Exerciții de Extindere

#### Exercițiu 1: Validare Avansată

Creează o funcție separată pentru validare:

```javascript
function validateBook(book) {
  const errors = [];
  
  if (!book.id) errors.push('Câmpul id lipsește');
  if (typeof book.id !== 'number') errors.push('id trebuie să fie număr');
  if (book.id <= 0) errors.push('id trebuie să fie pozitiv');
  
  if (!book.title) errors.push('Câmpul title lipsește');
  if (typeof book.title !== 'string') errors.push('title trebuie să fie string');
  if (book.title.trim().length === 0) errors.push('title nu poate fi gol');
  if (book.title.length > 200) errors.push('title prea lung (max 200)');
  
  if (!book.author) errors.push('Câmpul author lipsește');
  if (typeof book.author !== 'string') errors.push('author trebuie să fie string');
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// În rută:
app.post('/books', (req, res) => {
  const validation = validateBook(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({ 
      error: 'Date invalide',
      details: validation.errors 
    });
  }
  
  // Continuă cu verificare duplicat și salvare...
});
```

---

#### Exercițiu 2: Generare Automată ID

Implementează un sistem care generează automat ID-uri:

```javascript
let nextId = 4;  // Începe de la 4 (avem deja 1, 2, 3)

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  // Validare doar pentru title și author
  // ID-ul se generează automat
  
  const newBook = {
    id: nextId++,
    title,
    author
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});
```

---

#### Exercițiu 3: Normalizare Date

Normalizează datele înainte de salvare:

```javascript
app.post('/books', (req, res) => {
  const { id, title, author } = req.body;
  
  // Normalizare
  const normalizedBook = {
    id: Number(id),
    title: title.trim(),
    author: author.trim()
  };
  
  // Validare pe date normalizate
  // ...
  
  books.push(normalizedBook);
  res.status(201).json(normalizedBook);
});
```

---

### 📋 Checklist Pas 2

- [ ] `express.json()` este adăugat
- [ ] POST funcționează cu date valide (201)
- [ ] POST respinge date invalide (400)
- [ ] POST respinge duplicate (409)
- [ ] Validarea verifică toate câmpurile
- [ ] Mesajele de eroare sunt clare
- [ ] GET arată cărțile noi adăugate

---

## Pasul 3 – Parametri de Rută + DELETE /books/:id

**📁 Fișier:** `step3.js`  
**🔌 Port:** `3001`  
**⏱️ Durata:** 20 minute

### 🎯 Concept Nou

Parametri dinamici de rută (`:id`) și operația de **ștergere** a resurselor.

### 💡 Ce Înveți

✅ Parametri de rută cu sintaxa `:paramName`  
✅ Accesarea parametrilor prin `req.params`  
✅ Metoda `DELETE` pentru ștergerea resurselor  
✅ Codurile `204 No Content` și `404 Not Found`  
✅ Diferența dintre URL params, query params și body

### 🆕 Rută DELETE

```javascript
app.delete('/books/:id', (req, res) => {
  // 1. Extrage ID-ul din URL
  const id = Number(req.params.id);
  
  // 2. Caută cartea în array
  const index = books.findIndex(book => book.id === id);
  
  // 3. Dacă nu există, returnează 404
  if (index === -1) {
    return res.status(404).json({ 
      error: `Nu există carte cu id=${id}`,
      availableIds: books.map(b => b.id)
    });
  }
  
  // 4. Șterge cartea
  books.splice(index, 1);
  
  // 5. Răspuns 204 No Content (fără body)
  res.status(204).send();
});
```

### 🚀 Cum Rulezi

```bash
# Oprește step2:
CTRL + C

# Pornește step3:
npm run step3
```

### ✅ Testare Completă în Postman

#### 📱 Test 1: Adaugă Cărți de Test

```
POST http://localhost:3001/books
Body:
{
  "id": 4,
  "title": "Carte de Test 1",
  "author": "Autor Test"
}
```

```
POST http://localhost:3001/books
Body:
{
  "id": 5,
  "title": "Carte de Test 2",
  "author": "Autor Test"
}
```

**Rezultat:** Două cărți noi adăugate (201 Created)

---

#### 📱 Test 2: Verifică Lista

```
GET http://localhost:3001/books
```

**Rezultat:** 5 cărți în total

---

#### 📱 Test 3: DELETE Carte Existentă

```
DELETE http://localhost:3001/books/4
```

**Rezultat așteptat:**
```
Status: 204 No Content
Body: (gol - nu se returnează nimic)
```

---

#### 📱 Test 4: Verifică Ștergerea

```
GET http://localhost:3001/books
```

**Rezultat:** 4 cărți (cartea cu id=4 a dispărut)

---

#### 📱 Test 5: DELETE ID Inexistent

```
DELETE http://localhost:3001/books/9999
```

**Rezultat așteptat:**
```
Status: 404 Not Found
Body:
{
  "error": "Nu există carte cu id=9999",
  "availableIds": [1, 2, 3, 5]
}
```

---

#### 📱 Test 6: DELETE Aceeași Carte de Două Ori

```
DELETE http://localhost:3001/books/4
```

**Prima dată:** 204 No Content  
**A doua oară:** 404 Not Found (cartea nu mai există)

---

### 🎓 Observații Didactice

#### Anatomia unui Path Parameter

```javascript
app.delete('/books/:id', ...)
            ↑       ↑
            |       |
         rută    parametru dinamic
```

**Exemple de URL-uri care match:**
- ✅ `/books/1` → `req.params.id` = `"1"`
- ✅ `/books/42` → `req.params.id` = `"42"`
- ✅ `/books/abc` → `req.params.id` = `"abc"`

**Exemple care NU match:**
- ❌ `/books` (lipsește ID-ul)
- ❌ `/books/1/edit` (segmente în plus)

---

#### De ce `Number(req.params.id)`?

```javascript
const id = Number(req.params.id);
```

**Motive:**
- `req.params.id` este **mereu string**
- Modelul nostru folosește ID-uri numerice
- Comparația `"4" === 4` este `false` în JavaScript!

```javascript
// ❌ Greșit (compară string cu number):
const index = books.findIndex(book => book.id === req.params.id);

// ✅ Corect (convertește la number):
const id = Number(req.params.id);
const index = books.findIndex(book => book.id === id);
```

---

#### De ce 204 în loc de 200?

```javascript
res.status(204).send();  // ✅ Corect
// vs
res.status(200).json({ message: 'Deleted' });  // ❌ Verbose
```

**Motive:**
- `204 No Content` înseamnă „succes, dar nu am nimic de returnat"
- Clienții știu că ștergerea a reușit doar din status code
- Economie de bandwidth (nu trimitem body inutil)

---

#### Path vs Query vs Body

| Tip | Sintaxă | Acces | Exemplu | Folosire |
|-----|---------|-------|---------|----------|
| **Path** | `/books/:id` | `req.params.id` | `/books/4` | Identificare resursă |
| **Query** | `/books?author=X` | `req.query.author` | `/books?author=Rowling` | Filtrare, sortare |
| **Body** | POST/PUT | `req.body` | `{"title": "..."}` | Date complexe |

---

### 🧪 Exerciții de Extindere

#### Exercițiu 1: GET Carte Individuală

Implementează ruta pentru a obține o singură carte:

```javascript
app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return res.status(404).json({ 
      error: `Nu există carte cu id=${id}` 
    });
  }
  
  res.json(book);
});
```

**Testează:**
```
GET http://localhost:3001/books/1
→ 200 OK + cartea
GET http://localhost:3001/books/999
→ 404 Not Found
```

---

#### Exercițiu 2: Ștergere cu Confirmare

Adaugă un query parameter pentru confirmare:

```javascript
app.delete('/books/:id', (req, res) => {
  const { confirm } = req.query;
  
  if (confirm !== 'true') {
    return res.status(400).json({ 
      error: 'Adaugă ?confirm=true pentru a confirma ștergerea' 
    });
  }
  
  // Continuă cu ștergerea normală...
});
```

**Testează:**
```
DELETE http://localhost:3001/books/4
→ 400 Bad Request (lipsește confirmare)

DELETE http://localhost:3001/books/4?confirm=true
→ 204 No Content (șters cu succes)
```

---

#### Exercițiu 3: Ștergere Multiplă

Implementează ștergerea mai multor cărți odată:

```javascript
app.post('/books/delete-many', (req, res) => {
  const { ids } = req.body;  // Array de ID-uri
  
  if (!Array.isArray(ids)) {
    return res.status(400).json({ 
      error: 'ids trebuie să fie array' 
    });
  }
  
  const deletedIds = [];
  ids.forEach(id => {
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
      books.splice(index, 1);
      deletedIds.push(id);
    }
  });
  
  res.json({ 
    deletedCount: deletedIds.length,
    deletedIds: deletedIds 
  });
});
```

**Testează:**
```
POST http://localhost:3001/books/delete-many
Body:
{
  "ids": [1, 2, 999]
}

→ 200 OK
{
  "deletedCount": 2,
  "deletedIds": [1, 2]
}
```

---

### 📋 Checklist Pas 3

- [ ] DELETE funcționează pentru ID existent (204)
- [ ] DELETE returnează 404 pentru ID inexistent
- [ ] ID-ul este extras corect din URL
- [ ] Conversia la număr funcționează
- [ ] GET confirmă că cartea a fost ștearsă
- [ ] Mesajele de eroare sunt clare

---

## Pasul 4 – Router Modular + Endpoint /status

**📁 Fișier:** `step4.js`  
**🔌 Port:** `3001`  
**⏱️ Durata:** 25 minute

### 🎯 Concepte Noi

- `express.Router()` pentru organizarea modulară a codului
- Endpoint de **health check** pentru monitorizare
- Separarea logică a rutelor pe domenii

### 💡 Ce Înveți

✅ Crearea și utilizarea routerelor  
✅ Montarea routerelor sub prefixe  
✅ Organizarea codului pentru scalabilitate  
✅ Implementarea endpoint-urilor de status  
✅ Best practices pentru structură API

### 💻 Structură Modulară Completă

```javascript
const express = require('express');
const app = express();

// Middleware global
app.use(express.json());

// ==================== ARRAY CĂRȚI ====================
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas' },
  { id: 3, title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling' }
];

// ==================== ROUTER BOOKS ====================
const booksRouter = express.Router();

// GET /books
booksRouter.get('/', (req, res) => {
  const sorted = [...books].sort((a, b) => 
    a.title.localeCompare(b.title)
  );
  res.json(sorted);
});

// POST /books
booksRouter.post('/', (req, res) => {
  const { id, title, author } = req.body;
  
  if (!id || !title || !author) {
    return res.status(400).json({ 
      error: 'Câmpurile obligatorii lipsesc' 
    });
  }
  
  if (books.find(b => b.id === id)) {
    return res.status(409).json({ 
      error: `Cartea cu id=${id} există deja` 
    });
  }
  
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE /books/:id
booksRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex(b => b.id === id);
  
  if (index === -1) {
    return res.status(404).json({ 
      error: `Nu există carte cu id=${id}` 
    });
  }
  
  books.splice(index, 1);
  res.status(204).send();
});

// Montăm routerul books
app.use('/books', booksRouter);

// ==================== ROUTER STATUS ====================
const statusRouter = express.Router();

// GET /status
statusRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    booksCount: books.length
  });
});

// Montăm routerul status
app.use('/status', statusRouter);

// ==================== START SERVER ====================
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`STEP 4 running at http://localhost:${PORT}`);
});
```

### 🚀 Cum Rulezi

```bash
# Oprește step3:
CTRL + C

# Pornește step4:
npm run step4
```

### ✅ Testare Completă

#### 📱 Test 1: Health Check

```
GET http://localhost:3001/status
```

**Rezultat așteptat:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-18T10:30:45.123Z",
  "uptime": 15.234,
  "booksCount": 3
}
```

**Ce înseamnă fiecare câmp:**
- `status` – starea serverului (ok/error)
- `timestamp` – momentul actual ISO
- `uptime` – câte secunde rulează serverul
- `booksCount` – numărul curent de cărți

---

#### 📱 Test 2: Operații CRUD pe Books

Toate rutele din pașii anteriori funcționează:

```
GET    http://localhost:3001/books
POST   http://localhost:3001/books
DELETE http://localhost:3001/books/:id
```

> 💡 **Observație:** URL-urile sunt identice! Routerul este doar o reorganizare internă.

---

#### 📱 Test 3: Verificare Dinamică Status

```bash
# Adaugă o carte:
POST http://localhost:3001/books
Body: {"id": 4, "title": "Test", "author": "Autor"}

# Verifică status:
GET http://localhost:3001/status
→ booksCount: 4 (s-a actualizat!)
```

---

### 🎓 Observații Didactice

#### Cum Funcționează Routerele?

```javascript
// 1. Creăm un router
const booksRouter = express.Router();

// 2. Definim rute RELATIVE la router
booksRouter.get('/', ...);      // -> /books
booksRouter.post('/', ...);     // -> /books
booksRouter.delete('/:id', ...); // -> /books/:id

// 3. Montăm routerul sub un PREFIX
app.use('/books', booksRouter);
```

**Flow-ul complet:**
```
Request: GET /books
         ↓
app.use('/books', booksRouter)  ← Se potrivește prefixul
         ↓
booksRouter.get('/', ...)       ← Se potrivește ruta relativă
         ↓
Handler execută
```

---

#### Avantajele Routerelor

| Fără Router | Cu Router |
|-------------|-----------|
| `app.get('/books', ...)` | `booksRouter.get('/', ...)` |
| `app.post('/books', ...)` | `booksRouter.post('/', ...)` |
| `app.delete('/books/:id', ...)` | `booksRouter.delete('/:id', ...)` |

**Beneficii:**
- ✅ **Modularitate** – fiecare resursă în propriul router
- ✅ **Reutilizare** – routerul poate fi exportat în fișier separat
- ✅ **Scalabilitate** – ușor de adăugat `/users`, `/orders`, etc.
- ✅ **Claritate** – separă logica pe domenii

---

#### De ce Endpoint de Status?

```javascript
GET /status
```

**Utilizări practice:**
1. **Health checks** – verifică dacă serverul răspunde
2. **Monitoring** – integrat în sisteme de alertare
3. **Load balancers** – detectează servere căzute
4. **Development** – debugging rapid

**Exemple reale:**
- Kubernetes: `livenessProbe` și `readinessProbe`
- AWS ELB: health check target
- Datadog/New Relic: monitoring endpoints

---

### 🧪 Exerciții de Extindere

#### Exercițiu 1: Externalizare Router

Creează un fișier separat `routes/books.js`:

```javascript
// routes/books.js
const express = require('express');
const router = express.Router();

// Array extern (sau import din model)
let books = require('../data/books');

router.get('/', (req, res) => {
  // ... logica GET
});

router.post('/', (req, res) => {
  // ... logica POST
});

router.delete('/:id', (req, res) => {
  // ... logica DELETE
});

module.exports = router;
```

```javascript
// step4.js (simplificat)
const express = require('express');
const app = express();
const booksRouter = require('./routes/books');

app.use(express.json());
app.use('/books', booksRouter);
// ...
```

---

#### Exercițiu 2: Status Avansat

Extinde endpoint-ul de status cu mai multe informații:

```javascript
statusRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    server: {
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        unit: 'MB'
      },
      nodeVersion: process.version,
      platform: process.platform
    },
    data: {
      booksCount: books.length,
      booksIds: books.map(b => b.id)
    }
  });
});
```

---

#### Exercițiu 3: Multiple Routere

Adaugă un router pentru autori:

```javascript
const authorsRouter = express.Router();

// GET /authors - listă unică de autori
authorsRouter.get('/', (req, res) => {
  const authors = [...new Set(books.map(b => b.author))];
  res.json(authors);
});

// GET /authors/:name/books - cărțile unui autor
authorsRouter.get('/:name/books', (req, res) => {
  const { name } = req.params;
  const authorBooks = books.filter(b => 
    b.author.toLowerCase().includes(name.toLowerCase())
  );
  res.json(authorBooks);
});

app.use('/authors', authorsRouter);
```

**Testează:**
```
GET http://localhost:3001/authors
→ ["Robert C. Martin", "Andrew Hunt, David Thomas", "J.K. Rowling"]

GET http://localhost:3001/authors/robert/books
→ [{"id": 1, "title": "Clean Code", ...}]
```

---

### 📋 Checklist Pas 4

- [ ] `GET /status` returnează informații despre server
- [ ] Toate rutele `/books` funcționează ca înainte
- [ ] Routerele sunt montate corect cu prefixe
- [ ] Status reflectă starea curentă (`booksCount`)
- [ ] Codul este organizat modular
- [ ] Separarea logică este clară

---

## Pasul 5 – Middleware de Logging

**📁 Fișier:** `step5.js`  
**🔌 Port:** `3001`  
**⏱️ Durata:** 20 minute

### 🎯 Concept Nou

Middleware personalizat care interceptează **toate cererile** și le loghează.

### 💡 Ce Înveți

✅ Ce este un middleware și cum funcționează  
✅ Lanțul de middleware (`next()`)  
✅ Event-driven logging cu `res.on('finish')`  
✅ Măsurarea timpului de răspuns  
✅ Centralizarea logării

### 💻 Implementare Middleware Logger

```javascript
const express = require('express');
const app = express();

// ==================== MIDDLEWARE LOGGING ====================
function requestLogger(req, res, next) {
  const start = Date.now();
  
  // Event care se declanșează când răspunsul este trimis complet
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    
    console.log(
      `[${timestamp}] ` +
      `${req.method.padEnd(6)} ` +
      `${req.originalUrl.padEnd(25)} ` +
      `→ ${res.statusCode} ` +
      `(${duration}ms)`
    );
  });
  
  // CRITICAL: Pasăm controlul mai departe în lanț!
  next();
}

// IMPORTANT: Middleware-ul se aplică ÎNAINTE de toate rutele
app.use(requestLogger);

// Apoi middleware-ul pentru JSON
app.use(express.json());

// Apoi routerele...
app.use('/books', booksRouter);
app.use('/status', statusRouter);
// ...
```

### 🚀 Cum Rulezi

```bash
# Oprește step4:
CTRL + C

# Pornește step5:
npm run step5
```

### ✅ Testare și Observare

#### 📱 Test 1: Cerere Simplă

```
GET http://localhost:3001/books
```

**În consolă:**
```
[2025-11-18T10:30:15.123Z] GET    /books                    → 200 (5ms)
```

---

#### 📱 Test 2: Cereri Multiple

```
GET http://localhost:3001/books
POST http://localhost:3001/books (cu body valid)
GET http://localhost:3001/status
DELETE http://localhost:3001/books/4
GET http://localhost:3001/books/999 (inexistent)
```

**În consolă:**
```
[2025-11-18T10:30:15.123Z] GET    /books                    → 200 (5ms)
[2025-11-18T10:30:16.456Z] POST   /books                    → 201 (3ms)
[2025-11-18T10:30:17.789Z] GET    /status                   → 200 (2ms)
[2025-11-18T10:30:18.012Z] DELETE /books/4                  → 204 (2ms)
[2025-11-18T10:30:19.345Z] GET    /books/999                → 404 (1ms)
```

---

#### 📱 Test 3: Cereri Invalide

```
POST http://localhost:3001/books (fără body)
DELETE http://localhost:3001/xyz (rută inexistentă)
```

**În consolă:**
```
[2025-11-18T10:30:20.678Z] POST   /books                    → 400 (2ms)
[2025-11-18T10:30:21.901Z] DELETE /xyz                      → 404 (1ms)
```

> 💡 **Observație:** Middleware-ul loghează **toate** cererile, indiferent de succes sau eroare!

---

### 🎓 Observații Didactice

#### Anatomia unui Middleware

```javascript
function middlewareName(req, res, next) {
  // 1. Cod ÎNAINTE de a ajunge la rută
  console.log('Cerere primită');
  
  // 2. Pasăm controlul mai departe
  next();
  
  // 3. Cod DUPĂ ce ruta a fost procesată
  // (nu este des folosit, preferabil res.on('finish'))
}
```

**Parametrii:**
- `req` – obiectul cererii (metoda, URL, headers, body)
- `res` – obiectul răspunsului (status, headers, body)
- `next` – funcție care pasează controlul la următorul middleware/rută

---

#### De ce `res.on('finish')`?

```javascript
// ❌ Greșit: logăm înainte ca răspunsul să fie trimis
function logger(req, res, next) {
  console.log(`${req.method} -> ${res.statusCode}`);  
  // res.statusCode este încă nedefinit aici!
  next();
}

// ✅ Corect: logăm după ce răspunsul a fost trimis
function logger(req, res, next) {
  res.on('finish', () => {
    console.log(`${req.method} -> ${res.statusCode}`);  
    // res.statusCode este setat de handler
  });
  next();
}
```

---

#### Lanțul de Middleware

```javascript
app.use(middleware1);  // Execută primul
app.use(middleware2);  // Apoi al doilea
app.use(middleware3);  // Apoi al treilea

app.get('/books', handler);  // În final, handler-ul rutei
```

**Flow-ul complet:**
```
Request → middleware1 → middleware2 → middleware3 → handler → Response
          (next())      (next())      (next())
```

**Dacă un middleware NU apelează `next()`:**
```
Request → middleware1 → ❌ STOP (cererea se blochează)
```

---

#### De ce ÎNAINTE de rute?

```javascript
// ✅ Corect: middleware-ul vede toate rutele
app.use(logger);
app.get('/books', ...);
app.post('/books', ...);

// ❌ Greșit: middleware-ul nu vede rutele de deasupra
app.get('/books', ...);
app.post('/books', ...);
app.use(logger);  // Prea târziu!
```

---

### 🧪 Exerciții de Extindere

#### Exercițiu 1: Logger cu IP și User-Agent

Extinde logger-ul să afișeze IP-ul clientului și user-agent-ul:

```javascript
function requestLogger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ` +
      `${req.ip.padEnd(15)} ` +
      `${req.method.padEnd(6)} ` +
      `${req.originalUrl.padEnd(20)} ` +
      `→ ${res.statusCode} ` +
      `(${duration}ms) ` +
      `"${req.get('user-agent')}"`
    );
  });
  
  next();
}
```

**Output:**
```
[2025-11-18T10:30:15.123Z] ::1            GET    /books               → 200 (5ms) "PostmanRuntime/7.32.3"
```

---

#### Exercițiu 2: Request ID Tracking

Generează un ID unic pentru fiecare cerere:

```javascript
function requestIdMiddleware(req, res, next) {
  req.requestId = Math.random().toString(36).substring(7);
  next();
}

function requestLogger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${req.requestId}] ` +
      `${req.method} ${req.originalUrl} ` +
      `→ ${res.statusCode} (${duration}ms)`
    );
  });
  
  next();
}

// Ordinea importă!
app.use(requestIdMiddleware);  // Generează ID
app.use(requestLogger);        // Folosește ID
```

---

#### Exercițiu 3: Logging în Fișier

Salvează log-urile în fișier:

```javascript
const fs = require('fs');
const path = require('path');

function fileLogger(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: duration,
      ip: req.ip
    };
    
    const logLine = JSON.stringify(logEntry) + '\n';
    
    fs.appendFile(
      path.join(__dirname, 'requests.log'),
      logLine,
      (err) => {
        if (err) console.error('Eroare la scriere log:', err);
      }
    );
  });
  
  next();
}
```

---

### 📋 Checklist Pas 5

- [ ] Middleware-ul este plasat ÎNAINTE de rute
- [ ] Toate cererile sunt loghate în consolă
- [ ] Log-urile conțin: timestamp, metodă, URL, status, durată
- [ ] `next()` este apelat corect
- [ ] `res.on('finish')` este folosit pentru timing
- [ ] Aplicația funcționează normal (middleware nu blochează)

---

## Pasul 6 – Handler Global de Erori

**📁 Fișier:** `step6.js`  
**🔌 Port:** `3001`  
**⏱️ Durata:** 25-30 minute

### 🎯 Concepte Noi

- Middleware de erori cu **4 parametri**
- Handler pentru rute inexistente (404)
- Centralizarea gestionării erorilor
- Diferențiere între erori de client (4xx) și server (5xx)

### 💡 Ce Înveți

✅ Semnătura specială a middleware-ului de erori  
✅ Captarea erorilor aruncate în rute  
✅ Handler 404 pentru rute nedefinite  
✅ Separarea între logging (server) și răspuns (client)  
✅ Best practices pentru gestionarea erorilor în producție

### 💻 Implementare Completă

```javascript
const express = require('express');
const app = express();

// Middleware-uri globale
app.use(express.json());

// Routere (books, status, etc.)
// ...

// ==================== RUTĂ DE TEST EROARE ====================
// Pentru demonstrație: aruncă intenționat o eroare
app.get('/boom', (req, res) => {
  throw new Error('Eroare de test - ceva a mers prost!');
});

// ==================== HANDLER 404 - RUTĂ INEXISTENTĂ ====================
// IMPORTANT: Plasăm DUPĂ toate rutele valide!
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Ruta nu a fost găsită',
    path: req.originalUrl,
    method: req.method,
    suggestion: 'Verificați documentația pentru rute disponibile'
  });
});

// ==================== HANDLER GLOBAL DE ERORI ====================
// CRITICAL: SEMNĂTURA CU 4 PARAMETRI!
app.use((err, req, res, next) => {
  // 1. Logare detaliată pentru dezvoltatori (DOAR în consolă)
  console.error('╔════════════════════════════════════════╗');
  console.error('║         EROARE INTERCEPTATĂ           ║');
  console.error('╚════════════════════════════════════════╝');
  console.error('Timp:', new Date().toISOString());
  console.error('Metodă:', req.method);
  console.error('URL:', req.originalUrl);
  console.error('Body:', JSON.stringify(req.body, null, 2));
  console.error('Mesaj:', err.message);
  console.error('Stack:', err.stack);
  console.error('─────────────────────────────────────────\n');
  
  // 2. Răspuns securizat pentru client
  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    error: 'Eroare internă a serverului',
    message: err.message,
    // În producție, NU includem stack trace!
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack 
    })
  });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`STEP 6 running at http://localhost:${PORT}`);
});
```

### 🚀 Cum Rulezi

```bash
# Oprește step5:
CTRL + C

# Pornește step6:
npm run step6
```

### ✅ Testare Completă

#### 📱 Test 1: Rute Normale – Ar Trebui să Funcționeze

```
GET http://localhost:3001/books
→ 200 OK

POST http://localhost:3001/books
Body: {"id": 4, "title": "Test", "author": "Autor"}
→ 201 Created

DELETE http://localhost:3001/books/4
→ 204 No Content
```

---

#### 📱 Test 2: Rută Inexistentă – 404

```
GET http://localhost:3001/xyz
```

**Rezultat:**
```
Status: 404 Not Found
Body:
{
  "error": "Ruta nu a fost găsită",
  "path": "/xyz",
  "method": "GET",
  "suggestion": "Verificați documentația pentru rute disponibile"
}
```

---

#### 📱 Test 3: Rută cu Eroare – 500

```
GET http://localhost:3001/boom
```

**Rezultat în Postman:**
```
Status: 500 Internal Server Error
Body:
{
  "error": "Eroare internă a serverului",
  "message": "Eroare de test - ceva a mers prost!"
}
```

**În consolă (doar pentru dezvoltatori):**
```
╔════════════════════════════════════════╗
║         EROARE INTERCEPTATĂ           ║
╚════════════════════════════════════════╝
Timp: 2025-11-18T10:30:15.123Z
Metodă: GET
URL: /boom
Body: {}
Mesaj: Eroare de test - ceva a mers prost!
Stack: Error: Eroare de test - ceva a mers prost!
    at /path/to/step6.js:45:9
    at Layer.handle [as handle_request] (/path/to/express/lib/router/layer.js:95:5)
    ...
─────────────────────────────────────────
```

---

#### 📱 Test 4: POST Invalid – 400 (Gestionat de Rută)

```
POST http://localhost:3001/books
Body: {"id": 5}  // Lipsește title și author
```

**Rezultat:**
```
Status: 400 Bad Request
Body:
{
  "error": "Câmpurile obligatorii lipsesc"
}
```

> 💡 **Notă:** Acest 400 vine din validarea din rută, NU din handler-ul de erori!

---

#### 📱 Test 5: Simulare Eroare în POST

Modifică temporar codul POST-ului pentru a arunca o eroare:

```javascript
booksRouter.post('/', (req, res) => {
  throw new Error('Eroare simulată în POST');
  // Restul codului...
});
```

**Testează:**
```
POST http://localhost:3001/books
Body: {"id": 4, "title": "Test", "author": "Autor"}
```

**Rezultat:**
```
Status: 500 Internal Server Error
Body:
{
  "error": "Eroare internă a serverului",
  "message": "Eroare simulată în POST"
}
```

---

### 🎓 Observații Didactice

#### Semnătura Middleware-ului de Erori

```javascript
// ❌ Middleware normal (3 parametri)
app.use((req, res, next) => {
  // ...
});

// ✅ Middleware de erori (4 parametri - MUST!)
app.use((err, req, res, next) => {
  //     ↑
  //  primul parametru este EROAREA
});
```

**Cum știe Express diferența?**
- **3 parametri** → middleware normal
- **4 parametri** → middleware de erori

---

#### Ordinea Middleware-urilor

```javascript
// 1. Middleware-uri globale
app.use(express.json());
app.use(logger);

// 2. Routere cu logică de business
app.use('/books', booksRouter);
app.use('/status', statusRouter);

// 3. Handler 404 (DUPĂ toate rutele valide)
app.use((req, res, next) => {
  res.status(404).json({...});
});

// 4. Handler de erori (ULTIMUL!)
app.use((err, req, res, next) => {
  // Captează toate erorile de mai sus
});
```

**De ce această ordine?**
- Dacă handlerul 404 e primul, toate rutele vor returna 404!
- Dacă handlerul de erori e primul, nu va capta nimic!

---

#### Captarea Erorilor Asincrone

```javascript
// ❌ Eroare asincronă NU este captată automat
app.get('/async-error', async (req, res) => {
  throw new Error('Ups!');  // Nu ajunge la error handler!
});

// ✅ Soluție 1: try-catch manual
app.get('/async-error', async (req, res, next) => {
  try {
    throw new Error('Ups!');
  } catch (error) {
    next(error);  // Pasăm eroarea la handler
  }
});

// ✅ Soluție 2: Wrapper pentru async (best practice)
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/async-error', asyncHandler(async (req, res) => {
  throw new Error('Ups!');  // Acum este captat!
}));
```

---

#### Logging vs Răspuns

```javascript
app.use((err, req, res, next) => {
  // LOGGING (pentru dezvoltatori - în consolă)
  console.error('Stack complet:', err.stack);
  console.error('Toate detaliile:', err);
  
  // RĂSPUNS (pentru client - JSON securizat)
  res.status(500).json({
    error: 'Eroare internă',
    message: err.message  // Doar mesajul, NU stack-ul!
  });
});
```

**De ce această separare?**
- ✅ **Securitate** – clientul nu trebuie să vadă stack traces
- ✅ **Debugging** – dezvoltatorul vede tot în consolă
- ✅ **Profesionalism** – mesaje prietenoase pentru utilizatori

---

### 🧪 Exerciții de Extindere

#### Exercițiu 1: Erori Personalizate cu Status

Creează o clasă de eroare personalizată:

```javascript
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true;  // Eroare controlată
  }
}

// Folosire în rute:
booksRouter.post('/', (req, res, next) => {
  const { id, title, author } = req.body;
  
  if (!title) {
    throw new AppError('Titlul este obligatoriu', 400);
  }
  
  if (books.find(b => b.id === id)) {
    throw new AppError('Cartea există deja', 409);
  }
  
  // Continuă normal...
});

// Handler actualizat:
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.status || 500;
  const message = err.isOperational 
    ? err.message 
    : 'Eroare internă a serverului';
  
  res.status(statusCode).json({ error: message });
});
```

---

#### Exercițiu 2: Logging în Fișier pentru Erori

Salvează erorile într-un fișier:

```javascript
const fs = require('fs');
const path = require('path');

app.use((err, req, res, next) => {
  // Log în consolă
  console.error(err.stack);
  
  // Log în fișier
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack,
    body: req.body
  };
  
  fs.appendFileSync(
    path.join(__dirname, 'errors.log'),
    JSON.stringify(errorLog, null, 2) + '\n\n'
  );
  
  // Răspuns client
  res.status(500).json({ error: 'Eroare internă' });
});
```

---

#### Exercițiu 3: Integrare cu Sentry (Bonus)

Pentru producție, folosește un serviciu de monitoring:

```javascript
const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });

// Middleware Sentry ÎNAINTE de error handler
app.use(Sentry.Handlers.errorHandler());

app.use((err, req, res, next) => {
  // Sentry a trimis deja eroarea
  console.error(err.stack);
  res.status(500).json({ error: 'Eroare internă' });
});
```

---

### 📋 Checklist Pas 6

- [ ] Handler 404 funcționează pentru rute inexistente
- [ ] Handler de erori captează excepțiile aruncate
- [ ] Stack trace apare DOAR în consolă, nu în răspuns
- [ ] Mesajele pentru client sunt clare și securizate
- [ ] Ordinea middleware-urilor este corectă
- [ ] Toate rutele normale funcționează
- [ ] Logging-ul erorilor este complet

---

## ❌ Probleme Frecvente și Soluții

### 🔴 Problema 1: `EADDRINUSE: address already in use :::3001`

**Mesaj complet:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

#### Cauză
Pe portul `3001` rulează deja un alt server (probabil un alt step).

#### Soluții

**Soluția 1: Oprește serverul activ**
```bash
# În terminalul unde rulează serverul:
CTRL + C

# Apoi pornește noul step:
npm run step3
```

**Soluția 2: Verifică procesele active (Windows)**
```powershell
netstat -ano | findstr :3001
# Output: TCP  0.0.0.0:3001  0.0.0.0:0  LISTENING  12345

# Oprește procesul (cu PID-ul din output):
taskkill /PID 12345 /F
```

**Soluția 3: Verifică procesele active (Linux/Mac)**
```bash
lsof -i :3001
# Output: node  12345  user  ... *:3001 (LISTEN)

# Oprește procesul:
kill -9 12345
```

**Soluția 4: Schimbă portul**
```javascript
// În stepX.js:
const PORT = 3002;  // Alt port liber
app.listen(PORT, ...);
```

---

### 🔴 Problema 2: `Cannot GET /` în browser

**Context:**
Accesezi `http://localhost:3001/` și primești:
```
Cannot GET /
```

#### Cauză
Fișierele `stepX.js` definesc rute pentru `/books`, `/status`, etc., dar NU pentru ruta root (`/`).

#### Soluții

**Soluția 1: Accesează ruta corectă**
```
http://localhost:3001/books
```

**Soluția 2: Folosește meniul**
```bash
npm run menu
# Browser: http://localhost:3000/
```

**Soluția 3: Adaugă o rută root**
```javascript
app.get('/', (req, res) => {
  res.json({
    message: 'API REST Express - Step X',
    endpoints: {
      books: '/books',
      status: '/status'
    }
  });
});
```

---

### 🔴 Problema 3: `Cannot POST /books`

**Context:**
Încerci să faci POST, dar primești:
```
Cannot POST /books
```

#### Cauze Posibile

**Cauză 1: Rulezi pasul greșit**
- `step1.js` are doar GET, nu și POST
- Soluție: Rulează `npm run step2` (sau superior)

**Cauză 2: Ruta nu e definită**
- Verifică că există `app.post('/books', ...)` în cod

**Cauză 3: Middleware JSON lipsește**
```javascript
// Asigură-te că ai:
app.use(express.json());  // ÎNAINTE de rute!
```

---

### 🔴 Problema 4: `Cannot DELETE /books`

**Context:**
Încerci să ștergi, dar primești:
```
Cannot DELETE /books
```

#### Cauză
Ruta DELETE necesită un ID în URL:

```javascript
// ❌ Greșit:
DELETE http://localhost:3001/books

// ✅ Corect:
DELETE http://localhost:3001/books/4
```

**Explicație:**
Ruta este definită ca `/books/:id`, deci cere parametrul `id`:
```javascript
app.delete('/books/:id', ...);
```

---

### 🔴 Problema 5: `req.body` este `undefined`

**Context:**
În POST, `req.body` este `undefined` și validarea eșuează.

#### Cauze și Soluții

**Cauză 1: Lipsește middleware-ul**
```javascript
// TREBUIE adăugat ÎNAINTE de rute:
app.use(express.json());
```

**Cauză 2: Body-ul nu e JSON în Postman**
- Tab: **Body** → `raw`
- Dropdown: **JSON** (nu Text!)
- JSON valid cu ghilimele duble:
  ```json
  {
    "id": 4,
    "title": "Test"
  }
  ```

**Cauză 3: Header lipsă (rar)**
Postman setează automat, dar manual trebuie:
```
Content-Type: application/json
```

---

### 🔴 Problema 6: Erori de JSON parse

**Mesaj:**
```
SyntaxError: Unexpected token } in JSON at position 45
```

#### Cauză
JSON-ul din body este invalid.

#### Erori Comune

**1. Virgulă în plus:**
```json
{
  "id": 4,
  "title": "Test",  ← Virgulă în plus
}
```

**2. Ghilimele simple în loc de duble:**
```json
{
  'id': 4,          ← Greșit
  'title': 'Test'   ← Greșit
}
```

**3. Chei fără ghilimele:**
```json
{
  id: 4,            ← Greșit
  title: "Test"
}
```

**Format corect:**
```json
{
  "id": 4,
  "title": "Test",
  "author": "Autor"
}
```

---

### 🔴 Problema 7: Server-ul pornește dar nu răspunde

**Context:**
Server-ul pornește fără erori, dar cererile timeout.

#### Cauze Posibile

**Cauză 1: Port greșit**
```
Server pe: http://localhost:3001
Request la: http://localhost:3000  ← Greșit!
```

**Cauză 2: Middleware fără `next()`**
```javascript
// ❌ Blochează toate cererile:
app.use((req, res, next) => {
  console.log('Request primit');
  // LIPSEȘTE next()!
});

// ✅ Corect:
app.use((req, res, next) => {
  console.log('Request primit');
  next();  // Pasează controlul!
});
```

**Cauză 3: Firewall/Antivirus**
- Verifică că Node.js are permisiuni de rețea
- Dezactivează temporar firewall-ul pentru test

---

### 📋 Diagnostic Rapid

| Simptom | Cauză Probabilă | Soluție Rapidă |
|---------|----------------|----------------|
| "address in use" | Alt server rulează | CTRL+C în terminal |
| "Cannot GET /" | Lipsește ruta root | Accesează `/books` |
| "Cannot POST" | Rulezi step1 | Rulează step2+ |
| "Cannot DELETE" | Lipsește `:id` | Adaugă ID în URL |
| `req.body` undefined | Lipsește middleware | Adaugă `express.json()` |
| JSON parse error | JSON invalid | Verifică sintaxa JSON |
| Timeout | Port greșit / fără `next()` | Verifică port / adaugă `next()` |

---

## 🚀 Extensii pentru Proiecte Reale

După parcurgerea celor 6 pași, poți extinde kit-ul pentru aplicații de producție:

---

### 💾 1. Integrare cu Baze de Date

#### PostgreSQL cu `pg`

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'books_db',
  password: 'password',
  port: 5432
});

// GET books
booksRouter.get('/', async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM books ORDER BY title'
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// POST book
booksRouter.post('/', async (req, res, next) => {
  const { title, author } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
      [title, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});
```

---

#### MongoDB cu Mongoose

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/books_db');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);

// GET books
booksRouter.get('/', async (req, res, next) => {
  try {
    const books = await Book.find().sort({ title: 1 });
    res.json(books);
  } catch (error) {
    next(error);
  }
});

// POST book
booksRouter.post('/', async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
});
```

---

### 🔐 2. Autentificare și Autorizare

#### JWT Authentication

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware de autentificare
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Token de autentificare lipsește' 
    });
  }
  
  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        error: 'Token invalid sau expirat' 
      });
    }
    req.user = user;
    next();
  });
}

// Protejează rutele
booksRouter.post('/', authenticateToken, (req, res) => {
  // Doar utilizatori autentificați pot crea cărți
  console.log('User autentificat:', req.user);
  // ...
});

// Rută de login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Verifică credențiale (din DB)
  const user = await findUserByUsername(username);
  
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ 
      error: 'Credențiale invalide' 
    });
  }
  
  // Generează token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, username: user.username } });
});
```

---

### 🎨 3. Frontend Client

#### React cu Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// GET toate cărțile
async function getBooks() {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
}

// POST carte nouă
async function createBook(book) {
  const response = await axios.post(`${API_URL}/books`, book);
  return response.data;
}

// DELETE carte
async function deleteBook(id) {
  await axios.delete(`${API_URL}/books/${id}`);
}

// Componenta React
function BooksList() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    getBooks().then(setBooks);
  }, []);
  
  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          {book.title} - {book.author}
          <button onClick={() => deleteBook(book.id)}>Șterge</button>
        </li>
      ))}
    </ul>
  );
}
```

---

### 🧪 4. Testare Automată

#### Jest + Supertest

```javascript
const request = require('supertest');
const app = require('./step6');  // Exportă app din step6.js

describe('Books API', () => {
  describe('GET /books', () => {
    it('should return 200 and array of books', async () => {
      const res = await request(app).get('/books');
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
  
  describe('POST /books', () => {
    it('should create a new book', async () => {
      const newBook = {
        id: 999,
        title: 'Test Book',
        author: 'Test Author'
      };
      
      const res = await request(app)
        .post('/books')
        .send(newBook);
      
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(newBook);
    });
    
    it('should return 400 for invalid data', async () => {
      const res = await request(app)
        .post('/books')
        .send({ id: 1000 });  // Lipsesc title și author
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
```

---

### 📊 5. Validare Avansată cu Joi

```javascript
const Joi = require('joi');

// Schema de validare
const bookSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  title: Joi.string().min(1).max(200).required(),
  author: Joi.string().min(1).max(100).required(),
  year: Joi.number().integer().min(1000).max(2100).optional(),
  isbn: Joi.string().pattern(/^[0-9-]{10,17}$/).optional()
});

// Middleware de validare
function validateBook(req, res, next) {
  const { error, value } = bookSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Date invalide',
      details: error.details.map(d => d.message)
    });
  }
  
  req.body = value;  // Date validate și normalizate
  next();
}

// Folosire
booksRouter.post('/', validateBook, (req, res) => {
  // req.body este garantat valid
  const newBook = req.body;
  // ...
});
```

---

### 🔍 6. Logging Profesional cu Winston

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Middleware
function loggerMiddleware(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: Date.now() - start,
      ip: req.ip
    });
  });
  
  next();
}

// Error handler
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });
  
  res.status(500).json({ error: 'Eroare internă' });
});
```

---

### 🌐 7. CORS pentru Frontend

```javascript
const cors = require('cors');

// Configurare CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend-ul tău
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### 📈 8. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minute
  max: 100,  // Max 100 cereri per IP
  message: 'Prea multe cereri, încercați mai târziu'
});

app.use('/api/', limiter);
```

---

### 🔒 9. Securitate cu Helmet

```javascript
const helmet = require('helmet');

app.use(helmet());  // Setează headere de securitate
```

---

## 🎯 Principii RESTful Fundamentale

Indiferent de complexitatea aplicației, respectă aceste principii:

### 1. Resurse și URL-uri

✅ **Folosește substantive (plural):**
```
GET    /books          ← Corect
GET    /getBooks       ← Greșit (verb în URL)
GET    /book           ← Greșit (singular)
```

✅ **Ierarhie clară:**
```
GET    /authors/1/books     ← Cărțile autorului 1
GET    /books/1/reviews     ← Review-urile cărții 1
```

---

### 2. Metode HTTP Corecte

| Metodă | Scop | Idempotent? | Body? |
|--------|------|-------------|-------|
| GET | Citire | ✅ Da | ❌ Nu |
| POST | Creare | ❌ Nu | ✅ Da |
| PUT | Înlocuire completă | ✅ Da | ✅ Da |
| PATCH | Actualizare parțială | ❌ Nu | ✅ Da |
| DELETE | Ștergere | ✅ Da | ❌ Nu |

---

### 3. Coduri HTTP Standard

| Categorie | Range | Exemple |
|-----------|-------|---------|
| **Success** | 2xx | 200 OK, 201 Created, 204 No Content |
| **Client Error** | 4xx | 400 Bad Request, 401 Unauthorized, 404 Not Found, 409 Conflict |
| **Server Error** | 5xx | 500 Internal Server Error, 503 Service Unavailable |

---

### 4. JSON Consistent

**Răspuns de succes:**
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin"
}
```

**Răspuns de eroare:**
```json
{
  "error": "Descriere eroare",
  "details": ["Detaliu 1", "Detaliu 2"]
}
```

---

### 5. Stateless

Fiecare cerere conține **toată informația necesară**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

Server-ul **nu păstrează sesiuni** între cereri.

---

## 📚 Resurse Suplimentare

### Documentație Oficială

- 📘 [Express.js Documentation](https://expressjs.com/)
- 📘 [Node.js Documentation](https://nodejs.org/docs/)
- 📘 [MDN: HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- 📘 [MDN: HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

### Ghiduri și Best Practices

- 🎓 [REST API Design Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- 🎓 [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- 🎓 [API Design Patterns](https://swagger.io/resources/articles/best-practices-in-api-design/)

### Tutoriale Video

- 🎥 [Express.js Crash Course](https://www.youtube.com/results?search_query=express+js+crash+course)
- 🎥 [RESTful API Design](https://www.youtube.com/results?search_query=restful+api+design)

### Cărți Recomandate

- 📖 **"REST API Design Rulebook"** – Mark Massé
- 📖 **"Node.js Design Patterns"** – Mario Casciaro
- 📖 **"Express in Action"** – Evan Hahn

---

## 📝 Rezumat Final

### Ce ai învățat în cele 6 pași:

| Pas | Concept Principal | Skill Dobândit |
|-----|-------------------|----------------|
| 1️⃣ | Server Express + GET | Baza unui API REST |
| 2️⃣ | POST + Validare | Crearea resurselor |
| 3️⃣ | DELETE + Parametri | Ștergerea resurselor |
| 4️⃣ | Router Modular | Organizarea codului |
| 5️⃣ | Middleware Logging | Monitorizare cereri |
| 6️⃣ | Error Handling | Gestionarea erorilor |

### Next Steps

🚀 **Continuă să înveți:**
1. Integrează o bază de date reală
2. Adaugă autentificare JWT
3. Creează un frontend client
4. Implementează teste automate
5. Deploy pe Heroku/Railway/Render

---

## ⭐ Succes la Învățare!

Ai parcurs un ghid complet pentru dezvoltarea API-urilor RESTful cu Express.js. Fiecare pas a construit pe cel anterior, oferindu-ți o înțelegere solidă a conceptelor fundamentale.

**Continuă să experimentezi, să construiești și să înveți! 🚀**

---

## 👥 Suport și Contribuții

### Ai Întrebări?

- 💬 Consultă documentația pentru fiecare pas în `docs/stepX.html`
- 🔍 Verifică secțiunea [Probleme Frecvente](#-probleme-frecvente-și-soluții)
- 👨‍🏫 Contactează profesorul de curs pentru clarificări

### Sugestii de Îmbunătățire?

Acest kit este în continuă evoluție. Feedback-ul tău este apreciat!

---

**Happy Coding! 💻✨**
