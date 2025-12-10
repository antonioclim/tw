# 💾 S9 — Persistență cu ORM (Sequelize + SQLite)

> **Seminar S9** | Curs de Tehnologii Web | ASE-CSIE  
> De la API-uri în memorie la persistență reală cu baze de date

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S9-Teorie](#s9-teorie)
  - [S9-Laborator](#s9-laborator)
  - [S9-Appendix](#s9-appendix)
- [Cei 6 pași de învățare](#-cei-6-pași-de-învățare)
- [Modelele de date](#-modelele-de-date)
- [Relații în Sequelize](#-relații-în-sequelize)
- [Arhitectura proiectului](#-arhitectura-proiectului)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Testare cu Postman](#-testare-cu-postman)
- [Concepte cheie](#-concepte-cheie)
- [Exerciții propuse](#-exerciții-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S9 face **tranziția de la date în memorie la persistență reală** folosind un **ORM (Object-Relational Mapping)**. Construim pe fundamentele din S8 (Express.js + REST) și adăugăm **Sequelize** cu **SQLite** pentru stocarea permanentă a datelor.

### Ce vei învăța:

| Modul | Concept | Rezultat |
|-------|---------|----------|
| **Pasul 1** | Conectare la baza de date | `sequelize.authenticate()` |
| **Pasul 2** | Definirea modelelor | Schema `Employee` cu validări |
| **Pasul 3** | Operații GET/POST | `findAll()`, `create()` |
| **Pasul 4** | Operații pe ID | `findByPk()`, `update()`, `destroy()` |
| **Pasul 5** | Filtrare cu `Op` | Query parameters + `where` |
| **Pasul 6** | Proiecții și sortare | `attributes`, `order` |
| **Avansat** | Relații ORM | One-to-many, Many-to-many, Eager loading |

### Schema de porturi

```
┌─────────────────────────────────────────────────────────────┐
│                    ARHITECTURĂ SEMINAR                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Terminal 1:                    Terminal 2:                │
│   ┌─────────────────┐           ┌─────────────────┐        │
│   │   npm run api   │           │  npm run docs   │        │
│   │ (api-server.js) │           │(docs-server.js) │        │
│   │                 │           │                 │        │
│   │  PORT 3001      │           │  PORT 3000      │        │
│   │  ───────────    │           │  ───────────    │        │
│   │  • /health      │           │  • index.html   │        │
│   │  • /api/employees           │  • steps/*.html │        │
│   │  • /api/relationships       │  • postman.html │        │
│   └────────┬────────┘           └─────────────────┘        │
│            │                                                │
│            ▼                                                │
│   ┌─────────────────┐                                      │
│   │   SQLite DB     │                                      │
│   │ seminar9.sqlite │                                      │
│   └─────────────────┘                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Structura repository-ului

```
S9/
├── 📂 S9-Teorie/                                           # Materiale teoretice
│   └── 📄 C S9 (curs-teorie) Persistența datelor...docx        # Documentație ORM completă
│
├── 📂 S9-Laborator/                                        # Kit-ul principal
│   ├── 📄 B S9nextlabVideos...docx                             # Ghid video pas-cu-pas
│   └── 📦 S9nextlabkitV1-6.zip                                 # ⭐ Kit 6 pași progresivi
│       ├── S9v1/  →  Conectare la baza de date
│       ├── S9v2/  →  Definirea modelului Employee
│       ├── S9v3/  →  Rute GET/POST
│       ├── S9v4/  →  Operații pe ID
│       ├── S9v5/  →  Filtrare cu Op.gt
│       └── S9v6/  →  Proiecții (attributes)
│
└── 📂 S9-Appendix/                                         # Starterkit complet + materiale
    ├── 📄 A S9climkit (cheat sheet)...docx                     # Cheat sheet laborator
    ├── 📄 B S9nextlabVideos...docx                             # Ghid video
    ├── 📄 C S9 (curs-teorie)...docx                            # Teorie extinsă
    ├── 📄 README.md                                            # README detaliat (900+ linii)
    └── 📦 starterkit9clim.zip                                  # ⭐ Proiect complet funcțional
        ├── package.json
        ├── data/
        │   └── seminar9.sqlite                                 # Baza de date SQLite
        ├── src/
        │   ├── config/
        │   │   └── database.js                                 # Configurare Sequelize
        │   ├── models/
        │   │   ├── index.js                                    # Agregator + asocieri
        │   │   ├── employee.js                                 # Model Employee
        │   │   ├── user.js                                     # Model User
        │   │   ├── contact.js                                  # Model Contact
        │   │   └── tag.js                                      # Model Tag
        │   ├── routes/
        │   │   ├── employees.js                                # CRUD Employee
        │   │   └── relationships.js                            # Eager loading
        │   └── server/
        │       ├── api-server.js                               # Server API (port 3001)
        │       └── docs-server.js                              # Server docs (port 3000)
        └── public/
            ├── index.html                                      # Pagina principală
            ├── styles.css                                      # Stiluri
            └── steps/
                ├── step1.html → step6.html                     # Documentație pași
                ├── segment9-relationships.html                 # Documentație relații
                └── postman.html                                # Ghid Postman
```

---

## 📚 Conținutul detaliat

### S9-Teorie

| Document | Conținut |
|----------|----------|
| **Persistența datelor în baze de date cu un ORM** | Ce este ORM, Sequelize vs alte ORM-uri, SQLite ca bază de dezvoltare, tipuri de date, validări, asocieri |

**Subiecte acoperite:**
- Object-Relational Mapping (ORM) — concept și beneficii
- Sequelize — configurare, modele, validări
- SQLite — bază de date embedded
- Operații CRUD cu Sequelize
- Relații: One-to-One, One-to-Many, Many-to-Many
- Eager loading vs Lazy loading

---

### S9-Laborator

Kit-ul principal conține **6 foldere progresive** (S9v1 → S9v6), fiecare adăugând un concept nou:

| Folder | Fișiere | Concept nou |
|--------|---------|-------------|
| `S9v1/` | `index.js`, `sequelize.js` | Conexiune Sequelize |
| `S9v2/` | + `models/employee.js` | Definire model |
| `S9v3/` | + `routes/employees.js` | GET/POST |
| `S9v4/` | + `employees.js` actualizat | GET/PUT/DELETE pe `:id` |
| `S9v5/` | + filtrare | `Op.gt` pentru salary |
| `S9v6/` | + proiecții | `attributes: [...]` |

---

### S9-Appendix

| Fișier | Descriere |
|--------|-----------|
| `starterkit9clim.zip` | **Proiect complet** cu toate modelele și relațiile |
| `README.md` | Documentație exhaustivă (900+ linii) cu cod complet |
| `A S9climkit...docx` | Cheat sheet pentru laborator |
| `B S9nextlabVideos...docx` | Ghid pentru videoclipuri |

---

## 🎯 Cei 6 pași de învățare

### Vizualizare progresie

```
Pas 1           Pas 2           Pas 3           Pas 4
┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│ Sequelize  │→ │  Definire  │→ │    GET     │→ │  GET/:id   │
│ .authenticate│ │   Model    │  │    POST    │  │  PUT/:id   │
│            │  │  Employee  │  │  /employees│  │ DELETE/:id │
└────────────┘  └────────────┘  └────────────┘  └────────────┘

Pas 5           Pas 6           Segment Avansat
┌────────────┐  ┌────────────┐  ┌────────────────────────┐
│  Filtrare  │→ │ Proiecții  │→ │      RELAȚII           │
│   Op.gt    │  │ attributes │  │  User → Contact → Tag  │
│  ?minSalary│  │ ?simplified│  │    Eager Loading       │
└────────────┘  └────────────┘  └────────────────────────┘
```

---

### 📘 Pasul 1 — Conectarea la baza de date

**Obiectiv:** Validăm infrastructura — Sequelize se conectează la SQLite.

```javascript
// src/config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/seminar9.sqlite",
  logging: false  // dezactivăm logarea SQL în consolă
});

module.exports = sequelize;
```

```javascript
// api-server.js
const sequelize = require("./config/database");

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    // ...
  } catch (err) {
    console.error("Unable to connect:", err);
  }
}
```

**Testare:**
```
GET http://localhost:3001/health
→ { "status": "ok", "message": "Seminar 9 API is running" }
```

---

### 📘 Pasul 2 — Definirea entității și sincronizarea

**Obiectiv:** Definim modelul `Employee` cu validări Sequelize.

```javascript
// src/models/employee.js
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 10],
          msg: "Firstname must be 3-10 characters"
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 10]
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "developer"
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Salary must be non-negative"
        }
      }
    },
    birthyear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900
      }
    }
  }, {
    tableName: "Employees"
  });

  return Employee;
};
```

**Sincronizare:**
```javascript
await sequelize.sync();  // Creează tabelele dacă nu există
// sau
await sequelize.sync({ force: true });  // Recreează (DROP + CREATE)
```

---

### 📘 Pasul 3 — Operații GET și POST

**Obiectiv:** API REST pentru listare și creare.

```javascript
// src/routes/employees.js
const express = require("express");
const router = express.Router();
const { Employee } = require("../models");

