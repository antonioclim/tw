# 🎬 Movie App S11C — React + Context API

> **Kit:** `S11clim_NoRRnoSQL.zip`  
> **Seminar S11** | Tehnologii Web | ASE-CSIE

O aplicație modernă de catalog de filme construită cu **React 18**, **Vite** și **Context API**, care permite căutarea filmelor și gestionarea unei liste de favorite cu persistență în browser.

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
9. [Explicația Codului](#-explicația-codului)
10. [Concepte React Demonstrate](#-concepte-react-demonstrate)
11. [Comparație cu Alte Abordări](#-comparație-cu-alte-abordări)
12. [Exerciții Propuse](#-exerciții-propuse)
13. [Depanare](#-depanare)

---

## 📖 Despre Aplicație

**Movie App S11C** este o aplicație Single Page Application (SPA) care demonstrează conceptele fundamentale ale dezvoltării moderne cu React:

- **Componentizare** — UI-ul este împărțit în componente reutilizabile
- **State Management** — folosind Context API pentru stare globală
- **Routing** — navigare între pagini fără reîncărcare folosind React Router
- **Persistență Client-Side** — salvarea datelor în LocalStorage
- **Integrare API** — consumarea unui API REST extern (TMDB)

### Ce face aplicația?

1. **Afișează filme populare** de la The Movie Database (TMDB)
2. **Permite căutarea** filmelor după titlu
3. **Gestionează o listă de favorite** cu persistență în browser
4. **Navigare fluidă** între pagina principală și pagina de favorite

### De ce acest kit?

Acest kit reprezintă o abordare **React fără Redux**, ideală pentru:
- Înțelegerea fundamentelor React înainte de a trece la soluții mai complexe
- Învățarea Context API ca alternativă simplă la Redux pentru aplicații mici/medii
- Experimentarea cu hook-urile React (`useState`, `useEffect`, `useContext`)

---

## 🛠 Tehnologii Folosite

| Tehnologie | Versiune | Rol |
|------------|----------|-----|
| **React** | 18.3.1 | Biblioteca UI pentru construirea interfeței |
| **React DOM** | 18.3.1 | Randarea React în browser |
| **React Router DOM** | 6.28.0 | Routing client-side (navigare între pagini) |
| **Vite** | 7.2.7 | Bundler și server de dezvoltare rapid |
| **ESLint** | 9.14.0 | Linting pentru calitatea codului |
| **TMDB API** | v3 | Sursa datelor despre filme |

### De ce aceste tehnologii?

- **React 18** — Ultima versiune stabilă cu features moderne (Concurrent Mode, Suspense)
- **Vite** — De 10-100x mai rapid decât Create React App la build și HMR
- **React Router v6** — Sintaxă modernă, mai intuitivă decât v5
- **Context API** — Built-in în React, nu necesită dependențe externe

---

## 🎓 Ce Veți Învăța

### Concepte React

| Concept | Unde în cod | Ce face |
|---------|-------------|---------|
| **Componente funcționale** | Toate fișierele `.jsx` | Definirea UI-ului ca funcții |
| **JSX** | Tot proiectul | Sintaxa pentru descrierea UI-ului |
| **Props** | `MovieCard.jsx` | Transmiterea datelor între componente |
| **useState** | `Home.jsx` | Stare locală în componente |
| **useEffect** | `Home.jsx`, `MovieContext.jsx` | Side effects și lifecycle |
| **useContext** | `MovieCard.jsx`, `Favorites.jsx` | Consumarea contextului global |
| **Context API** | `MovieContext.jsx` | State management global |
| **React Router** | `App.jsx`, `NavBar.jsx` | Navigare SPA |

### Concepte JavaScript Moderne

- **ES6 Modules** (`import`/`export`)
- **Arrow Functions**
- **Destructuring** (`const { favorites } = useMovieContext()`)
- **Spread Operator** (`[...prev, movie]`)
- **Async/Await** pentru apeluri API
- **Optional Chaining** (`movie?.release_date?.split("-")`)
- **Nullish Coalescing** (`?? "Unknown year"`)

### Concepte Web

- **LocalStorage** — persistență în browser
- **Fetch API** — cereri HTTP
- **REST API** — consumarea TMDB API
- **CSS Modern** — CSS Variables, Flexbox, Grid

---

## 📁 Structura Proiectului

```
S11clim_NoRRnoSQL/
│
├── 📄 index.html              # Punct de intrare HTML (shell pentru React)
├── 📄 package.json            # Dependențe și scripturi npm
├── 📄 vite.config.js          # Configurare Vite (port 4000)
├── 📄 eslint.config.js        # Configurare linting
├── 📄 .env.example.txt        # Șablon pentru variabile de mediu
│
└── 📁 src/                    # Codul sursă React
    │
    ├── 📄 main.jsx            # Punct de intrare React + Router setup
    ├── 📄 App.jsx             # Componenta principală + definire rute
    ├── 📄 index.css           # Stiluri globale (tema, fonturi)
    │
    ├── 📁 pages/              # Componente de tip "pagină"
    │   ├── 📄 Home.jsx        # Pagina principală (filme populare + căutare)
    │   └── 📄 Favorites.jsx   # Pagina cu filmele favorite
    │
    ├── 📁 components/         # Componente reutilizabile
    │   ├── 📄 NavBar.jsx      # Bara de navigare
    │   └── 📄 MovieCard.jsx   # Card individual pentru un film
    │
    ├── 📁 contexts/           # Context API (state global)
    │   └── 📄 MovieContext.jsx # Provider + hook pentru favorite
    │
    ├── 📁 services/           # Servicii externe (API)
    │   └── 📄 api.js          # Funcții pentru TMDB API
    │
    └── 📁 css/                # Stiluri per componentă
        ├── 📄 App.css
        ├── 📄 NavBar.css
        ├── 📄 Home.css
        ├── 📄 Favorites.css
        └── 📄 MovieCard.css
```

### Explicația structurii

| Director/Fișier | Responsabilitate |
|-----------------|------------------|
| `pages/` | Componente care reprezintă pagini întregi (asociate cu rute) |
| `components/` | Componente UI reutilizabile (nu sunt legate de o rută) |
| `contexts/` | State management global folosind Context API |
| `services/` | Logică de comunicare cu servicii externe (API-uri) |
| `css/` | Stiluri separate per componentă (modularizare) |

---

## ⚙️ Instalare și Configurare

### Cerințe preliminare

- **Node.js** versiune 18+ ([descărcare](https://nodejs.org/))
- **npm** (inclus cu Node.js)
- **Editor de cod** (recomandat: VS Code)
- **Cont TMDB** pentru cheia API

### Pasul 1: Dezarhivare

```bash
# Dezarhivați kit-ul
unzip S11clim_NoRRnoSQL.zip

# Intrați în directorul proiectului
cd S11clim_NoRRnoSQL
```

### Pasul 2: Obținerea cheii API TMDB

Aplicația necesită o cheie API de la **The Movie Database** pentru a funcționa.

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

### Pasul 3: Configurarea cheii API

```bash
# Creați fișierul .env din șablon
mv .env.example.txt .env

# SAU pe Windows:
# rename .env.example.txt .env
```

Deschideți fișierul `.env` și înlocuiți valoarea:

```env
# ÎNAINTE:
VITE_TMDB_API_KEY=eb1dd9f5a6ee1d191dd21171f8c948[adica_introduci_aici_cheia_ta]

# DUPĂ (exemplu - folosiți cheia VOASTRĂ):
VITE_TMDB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

> ⚠️ **Important:** Nu includeți ghilimele și nu lăsați spații!

### Pasul 4: Instalarea dependențelor

```bash
npm install
```

Aceasta va instala:
- `react` și `react-dom` — biblioteca React
- `react-router-dom` — routing
- `vite` și plugin-uri — bundler
- `eslint` — linting

---

## 🚀 Rularea Aplicației

### Modul de dezvoltare (recomandat pentru învățare)

```bash
npm run dev
# sau
npm start
```

**Output așteptat:**
```
  VITE v7.2.7  ready in 300 ms

  ➜  Local:   http://localhost:4000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Deschideți aplicația

Navigați în browser la: **http://localhost:4000**

### Alte comenzi disponibile

| Comandă | Descriere |
|---------|-----------|
| `npm run dev` | Pornește serverul de dezvoltare cu HMR |
| `npm start` | Alias pentru `npm run dev` |
| `npm run build` | Creează versiunea de producție în `dist/` |
| `npm run preview` | Previzualizează build-ul de producție |

### Hot Module Replacement (HMR)

Vite oferă **HMR** — modificările în cod se reflectă instant în browser fără a pierde starea aplicației. Încercați:

1. Deschideți `src/components/NavBar.jsx`
2. Modificați textul "Movie App" în "Film App"
3. Salvați — vedeți schimbarea instant!

---

## 🎯 Funcționalități

### 1. Pagina Home — Filme Populare

**Ce vedeți:**
- Lista cu cele mai populare filme din TMDB
- Formular de căutare
- Carduri de film cu poster, titlu și an
- Buton pentru adăugare la favorite

**Cum funcționează:**
```
┌─────────────────────────────────────────────────────────┐
│                    [Movie App]                          │
│                 Home    Favorites                       │
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

**Ce puteți face:**
- Introduceți un termen de căutare
- Apăsați "Search" sau Enter
- Vedeți rezultatele filtrate

**Comportament:**
- Căutarea înlocuiește lista de filme populare
- Dacă nu există rezultate, apare un mesaj
- Reîncărcarea paginii revine la filme populare

### 3. Pagina Favorites

**Ce vedeți:**
- Lista filmelor marcate ca favorite
- Același format de carduri ca pe Home
- Posibilitate de a elimina filme din favorite

**Dacă lista e goală:**
```
┌─────────────────────────────────────────────────────────┐
│                    [Movie App]                          │
│                 Home    Favorites                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│           No favourite movies yet                       │
│                                                         │
│     Start adding movies to your favourites on the      │
│     Home page and they will appear here.               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4. Persistența Favoritelor

**Cum funcționează:**
- Favoritele sunt salvate în **LocalStorage**
- Datele persistă între sesiuni de browser
- La reîncărcare, favoritele sunt restaurate automat

**Verificare:**
1. Adăugați câteva filme la favorite
2. Închideți browser-ul
3. Redeschideți aplicația
4. Favoritele sunt încă acolo! ✓

### 5. Navigare SPA

**Caracteristici:**
- URL-ul se schimbă (`/` → `/favorites`)
- Pagina nu se reîncarcă complet
- Tranziție instantanee între pagini
- Butonul Back al browserului funcționează

---

## 🏗 Arhitectura Aplicației

### Diagrama de Componente

```
                          ┌─────────────┐
                          │   main.jsx  │
                          │  (Entry)    │
                          └──────┬──────┘
                                 │
                    ┌────────────▼────────────┐
                    │      BrowserRouter      │
                    │    (React Router)       │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │         App.jsx         │
                    │   ┌─────────────────┐   │
                    │   │  MovieProvider  │   │  ◄── Context Provider
                    │   │   (Context)     │   │
                    │   └────────┬────────┘   │
                    └────────────┼────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
      ┌───────▼───────┐  ┌───────▼───────┐  ┌──────▼──────┐
      │   NavBar.jsx  │  │   Home.jsx    │  │Favorites.jsx│
      │               │  │    (Route /)  │  │(Route /fav) │
      └───────────────┘  └───────┬───────┘  └──────┬──────┘
                                 │                 │
                          ┌──────▼──────┐   ┌──────▼──────┐
                          │ MovieCard[] │   │ MovieCard[] │
                          └─────────────┘   └─────────────┘
```

### Fluxul de Date

```
┌─────────────────────────────────────────────────────────────────┐
│                        TMDB API                                 │
│                    (Date externe)                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │ fetch()
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     services/api.js                             │
│            getPopularMovies(), searchMovies()                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Home.jsx                                  │
│              useState: movies, loading, error                   │
│              useEffect: încărcare la mount                      │
└───────────────────────────┬─────────────────────────────────────┘
                            │ props: movie
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MovieCard.jsx                               │
│         useMovieContext() → { addToFavorites, isFavorite }      │
└───────────────────────────┬─────────────────────────────────────┘
                            │ addToFavorites(movie)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   MovieContext.jsx                              │
│         useState: favorites                                     │
│         useEffect: sync cu LocalStorage                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      LocalStorage                               │
│                   (Persistență browser)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📝 Explicația Codului

### 1. Punctul de Intrare (`main.jsx`)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**Ce face:**
- `ReactDOM.createRoot` — creează root-ul React 18 (nou în v18)
- `React.StrictMode` — activează verificări suplimentare în development
- `BrowserRouter` — activează routing-ul pentru toată aplicația

### 2. Componenta Principală (`App.jsx`)

```jsx
function App() {
  return (
    <MovieProvider>           {/* Context Provider - furnizează starea globală */}
      <div className="app-root">
        <NavBar />            {/* Afișat pe toate paginile */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}
```

**Ce face:**
- `MovieProvider` învelește toată aplicația → toate componentele au acces la context
- `Routes` + `Route` definesc ce componentă se afișează pentru fiecare URL
- `NavBar` este în afara `Routes` → apare pe toate paginile

### 3. Context API (`MovieContext.jsx`)

```jsx
// Crearea contextului
const MovieContext = createContext(null);

// Provider-ul care furnizează datele
export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Încărcare din LocalStorage la prima randare
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);  // [] = rulează o singură dată

  // Salvare în LocalStorage la fiecare modificare
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);  // [favorites] = rulează când favorites se schimbă

  // Funcțiile expuse componentelor
  const addToFavorites = (movie) => { /* ... */ };
  const removeFromFavorites = (movieId) => { /* ... */ };
  const isFavorite = (movieId) => favorites.some((m) => m.id === movieId);

  return (
    <MovieContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </MovieContext.Provider>
  );
}

// Hook custom pentru consumarea contextului
export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider.");
  }
  return context;
}
```

**Concepte cheie:**
- `createContext` — creează un "container" pentru date globale
- `Provider` — componenta care furnizează datele copiilor
- `useContext` — hook pentru a accesa datele din context
- Hook custom (`useMovieContext`) — abstractizează logica de acces

### 4. Serviciul API (`api.js`)

```jsx
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies() {
  if (!API_KEY) {
    console.warn("[TMDB] No API key configured.");
    return [];  // Returnează array gol în loc să crape
  }

  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-GB&page=1`;
  const data = await safeFetch(url);
  return data.results || [];
}
```

**Concepte cheie:**
- `import.meta.env` — accesarea variabilelor de mediu în Vite
- Prefix `VITE_` — obligatoriu pentru variabile expuse în client
- Graceful degradation — aplicația nu crape dacă lipsește cheia

### 5. Componenta Home (`Home.jsx`)

```jsx
function Home() {
  // State local pentru această pagină
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Side effect: încărcare filme la montare
  useEffect(() => {
    let isMounted = true;  // Flag pentru cleanup

    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        if (isMounted) {  // Verifică dacă componenta e încă montată
          setMovies(popularMovies);
        }
      } catch (err) {
        if (isMounted) setError("Failed to load...");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPopularMovies();

    return () => { isMounted = false; };  // Cleanup la demontare
  }, []);

  // Randare condiționată
  return (
    <section className="home">
      {loading ? (
        <div className="loading">Loading…</div>
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
```

**Concepte cheie:**
- **Cleanup în useEffect** — previne memory leaks și actualizări pe componente demontate
- **Randare condiționată** — afișează loading, eroare sau date
- **key prop** — identificator unic pentru fiecare element din listă (obligatoriu în React)

### 6. Componenta MovieCard (`MovieCard.jsx`)

```jsx
function MovieCard({ movie }) {
  // Accesează contextul global
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  // Optional chaining + nullish coalescing
  const year = movie?.release_date?.split("-")[0] ?? "Unknown year";

  return (
    <article className="movie-card">
      {/* Randare condiționată pentru poster */}
      {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      ) : (
        <div className="placeholder">No image</div>
      )}
      
      <button onClick={handleFavoriteClick}>
        {favorite ? "Remove from favourites" : "Add to favourites"}
      </button>
    </article>
  );
}
```

**Concepte cheie:**
- **Destructuring props** — `{ movie }` extrage direct din props
- **Consumarea contextului** — `useMovieContext()` accesează starea globală
- **Event handling** — `onClick={handleFavoriteClick}`
- **Conditional rendering** — `{favorite ? "Remove" : "Add"}`

---

## 🔬 Concepte React Demonstrate

### 1. Hooks Folosite

| Hook | Fișier | Scop |
|------|--------|------|
| `useState` | `Home.jsx` | Stare locală (movies, loading, error) |
| `useEffect` | `Home.jsx`, `MovieContext.jsx` | Side effects (fetch, localStorage) |
| `useContext` | `MovieCard.jsx`, `Favorites.jsx` | Acces la context global |

### 2. Patterns Folosite

| Pattern | Exemplu | Beneficiu |
|---------|---------|-----------|
| **Container/Presentational** | `Home` (logic) vs `MovieCard` (UI) | Separare responsabilități |
| **Custom Hook** | `useMovieContext()` | Reutilizare logică |
| **Controlled Components** | Input de căutare | React controlează valoarea |
| **Conditional Rendering** | Loading states | UI responsive |
| **Lifting State Up** | Favorites în Context | Partajare între componente |

### 3. Fluxul Unidirecțional de Date

```
     ┌──────────────────────────────────────────┐
     │                                          │
     │    MovieProvider (sursa adevărului)      │
     │    favorites = [...]                     │
     │                                          │
     └────────────────┬─────────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
    ┌───────────┐           ┌───────────┐
    │   Home    │           │ Favorites │
    │           │           │           │
    │ MovieCard │           │ MovieCard │
    └─────┬─────┘           └─────┬─────┘
          │                       │
          │  addToFavorites()     │  removeFromFavorites()
          │                       │
          └───────────┬───────────┘
                      │
                      ▼
              ┌───────────────┐
              │ setFavorites  │
              │   (update)    │
              └───────────────┘
```

---

## ⚖️ Comparație cu Alte Abordări

### Context API vs Redux

| Aspect | Context API (acest kit) | Redux |
|--------|------------------------|-------|
| **Complexitate** | ⭐ Simplă | ⭐⭐⭐ Complexă |
| **Boilerplate** | Minim | Mult (actions, reducers, store) |
| **DevTools** | Nu | Da (Redux DevTools) |
| **Middleware** | Nu built-in | Da (thunk, saga) |
| **Cazuri de utilizare** | Aplicații mici/medii | Aplicații mari/complexe |
| **Performanță** | Re-render la orice schimbare | Optimizări selective |

### LocalStorage vs Backend

| Aspect | LocalStorage (acest kit) | Backend + DB |
|--------|-------------------------|--------------|
| **Persistență** | Per browser | Centralizată |
| **Multi-device** | ❌ | ✅ |
| **Capacitate** | ~5-10 MB | Nelimitată |
| **Securitate** | Vizibil în DevTools | Protejat pe server |
| **Complexitate** | ⭐ | ⭐⭐⭐ |

---

## 💡 Exerciții Propuse

### Nivel Începător

1. **Modificați titlul aplicației**
   - Schimbați "Movie App" în altceva în `NavBar.jsx`

2. **Adăugați rating-ul filmului**
   - În `MovieCard.jsx`, afișați `movie.vote_average`

3. **Stilizare personalizată**
   - Modificați culorile în `src/index.css`

### Nivel Intermediar

4. **Adăugați o pagină de detalii film**
   - Creați `src/pages/MovieDetails.jsx`
   - Adăugați ruta `/movie/:id` în `App.jsx`
   - Faceți click pe card să navigheze acolo

5. **Implementați paginare**
   - Adăugați butoane "Next" și "Previous"
   - Modificați `api.js` să accepte parametrul `page`

6. **Adăugați număr de favorite în NavBar**
   - Afișați badge cu `favorites.length`

### Nivel Avansat

7. **Migrați la Redux Toolkit**
   - Înlocuiți Context cu Redux
   - Comparați complexitatea

8. **Adăugați autentificare**
   - Creați un sistem simplu de login
   - Separați favoritele per utilizator

9. **Implementați infinite scroll**
   - Încărcați mai multe filme la scroll

---

## 🔧 Depanare

### Problema: "Lista de filme e goală"

**Cauze posibile:**
1. Cheia API lipsește sau e greșită
2. Fișierul `.env` nu e creat corect

**Soluție:**
```bash
# Verificați că .env există
ls -la .env

# Verificați conținutul (fără ghilimele!)
cat .env
# Ar trebui să arate: VITE_TMDB_API_KEY=abc123...

# Reporniți serverul după modificare!
npm run dev
```

### Problema: "Port 4000 ocupat"

**Soluție:**
```bash
# Opțiunea 1: Opriți procesul care folosește portul
lsof -i :4000
kill -9 <PID>

# Opțiunea 2: Schimbați portul în vite.config.js
server: {
  port: 4001  // Alt port
}
```

### Problema: "Favoritele dispar la refresh"

**Verificați:**
1. Deschideți DevTools → Application → Local Storage
2. Căutați cheia "favorites"
3. Dacă lipsește, verificați `MovieContext.jsx`

### Problema: "Module not found"

**Soluție:**
```bash
# Ștergeți node_modules și reinstalați
rm -rf node_modules
npm install
```

---

## 📚 Resurse Suplimentare

### Documentație Oficială

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/)
- [TMDB API Docs](https://developers.themoviedb.org/3)

### Tutoriale Recomandate

- [React Hooks Explained](https://react.dev/reference/react)
- [Context API Guide](https://react.dev/learn/passing-data-deeply-with-context)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)

---

<div align="center">

## 📊 Rezumat Kit

| Caracteristică | Valoare |
|----------------|---------|
| **Fișier** | `S11clim_NoRRnoSQL.zip` |
| **Framework** | React 18 |
| **State Management** | Context API |
| **Routing** | React Router v6 |
| **Bundler** | Vite |
| **Persistență** | LocalStorage |
| **Port** | 4000 |
| **API Extern** | TMDB |

---

**📖 Material didactic pentru Seminarul S11**

*Tehnologii Web | ASE-CSIE*

</div>
