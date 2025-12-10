# 🎬 Movie App S11C — React Router + Context API (Optimized)

> **Kit:** `S11clim_RRnoSQL.zip`  
> **Seminar S11** | Tehnologii Web | ASE-CSIE

O aplicație modernă **Single Page Application (SPA)** construită cu **React 18**, **React Router v6** și **Context API**, optimizată pentru învățarea conceptelor fundamentale de routing și state management în React.

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
9. [React Router — Concepte Cheie](#-react-router--concepte-cheie)
10. [Context API — Deep Dive](#-context-api--deep-dive)
11. [Explicația Codului](#-explicația-codului)
12. [Patterns și Best Practices](#-patterns-și-best-practices)
13. [Comparație cu Alte Abordări](#-comparație-cu-alte-abordări)
14. [Exerciții Propuse](#-exerciții-propuse)
15. [Depanare](#-depanare)

---

## 📖 Despre Aplicație

**Movie App S11C (Optimized)** este o aplicație SPA care pune accent pe două concepte esențiale din ecosistemul React:

### 🧭 React Router
Navigare declarativă între pagini fără reîncărcare, cu URL-uri curate și istoricul browserului funcțional.

### 🎯 Context API
State management global pentru partajarea datelor între componente fără "prop drilling".

### Ce face aplicația?

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   📺 TMDB API ─────► 🏠 Home Page ─────► 🔍 Search Movies       │
│                           │                                     │
│                           │ Click ❤️                            │
│                           ▼                                     │
│                    🎯 Context API                               │
│                    (favorites state)                            │
│                           │                                     │
│                           │ Navigate                            │
│                           ▼                                     │
│                    ⭐ Favorites Page                            │
│                           │                                     │
│                           │ Persist                             │
│                           ▼                                     │
│                    💾 LocalStorage                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### De ce acest kit?

| Caracteristică | Beneficiu |
|----------------|-----------|
| **Vite 5.x** | Versiune stabilă, performantă, LTS |
| **Port 3000** | Port standard React, familiar |
| **Configurare curată** | `.env.example` fără extensie `.txt` |
| **ESLint modern** | Flat config (ESLint 9.x) |
| **`.gitignore` inclus** | Ready for version control |

---

## 🛠 Tehnologii Folosite

### Stack Principal

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     React 18.3.1                        │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │   │
│  │  │ Components  │  │   Hooks     │  │     JSX         │ │   │
│  │  │ (MovieCard, │  │ (useState,  │  │  (Declarative   │ │   │
│  │  │  NavBar)    │  │  useEffect, │  │   UI)           │ │   │
│  │  │             │  │  useContext)│  │                 │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 React Router DOM 6.28                   │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │   │
│  │  │BrowserRouter│  │   Routes    │  │  NavLink/Link   │ │   │
│  │  │ (History)   │  │   Route     │  │  (Navigation)   │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘ │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Context API                          │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │  MovieContext (favorites, add, remove, check)   │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Versiuni și Dependențe

| Tehnologie | Versiune | Rol |
|------------|----------|-----|
| **React** | 18.3.1 | Biblioteca UI |
| **React DOM** | 18.3.1 | Randare în browser |
| **React Router DOM** | 6.28.0 | Routing client-side |
| **Vite** | 5.4.10 | Bundler & dev server |
| **ESLint** | 9.14.0 | Linting (flat config) |
| **TMDB API** | v3 | Date despre filme |

### De ce Vite 5.x?

| Aspect | Vite 5.x (acest kit) | Vite 7.x |
|--------|---------------------|----------|
| **Stabilitate** | ✅ LTS, production-ready | ⚠️ Newer, potential issues |
| **Compatibilitate** | ✅ Wide ecosystem support | ⚠️ May need updates |
| **Documentație** | ✅ Extensive | 📝 Growing |
| **Recomandat pentru** | Learning, production | Early adopters |

---

## 🎓 Ce Veți Învăța

### React Router v6

| Concept | Component/Hook | Descriere |
|---------|----------------|-----------|
| **Router Setup** | `BrowserRouter` | Configurarea routing-ului |
| **Route Definition** | `Routes`, `Route` | Maparea URL → Component |
| **Navigation** | `Link`, `NavLink` | Navigare declarativă |
| **Active State** | `NavLink` + `isActive` | Stilizare link activ |
| **URL Parameters** | `useParams` | Extragerea parametrilor |
| **Programmatic Nav** | `useNavigate` | Navigare din cod |

### Context API

| Concept | API | Descriere |
|---------|-----|-----------|
| **Create Context** | `createContext()` | Crearea container-ului |
| **Provider** | `<Context.Provider>` | Furnizarea valorilor |
| **Consumer** | `useContext()` | Consumarea valorilor |
| **Custom Hook** | `useMovieContext()` | Abstractizare acces |

### React Hooks

| Hook | Folosit în | Scop |
|------|------------|------|
| `useState` | `Home.jsx` | State local (movies, loading) |
| `useEffect` | `Home.jsx`, `MovieContext.jsx` | Side effects |
| `useContext` | `MovieCard.jsx`, `Favorites.jsx` | Acces context |

### JavaScript Modern (ES6+)

- **Destructuring** — `const { favorites } = useMovieContext()`
- **Spread Operator** — `[...prev, movie]`
- **Optional Chaining** — `movie?.release_date?.split("-")`
- **Nullish Coalescing** — `?? "Unknown year"`
- **Arrow Functions** — `(movie) => movie.id`
- **Template Literals** — `` `${BASE_URL}/movie/popular` ``
- **Async/Await** — `const data = await safeFetch(url)`

---

## 📁 Structura Proiectului

```
S11clim_RRnoSQL/
│
├── 📄 package.json            # Dependențe și scripturi npm
├── 📄 vite.config.js          # Configurare Vite (port 3000)
├── 📄 eslint.config.js        # ESLint flat config (v9)
├── 📄 index.html              # Shell HTML pentru React
├── 📄 .env.example            # Șablon variabile de mediu
├── 📄 .gitignore              # Fișiere ignorate de Git
│
└── 📁 src/                    # Codul sursă
    │
    ├── 📄 main.jsx            # 🚀 Entry point + Router setup
    ├── 📄 App.jsx             # 🏗️ Layout + Routes definition
    ├── 📄 index.css           # 🎨 Stiluri globale
    │
    ├── 📁 pages/              # 📄 Componente pagină (route-level)
    │   ├── 📄 Home.jsx        # Pagina principală (/)
    │   └── 📄 Favorites.jsx   # Pagina favorite (/favorites)
    │
    ├── 📁 components/         # 🧩 Componente reutilizabile
    │   ├── 📄 NavBar.jsx      # Bara de navigare
    │   └── 📄 MovieCard.jsx   # Card film individual
    │
    ├── 📁 contexts/           # 🎯 State management global
    │   └── 📄 MovieContext.jsx # Context pentru favorite
    │
    ├── 📁 services/           # 🌐 Comunicare externă
    │   └── 📄 api.js          # TMDB API wrapper
    │
    └── 📁 css/                # 💅 Stiluri per componentă
        ├── 📄 App.css
        ├── 📄 NavBar.css
        ├── 📄 Home.css
        ├── 📄 MovieCard.css
        └── 📄 Favorites.css
```

### Arhitectura Fișierelor

| Director | Pattern | Responsabilitate |
|----------|---------|------------------|
| `pages/` | **Page Components** | Componente asociate cu rute |
| `components/` | **Presentational** | UI reutilizabil, fără logică de business |
| `contexts/` | **State Layer** | State management global |
| `services/` | **Data Layer** | Comunicare cu API-uri externe |
| `css/` | **Styles Layer** | Stiluri modulare per componentă |

---

## ⚙️ Instalare și Configurare

### Cerințe Preliminare

- **Node.js** 18+ ([descărcare](https://nodejs.org/))
- **npm** (inclus cu Node.js)
- **VS Code** (recomandat) cu extensiile:
  - ES7+ React/Redux/React-Native snippets
  - ESLint
  - Prettier

### Pasul 1: Dezarhivare

```bash
# Dezarhivați kit-ul
unzip S11clim_RRnoSQL.zip

# Intrați în director
cd S11clim_RRnoSQL
```

### Pasul 2: Obținerea Cheii API TMDB

1. **Creați cont** pe [themoviedb.org](https://www.themoviedb.org/)
2. **Verificați email-ul**
3. **Settings → API → Create**
4. **Selectați "Developer"**
5. **Completați formularul** (scop: educațional)
6. **Copiați cheia API (v3 auth)**

### Pasul 3: Configurarea Cheii API

```bash
# Copiați șablonul (observați: fără .txt!)
cp .env.example .env

# SAU pe Windows:
copy .env.example .env
```

Editați `.env`:

```env
# ÎNAINTE:
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE

# DUPĂ:
VITE_TMDB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

> ⚠️ **Important:**
> - Fără ghilimele
> - Fără spații
> - Prefixul `VITE_` este obligatoriu pentru expunere în client

### Pasul 4: Instalarea Dependențelor

```bash
npm install
```

**Structura node_modules:**
```
node_modules/
├── react/              # Core React
├── react-dom/          # DOM rendering
├── react-router-dom/   # Routing
├── vite/               # Bundler
└── eslint*/            # Linting
```

---

## 🚀 Rularea Aplicației

### Development Mode

```bash
npm run dev
# sau
npm start
```

**Output așteptat:**
```
  VITE v5.4.10  ready in 245 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Accesarea Aplicației

Deschideți: **http://localhost:3000**

### Comenzi Disponibile

| Comandă | Descriere |
|---------|-----------|
| `npm run dev` | Server dezvoltare cu HMR |
| `npm start` | Alias pentru `dev` |
| `npm run build` | Build producție → `dist/` |
| `npm run preview` | Previzualizare build |

### Hot Module Replacement (HMR)

Vite oferă actualizare instantanee fără pierderea stării:

1. Modificați `src/components/NavBar.jsx`
2. Schimbați "Movie App" în "🎬 Cinema App"
3. Salvați → vezi instant modificarea
4. **Starea nu se pierde!** (favoritele rămân)

---

## 🎯 Funcționalități

### 1. Navigare SPA cu React Router

```
┌─────────────────────────────────────────────────────────────────┐
│  URL: http://localhost:3000/                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  🎬 Movie App        [Home]  [Favorites]                  │ │
│  │                       ^^^^                                │ │
│  │                      ACTIVE (orange)                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    Discover movies                        │ │
│  │  ┌─────────────────────────────┐ ┌──────────┐            │ │
│  │  │ Search for a movie...       │ │  Search  │            │ │
│  │  └─────────────────────────────┘ └──────────┘            │ │
│  │                                                           │ │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │ │
│  │  │ Poster  │  │ Poster  │  │ Poster  │  │ Poster  │     │ │
│  │  │         │  │         │  │         │  │         │     │ │
│  │  │ Title   │  │ Title   │  │ Title   │  │ Title   │     │ │
│  │  │ 2024    │  │ 2023    │  │ 2024    │  │ 2022    │     │ │
│  │  │[+ Fav]  │  │[✓ Fav]  │  │[+ Fav]  │  │[+ Fav]  │     │ │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Comportament:**
- Click pe "Favorites" → URL devine `/favorites`
- **Fără reîncărcare pagină!**
- Butonul Back funcționează
- URL-ul poate fi bookmark-at

### 2. State Global cu Context API

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    MovieProvider                                │
│                    ┌─────────────────────┐                      │
│                    │ favorites: [        │                      │
│                    │   { id: 550, ... }, │                      │
│                    │   { id: 680, ... }  │                      │
│                    │ ]                   │                      │
│                    └─────────┬───────────┘                      │
│                              │                                  │
│           ┌──────────────────┼──────────────────┐               │
│           │                  │                  │               │
│           ▼                  ▼                  ▼               │
│     ┌───────────┐     ┌───────────┐     ┌───────────┐          │
│     │  NavBar   │     │   Home    │     │ Favorites │          │
│     │ (no need) │     │           │     │           │          │
│     └───────────┘     └─────┬─────┘     └─────┬─────┘          │
│                             │                 │                 │
│                       ┌─────▼─────┐     ┌─────▼─────┐          │
│                       │MovieCard[]│     │MovieCard[]│          │
│                       │           │     │           │          │
│                       │useContext │     │useContext │          │
│                       └───────────┘     └───────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Persistență LocalStorage

```javascript
// La încărcare (mount):
useEffect(() => {
  const stored = localStorage.getItem("favorites");
  setFavorites(JSON.parse(stored));
}, []);

// La modificare favorites:
useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);
```

**Flux:**
```
Add to Favorites
       │
       ▼
setFavorites([...prev, movie])
       │
       ▼
useEffect detectează schimbarea
       │
       ▼
localStorage.setItem("favorites", ...)
       │
       ▼
Persistat! ✓
```

---

## 🏗 Arhitectura Aplicației

### Component Tree

```
                            index.html
                                │
                                ▼
                            main.jsx
                    ┌───────────┴───────────┐
                    │    React.StrictMode   │
                    │           │           │
                    │    BrowserRouter      │
                    │           │           │
                    └───────────┼───────────┘
                                │
                            App.jsx
                    ┌───────────┴───────────┐
                    │     MovieProvider     │  ◄── Context
                    │           │           │
                    │    ┌──────┴──────┐    │
                    │    │  app-root   │    │
                    │    │      │      │    │
                    │    │  ┌───┴───┐  │    │
                    │    │  │NavBar │  │    │
                    │    │  └───────┘  │    │
                    │    │      │      │    │
                    │    │  ┌───┴───┐  │    │
                    │    │  │Routes │  │    │
                    │    │  │   │   │  │    │
                    │    └──┼───┼───┼──┘    │
                    └───────┼───┼───┼───────┘
                            │   │   │
              ┌─────────────┘   │   └─────────────┐
              │                 │                 │
              ▼                 │                 ▼
         Route "/"              │          Route "/favorites"
              │                 │                 │
              ▼                 │                 ▼
           Home.jsx             │           Favorites.jsx
              │                 │                 │
              ▼                 │                 ▼
        MovieCard[]             │           MovieCard[]
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         EXTERNAL                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                      TMDB API                           │   │
│  │                (themoviedb.org/3)                       │   │
│  └────────────────────────┬────────────────────────────────┘   │
└───────────────────────────┼─────────────────────────────────────┘
                            │ HTTP GET
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      services/api.js                            │
│              getPopularMovies(), searchMovies()                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │ async/await
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Home.jsx                                 │
│                 useState: movies, loading                       │
│                 useEffect: fetch on mount                       │
└───────────────────────────┬─────────────────────────────────────┘
                            │ props: movie
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MovieCard.jsx                              │
│                    useMovieContext()                            │
│              { addToFavorites, isFavorite }                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │ context update
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MovieContext.jsx                             │
│                  favorites: [...movies]                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │ useEffect
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      localStorage                               │
│                   "favorites": "[...]"                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧭 React Router — Concepte Cheie

### 1. Router Setup (`main.jsx`)

```jsx
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>        {/* Activează routing-ul */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**BrowserRouter:**
- Folosește History API (URL-uri curate: `/favorites`)
- Alternativă: `HashRouter` (URL-uri cu #: `/#/favorites`)

### 2. Route Definition (`App.jsx`)

```jsx
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <Routes>
        {/* Exact match pentru "/" */}
        <Route path="/" element={<Home />} />
        
        {/* Match pentru "/favorites" */}
        <Route path="/favorites" element={<Favorites />} />
        
        {/* Opțional: 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </MovieProvider>
  );
}
```

### 3. Navigation Components (`NavBar.jsx`)

```jsx
import { Link, NavLink } from "react-router-dom";

// Link simplu - doar navigare
<Link to="/">Movie App</Link>

// NavLink - cu suport pentru stilizare "active"
<NavLink
  to="/"
  end                           // Exact match (important pentru "/")
  className={({ isActive }) =>
    isActive ? "navbar-link active" : "navbar-link"
  }
>
  Home
</NavLink>
```

**Diferența Link vs NavLink:**

| Component | Use Case | Active State |
|-----------|----------|--------------|
| `Link` | Logo, butoane simple | ❌ Nu |
| `NavLink` | Meniuri de navigare | ✅ Da (`isActive`) |

### 4. Route Matching

```
URL: /favorites

Routes:
  "/" → Home         ❌ (nu match exact)
  "/favorites" → Favorites  ✅ (match!)
```

**Prop `end` pe NavLink:**
```jsx
// FĂRĂ "end":
// URL: /favorites
// "/" isActive = true (pentru că /favorites începe cu /)

// CU "end":
// URL: /favorites  
// "/" isActive = false (exact match required)
```

---

## 🎯 Context API — Deep Dive

### 1. Crearea Contextului

```jsx
// contexts/MovieContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Creează containerul pentru date globale
// null = valoare default (înainte de Provider)
const MovieContext = createContext(null);
```

### 2. Provider Component

```jsx
export function MovieProvider({ children }) {
  // State-ul care va fi partajat
  const [favorites, setFavorites] = useState([]);

  // Side effects pentru sincronizare cu localStorage
  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage on change
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Funcțiile care modifică state-ul
  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

  // Valoarea expusă consumatorilor
  const contextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
}
```

### 3. Custom Hook pentru Consum

```jsx
export function useMovieContext() {
  const context = useContext(MovieContext);
  
  // Protecție: aruncă eroare dacă e folosit în afara Provider-ului
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider.");
  }
  
  return context;
}
```

### 4. Folosirea în Componente

```jsx
// În MovieCard.jsx
import { useMovieContext } from "../contexts/MovieContext.jsx";

function MovieCard({ movie }) {
  // Destructuring din context
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  
  const favorite = isFavorite(movie.id);
  
  const handleClick = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  
  return (
    <button onClick={handleClick}>
      {favorite ? "Remove" : "Add"}
    </button>
  );
}
```

### Diagrama Context Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  MovieProvider                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  favorites = [{ id: 550, title: "Fight Club" }]        │   │
│  │                                                         │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ contextValue = {                                │   │   │
│  │  │   favorites,                                    │   │   │
│  │  │   addToFavorites: (movie) => {...},            │   │   │
│  │  │   removeFromFavorites: (id) => {...},          │   │   │
│  │  │   isFavorite: (id) => boolean                  │   │   │
│  │  │ }                                               │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                          │                             │   │
│  └──────────────────────────┼─────────────────────────────┘   │
│                             │                                  │
│                             ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              <MovieContext.Provider                     │  │
│  │                 value={contextValue}>                   │  │
│  │                        │                                │  │
│  │          ┌─────────────┴─────────────┐                  │  │
│  │          │                           │                  │  │
│  │          ▼                           ▼                  │  │
│  │   useMovieContext()           useMovieContext()         │  │
│  │   în MovieCard                în Favorites              │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 📝 Explicația Codului

### 1. Entry Point (`main.jsx`)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// React 18 API pentru rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode: verificări suplimentare în development
  <React.StrictMode>
    {/* BrowserRouter: activează routing-ul în întreaga aplicație */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### 2. Layout & Routes (`App.jsx`)

```jsx
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import "./css/App.css";

function App() {
  return (
    // MovieProvider învelește tot → state global disponibil
    <MovieProvider>
      <div className="app-root">
        {/* NavBar în afara Routes → vizibil pe toate paginile */}
        <NavBar />
        
        <main className="main-content">
          {/* Routes: container pentru definițiile rutelor */}
          <Routes>
            {/* Route: mapează URL → componentă */}
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
```

### 3. Navigation (`NavBar.jsx`)

```jsx
import { Link, NavLink } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo - Link simplu */}
        <div className="navbar-brand">
          <Link to="/">Movie App</Link>
        </div>
        
        <nav className="navbar-links">
          {/* NavLink cu active state */}
          <NavLink
            to="/"
            end  // Important: exact match pentru "/"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
```

### 4. Home Page cu Data Fetching (`Home.jsx`)

```jsx
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard.jsx";
import { getPopularMovies, searchMovies } from "../services/api.js";
import "../css/Home.css";

function Home() {
  // State local pentru această pagină
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch popular movies on mount
  useEffect(() => {
    let isMounted = true;  // Cleanup flag

    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        if (isMounted) {
          setMovies(popularMovies);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load movies.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPopularMovies();

    // Cleanup: previne updates pe componente demontate
    return () => { isMounted = false; };
  }, []);  // [] = rulează o singură dată

  // Handler pentru search form
  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery || loading) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const results = await searchMovies(trimmedQuery);
      setMovies(results);
      setError(null);
    } catch (err) {
      setError("Failed to search.");
    } finally {
      setLoading(false);
    }
  };

  // Conditional rendering
  return (
    <section className="home">
      <h1>Discover movies</h1>
      
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
```

---

## 🎨 Patterns și Best Practices

### 1. Custom Hook Pattern

```jsx
// ❌ Fără custom hook - verbose
function MovieCard({ movie }) {
  const context = useContext(MovieContext);
  if (!context) throw new Error("...");
  const { addToFavorites } = context;
  // ...
}

// ✅ Cu custom hook - clean
function MovieCard({ movie }) {
  const { addToFavorites } = useMovieContext();
  // ...
}
```

### 2. Cleanup în useEffect

```jsx
useEffect(() => {
  let isMounted = true;  // Flag

  const fetchData = async () => {
    const data = await api.getData();
    if (isMounted) {  // Verifică înainte de update
      setData(data);
    }
  };

  fetchData();

  return () => {
    isMounted = false;  // Cleanup
  };
}, []);
```

### 3. Functional Updates pentru State

```jsx
// ❌ Poate cauza race conditions
setFavorites([...favorites, movie]);

// ✅ Folosește versiunea anterioară garantată
setFavorites((prev) => [...prev, movie]);
```

### 4. Conditional Rendering Patterns

```jsx
// Pattern 1: && (când vrei doar true case)
{loading && <Spinner />}

// Pattern 2: Ternary (când ai ambele cazuri)
{loading ? <Spinner /> : <Content />}

// Pattern 3: Early return (pentru empty states)
if (!hasFavorites) {
  return <EmptyState />;
}
return <FavoritesList />;
```

---

## ⚖️ Comparație cu Alte Abordări

### Acest Kit vs Alte Kit-uri S11

| Aspect | RRnoSQL (acest kit) | NoRRnoSQL | NoRRwithSQL |
|--------|---------------------|-----------|-------------|
| **Frontend** | React 18 | React 18 | Vanilla JS |
| **Routing** | React Router v6 | React Router v6 | Manual (view switching) |
| **State** | Context API | Context API | Variabile globale |
| **Persistență** | LocalStorage | LocalStorage | SQLite + Express |
| **Vite** | 5.4.10 | 7.2.7 | N/A |
| **Port** | 3000 | 4000 | 4000 |

### Context API vs Redux

| Aspect | Context API (acest kit) | Redux |
|--------|------------------------|-------|
| **Setup** | Minimal (~50 linii) | Verbose (~150+ linii) |
| **Boilerplate** | Low | High |
| **DevTools** | Browser DevTools | Redux DevTools |
| **Middleware** | ❌ | ✅ (thunk, saga) |
| **Time Travel** | ❌ | ✅ |
| **Best for** | Small/medium apps | Large apps |

### React Router v6 vs v5

| Aspect | v6 (acest kit) | v5 |
|--------|----------------|-----|
| **Route syntax** | `element={<Component />}` | `component={Component}` |
| **Switch** | `<Routes>` | `<Switch>` |
| **Redirect** | `<Navigate>` | `<Redirect>` |
| **Hooks** | `useNavigate` | `useHistory` |
| **Size** | Smaller bundle | Larger |

---

## 💡 Exerciții Propuse

### Nivel Începător

1. **Adăugați o pagină About**
   ```jsx
   // Creați src/pages/About.jsx
   // Adăugați ruta în App.jsx
   // Adăugați link în NavBar.jsx
   ```

2. **Afișați rating-ul filmului**
   - În `MovieCard.jsx`, adăugați `movie.vote_average`

3. **Personalizați tema**
   - Modificați culorile în `src/index.css`

### Nivel Intermediar

4. **Adăugați pagină de detalii film**
   ```jsx
   // Route: /movie/:id
   // Hook: useParams() pentru a extrage id-ul
   // API: Creați getMovieDetails(id) în api.js
   ```

5. **Implementați badge "Favorites" în NavBar**
   ```jsx
   // Afișați numărul de favorite lângă link
   // Hint: useMovieContext() în NavBar
   ```

6. **Adăugați "Clear All Favorites"**
   ```jsx
   // Buton în Favorites.jsx
   // Funcție clearFavorites() în Context
   ```

### Nivel Avansat

7. **Implementați căutare cu debounce**
   ```jsx
   // Căutare automată la tastare
   // Debounce 300ms pentru a reduce cererile
   ```

8. **Adăugați infinite scroll**
   ```jsx
   // Încărcați mai multe filme la scroll
   // Modificați api.js pentru paginare
   ```

9. **Migrați la Redux Toolkit**
   ```jsx
   // Înlocuiți Context cu Redux
   // Comparați complexitatea și beneficiile
   ```

---

## 🔧 Depanare

### Problema: "Filme nu se încarcă"

**Verificări:**
```bash
# 1. Verificați .env
cat .env
# Trebuie să conțină: VITE_TMDB_API_KEY=...

# 2. Reporniți serverul după modificare .env
npm run dev
```

### Problema: "NavLink nu devine active"

**Cauză:** Lipsește prop `end` pe ruta "/"

```jsx
// ❌ Greșit
<NavLink to="/">Home</NavLink>

// ✅ Corect
<NavLink to="/" end>Home</NavLink>
```

### Problema: "Context is null"

**Cauză:** Componenta e în afara Provider-ului

```jsx
// ❌ Greșit
<App>
  <MovieProvider>
    <SomeComponent />  {/* OK */}
  </MovieProvider>
  <OtherComponent />   {/* EROARE: în afara Provider */}
</App>

// ✅ Corect
<MovieProvider>
  <App />  {/* Tot ce e în App are acces */}
</MovieProvider>
```

### Problema: "Port 3000 ocupat"

```bash
# Găsiți procesul
lsof -i :3000

# Sau schimbați portul în vite.config.js
server: {
  port: 3001
}
```

---

## 📚 Resurse Suplimentare

### Documentație Oficială

- [React Documentation](https://react.dev/)
- [React Router v6](https://reactrouter.com/en/main)
- [Vite Guide](https://vitejs.dev/)
- [TMDB API](https://developers.themoviedb.org/3)

### Tutoriale Recomandate

- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [useContext Hook](https://react.dev/reference/react/useContext)
- [State Management Comparison](https://react.dev/learn/scaling-up-with-reducer-and-context)

---

<div align="center">

## 📊 Rezumat Kit

| Caracteristică | Valoare |
|----------------|---------|
| **Fișier** | `S11clim_RRnoSQL.zip` |
| **Framework** | React 18.3.1 |
| **Routing** | React Router v6.28 |
| **State Management** | Context API |
| **Bundler** | Vite 5.4.10 |
| **Persistență** | LocalStorage |
| **Port** | 3000 |
| **API Extern** | TMDB v3 |
| **Linting** | ESLint 9.x (flat config) |

---

### 🔑 Key Takeaways

| Concept | Ce să rețineți |
|---------|---------------|
| **BrowserRouter** | Învelește aplicația pentru routing |
| **Routes + Route** | Definesc maparea URL → Component |
| **NavLink** | Link cu suport pentru active state |
| **createContext** | Creează container pentru state global |
| **Provider** | Furnizează valori componentelor copil |
| **useContext** | Consumă valorile din context |
| **Custom Hook** | Abstractizează logica de acces la context |

---

**📖 Material didactic pentru Seminarul S11**

*Tehnologii Web | ASE-CSIE*

</div>
