# S8 – Servicii RESTful și Express.js (varianta în 8 pași)

Acest proiect reprezintă un **starter kit didactic** pentru seminarul S8 – *Servicii RESTful și Express.js*, organizat în **8 pași progresivi**.

Scopul este ca studenții să vadă, pas cu pas:

- cum se construiește un API REST simplu în Node.js cu Express;
- cum se modelează rute pentru resurse (cărți, departamente);
- cum se adaugă metode HTTP (GET, POST, DELETE);
- cum se introduc routere modulare, middleware de logging și de validare;
- cum se realizează gestionarea erorilor (404, 500) într‑un mod coerent.

> **Recomandare:** la seminar, menținem **serverul de meniu** pornit pe portul `3000` și rulăm **câte un singur pas** (step1–step8) pe portul `3001`, în câte un al doilea terminal.

---

## 1. Cerințe preliminare

Pentru a rula kit‑ul, este nevoie de:

- **Node.js** (recomandat versiunea ≥ 18.x);
- **npm** (instalat implicit cu Node.js);
- (opțional, dar foarte recomandat) **Postman** sau o alternativă:
  - Insomnia, VS Code REST Client, Thunder Client etc.

---

## 2. Structura proiectului

Structura de bază a kit‑ului în 8 pași este:

```text
S8-rest-express-8steps/
│
├─ package.json          # scripturi npm pentru meniu + fiecare pas
├─ server.js             # serverul de "meniu" (pagina de start, port 3000)
│
├─ db.js                 # "baza de date" in memorie (carti + departamente)
├─ routes/
│   └─ departments.js    # router modular pentru /departments
│
├─ step1.js              # Pasul 1 – server simplu + GET /books
├─ step2.js              # Pasul 2 – POST /books + validare minimă
├─ step3.js              # Pasul 3 – DELETE /books/:id
├─ step4.js              # Pasul 4 – router modular /status
├─ step5.js              # Pasul 5 – router /departments + db.js
├─ step6.js              # Pasul 6 – middleware de logging
├─ step7.js              # Pasul 7 – validare prin middleware pentru /books
├─ step8.js              # Pasul 8 – API complet + 404 + handler erori
│
├─ public/
│   └─ index.html        # pagina de meniu (lista de pași + link spre docs)
│
└─ docs/
    ├─ step1.html        # documentație teoretică + explicații pentru pasul 1
    ├─ step2.html
    ├─ step3.html
    ├─ step4.html
    ├─ step5.html
    ├─ step6.html
    ├─ step7.html
    └─ step8.html
```

---

## 3. Instalare și pornire (workflow recomandat la seminar)

1. **Deschidem un terminal** în folderul proiectului:

   ```bash
   cd S8-rest-express-8steps
   ```

2. **Instalăm dependențele** (o singură dată):

   ```bash
   npm install
   ```

3. **Pornim serverul de meniu** (port `3000`):

   ```bash
   npm start
   # sau:
   npm run menu
   ```

4. Deschidem în browser:

   ```text
   http://localhost:3000
   ```

   Vom vedea pagina de meniu cu cele 8 pași și linkurile către documentația fiecărui pas (`docs/stepX.html`), precum și către principalele endpoint‑uri.

5. **Pentru fiecare pas** (într‑un *al doilea terminal*):

   - ne asigurăm că nu rulează deja alt `stepX` pe portul `3001` (dacă da, îl oprim cu `Ctrl + C`);
   - pornim pasul dorit, de exemplu pasul 3:

     ```bash
     npm run step3
     ```

   - testăm API‑ul pe:

     ```text
     http://localhost:3001/...
     ```

> **Important:** **nu rulăm simultan** mai mulți pași (step1, step2 etc.) pe același port `3001`, pentru a evita eroarea de tip `EADDRINUSE`.

---

## 4. Resurse comune – `db.js` și `routes/departments.js`

### 4.1. `db.js`

Acest fișier conține „baza de date" în memorie:

- `books` – listă de cărți (id, title, author, year);
- `departments` – listă de departamente (id, name, head).

Toți pașii care au nevoie de date importă astfel:

```js
const { books } = require('./db');
// sau:
const { books, departments } = require('./db');
```

### 4.2. `routes/departments.js`

Acest fișier definește un **router modular** pentru resursa `/departments`:

- `GET /departments` – lista departamentelor;
- `GET /departments/:id` – un departament după ID;
- `POST /departments` – adăugare departament nou (cu validare);
- `DELETE /departments/:id` – ștergere departament.

Integrarea se face (în pașii 5–8) prin:

