# Seminar 9 – Persistență cu ORM (Sequelize + SQLite)

## Proiect: `nextlab` (Porturi 3000 / 3001)

Acest proiect reprezintă un **starter kit didactic** complet pentru Seminarul 9, care demonstrează utilizarea ORM-ului Sequelize cu SQLite pentru persistența datelor într-o aplicație Express.js.

---

## Cuprins

1. [Prezentare generală](#prezentare-generală)
2. [Precondiții](#precondiții)
3. [Instalare și configurare](#instalare-și-configurare)
4. [Structura proiectului](#structura-proiectului)
5. [Pornirea aplicației](#pornirea-aplicației)
6. [Pașii didactici (1-6)](#pașii-didactici-1-6)
7. [Relații în Sequelize](#relații-în-sequelize)
8. [Testare cu Postman](#testare-cu-postman)
9. [API Reference](#api-reference)
10. [Depanare (FAQ)](#depanare-faq)
11. [Cod complet - Fișiere proiect](#cod-complet---fișiere-proiect)
12. [Bibliografie](#bibliografie)

---

## Prezentare generală

### Obiective de învățare

Acest starterkit acoperă următoarele concepte esențiale:

- **Conectarea la baza de date** cu Sequelize (dialect SQLite)
- **Definirea modelelor** (entități) cu validări
- **Operații CRUD** complete (Create, Read, Update, Delete)
- **Filtrare și căutare** (query parameters)
- **Proiecții** (selectarea câmpurilor)
- **Sortare** a rezultatelor
- **Relații între entități**: one-to-many și many-to-many
- **Eager loading** (încărcarea asocierilor)
- **Gestionarea erorilor** de validare Sequelize

### Structura didactică

Proiectul este organizat în:

- **6 pași progresivi** pentru entitatea `Employee` (CRUD + filtrare + proiecții)
- **Segment avansat** despre relații (User–Contact–Tag) cu eager loading
- **Documentație HTML** interactivă pentru fiecare pas
- **Server API** (port 3001) și **server de documentație** (port 3000)

---

## Precondiții

### Software necesar

1. **Node.js** (versiunea ≥ 18.x recomandată)
   ```powershell
   node -v
   npm -v
   ```

2. **npm** (instalat implicit cu Node.js)

3. **Visual Studio Code** (recomandat)
   - Terminal integrat (PowerShell / cmd)

4. **Postman Desktop** (pentru testarea API-ului)

### Sistem de operare

Ghidul este scris pentru **Windows 11**, dar proiectul este **portabil** și funcționează pe orice platformă (Linux, macOS).

---

## Instalare și configurare

### Pasul 1: Crearea directorului de lucru

```powershell
# Creează directorul proiectului
New-Item -ItemType Directory -Path "Z:\tw\SxTEST\FAZA9\nextlab" -Force

# Deschide în VS Code
code "Z:\tw\SxTEST\FAZA9\nextlab"
```

### Pasul 2: Inițializarea proiectului Node.js

```powershell
# Navighează în directorul proiectului
cd Z:\tw\SxTEST\FAZA9\nextlab

# Inițializează package.json
npm init -y
```

### Pasul 3: Instalarea dependențelor

```powershell
npm install express sequelize sqlite3
```

> **Notă:** Mesajele `npm WARN deprecated ...` sunt avertismente despre pachete tranzitive și pot fi ignorate atâta timp cât nu apare `npm ERR!`.

---

## Structura proiectului

```
nextlab/
├── package.json
├── README.md
│
├── data/                          # Baza de date SQLite (creat automat)
│   └── seminar9.sqlite
│
├── src/
│   ├── config/
│   │   └── database.js            # Configurare Sequelize
│   │
│   ├── models/
│   │   ├── index.js               # Agregator modele + asocieri
│   │   ├── employee.js            # Model Employee
│   │   ├── user.js                # Model User
│   │   ├── contact.js             # Model Contact
│   │   └── tag.js                 # Model Tag
│   │
│   ├── routes/
│   │   ├── employees.js           # Rute CRUD pentru Employee
│   │   └── relationships.js       # Rute pentru relații
│   │
│   └── server/
│       ├── api-server.js          # Server API (port 3001)
│       └── docs-server.js         # Server documentație (port 3000)
│
└── public/
    ├── styles.css                 # Stiluri comune
    ├── index.html                 # Pagina principală
    │
    ├── steps/
    │   ├── step1.html             # Pasul 1 - Conectarea la BD
    │   ├── step2.html             # Pasul 2 - Definirea entității
    │   ├── step3.html             # Pasul 3 - GET/POST
    │   ├── step4.html             # Pasul 4 - Operații pe ID
    │   ├── step5.html             # Pasul 5 - Filtrare
    │   └── step6.html             # Pasul 6 - Proiecții & sortare
    │
    ├── segment9-relationships.html # Documentație relații
    └── postman.html               # Ghid testare Postman
```

---

## Pornirea aplicației

### Workflow recomandat la seminar

#### 1. Pornirea serverului API (port 3001)

Deschide un **prim terminal** și rulează:

```powershell
npm run api
```

**Output așteptat:**

```
Database connection has been established successfully.
Models were synchronised.
Demo data for relationships ensured.
API server listening on http://localhost:3001
```

#### 2. Pornirea serverului de documentație (port 3000)

Deschide un **al doilea terminal** și rulează:

```powershell
npm run docs
```

**Output așteptat:**

```
Docs server available at http://localhost:3000
```

#### 3. Verificare rapidă

- **Browser** → `http://localhost:3000` (pagina cu pașii)
- **Browser/Postman** → `http://localhost:3001/health` (health check JSON)

---

## Pașii didactici (1-6)

### Pasul 1 – Conectarea la baza de date

**Obiectiv:** Validăm infrastructura – Express pornește, Sequelize se conectează la SQLite.

**Ce învățăm:**
- Inițializarea unei instanțe Sequelize
- Configurarea dialectului SQLite
- Autentificarea conexiunii la baza de date

**Fișiere implicate:**
- `src/config/database.js` – configurare Sequelize
- `src/server/api-server.js` – apel `sequelize.authenticate()`

**Testare:**
```
GET http://localhost:3001/health
```

**Răspuns așteptat:**
```json
{
  "status": "ok",
  "message": "Seminar 9 API is running"
}
```

---

### Pasul 2 – Definirea entității și sincronizarea

**Obiectiv:** Definim modelul `Employee` cu validări și sincronizăm schema cu baza de date.

**Ce învățăm:**
- Definirea unui model Sequelize
- Tipuri de date (STRING, INTEGER)
- Validări (len, min)
- Valori implicite (defaultValue)
- Sincronizarea cu `sequelize.sync()`

**Fișiere implicate:**
- `src/models/employee.js` – definirea modelului
- `src/models/index.js` – agregator modele

**Structura modelului Employee:**
- `id` – INTEGER, primary key, autoincrement
- `firstname` – STRING, not null, lungime 3-10 caractere
- `lastname` – STRING, not null, lungime 3-10 caractere
- `role` – STRING, not null, default "developer"
- `salary` – INTEGER, not null, default 0, min 0
- `birthyear` – INTEGER, nullable, min 1900

---

### Pasul 3 – Operații GET și POST

**Obiectiv:** Construim API-ul REST minimal pentru listare și creare de înregistrări.

**Ce învățăm:**
- `GET /api/employees` – listarea tuturor înregistrărilor
- `POST /api/employees` – crearea unei înregistrări noi
- Validări automate Sequelize
- Gestionarea erorilor de validare

**Endpoint-uri:**

**GET /api/employees** – Listare completă
```
GET http://localhost:3001/api/employees
```

**POST /api/employees** – Creare înregistrare
```
POST http://localhost:3001/api/employees
Content-Type: application/json

{
  "firstname": "Ana",
  "lastname": "Ionescu",
  "role": "developer",
  "salary": 3500,
  "birthyear": 1995
}
```

**Răspunsuri posibile:**
- `201 Created` – înregistrare creată cu succes
- `400 Bad Request` – validare eșuată (ex: firstname prea scurt)
- `500 Internal Server Error` – eroare de server

---

### Pasul 4 – Operații pe ID

**Obiectiv:** Completăm ciclul CRUD cu operații pe identificator unic.

**Ce învățăm:**
- `GET /api/employees/:id` – căutare după ID
- `PUT /api/employees/:id` – actualizare după ID
- `DELETE /api/employees/:id` – ștergere după ID
- Utilizarea `findByPk()` (find by primary key)
- Gestionarea resurselor inexistente (404)

**Endpoint-uri:**

**GET /api/employees/:id** – Căutare
```
GET http://localhost:3001/api/employees/1
```

**PUT /api/employees/:id** – Actualizare
```
PUT http://localhost:3001/api/employees/1
Content-Type: application/json

{
  "salary": 4000,
  "role": "senior developer"
}
```

**DELETE /api/employees/:id** – Ștergere
```
DELETE http://localhost:3001/api/employees/1
```

**Răspunsuri:**
- `200 OK` – GET/PUT reușit
- `204 No Content` – DELETE reușit
- `404 Not Found` – resursa nu există

---

### Pasul 5 – Selecții și filtrare

**Obiectiv:** Introducem interogări parametrizate pentru filtrarea rezultatelor.

**Ce învățăm:**
- Query parameters (`?name=`, `?minSalary=`)
- Operatori Sequelize (`Op.like`, `Op.gte`)
- Clauza `where` pentru filtrare
- Combinarea mai multor criterii

**Exemple de utilizare:**

**Filtrare după nume (LIKE):**
```
GET http://localhost:3001/api/employees?name=an
```
Returnează angajații cu "an" în `firstname`.

**Filtrare după salariu minim (≥):**
```
GET http://localhost:3001/api/employees?minSalary=4000
```
Returnează angajații cu `salary >= 4000`.

**Combinare filtre:**
```
GET http://localhost:3001/api/employees?name=ion&minSalary=3000
```

---

### Pasul 6 – Proiecții și sortare

**Obiectiv:** Controlăm câmpurile returnate și ordinea rezultatelor.

**Ce învățăm:**
- Proiecții cu `attributes` (selectarea câmpurilor)
- Sortare cu `order`
- Optimizarea răspunsurilor API

**Exemple de utilizare:**

**Proiecție simplificată:**
```
GET http://localhost:3001/api/employees?simplified=true
```
Returnează doar: `id`, `firstname`, `lastname`, `salary`.

**Sortare crescătoare:**
```
GET http://localhost:3001/api/employees?sort=salary
```
Sortează rezultatele după salariu (crescător).

**Combinare proiecție + sortare:**
```
GET http://localhost:3001/api/employees?simplified=true&sort=salary
```

---

## Relații în Sequelize

### Tipuri de relații implementate

#### 1. One-to-Many (User → Contact)

**Descriere:** Un utilizator poate avea mai multe contacte.

**Implementare:**
```javascript
User.hasMany(Contact, { foreignKey: "userId", as: "contacts" });
Contact.belongsTo(User, { foreignKey: "userId", as: "user" });
```

**Rezultat:** Coloana `userId` în tabelul `Contacts`.

#### 2. Many-to-Many (Contact ↔ Tag)

**Descriere:** Un contact poate avea mai multe tag-uri, iar un tag poate fi asociat mai multor contacte.

**Implementare:**
```javascript
Contact.belongsToMany(Tag, {
  through: "ContactTags",
  foreignKey: "contactId",
  otherKey: "tagId",
  as: "tags"
});

Tag.belongsToMany(Contact, {
  through: "ContactTags",
  foreignKey: "tagId",
  otherKey: "contactId",
  as: "contacts"
});
```

**Rezultat:** Tabel junction `ContactTags` cu coloane `contactId` și `tagId`.

### Eager Loading

**Concept:** Încărcarea relațiilor într-o singură interogare (evitarea problemei N+1).

**Exemplu - un nivel:**
```javascript
const users = await User.findAll({
  include: [{ model: Contact, as: "contacts" }]
});
```

**Exemplu - două nivele:**
```javascript
const users = await User.findAll({
  include: [
    {
      model: Contact,
      as: "contacts",
      include: [{ model: Tag, as: "tags" }]
    }
  ]
});
```

### Date demo (seed data)

La pornirea serverului API, se populează automat:

**Utilizatori:**
- Alice (alice@example.com)
- Bob (bob@example.com)

**Contacte:**
- Charlie → Alice (tag-uri: friend, work)
- Dave → Alice (tag-uri: work)
- Eve → Bob (tag-uri: friend)

---

## Testare cu Postman

### Configurare inițială

1. **Instalează Postman** (desktop application)
2. **Creează o colecție nouă:** "Seminar 9 – ORM"
3. **Adaugă variabilă de colecție:**
   - Key: `baseUrl`
   - Value: `http://localhost:3001`

### Request-uri esențiale

#### Health Check
```
GET {{baseUrl}}/health
```

#### CRUD pentru Employee

**Listare:**
```
GET {{baseUrl}}/api/employees
```

**Creare:**
```
POST {{baseUrl}}/api/employees
Content-Type: application/json

{
  "firstname": "Maria",
  "lastname": "Popescu",
  "role": "developer",
  "salary": 4000,
  "birthyear": 1990
}
```

**Căutare după ID:**
```
GET {{baseUrl}}/api/employees/1
```

**Actualizare:**
```
PUT {{baseUrl}}/api/employees/1
Content-Type: application/json

{
  "salary": 5000,
  "role": "senior developer"
}
```

**Ștergere:**
```
DELETE {{baseUrl}}/api/employees/1
```

#### Filtrare și sortare

**Căutare după nume:**
```
GET {{baseUrl}}/api/employees?name=ana
```

**Filtrare după salariu:**
```
GET {{baseUrl}}/api/employees?minSalary=4000
```

**Proiecție simplificată:**
```
GET {{baseUrl}}/api/employees?simplified=true
```

**Sortare:**
```
GET {{baseUrl}}/api/employees?sort=salary
```

**Combinat:**
```
GET {{baseUrl}}/api/employees?simplified=true&sort=salary&minSalary=3000
```

#### Relații

**Utilizatori cu contacte (eager loading 2 nivele):**
```
GET {{baseUrl}}/api/relationships/users-with-contacts
```

**Contacte cu tag-uri:**
```
GET {{baseUrl}}/api/relationships/contacts-with-tags
```

**Export JSON (toate tabelele):**
```
GET {{baseUrl}}/api/relationships/export-json
```

### Interpretarea răspunsurilor

**Coduri de status HTTP:**
- `200 OK` – operație reușită (GET, PUT)
- `201 Created` – resursă creată (POST)
- `204 No Content` – ștergere reușită (DELETE)
- `400 Bad Request` – validare eșuată
- `404 Not Found` – resursă inexistentă
- `500 Internal Server Error` – eroare de server

**Structura răspunsurilor:**
- **Obiect unic:** operații pe ID
- **Listă (array):** operații fără ID
- **Mesaje de eroare:** include detalii despre validări

---

## API Reference

### Resursa Employee

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| GET | `/api/employees` | Listare completă (cu filtrare opțională) |
| POST | `/api/employees` | Creare înregistrare nouă |
| GET | `/api/employees/:id` | Căutare după ID |
| PUT | `/api/employees/:id` | Actualizare după ID |
| DELETE | `/api/employees/:id` | Ștergere după ID |

### Query Parameters pentru GET /api/employees

| Parameter | Tip | Descriere | Exemplu |
|-----------|-----|-----------|---------|
| `name` | string | Filtrare după firstname (LIKE) | `?name=ana` |
| `minSalary` | number | Filtrare după salariu minim | `?minSalary=4000` |
| `simplified` | boolean | Proiecție simplificată | `?simplified=true` |
| `sort` | string | Sortare (salary, firstname, lastname) | `?sort=salary` |

### Resursa Relationships

| Metodă | Endpoint | Descriere |
|--------|----------|-----------|
| GET | `/api/relationships/users-with-contacts` | Utilizatori cu contacte (eager loading 2 nivele) |
| GET | `/api/relationships/contacts-with-tags` | Contacte cu tag-uri (many-to-many) |
| GET | `/api/relationships/export-json` | Export complet (toate tabelele) |

---

## Depanare (FAQ)

### Port 3000/3001 deja ocupat

**Problemă:** Eroare `EADDRINUSE` la pornirea serverului.

**Soluție:**
1. Închide instanțele vechi cu `Ctrl + C` în terminal
2. Sau schimbă portul în fișierele server:
   ```javascript
   const PORT = 3002; // alt port liber
   ```

### Cannot find module

**Problemă:** Eroare la importul modulelor.

**Soluție:**
1. Rulează din nou `npm install`
2. Verifică path-urile relative în `require(...)`
3. Asigură-te că ești în directorul corect

### SQLITE_CANTOPEN

**Problemă:** Nu se poate deschide baza de date SQLite.

**Soluție:**
1. Verifică existența folderului `data/`
2. Creează manual dacă lipsește: `mkdir data`
3. Verifică permisiunile de scriere

### SequelizeValidationError

**Problemă:** Validare eșuată la POST/PUT.

**Soluție:**
1. Verifică payload-ul JSON:
   - `firstname`: 3-10 caractere
   - `lastname`: 3-10 caractere
   - `salary`: >= 0
   - `birthyear`: >= 1900 (opțional)
2. Citește mesajul de eroare în răspunsul `400 Bad Request`

### Baza de date nu se actualizează

**Problemă:** Modificările în cod nu se reflectă în baza de date.

**Soluție:**
1. Șterge fișierul `data/seminar9.sqlite`
2. Repornește serverul API (`npm run api`)
3. Sequelize va recrea automat schema

---

## Cod complet - Fișiere proiect

### package.json

```json
{
  "name": "nextlab-seminar9",
  "version": "1.0.0",
  "description": "Seminar 9 – Persistenta cu ORM (Sequelize + SQLite)",
  "main": "src/server/api-server.js",
  "scripts": {
    "api": "node src/server/api-server.js",
    "docs": "node src/server/docs-server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "sequelize": "^6.0.0",
    "sqlite3": "^5.1.0"
  }
}
```

### src/config/database.js

```javascript
// src/config/database.js
const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "..", "data", "seminar9.sqlite"),
  logging: false // pune true dacă vrei să vezi SQL-ul generat
});

module.exports = sequelize;
```

### src/models/employee.js

```javascript
// src/models/employee.js
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [3, 10], msg: "Firstname length must be between 3 and 10 characters" }
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [3, 10], msg: "Lastname length must be between 3 and 10 characters" }
        }
      },
      role: { type: DataTypes.STRING, allowNull: false, defaultValue: "developer" },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: { args: [0], msg: "Salary must be non‑negative" }
        }
      },
      birthyear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: { args: [1900], msg: "Birth year should not be before 1900" }
        }
      }
    },
    { tableName: "Employees" }
  );

  return Employee;
};
```

### src/models/user.js

```javascript
// src/models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: { msg: "User email must be a valid e‑mail address" } }
      }
    },
    { tableName: "Users" }
  );

  return User;
};
```

### src/models/contact.js

```javascript
// src/models/contact.js
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING }
      // foreign key userId va fi adăugată prin asociere
    },
    { tableName: "Contacts" }
  );

  return Contact;
};
```

### src/models/tag.js

```javascript
// src/models/tag.js
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    { tableName: "Tags" }
  );

  return Tag;
};
```

### src/models/index.js

```javascript
// src/models/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Employee = require("./employee")(sequelize, DataTypes);
const User = require("./user")(sequelize, DataTypes);
const Contact = require("./contact")(sequelize, DataTypes);
const Tag = require("./tag")(sequelize, DataTypes);

// One‑to‑many: User -> Contact
User.hasMany(Contact, { foreignKey: "userId", as: "contacts" });
Contact.belongsTo(User, { foreignKey: "userId", as: "user" });

// Many‑to‑many: Contact <-> Tag (through ContactTags)
Contact.belongsToMany(Tag, {
  through: "ContactTags",
  foreignKey: "contactId",
  otherKey: "tagId",
  as: "tags"
});
Tag.belongsToMany(Contact, {
  through: "ContactTags",
  foreignKey: "tagId",
  otherKey: "contactId",
  as: "contacts"
});

module.exports = {
  sequelize,
  Employee,
  User,
  Contact,
  Tag
};
```

### src/routes/employees.js

```javascript
// src/routes/employees.js
const express = require("express");
const { Op } = require("sequelize");
const { Employee } = require("../models");

const router = express.Router();

function handleSequelizeError(res, err) {
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: err.errors.map((e) => e.message)
    });
  }
  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
}

/**
 * GET /api/employees
 * - listare
 * - filtrare (name, minSalary)
 * - proiecții (simplified)
 * - sortare (sort)
 */
router.get("/employees", async (req, res) => {
  try {
    const { name, minSalary, simplified, sort } = req.query;

    const where = {};
    const options = { where };

    if (name) {
      where.firstname = { [Op.like]: `%${name}%` };
    }

    if (minSalary !== undefined) {
      const value = Number(minSalary);
      if (!Number.isNaN(value)) where.salary = { [Op.gte]: value };
    }

    if (simplified === "true") {
      options.attributes = ["id", "firstname", "lastname", "salary"];
    }

    if (sort) {
      const allowed = ["salary", "firstname", "lastname"];
      if (allowed.includes(sort)) options.order = [[sort, "ASC"]];
    }

    const employees = await Employee.findAll(options);
    return res.status(200).json(employees);
  } catch (err) {
    return handleSequelizeError(res, err);
  }
});

/** POST /api/employees – creare */
router.post("/employees", async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    return res.status(201).json(newEmployee);
  } catch (err) {
    return handleSequelizeError(res, err);
  }
});

/** GET /api/employees/:id – căutare după ID */
router.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: `Employee with id ${req.params.id} not found` });
    return res.status(200).json(employee);
  } catch (err) {
    return handleSequelizeError(res, err);
  }
});

/** PUT /api/employees/:id – actualizare după ID */
router.put("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: `Employee with id ${req.params.id} not found` });

    const updated = await employee.update(req.body);
    return res.status(200).json(updated);
  } catch (err) {
    return handleSequelizeError(res, err);
  }
});

/** DELETE /api/employees/:id – ștergere după ID */
router.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) return res.status(404).json({ error: `Employee with id ${req.params.id} not found` });

    await employee.destroy();
    return res.status(204).send();
  } catch (err) {
    return handleSequelizeError(res, err);
  }
});

module.exports = router;
```

### src/routes/relationships.js

```javascript
// src/routes/relationships.js
const express = require("express");
const { User, Contact, Tag, sequelize } = require("../models");

const router = express.Router();

/** GET /api/relationships/users-with-contacts – eager loading pe 2 nivele */
router.get("/users-with-contacts", async (_req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Contact,
          as: "contacts",
          include: [{ model: Tag, as: "tags" }]
        }
      ]
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/** GET /api/relationships/contacts-with-tags – many‑to‑many */
router.get("/contacts-with-tags", async (_req, res) => {
  try {
    const contacts = await Contact.findAll({
      include: [{ model: Tag, as: "tags" }]
    });
    return res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/** GET /api/relationships/export-json – export „plat" */
router.get("/export-json", async (_req, res) => {
  try {
    const ContactTags = sequelize.models.ContactTags; // through model creat automat

    const [users, contacts, tags, contactTags] = await Promise.all([
      User.findAll({ raw: true }),
      Contact.findAll({ raw: true }),
      Tag.findAll({ raw: true }),
      ContactTags ? ContactTags.findAll({ raw: true }) : []
    ]);

    return res.status(200).json({ users, contacts, tags, contactTags });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
```

### src/server/api-server.js

```javascript
// src/server/api-server.js
const express = require("express");
const { sequelize, User, Contact, Tag } = require("../models");
const employeeRoutes = require("../routes/employees");
const relationshipsRoutes = require("../routes/relationships");

const app = express();
const PORT = 3001;

app.use(express.json());

// health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Seminar 9 API is running" });
});

// rute API
app.use("/api", employeeRoutes);
app.use("/api/relationships", relationshipsRoutes);

// seed minimal pentru relații (date demo)
async function seedRelationshipsDemoData() {
  const count = await User.count();
  if (count > 0) return;

  const alice = await User.create({ name: "Alice", email: "alice@example.com" });
  const bob = await User.create({ name: "Bob", email: "bob@example.com" });

  const charlie = await Contact.create({ name: "Charlie", phone: "111-222", email: "charlie@abc.com", userId: alice.id });
  const dave = await Contact.create({ name: "Dave", phone: "333-444", email: "dave@abc.com", userId: alice.id });
  const eve = await Contact.create({ name: "Eve", phone: "555-666", email: "eve@xyz.com", userId: bob.id });

  const friendTag = await Tag.create({ name: "friend" });
  const workTag = await Tag.create({ name: "work" });

  await charlie.addTags([friendTag, workTag]);
  await dave.addTag(workTag);
  await eve.addTag(friendTag);
}

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync();
    console.log("Models were synchronised.");

    await seedRelationshipsDemoData();
    console.log("Demo data for relationships ensured.");

    app.listen(PORT, () => {
      console.log(`API server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to start API server:", err);
  }
}

start();

module.exports = app;
```

### src/server/docs-server.js

```javascript
// src/server/docs-server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const publicDir = path.join(__dirname, "..", "..", "public");
app.use(express.static(publicDir));

app.listen(PORT, () => {
  console.log(`Docs server available at http://localhost:${PORT}`);
});
```

### public/styles.css

```css
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  margin: 2rem auto;
  max-width: 960px;
  line-height: 1.6;
}

h1, h2, h3 {
  font-weight: 600;
}

nav {
  margin-bottom: 1.5rem;
}

nav a {
  margin-right: 0.75rem;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

code {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
}

pre code {
  display: block;
  padding: 1rem;
  overflow-x: auto;
}
```

### public/index.html

```html
<!doctype html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <title>Seminar 9 – Persistență cu ORM (Sequelize + SQLite)</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <h1>Seminar 9 – Persistență cu ORM (Sequelize + SQLite)</h1>

    <p>
      Acest starterkit reunește exemplul cu entitatea <code>Employee</code> (pașii 1–6, CRUD + filtrare + proiecții)
      și segmentul despre relații (User–Contact–Tag) cu eager loading și export JSON.
    </p>

    <nav>
      <strong>Pași introductivi (Employee + SQLite):</strong><br />
      <a href="/steps/step1.html">Pasul 1 – Conectarea la baza de date</a>
      <a href="/steps/step2.html">Pasul 2 – Definirea entității</a>
      <a href="/steps/step3.html">Pasul 3 – Operații GET/POST</a>
      <a href="/steps/step4.html">Pasul 4 – Operații pe ID</a>
      <a href="/steps/step5.html">Pasul 5 – Selecții (filtrare)</a>
      <a href="/steps/step6.html">Pasul 6 – Proiecții și sortare</a>
    </nav>

    <nav>
      <strong>Segment avansat:</strong><br />
      <a href="/segment9-relationships.html">
        Segment 9 – Relații în Sequelize (one‑to‑many, many‑to‑many, eager loading)
      </a>
    </nav>

    <nav>
      <strong>Instrumente:</strong><br />
      <a href="/postman.html">Cum testăm API‑ul cu Postman</a>
    </nav>

    <p>
      API: <code>http://localhost:3001</code> &nbsp; | &nbsp; Documentație: <code>http://localhost:3000</code>
    </p>
  </body>
</html>
```

---

## Bibliografie

- Kore, P. P., Lohar, M. J., Surve, M. T., & Jadhav, S. (2022). API testing using Postman tool. *International Journal for Research in Applied Science & Engineering Technology, 10*(12), 841–843. https://doi.org/10.22214/ijraset.2022.48030

- Lorenz, M., Lohmann, M., Grunske, L., & Zimmermann, O. (2016). Object‑relational mapping revised: A guideline review and consolidation. In *Proceedings of the 11th International Joint Conference on Software Technologies* (pp. 157–168). SCITEPRESS. https://doi.org/10.5220/0005974201570168

- Torres, A., Galante, R., Pimenta, M. S., & Martins, A. J. B. (2017). Twenty years of object‑relational mapping: A survey on patterns, solutions, and their implications on application design. *Information and Software Technology, 82*, 1–18. https://doi.org/10.1016/j.infsof.2016.09.009

---

## Licență și utilizare

Acest proiect este destinat **exclusiv scopurilor didactice** în cadrul Seminarului 9 – Persistență cu ORM, organizat la Facultatea de Cibernetică, Statistică și Informatică Economică (ASE București).

**Autor:** Revolvix  
**An academic:** 2025-2026  
**Ultima actualizare:** Noiembrie 2025
