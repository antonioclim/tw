# 🎬 Movie App — Vanilla JS + Express + Sequelize

> **Kit:** `S11clim_NoRRwithSQL.zip`  
> **Seminar S11** | Tehnologii Web | ASE-CSIE

O aplicație **full-stack** de catalog de filme construită cu **JavaScript pur** (fără React), **Express.js** pe server și **Sequelize ORM** cu **SQLite** pentru persistența datelor.

---

## 📋 Cuprins

1. [Despre Aplicație](#-despre-aplicație)
2. [Tehnologii Folosite](#-tehnologii-folosite)
3. [Ce Veți Învăța](#-ce-veți-învăța)
4. [Structura Proiectului](#-structura-proiectului)
5. [Instalare și Configurare](#-instalare-și-configurare)
6. [Rularea Aplicației](#-rularea-aplicației)
7. [Funcționalități](#-funcționalități)
8. [Arhitectura Aplicației](#-arhitectura-aplicației)
9. [API REST — Endpoint-uri](#-api-rest--endpoint-uri)
10. [Explicația Codului](#-explicația-codului)
11. [Concepte Demonstrate](#-concepte-demonstrate)
12. [Comparație cu Alte Abordări](#-comparație-cu-alte-abordări)
13. [Exerciții Propuse](#-exerciții-propuse)
14. [Depanare](#-depanare)

---

## 📖 Despre Aplicație

**Movie App (Vanilla JS + Sequelize)** este o aplicație full-stack care demonstrează dezvoltarea web fără framework-uri frontend moderne:

- **Frontend** — JavaScript pur cu manipulare DOM directă
- **Backend** — Express.js ca server HTTP și API REST
- **Persistență** — Sequelize ORM cu SQLite (bază de date locală în fișier)
- **Integrare API extern** — The Movie Database (TMDB) pentru date despre filme

### Ce face aplicația?

1. **Afișează filme populare** de la TMDB API
2. **Permite căutarea** filmelor după titlu
3. **Gestionează o listă de favorite** salvată în baza de date SQLite
4. **Navigare între view-uri** (Home și Favorites) fără reîncărcare

### De ce acest kit?

Acest kit reprezintă o abordare **"back to basics"**:

| Concept | În acest kit | În kit-uri React |
|---------|--------------|------------------|
| **Manipulare DOM** | Directă (`document.createElement`) | Abstractizată (Virtual DOM) |
| **State management** | Variabile globale + re-render manual | React Hooks / Redux |
| **Persistență** | SQLite pe server | LocalStorage în browser |
| **Comunicare client-server** | API REST explicit | Poate fi ascunsă |

**Ideal pentru:**
- Înțelegerea fundamentelor înainte de a folosi framework-uri
- Învățarea Express.js și crearea de API-uri REST
- Primul contact cu ORM-uri și baze de date relaționale
- Compararea paradigmelor imperative vs declarative

---

## 🛠 Tehnologii Folosite

### Stack Complet

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  HTML5 + CSS3 + JavaScript (ES5/ES6)                │   │
│  │  • Manipulare DOM directă                           │   │
│  │  • Fetch API pentru HTTP                            │   │
│  │  • Pattern IIFE pentru încapsulare                  │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                        BACKEND                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Node.js + Express.js                               │   │
│  │  • Server HTTP                                      │   │
│  │  • API REST (/api/favorites)                        │   │
│  │  • Static file serving                              │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                      PERSISTENȚĂ                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Sequelize ORM + SQLite                             │   │
│  │  • Model: FavoriteMovie                             │   │
│  │  • Fișier: database.sqlite                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Versiuni și Dependențe

| Tehnologie | Versiune | Rol |
|------------|----------|-----|
| **Node.js** | 18+ | Runtime JavaScript pe server |
| **Express** | 4.21.2 | Framework web pentru API și server |
| **Sequelize** | 6.37.3 | ORM pentru interacțiunea cu baza de date |
| **SQLite3** | 5.1.7 | Bază de date embeddedă (fișier local) |
| **TMDB API** | v3 | Sursa externă pentru datele despre filme |

### De ce aceste tehnologii?

- **Express.js** — Cel mai popular framework Node.js, minimal și flexibil
- **Sequelize** — ORM matur, suportă multiple dialecte SQL
- **SQLite** — Zero configurare, ideal pentru dezvoltare și învățare
- **Vanilla JS** — Înțelegere profundă a fundamentelor, fără abstractizări

---

## 🎓 Ce Veți Învăța

### Backend / Server-side

| Concept | Fișier | Descriere |
|---------|--------|-----------|
| **Crearea unui server HTTP** | `server.js` | `express()` și `app.listen()` |
| **Middleware Express** | `server.js` | `express.json()`, `express.static()` |
| **Definirea rutelor API** | `server.js` | `app.get()`, `app.post()`, `app.delete()` |
| **Răspunsuri HTTP** | `server.js` | Status codes (200, 201, 204, 400, 404, 500) |
| **Async/Await în Express** | `server.js` | Handlers asincroni cu try/catch |

### ORM și Baze de Date

| Concept | Fișier | Descriere |
|---------|--------|-----------|
| **Configurare Sequelize** | `models/index.js` | Conexiunea la SQLite |
| **Definirea modelelor** | `models/FavoriteMovie.js` | `sequelize.define()` cu DataTypes |
| **Operațiuni CRUD** | `server.js` | `findAll`, `upsert`, `destroy` |
| **Sincronizare schemă** | `server.js` | `sequelize.sync()` |

### Frontend / Client-side

| Concept | Fișier | Descriere |
|---------|--------|-----------|
| **IIFE Pattern** | `js/api.js`, `js/app.js` | Încapsulare și evitarea poluării globale |
| **Manipulare DOM** | `js/app.js` | `createElement`, `appendChild`, `innerHTML` |
| **Event Handling** | `js/app.js` | `addEventListener` pentru click, submit |
| **Fetch API** | `js/api.js`, `js/app.js` | Cereri HTTP către TMDB și backend |
| **Promisiuni** | Tot codul | `.then()`, `.catch()`, `.finally()` |

### Concepte Web Generale

- **Arhitectură Client-Server**
- **API REST** (GET, POST, DELETE)
- **JSON** ca format de schimb de date
- **Servirea fișierelor statice**
- **Single Page Application** (fără framework)

---

## 📁 Structura Proiectului

```
S11clim_NoRRwithSQL/
│
├── 📄 package.json            # Dependențe Node.js și scripturi
├── 📄 server.js               # Server Express + API REST
├── 📄 README.md               # Documentație
│
├── 📁 models/                 # Sequelize ORM
│   ├── 📄 index.js            # Configurare conexiune SQLite
│   └── 📄 FavoriteMovie.js    # Model pentru filmele favorite
│
├── 📄 index.html              # Pagina principală (SPA shell)
│
├── 📁 js/                     # JavaScript client-side
│   ├── 📄 config.example.js   # Șablon pentru cheia API TMDB
│   ├── 📄 api.js              # Wrapper TMDB API (obiect global TMDB)
│   └── 📄 app.js              # Logica principală a aplicației
│
├── 📁 css/                    # Stiluri
│   └── 📄 styles.css          # Toate stilurile aplicației
│
└── 📄 database.sqlite         # [GENERAT] Baza de date SQLite
```

### Explicația Structurii

| Fișier/Director | Responsabilitate |
|-----------------|------------------|
| `server.js` | Punct de intrare server, definește API-ul REST |
| `models/` | Layer-ul de date (ORM Sequelize) |
| `index.html` | Shell-ul aplicației (structura HTML) |
| `js/` | Logica client-side (fără bundler) |
| `css/` | Stilizare |
| `database.sqlite` | Fișierul bazei de date (creat automat) |

---

## ⚙️ Instalare și Configurare

### Cerințe Preliminare

- **Node.js** versiune 18+ ([descărcare](https://nodejs.org/))
- **npm** (inclus cu Node.js)
- **Editor de cod** (recomandat: VS Code)
- **Cont TMDB** pentru cheia API

### Pasul 1: Dezarhivare

```bash
# Dezarhivați kit-ul
unzip S11clim_NoRRwithSQL.zip

# Intrați în directorul proiectului
cd S11clim_NoRRwithSQL
```

### Pasul 2: Instalarea Dependențelor

```bash
npm install
```

**Ce se instalează:**
```
node_modules/
├── express/        # Framework web
├── sequelize/      # ORM
└── sqlite3/        # Driver SQLite (binare native)
```

> ⚠️ **Notă:** Instalarea `sqlite3` poate dura mai mult deoarece compilează binare native.

### Pasul 3: Obținerea Cheii API TMDB

Aplicația necesită o cheie API de la **The Movie Database** pentru a afișa filme.

1. **Creați un cont gratuit** pe [themoviedb.org](https://www.themoviedb.org/)
2. **Verificați email-ul** (veți primi un link de confirmare)
3. **Navigați la setări API:**
   - Click pe avatar (colțul dreapta-sus)
   - Settings → API
4. **Solicitați o cheie:**
   - Click pe "Create" sau "Request an API Key"
   - Selectați "Developer"
   - Completați formularul (scop: educațional)
   - Acceptați termenii
5. **Copiați cheia API (v3 auth)**

### Pasul 4: Configurarea Cheii API

```bash
# Creați fișierul config.js din șablon
cp js/config.example.js js/config.js

# SAU pe Windows:
# copy js\config.example.js js\config.js
```

Deschideți `js/config.js` și înlocuiți valoarea:

```javascript
// ÎNAINTE:
var TMDB_API_KEY = "YOUR_TMDB_API_KEY_HERE";

// DUPĂ (exemplu - folosiți cheia VOASTRĂ):
var TMDB_API_KEY = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";
```

> ⚠️ **Important:** 
> - Folosiți `var` (nu `const` sau `let`) pentru compatibilitate cu scripturile existente
> - Nu includeți spații în jurul valorii

---

## 🚀 Rularea Aplicației

### Pornirea Serverului

```bash
npm start
```

**Output așteptat:**
```
Movie App (vanilla JS + Sequelize) running at http://localhost:4000
```

### Deschiderea Aplicației

Navigați în browser la: **http://localhost:4000**

### Ce se întâmplă la pornire?

1. **Sequelize se conectează** la SQLite (creează `database.sqlite` dacă nu există)
2. **Schema se sincronizează** (creează tabelul `FavoriteMovies`)
3. **Express pornește** pe portul 4000
4. **Fișierele statice** (HTML, CSS, JS) sunt servite din directorul rădăcină

### Oprirea Serverului

Apăsați `Ctrl + C` în terminal.

---

## 🎯 Funcționalități

### 1. Pagina Home — Filme Populare

**Ce vedeți:**
- Lista cu cele mai populare filme din TMDB
- Formular de căutare
- Carduri de film cu poster, titlu și an
- Buton pentru adăugare la favorite

**Interfața:**
```
┌─────────────────────────────────────────────────────────┐
│                    [Movie App]                          │
│                 Home    Favourites                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Discover movies                                        │
│  ┌─────────────────────────────┐ ┌────────┐            │
│  │ Search for a movie...       │ │ Search │            │
│  └─────────────────────────────┘ └────────┘            │
│                                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ [Poster]│  │ [Poster]│  │ [Poster]│  │ [Poster]│   │
│  │         │  │         │  │         │  │         │   │
│  │ Title   │  │ Title   │  │ Title   │  │ Title   │   │
│  │ 2024    │  │ 2023    │  │ 2024    │  │ 2022    │   │
│  │[+ Fav]  │  │[- Fav]  │  │[+ Fav]  │  │[+ Fav]  │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2. Căutare Filme

**Flux:**
1. Introduceți termenul de căutare
2. Apăsați "Search" sau Enter
3. Aplicația face cerere către TMDB API
4. Rezultatele înlocuiesc lista de filme populare

### 3. Gestionarea Favoritelor

**Adăugare la favorite:**
```
Click "Add to favourites"
        │
        ▼
┌───────────────────────┐
│   POST /api/favorites │
│   { tmdbId, title,    │
│     posterPath,       │
│     releaseDate }     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│   Sequelize upsert    │
│   FavoriteMovie       │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│   SQLite INSERT       │
│   database.sqlite     │
└───────────────────────┘
```

**Eliminare din favorite:**
```
Click "Remove from favourites"
        │
        ▼
┌───────────────────────┐
│DELETE /api/favorites/ │
│       :tmdbId         │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  Sequelize destroy    │
│  WHERE tmdbId = X     │
└───────────────────────┘
```

### 4. Pagina Favourites

**Ce vedeți:**
- Lista filmelor salvate în baza de date
- Posibilitate de a elimina filme din favorite
- Mesaj când lista e goală

### 5. Persistență în Baza de Date

**Diferență față de LocalStorage:**
- Datele sunt pe **server**, nu în browser
- Persistă între **sesiuni și dispozitive**
- Pot fi **inspectate și modificate** cu tool-uri SQL

**Verificare bază de date:**
```bash
# Instalați sqlite3 CLI (opțional)
# macOS: brew install sqlite3
# Ubuntu: sudo apt install sqlite3

# Deschideți baza de date
sqlite3 database.sqlite

# Vedeți tabelele
.tables

# Vedeți structura
.schema FavoriteMovies

# Vedeți datele
SELECT * FROM FavoriteMovies;

# Ieșire
.quit
```

---

## 🏗 Arhitectura Aplicației

### Diagrama Generală

```
┌─────────────────────────────────────────────────────────────────┐
│                           BROWSER                               │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                      index.html                           │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │ │
│  │  │   api.js    │  │   app.js    │  │   styles.css    │   │ │
│  │  │  (TMDB)     │  │  (DOM +     │  │                 │   │ │
│  │  │             │  │   Events)   │  │                 │   │ │
│  │  └──────┬──────┘  └──────┬──────┘  └─────────────────┘   │ │
│  └─────────┼────────────────┼────────────────────────────────┘ │
│            │                │                                   │
│            │ TMDB API       │ /api/favorites                   │
│            │ (external)     │ (internal)                       │
└────────────┼────────────────┼───────────────────────────────────┘
             │                │
             ▼                ▼
┌────────────────┐    ┌──────────────────────────────────────────┐
│   TMDB API     │    │              EXPRESS SERVER              │
│  (themoviedb   │    │  ┌────────────────────────────────────┐  │
│   .org)        │    │  │           server.js                │  │
└────────────────┘    │  │                                    │  │
                      │  │   GET  /api/favorites              │  │
                      │  │   POST /api/favorites              │  │
                      │  │   DELETE /api/favorites/:tmdbId    │  │
                      │  │                                    │  │
                      │  └──────────────┬─────────────────────┘  │
                      │                 │                        │
                      │                 ▼                        │
                      │  ┌────────────────────────────────────┐  │
                      │  │         SEQUELIZE ORM             │  │
                      │  │    models/FavoriteMovie.js        │  │
                      │  └──────────────┬─────────────────────┘  │
                      │                 │                        │
                      │                 ▼                        │
                      │  ┌────────────────────────────────────┐  │
                      │  │           SQLite                   │  │
                      │  │       database.sqlite              │  │
                      │  └────────────────────────────────────┘  │
                      └──────────────────────────────────────────┘
```

### Fluxul de Date

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   BROWSER   │  HTTP   │   EXPRESS   │  SQL    │   SQLite    │
│   (Client)  │ ◄─────► │   (Server)  │ ◄─────► │    (DB)     │
└─────────────┘         └─────────────┘         └─────────────┘
      │                       │                       │
      │ 1. GET /api/favorites │                       │
      │ ──────────────────────►                       │
      │                       │ 2. SELECT * FROM      │
      │                       │    FavoriteMovies     │
      │                       │ ──────────────────────►
      │                       │                       │
      │                       │ 3. [rows]             │
      │                       │ ◄──────────────────────
      │ 4. JSON response      │                       │
      │ ◄──────────────────────                       │
      │                       │                       │
```

---

## 🔌 API REST — Endpoint-uri

### Sumar

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| `GET` | `/api/favorites` | Listează toate favoritele |
| `POST` | `/api/favorites` | Adaugă un film la favorite |
| `DELETE` | `/api/favorites/:tmdbId` | Șterge un film din favorite |

---

### GET /api/favorites

**Descriere:** Returnează lista completă de filme favorite.

**Request:**
```http
GET /api/favorites HTTP/1.1
Host: localhost:4000
```

**Response (200 OK):**
```json
[
  {
    "tmdbId": 550,
    "title": "Fight Club",
    "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "releaseDate": "1999-10-15"
  },
  {
    "tmdbId": 680,
    "title": "Pulp Fiction",
    "posterPath": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    "releaseDate": "1994-09-10"
  }
]
```

**Response (500 Internal Server Error):**
```json
{
  "error": "Failed to fetch favourites."
}
```

---

### POST /api/favorites

**Descriere:** Adaugă sau actualizează un film în favorite (upsert).

**Request:**
```http
POST /api/favorites HTTP/1.1
Host: localhost:4000
Content-Type: application/json

{
  "tmdbId": 550,
  "title": "Fight Club",
  "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "releaseDate": "1999-10-15"
}
```

**Câmpuri obligatorii:**
- `tmdbId` (number) — ID-ul filmului în TMDB
- `title` (string) — Titlul filmului

**Câmpuri opționale:**
- `posterPath` (string | null) — Calea către poster
- `releaseDate` (string | null) — Data lansării

**Response (201 Created):**
```json
{
  "tmdbId": 550,
  "title": "Fight Club",
  "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "releaseDate": "1999-10-15"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "tmdbId and title are required fields."
}
```

---

### DELETE /api/favorites/:tmdbId

**Descriere:** Șterge un film din favorite.

**Request:**
```http
DELETE /api/favorites/550 HTTP/1.1
Host: localhost:4000
```

**Response (204 No Content):**
```
(empty body)
```

**Response (404 Not Found):**
```json
{
  "error": "Favourite not found."
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Invalid tmdbId parameter."
}
```

---

### Testarea API-ului cu cURL

```bash
# GET toate favoritele
curl http://localhost:4000/api/favorites

# POST adaugă un film
curl -X POST http://localhost:4000/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"tmdbId": 550, "title": "Fight Club", "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", "releaseDate": "1999-10-15"}'

# DELETE șterge un film
curl -X DELETE http://localhost:4000/api/favorites/550
```

---

## 📝 Explicația Codului

### 1. Server Express (`server.js`)

```javascript
const express = require("express");
const path = require("path");
const sequelize = require("./models");           // Conexiunea la DB
const FavoriteMovie = require("./models/FavoriteMovie"); // Modelul

const app = express();
const PORT = 4000;

// MIDDLEWARE
// Parsează JSON din body-ul request-urilor
app.use(express.json());

// Servește fișierele statice din directorul curent
app.use(express.static(__dirname));

// RUTE API
// GET - listează toate favoritele
app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await FavoriteMovie.findAll({
      order: [["createdAt", "DESC"]],  // Cele mai recente primele
    });
    
    // Transformă modelele Sequelize în obiecte simple
    res.json(favorites.map((fav) => ({
      tmdbId: fav.tmdbId,
      title: fav.title,
      posterPath: fav.posterPath,
      releaseDate: fav.releaseDate,
    })));
  } catch (error) {
    console.error("[API] GET /api/favorites error:", error);
    res.status(500).json({ error: "Failed to fetch favourites." });
  }
});

// POST - adaugă la favorite (upsert = insert or update)
app.post("/api/favorites", async (req, res) => {
  try {
    const { tmdbId, title, posterPath, releaseDate } = req.body;

    // Validare
    if (typeof tmdbId === "undefined" || !title) {
      return res.status(400).json({ 
        error: "tmdbId and title are required fields." 
      });
    }

    // Upsert: inserează sau actualizează dacă există
    const [favorite] = await FavoriteMovie.upsert({
      tmdbId,
      title,
      posterPath: posterPath || null,
      releaseDate: releaseDate || null,
    });

    res.status(201).json({
      tmdbId: favorite.tmdbId,
      title: favorite.title,
      posterPath: favorite.posterPath,
      releaseDate: favorite.releaseDate,
    });
  } catch (error) {
    console.error("[API] POST /api/favorites error:", error);
    res.status(500).json({ error: "Failed to save favourite." });
  }
});

// DELETE - șterge din favorite
app.delete("/api/favorites/:tmdbId", async (req, res) => {
  try {
    const tmdbId = parseInt(req.params.tmdbId, 10);
    
    if (Number.isNaN(tmdbId)) {
      return res.status(400).json({ error: "Invalid tmdbId parameter." });
    }

    const deletedCount = await FavoriteMovie.destroy({
      where: { tmdbId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Favourite not found." });
    }

    res.status(204).send();  // 204 = No Content
  } catch (error) {
    console.error("[API] DELETE error:", error);
    res.status(500).json({ error: "Failed to delete favourite." });
  }
});

// FALLBACK: trimite index.html pentru orice altă rută
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// PORNIRE SERVER
async function start() {
  try {
    await sequelize.authenticate();  // Testează conexiunea
    await sequelize.sync();          // Sincronizează schema (creează tabele)
    
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
```

**Concepte cheie:**
- **`express.json()`** — Middleware pentru parsarea JSON din request body
- **`express.static()`** — Middleware pentru servirea fișierelor statice
- **`async/await`** — Gestiunea operațiilor asincrone
- **`res.status().json()`** — Setarea codului HTTP și trimiterea JSON
- **`sequelize.sync()`** — Creează/actualizează tabelele bazat pe modele

---

### 2. Modelul Sequelize (`models/FavoriteMovie.js`)

```javascript
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const FavoriteMovie = sequelize.define(
  "FavoriteMovie",  // Numele modelului
  {
    // CÂMPURI (COLOANE)
    tmdbId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,  // ID-ul TMDB este cheia primară
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterPath: {
      type: DataTypes.STRING,
      allowNull: true,  // Poate fi null
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // OPȚIUNI
    tableName: "FavoriteMovies",  // Numele tabelului în DB
    timestamps: true,  // Adaugă createdAt și updatedAt
  }
);

module.exports = FavoriteMovie;
```

**DataTypes comune:**
| Tip | Descriere |
|-----|-----------|
| `STRING` | VARCHAR(255) |
| `TEXT` | TEXT lung |
| `INTEGER` | Număr întreg |
| `FLOAT` | Număr cu virgulă |
| `BOOLEAN` | True/False |
| `DATE` | Dată și oră |

---

### 3. Configurare Conexiune (`models/index.js`)

```javascript
const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",                                    // Tipul bazei de date
  storage: path.join(__dirname, "..", "database.sqlite"), // Calea către fișier
  logging: false,  // Dezactivează logarea SQL (setați true pentru debug)
});

module.exports = sequelize;
```

---

### 4. IIFE Pattern (`js/api.js`)

```javascript
/**
 * IIFE = Immediately Invoked Function Expression
 * Permite încapsularea codului și evitarea poluării namespace-ului global
 */
(function (global) {
  "use strict";

  // Variabile private (nu sunt accesibile din exterior)
  var API_KEY = typeof TMDB_API_KEY !== "undefined" ? TMDB_API_KEY : "";
  var BASE_URL = "https://api.themoviedb.org/3";

  // Funcție privată
  function safeFetch(url) {
    return fetch(url).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) {
          throw new Error(data.status_message || "Request failed");
        }
        return data;
      });
    });
  }

  // Funcții publice
  function getPopularMovies() {
    if (!API_KEY) {
      console.warn("[TMDB] No API key configured.");
      return Promise.resolve([]);
    }

    var url = BASE_URL + "/movie/popular?api_key=" + API_KEY + "&language=en-GB&page=1";
    return safeFetch(url).then(function (data) {
      return Array.isArray(data.results) ? data.results : [];
    });
  }

  function searchMovies(query) {
    // Similar cu getPopularMovies...
  }

  // Expune obiectul TMDB în scope-ul global (window)
  global.TMDB = {
    getPopularMovies: getPopularMovies,
    searchMovies: searchMovies,
  };

})(window);  // Pasează window ca argument

// Acum TMDB este disponibil global:
// TMDB.getPopularMovies().then(...)
```

**De ce IIFE?**
- **Încapsulare** — Variabilele private nu sunt accesibile din exterior
- **Evitarea coliziunilor** — Nu poluează namespace-ul global
- **Pattern clasic** — Utilizat înainte de ES6 modules

---

### 5. Manipulare DOM (`js/app.js`)

```javascript
// Crearea unui card de film programatic
function createMovieCard(movie) {
  // Creează elementul principal
  var card = document.createElement("article");
  card.className = "movie-card";

  // Creează imaginea sau placeholder
  var imageContainer;
  if (movie.poster_path) {
    var img = document.createElement("img");
    img.className = "movie-poster";
    img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    img.alt = movie.title || "Movie poster";
    imageContainer = img;
  } else {
    var placeholder = document.createElement("div");
    placeholder.className = "movie-poster placeholder";
    var span = document.createElement("span");
    span.textContent = "No image";
    placeholder.appendChild(span);
    imageContainer = placeholder;
  }
  card.appendChild(imageContainer);

  // Creează body-ul cardului
  var body = document.createElement("div");
  body.className = "movie-body";

  // Titlu
  var title = document.createElement("h3");
  title.className = "movie-title";
  title.textContent = movie.title || "Untitled";
  body.appendChild(title);

  // An
  var year = movie.release_date ? movie.release_date.split("-")[0] : "Unknown";
  var meta = document.createElement("p");
  meta.className = "movie-meta";
  meta.textContent = year;
  body.appendChild(meta);

  // Buton favorite cu event listener
  var favButton = document.createElement("button");
  favButton.type = "button";
  favButton.className = "favorite-button";
  
  favButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Logica pentru add/remove favorite...
  });

  body.appendChild(favButton);
  card.appendChild(body);
  
  return card;
}

// Randarea unei liste de filme
function renderMoviesGrid(container, movies) {
  container.innerHTML = "";  // Golește containerul

  for (var i = 0; i < movies.length; i++) {
    var card = createMovieCard(movies[i]);
    container.appendChild(card);
  }
}
```

**Diferența față de React:**

| Vanilla JS | React |
|------------|-------|
| `document.createElement("div")` | `<div>` în JSX |
| `element.appendChild(child)` | Copii în JSX |
| `element.className = "..."` | `className="..."` |
| `element.textContent = "..."` | `{text}` în JSX |
| `element.addEventListener("click", fn)` | `onClick={fn}` |

---

## 🔬 Concepte Demonstrate

### 1. Pattern-uri JavaScript

| Pattern | Locație | Descriere |
|---------|---------|-----------|
| **IIFE** | `api.js`, `app.js` | Încapsulare fără ES6 modules |
| **Module Pattern** | `api.js` | Expunerea selectivă a funcțiilor |
| **Revealing Module** | `api.js` | Obiect public cu metode |

### 2. Paradigme de Programare

| Concept | Exemplu în cod |
|---------|----------------|
| **Imperativ** | `container.innerHTML = ""` (spui CUM) |
| **Procedural** | Funcții care modifică state-ul |
| **Event-driven** | `addEventListener` pentru interacțiuni |

### 3. Operațiuni CRUD

| Operație | HTTP Method | Sequelize | SQL |
|----------|-------------|-----------|-----|
| **C**reate | POST | `upsert()` | INSERT |
| **R**ead | GET | `findAll()` | SELECT |
| **U**pdate | POST | `upsert()` | UPDATE |
| **D**elete | DELETE | `destroy()` | DELETE |

---

## ⚖️ Comparație cu Alte Abordări

### Vanilla JS vs React

| Aspect | Vanilla JS (acest kit) | React |
|--------|------------------------|-------|
| **Manipulare DOM** | Directă, manuală | Virtual DOM, automată |
| **Re-render** | Manual (`innerHTML = ""`) | Automat la schimbarea state |
| **Componente** | Funcții care creează elemente | Componente declarative |
| **State** | Variabile globale | useState, Context, Redux |
| **Curba învățării** | Mai ușor la început | Mai greu, dar mai scalabil |
| **Performanță** | Depinde de implementare | Optimizat prin diffing |
| **Mentenabilitate** | Scade cu complexitatea | Bună pentru apps mari |

### SQLite vs LocalStorage

| Aspect | SQLite (acest kit) | LocalStorage |
|--------|-------------------|--------------|
| **Locație** | Server | Browser |
| **Persistență** | Permanentă pe server | Per browser |
| **Multi-device** | ✅ Da | ❌ Nu |
| **Capacitate** | Practic nelimitată | ~5-10 MB |
| **Interogări** | SQL complet | Doar key-value |
| **Securitate** | Pe server (protejat) | Vizibil în DevTools |
| **Backup** | Fișier `database.sqlite` | Export manual |

### Express vs Alte Framework-uri

| Framework | Caracteristici |
|-----------|----------------|
| **Express** (acest kit) | Minimal, flexibil, foarte popular |
| **Fastify** | Mai rapid, schema validation |
| **Koa** | Modern, middleware async |
| **NestJS** | Structurat, TypeScript, Angular-like |
| **Hapi** | Enterprise, configuration-centric |

---

## 💡 Exerciții Propuse

### Nivel Începător

1. **Adăugați rating-ul filmului**
   - În `createMovieCard()`, afișați `movie.vote_average`
   
2. **Modificați ordinea favoritelor**
   - În `server.js`, schimbați sortarea de la `DESC` la `ASC`

3. **Stilizare**
   - Modificați culorile în `css/styles.css`

### Nivel Intermediar

4. **Adăugați confirmare la ștergere**
   - Folosiți `confirm()` înainte de DELETE

5. **Implementați paginare TMDB**
   - Modificați `api.js` să accepte parametrul `page`
   - Adăugați butoane "Previous" / "Next"

6. **Adăugați endpoint pentru statistici**
   - `GET /api/favorites/stats` — returnează numărul total de favorite

### Nivel Avansat

7. **Adăugați autentificare simplă**
   - Middleware Express pentru verificare token
   - Favorite per utilizator

8. **Migrați la PostgreSQL**
   - Modificați `models/index.js` pentru Postgres
   - Folosiți variabile de mediu pentru conexiune

9. **Adăugați teste API**
   - Folosiți Jest sau Mocha pentru teste automate

10. **Implementați caching**
    - Cache rezultatele TMDB în memorie sau Redis

---

## 🔧 Depanare

### Problema: "Cannot find module 'express'"

**Cauză:** Dependențele nu sunt instalate.

**Soluție:**
```bash
npm install
```

### Problema: "SQLITE_CANTOPEN: unable to open database file"

**Cauze posibile:**
- Permisiuni insuficiente
- Cale greșită

**Soluție:**
```bash
# Verificați că directorul există și are permisiuni
ls -la models/
# Ștergeți și lăsați să se recreeze
rm -f database.sqlite
npm start
```

### Problema: "Lista de filme e goală"

**Cauze posibile:**
1. Cheia API TMDB lipsește sau e greșită
2. Fișierul `js/config.js` nu există

**Soluție:**
```bash
# Verificați că există config.js
ls js/config.js

# Dacă nu există, creați-l
cp js/config.example.js js/config.js

# Editați și adăugați cheia reală
```

### Problema: "Port 4000 is already in use"

**Soluție:**
```bash
# Găsiți procesul
lsof -i :4000
# sau pe Windows:
netstat -ano | findstr :4000

# Opriți procesul sau schimbați portul în server.js
const PORT = 4001;
```

### Problema: "CORS error" în browser

**Cauză:** Cerere de pe alt domeniu.

**Soluție:** Adăugați middleware CORS:
```javascript
// Instalați: npm install cors
const cors = require("cors");
app.use(cors());
```

### Problema: "Favourite not updating in UI"

**Cauză:** UI-ul nu se re-randează după operație.

**Verificare:**
1. Deschideți Network tab în DevTools
2. Verificați că request-urile POST/DELETE returnează 2xx
3. Verificați că `loadFavoritesFromServer()` este apelat după operație

---

## 📚 Resurse Suplimentare

### Documentație Oficială

- [Express.js Guide](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [MDN Web Docs - DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [TMDB API Docs](https://developers.themoviedb.org/3)

### Tutoriale Recomandate

- [Express.js Crash Course](https://expressjs.com/en/starter/hello-world.html)
- [Sequelize Getting Started](https://sequelize.org/docs/v6/getting-started/)
- [JavaScript DOM Manipulation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

### Tools Utile

- **Postman** — Testarea API-urilor
- **DB Browser for SQLite** — GUI pentru SQLite
- **REST Client** (VS Code extension) — Testare API în editor

---

<div align="center">

## 📊 Rezumat Kit

| Caracteristică | Valoare |
|----------------|---------|
| **Fișier** | `S11clim_NoRRwithSQL.zip` |
| **Frontend** | Vanilla JavaScript (ES5/ES6) |
| **Backend** | Express.js 4.21 |
| **ORM** | Sequelize 6.37 |
| **Bază de date** | SQLite 3 |
| **Port** | 4000 |
| **API Extern** | TMDB v3 |
| **Persistență** | Server-side (database.sqlite) |

---

**📖 Material didactic pentru Seminarul S11**

*Tehnologii Web | ASE-CSIE*

</div>