```js
const departmentsRouter = require('./routes/departments');
app.use('/departments', departmentsRouter);
```

---

## 5. Pașii 1–8, explicați și utilizați

### Pasul 1 – Server Express minimal + `GET /books`

#### Scop didactic

- Inițializarea unui server Express minimal.
- Expunerea unei singure rute de tip `GET` care întoarce date JSON.
- Familiarizarea cu structura unei aplicații Node + Express.

#### Cum pornim

Într‑un terminal secundar (menținând meniul pe port 3000):

```bash
npm run step1
```

Serverul rulează pe:

```text
http://localhost:3001
```

#### Endpoint‑uri principale

- **`GET /`**  
  Răspuns simplu text: un mesaj care invită la testarea rutei `/books`.

- **`GET /books`**  
  Răspuns: lista de cărți din `db.js`, în format JSON.

Exemplu răspuns (JSON):

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008
  },
  {
    "id": 2,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas",
    "year": 1999
  },
  {
    "id": 3,
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "J.K. Rowling",
    "year": 1997
  }
]
```

#### Testare

- **Browser:**  
  Introducem în adresă: `http://localhost:3001/books`.

- **Postman:**
  - Method: `GET`
  - URL: `http://localhost:3001/books`
  - Fără body.

#### Ce subliniem la seminar

- Diferența dintre **server web** și **API REST** (răspuns direct JSON, fără HTML).
- Structura minimală Express:
  - `const app = express();`
  - `app.get('/ruta', handler);`
  - `app.listen(PORT, callback);`
- Importul datelor dintr‑un modul local (`db.js`).

---

### Pasul 2 – `POST /books` + validare minimă

#### Scop didactic

- Introducerea metodei `POST` pentru a crea resurse.
- Utilizarea `express.json()` ca middleware pentru parsarea corpului cererii.
- Validarea minimă a câmpurilor obligatorii (id, title, author).

#### Cum pornim

```bash
npm run step2
```

#### Endpoint‑uri principale

- `GET /books` – la fel ca în pasul 1.
- `POST /books` – adăugare carte nouă.

#### Configurarea Postman pentru `POST /books`

1. Deschidem Postman.
2. Method: `POST`
3. URL: `http://localhost:3001/books`
4. Tab **Headers**:
   - `Content-Type: application/json`
5. Tab **Body**:
   - selectăm `raw`;
   - tip: `JSON`.
6. Exemplu body:

```json
{
  "id": 4,
  "title": "Harry Potter and the Chamber of Secrets",
  "author": "J.K. Rowling",
  "year": 1998
}
```

#### Comportament așteptat

- Dacă lipsesc `id`, `title` sau `author` → răspuns `400 Bad Request` cu mesaj JSON de eroare.
- Dacă `id` există deja în listă → răspuns `409 Conflict`.
- Dacă totul este în regulă → răspuns `201 Created` și cartea nouă este returnată în body.

#### Ce subliniem la seminar

- Rolul middleware‑ului `app.use(express.json());`.
- Diferența dintre **parametrii URL** și **corpul cererii**.
- Semnificația codurilor de status:
  - `201 Created` pentru creare;
  - `400 Bad Request` pentru input invalid;
  - `409 Conflict` pentru conflict de resurse (ID existent).

---

### Pasul 3 – `DELETE /books/:id` (parametri de rută)

#### Scop didactic

- Introducerea parametrilor de rută (route params) în Express.
- Implementarea metodei `DELETE` pentru resurse.
- Consolidarea operațiilor CRUD de bază:
  - **C:** `POST /books`
  - **R:** `GET /books`
  - **D:** `DELETE /books/:id`

#### Cum pornim

```bash
npm run step3
```

#### Endpoint‑uri principale

- `GET /books`
- `POST /books`
- `DELETE /books/:id`

#### Testare `DELETE` cu Postman

1. Method: `DELETE`
2. URL: `http://localhost:3001/books/3` (de exemplu, pentru a șterge cartea cu `id = 3`).
3. Fără body.

#### Comportament așteptat

- Dacă există cartea cu `id` dat → răspuns `204 No Content` și cartea este ștearsă din listă.
- Dacă nu există → răspuns `404 Not Found` cu un obiect JSON de eroare.

#### Ce subliniem la seminar

- Utilizarea `req.params.id` și conversia la Number.
- Diferența conceptuală între:
  - `req.params` – parte din URL (identificator de resursă);
  - `req.body` – conținutul cererii (datele de creat/actualizat).
- De ce `DELETE` întoarce de multe ori `204 No Content` (nu mai avem body util de trimis).

---

### Pasul 4 – Router modular `/status` (organizare de cod)

