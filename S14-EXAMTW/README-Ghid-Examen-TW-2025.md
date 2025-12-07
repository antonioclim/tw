# Ghid de Pregătire pentru Examenul de Tehnologii Web

## Seturi de Subiecte Probabile și Sfaturi de Studiu

*Bazat pe analiza kit-ului exam-base-2025 și subiectele din anii anteriori*

---

## 1. Structura Examenului

Examenul este format din **4 subiecte** a câte **2.5 puncte** fiecare, acoperind următoarele tematici:

- **Subiect 0 (Simple):** HTML, CSS, JavaScript client-side de bază
- **Subiect 1 (JavaScript):** Funcții JS pure cu validări de tip
- **Subiect 2 (REST):** Endpoint-uri Express.js cu validări și răspunsuri HTTP
- **Subiect 3 (React):** Componente React cu Redux state management

---

## 2. Analiza Kit-ului 2025

### 2.1 Structura Aplicației

Kit-ul conține o aplicație full-stack de tip Task Management cu:

- **Server (Express.js + Sequelize + SQLite):** API RESTful complet pentru Users, Projects, Tasks
- **Client (React + Redux):** SPA cu autentificare, CRUD operații, paginare
- **Sistem de permisiuni:** read/write per resursă, tipuri de utilizatori (admin/regular)

### 2.2 Elemente Incomplete (Posibile Cerințe)

| Locație | Element Incomplet |
|---------|-------------------|
| Dashboard.jsx (linia 17-19) | **TODO** explicit pentru admin panel |
| admin-router.mjs | Router gol, doar middleware definit |
| TaskList.jsx (linia 7) | Paginator comentat |
| Task.jsx | Lipsește filtrare/sortare client-side |

---

## 3. Seturi de Subiecte Probabile

---

### SET A - Probabilitate Ridicată

*Acest set urmează cel mai îndeaproape pattern-ul din 2024.*

#### Subiect 0 (Simple) - 2.5p

**Sortare client-side pentru TaskList**

- Există un buton cu id-ul `sortAscBtn` în pagină și se poate da click (0.5p)
- Există un buton cu id-ul `sortDescBtn` în pagină și se poate da click (0.5p)
- La click pe `sortAscBtn`, task-urile sunt sortate ascendent după title (0.5p)
- La click pe `sortDescBtn`, task-urile sunt sortate descendent după title (0.5p)
- Sortarea funcționează corect și pentru task-uri cu același nume (0.5p)

#### Subiect 1 (JavaScript) - 2.5p

**Funcție `isDeepEqual(obj1, obj2)`**

- `obj1` trebuie să fie object. Altfel aruncă Error: `'First input should be an object'` (0.5p)
- `obj2` trebuie să fie object. Altfel aruncă Error: `'Second input should be an object'` (0.5p)
- Funcția compară corect obiecte cu proprietăți primitive (0.5p)
- Funcția compară corect obiecte nested (0.5p)
- Funcția compară corect array-uri nested în obiecte (0.5p)

#### Subiect 2 (REST) - 2.5p

**`DELETE /api/users/:uid/projects/:pid/tasks` cu query params**

- Request fără query params returnează `{message: 'nothing to delete'}`, cod 400 (0.5p)
- Query params non-numerice returnează `{message: 'invalid ids'}`, cod 400 (0.5p)
- Cererea funcționează cu un singur id valid (0.5p)
- Cererea funcționează cu id-uri multiple existente (0.5p)
- Răspunsul include status `'deleted'` sau `'not found'` per id, cod 202 (0.5p)

#### Subiect 3 (React) - 2.5p

**Selecție task-uri în TaskList**

- Aplicația se desenează fără eroare (0.5p)
- Pentru fiecare task există un buton `'select'` (0.5p)
- La apăsarea `'select'`, task-ul apare într-o listă separată de selecții (0.5p)
- Există buton `'deselect'` care elimină task-ul din lista de selecții (0.5p)
- În lista de selecții nu apar duplicate (0.5p)

---

### SET B - Focalizat pe Admin Panel

*Acest set exploatează elementele TODO din Dashboard și admin-router.*

#### Subiect 0 (Simple) - 2.5p

**Filtrare task-uri după status în TaskList**

- Există un dropdown cu id-ul `statusFilter` cu opțiunile `'all'`, `'open'`, `'closed'` (0.5p)
- La selectarea `'all'`, se afișează toate task-urile (0.5p)
- La selectarea `'open'`, se afișează doar task-urile cu status `'open'` (0.5p)
- La selectarea `'closed'`, se afișează doar task-urile cu status `'closed'` (0.5p)
- Filtrarea se face client-side fără request suplimentar (0.5p)

#### Subiect 1 (JavaScript) - 2.5p

**Funcție `validatePermission(permission, schema)`**

