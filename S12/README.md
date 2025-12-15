# 🔄 S12 — React Router, useReducer și Redux

> **Seminar S12** | Curs de Tehnologii Web | ASE-CSIE  
> De la rutare SPA la state management global cu Redux

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S12-Teorie](#s12-teorie)
  - [S12-Laborator](#s12-laborator)
  - [S12-Appendix](#s12-appendix)
- [Cei 4 pași de învățare](#-cei-4-pași-de-învățare)
- [Arhitectura Redux](#-arhitectura-redux)
- [Notes API](#-notes-api)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Concepte cheie](#-concepte-cheie)
- [Exerciții propuse](#-exerciții-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S12 introduce **state management avansat** în React, de la rutarea în aplicații SPA până la gestionarea stării globale cu **Redux**. Construim progresiv de la concepte simple (`useReducer`) la pattern-uri complete de management al stării cu acțiuni asincrone.

### Ce vei învăța:

| Pas | Concept | Tehnologii |
|-----|---------|------------|
| **Step 1** | React Router | `react-router-dom` v6, `<Routes>`, `<Link>` |
| **Step 2** | Hook-ul useReducer | Reducer local, dispatch, immutability |
| **Step 3** | Redux (sincron) | Store global, actions, reducers |
| **Step 4** | Redux (async) | `redux-promise-middleware`, fetch API |

### Schema de porturi

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARHITECTURĂ DASHBOARD                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                          │
│   │   Dashboard     │  ← Hub central pentru navigare           │
│   │   PORT 3000     │     și documentație HTML                 │
│   └────────┬────────┘                                          │
│            │                                                    │
│   ┌────────┼────────┬────────────┬────────────┐                │
│   ▼        ▼        ▼            ▼            ▼                │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌─────────────┐           │
│ │Step 1│ │Step 2│ │Step 3│ │Step 4│ │  Notes API  │           │
│ │Router│ │Reducer│ │Redux │ │Async │ │  Express    │           │
│ │ 3001 │ │ 3002 │ │ 3003 │ │ 3004 │ │    8080     │           │
│ └──────┘ └──────┘ └──────┘ └──────┘ └─────────────┘           │
│                                            ▲                    │
│                                            │                    │
│                              Step 4 apelează API               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Structura repository-ului

```
S12/
├── 📂 S12-Teorie/                                           # Materiale teoretice
│   └── 📄 A (S12-teorie) React Router, useReducer și Redux Toolkit.docx
│
├── 📂 S12-Laborator/                                        # Kit simplificat
│   └── 📦 S12step1-4.zip                                        # 4 proiecte CRA
│       ├── S12v1nextlab/  →  React Router (CRA)
│       ├── S12v2nextlab/  →  useReducer (CRA)
│       ├── S12v3nextlab/  →  Redux sync (CRA)
│       └── S12v4nextlab/  →  Redux async (CRA) + server
│
└── 📂 S12-Appendix/                                         # ⭐ Kit complet cu Dashboard
    ├── 📄 README.md                                             # Ghid dashboard
    ├── 📦 S12clim.zip                                           # Arhivă kit complet
    └── 📂 S12clim/                                              # Kit dezarhivat
        ├── 📄 install_all.bat                                   # Instalare automată
        ├── 📄 run_dashboard.bat                                 # Pornire toate serverele
        │
        ├── 📂 dashboard/                                        # Server documentație
        │   ├── server.js                                        # Express (port 3000)
        │   └── public/
        │       ├── index.html                                   # Pagina principală
        │       ├── step1.html → step4.html                      # Ghiduri detaliate
        │       ├── postman.html                                 # Ghid testare API
        │       ├── api.html                                     # Quick links API
        │       └── style.css                                    # Stiluri
        │
        ├── 📂 steps/                                            # Aplicațiile React
        │   ├── step1_router/                                    # React Router (Vite)
        │   ├── step2_useReducer/                                # useReducer (Vite)
        │   ├── step3_redux/                                     # Redux sync (Vite)
        │   ├── step4_redux_async/                               # Redux async (Vite)
        │   └── tool_postman_lite/                               # Mini-Postman React
        │
        ├── 📂 servers/
        │   └── notes-api/                                       # Express API (port 8080)
        │       ├── index.js
        │       └── package.json
        │
        └── 📂 resources/
            ├── slides/                                          # Teorie DOCX
            └── subtitles/                                       # Subtitrări HTML
                └── S12v1.html → S12v4.html
```

---

## 📚 Conținutul detaliat

### S12-Teorie

| Document | Conținut |
|----------|----------|
| **React Router, useReducer și Redux Toolkit** | Rutare SPA, History API, pattern Reducer, Redux store, acțiuni async |

**Subiecte acoperite:**
- Client-side routing vs server-side routing
- Hook-ul `useReducer` — alternativă la `useState` pentru stări complexe
- Redux: Store, Actions, Reducers, Dispatch
- Middleware pentru acțiuni asincrone
- Redux Toolkit (abordare modernă)

---

### S12-Laborator

Kit simplificat cu 4 proiecte **Create React App** (mai vechi, pentru compatibilitate):

| Folder | Descriere |
|--------|-----------|
| `S12v1nextlab/` | React Router cu CRA |
| `S12v2nextlab/` | useReducer cu CRA |
| `S12v3nextlab/` | Redux sync cu CRA |
| `S12v4nextlab/` | Redux async cu CRA + server |

---

### S12-Appendix

Kit complet cu **Dashboard central** și proiecte **Vite** (modern, rapid):

| Componentă | Port | Descriere |
|------------|------|-----------|
| Dashboard | 3000 | Hub navigare + documentație HTML |
| Step 1 | 3001 | React Router |
| Step 2 | 3002 | useReducer |
| Step 3 | 3003 | Redux sync |
| Step 4 | 3004 | Redux async |
| Notes API | 8080 | Express REST API |

---

## 🎯 Cei 4 pași de învățare

### Vizualizare progresie

```
Step 1                Step 2                Step 3                Step 4
React Router          useReducer            Redux (sync)          Redux (async)
─────────────────     ─────────────────     ─────────────────     ─────────────────
                      
┌─────────────┐       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   /home     │       │  dispatch   │       │   Store     │       │   Store     │
│   /about    │       │     ↓       │       │     ↓       │       │     ↓       │
│   /tasks    │       │  reducer    │       │  dispatch   │       │  dispatch   │
│   /tasks/:id│       │     ↓       │       │     ↓       │       │     ↓       │
│   *404*     │       │   state     │       │  reducer    │       │  middleware │
└─────────────┘       └─────────────┘       └─────────────┘       │     ↓       │
                                                                   │  reducer    │
URL = contract        Stare locală          Stare globală         │     ↓       │
între user și UI      complexă              pentru întreaga app   │   fetch()   │
                                                                   └─────────────┘
```

---

### 📘 Step 1 — React Router (Rutare SPA)

**Obiectiv:** Navigare între "pagini" fără refresh, URL ca interfață publică.

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Tasks from './components/Tasks';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/:id" element={<Tasks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Concepte cheie:**
- `<BrowserRouter>` — furnizează contextul de navigare (History API)
- `<Routes>` — alege ruta cea mai specifică
- `<Route path="..." element={...} />` — mapare URL → componentă
- `<Link to="...">` — navigare fără reload (NU `<a href>`)
- `path="*"` — catch-all pentru 404
- `useParams()` — accesare parametri din URL (`:id`)

**Port:** 3001

---

### 📘 Step 2 — useReducer (State local complex)

**Obiectiv:** Gestionarea stării locale cu pattern Reducer (pregătire pentru Redux).

```jsx
// src/components/Tasks.jsx
import { useReducer } from 'react';

const INITIAL_STATE = {
  count: 0,
  history: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, 'increment']
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, 'decrement']
      };
    case 'reset':
      return { ...INITIAL_STATE, history: [...state.history, 'reset'] };
    default:
      return state;
  }
}

export default function Tasks() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

**Flux de date:**

```
┌──────────────────────────────────────────────────────────────┐
│                     useReducer FLOW                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   User Click  →  dispatch(action)  →  reducer(state, action) │
│       ▲                                        │             │
│       │                                        ▼             │
│       └────────────  Component re-render  ←  nextState       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Concepte cheie:**
- Reducer = funcție pură: `(state, action) => newState`
- **Immutability**: nu modificăm state direct, returnăm obiecte noi
- `dispatch({ type: 'ACTION_TYPE', payload: data })`
- Pattern util pentru formulare, wizards, stări cu multiple câmpuri

**Port:** 3002

---

### 📘 Step 3 — Redux (State global sincron)

**Obiectiv:** Store global partajat între toate componentele.

```javascript
// src/stores/store.js
import { createStore } from 'redux';
import reducer from '../reducers';

const store = createStore(reducer);
export default store;
```

```javascript
// src/reducers/list-reducer.js
const INITIAL_STATE = {
  notes: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };

    case 'DELETE_NOTE':
      return { ...state, notes: state.notes.filter(n => n.id !== action.payload) };

    default:
      return state;
  }
}
```

```javascript
// src/actions/actions.js
export function addNote(note) {
  return { type: 'ADD_NOTE', payload: note };
}

export function deleteNote(id) {
  return { type: 'DELETE_NOTE', payload: id };
}
```

```jsx
// src/index.jsx
import { Provider } from 'react-redux';
import store from './stores/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

```jsx
// Componentă conectată
import { useSelector, useDispatch } from 'react-redux';
import { deleteNote } from '../actions/actions';

function NoteList() {
  const notes = useSelector(state => state.list.notes);
  const dispatch = useDispatch();

  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          {note.content}
          <button onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

**Port:** 3003

---

### 📘 Step 4 — Redux Async (cu API)

**Obiectiv:** Acțiuni asincrone care comunică cu un server.

```javascript
// src/stores/store.js
import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import promise from 'redux-promise-middleware';

const store = createStore(reducer, applyMiddleware(promise));
export default store;
```

```javascript
// src/actions/actions.js
const SERVER = 'http://127.0.0.1:8080';

export function getNotes() {
  return {
    type: 'GET_NOTES',
    payload: fetch(`${SERVER}/notes`).then(r => r.json())
  };
}

export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    payload: fetch(`${SERVER}/notes/${id}`, { method: 'DELETE' }).then(r => r.json())
  };
}
```

```javascript
// src/reducers/list-reducer.js
const INITIAL_STATE = {
  notes: [],
  error: null,
  fetching: false,
  fetched: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    // PENDING - cererea a pornit
    case 'GET_NOTES_PENDING':
    case 'DELETE_NOTE_PENDING':
      return { ...state, error: null, fetching: true, fetched: false };

    // FULFILLED - cererea a reușit
    case 'GET_NOTES_FULFILLED':
    case 'DELETE_NOTE_FULFILLED':
      return { ...state, notes: action.payload, error: null, fetching: false, fetched: true };

    // REJECTED - cererea a eșuat
    case 'GET_NOTES_REJECTED':
    case 'DELETE_NOTE_REJECTED':
      return { ...state, error: action.payload, fetching: false, fetched: false };

    default:
      return state;
  }
}
```

**Ciclul acțiunilor async:**

```
┌─────────────────────────────────────────────────────────────────┐
│              REDUX ASYNC (redux-promise-middleware)             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   dispatch(action)                                              │
│        │                                                        │
│        ▼                                                        │
│   ┌─────────────────────────────────────────┐                  │
│   │     redux-promise-middleware            │                  │
│   │                                         │                  │
│   │   action.payload este Promise?          │                  │
│   │          │                              │                  │
│   │     ┌────┴────┐                         │                  │
│   │     ▼         ▼                         │                  │
│   │   DA         NU                         │                  │
│   │    │          │                         │                  │
│   │    │     dispatch normal                │                  │
│   │    │                                    │                  │
│   │    ▼                                    │                  │
│   │   1. dispatch TYPE_PENDING              │                  │
│   │   2. await Promise                      │                  │
│   │   3. dispatch TYPE_FULFILLED sau        │                  │
│   │              TYPE_REJECTED              │                  │
│   └─────────────────────────────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Port:** 3004 (+ API pe 8080)

---

## 🏗️ Arhitectura Redux

```
┌─────────────────────────────────────────────────────────────────┐
│                       REDUX ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                        ┌─────────────┐                         │
│                        │    VIEW     │                         │
│                        │ (React UI) │                         │
│                        └──────┬──────┘                         │
│                               │                                 │
│                          user event                             │
│                               │                                 │
│                               ▼                                 │
│   ┌───────────────────────────────────────────────────────┐    │
│   │                      ACTION                            │    │
│   │           { type: 'ADD_NOTE', payload: {...} }         │    │
│   └───────────────────────────┬───────────────────────────┘    │
│                               │                                 │
│                          dispatch()                             │
│                               │                                 │
│                               ▼                                 │
│   ┌───────────────────────────────────────────────────────┐    │
│   │                    MIDDLEWARE                          │    │
│   │          (redux-promise, redux-thunk, etc.)            │    │
│   └───────────────────────────┬───────────────────────────┘    │
│                               │                                 │
│                               ▼                                 │
│   ┌───────────────────────────────────────────────────────┐    │
│   │                      REDUCER                           │    │
│   │         (state, action) => newState                    │    │
│   │                                                        │    │
│   │   • funcție pură (fără side-effects)                   │    │
│   │   • immutability obligatorie                           │    │
│   │   • switch pe action.type                              │    │
│   └───────────────────────────┬───────────────────────────┘    │
│                               │                                 │
│                               ▼                                 │
│   ┌───────────────────────────────────────────────────────┐    │
│   │                       STORE                            │    │
│   │                                                        │    │
│   │   • single source of truth                             │    │
│   │   • starea întregii aplicații                          │    │
│   │   • notifică VIEW-urile la schimbări                   │    │
│   └───────────────────────────┬───────────────────────────┘    │
│                               │                                 │
│                     useSelector() / connect()                   │
│                               │                                 │
│                               ▼                                 │
│                        ┌─────────────┐                         │
│                        │    VIEW     │  ← re-render            │
│                        └─────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔌 Notes API

API-ul Express pentru Step 4 oferă CRUD complet pentru notițe:

### Endpoint-uri

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| GET | `/health` | Status + număr notițe |
| GET | `/notes` | Lista toate notițele |
| POST | `/notes` | Creează notiță (`{ content }`) |
| PUT | `/notes/:id` | Actualizează notiță |
| DELETE | `/notes/:id` | Șterge notiță |

### Date inițiale

```javascript
let notes = [
  { id: 1, content: 'Redux: store, actions, reducers' },
  { id: 2, content: 'Async actions: middleware, pending/fulfilled/rejected' },
  { id: 3, content: 'Immutability: never mutate state directly' }
];
```

### Testare cu cURL

```bash
# Health check
curl http://localhost:8080/health

# Lista notițe
curl http://localhost:8080/notes

# Adaugă notiță
curl -X POST http://localhost:8080/notes \
  -H "Content-Type: application/json" \
  -d '{"content": "New note"}'

# Șterge notiță
curl -X DELETE http://localhost:8080/notes/1
```

**Port:** 8080

---

## 📈 Ghid de parcurgere

### Pentru începători (3-4 ore)

```
1. Dezarhivează S12clim.zip
       ↓
2. Rulează install_all.bat
       ↓
3. Rulează run_dashboard.bat
       ↓
4. Deschide http://localhost:3000
       ↓
5. Pentru fiecare pas (1-4):
   • Citește ghidul HTML (step1.html ... step4.html)
   • Testează aplicația în browser
   • Studiază codul în VS Code
       ↓
6. La Step 4, testează API-ul cu Postman
```

### Pentru avansați (1-2 ore)

```
1. Sari direct la step4_redux_async
       ↓
2. Analizează:
   • store.js (applyMiddleware)
   • actions.js (Promise în payload)
   • list-reducer.js (PENDING/FULFILLED/REJECTED)
       ↓
3. Modifică API-ul și observă comportamentul în UI
       ↓
4. Implementează PUT în acțiuni async
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune | Observații |
|------------|----------|------------|
| Node.js | 18+ | LTS recomandat |
| npm | 9+ | Package manager |
| React | 18.2+ | Biblioteca UI |
| react-router-dom | 6.x | Rutare SPA |
| redux | 4.2+ | State management |
| react-redux | 8.1+ | Conectare React-Redux |
| redux-promise-middleware | 6.2+ | Acțiuni async |
| Vite | 5.0+ | Build tool |

---

## 🚀 Rulare rapidă

### Varianta 1: Dashboard complet (recomandat)

```powershell
# Navigare la kit
cd S12-Appendix\S12clim

# Instalare toate dependențele
.\install_all.bat

# Pornire toate serverele
.\run_dashboard.bat

# Sau manual:
# Terminal 1: cd dashboard && npm start
# Terminal 2: cd steps\step1_router && npm start
# Terminal 3: cd steps\step2_useReducer && npm start
# Terminal 4: cd steps\step3_redux && npm start
# Terminal 5: cd steps\step4_redux_async && npm start
# Terminal 6: cd servers\notes-api && npm start
```

**Accesare:**
- Dashboard: http://localhost:3000
- Step 1: http://localhost:3001
- Step 2: http://localhost:3002
- Step 3: http://localhost:3003
- Step 4: http://localhost:3004
- Notes API: http://localhost:8080

### Varianta 2: Un singur pas

```bash
cd S12-Appendix/S12clim/steps/step3_redux
npm install
npm start
# → http://localhost:3003
```

---

## 🧠 Concepte cheie

### useState vs useReducer

| Aspect | useState | useReducer |
|--------|----------|------------|
| Complexitate stare | Simplă (1-2 valori) | Complexă (multe câmpuri) |
| Logica de update | În componentă | În reducer (separată) |
| Testabilitate | Mai greu de testat | Reducer = funcție pură, ușor de testat |
| Pattern | Ad-hoc | Predictibil (action types) |

### useReducer vs Redux

| Aspect | useReducer | Redux |
|--------|------------|-------|
| Scope | Local (componentă) | Global (toată app-ul) |
| Partajare | Prin props/context | Store global |
| Middleware | Nu | Da (async, logging, etc.) |
| DevTools | Nu | Da (Redux DevTools) |
| Boilerplate | Minim | Mai mult (dar Redux Toolkit simplifică) |

### Middleware Redux

```javascript
// Middleware = funcție care interceptează acțiunile
const loggerMiddleware = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};

// Aplicare
const store = createStore(reducer, applyMiddleware(loggerMiddleware, promise));
```

### Immutability în reduceri

```javascript
// ❌ GREȘIT - mutare directă
state.notes.push(newNote);
return state;

// ✅ CORECT - obiect nou
return {
  ...state,
  notes: [...state.notes, newNote]
};

// ❌ GREȘIT - splice modifică array-ul original
state.notes.splice(index, 1);

// ✅ CORECT - filter creează array nou
return {
  ...state,
  notes: state.notes.filter(n => n.id !== id)
};
```

---

## 📝 Exerciții propuse

### Nivel 1 — Înțelegere

1. **Adaugă o rută nouă** `/settings` în Step 1 cu o componentă Settings.

2. **Adaugă o nouă acțiune** `DOUBLE` în Step 2 care dublează count-ul.

3. **Testează Notes API** cu Postman — creează, citește, șterge notițe.

### Nivel 2 — Aplicare

4. **Adaugă `UPDATE_NOTE`** în Step 3 care modifică conținutul unei notițe existente.

5. **Implementează loading indicator** în Step 4:
   - Afișează "Loading..." când `fetching: true`
   - Afișează eroarea când `error !== null`

6. **Adaugă POST în Step 4** — formular care creează notițe noi via API.

### Nivel 3 — Sinteză

7. **Migrează la Redux Toolkit** — rescrie Step 4 folosind `createSlice` și `createAsyncThunk`.

8. **Adaugă optimistic updates** — actualizează UI-ul imediat, apoi sincronizează cu serverul.

9. **Implementează undo/redo** folosind pattern-ul cu history (similar cu Step 2).

---

## 📚 Referințe

### Documentație oficială
- [React Router v6](https://reactrouter.com/en/main)
- [Redux Documentation](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [react-redux Hooks](https://react-redux.js.org/api/hooks)

### Tutoriale
- [Redux Fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
- [useReducer vs Redux](https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/)

### Instrumente
- [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
- [Postman](https://www.postman.com/)

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

---

<div align="center">

**🔄 Material didactic pentru Seminarul S12**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția conceptelor:**

```
Step 1           Step 2           Step 3           Step 4
────────         ────────         ────────         ────────
  URL     →     dispatch   →     Store      →     fetch()
   ↓              ↓               ↓                ↓
 Route          reducer        dispatch      middleware
   ↓              ↓               ↓                ↓
Component       state          reducer       PENDING
                                  ↓           FULFILLED
                               newState       REJECTED
```

---

**De la local la global:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   useState        →    useReducer    →       Redux          │
│                                                             │
│   Stare simplă         Stare complexă      Stare globală   │
│   într-o componentă    într-o componentă   în toată app-ul │
│                                                             │
│   const [x, setX]      const [state,       <Provider        │
│     = useState(0)        dispatch]           store={store}> │
│                          = useReducer(...)                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

</div>
