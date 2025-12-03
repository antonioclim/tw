# Laborator: Relații cu ORM (Sequelize) – Ghid Complet

## Cuprins

1. [Introducere și obiective](#1-introducere-și-obiective)
2. [Cerințe preliminare](#2-cerințe-preliminare)
3. [Instalare și pornire](#3-instalare-și-pornire)
4. [Structura proiectului](#4-structura-proiectului)
5. [Modelele și relațiile ORM](#5-modelele-și-relațiile-orm)
6. [Configurare Postman 11.72.9](#6-configurare-postman-11729)
7. [Experimentare pas cu pas](#7-experimentare-pas-cu-pas)
   - 7.1. Verificarea datelor inițiale
   - 7.2. Relația One-to-Many
   - 7.3. Operații CRUD pe Student
   - 7.4. Relația Many-to-Many
   - 7.5. Export și Import JSON
8. [Unelte SQLite pentru inspecție](#8-unelte-sqlite-pentru-inspecție)
9. [Întrebări de verificare](#9-întrebări-de-verificare)
10. [Depanare probleme frecvente](#10-depanare-probleme-frecvente)

---

## 1. Introducere și obiective

Acest laborator vă permite să experimentați practic conceptele de **relații ORM** folosind Sequelize, Express și SQLite. Spre deosebire de un proiect construit pas cu pas, aici aveți un **kit funcțional complet** pe care îl porniți și începeți imediat să testați.

### Ce veți învăța

La finalul laboratorului veți fi capabili să:

- Înțelegeți cum se definesc relațiile **One-to-Many** și **Many-to-Many** în Sequelize
- Folosiți opțiunea `include` pentru **încărcare anticipată** (eager loading)
- Efectuați operații **CRUD complete** (Create, Read, Update, Delete)
- Lucrați cu **tabele de legătură** pentru relații M:N
- Exportați și importați date în format JSON
- Inspectați baza de date SQLite cu unelte native

### De ce acest format?

În loc să scrieți codul de la zero (ceea ce ați făcut deja la cursuri anterioare), aici vă concentrați pe **înțelegerea comportamentului** unui ORM. Trimiteți cereri HTTP, observați răspunsurile, inspectați baza de date și faceți conexiunea între cod și efecte.

---

## 2. Cerințe preliminare

Înainte de a începe, asigurați-vă că aveți instalate:

| Software | Versiune recomandată | Verificare |
|----------|---------------------|------------|
| Node.js | 18.x sau 20.x LTS | `node --version` |
| npm | 9.x sau 10.x | `npm --version` |
| Postman | 11.72.9 (Desktop) | Despre → Versiune |
| Editor text | VS Code recomandat | - |

### Descărcare Node.js

Dacă nu aveți Node.js instalat:
1. Accesați https://nodejs.org/
2. Descărcați versiunea **LTS** (Long Term Support)
3. Instalați cu opțiunile implicite
4. Reporniți terminalul după instalare

### Descărcare Postman

1. Accesați https://www.postman.com/downloads/
2. Descărcați versiunea pentru Windows (Desktop App)
3. Instalați și creați un cont gratuit (sau folosiți modul offline)

---

## 3. Instalare și pornire

### Pasul 1: Dezarhivați kitul

Extrageți arhiva `S10vDEMO-lab.zip` într-o locație la alegere, de exemplu:

```
C:\Laborator\S10vDEMO-lab
```

sau

```
D:\TW\S10vDEMO-lab
```

### Pasul 2: Deschideți terminalul în directorul laboratorului

**Varianta A - din File Explorer:**
1. Navigați la folderul `S10vDEMO-lab`
2. Click dreapta în folder → „Open in Terminal" (sau „Deschide în Terminal")

**Varianta B - din VS Code:**
1. File → Open Folder → selectați `S10vDEMO-lab`
2. Terminal → New Terminal (sau `Ctrl + ~`)

**Varianta C - din PowerShell:**
```powershell
cd C:\Laborator\S10vDEMO-lab
```

### Pasul 3: Instalați dependențele

Rulați o singură dată:

```bash
npm install
```

**Ce se întâmplă:** npm descarcă și instalează pachetele din `package.json`:
- `express` - framework-ul web pentru crearea API-ului
- `sequelize` - ORM-ul pentru lucrul cu baza de date
- `sqlite3` - driverul pentru SQLite

Așteptați până se termină (poate dura 1-2 minute). Veți vedea un folder nou `node_modules`.

### Pasul 4: Porniți serverul

```bash
npm start
```

**Ce ar trebui să vedeți în terminal:**

```
S10vDEMO – laborator separat pornit pe http://localhost:3000
Pagini HTML: / (index), /demo-api.html, /postman.html, /sqlite-tools.html
API demo REST: prefix /api/ ...
Wrapper unelte SQLite: prefix /tools/...
```

**Ce s-a întâmplat în spate:**
1. Sequelize a creat fișierul `demo.db` (baza de date SQLite)
2. Au fost create tabelele: Universities, Students, Courses, Enrollments
3. Funcția de seed a populat baza cu date de test

### Pasul 5: Verificați în browser

Deschideți: http://localhost:3000/

Ar trebui să vedeți pagina de start a laboratorului cu linkuri către documentație.

---

## 4. Structura proiectului

```
S10vDEMO-lab/
│
├── package.json        ← Configurare npm și dependențe
├── server.js           ← Serverul Express cu toate rutele API
├── db.js               ← Definirea modelelor și relațiilor Sequelize
├── demo.db             ← Baza de date SQLite (creată la pornire)
│
├── web/                ← Pagini HTML de documentație
│   ├── index.html
│   ├── demo-api.html
│   ├── postman-ghid-complet.html   ← Ghid detaliat Postman
│   └── sqlite-tools.html
│
├── tools/              
│   └── sqlite/         ← Utilitare SQLite pentru Windows
│       ├── sqlite3.exe
│       ├── sqldiff.exe
│       └── sqlite3_analyzer.exe
│
└── README.md           ← Acest fișier
```

### Fișierele importante pentru înțelegere

**`db.js`** - Aici sunt definite modelele și relațiile:

```javascript
// Relații One-to-Many
University.hasMany(Student, { foreignKey: 'universityId' });
Student.belongsTo(University, { foreignKey: 'universityId' });

// Relații Many-to-Many (prin tabelă de legătură)
Student.belongsToMany(Course, { through: Enrollment, foreignKey: 'studentId' });
Course.belongsToMany(Student, { through: Enrollment, foreignKey: 'courseId' });
```

**`server.js`** - Aici sunt rutele API care folosesc modelele.

---

## 5. Modelele și relațiile ORM

### Diagrama Entități-Relații

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ┌──────────────┐         1:N         ┌──────────────┐       │
│    │  University  │◄────────────────────│   Student    │       │
│    │──────────────│                     │──────────────│       │
│    │ id           │                     │ id           │       │
│    │ name         │                     │ firstName    │       │
│    │ city         │                     │ lastName     │       │
│    └──────┬───────┘                     │ universityId │───────┤
│           │                             └───────┬──────┘       │
│           │ 1:N                                 │              │
│           │                                     │ M:N          │
│           ▼                                     │              │
│    ┌──────────────┐                             │              │
│    │   Course     │                             │              │
│    │──────────────│         ┌───────────────────┘              │
│    │ id           │         │                                  │
│    │ title        │         ▼                                  │
│    │ semester     │  ┌──────────────┐                          │
│    │ universityId │  │  Enrollment  │  (tabelă de legătură)    │
│    └──────────────┘  │──────────────│                          │
│                      │ studentId    │                          │
│                      │ courseId     │                          │
│                      │ grade        │                          │
│                      └──────────────┘                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Datele populate automat

La pornirea serverului, baza conține:

**Universități:**
| id | name | city |
|----|------|------|
| 1 | UPB | București |
| 2 | UVT | Timișoara |

**Studenți:**
| id | firstName | lastName | universityId |
|----|-----------|----------|--------------|
| 1 | Ana | Ionescu | 1 (UPB) |
| 2 | Mihai | Popescu | 1 (UPB) |
| 3 | Ioana | Dobre | 2 (UVT) |
| 4 | Dan | Georgescu | 2 (UVT) |

**Cursuri:**
| id | title | semester | universityId |
|----|-------|----------|--------------|
| 1 | Tehnologii Web | Sem I | 1 (UPB) |
| 2 | Baze de date | Sem I | 1 (UPB) |
| 3 | Introducere în AI | Sem II | 2 (UVT) |

**Înscrieri (Enrollments):**
| studentId | courseId | grade |
|-----------|----------|-------|
| 1 (Ana) | 1 (TW) | 10 |
| 1 (Ana) | 2 (BD) | 9 |
| 2 (Mihai) | 2 (BD) | 8 |
| 3 (Ioana) | 1 (TW) | 9 |
| 4 (Dan) | 3 (AI) | 10 |

---

## 6. Configurare Postman 11.72.9

Postman este instrumentul pe care îl vom folosi pentru a trimite cereri HTTP către API. Configurarea corectă este esențială pentru un flux de lucru eficient.

### 6.1. Crearea Environment-ului

**De ce avem nevoie de Environment?**

Environment-ul ne permite să folosim variabile (precum `{{baseUrl}}`) în loc de URL-uri complete. Astfel, dacă schimbăm portul sau trecem la un server de producție, modificăm doar într-un singur loc.

**Pași de configurare:**

1. **Deschideți Postman** (aplicația desktop, nu versiunea web)

2. **Accesați panoul Environments:**
   - În bara laterală stângă, căutați iconița **„Environments"** (arată ca un ochi stilizat)
   - Alternativ: `Ctrl + Alt + E`

3. **Creați un Environment nou:**
   - Click pe butonul **„+"** sau **„Create Environment"**
   - În câmpul de nume din partea de sus, scrieți: `S10vDEMO-local`

4. **Adăugați variabila `baseUrl`:**
   
   În tabelul de variabile, completați prima linie astfel:
   
   | VARIABLE | TYPE | INITIAL VALUE | CURRENT VALUE |
   |----------|------|---------------|---------------|
   | baseUrl | default | http://localhost:3000/api | http://localhost:3000/api |

5. **Salvați:** Click pe **„Save"** sau `Ctrl + S`

6. **Activați Environment-ul:**
   - În **colțul din dreapta-sus** al ferestrei Postman, găsiți dropdown-ul care arată „No Environment"
   - Click pe el și selectați **„S10vDEMO-local"**
   - Acum ar trebui să vedeți „S10vDEMO-local" afișat

**Verificare:** Dacă scrieți `{{baseUrl}}` în URL-ul unui request și țineți mouse-ul deasupra, ar trebui să vedeți valoarea `http://localhost:3000/api`.

### 6.2. Crearea Colecției

O colecție grupează toate request-urile pentru un proiect.

1. **În sidebar**, click pe tab-ul **„Collections"** (iconița cu foldere)
2. Click pe **„+"** sau **„Create Collection"**
3. Denumiți colecția: `S10vDEMO - Relații ORM`
4. Apăsați `Enter`

### 6.3. Crearea folderelor pentru organizare

Click dreapta pe colecția creată → **„Add Folder"**. Creați:

1. `1. Setup și Verificare`
2. `2. One-to-Many`
3. `3. CRUD Students`
4. `4. Many-to-Many`
5. `5. Export-Import`

### 6.4. Cum se creează un Request

1. Click dreapta pe folderul dorit → **„Add Request"**
2. Denumiți request-ul (ex: `Get All Universities`)
3. Selectați **metoda HTTP** din dropdown-ul din stânga URL-ului (GET, POST, PUT, DELETE)
4. Scrieți **URL-ul** (ex: `{{baseUrl}}/universities`)
5. Pentru metodele POST și PUT, configurați **Body**:
   - Click pe tab-ul **„Body"** (sub URL)
   - Selectați **„raw"**
   - Din dropdown-ul din dreapta, selectați **„JSON"** (nu Text!)
   - Scrieți conținutul JSON
6. Click **„Send"**
7. **Salvați** request-ul cu `Ctrl + S`

---

## 7. Experimentare pas cu pas

### 7.1. Verificarea datelor inițiale

**Scop:** Confirmăm că serverul rulează și baza de date este populată.

#### Request 1: Reset Demo Database

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/demo/reset` |
| Body | - (nu este necesar) |

**Ce face:** Recreează baza de date și o repopulează cu datele demo.

**Când îl folosiți:** Oricând vreți să reveniți la starea inițială (de exemplu, după ce ați șters studenți sau ați făcut modificări pe care vreți să le anulați).

**Răspuns așteptat (Status 200):**
```json
{
  "message": "Baza demo a fost resetată și populată cu universități, studenți, cursuri și înscrieri."
}
```

#### Request 2: Get All Universities

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/universities` |

**Ce face:** Returnează toate universitățile, fiecare incluzând automat lista de studenți și cursuri.

**De ce e important:** Demonstrează **eager loading** cu opțiunea `include`. În cod, acest lucru arată așa:

```javascript
University.findAll({ include: [Student, Course] })
```

**Răspuns așteptat (Status 200):**
```json
[
  {
    "id": 1,
    "name": "UPB",
    "city": "București",
    "Students": [
      { "id": 1, "firstName": "Ana", "lastName": "Ionescu", "universityId": 1 },
      { "id": 2, "firstName": "Mihai", "lastName": "Popescu", "universityId": 1 }
    ],
    "Courses": [
      { "id": 1, "title": "Tehnologii Web", "semester": "Sem I" },
      { "id": 2, "title": "Baze de date", "semester": "Sem I" }
    ]
  },
  {
    "id": 2,
    "name": "UVT",
    "city": "Timișoara",
    "Students": [...],
    "Courses": [...]
  }
]
```

**Ce observăm:**
- Fiecare universitate are proprietățile `Students` și `Courses` (cu majusculă, conform convenției Sequelize)
- Studenții au `universityId` care face legătura cu universitatea
- Totul vine într-o singură cerere, nu în cereri separate

---

### 7.2. Relația One-to-Many

**Scop:** Înțelegem cum funcționează relația Universitate → Studenți.

#### Request 3: Get Students of University 1

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/universities/1/students` |

**Ce face:** Returnează universitatea cu ID 1 și lista studenților ei.

**Răspuns așteptat:**
```json
{
  "university": {
    "id": 1,
    "name": "UPB",
    "city": "București"
  },
  "students": [
    { "id": 1, "firstName": "Ana", "lastName": "Ionescu", "universityId": 1 },
    { "id": 2, "firstName": "Mihai", "lastName": "Popescu", "universityId": 1 }
  ]
}
```

**Experimentați:** Încercați cu `/universities/2/students` pentru a vedea studenții de la UVT.

#### Request 4: Create University

| Proprietate | Valoare |
|-------------|---------|
| Metodă | POST |
| URL | `{{baseUrl}}/universities` |
| Body (raw, JSON) | vezi mai jos |

```json
{
  "name": "UBB",
  "city": "Cluj-Napoca"
}
```

**Ce face:** Creează o universitate nouă în baza de date.

**Răspuns așteptat (Status 201 Created):**
```json
{
  "id": 3,
  "name": "UBB",
  "city": "Cluj-Napoca",
  "updatedAt": "2025-...",
  "createdAt": "2025-..."
}
```

**Verificare:** Rulați din nou `GET {{baseUrl}}/universities` - ar trebui să vedeți acum 3 universități.

#### Request 5: Add Student to University

| Proprietate | Valoare |
|-------------|---------|
| Metodă | POST |
| URL | `{{baseUrl}}/universities/3/students` |
| Body (raw, JSON) | vezi mai jos |

```json
{
  "firstName": "Maria",
  "lastName": "Pop"
}
```

**Ce face:** Creează un student nou și îl asociază automat cu universitatea 3 (UBB).

**Ce observăm în răspuns:**
```json
{
  "id": 5,
  "firstName": "Maria",
  "lastName": "Pop",
  "universityId": 3,
  ...
}
```

Câmpul `universityId: 3` a fost setat automat de server, bazat pe URL-ul cererii.

---

### 7.3. Operații CRUD pe Student

**Scop:** Parcurgem toate operațiile Create, Read, Update, Delete.

#### Request 6: Get All Students

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/students` |

**Ce observăm:** Fiecare student include obiectul `University` (eager loading invers) și array-ul `Courses`.

#### Request 7: Get Single Student

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/students/1` |

**Ce face:** Returnează studentul cu ID 1 împreună cu universitatea și cursurile sale.

#### Request 8: Update Student (PUT)

| Proprietate | Valoare |
|-------------|---------|
| Metodă | PUT |
| URL | `{{baseUrl}}/students/1` |
| Body (raw, JSON) | vezi mai jos |

```json
{
  "firstName": "Ana-Maria"
}
```

**Ce face:** Actualizează prenumele studentului 1.

**Răspuns așteptat:**
```json
{
  "id": 1,
  "firstName": "Ana-Maria",
  "lastName": "Ionescu",
  "universityId": 1,
  ...
}
```

**Observație:** Am trimis doar câmpul pe care dorim să-l modificăm. Celelalte rămân neschimbate.

**Verificare:** Rulați `GET {{baseUrl}}/students/1` pentru a confirma modificarea.

#### Request 9: Delete Student

| Proprietate | Valoare |
|-------------|---------|
| Metodă | DELETE |
| URL | `{{baseUrl}}/students/4` |
| Body | - (nu este necesar) |

**Răspuns așteptat:** Status **204 No Content** (fără corp de răspuns)

**Verificare:** 
1. Rulați `GET {{baseUrl}}/students/4`
2. Ar trebui să primiți **404 Not Found**:
   ```json
   { "error": "Student inexistent." }
   ```

---

### 7.4. Relația Many-to-Many

**Scop:** Înțelegem cum funcționează relația Studenți ↔ Cursuri prin tabela de legătură Enrollment.

#### Request 10: Get All Courses

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/courses` |

**Ce observăm în răspuns:**
```json
[
  {
    "id": 1,
    "title": "Tehnologii Web",
    "semester": "Sem I",
    "Students": [
      {
        "id": 1,
        "firstName": "Ana-Maria",
        "lastName": "Ionescu",
        "Enrollment": {
          "grade": "10",
          "studentId": 1,
          "courseId": 1
        }
      },
      ...
    ]
  },
  ...
]
```

**Important:** Observați obiectul `Enrollment` inclus în fiecare student - acesta conține datele din tabela de legătură, inclusiv `grade` (nota).

#### Request 11: Get Student's Courses

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/students/1/courses` |

**Ce face:** Returnează cursurile la care este înscris studentul 1.

#### Request 12: Enroll Student to Course

| Proprietate | Valoare |
|-------------|---------|
| Metodă | POST |
| URL | `{{baseUrl}}/students/2/courses/3` |
| Body (raw, JSON) | vezi mai jos |

```json
{
  "grade": "9"
}
```

**Ce face:** Înscrie studentul 2 (Mihai) la cursul 3 (Introducere în AI) cu nota 9.

**Răspuns așteptat:**
```json
{
  "message": "Student înscris la curs."
}
```

**Ce s-a întâmplat în baza de date:** S-a creat o nouă înregistrare în tabela `Enrollments`:
```
studentId: 2, courseId: 3, grade: "9"
```

**Verificare:** Rulați `GET {{baseUrl}}/students/2/courses` și observați că acum apare și cursul 3.

---

### 7.5. Export și Import JSON

**Scop:** Învățăm să salvăm și să restaurăm starea bazei de date.

#### Request 13: Export All Data

| Proprietate | Valoare |
|-------------|---------|
| Metodă | GET |
| URL | `{{baseUrl}}/export` |

**Răspuns:** Un obiect JSON cu toate datele din bază:
```json
{
  "universities": [...],
  "students": [...],
  "courses": [...],
  "enrollments": [...]
}
```

**Cum salvăm ca fișier:**
1. După ce primiți răspunsul, în panoul de răspuns din Postman
2. Click pe butonul **„Save Response"** (iconița cu dischetă, în dreapta sus a panoului de răspuns)
3. Selectați **„Save to a file"**
4. Salvați ca `backup.json`

#### Request 14: Import Data

| Proprietate | Valoare |
|-------------|---------|
| Metodă | POST |
| URL | `{{baseUrl}}/import` |
| Body (raw, JSON) | conținutul din backup.json |

**Când folosim:** Pentru a restaura baza de date la o stare anterioară.

**Atenție:** Importul **șterge toate datele existente** și le înlocuiește cu cele din JSON!

---

## 8. Unelte SQLite pentru inspecție

Pe lângă API, puteți inspecta direct baza de date folosind utilitarele din `tools/sqlite/`.

### 8.1. Utilizare din linia de comandă

Deschideți un terminal nou în folderul laboratorului:

```bash
# Deschide shell-ul interactiv SQLite
tools\sqlite\sqlite3.exe demo.db

# În shell-ul SQLite:
.tables                          # Listează tabelele
.schema Students                 # Arată structura tabelei Students
SELECT * FROM Students;          # Afișează toți studenții
SELECT * FROM Enrollments;       # Afișează înscrierile
.quit                            # Ieșire
```

### 8.2. Utilizare prin API (wrapper HTTP)

Serverul expune utilitarele SQLite și prin HTTP:

| Endpoint | Ce face |
|----------|---------|
| `GET /tools/sqlite3/tables?db=demo.db` | Listează tabelele |
| `GET /tools/sqlite3/schema?db=demo.db` | Afișează schema |
| `POST /tools/sqlite3/query` | Execută o interogare SQL |

**Exemplu - interogare SQL prin Postman:**

| Proprietate | Valoare |
|-------------|---------|
| Metodă | POST |
| URL | `http://localhost:3000/tools/sqlite3/query` |
| Body (raw, JSON) | vezi mai jos |

```json
{
  "db": "demo.db",
  "sql": "SELECT * FROM Enrollments;"
}
```

---

## 9. Întrebări de verificare

Răspundeți la aceste întrebări pentru a vă testa înțelegerea:

1. **Ce metodă Sequelize folosim pentru a defini relația „o universitate are mulți studenți"?**

2. **Ce se întâmplă în baza de date când creăm un student prin `POST /universities/1/students`?**

3. **De ce apare proprietatea `Enrollment` în răspunsul de la `GET /courses`?**

4. **Ce diferență este între `findAll()` și `findAll({ include: Student })`?**

5. **Ce status HTTP primim la un DELETE reușit? De ce nu primim un corp de răspuns?**

6. **Dacă ștergem o universitate, ce se întâmplă cu studenții ei?** (Hint: verificați cu SQLite)

7. **În formatul de export JSON, cum sunt reprezentate relațiile many-to-many?**

---

## 10. Depanare probleme frecvente

| Problemă | Cauză | Soluție |
|----------|-------|---------|
| `ECONNREFUSED` sau „Could not send request" | Serverul nu rulează | Verificați terminalul, rulați `npm start` |
| `{{baseUrl}} is not defined` | Environment-ul nu e activ | Selectați „S10vDEMO-local" din dropdown-ul dreapta-sus |
| `400 Bad Request` la POST | Body incorect configurat | Verificați: Body → raw → **JSON** (nu Text!) |
| `404 Not Found` | URL greșit sau resursă inexistentă | Verificați URL-ul; rulați Reset dacă e necesar |
| `500 Internal Server Error` | Eroare în server | Verificați consola terminalului pentru detalii |
| JSON invalid | Sintaxă JSON greșită | Verificați ghilimelele duble, virgulele, acoladele |
| Datele nu apar actualizate | Cache browser/Postman | Închideți și redeschideți request-ul |

### Checklist înainte de fiecare sesiune

- [ ] Terminalul arată mesajul de pornire cu „http://localhost:3000"
- [ ] În Postman, environment-ul „S10vDEMO-local" este selectat
- [ ] `GET {{baseUrl}}/universities` returnează date (nu eroare)
- [ ] La hover peste `{{baseUrl}}` apare valoarea corectă

---

## Resurse suplimentare

- [Documentația Sequelize - Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)
- [Documentația Sequelize - Eager Loading](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/)
- [Documentația Express](https://expressjs.com/)
- [Documentația Postman](https://learning.postman.com/docs/)

---

**Laborator realizat pentru disciplina Tehnologii Web**  
**Facultatea de Cibernetică, Statistică și Informatică Economică**  
**Academia de Studii Economice din București**