- `permission` trebuie să fie object. Altfel aruncă Error: `'Permission should be an object'` (0.5p)
- `schema` trebuie să fie object. Altfel aruncă Error: `'Schema should be an object'` (0.5p)
- Validează că toate câmpurile din schema există în permission (0.5p)
- Validează că tipurile proprietăților corespund cu schema (0.5p)
- Returnează `{valid: true/false, errors: [...]}` (0.5p)

#### Subiect 2 (REST) - 2.5p

**`GET /admin/users` - Listare utilizatori**

- Endpoint-ul necesită autentificare și tip `'admin'` (0.5p)
- Utilizatori non-admin primesc 403 Forbidden (0.5p)
- Returnează lista de utilizatori fără `passwordHash` (0.5p)
- Suportă paginare cu `?pageSize` și `?pageNumber` (0.5p)
- Răspunsul include `{data: [...], count: N}` (0.5p)

#### Subiect 3 (React) - 2.5p

**Dashboard pentru Admin**

- Componenta se randează fără erori pentru `userType='admin'` (0.5p)
- Se afișează o listă de utilizatori încărcată de la server (0.5p)
- Fiecare utilizator are afișat email și type (0.5p)
- Există un buton de refresh care reîncarcă lista (0.5p)
- Se afișează numărul total de utilizatori (0.5p)

---

### SET C - Focalizat pe Paginare și State

*Acest set exploatează Paginator-ul comentat și Redux store.*

#### Subiect 0 (Simple) - 2.5p

**Counter pentru task-uri pe status**

- Există un element cu id-ul `openCount` care afișează numărul de task-uri open (0.5p)
- Există un element cu id-ul `closedCount` care afișează numărul de task-uri closed (0.5p)
- Contoarele se actualizează automat la încărcarea listei (0.5p)
- Contoarele reflectă corect starea curentă după filtrare (0.5p)
- Există și un total general cu id-ul `totalCount` (0.5p)

#### Subiect 1 (JavaScript) - 2.5p

**Funcție `groupBy(array, property)`**

- `array` trebuie să fie Array. Altfel aruncă Error: `'First input should be an array'` (0.5p)
- `property` trebuie să fie string. Altfel aruncă Error: `'Second input should be a string'` (0.5p)
- Grupează corect obiectele după proprietatea specificată (0.5p)
- Returnează un obiect cu cheile fiind valorile unice (0.5p)
- Tratează corect proprietăți lipsă (le grupează sub `'undefined'`) (0.5p)

#### Subiect 2 (REST) - 2.5p

**`PUT /api/users/:uid/projects/:pid/tasks/:tid/priority`**

- Validează că `priority` există în body (0.5p)
- Validează că `priority` este `'low'`, `'medium'` sau `'high'` (0.5p)
- Returnează task-ul actualizat la succes, cod 200 (0.5p)
- Task inexistent returnează `{message: 'Task not found'}`, cod 404 (0.5p)
- Verifică permisiunile utilizatorului înainte de update (0.5p)

#### Subiect 3 (React) - 2.5p

**Activare Paginator în TaskList**

- Componenta Paginator este vizibilă în TaskList (0.5p)
- Butoanele Previous și Next funcționează corect (0.5p)
- Page size modifică numărul de elemente afișate (0.5p)
- Task-urile se reîncarcă la schimbarea paginii (0.5p)
- Se afișează corect numărul total de pagini (0.5p)

---

### SET D - Focalizat pe Sharing și Colaborare

*Acest set exploatează sistemul de permisiuni existent.*

#### Subiect 0 (Simple) - 2.5p

**Afișare detalii permisiuni în ProjectList**

- Pentru fiecare proiect se afișează owner-ul (email) (0.5p)
- Se afișează badge `'Owner'` dacă utilizatorul curent deține proiectul (0.5p)
- Se afișează badge `'Shared'` dacă proiectul este partajat (0.5p)
- Permisiunile (read/write) sunt afișate pentru proiectele partajate (0.5p)
- Styling corect pentru diferențiere vizuală (0.5p)

#### Subiect 1 (JavaScript) - 2.5p

**Funcție `mergeObjects(target, source, options)`**

- `target` și `source` trebuie să fie object (0.5p)
- `options.overwrite` (boolean) controlează suprascrierea (0.5p)
- Merge shallow corect fără options (0.5p)
- Cu `overwrite: false`, păstrează valorile din target (0.5p)
- Returnează un obiect nou, nu modifică target (0.5p)

#### Subiect 2 (REST) - 2.5p

**`POST /api/users/:uid/projects/:pid/share`**

- Validează că `targetUserId` și `rights` există în body (0.5p)
- Validează că `rights` este array de `['read']` sau `['read', 'write']` (0.5p)
- Creează Permission pentru utilizatorul țintă (0.5p)
- Nu permite partajarea către sine însuși, cod 400 (0.5p)
- Returnează `{message: 'Project shared'}`, cod 201 (0.5p)

