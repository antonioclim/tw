# 🎬 Movie App — React + Redux Toolkit + Express + Sequelize

> **Kit:** `S11clim_RRcuSQL3001.zip`  
> **Seminar S11** | Tehnologii Web | ASE-CSIE

O aplicație **full-stack completă** care demonstrează arhitectura modernă de dezvoltare web: **React 18** cu **Redux Toolkit** pe frontend, **Express.js** ca API server și **Sequelize ORM** cu **SQLite** pentru persistență.

---

## 📋 Cuprins

1. [Despre Aplicație](#-despre-aplicație)
2. [Arhitectura Dual-Server](#-arhitectura-dual-server)
3. [Tehnologii Folosite](#-tehnologii-folosite)
4. [Ce Veți Învăța](#-ce-veți-învăța)
5. [Structura Proiectului](#-structura-proiectului)
6. [Instalare și Configurare](#-instalare-și-configurare)
7. [Rularea Aplicației](#-rularea-aplicației)
8. [Funcționalități](#-funcționalități)
9. [Redux Toolkit — Deep Dive](#-redux-toolkit--deep-dive)
10. [API REST — Backend](#-api-rest--backend)
11. [Vite Proxy — Comunicare Frontend-Backend](#-vite-proxy--comunicare-frontend-backend)
12. [Explicația Codului](#-explicația-codului)
13. [Fluxul Complet al Datelor](#-fluxul-complet-al-datelor)
14. [Comparație cu Alte Abordări](#-comparație-cu-alte-abordări)
15. [Exerciții Propuse](#-exerciții-propuse)
16. [Depanare](#-depanare)

---

## 📖 Despre Aplicație

**Movie App (React + Redux + SQL)** este cea mai avansată variantă din seria kit-urilor S11, combinând toate conceptele într-o aplicație full-stack profesională:

### Stack Complet

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🌐 TMDB API                                                   │
│   (External Movie Data)                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Port 3000)                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    React 18 + Vite                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │   │
│  │  │React Router │  │Redux Toolkit│  │   Components    │ │   │
│  │  │   (URLs)    │  │   (State)   │  │ (UI + Events)   │ │   │
│  │  └─────────────┘  └──────┬──────┘  └─────────────────┘ │   │
│  └──────────────────────────┼──────────────────────────────┘   │
│                             │                                   │
│                     dispatch(thunk)                             │
│                             │                                   │
│                     Vite Proxy /api                             │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BACKEND (Port 3001)                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Express.js                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │   │
│  │  │  REST API   │  │  Sequelize  │  │     SQLite      │ │   │
│  │  │  /api/*     │  │    ORM      │  │   database.db   │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### De ce acest kit?

| Caracteristică | Beneficiu |
|----------------|-----------|
| **Redux Toolkit** | State management predictibil și scalabil |
| **createAsyncThunk** | Gestionare elegantă a operațiilor async |
| **Dual-Server** | Separare clară frontend/backend |
| **Vite Proxy** | Development seamless fără CORS issues |
| **Production-ready** | Arhitectură scalabilă pentru aplicații reale |

---

## 🏗 Arhitectura Dual-Server

### Conceptul

Această aplicație folosește **două servere separate** care comunică între ele:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Terminal 1:                    Terminal 2:                      │
│  ┌────────────────────┐        ┌────────────────────┐           │
│  │    npm run dev     │        │   npm run server   │           │
│  │                    │        │                    │           │
│  │   Vite Dev Server  │  ───►  │   Express API      │           │
│  │   Port 3000        │ proxy  │   Port 3001        │           │
│  │                    │ /api   │                    │           │
│  │   React App        │        │   Sequelize + SQL  │           │
│  └────────────────────┘        └────────────────────┘           │
│                                                                  │
│  Browser accesează:            API endpoints:                    │
│  http://localhost:3000         http://localhost:3001/api/*       │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### De ce două servere?

| Aspect | Single Server | Dual Server (acest kit) |
|--------|---------------|------------------------|
| **Development** | Repornire la orice schimbare | HMR pentru frontend, server stabil pentru API |
| **Scalabilitate** | Limitată | Frontend și backend pot scala independent |
| **Deployment** | Simplu dar rigid | Flexibil (Vercel + Railway, etc.) |
| **Separare concerns** | Împletite | Clare și distincte |
| **Real-world** | Rar folosit | Standard în industrie |

### Vite Proxy în Acțiune

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001"  // Toate /api/* merg la backend
    }
  }
});
```

**Exemplu flux:**
```
Browser: fetch("/api/favorites")
    │
    ▼
Vite (3000): detectează /api/* 
    │
    ▼ proxy
Express (3001): procesează GET /api/favorites
    │
    ▼
Response: JSON cu favorite din SQLite
```

---

## 🛠 Tehnologii Folosite

### Frontend Stack

| Tehnologie | Versiune | Rol |
|------------|----------|-----|
| **React** | 18.3.1 | Biblioteca UI |
| **React DOM** | 18.3.1 | Randare în browser |
| **React Router DOM** | 6.28.0 | Routing client-side |
| **Redux Toolkit** | 2.3.0 | State management |
| **React Redux** | 9.1.2 | Integrare React-Redux |
| **Vite** | 5.4.10 | Bundler și dev server |

### Backend Stack

| Tehnologie | Versiune | Rol |
|------------|----------|-----|
| **Express** | 4.21.2 | Framework web/API |
| **Sequelize** | 6.37.3 | ORM |
| **SQLite3** | 5.1.7 | Bază de date |

### API Extern

| Serviciu | Rol |
|----------|-----|
| **TMDB API v3** | Sursa datelor despre filme |

---

## 🎓 Ce Veți Învăța

### Redux Toolkit

| Concept | API | Descriere |
|---------|-----|-----------|
| **Store** | `configureStore()` | Container global pentru state |
| **Slice** | `createSlice()` | Reducer + actions într-un singur loc |
| **Async Thunks** | `createAsyncThunk()` | Acțiuni asincrone (API calls) |
| **Selectors** | `selectFavorites` | Extragerea datelor din state |
| **Hooks** | `useDispatch`, `useSelector` | Interacțiune React-Redux |

### Full-Stack Development

| Concept | Locație | Descriere |
|---------|---------|-----------|
| **REST API Design** | `server.js` | GET, POST, DELETE endpoints |
| **ORM Patterns** | `models/` | Definire modele, CRUD |
| **Proxy Configuration** | `vite.config.js` | Routing cereri API |
| **Error Handling** | Peste tot | Try/catch, status codes |
| **Loading States** | Slice + Components | pending/fulfilled/rejected |

### Patterns Avansate

| Pattern | Exemplu |
|---------|---------|
| **Flux Architecture** | Action → Reducer → Store → View |
| **Thunk Middleware** | Async actions cu loading states |
| **Normalized State** | Array de items + status + error |
| **Selector Pattern** | `selectFavorites`, `selectFavoriteIds` |

---

## 📁 Structura Proiectului

```
S11clim_RRcuSQL3001/
│
├── 📄 package.json            # Dependențe (frontend + backend)
├── 📄 vite.config.js          # Vite config + proxy setup
├── 📄 .env.example            # Template pentru TMDB API key
├── 📄 .gitignore              # Fișiere ignorate de Git
├── 📄 index.html              # HTML shell pentru React
│
├── 📄 server.js               # 🖥️ EXPRESS SERVER (Port 3001)
│                              #    - REST API /api/favorites
│                              #    - Sequelize integration
│
├── 📁 models/                 # 💾 SEQUELIZE MODELS
│   ├── 📄 index.js            # Configurare conexiune SQLite
│   └── 📄 FavoriteMovie.js    # Model pentru filme favorite
│
└── 📁 src/                    # ⚛️ REACT APPLICATION
    │
    ├── 📄 main.jsx            # Entry point + Provider setup
    ├── 📄 App.jsx             # Layout + Routes
    ├── 📄 index.css           # Stiluri globale
    │
    ├── 📁 store/              # 🏪 REDUX STORE
    │   └── 📄 index.js        # Store configuration
    │
    ├── 📁 features/           # 📦 REDUX SLICES
    │   └── 📄 favoritesSlice.js # State + reducers + thunks
    │
    ├── 📁 pages/              # 📄 PAGE COMPONENTS
    │   ├── 📄 Home.jsx        # Pagina principală
    │   └── 📄 Favorites.jsx   # Pagina favorite (Redux)
    │
    ├── 📁 components/         # 🧩 UI COMPONENTS
    │   ├── 📄 NavBar.jsx      # Navigare
    │   └── 📄 MovieCard.jsx   # Card film (Redux dispatch)
    │
    ├── 📁 services/           # 🌐 API SERVICES
    │   └── 📄 tmdbApi.js      # TMDB API wrapper
    │
    └── 📁 css/                # 💅 STYLES
        ├── 📄 App.css
        ├── 📄 NavBar.css
        ├── 📄 Home.css
        ├── 📄 MovieCard.css
        └── 📄 Favorites.css
```

### Diferențe față de Alte Kit-uri

| Fișier/Director | NoRRnoSQL | RRnoSQL | **RRcuSQL (acest kit)** |
|-----------------|-----------|---------|------------------------|
| `server.js` | ❌ | ❌ | ✅ Express API |
| `models/` | ❌ | ❌ | ✅ Sequelize |
| `src/store/` | ❌ | ❌ | ✅ Redux Store |
| `src/features/` | ❌ | ❌ | ✅ Redux Slices |
| `src/contexts/` | ✅ | ✅ | ❌ (înlocuit cu Redux) |
| Persistență | LocalStorage | LocalStorage | **SQLite** |
| State Management | Context API | Context API | **Redux Toolkit** |

---

## ⚙️ Instalare și Configurare

### Cerințe Preliminare

- **Node.js** 18+ ([descărcare](https://nodejs.org/))
- **npm** (inclus cu Node.js)
- **2 terminale** (pentru cele două servere)
- **VS Code** cu extensiile:
  - ES7+ React/Redux snippets
  - Redux DevTools (browser extension)
  - SQLite Viewer

### Pasul 1: Dezarhivare

```bash
# Dezarhivați kit-ul
unzip S11clim_RRcuSQL3001.zip

# Intrați în director
cd S11clim_RRcuSQL3001
```

### Pasul 2: Instalarea Dependențelor

```bash
npm install
```

**Ce se instalează:**
```
node_modules/
├── react, react-dom           # React core
├── react-router-dom           # Routing
├── @reduxjs/toolkit           # Redux Toolkit
├── react-redux                # React bindings
├── express                    # Backend server
├── sequelize                  # ORM
├── sqlite3                    # Database driver
└── vite                       # Bundler
```

### Pasul 3: Obținerea Cheii API TMDB

1. **Creați cont** pe [themoviedb.org](https://www.themoviedb.org/)
2. **Verificați email-ul**
3. **Settings → API → Create**
4. **Selectați "Developer"**
5. **Copiați cheia API (v3 auth)**

### Pasul 4: Configurarea Cheii API

```bash
# Copiați șablonul
cp .env.example .env

# SAU pe Windows:
copy .env.example .env
```

Editați `.env`:

```env
VITE_TMDB_API_KEY=your_actual_api_key_here
```

---

## 🚀 Rularea Aplicației

### ⚠️ IMPORTANT: Două Terminale Necesare!

Această aplicație necesită **două procese** care rulează simultan.

### Terminal 1: Backend (Express API)

```bash
npm run server
```

**Output așteptat:**
```
API server (Express + Sequelize) running at http://localhost:3001
```

### Terminal 2: Frontend (React + Vite)

```bash
npm run dev
```

**Output așteptat:**
```
  VITE v5.4.10  ready in 312 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Accesarea Aplicației

Deschideți: **http://localhost:3000**

> ⚠️ **Nu accesați direct port 3001!** Acesta este doar pentru API.

### Diagrama Porturi

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  http://localhost:3000  ──────────►  React App (Vite)       │
│        (pentru browser)              │                       │
│                                      │ proxy /api/*          │
│                                      ▼                       │
│  http://localhost:3001  ◄────────── Express API             │
│        (doar pentru API)                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Comenzi Disponibile

| Comandă | Descriere |
|---------|-----------|
| `npm run dev` | Pornește Vite dev server (port 3000) |
| `npm run server` | Pornește Express API (port 3001) |
| `npm run build` | Build producție → `dist/` |
| `npm run preview` | Preview build producție |

---

## 🎯 Funcționalități

### 1. Filme Populare (TMDB)

```
┌─────────────────────────────────────────────────────────────────┐
│                     Discover movies                             │
│  ┌─────────────────────────────┐ ┌──────────┐                  │
│  │ Search for a movie...       │ │  Search  │                  │
│  └─────────────────────────────┘ └──────────┘                  │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ [Poster]│  │ [Poster]│  │ [Poster]│  │ [Poster]│           │
│  │ Title   │  │ Title   │  │ Title   │  │ Title   │           │
│  │ 2024    │  │ 2023    │  │ 2024    │  │ 2022    │           │
│  │[+ Fav]  │  │[✓ Fav]  │  │[+ Fav]  │  │[+ Fav]  │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

### 2. Flux Adăugare la Favorite

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Click "Add to favourites"                                      │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  dispatch(addFavorite(movie))                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  createAsyncThunk execută:                              │   │
│  │  POST /api/favorites { tmdbId, title, posterPath, ... } │   │
│  └─────────────────────────────────────────────────────────┘   │
│           │                                                     │
│           ▼ (prin Vite proxy)                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Express server primește cererea                        │   │
│  │  Sequelize.upsert() în SQLite                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Response 201 + movie data                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Redux: addFavorite.fulfilled                           │   │
│  │  state.items = [...items, newFavorite]                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  React re-render: butonul devine "Remove from fav"      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Persistență în SQLite

```bash
# Verificare bază de date (opțional)
sqlite3 database.sqlite

sqlite> .tables
FavoriteMovies

sqlite> SELECT * FROM FavoriteMovies;
550|Fight Club|/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg|1999-10-15|...

sqlite> .quit
```

---

## 🔄 Redux Toolkit — Deep Dive

### 1. Store Configuration (`src/store/index.js`)

```javascript
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../features/favoritesSlice.js";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,  // state.favorites
  },
  // Redux Toolkit include automat:
  // - Redux Thunk middleware
  // - Redux DevTools integration
  // - Immer pentru immutability
});

export default store;
```

### 2. Slice Definition (`src/features/favoritesSlice.js`)

```javascript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ═══════════════════════════════════════════════════════════════
// ASYNC THUNKS - Acțiuni care fac cereri HTTP
// ═══════════════════════════════════════════════════════════════

// Fetch toate favoritele de la server
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchAll",     // Action type prefix
  async () => {             // Payload creator
    const res = await fetch("/api/favorites");
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    
    // Transformă datele din format server → format Redux
    return data.map((fav) => ({
      id: Number(fav.tmdbId),
      title: fav.title,
      poster_path: fav.posterPath,
      release_date: fav.releaseDate,
    }));
  }
);

// Adaugă un film la favorite
export const addFavorite = createAsyncThunk(
  "favorites/add",
  async (movie) => {
    const payload = {
      tmdbId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
    };
    
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) throw new Error("Failed to add");
    
    const fav = await res.json();
    return {
      id: Number(fav.tmdbId),
      title: fav.title,
      poster_path: fav.posterPath,
      release_date: fav.releaseDate,
    };
  }
);

// Șterge un film din favorite
export const removeFavorite = createAsyncThunk(
  "favorites/remove",
  async (tmdbId) => {
    const res = await fetch(`/api/favorites/${tmdbId}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 404) throw new Error("Failed");
    return tmdbId;  // Returnează ID-ul pentru a-l elimina din state
  }
);

// ═══════════════════════════════════════════════════════════════
// SLICE - State + Reducers
// ═══════════════════════════════════════════════════════════════

const favoritesSlice = createSlice({
  name: "favorites",
  
  // Initial state cu loading pattern
  initialState: {
    items: [],       // Array de filme favorite
    status: "idle",  // "idle" | "loading" | "succeeded" | "failed"
    error: null,     // Mesaj de eroare sau null
  },
  
  // Reducers sincrone (nu avem în acest caz)
  reducers: {},
  
  // Extra reducers pentru async thunks
  extraReducers: (builder) => {
    builder
      // FETCH FAVORITES
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      // ADD FAVORITE
      .addCase(addFavorite.fulfilled, (state, action) => {
        const exists = state.items.some((m) => m.id === action.payload.id);
        if (!exists) {
          state.items.unshift(action.payload);  // Adaugă la început
        }
      })
      
      // REMOVE FAVORITE
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (m) => m.id !== Number(action.payload)
        );
      });
  },
});

// ═══════════════════════════════════════════════════════════════
// SELECTORS - Funcții pentru extragerea datelor din state
// ═══════════════════════════════════════════════════════════════

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoriteIds = (state) => 
  state.favorites.items.map((fav) => fav.id);

export default favoritesSlice.reducer;
```

### 3. Provider Setup (`src/main.jsx`)

```jsx
import { Provider } from "react-redux";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>      {/* Redux Provider */}
      <BrowserRouter>             {/* Router */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

### 4. Folosirea în Componente

```jsx
// În MovieCard.jsx
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, selectFavoriteIds } from "../features/favoritesSlice.js";

function MovieCard({ movie }) {
  const dispatch = useDispatch();                      // Pentru a trimite acțiuni
  const favoriteIds = useSelector(selectFavoriteIds);  // Pentru a citi state
  const isFavorite = favoriteIds.includes(movie.id);

  const handleClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));  // Dispatch async thunk
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <button onClick={handleClick}>
      {isFavorite ? "Remove" : "Add"}
    </button>
  );
}
```

### Diagrama Redux Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         REDUX FLOW                              │
│                                                                 │
│  ┌──────────────┐     dispatch      ┌──────────────────────┐   │
│  │  Component   │ ─────────────────► │  Async Thunk        │   │
│  │  (UI Event)  │                    │  (API Call)         │   │
│  └──────────────┘                    └──────────┬───────────┘   │
│                                                 │               │
│                                                 │ fetch()       │
│                                                 ▼               │
│                                      ┌──────────────────────┐   │
│                                      │  Express Server      │   │
│                                      │  (Port 3001)         │   │
│                                      └──────────┬───────────┘   │
│                                                 │               │
│                                                 │ response      │
│                                                 ▼               │
│  ┌──────────────┐     state update  ┌──────────────────────┐   │
│  │  Component   │ ◄───────────────── │  Reducer             │   │
│  │  (re-render) │                    │  (fulfilled case)    │   │
│  └──────────────┘                    └──────────────────────┘   │
│         ▲                                      ▲                │
│         │                                      │                │
│         └──────────── useSelector ─────────────┘                │
│                     (subscription)                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🌐 API REST — Backend

### Endpoints Disponibile

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| `GET` | `/api/favorites` | Listează toate favoritele |
| `POST` | `/api/favorites` | Adaugă un film |
| `DELETE` | `/api/favorites/:tmdbId` | Șterge un film |

### GET /api/favorites

```bash
curl http://localhost:3001/api/favorites
```

**Response:**
```json
[
  {
    "tmdbId": 550,
    "title": "Fight Club",
    "posterPath": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "releaseDate": "1999-10-15"
  }
]
```

### POST /api/favorites

```bash
curl -X POST http://localhost:3001/api/favorites \
  -H "Content-Type: application/json" \
  -d '{"tmdbId": 550, "title": "Fight Club", "posterPath": "/abc.jpg", "releaseDate": "1999-10-15"}'
```

**Response (201):**
```json
{
  "tmdbId": 550,
  "title": "Fight Club",
  "posterPath": "/abc.jpg",
  "releaseDate": "1999-10-15"
}
```

### DELETE /api/favorites/:tmdbId

```bash
curl -X DELETE http://localhost:3001/api/favorites/550
```

**Response:** `204 No Content`

---

## 🔗 Vite Proxy — Comunicare Frontend-Backend

### Problema CORS

Fără proxy:
```
Browser (localhost:3000) → Express (localhost:3001)
❌ CORS Error: Different origins!
```

### Soluția: Vite Proxy

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
});
```

Cu proxy:
```
Browser → fetch("/api/favorites")
           │
           ▼
Vite (3000) → "Văd /api, îl trimit la 3001"
           │
           ▼
Express (3001) → Procesează cererea
           │
           ▼
Response ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
           (prin Vite, pare că vine de la 3000)
```

**Beneficii:**
- ✅ Zero CORS issues în development
- ✅ Cod curat (doar `/api/favorites`, nu URL complet)
- ✅ Funcționează identic în producție (după build)

---

## 📝 Explicația Codului

### 1. Express Server (`server.js`)

```javascript
const express = require("express");
const sequelize = require("./models");
const FavoriteMovie = require("./models/FavoriteMovie");

const app = express();
const API_PORT = 3001;

// Middleware pentru JSON parsing
app.use(express.json());

// Serve build-ul de producție (dist/)
app.use(express.static(path.join(__dirname, "dist")));

// GET toate favoritele
app.get("/api/favorites", async (req, res) => {
  try {
    const favorites = await FavoriteMovie.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(favorites.map((fav) => ({
      tmdbId: fav.tmdbId,
      title: fav.title,
      posterPath: fav.posterPath,
      releaseDate: fav.releaseDate,
    })));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch." });
  }
});

// POST adaugă favorit
app.post("/api/favorites", async (req, res) => {
  try {
    const { tmdbId, title, posterPath, releaseDate } = req.body;
    
    // Validare
    if (!tmdbId || !title) {
      return res.status(400).json({ error: "Required fields missing." });
    }
    
    // Upsert = insert or update
    const [favorite] = await FavoriteMovie.upsert({
      tmdbId,
      title,
      posterPath: posterPath || null,
      releaseDate: releaseDate || null,
    });
    
    res.status(201).json({ /* ... */ });
  } catch (error) {
    res.status(500).json({ error: "Failed to save." });
  }
});

// DELETE șterge favorit
app.delete("/api/favorites/:tmdbId", async (req, res) => {
  try {
    const tmdbId = parseInt(req.params.tmdbId, 10);
    
    const deletedCount = await FavoriteMovie.destroy({
      where: { tmdbId },
    });
    
    if (deletedCount === 0) {
      return res.status(404).json({ error: "Not found." });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete." });
  }
});

// Start server
async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(API_PORT, () => {
    console.log(`API server running at http://localhost:${API_PORT}`);
  });
}

start();
```

### 2. Sequelize Model (`models/FavoriteMovie.js`)

```javascript
const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const FavoriteMovie = sequelize.define(
  "FavoriteMovie",
  {
    tmdbId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,  // TMDB ID ca PK
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posterPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "FavoriteMovies",
    timestamps: true,  // createdAt, updatedAt
  }
);

module.exports = FavoriteMovie;
```

### 3. Favorites Page cu Redux (`src/pages/Favorites.jsx`)

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard.jsx";
import { fetchFavorites, selectFavorites } from "../features/favoritesSlice.js";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  // Fetch favorites la montare
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (favorites.length === 0) {
    return (
      <section className="favorites-empty">
        <h2>No favourite movies yet</h2>
        <p>Add movies from Home page.</p>
      </section>
    );
  }

  return (
    <section className="favorites">
      <h2>Your favourites</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
}

export default Favorites;
```

---

## 🌊 Fluxul Complet al Datelor

### Scenariul: Adăugare la Favorite

```
┌───────────────────────────────────────────────────────────────────────┐
│ 1. USER ACTION                                                        │
│    Click pe "Add to favourites"                                       │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 2. COMPONENT                                                          │
│    dispatch(addFavorite(movie))                                       │
│    - movie = { id: 550, title: "Fight Club", poster_path: "..." }    │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 3. REDUX THUNK (pending)                                              │
│    - State: status = "loading" (dacă am implementat)                  │
│    - Pregătește payload pentru server                                 │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 4. FETCH REQUEST                                                      │
│    POST /api/favorites                                                │
│    Body: { tmdbId: 550, title: "Fight Club", ... }                   │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 5. VITE PROXY                                                         │
│    Redirecționează /api/* → http://localhost:3001                    │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 6. EXPRESS SERVER                                                     │
│    app.post("/api/favorites", async (req, res) => { ... })           │
│    - Validează req.body                                               │
│    - Apelează Sequelize                                               │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 7. SEQUELIZE ORM                                                      │
│    FavoriteMovie.upsert({ tmdbId: 550, ... })                        │
│    - Generează SQL: INSERT OR REPLACE INTO FavoriteMovies ...        │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 8. SQLite DATABASE                                                    │
│    Inserează row în tabelul FavoriteMovies                           │
│    - tmdbId: 550                                                      │
│    - title: "Fight Club"                                              │
│    - createdAt: 2024-12-09T10:30:00Z                                 │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 9. RESPONSE                                                           │
│    Express → Vite Proxy → Browser                                     │
│    Status: 201 Created                                                │
│    Body: { tmdbId: 550, title: "Fight Club", ... }                   │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 10. REDUX THUNK (fulfilled)                                           │
│     addFavorite.fulfilled                                             │
│     action.payload = { id: 550, title: "Fight Club", ... }           │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 11. REDUCER UPDATE                                                    │
│     state.items = [newMovie, ...state.items]                         │
│     (Immer permite mutație "aparentă")                               │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│ 12. REACT RE-RENDER                                                   │
│     useSelector detectează schimbarea                                 │
│     MovieCard re-render: butonul devine "Remove from favourites"     │
└───────────────────────────────────────────────────────────────────────┘
```

---

## ⚖️ Comparație cu Alte Abordări

### Toate Kit-urile S11

| Aspect | NoRRwithSQL | NoRRnoSQL | RRnoSQL | **RRcuSQL** |
|--------|-------------|-----------|---------|-------------|
| **Frontend** | Vanilla JS | React | React | React |
| **State** | Variables | Context | Context | **Redux** |
| **Routing** | Manual | Router | Router | Router |
| **Backend** | Express | ❌ | ❌ | **Express** |
| **DB** | SQLite | LocalStorage | LocalStorage | **SQLite** |
| **Complexitate** | ⭐⭐ | ⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| **Producție** | ⭐⭐ | ⭐ | ⭐ | ⭐⭐⭐⭐ |

### Context API vs Redux Toolkit

| Aspect | Context API | Redux Toolkit |
|--------|-------------|---------------|
| **Setup** | ~50 linii | ~100 linii |
| **Boilerplate** | Minim | Moderat (dar organizat) |
| **Async** | Manual (useEffect) | createAsyncThunk |
| **DevTools** | Browser DevTools | Redux DevTools |
| **Loading States** | Manual | Built-in pattern |
| **Middleware** | ❌ | ✅ Thunk, Logger, etc. |
| **Time Travel** | ❌ | ✅ |
| **Best for** | Apps mici | Apps medii/mari |

### Când să folosești Redux?

✅ **Folosește Redux când:**
- Ai state complex partajat între multe componente
- Ai nevoie de logging/debugging avansat
- Echipa e mare și ai nevoie de convenții clare
- Ai multe operații asincrone

❌ **NU folosi Redux când:**
- App-ul e simplu (form-uri, liste mici)
- State-ul e local per componentă
- Înveți React pentru prima dată

---

## 💡 Exerciții Propuse

### Nivel Începător

1. **Adăugați loading indicator**
   ```jsx
   // În Favorites.jsx, afișați "Loading..." când status === "loading"
   const status = useSelector((state) => state.favorites.status);
   ```

2. **Afișați rating-ul filmului**
   - Modificați `MovieCard.jsx` să afișeze `movie.vote_average`

3. **Stilizați diferit favoritele**
   - Adăugați o bordură colorată pentru filmele favorite

### Nivel Intermediar

4. **Implementați error handling vizual**
   ```jsx
   // Afișați mesajul de eroare din state
   const error = useSelector((state) => state.favorites.error);
   if (error) return <div className="error">{error}</div>;
   ```

5. **Adăugați "Clear All Favorites"**
   ```javascript
   // Creați un nou thunk în favoritesSlice.js
   export const clearAllFavorites = createAsyncThunk(
     "favorites/clearAll",
     async () => { /* DELETE toate */ }
   );
   ```

6. **Adăugați paginare pentru favorite**
   - Modificați API-ul să accepte `?page=1&limit=10`
   - Adăugați butoane "Previous" / "Next"

### Nivel Avansat

7. **Adăugați autentificare**
   - Creați un `authSlice` pentru user state
   - Protejați rutele cu favorite per utilizator

8. **Implementați optimistic updates**
   ```javascript
   // Update UI instant, rollback dacă API eșuează
   .addCase(addFavorite.pending, (state, action) => {
     state.items.unshift(action.meta.arg);  // Optimistic
   })
   ```

9. **Adăugați caching cu RTK Query**
   ```javascript
   // Migrați la RTK Query pentru caching automat
   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
   ```

---

## 🔧 Depanare

### Problema: "Cannot GET /api/favorites"

**Cauza:** Serverul Express nu rulează.

**Soluție:**
```bash
# Terminal separat:
npm run server

# Verificare:
curl http://localhost:3001/api/favorites
```

### Problema: "CORS Error"

**Cauza:** Accesați direct port 3001 din browser sau proxy nu funcționează.

**Soluție:**
- Accesați doar `http://localhost:3000`
- Verificați `vite.config.js` pentru proxy config

### Problema: "Cannot read property 'map' of undefined"

**Cauza:** State-ul Redux nu e încărcat încă.

**Soluție:**
```jsx
// Verificați că favorites e array
const favorites = useSelector(selectFavorites) || [];
```

### Problema: "API key not working"

**Verificări:**
```bash
# 1. Verificați .env
cat .env

# 2. Reporniți AMBELE servere după modificare
# Terminal 1: Ctrl+C, npm run server
# Terminal 2: Ctrl+C, npm run dev
```

### Problema: "Port already in use"

```bash
# Găsiți procesele
lsof -i :3000
lsof -i :3001

# Opriți-le
kill -9 <PID>
```

---

## 📚 Resurse Suplimentare

### Documentație Oficială

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Vite Proxy](https://vitejs.dev/config/server-options.html#server-proxy)

### Tutoriale Recomandate

- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
- [RTK Query Overview](https://redux-toolkit.js.org/rtk-query/overview)
- [Full Stack React + Express](https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/)

### Tools

- **Redux DevTools** — Browser extension
- **Postman** — API testing
- **DB Browser for SQLite** — GUI pentru baza de date

---

<div align="center">

## 📊 Rezumat Kit

| Caracteristică | Valoare |
|----------------|---------|
| **Fișier** | `S11clim_RRcuSQL3001.zip` |
| **Frontend** | React 18 + Redux Toolkit |
| **Backend** | Express 4.21 |
| **ORM** | Sequelize 6.37 |
| **Database** | SQLite |
| **Bundler** | Vite 5.4.10 |
| **Port Frontend** | 3000 |
| **Port Backend** | 3001 |
| **State Management** | Redux Toolkit 2.3 |
| **Async Handling** | createAsyncThunk |

---

### 🔑 Key Takeaways

| Concept | Ce să rețineți |
|---------|---------------|
| **Dual Server** | Frontend (3000) + Backend (3001) |
| **Vite Proxy** | `/api/*` → `localhost:3001` |
| **Redux Store** | `configureStore({ reducer: {...} })` |
| **createSlice** | State + reducers într-un loc |
| **createAsyncThunk** | Acțiuni async cu pending/fulfilled/rejected |
| **useDispatch** | Trimite acțiuni |
| **useSelector** | Citește state |

---

**📖 Material didactic pentru Seminarul S11**

*Tehnologii Web | ASE-CSIE*

</div>
