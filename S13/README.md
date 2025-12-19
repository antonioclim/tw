# 📊 S13 — Componente externe în React (PrimeReact DataTable + Grafice)

> **Seminar S13** | Curs de Tehnologii Web | ASE-CSIE  
> De la tabele simple la interfețe de interogare cu filtrare, paginare, sortare și vizualizări

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S13-Teorie](#s13-teorie)
  - [S13-Laborator](#s13-laborator)
  - [S13-Appendix](#s13-appendix)
- [Cei 4 pași de învățare](#-cei-4-pași-de-învățare)
- [Modelul de date](#-modelul-de-date)
- [Arhitectura sistemului](#-arhitectura-sistemului)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Testare cu Postman](#-testare-cu-postman)
- [Concepte cheie](#-concepte-cheie)
- [Exerciții propuse](#-exerciții-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S13 introduce **componente externe** în aplicații React, demonstrând cum bibliotecile UI profesionale (precum **PrimeReact**) pot transforma un tabel simplu într-un **instrument de interogare** complet. Construim progresiv de la afișare simplă până la vizualizări grafice.

### Ce vei învăța:

| Pas | Concept | Componente |
|-----|---------|------------|
| **Step 1** | DataTable + Dialog + Căutare | `DataTable`, `Column`, `Dialog`, `Button`, `InputText` |
| **Step 2** | Filtrare pe coloană + Paginare | Filtre server-side, `paginator`, `totalRecords` |
| **Step 3** | Sortare (inclusiv numerică) | `sortField`, `sortOrder`, coloană `pages` |
| **Step 4** | Grafice în Dialog | `PieChart`, `BarChart`, `Histogram` (Google Charts) |

### Triada clasică a interfețelor orientate pe date

```
┌─────────────────────────────────────────────────────────────────┐
│              INSTRUMENTE DE INTEROGARE (DataTable)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐      │
│   │   FILTRARE    │  │   PAGINARE    │  │   SORTARE     │      │
│   │               │  │               │  │               │      │
│   │  Selectare    │  │   Fereastră   │  │   Ordonare    │      │
│   │  semantică    │  │   ordinală    │  │   după        │      │
│   │  (CONTAINS)   │  │  (first,rows) │  │   criteriu    │      │
│   └───────┬───────┘  └───────┬───────┘  └───────┬───────┘      │
│           │                  │                  │               │
│           └──────────────────┼──────────────────┘               │
│                              │                                  │
│                              ▼                                  │
│                   ┌─────────────────────┐                      │
│                   │   CONTRACT API       │                      │
│                   │                      │                      │
│                   │  ?title=...          │                      │
│                   │  &content=...        │                      │
│                   │  &first=0&rows=5     │                      │
│                   │  &sortField=pages    │                      │
│                   │  &sortOrder=-1       │                      │
│                   └─────────────────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Schema de porturi

```
┌─────────────────────────────────────────────────────────────────┐
│                    ARHITECTURĂ DASHBOARD                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                          │
│   │   Dashboard     │  ← Hub central + materiale didactice     │
│   │   PORT 3000     │     (infografice, PDF, HTML interactiv)  │
│   └────────┬────────┘                                          │
│            │                                                    │
│   ┌────────┼────────┬────────────┬────────────┐                │
│   ▼        ▼        ▼            ▼            │                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ │   Step 1     │ │   Step 2     │ │   Step 3     │ │   Step 4     │
│ │ DataTable    │ │ Filtrare +   │ │ Sortare      │ │ Grafice      │
│ │ + Dialog     │ │ Paginare     │ │ numerică     │ │ (Charts)     │
│ │              │ │              │ │              │ │              │
│ │ Client: 3001 │ │ Client: 3002 │ │ Client: 3003 │ │ Client: 3004 │
│ │ Server: 8081 │ │ Server: 8082 │ │ Server: 8083 │ │ Server: 8084 │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Structura repository-ului

```
S13/
├── 📂 S13-Teorie/                                           # Materiale teoretice
│   └── 📄 C S13RO (teorie) React - DataGrid și grafice.docx     # Documentație completă
│
├── 📂 S13-Laborator/                                        # Kit simplificat
│   └── 📦 S13nextlab.zip                                        # 4 proiecte separate
│       ├── S13v1/  →  DataTable + Dialog + căutare
│       ├── S13v2/  →  Filtrare pe coloană + paginare
│       ├── S13v3/  →  Sortare (numerică pentru pages)
│       └── S13v4/  →  Grafice în Dialog
│
└── 📂 S13-Appendix/                                         # ⭐ Kit complet cu Dashboard
    ├── 📄 A (S13-seminar) – Ghid practic Redux și PrimeReact.docx
    └── 📦 S13clim.zip                                           # Suite integrată
        ├── 📄 package.json                                      # Scripturi globale
        ├── 📄 README.md                                         # Ghid instalare
        └── 📂 apps/
            ├── 📂 dashboard/                                    # Hub central (port 3000)
            │   ├── src/pages/
            │   │   ├── Home.jsx                                 # Pagina principală
            │   │   ├── StepPage.jsx                             # Detalii pas
            │   │   ├── Materiale.jsx                            # Resurse didactice
            │   │   └── ApiTester.jsx                            # Mini-Postman
            │   └── public/materiale/
            │       ├── infografice/                             # PNG pentru fiecare pas
            │       │   ├── S13intro.png
            │       │   ├── S13pas1.png → S13pas4.png
            │       ├── interactiv/                              # HTML interactiv
            │       │   ├── S13intro.html
            │       │   └── S13pas1.html → S13pas4.html
            │       ├── srt/                                     # PDF-uri transcrieri
            │       └── postman/
            │           └── S13-seminar13.postman_collection.json
            │
            ├── 📂 step1/                                        # Pas 1: DataTable + Dialog
            │   ├── src/
            │   │   ├── components/BookList.jsx                  # Componentă principală
            │   │   ├── actions/index.js                         # Acțiuni Redux (thunk)
            │   │   ├── reducers/book-reducer.js                 # Reducer
            │   │   └── stores/store.js                          # Store Redux
            │   └── server/
            │       └── server.js                                # API Express (port 8081)
            │
            ├── 📂 step2/                                        # Pas 2: Filtrare + Paginare
            │   ├── src/components/BookList.jsx
            │   └── server/index.js                              # API cu filtrare/paginare
            │
            ├── 📂 step3/                                        # Pas 3: Sortare
            │   ├── src/components/BookList.jsx
            │   └── server/index.js                              # API cu sortare
            │
            └── 📂 step4/                                        # Pas 4: Grafice
                ├── src/
                │   ├── components/BookList.jsx                  # + Chart integration
                │   └── actions/index.js                         # + getStats()
                └── server/index.js                              # + /books/stats endpoint
```

---

## 📚 Conținutul detaliat

### S13-Teorie

| Document | Conținut |
|----------|----------|
| **React - DataGrid și grafice** | Componente externe, PrimeReact, pattern-uri de interogare, vizualizări |

**Subiecte acoperite:**
- Componente externe vs componente proprii
- PrimeReact: DataTable, Column, Dialog, Button
- Filtrare, paginare, sortare (server-side vs client-side)
- Integrarea bibliotecilor de vizualizare (Google Charts)
- Pattern-uri de comunicare client-server

---

### S13-Laborator

Kit simplificat cu 4 proiecte separate (CRA):

| Folder | Concept | Port Client | Port Server |
|--------|---------|-------------|-------------|
| `S13v1/` | DataTable + Dialog + căutare | 3000 | 8080 |
| `S13v2/` | Filtrare pe coloană + paginare | 3002 | 8082 |
| `S13v3/` | Sortare (numerică) | 3003 | 8083 |
| `S13v4/` | Grafice în Dialog | 3004 | 8084 |

---

### S13-Appendix

Suite integrată cu **Dashboard central** și proiecte **Vite**:

| Componentă | Descriere |
|------------|-----------|
| **Dashboard** | Hub navigare + materiale didactice (infografice, PDF, HTML) |
| **ApiTester** | Mini-Postman integrat pentru testare rapidă |
| **Infografice** | PNG-uri rezumative pentru fiecare pas |
| **Postman Collection** | Colecție completă pentru toate endpoint-urile |

---

## 🎯 Cei 4 pași de învățare

### Vizualizare progresie

```
Step 1              Step 2              Step 3              Step 4
DataTable+Dialog    +Filtrare+Paginare  +Sortare            +Grafice
────────────────    ────────────────    ────────────────    ────────────────

┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Afișare    │    │   Filtrare   │    │   Sortare    │    │  Vizualizare │
│   tabelară   │    │   server-    │    │   numerică   │    │   grafică    │
│              │ →  │   side       │ →  │   vs         │ →  │              │
│   CRUD       │    │              │    │   lexicală   │    │  Pie Chart   │
│   basic      │    │   Paginare   │    │              │    │  Bar Chart   │
│              │    │   parametrică│    │   Tie-break  │    │  Histogram   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

---

### 📘 Step 1 — DataTable cu Dialog și Căutare

**Obiectiv:** Afișare tabelară + CRUD prin dialog modal.

```jsx
// Componente PrimeReact utilizate
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
```

**Funcționalități:**
- **Afișare** colecție de cărți într-un tabel
- **Adăugare** carte prin Dialog
- **Editare** carte (reutilizare Dialog)
- **Căutare** după titlu (filtrare client-side, declanșată prin buton)

**Flux Redux:**

```
┌────────────────────────────────────────────────────────────────┐
│                      REDUX FLOW (Step 1)                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│   useEffect()  →  dispatch(getBooks())  →  redux-thunk        │
│                                                │               │
│                                                ▼               │
│                                          fetch('/books')       │
│                                                │               │
│                                                ▼               │
│   UI  ←  useSelector(bookList)  ←  reducer  ←  response      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Port client:** 3001 | **Port server:** 8081

---

### 📘 Step 2 — Filtrare pe coloană + Paginare

**Obiectiv:** Transformarea DataTable într-un instrument de interogare.

```jsx
// Stare pentru filtrare/paginare
const [filters, setFilters] = useState({
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  content: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const [first, setFirst] = useState(0);
const [rows, setRows] = useState(5);
```

```jsx
// DataTable cu paginare lazy (server-side)
<DataTable
  value={books}
  lazy
  paginator
  first={first}
  rows={rows}
  totalRecords={totalRecords}
  onPage={handlePage}
  rowsPerPageOptions={[3, 5, 10, 20]}
>
  <Column
    field="title"
    filter
    filterPlaceholder="Filtrare..."
    onFilterApplyClick={handleFilterApply}
  />
</DataTable>
```

**Răspuns server:**

```javascript
// Server returnează DOUĂ artefacte
{
  records: [...],      // Fereastra curentă (paginată)
  count: 42,           // Total după filtrare (pentru paginator)
  first: 0,
  rows: 5
}
```

**Concepte cheie:**
- **Filtrare controlată** — declanșată explicit (buton „Aplică"), nu la fiecare tastă
- **Paginare ca fereastră** — `first` și `rows` descriu o selecție ordinală
- **Separarea responsabilităților** — clientul formulează, serverul execută

**Port client:** 3002 | **Port server:** 8082

---

### 📘 Step 3 — Sortare (inclusiv numerică)

**Obiectiv:** Ordonare corectă pentru câmpuri numerice vs textuale.

```jsx
// Stare pentru sortare
const [sortField, setSortField] = useState('');
const [sortOrder, setSortOrder] = useState(1);  // 1 = ASC, -1 = DESC

// Handler sortare
const handleSort = (evt) => {
  setSortField(evt.sortField);
  setSortOrder(evt.sortOrder);
  setFirst(0);  // Reset la prima pagină
};
```

```jsx
// Coloană numerică (pages)
<Column
  header="Număr de pagini"
  field="pages"
  sortable
/>
```

**Sortare server-side:**

```javascript
// server/index.js
function applySorting(list, sortField, sortOrder) {
  if (sortField === 'id' || sortField === 'pages') {
    // Sortare NUMERICĂ
    return [...list].sort((a, b) => {
      const delta = Number(a[sortField]) - Number(b[sortField]);
      return delta * sortOrder;
    });
  } else {
    // Sortare LEXICALĂ (text)
    const collator = new Intl.Collator('ro', { sensitivity: 'base' });
    return [...list].sort((a, b) => {
      return collator.compare(a[sortField], b[sortField]) * sortOrder;
    });
  }
}
```

**De ce contează:**

| Sortare lexicală | Sortare numerică |
|------------------|------------------|
| "100" < "20" < "3" | 3 < 20 < 100 |
| ❌ Incorect pentru numere | ✅ Corect |

**Port client:** 3003 | **Port server:** 8083

---

### 📘 Step 4 — Grafice în Dialog

**Obiectiv:** Transformarea datelor tabulare în vizualizări.

```jsx
import { Chart } from 'react-google-charts';

// Trei tipuri de grafice
<Chart chartType="PieChart" data={pieData} options={pieOptions} />
<Chart chartType="BarChart" data={barData} options={barOptions} />
<Chart chartType="Histogram" data={histogramData} options={histogramOptions} />
```

**Endpoint dedicat pentru statistici:**

```javascript
// GET /books/stats?title=...&content=...
// Returnează statistici pentru ÎNTREGUL set filtrat (nu doar pagina curentă)

{
  count: 7,
  ranges: [
    { label: '≤ 200 pagini', value: 3 },
    { label: '201–400 pagini', value: 2 },
    { label: '401–800 pagini', value: 2 },
    { label: '> 800 pagini', value: 0 }
  ],
  topByPages: [
    { title: 'Vizualizare de date', pages: 510 },
    { title: 'Algoritmi', pages: 420 },
    // ... top 10
  ],
  pagesList: [144, 196, 220, 280, 360, 420, 510],
  summary: {
    minPages: 144,
    medianPages: 280,
    meanPages: 304.3,
    maxPages: 510
  }
}
```

**Principiu important:**

```
┌─────────────────────────────────────────────────────────────────┐
│   ⚠️ Graficele trebuie construite din ÎNTREGUL set filtrat,    │
│      nu doar din pagina curentă!                                │
│                                                                 │
│   Pagina curentă (5 înregistrări) ≠ Setul de interes (42)      │
│                                                                 │
│   De aceea avem /books/stats separat de /books (paginat)       │
└─────────────────────────────────────────────────────────────────┘
```

**Port client:** 3004 | **Port server:** 8084

---

## 💾 Modelul de date

### Book (entitatea principală)

```javascript
{
  id: 1,
  title: 'React',
  content: 'Componente, proprietăți, stare, efecte',
  pages: 280
}
```

### Seed data (server)

```javascript
let books = [
  { id: 1, title: 'React', content: 'Componente, proprietăți, stare, efecte', pages: 280 },
  { id: 2, title: 'Redux', content: 'Store, acțiuni, reductoare, middleware', pages: 196 },
  { id: 3, title: 'PrimeReact', content: 'DataTable, Dialog, filtrare, paginare, sortare', pages: 144 },
  { id: 4, title: 'Algoritmi', content: 'Divide et impera, programare dinamică, grafuri', pages: 420 },
  { id: 5, title: 'Baze de date', content: 'Model relațional, interogări, normalizare', pages: 360 },
  { id: 6, title: 'Metodologia cercetării', content: 'Ipoteze, design, validitate, replicabilitate', pages: 220 },
  { id: 7, title: 'Vizualizare de date', content: 'Percepție, codare, integritate a reprezentării', pages: 510 }
];
```

---

## 🏗️ Arhitectura sistemului

```
┌─────────────────────────────────────────────────────────────────┐
│                       CLIENT (React)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                    COMPONENTE UI                         │  │
│   │                                                          │  │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │  │
│   │   │  DataTable  │  │   Dialog    │  │   Chart     │     │  │
│   │   │  (PrimeReact)│  │  (PrimeReact)│  │(GoogleCharts)│    │  │
│   │   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │  │
│   │          │                │                │             │  │
│   │          └────────────────┼────────────────┘             │  │
│   │                           │                              │  │
│   │                    useSelector()                         │  │
│   │                           │                              │  │
│   └───────────────────────────┼──────────────────────────────┘  │
│                               │                                  │
│   ┌───────────────────────────┼──────────────────────────────┐  │
│   │                     REDUX STORE                           │  │
│   │                           │                               │  │
│   │   ┌───────────────────────┴───────────────────────────┐  │  │
│   │   │                    REDUCER                         │  │  │
│   │   │                                                    │  │  │
│   │   │   bookList: []     fetching: false                 │  │  │
│   │   │   count: 0         error: null                     │  │  │
│   │   │   stats: null      statsLoading: false             │  │  │
│   │   └────────────────────────┬──────────────────────────┘  │  │
│   │                            │                              │  │
│   │                       dispatch()                          │  │
│   │                            │                              │  │
│   └────────────────────────────┼──────────────────────────────┘  │
│                                │                                  │
│   ┌────────────────────────────┼──────────────────────────────┐  │
│   │                      ACTIONS (thunk)                       │  │
│   │                            │                               │  │
│   │   getBooks(query)    addBook()    saveBook()    getStats() │  │
│   │        │                 │            │             │      │  │
│   │        └─────────────────┴────────────┴─────────────┘      │  │
│   │                          │                                  │  │
│   └──────────────────────────┼──────────────────────────────────┘  │
│                              │                                      │
└──────────────────────────────┼──────────────────────────────────────┘
                               │ HTTP (fetch)
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SERVER (Express)                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   GET  /books?title=...&content=...&first=0&rows=5&sortField=...    │
│   POST /books                                                        │
│   PUT  /books/:id                                                    │
│   DELETE /books/:id                                                  │
│   GET  /books/stats?title=...&content=...                           │
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐    │
│   │                    PIPELINE PROCESARE                       │    │
│   │                                                             │    │
│   │   Request → filterBooks() → applySorting() → slice() → Res │    │
│   │                                                             │    │
│   └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐    │
│   │                    IN-MEMORY DATABASE                       │    │
│   │                                                             │    │
│   │   let books = [ { id, title, content, pages }, ... ]        │    │
│   │                                                             │    │
│   └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📈 Ghid de parcurgere

### Pentru începători (3-4 ore)

```
1. Dezarhivează S13clim.zip
       ↓
2. npm install (în directorul rădăcină)
       ↓
3. npm run start:all (pornește toate serverele)
       ↓
4. Deschide http://localhost:3000 (Dashboard)
       ↓
5. Pentru fiecare pas (1-4):
   • Citește explicațiile din Dashboard
   • Testează aplicația în browser
   • Studiază codul în VS Code
       ↓
6. Folosește ApiTester din Dashboard pentru a testa API-ul
```

### Pentru avansați (1-2 ore)

```
1. Sari direct la step4
       ↓
2. npm run start:pas4
       ↓
3. Analizează:
   • BookList.jsx (integrare Chart)
   • server/index.js (/books/stats endpoint)
       ↓
4. Implementează un nou tip de grafic (ex. LineChart)
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune | Observații |
|------------|----------|------------|
| Node.js | 18+ sau 20+ | LTS recomandat |
| npm | 9+ | Package manager |
| React | 18.2+ | Biblioteca UI |
| PrimeReact | 10.x | Componente UI |
| PrimeFlex | 3.x | Utility CSS |
| PrimeIcons | 7.x | Iconițe |
| redux-thunk | 3.x | Middleware async |
| react-google-charts | 4.x | Vizualizări |
| Vite | 5.x | Build tool |

---

## 🚀 Rulare rapidă

### Varianta 1: Toate aplicațiile simultan

```bash
# În directorul rădăcină al S13clim
npm install
npm run start:all

# Accesare:
# Dashboard:    http://localhost:3000
# Step 1:       http://localhost:3001 (API: 8081)
# Step 2:       http://localhost:3002 (API: 8082)
# Step 3:       http://localhost:3003 (API: 8083)
# Step 4:       http://localhost:3004 (API: 8084)
```

### Varianta 2: Un singur pas

```bash
# Exemplu: doar Step 3
npm run start:pas3

# Pornește:
# - Dashboard (3000)
# - Server Step 3 (8083)
# - Client Step 3 (3003)
```

### Varianta 3: Manual (pentru debugging)

```bash
# Terminal 1: Server
cd apps/step4/server
npm install
npm start

# Terminal 2: Client
cd apps/step4
npm install
npm start
```

---

## 🧪 Testare cu Postman

### Colecție inclusă

În `apps/dashboard/public/materiale/postman/S13-seminar13.postman_collection.json`

### Exemple de request-uri

**GET Books (paginat + filtrat + sortat):**
```
GET http://localhost:8084/books?title=Re&first=0&rows=5&sortField=pages&sortOrder=-1

Response:
{
  "count": 2,
  "records": [
    { "id": 1, "title": "React", "content": "...", "pages": 280 },
    { "id": 2, "title": "Redux", "content": "...", "pages": 196 }
  ],
  "first": 0,
  "rows": 5
}
```

**GET Stats (pentru grafice):**
```
GET http://localhost:8084/books/stats

Response:
{
  "count": 7,
  "ranges": [...],
  "topByPages": [...],
  "pagesList": [...],
  "summary": { "minPages": 144, "maxPages": 510, ... }
}
```

**POST Book:**
```
POST http://localhost:8084/books
Content-Type: application/json

{
  "title": "TypeScript",
  "content": "Tipuri, interfețe, generice",
  "pages": 350
}
```

---

## 🧠 Concepte cheie

### PrimeReact DataTable — Moduri de operare

| Mod | Descriere | Când folosim |
|-----|-----------|--------------|
| **Client-side** | Toate datele în memorie, filtrare/sortare locală | Seturi mici (<100) |
| **Lazy (Server-side)** | Doar pagina curentă în memorie, operații pe server | Seturi mari (>100) |

### Filtrare controlată vs instantanee

| Tip | Comportament | Pro | Contra |
|-----|--------------|-----|--------|
| **Controlată** | Declanșare prin buton „Aplică" | Predictibilă, auditabilă | Necesită click suplimentar |
| **Instantanee** | La fiecare tastă | Feedback imediat | Zgomot rețea, poate fi lentă |

### Contract client-server

```
CLIENT                                    SERVER
───────                                   ──────
Formulează interogarea          →         Execută interogarea
(filtre + paginare + sortare)             (SQL/in-memory)

Primește rezultatul             ←         Returnează:
                                          • records (fereastra)
                                          • count (total)
```

---

## 📝 Exerciții propuse

### Nivel 1 — Înțelegere

1. **Testează CRUD complet** pe Books folosind Postman.

2. **Modifică seed data** — adaugă 3 cărți noi în server și observă efectul în grafice.

3. **Schimbă `rowsPerPageOptions`** în DataTable și testează paginarea.

### Nivel 2 — Aplicare

4. **Adaugă o nouă coloană** `author` în model și UI.

5. **Implementează filtrare numerică** pe `pages`:
   ```
   GET /books?minPages=200&maxPages=400
   ```

6. **Adaugă export CSV** pentru datele filtrate.

### Nivel 3 — Sinteză

7. **Implementează sortare multi-coloană**:
   ```
   sortField=pages,title&sortOrder=-1,1
   ```

8. **Adaugă grafic LineChart** pentru evoluția în timp (necesită câmp `createdAt`).

9. **Persistență reală** — înlocuiește in-memory cu SQLite și compară performanța.

---

## 📚 Referințe

### Documentație oficială
- [PrimeReact DataTable](https://primereact.org/datatable/)
- [PrimeReact Dialog](https://primereact.org/dialog/)
- [react-google-charts](https://www.react-google-charts.com/)

### Articole academice
- Díaz Ceñera, M., et al. (2024). *Enhancing data tables user experience via automated adaptations*. Expert Systems with Applications.
- Cleveland, W. S., & McGill, R. (1984). *Graphical perception: Theory, experimentation, and application*. JASA.
- Shneiderman, B. (1996). *The eyes have it: A task by data type taxonomy for information visualizations*. IEEE VL.

### Tutoriale
- [PrimeReact Crash Course](https://www.youtube.com/watch?v=0QKITqHmrz4)
- [Redux Thunk Tutorial](https://redux.js.org/usage/writing-logic-thunks)

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

**Biblioteci externe utilizate:** PrimeReact, PrimeFlex, PrimeIcons, react-google-charts. Verificați licențele înainte de utilizare în proiecte reale.

---

<div align="center">

**📊 Material didactic pentru Seminarul S13**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția de la tabel simplu la instrument de interogare:**

```
Step 1            Step 2            Step 3            Step 4
──────            ──────            ──────            ──────
  Tabel     →    + Filtrare   →    + Sortare   →    + Grafice
  + CRUD         + Paginare        numerică         Pie/Bar/
                 server-side                        Histogram
```

---

**Triada operațiilor pe date:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   FILTRARE          PAGINARE           SORTARE              │
│   (CE văd?)         (CÂT văd?)         (ÎN CE ORDINE?)      │
│                                                             │
│   title CONTAINS    first=0            sortField=pages      │
│   "React"           rows=5             sortOrder=-1 (DESC)  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

</div>