#### Subiect 3 (React) - 2.5p

**Modal de partajare proiect**

- Există buton `'Share'` pentru proiectele proprii (0.5p)
- Click pe `'Share'` deschide un modal (0.5p)
- Modal-ul conține input pentru email cu autocomplete (0.5p)
- Există checkboxes pentru permisiuni (read/write) (0.5p)
- Buton `'Share'` în modal trimite request și închide modal-ul (0.5p)

---

## 4. Sfaturi de Studiu și Experimente

### 4.1 Primii Pași cu Kit-ul

1. **Instalare dependențe:** `cd server && npm install && cd ../client && npm install`
2. **Pornire server:** `cd server && node server.mjs` (port 3000)
3. **Pornire client:** `cd client && npm run dev` (port 5173)
4. **Credențiale test:** `andrei@nowhere.net` / `welcome` (regular) sau `andrei@admin.net` / `welcome` (admin)
5. **Resetare DB:** Șterge `db.sqlite` și rulează `node data-preload.mjs`

### 4.2 Experimente Recomandate

#### Pentru Subiect 0 (Simple/HTML)

1. Adaugă butoane de sortare în `TaskList.jsx` și implementează sortarea cu `Array.sort()`
2. Adaugă un dropdown de filtrare și folosește `Array.filter()` pentru status
3. Creează contoare care numără task-urile per status

#### Pentru Subiect 1 (JavaScript)

Practică pattern-ul de validare cu throw Error:

```javascript
function myFunc(obj, arr) { 
  if (typeof obj !== 'object' || obj === null) 
    throw new Error('First input should be an object'); 
  if (!Array.isArray(arr)) 
    throw new Error('Second input should be an array'); 
  // logic...
}
```

- Implementează `isShallowEqual(obj1, obj2, props)` din subiectele 2024
- Implementează `isDeepEqual(obj1, obj2)` cu recursivitate
- Implementează `groupBy(array, property)` și `flatten(array)`

#### Pentru Subiect 2 (REST)

- Studiază structura din `api-router.mjs` și `task-controller.mjs`
- Adaugă un endpoint nou în `admin-router.mjs` (ex: `GET /admin/stats`)
- Practică validări: `req.body` gol, query params invalide, id-uri inexistente
- Memorează codurile HTTP: 200/201/202/204 (succes), 400/401/403/404 (erori)

#### Pentru Subiect 3 (React)

- Decomentează Paginator din `TaskList.jsx` și conectează-l
- Completează `Dashboard.jsx` pentru admin cu fetch de utilizatori
- Adaugă state local cu `useState` pentru selecții/toggle
- Practică pattern-ul: `const [selected, setSelected] = useState([])`

---

## 5. Cheat Sheet - Pattern-uri Esențiale

### 5.1 Validare Parametri (JavaScript)

```javascript
function example(obj, arr, str) {
  if (typeof obj !== 'object' || obj === null) 
    throw new Error('First input should be an object');
  if (!Array.isArray(arr)) 
    throw new Error('Second input should be an array');
  if (typeof str !== 'string') 
    throw new Error('Third input should be a string');
  if (!arr.every(item => typeof item === 'string'))
    throw new Error('Each element should be a string');
  // logic...
}
```

### 5.2 Endpoint REST (Express)

```javascript
const handler = async (req, res, next) => {
  try {
    const { ids } = req.query;
    if (!ids) return res.status(400).json({message: 'nothing to delete'});
    
    const idArray = ids.split(',');
    if (idArray.some(id => isNaN(parseInt(id))))
      return res.status(400).json({message: 'invalid ids'});
    
    const results = [];
    for (const id of idArray) {
      const item = await Model.findByPk(id);
      if (item) {
        await item.destroy();
        results.push({id: parseInt(id), status: 'deleted'});
      } else {
        results.push({id: parseInt(id), status: 'not found'});
      }
    }
    res.status(202).json(results);
  } catch (err) { next(err); }
};
```

### 5.3 React Component cu Selecție

```jsx
const List = () => {
  const items = useSelector(state => state.items.data);
  const [selected, setSelected] = useState([]);
  
  const handleSelect = (item) => {
    if (!selected.find(s => s.id === item.id)) {
      setSelected([...selected, item]);
    }
  };
  
  const handleDeselect = (id) => {
    setSelected(selected.filter(s => s.id !== id));
  };
  
  return (
    <div>
      <table>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <button onClick={() => handleSelect(item)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Selected:</h3>
      <ul>
        {selected.map(s => (
          <li key={s.id}>
            {s.name} 
            <button onClick={() => handleDeselect(s.id)}>Deselect</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

### 5.4 Sortare Client-Side

```jsx
const [sortOrder, setSortOrder] = useState('asc');