// GET /api/employees — listare completă
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// POST /api/employees — creare
router.post("/employees", async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    return res.status(201).json(newEmployee);
  } catch (err) {
    // Gestionare erori de validare Sequelize
    if (err.name === "SequelizeValidationError") {
      const messages = err.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

---

### 📘 Pasul 4 — Operații pe ID (CRUD complet)

**Obiectiv:** GET, PUT, DELETE pe un singur angajat.

```javascript
// GET /api/employees/:id
router.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ 
        error: `Employee with id ${req.params.id} not found` 
      });
    }
    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// PUT /api/employees/:id
router.put("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Not found" });
    }
    const updated = await employee.update(req.body);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE /api/employees/:id
router.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Not found" });
    }
    await employee.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
```

---

### 📘 Pasul 5 — Filtrare cu operatori Sequelize

**Obiectiv:** Query parameters pentru filtrare dinamică.

```javascript
const { Op } = require("sequelize");

router.get("/employees", async (req, res) => {
  try {
    const { minSalary, role } = req.query;
    const where = {};

    // Filtrare după salary minim
    if (minSalary) {
      where.salary = { [Op.gt]: Number(minSalary) };
    }

    // Filtrare după rol (match exact)
    if (role) {
      where.role = role;
    }

    const employees = await Employee.findAll({ where });
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
```

**Testare:**
```
GET http://localhost:3001/api/employees?minSalary=3000
GET http://localhost:3001/api/employees?role=developer
GET http://localhost:3001/api/employees?minSalary=2000&role=manager
```

**Operatori Sequelize frecvenți:**

| Operator | SQL echivalent | Exemplu |
|----------|----------------|---------|
| `Op.gt` | `>` | `{ salary: { [Op.gt]: 3000 } }` |
| `Op.gte` | `>=` | `{ salary: { [Op.gte]: 3000 } }` |
| `Op.lt` | `<` | `{ age: { [Op.lt]: 30 } }` |
| `Op.lte` | `<=` | `{ age: { [Op.lte]: 30 } }` |
| `Op.eq` | `=` | `{ role: { [Op.eq]: "dev" } }` |
| `Op.ne` | `!=` | `{ role: { [Op.ne]: "intern" } }` |
| `Op.like` | `LIKE` | `{ name: { [Op.like]: "%Ana%" } }` |
| `Op.in` | `IN` | `{ id: { [Op.in]: [1, 2, 3] } }` |

---

### 📘 Pasul 6 — Proiecții și sortare

**Obiectiv:** Selectarea câmpurilor și ordonarea rezultatelor.

```javascript
router.get("/employees", async (req, res) => {
  try {
    const { simplified, sortBy, order } = req.query;
    const query = {};

    // Proiecție: doar anumite câmpuri
    if (simplified === "true") {
      query.attributes = ["firstname", "lastname"];
    }

    // Excludere câmpuri
    // query.attributes = { exclude: ["salary", "birthyear"] };

    // Sortare
    if (sortBy) {
      query.order = [[sortBy, order === "desc" ? "DESC" : "ASC"]];
    }

    const employees = await Employee.findAll(query);
    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
```

**Testare:**
```
GET http://localhost:3001/api/employees?simplified=true
→ [{ "firstname": "Ana", "lastname": "Ionescu" }, ...]

GET http://localhost:3001/api/employees?sortBy=salary&order=desc
→ Angajații sortați descrescător după salariu
```

---

## 💾 Modelele de date

### Employee (entitatea principală)

```javascript
Employee {
  id: INTEGER (PK, auto)
  firstname: STRING (not null, 3-10 chars)
  lastname: STRING (not null, 3-10 chars)
  role: STRING (not null, default: "developer")
  salary: INTEGER (not null, default: 0, min: 0)
  birthyear: INTEGER (nullable, min: 1900)
  createdAt: DATE (auto)
  updatedAt: DATE (auto)
}
```

### User, Contact, Tag (pentru relații)

```javascript
User {
  id: INTEGER (PK)
  name: STRING (not null)
  email: STRING (not null, unique, isEmail)
}

Contact {
  id: INTEGER (PK)
  name: STRING (not null)
  phone: STRING
  email: STRING
  userId: INTEGER (FK → User)
}

Tag {
  id: INTEGER (PK)
  name: STRING (not null)
}

ContactTags {  // Tabelă de legătură (auto-generată)
  contactId: INTEGER (FK → Contact)
  tagId: INTEGER (FK → Tag)
}
```

---

## 🔗 Relații în Sequelize

### One-to-Many: User → Contact

```javascript
// Un User are multe Contacts
User.hasMany(Contact, {
  foreignKey: "userId",
  as: "contacts"
});

// Un Contact aparține unui User
Contact.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});
```

### Many-to-Many: Contact ↔ Tag

```javascript
// Un Contact poate avea multe Tags
Contact.belongsToMany(Tag, {
  through: "ContactTags",  // Tabela de legătură
  foreignKey: "contactId",
  otherKey: "tagId",
  as: "tags"
});

// Un Tag poate fi asociat mai multor Contacts
Tag.belongsToMany(Contact, {
  through: "ContactTags",
  foreignKey: "tagId",
  otherKey: "contactId",
  as: "contacts"
});
```

### Eager Loading (încărcare asocieri)

```javascript
// GET /api/relationships/users-with-contacts
router.get("/users-with-contacts", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Contact,
        as: "contacts",
        include: [{ model: Tag, as: "tags" }]  // 2 nivele de include
      }
    ]
  });
  return res.json(users);
});
```

**Rezultat:**
```json
[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "contacts": [
      {
        "id": 1,
        "name": "Charlie",
        "phone": "111-222",
        "tags": [
          { "id": 1, "name": "friend" },
          { "id": 2, "name": "work" }
        ]
      }
    ]
  }
]
```

---

## 🏗️ Arhitectura proiectului

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                  │
│                  (Browser / Postman / curl)                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTP Request
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      EXPRESS APP                                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    MIDDLEWARE                            │   │
│  │   express.json() → Logging → Routes → Error Handler      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────┐     ┌─────────────────────────────┐       │
│  │    /api/        │     │   /api/relationships/       │       │
│  │   employees     │     │                             │       │
│  │                 │     │  users-with-contacts        │       │
│  │  GET    /       │     │  contacts-with-tags         │       │
│  │  POST   /       │     │  export-json                │       │
│  │  GET    /:id    │     │                             │       │
│  │  PUT    /:id    │     └─────────────────────────────┘       │
│  │  DELETE /:id    │                                           │
│  └────────┬────────┘                                           │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    SEQUELIZE ORM                         │   │
│  │   ┌──────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │   │
│  │   │ Employee │  │  User   │  │ Contact │  │   Tag   │   │   │
│  │   └────┬─────┘  └────┬────┘  └────┬────┘  └────┬────┘   │   │
│  │        │             │            │            │         │   │
│  │        │       hasMany│      belongsTo    belongsToMany  │   │
│  │        │             └─────►◄─────┘            │         │   │
│  │        │                         ◄─────────────┘         │   │
│  └────────┼─────────────────────────────────────────────────┘   │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    SQLite DATABASE                       │   │
│  │                   seminar9.sqlite                        │   │
│  │                                                          │   │
│  │   Employees │ Users │ Contacts │ Tags │ ContactTags     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📈 Ghid de parcurgere

### Pentru începători (3-4 ore)

```
1. Citește documentul DOCX din S9-Teorie
       ↓
2. Dezarhivează S9nextlabkitV1-6.zip
       ↓
3. Parcurge S9v1 → S9v6 în ordine
       ↓
4. Pentru fiecare pas:
   • Citește codul
   • Rulează cu: node index.js
   • Testează în Postman
       ↓
5. După pasul 6, dezarhivează starterkit9clim.zip
       ↓
6. Studiază relațiile (User-Contact-Tag)
```

### Pentru avansați (1-2 ore)

```
1. Dezarhivează direct starterkit9clim.zip
       ↓
2. npm install && npm run api
       ↓
3. Testează /api/relationships/* în Postman
       ↓
4. Studiază models/index.js (asocierile)
       ↓
5. Implementează o nouă entitate cu relații
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune | Observații |
|------------|----------|------------|
| Node.js | 18+ | Runtime JavaScript |
| npm | 9+ | Package manager |
| Express | 4.21+ | Framework web |
| Sequelize | 6.37+ | ORM |
| sqlite3 | 5.1+ | Driver SQLite |
| Postman | Latest | Testare API |

### Instalare dependențe

```bash
npm install express sequelize sqlite3
```

---

## 🚀 Rulare rapidă

### Varianta 1: Kit-ul progresiv (S9v1-S9v6)

```bash
# Dezarhivare
unzip S9nextlabkitV1-6.zip

# Navigare la un pas specific
cd S9v1

# Instalare dependențe
npm install

# Rulare
node index.js
# → Server started on http://localhost:7000
```

### Varianta 2: Starterkit complet

```bash
# Dezarhivare
unzip starterkit9clim.zip
cd nextlab-seminar9

# Instalare
npm install

# Terminal 1: Server API (port 3001)
npm run api

# Terminal 2: Server documentație (port 3000)
npm run docs

# Verificare
# Browser: http://localhost:3000 (documentație)
# Postman: http://localhost:3001/health
```

---

## 🧪 Testare cu Postman

### Health Check

```
GET http://localhost:3001/health

Response: 200 OK
{
  "status": "ok",
  "message": "Seminar 9 API is running"
}
```

### GET All Employees

```
GET http://localhost:3001/api/employees

Response: 200 OK
[
  {
    "id": 1,
    "firstname": "Ana",
    "lastname": "Ionescu",
    "role": "developer",
    "salary": 3500,
    "birthyear": 1995
  }
]
```

### POST Employee

```
POST http://localhost:3001/api/employees
Content-Type: application/json

{
  "firstname": "Ion",
  "lastname": "Popescu",
  "role": "manager",
  "salary": 5000,
  "birthyear": 1985
}

Response: 201 Created
{
  "id": 2,
  "firstname": "Ion",
  "lastname": "Popescu",
  ...
}
```

### POST cu validare eșuată

```
POST http://localhost:3001/api/employees
Content-Type: application/json

{
  "firstname": "AB",
  "lastname": "CD"
}

Response: 400 Bad Request
{
  "errors": [
    "Firstname must be 3-10 characters",
    "Lastname must be 3-10 characters"
  ]
}
```

### Filtrare

```
GET http://localhost:3001/api/employees?minSalary=4000

Response: 200 OK
[angajații cu salary > 4000]
```

### Eager Loading

```
GET http://localhost:3001/api/relationships/users-with-contacts

Response: 200 OK
[
  {
    "id": 1,
    "name": "Alice",
    "contacts": [
      {
        "name": "Charlie",
        "tags": [{"name": "friend"}, {"name": "work"}]
      }
    ]
  }
]
```

---

## 🧠 Concepte cheie

### ORM vs SQL direct

| Aspect | SQL direct | Sequelize ORM |
|--------|------------|---------------|
| Sintaxă | `SELECT * FROM Employees` | `Employee.findAll()` |
| Tipare | Strings SQL | Obiecte JavaScript |
| Validare | Manual | Automat (model) |
| Relații | JOINs manual | `include: [...]` |
| Securitate | Vulnerabil la SQL injection | Parametrizat automat |

### Validări Sequelize

```javascript
validate: {
  // Built-in validators
  isEmail: true,
  isUrl: true,
  isIP: true,
  isAlpha: true,
  isNumeric: true,
  isInt: true,
  isFloat: true,
  isDate: true,
  isUUID: 4,
  
  // Range validators
  len: [3, 10],
  min: 0,
  max: 100,
  
  // Custom validator
  isEven(value) {
    if (value % 2 !== 0) {
      throw new Error("Value must be even");
    }
  }
}
```

### Hooks Sequelize

```javascript
const Employee = sequelize.define("Employee", {...}, {
  hooks: {
    beforeCreate: (employee) => {
      employee.firstname = employee.firstname.trim();
    },
    afterCreate: (employee) => {
      console.log(`Employee ${employee.id} created`);
    }
  }
});
```

---

## 📝 Exerciții propuse

### Nivel 1 — Înțelegere

1. **Testează CRUD complet** pe Employee folosind Postman.

2. **Adaugă un câmp nou** `department` la Employee și actualizează validările.

3. **Creează un angajat invalid** și observă mesajele de eroare Sequelize.

### Nivel 2 — Aplicare

4. **Implementează paginare**:
   ```javascript
   GET /api/employees?page=1&limit=10
   // Hint: findAll({ offset, limit })
   ```

5. **Adaugă căutare text** după firstname sau lastname:
   ```javascript
   GET /api/employees?search=Ion
   // Hint: Op.like cu `%${search}%`
   ```

6. **Creează o nouă entitate `Project`** cu CRUD complet.

### Nivel 3 — Sinteză

7. **Implementează relația Employee ↔ Project** (Many-to-Many).

8. **Adaugă soft delete** (nu șterge fizic, doar marchează `deletedAt`):
   ```javascript
   // Hint: paranoid: true în model
   ```

9. **Creează un endpoint de statistici**:
   ```javascript
   GET /api/employees/stats
   → { total: 50, avgSalary: 4200, byRole: {...} }
   ```

---

## 📚 Referințe

### Documentație oficială
- [Sequelize v6 Documentation](https://sequelize.org/docs/v6/)
- [Sequelize Model Definition](https://sequelize.org/docs/v6/core-concepts/model-basics/)
- [Sequelize Validations](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
- [Sequelize Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)

### SQLite
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [DB Browser for SQLite](https://sqlitebrowser.org/) — GUI pentru vizualizare

### Tutoriale
- [Sequelize Crash Course](https://www.youtube.com/watch?v=pxo7L5nd1gA)
- [REST API with Express + Sequelize](https://www.bezkoder.com/node-js-express-sequelize-mysql/)

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

---

<div align="center">

**💾 Material didactic pentru Seminarul S9**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția de la S8 la S9:**

```
S8 (Express + REST)              S9 (+ Sequelize + SQLite)
─────────────────────            ─────────────────────────
┌─────────────────┐              ┌─────────────────┐
│   Express API   │              │   Express API   │
│                 │              │        │        │
│  let books = [] │      →       │        ▼        │
│  (în memorie)   │              │   Sequelize ORM │
│                 │              │        │        │
│  Se pierd la    │              │        ▼        │
│  restart!       │              │   SQLite DB     │
└─────────────────┘              │  (persistent!)  │
                                 └─────────────────┘
```

---

**Diagrama relațiilor:**

```
┌─────────┐     1:N     ┌──────────┐     M:N     ┌─────────┐
│  User   │────────────▶│ Contact  │◀───────────▶│   Tag   │
└─────────┘             └──────────┘             └─────────┘
     │                       │                        │
     │                       │                        │
     ▼                       ▼                        ▼
 "Alice"              "Charlie"                  "friend"
 "Bob"                "Dave"                     "work"
                      "Eve"
```

</div>
