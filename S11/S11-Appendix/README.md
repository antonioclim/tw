# 🎬 Prezentarea și Utilizarea Kit-urilor „Movie App" (S11)

> **Seminar S11** | Curs de Tehnologii Web | ASE-CSIE  
> Ghid complet de instalare, configurare și utilizare pentru toate variantele aplicației Movie App

---

## 📋 Cuprins

1. [Introducere](#-introducere)
2. [Obținerea Cheii API TMDB](#-obținerea-cheii-api-tmdb)
3. [Kit-urile Disponibile](#-kit-urile-disponibile)
   - [S11clim_NoRRwithSQL.zip](#-kit-1-s11clim_norrwithsqlzip)
   - [S11clim_NoRRnoSQL.zip](#-kit-2-s11clim_norrnosqlzip)
   - [S11clim_RRnoSQL.zip](#-kit-3-s11clim_rrnosqlzip)
   - [S11clim_RRcuSQL3001.zip](#-kit-4-s11clim_rrcusql3001zip)
4. [Comparație Detaliată între Kit-uri](#-comparație-detaliată-între-kit-uri)
5. [Continuitate Curriculară](#-continuitate-curriculară)
6. [Resurse și Referințe](#-resurse-și-referințe)

---

## 📖 Introducere

Acest document oferă o analiză detaliată a kit-urilor de aplicație tip **Movie App** (seminarul S11) puse la dispoziție, împreună cu instrucțiuni de instalare și utilizare pentru fiecare kit.

Fiecare versiune a aplicației demonstrează concepte și tehnologii diferite — de la JavaScript **Vanilla** cu DOM și programare asincronă, până la front-end modern cu **React** (folosind Context API sau **Redux**) și back-end cu **Node/Express** și **ORM** (Sequelize + SQLite).

### Ce veți învăța din aceste kit-uri:

| Concept | Kit-uri care îl demonstrează |
|---------|------------------------------|
| Manipulare DOM și Evenimente | `S11clim_NoRRwithSQL.zip` |
| Programare Asincronă (fetch, Promises) | Toate kit-urile |
| Servicii REST și Express | `S11clim_NoRRwithSQL.zip`, `S11clim_RRcuSQL3001.zip` |
| Persistență cu ORM (Sequelize) | `S11clim_NoRRwithSQL.zip`, `S11clim_RRcuSQL3001.zip` |
| React (Componente, Props, State) | `S11clim_NoRRnoSQL.zip`, `S11clim_RRnoSQL.zip`, `S11clim_RRcuSQL3001.zip` |
| Context API | `S11clim_NoRRnoSQL.zip`, `S11clim_RRnoSQL.zip` |
| Redux Toolkit | `S11clim_RRcuSQL3001.zip` |
| React Router | Toate kit-urile React |

---

## 🔑 Obținerea Cheii API TMDB

Toate aplicațiile folosesc serviciul extern **TMDB** (The Movie Database) pentru date despre filme. Acest lucru necesită o **cheie API personală**.

### Pași pentru obținerea cheii:

1. **Creați un cont TMDB**
   - Accesați [themoviedb.org](https://www.themoviedb.org)
   - Înregistrați-vă cu email, nume de utilizator și parolă
   - Verificați adresa de email (veți primi un link de confirmare)

2. **Navigați la secțiunea API**
   - Click pe avatar/profil (colțul dreapta-sus)
   - Selectați **Settings** din meniul derulant
   - În pagina de setări, accesați secțiunea **API**

3. **Solicitați o cheie API**
   - Apăsați **"Create"** sau **"Request an API Key"**
   - Specificați detalii despre utilizare (ex: scop educațional/proiect de curs)
   - Acceptați termenii de utilizare
   - Așteptați aprobarea (de obicei instantanee pentru **API v3**)

4. **Copiați cheia API**
   - Cheia (un șir lung de caractere) va fi afișată în secțiunea API din cont
   - ⚠️ **Atenție:** Cheia este personală — nu o distribuiți public!

### Unde se introduce cheia în fiecare kit:

| Kit | Fișier de configurare | Format |
|-----|----------------------|--------|
| `S11clim_NoRRwithSQL.zip` | `js/config.js` | `var TMDB_API_KEY = "cheia_ta";` |
| `S11clim_NoRRnoSQL.zip` | `.env` | `VITE_TMDB_API_KEY=cheia_ta` |
| `S11clim_RRnoSQL.zip` | `.env` | `VITE_TMDB_API_KEY=cheia_ta` |
| `S11clim_RRcuSQL3001.zip` | `.env` | `VITE_TMDB_API_KEY=cheia_ta` |

> **Notă:** Fără această cheie, aplicațiile nu vor putea prelua date reale de la TMDB (lista de filme populare va fi goală).

---

## 📦 Kit-urile Disponibile

---

### 📁 Kit 1: `S11clim_NoRRwithSQL.zip`

**Aplicație film Vanilla JS + Node/Express + Sequelize** (fără React/Redux)

#### Descriere

Acest kit reprezintă o aplicație film dezvoltată în JavaScript *Vanilla* (fără framework front-end). Interfața este construită cu **HTML**, **CSS** și **JS pur**, iar partea de back-end este un server **Node.js** cu **Express**. Persistența datelor este asigurată cu un sistem de baze de date **SQLite** accesat prin **Sequelize ORM**.

Aplicația permite:
- Afișarea filmelor populare preluate de la TMDB
- Gestionarea unei liste de filme favorite stocată în baza de date locală (SQLite)

Front-end-ul apelează direct API-ul TMDB pentru date despre filme, iar pentru operații de tip favorite folosește un endpoint REST furnizat de back-end.

#### Tehnologii Utilizate

| Categorie | Tehnologie |
|-----------|------------|
| Front-end | HTML5, CSS3, JavaScript ES5+ |
| Back-end | Node.js, Express.js |
| Bază de date | SQLite |
| ORM | Sequelize |
| Port | 4000 |

#### Structura Proiectului

```
S11clim_NoRRwithSQL/
├── index.html                 # Pagina principală HTML (Home + Favorites)
├── css/
│   └── styles.css             # Stiluri generale ale aplicației
├── js/
│   ├── config.example.js      # Șablon pentru cheia API (→ copiați în config.js)
│   ├── config.js              # Cheia TMDB (de creat manual)
│   ├── api.js                 # Funcții pentru apeluri către API-ul TMDB
│   └── app.js                 # Logica aplicației front-end (DOM, evenimente)
├── models/
│   ├── FavoriteMovie.js       # Model Sequelize pentru filme favorite
│   └── index.js               # Configurare conexiune Sequelize la SQLite
├── server.js                  # Server Express (API REST pentru favorite)
├── package.json               # Dependențe și scripturi npm
└── database.sqlite            # Baza de date (se creează automat la prima rulare)
```

#### Descrierea Fișierelor Principale

**`js/config.example.js`** — Șablon pentru cheia API:
```javascript
// Copy this file to `config.js` and replace the placeholder value
// with your own TMDB v3 API key from https://www.themoviedb.org/.
var TMDB_API_KEY = "YOUR_TMDB_API_KEY_HERE";
```

**`js/api.js`** — Wrapper pentru TMDB REST API:
```javascript
// Expune un obiect global TMDB cu metodele:
//   TMDB.getPopularMovies() -> Promise<Array<Movie>>
//   TMDB.searchMovies(query) -> Promise<Array<Movie>>
```

**`models/FavoriteMovie.js`** — Modelul Sequelize:
```javascript
const FavoriteMovie = sequelize.define("FavoriteMovie", {
  tmdbId: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  posterPath: { type: DataTypes.STRING, allowNull: true },
  releaseDate: { type: DataTypes.STRING, allowNull: true },
}, { tableName: "FavoriteMovies", timestamps: true });
```

**`server.js`** — Rutele API REST:

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| GET | `/api/favorites` | Returnează toate filmele favorite din DB |
| POST | `/api/favorites` | Adaugă un nou film favorit |
| DELETE | `/api/favorites/:tmdbId` | Șterge filmul cu ID-ul specificat |

#### Instalare și Rulare

```bash
# 1. Dezarhivare
unzip S11clim_NoRRwithSQL.zip
cd S11clim_NoRRwithSQL

# 2. Configurare cheie TMDB
cp js/config.example.js js/config.js
# Editați js/config.js și înlocuiți YOUR_TMDB_API_KEY_HERE cu cheia dvs.

# 3. Instalare dependențe
npm install

# 4. Pornire aplicație
npm start
# Output: "Movie App (vanilla JS + Sequelize) running at http://localhost:4000"

# 5. Accesare în browser: http://localhost:4000
```

#### Funcționalități Detaliate

1. **Afișare filme populare**
   - La încărcare, scriptul front-end apelează `TMDB.getPopularMovies()`
   - Datele obținute sunt folosite pentru a genera elemente DOM (carduri de film)
   - Dacă cheia API lipsește sau e greșită, lista rămâne goală

2. **Căutare filme**
   - Formularul de căutare declanșează `TMDB.searchMovies(query)`
   - Rezultatele înlocuiesc lista de filme afișate

3. **Gestionare favorite**
   - Butonul "Add to favourites" trimite POST la `/api/favorites`
   - Serverul salvează filmul în SQLite prin Sequelize
   - Front-end-ul actualizează starea butonului și lista de favorite
   - Favoritele persistă între sesiuni (stocate în DB)

4. **Navigare Home/Favorites**
   - Realizată prin schimbarea vizibilității secțiunilor DOM
   - Nu există router — totul într-un singur `index.html`

#### Ce învață studentul din acest kit:

- ✅ Manipulare DOM directă (`querySelector`, `createElement`, `innerHTML`)
- ✅ Programare asincronă cu Promises și `fetch`
- ✅ Pattern-ul de închidere (IIFE) în JavaScript
- ✅ Comunicare client-server prin API REST
- ✅ Modelarea datelor cu ORM (Sequelize)
- ✅ Persistență cu SQLite

---

### 📁 Kit 2: `S11clim_NoRRnoSQL.zip`

**Aplicație film React + Context API** (fără Redux, fără backend)

#### Descriere

Acest kit reprezintă o rescriere a aplicației de filme utilizând **React** (fără Redux). Spre deosebire de kit-ul anterior, aici front-end-ul este o **aplicație React 18** construită cu ajutorul bundler-ului **Vite**, dar **nu există un server back-end propriu** pentru stocare persistentă.

Aplicația se bazează exclusiv pe:
- API-ul TMDB pentru date despre filme
- **LocalStorage** pentru lista de favorite (persistență client-side)

> **"NoRRnoSQL"** = *No React-Redux, No SQL*

Kit-ul utilizează:
- **React Router v6** pentru navigare între pagini
- **Context API** pentru gestionarea stării globale (lista de favorite)

#### Tehnologii Utilizate

| Categorie | Tehnologie |
|-----------|------------|
| Front-end | React 18, JSX |
| Bundler | Vite 7.x |
| Routing | React Router DOM 6.x |
| State Management | Context API |
| Persistență | LocalStorage (browser) |
| Port | 4000 |

#### Structura Proiectului

```
S11clim_NoRRnoSQL/
├── index.html                    # Shell HTML pentru React
├── vite.config.js                # Configurare Vite (port 4000)
├── package.json                  # Dependențe și scripturi
├── eslint.config.js              # Configurare ESLint
├── .env.example.txt              # Șablon variabile mediu (→ .env)
└── src/
    ├── main.jsx                  # Punct de intrare React
    ├── App.jsx                   # Componenta principală + Routes
    ├── index.css                 # Stiluri globale
    ├── pages/
    │   ├── Home.jsx              # Pagina principală (filme populare + căutare)
    │   └── Favorites.jsx         # Pagina favorite
    ├── components/
    │   ├── NavBar.jsx            # Bară de navigare
    │   └── MovieCard.jsx         # Card individual film
    ├── contexts/
    │   └── MovieContext.jsx      # Context global (favorite + LocalStorage)
    ├── services/
    │   └── api.js                # Funcții apel TMDB
    └── css/
        ├── App.css
        ├── Home.css
        ├── Favorites.css
        ├── MovieCard.css
        └── NavBar.css
```

#### Descrierea Componentelor Principale

**`src/contexts/MovieContext.jsx`** — Contextul global pentru favorite:
```javascript
export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Încărcare din LocalStorage la inițializare
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Salvare în LocalStorage la fiecare modificare
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => { /* ... */ };
  const removeFromFavorites = (movieId) => { /* ... */ };
  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  return (
    <MovieContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </MovieContext.Provider>
  );
}
```

**`src/services/api.js`** — Funcții pentru TMDB:
```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  if (!API_KEY) {
    console.warn("[TMDB] No API key configured.");
    return [];
  }
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-GB&page=1`;
  const data = await safeFetch(url);
  return data.results || [];
}

export async function searchMovies(query) { /* similar */ }
```

**`vite.config.js`** — Configurare port:
```javascript
export default defineConfig({
  plugins: [react()],
  server: { port: 4000 }
});
```

#### Instalare și Rulare

```bash
# 1. Dezarhivare
unzip S11clim_NoRRnoSQL.zip
cd S11clim_NoRRnoSQL

# 2. Configurare cheie TMDB
mv .env.example.txt .env
# Editați .env: VITE_TMDB_API_KEY=cheia_voastra

# 3. Instalare dependențe
npm install

# 4. Pornire server dezvoltare
npm run dev
# sau
npm start

# 5. Accesare în browser: http://localhost:4000
```

#### Diferențe față de Kit 1 (Vanilla JS)

| Aspect | Kit 1 (Vanilla) | Kit 2 (React) |
|--------|-----------------|---------------|
| **Paradigmă UI** | Imperativă (manipulare DOM directă) | Declarativă (componente React) |
| **Actualizare UI** | `innerHTML`, `appendChild` manual | React reconciliation automat |
| **Evenimente** | `addEventListener` pe elemente | Props JSX (`onClick`, `onSubmit`) |
| **State global** | Variabile JS + server DB | Context API + LocalStorage |
| **Navigare** | Ascundere/afișare div-uri | React Router (URL semnificativ) |
| **Persistență** | SQLite pe server | LocalStorage în browser |
| **Structură cod** | Un fișier mare `app.js` | Componente separate, modulare |

#### Ce învață studentul din acest kit:

- ✅ Componentizarea UI în React
- ✅ Hooks: `useState`, `useEffect`, `useContext`
- ✅ Context API pentru state management global
- ✅ React Router pentru navigare SPA
- ✅ Persistență client-side cu LocalStorage
- ✅ Bundling modern cu Vite

---

### 📁 Kit 3: `S11clim_RRnoSQL.zip`

**Aplicație film React + Context API — variantă optimizată**

#### Descriere

Acest kit este o **variantă optimizată și corectată** a aplicației React fără back-end. Este descris în README-ul intern ca *"S11C Optimised Kit"*.

Diferențe față de `S11clim_NoRRnoSQL.zip`:
- Fișierul de configurare este `.env.example` (fără sufix `.txt`)
- **Port diferit: 3000** în loc de 4000
- Posibile refactorizări și corecții de bug-uri
- Versiune Vite: 5.4.10 (mai stabilă)

> **Notă:** Termenul "RR" din nume ar putea sugera inițial intenția de a folosi Redux sau React Router, însă kit-ul **nu introduce Redux** — folosește în continuare Context API. Router-ul este prezent și în kit-ul anterior.

#### Tehnologii Utilizate

| Categorie | Tehnologie |
|-----------|------------|
| Front-end | React 18, JSX |
| Bundler | Vite 5.4.10 |
| Routing | React Router DOM 6.x |
| State Management | Context API |
| Persistență | LocalStorage |
| Port | **3000** |

#### Structura Proiectului

```
S11clim_RRnoSQL/
├── index.html
├── vite.config.js                # Port 3000
├── package.json
├── eslint.config.js
├── .gitignore
├── .env.example                  # Fără sufix .txt
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── pages/
    │   ├── Home.jsx
    │   └── Favorites.jsx
    ├── components/
    │   ├── NavBar.jsx
    │   └── MovieCard.jsx
    ├── contexts/
    │   └── MovieContext.jsx      # Identic cu Kit 2
    ├── services/
    │   └── api.js
    └── css/
        └── *.css
```

#### Instalare și Rulare

```bash
# 1. Dezarhivare
unzip S11clim_RRnoSQL.zip
cd S11clim_RRnoSQL

# 2. Configurare cheie TMDB
mv .env.example .env
# Editați .env: VITE_TMDB_API_KEY=cheia_voastra

# 3. Instalare dependențe
npm install

# 4. Pornire
npm run dev
# sau
npm start

# 5. Accesare în browser: http://localhost:3000
```

#### Ce aduce nou această variantă:

- ✅ Cod mai curat și organizat
- ✅ Fișier `.env.example` fără sufix confuz
- ✅ Versiune Vite mai stabilă
- ✅ Posibile corecții de edge cases

> **Recomandare:** Comparați codul sursă cu Kit 2 pentru a observa diferențele și îmbunătățirile.

---

### 📁 Kit 4: `S11clim_RRcuSQL3001.zip`

**Aplicație Full-Stack: React + Redux Toolkit + Express + Sequelize**

#### Descriere

Acesta este cel mai complex kit, ce realizează o **aplicație completă full-stack**. Combină:
- **Front-end modern**: React 18 + Redux Toolkit + React Router
- **Back-end**: Node.js + Express
- **Persistență**: SQLite + Sequelize ORM

> **"RRcuSQL3001"** = *React + Redux cu SQL, port 3001*

Arhitectura separată:
- **Front-end React** rulează pe portul **3000** (Vite dev server)
- **Back-end Express** rulează pe portul **3001**
- **Vite proxy** redirecționează cererile `/api/*` către backend

#### Tehnologii Utilizate

| Categorie | Tehnologie | Versiune |
|-----------|------------|----------|
| Front-end | React | 18.3.1 |
| State Management | Redux Toolkit | 2.3.0 |
| Routing | React Router DOM | 6.28.0 |
| Bundler | Vite | 5.4.10 |
| Back-end | Express | 4.21.2 |
| ORM | Sequelize | 6.37.3 |
| Bază de date | SQLite | 5.1.7 |
| Port Front-end | 3000 | — |
| Port Back-end | 3001 | — |

#### Arhitectura Aplicației

```
┌─────────────────────┐         ┌─────────────────────┐         ┌──────────────────┐
│    React SPA        │         │    Express API      │         │     SQLite       │
│    (port 3000)      │────────▶│    (port 3001)      │────────▶│    Database      │
│                     │         │                     │         │                  │
│  - Components       │         │  GET /api/favorites │         │  FavoriteMovies  │
│  - Redux Store      │  proxy  │  POST /api/favorites│  ORM    │  table           │
│  - React Router     │◀────────│  DELETE /api/...    │◀────────│                  │
└─────────────────────┘         └─────────────────────┘         └──────────────────┘
         │
         │ fetch()
         ▼
┌─────────────────────┐
│    TMDB API         │
│  (externe)          │
└─────────────────────┘
```

#### Structura Proiectului

```
S11clim_RRcuSQL3001/
├── index.html                      # Shell HTML pentru React
├── vite.config.js                  # Port 3000 + proxy către 3001
├── package.json                    # Dependențe front-end + back-end
├── .env.example                    # Cheie TMDB pentru front-end
├── .gitignore
├── README.md
│
├── server.js                       # Server Express (port 3001)
├── models/
│   ├── index.js                    # Configurare Sequelize + SQLite
│   └── FavoriteMovie.js            # Model ORM
│
└── src/                            # Codul React
    ├── main.jsx                    # Entry point + Redux Provider
    ├── App.jsx                     # Routes principale
    ├── index.css
    │
    ├── store/
    │   └── index.js                # Configurare Redux Store
    │
    ├── features/
    │   └── favoritesSlice.js       # Slice Redux (state + thunks)
    │
    ├── pages/
    │   ├── Home.jsx
    │   └── Favorites.jsx
    │
    ├── components/
    │   ├── NavBar.jsx
    │   └── MovieCard.jsx
    │
    ├── services/
    │   └── tmdbApi.js              # Apeluri către TMDB
    │
    └── css/
        └── *.css
```

#### Descrierea Componentelor Cheie

**`vite.config.js`** — Proxy pentru API:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001"  // Redirecționează /api/* la Express
    }
  }
});
```

**`src/store/index.js`** — Configurare Redux Store:
```javascript
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../features/favoritesSlice.js";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;
```

**`src/features/favoritesSlice.js`** — Redux Slice cu Async Thunks:
```javascript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk pentru încărcare favorite de pe server
export const fetchFavorites = createAsyncThunk("favorites/fetchAll", async () => {
  const res = await fetch("/api/favorites");
  if (!res.ok) throw new Error("Failed to fetch favourites.");
  return (await res.json()).map(fav => ({
    id: Number(fav.tmdbId),
    title: fav.title,
    poster_path: fav.posterPath,
    release_date: fav.releaseDate,
  }));
});

// Thunk pentru adăugare favorit
export const addFavorite = createAsyncThunk("favorites/add", async (movie) => {
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tmdbId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
    }),
  });
  if (!res.ok) throw new Error("Failed to add favourite.");
  return await res.json();
});

// Thunk pentru ștergere favorit
export const removeFavorite = createAsyncThunk("favorites/remove", async (tmdbId) => {
  await fetch(`/api/favorites/${tmdbId}`, { method: "DELETE" });
  return tmdbId;
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => { state.status = "loading"; })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(m => m.id !== Number(action.payload));
      });
  },
});

export const selectFavorites = (state) => state.favorites.items;
export default favoritesSlice.reducer;
```

**`server.js`** — API REST Express (identic cu Kit 1):
```javascript
const app = express();
const API_PORT = 3001;

app.use(express.json());

app.get("/api/favorites", async (req, res) => { /* ... */ });
app.post("/api/favorites", async (req, res) => { /* ... */ });
app.delete("/api/favorites/:tmdbId", async (req, res) => { /* ... */ });

// Start server
sequelize.sync().then(() => {
  app.listen(API_PORT, () => {
    console.log(`API server running at http://localhost:${API_PORT}`);
  });
});
```

#### Instalare și Rulare

```bash
# 1. Dezarhivare
unzip S11clim_RRcuSQL3001.zip
cd S11clim_RRcuSQL3001

# 2. Instalare dependențe (toate într-un singur package.json)
npm install

# 3. Configurare cheie TMDB
mv .env.example .env
# Editați .env: VITE_TMDB_API_KEY=cheia_voastra

# 4. Pornire back-end (Terminal 1)
npm run server
# Output: "API server (Express + Sequelize) running at http://localhost:3001"

# 5. Pornire front-end (Terminal 2 - separat!)
npm run dev
# Output: "VITE ready at http://localhost:3000"

# 6. Accesare în browser: http://localhost:3000
```

> ⚠️ **Important:** Trebuie să rulați **ambele servere simultan** în terminale separate!

#### Fluxul de Date Redux

```
┌──────────────────┐     dispatch()      ┌──────────────────┐
│   Component      │────────────────────▶│   Redux Thunk    │
│   (UI Event)     │                     │   (async API)    │
│                  │                     │                  │
│  MovieCard.jsx   │                     │  addFavorite()   │
│  onClick={...}   │                     │  POST /api/...   │
└──────────────────┘                     └────────┬─────────┘
        ▲                                         │
        │                                         │ fetch()
        │                                         ▼
        │                                ┌──────────────────┐
        │   useSelector()                │   Express API    │
        │                                │   (port 3001)    │
        │                                └────────┬─────────┘
        │                                         │
        │                                         │ Sequelize
        │                                         ▼
┌───────┴──────────┐     fulfilled       ┌──────────────────┐
│   Redux Store    │◀────────────────────│   SQLite DB      │
│                  │                     │                  │
│  state.favorites │     action.payload  │  database.sqlite │
└──────────────────┘                     └──────────────────┘
```

#### Avantajele Redux Toolkit în acest kit:

1. **Operații asincrone structurate** — `createAsyncThunk` gestionează automat stările pending/fulfilled/rejected
2. **DevTools integration** — posibilitate de debugging cu Redux DevTools
3. **State centralizat** — toate componentele accesează același store
4. **Predictibilitate** — fluxul unidirecțional de date

#### Ce învață studentul din acest kit:

- ✅ Arhitectură full-stack modernă (SPA + REST API)
- ✅ Redux Toolkit (store, slices, thunks)
- ✅ Async operations în Redux
- ✅ Proxy Vite pentru development
- ✅ Separarea responsabilităților front-end/back-end
- ✅ Integrarea ORM cu frontend React

---

## 📊 Comparație Detaliată între Kit-uri

### Tabel Sinoptic Complet

| Caracteristică | `NoRRwithSQL` | `NoRRnoSQL` | `RRnoSQL` | `RRcuSQL3001` |
|----------------|:-------------:|:-----------:|:---------:|:-------------:|
| **Fișier arhivă** | `S11clim_NoRRwithSQL.zip` | `S11clim_NoRRnoSQL.zip` | `S11clim_RRnoSQL.zip` | `S11clim_RRcuSQL3001.zip` |
| **Front-end** | Vanilla JS | React 18 | React 18 | React 18 |
| **Back-end** | Express | ❌ | ❌ | Express |
| **State Management** | Variabile JS | Context API | Context API | Redux Toolkit |
| **Persistență** | SQLite (server) | LocalStorage | LocalStorage | SQLite (server) |
| **ORM** | Sequelize | ❌ | ❌ | Sequelize |
| **Routing** | Manual DOM | React Router | React Router | React Router |
| **API REST** | ✅ `/api/favorites` | ❌ | ❌ | ✅ `/api/favorites` |
| **Port(uri)** | 4000 | 4000 | 3000 | 3000 + 3001 |
| **Bundler** | ❌ | Vite 7.x | Vite 5.x | Vite 5.x |
| **Complexitate** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### Comparație Tehnologii Front-end

| Aspect | Vanilla JS (Kit 1) | React + Context (Kit 2, 3) | React + Redux (Kit 4) |
|--------|-------------------|---------------------------|----------------------|
| **Actualizare UI** | Manual (`innerHTML`) | Automat (re-render) | Automat (re-render) |
| **Evenimente** | `addEventListener` | Props JSX | Props JSX |
| **State local** | Variabile JS | `useState` | `useState` |
| **State global** | Server DB / variabile | Context API | Redux Store |
| **Side effects** | Callbacks, Promises | `useEffect` | `createAsyncThunk` |
| **Debugging** | `console.log` | React DevTools | Redux DevTools |

### Comparație Persistență Date

| Aspect | LocalStorage (Kit 2, 3) | SQLite + Sequelize (Kit 1, 4) |
|--------|------------------------|------------------------------|
| **Locație** | Browser client | Server |
| **Capacitate** | ~5-10 MB | Nelimitată (practic) |
| **Persistență** | Per browser | Centralizată |
| **Multi-user** | ❌ Izolat per utilizator | ✅ Partajat |
| **Acces offline** | ✅ Da | ❌ Necesită server |
| **Securitate** | Vizibil în DevTools | Ascuns pe server |
| **Backup** | Dificil | Ușor (fișier `.sqlite`) |

### Evoluția Conceptuală între Kit-uri

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   Kit 1 (Vanilla)              Kit 2-3 (React)           Kit 4 (Full)       │
│   ================             ================          ==============     │
│                                                                             │
│   ┌─────────────┐              ┌─────────────┐          ┌─────────────┐    │
│   │ DOM direct  │    ────▶     │ Componente  │   ────▶  │ Redux Store │    │
│   │ innerHTML   │              │ JSX         │          │ Slices      │    │
│   └─────────────┘              └─────────────┘          └─────────────┘    │
│                                                                             │
│   ┌─────────────┐              ┌─────────────┐          ┌─────────────┐    │
│   │addEventListener│  ────▶    │ onClick={}  │   ────▶  │ dispatch()  │    │
│   │ callbacks   │              │ hooks       │          │ thunks      │    │
│   └─────────────┘              └─────────────┘          └─────────────┘    │
│                                                                             │
│   ┌─────────────┐              ┌─────────────┐          ┌─────────────┐    │
│   │ SQLite      │              │ LocalStorage│   ────▶  │ SQLite      │    │
│   │ Sequelize   │              │ (browser)   │          │ Sequelize   │    │
│   └─────────────┘              └─────────────┘          └─────────────┘    │
│                                                                             │
│   IMPERATIVE        ────▶      DECLARATIVE      ────▶   PREDICTABLE        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Când să folosiți fiecare kit

| Scenariu de învățare | Kit recomandat |
|---------------------|----------------|
| Începător - învățare DOM/JS pur | `S11clim_NoRRwithSQL.zip` |
| Introducere în React | `S11clim_RRnoSQL.zip` (cel mai stabil) |
| Studiu Context API detaliat | `S11clim_NoRRnoSQL.zip` |
| Învățare Redux Toolkit | `S11clim_RRcuSQL3001.zip` |
| Proiect full-stack complet | `S11clim_RRcuSQL3001.zip` |
| Comparație Vanilla vs React | Kit 1 vs Kit 2/3 |
| Comparație Context vs Redux | Kit 2/3 vs Kit 4 |

---

## 📈 Continuitate Curriculară

Acest parcurs reproduce trecerea naturală prin conceptele predate în mod incremental în cadrul cursului:

| Etapă | Concept | Kit(uri) relevante |
|-------|---------|-------------------|
| 1 | **Obiecte și Programare Asincronă** — Promises, `fetch`, JSON | Toate |
| 2 | **Evenimente și DOM** — Manipulare DOM în vanilla JS | `S11clim_NoRRwithSQL.zip` |
| 3 | **CSS** — Stiluri și organizare vizuală | Toate |
| 4 | **Servicii REST și Express** — Servere Express + API | Kit 1, Kit 4 |
| 5 | **Persistență cu ORM** — Sequelize + SQLite | Kit 1, Kit 4 |
| 6 | **React** — Componentizare, JSX, props, hooks | Kit 2, 3, 4 |
| 7 | **Context API** — State management simplu | Kit 2, 3 |
| 8 | **Redux** — Store global, slices, async thunk | Kit 4 |

### Recomandări Pedagogice pentru Studenți

1. **Comparați modalitățile de persistare**: `localStorage` vs ORM (Sequelize)

2. **Observați cum se transformă codul** din vanilla JS în React și cum se mută logica din DOM în componente

3. **Analizați cum apare Redux**: folosit ca un store global care înlocuiește Context sau gestionează sincronizarea cu backend-ul

4. **Analizați comunicarea client-backend** în kit-urile cu REST: `fetch("/api/favorites")`, POST, DELETE etc.

5. **Înțelegeți responsabilitățile fiecărei părți**:
   - **Frontend**: UI, evenimente, interacțiune cu utilizatorul
   - **Backend**: validare, salvare, răspunsuri, structură de date

---

## 📚 Resurse și Referințe

### Documentație Oficială

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [React Documentation](https://react.dev/)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Vite Guide](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)

### Articole Recomandate

- [Getting Started with the TMDB API](https://dev.to/alamjamshed17777/getting-started-with-the-tmdb-api-a-beginners-guide-52li)
- [Understanding React Context API](https://react.dev/learn/passing-data-deeply-with-context)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)

---

## ⚠️ Note Importante

### Securitatea Cheii API

În toate kit-urile prezentate, **cheia TMDB este stocată pe front-end** (în `config.js` sau `.env` pentru Vite). Aceasta înseamnă că este expusă utilizatorilor (oricine ar inspecta rețeaua sau codul ar putea vedea cheia).

În mediul real, soluția ar fi să proxy-uiți cererile prin propriul back-end. În contextul acestor proiecte educaționale, expunerea cheii nu este critică.

### Porturi

Asigurați-vă că porturile necesare nu sunt ocupate de alte aplicații:
- **4000** — Kit 1, Kit 2
- **3000** — Kit 3, Kit 4 (front-end)
- **3001** — Kit 4 (back-end)

### Cerințe Sistem

- **Node.js** — versiune 18+ recomandată
- **npm** — inclus cu Node.js
- **Browser modern** — Chrome, Firefox, Edge, Safari

### Baza de Date

Fișierul `database.sqlite` se creează automat la prima rulare a serverului (Kit 1 și Kit 4). Nu este nevoie de configurare suplimentară.

---

<div align="center">

## 📥 Fișiere Kit-uri Disponibile

| Kit | Fișier | Descriere |
|-----|--------|-----------|
| 1 | `S11clim_NoRRwithSQL.zip` | Vanilla JS + Express + SQLite |
| 2 | `S11clim_NoRRnoSQL.zip` | React + Context + LocalStorage |
| 3 | `S11clim_RRnoSQL.zip` | React + Context (optimizat) |
| 4 | `S11clim_RRcuSQL3001.zip` | React + Redux + Express + SQLite |

---

**📖 Material didactic pentru Seminarul S11**

*Tehnologii Web | ASE-CSIE*

</div>