const sortedItems = [...items].sort((a, b) => {
  if (sortOrder === 'asc') return a.name.localeCompare(b.name);
  return b.name.localeCompare(a.name);
});

// În JSX:
<button id="sortAscBtn" onClick={() => setSortOrder('asc')}>↑</button>
<button id="sortDescBtn" onClick={() => setSortOrder('desc')}>↓</button>
```

### 5.5 Filtrare Client-Side

```jsx
const [statusFilter, setStatusFilter] = useState('all');

const filteredItems = items.filter(item => {
  if (statusFilter === 'all') return true;
  return item.status === statusFilter;
});

// În JSX:
<select id="statusFilter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
  <option value="all">All</option>
  <option value="open">Open</option>
  <option value="closed">Closed</option>
</select>
```

### 5.6 Deep Equal (Recursiv)

```javascript
function isDeepEqual(obj1, obj2) {
  if (typeof obj1 !== 'object' || obj1 === null)
    throw new Error('First input should be an object');
  if (typeof obj2 !== 'object' || obj2 === null)
    throw new Error('Second input should be an object');
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    
    const areObjects = 
      (typeof val1 === 'object' && val1 !== null) &&
      (typeof val2 === 'object' && val2 !== null);
    
    if (areObjects) {
      if (!isDeepEqual(val1, val2)) return false;
    } else {
      if (val1 !== val2) return false;
    }
  }
  
  return true;
}
```

### 5.7 Group By

```javascript
function groupBy(array, property) {
  if (!Array.isArray(array))
    throw new Error('First input should be an array');
  if (typeof property !== 'string')
    throw new Error('Second input should be a string');
  
  return array.reduce((acc, item) => {
    const key = item[property] ?? 'undefined';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
```

---

## 6. Coduri HTTP de Memorat

| Cod | Semnificație | Când se folosește |
|-----|--------------|-------------------|
| **200** | OK | GET reușit, PUT reușit |
| **201** | Created | POST reușit (resursă creată) |
| **202** | Accepted | Operație asincronă acceptată |
| **204** | No Content | DELETE reușit |
| **400** | Bad Request | Validare eșuată, parametri lipsă |
| **401** | Unauthorized | Lipsă token / token invalid |
| **403** | Forbidden | Token valid dar fără permisiuni |
| **404** | Not Found | Resursa nu există |

---

## 7. Structura Fișierelor Importante

```
exam-base-2025/
├── server/
│   ├── app.mjs                 # Configurare Express
│   ├── server.mjs              # Entry point
│   ├── data-preload.mjs        # Date inițiale
│   ├── db.sqlite               # Baza de date
│   ├── models/
│   │   ├── index.mjs           # Relații Sequelize ⭐
│   │   ├── user.mjs
│   │   ├── project.mjs
│   │   ├── task.mjs
│   │   └── permission.mjs
│   ├── routers/
│   │   ├── api-router.mjs      # Endpoint-uri principale ⭐
│   │   ├── auth-router.mjs
│   │   ├── admin-router.mjs    # GOL - posibilă cerință ⭐
│   │   └── controllers/
│   │       ├── project-controller.mjs
│   │       ├── task-controller.mjs ⭐
│   │       └── user-controller.mjs
│   └── middleware/
│       ├── auth-middleware.mjs
│       ├── perm-middleware.mjs ⭐
│       └── user-type-middleware.mjs
│
└── client/
    └── src/
        ├── components/
        │   ├── App/App.jsx
        │   ├── Dashboard/Dashboard.jsx    # TODO pentru admin ⭐
        │   ├── TaskList/TaskList.jsx      # Paginator comentat ⭐
        │   ├── TaskList/Task/Task.jsx
        │   ├── ProjectList/ProjectList.jsx
        │   └── TaskDetails/TaskDetails.jsx
        └── stores/
            ├── actions/
            │   ├── task-actions.js ⭐
            │   └── project-actions.js
            └── reducers/
                ├── task-reducer.js
                └── project-reducer.js
```

---

## 8. Checklist Final de Pregătire

- [ ] Am rulat aplicația și m-am autentificat cu ambele tipuri de conturi
- [ ] Am creat un proiect și task-uri pentru a înțelege fluxul
- [ ] Am implementat sortare client-side în TaskList
- [ ] Am implementat filtrare client-side în TaskList
- [ ] Am practicat funcții JS cu validări de tip și throw Error
- [ ] Am adăugat un endpoint nou în server și l-am testat
- [ ] Am decomentrat și conectat Paginator-ul
- [ ] Am completat TODO-ul din Dashboard pentru admin
- [ ] Știu pe de rost codurile HTTP și când se folosesc
- [ ] Am rezolvat cel puțin unul din seturile de subiecte complet

---

**Succes la examen!**

*Pregătirea practică pe kit-ul real este cheia succesului.*