#### Scop didactic

- Introducerea conceptului de **router modular** în Express.
- Definirea unui endpoint de tip *health check* (`GET /status`).
- Pregătirea terenului pentru aplicații mai mari prin separarea logică a rutelor.

#### Cum pornim

```bash
npm run step4
```

#### Endpoint‑uri principale

- `GET /books`
- `POST /books`
- `DELETE /books/:id`
- `GET /status` – printr‑un router separat.

#### Testare `GET /status`

- Browser sau Postman:

  ```text
  GET http://localhost:3001/status
  ```

- Răspuns: JSON cu
  - `status: "ok"`
  - un mesaj de succes
  - `timestamp` (ISO).

#### Ce subliniem la seminar

- Utilizarea `express.Router()`:

  ```js
  const statusRouter = express.Router();
  statusRouter.get('/', ...);
  app.use('/status', statusRouter);
  ```

- Beneficiile modularizării:
  - cod mai ușor de întreținut;
  - separarea responsabilităților (status, autentificare, resurse etc.).

---

### Pasul 5 – Router `/departments` + integrare `db.js`

#### Scop didactic

- Introducerea unei a doua resurse: `departments`.
- Folosirea unui router modular separat (`routes/departments.js`).
- Organizarea codului pe tipuri de resurse.

#### Cum pornim

```bash
npm run step5
```

#### Endpoint‑uri principale

**Pentru cărți:**

- `GET /books`
- `POST /books`
- `DELETE /books/:id`

**Pentru departamente:**

- `GET /departments`
- `GET /departments/:id`
- `POST /departments`
- `DELETE /departments/:id`

#### Exemplu `GET /departments`

- Browser sau Postman:

  ```text
  GET http://localhost:3001/departments
  ```

- Răspuns JSON (exemplu):

  ```json
  [
    { "id": 1, "name": "Gryffindor", "head": "Minerva McGonagall" },
    { "id": 2, "name": "Ravenclaw", "head": "Filius Flitwick" }
  ]
  ```

#### Exemplu `POST /departments` cu Postman

1. Method: `POST`
2. URL: `http://localhost:3001/departments`
3. Header: `Content-Type: application/json`
4. Body (raw, JSON):

```json
{
  "id": 5,
  "name": "Magizoology",
  "head": "Newt Scamander"
}
```

#### Comportament așteptat

- Dacă lipsesc `id`, `name` sau `head` → `400 Bad Request`.
- Dacă `id` este deja folosit → `409 Conflict`.
- Altfel → `201 Created` + departamentul nou în body.

#### Ce subliniem la seminar

- Integrarea routerului modular:

  ```js
  const departmentsRouter = require('./routes/departments');
  app.use('/departments', departmentsRouter);
  ```

- Faptul că **același `db.js`** este reutilizat de mai multe resurse.

---

### Pasul 6 – Middleware global de logging

#### Scop didactic

- Introducerea **middleware‑ului global** în Express.
- Logarea tuturor cererilor HTTP (method, URL, status, timp de răspuns).
- Înțelegerea faptului că fiecare cerere trece printr‑un *pipeline* de middleware‑uri.

#### Cum pornim

```bash
npm run step6
```

#### Comportament nou

Înainte de rute, avem:

```js
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });
  next();
});
```

La fiecare cerere (GET/POST/DELETE, pentru `books` și `departments`), în consolă vedem un log de forma:

```text
[2025-11-19T10:15:30.123Z] GET /books -> 200 (3ms)
```

#### Ce subliniem la seminar

- Poziția middleware‑ului în fișier este importantă:
  - dacă îl plasăm **înainte** de rute → loghează toate rutele;
  - dacă îl plasăm după unele rute → nu va vedea acele cereri.
- Noțiunea de `next()`:
  - middleware‑ul trebuie să predea controlul mai departe;
  - altfel, cererea rămâne „blocată".

---

### Pasul 7 – Validare avansată prin middleware (ex. `POST /books`)

#### Scop didactic

- Refactorizarea validării într‑un **middleware dedicat**.
- Separarea clară între:
  - logica de infrastructură (middleware);
  - logica de business (handlerul rutei).

#### Cum pornim

```bash
npm run step7
```

#### Noutate principală

Definim un middleware `validateBook`:

```js
function validateBook(req, res, next) {
  const { id, title, author, year } = req.body || {};
  if (!id || !title || !author) {
    return res.status(400).json({
      error: 'Pentru carte sunt necesare campurile id, title si author.'
    });
  }
  if (year && typeof year !== 'number') {
    return res.status(400).json({
      error: 'Campul year (daca este prezent) trebuie sa fie numeric.'
    });
  }
  next();
}
```

