# Seminar 10 – Relații cu ORM (Sequelize)
Acest repository conține toate resursele necesare pentru desfășurarea Seminarului 10 din cadrul cursului de tehnologii web avansate. Tema seminarului: **relații între entități modelate cu ORM – Sequelize**.

## 📦 Conținutul arhivei

Structura de directoare este organizată astfel:

```
S10-Relații_cu_ORM/
│
├── S10vDEMO-lab/
│   ├── server.js
│   ├── db.js
│   ├── models/
│   ├── web/
│   ├── tools/
│   ├── README-DEMO.md
│   └── demo.db
│
├── documente-suport/
│   ├── S10vDEMO-lab-COMPLET - Relații ORM cu Sequelize.docx
│   ├── README.md (acesta)
│   └── prezentari_segment8-9EN.docx
│
└── starterkit-v1.0/
    ├── dashboard/
    ├── S10v1/ până la S10v6tema/
    └── postman/
```

---

## 🎯 Scopul seminarului

Seminarul explorează **relațiile între entități în baze de date relaționale** și modul în care acestea sunt modelate folosind **Sequelize**, un ORM (Object-Relational Mapping) pentru Node.js.

> Obiectivul principal: să înțelegi, implementezi și testezi relații de tip **unu-la-mulți** și **mulți-la-mulți**, prin intermediul unei aplicații practice complet funcționale.

---

## 🧪 Ce vei experimenta efectiv

Folosind proiectul **S10vDEMO-lab**, vei putea:
- înțelege fluxul complet al unui ORM Sequelize funcțional;
- vedea cum se definesc modele, relații și cum se populează o bază SQLite;
- testa interogări REST cu Postman;
- inspecta baza de date cu unelte CLI și UI (integrate);
- exporta/importa date în format JSON;
- vizualiza codul și rutele pentru fiecare relație.

---

## 🧭 Cum folosești acest material

### 1. Parcurgere ghidată cu `S10vDEMO-lab/`

Accesează folderul `S10vDEMO-lab/` și urmează pașii:

```bash
cd S10vDEMO-lab
npm install
npm start
```

Deschide în browser:

```
http://localhost:3000/
```

Aici vei găsi:
- explicații despre fiecare model;
- acces la toate rutele (GET, POST, PUT, DELETE);
- controale pentru import/export JSON;
- linkuri directe către demonstrațiile Postman și inspectarea bazei de date.

> Documentul `README-DEMO.md` oferă explicații pedagogice complete.

---

### 2. Documentele din `documente-suport/`

- `S10vDEMO-lab-COMPLET - Relații ORM cu Sequelize.docx` – suport teoretic extins, explică fundamentele Sequelize și relațiile 1:N, M:N, CRUD, plus exemple reale;
- `prezentari_segment8-9EN.docx` – prezentări în limba engleză pe subiecte ORM și relații Sequelize;
- `README.md` – acest fișier explicativ pentru repo-ul de pe GitHub.

---

### 3. Explorare individuală cu `starterkit-v1.0/`

Conține:
- versiunile pas-cu-pas ale exercițiilor: `S10v1`, `S10v2`, ..., `S10v6tema`;
- dashboard pentru control unificat (pornire/oprire proiecte);
- colecții Postman pentru fiecare pas.

```bash
cd starterkit-v1.0/dashboard
npm install
npm start
```

> Vizitează: `http://localhost:3000` pentru a porni proiectele pe rând sau simultan, în mod orchestrabil.

---

## 🛠️ Unelte SQLite incluse

În `S10vDEMO-lab/tools/sqlite/` sunt incluse:
- `sqlite3.exe` – client CLI pentru bazele SQLite;
- `sqldiff.exe` – compară două baze SQLite;
- `sqlite3_analyzer.exe` – analizează structura internă a unei baze SQLite.

> Poți folosi aceste instrumente independent sau prin UI-ul HTTP al `S10vTOOLS`.

---

## 📌 Cerințe de sistem

- Windows 10/11
- Node.js 18+
- npm
- VS Code recomandat pentru editare și lansare
- Browser modern (Chrome, Edge etc.)
- Postman (pentru testare API)

---

## 🧾 Licență și utilizare

Acest material este destinat **uzului educațional** în cadrul cursurilor universitare. Poate fi adaptat și reutilizat cu mențiunea sursei.

---

## 📚 Recomandări

După seminar:
- încearcă să reconstruiești aplicația `S10vDEMO-lab` cu alte entități (ex: autori și cărți);
- explorează migrațiile Sequelize și validările;
- compară fluxul Sequelize cu SQL brut pentru interogări complexe.

---

**Succes în explorarea relațiilor ORM!**  
Pentru întrebări: adresează-le la seminar sau postează pe forumul cursului.