Iar pe ruta `POST /books` îl folosim astfel:

```js
app.post('/books', validateBook, (req, res) => {
  // handlerul efectiv – presupune ca datele au trecut deja de validare
});
```

#### Ce subliniem la seminar

- Avantajele middleware‑ului de validare:
  - reutilizabil;
  - ușor de testat separat;
  - clarifică responsabilitățile (handlerul se concentrează pe salvare și răspuns).
- Paralele cu proiecte reale:
  - validarea schemelor (ex. Joi, Zod, Yup);
  - validări diferite pentru rute diferite.

---

### Pasul 8 – API complet: logging + validare + routere + 404 + handler de erori

#### Scop didactic

Integrarea tuturor componentelor într‑un API cât de cât „realist":

- resurse multiple (`books`, `departments`);
- logging global;
- validare;
- routere modulare;
- 404 pentru rute inexistente;
- handler global pentru erori interne (500).

#### Cum pornim

```bash
npm run step8
```

#### Endpoint‑uri principale

- `GET /` – întoarce un mic „overview" JSON cu lista de endpoint‑uri utile.
- `GET /books`, `POST /books`, `DELETE /books/:id`
- `GET /departments`, `GET /departments/:id`, `POST /departments`, `DELETE /departments/:id`
- `GET /error-test` – rută care declanșează intenționat o eroare.

#### 404 – rute neidentificate

La final, există:

```js
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Ruta nu a fost gasita.'
  });
});
```

Orice cerere către o rută care nu există (ex. `GET /xxyz`) va primi un răspuns:

```json
{
  "error": "Ruta nu a fost gasita."
}
```

#### Handler global de erori (500)

Ultimul middleware este de forma:

```js
app.use((err, req, res, next) => {
  console.error('=== EROARE GLOBALA (STEP 8) ===');
  console.error(err.stack);
  res.status(500).json({
    error: 'Eroare interna a serverului.',
    message: err.message
  });
});
```

- Orice eroare transmisă prin `next(err)` sau aruncată în interiorul unei rute va fi interceptată aici.
- În consolă vedem `err.stack`, în client un JSON de tip 500.

#### Testare rapidă a handlerului de erori

Pornim pasul 8 și accesăm în browser sau Postman:

```text
GET http://localhost:3001/error-test
```

Ne așteptăm la:

- **în consolă:** stack‑ul erorii;
- **în client:**

  ```json
  {
    "error": "Eroare interna a serverului.",
    "message": "Eroare de test declansata intentionat in STEP 8."
  }
  ```

#### Ce subliniem la seminar

- Importanța unei **strategii coerente de gestionare a erorilor**:
  - coduri HTTP explicite;
  - mesaje clare pentru client;
  - logare detaliată (stack) pe server.
- Diferența între:
  - erorile „de utilizare" (400, 404, 409);
  - erorile „interne" (500).

---

## 6. Recapitulare generală

De la **pasul 1 la pasul 8**, studenții parcurg practic o mini‑evoluție de API:

1. **Server minimal + GET JSON** (pasul 1)
2. **Crearea de resurse cu POST** + JSON body (pasul 2)
3. **Ștergerea resurselor cu DELETE** și route params (pasul 3)
4. **Router modular /status** – organizare mai bună a codului (pasul 4)
5. **A doua resursă /departments** – structură de API cu mai multe entități (pasul 5)
6. **Middleware de logging** – vizibilitatea tuturor cererilor (pasul 6)
7. **Validare prin middleware** – separarea preocupărilor (pasul 7)
8. **Integrare completă + 404 + handler de erori** – API robust (pasul 8)

### Cunoștințe dobândite

Pentru proiectele reale, după acest seminar, studenții au deja:

- un model mental clar pentru:
  - cum pornesc un server Express;
  - cum definesc resurse REST și rute pentru ele;
  - cum structurează proiectul pe module și routere;
  - cum introduc middleware‑uri transversale (logging, validare);
  - cum tratează erorile și rutele inexistente.

### Recomandare pentru acasă

Modificați exemplele:

- să adăugați noi câmpuri la `books` (ex. `genre`, `rating`);
- să extindeți `departments` (ex. `location`, `studentsCount`);
- să introduceți `PUT /books/:id` (actualizare carte);
- să scrieți propriul middleware de audit (de ex. logare în fișier).

---

## Licență și utilizare

Acest README.md poate fi folosit ca ghid atât pentru **predare**, cât și pentru **auto‑studiu** al conceptelor de bază în REST și Express.js.
