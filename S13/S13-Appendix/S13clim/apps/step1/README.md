# Seminar 13 – Pasul 1 (S13v1): DataTable cu componente externe în React

Acest starter kit operationalizează **primul pas** din seminarul 13: construirea unui ecran de tip *data table* (listă de cărţi) în **React + Redux**, folosind o componentă externă dintr-un repository/bibliotecă UI – **PrimeReact** (DataTable, Column, Dialog, Button, InputText). Aplicaţia permite:

- **afişarea** colecţiei de cărţi într-un tabel;
- **adăugarea** unei cărţi printr-un dialog;
- **editarea** unei cărţi prin acelaşi dialog (reutilizare controlată a aceleiaşi interfeţe);
- **căutarea unei cărţi după titlu**, implementată prin **filtrarea** DataTable (cu declanşare explicită prin buton).

În directorul `docs/` este inclusă transcrierea în format SRT a materialului video, pentru corelarea fină a paşilor cu implementarea.

---

## 1) Premise conceptuale (înainte de execuţie)

1. **Componenta externă** (PrimeReact DataTable) nu „înlocuieşte” React, ci îl **completează**: React furnizează modelul de compunere, iar biblioteca furnizează artefacte UI sofisticate, deja testate şi stilizate.
2. **Redux** funcţionează aici ca *sistem de memorie* la nivel de aplicaţie: evenimentele (acţiunile) produc tranziţii deterministe (reducer), iar UI-ul „citeşte” starea (selector) şi declanşează modificări (dispatch).
3. **Client–server**: clientul React consumă un API REST minimal (Express). Setul de date este intenţionat *in-memory* pentru a reduce zgomotul infrastructural în această etapă.

---

## 2) Structura proiectului

- `src/components/BookList.js` – ecranul principal (DataTable + Dialog + căutare).
- `src/actions/` – acţiuni asincrone (fetch + POST + PUT) prin `redux-thunk`.
- `src/reducers/` – reducer-ul pentru cărţi şi compunerea reducer-elor.
- `src/stores/store.js` – configurarea store-ului Redux.
- `server/` – server Express cu endpoint-uri pentru cărţi.
- `docs/S13v1.srt` – subtitrări/transcriere material.

---

## 3) Instalare şi rulare (kit complet funcţional)

### Cerinţe

- Node.js (recomandat LTS)
- npm

### Instalare dependinţe

În rădăcina proiectului:

```bash
npm run setup
```

> Scriptul instalează dependinţele atât pentru client, cât şi pentru server.

### Rulare (client + server, simultan)

```bash
npm start
```

- Server: `http://localhost:8080`
- Client: `http://localhost:3000`

---

## 4) Validare funcţională (testare orientată pe comportamente)

1. **Afişare**: la încărcarea paginii, tabelul trebuie să prezinte cel puţin două cărţi (seed-ul serverului).
2. **Adăugare**:
   - apăsaţi **„Adaugă”**;
   - introduceţi un **titlu** (obligatoriu) şi, opţional, un conţinut;
   - apăsaţi **„Salvează”**;
   - observaţi reîncărcarea listei (prin `dispatch(getBooks())` după operaţie).
3. **Editare**:
   - apăsaţi **„Editează”** pe un rând;
   - modificaţi titlul sau conţinutul;
   - salvaţi şi verificaţi că noua versiune este reflectată în tabel.
4. **Căutare (buton)**:
   - introduceţi în câmpul „Titlul (sau un fragment)” un termen;
   - apăsaţi **„Caută”**;
   - verificaţi filtrarea tabelului; utilizaţi **„Resetare”** pentru revenire.

---

## 5) Detalii de implementare relevante (pentru înţelegere şi transfer)

### 5.1 Fluxul de date

- UI declanşează `dispatch(getBooks())` la montarea componentei (`useEffect`).
- `redux-thunk` permite ca acţiunile să fie funcţii asincrone.
- Reducer-ul gestionează stări tranzitorii (ex. `fetching`) şi erori, utilizate pentru `loading` în DataTable şi pentru afişarea unui mesaj de eroare.

### 5.2 Căutarea „unei anumite cărţi” ca filtrare controlată

Căutarea este construită deliberat ca **operaţie explicită** (prin buton), nu ca filtrare instantanee la fiecare tastă. În plan didactic, aceasta face vizibilă relaţia dintre:

- **termenul de căutare** (stare locală);
- **filtrele DataTable** (stare locală separată, aplicată componentei);
- **efectul observabil**: restrângerea colecţiei afişate.

În implementare se utilizează:

- `filters` şi `FilterMatchMode.CONTAINS`;
- `globalFilterFields={['title']}` pentru a restrânge filtrarea exclusiv la câmpul `title`.

Această alegere evită amestecul între „căutare” şi „interogare de backend” în etapa 1: obiectivul este să înţelegeţi şi să controlaţi mecanismele UI înainte de a introduce complexităţi suplimentare (paginare, sortare pe server, filtrare la nivel de API etc.).

---

## 6) Extensii recomandate (pentru aprofundare)

1. **Paginare şi sortare**: activaţi paginatorul DataTable şi apoi proiectaţi contractul API pentru paginare/sortare server-side.
2. **Filtrare avansată**: treceţi de la filtrare globală la filtre pe coloană (`filters.title`, `filters.content`) şi discutaţi implicaţiile asupra ergonomiei UI.
3. **Persistenţă reală**: înlocuiţi stocarea in-memory cu o bază de date (ex. SQLite) şi argumentaţi alegerile de modelare.
4. **Calitate**: introduceţi validări mai riguroase, feedback prin Toast, şi teste (unit/integration).

---

## 7) Configurare opţională: URL API

Clientul citeşte variabila `VITE_API_URL`. Exemplu:

- copiaţi `.env.example` în `.env`
- setaţi `VITE_API_URL` după nevoie

---

## Referinţe (APA 7th ed; cu DOI)

| Referinţă | DOI |
|---|---|
| Díaz Ceñera, M., Grigera, J., & Pascual Espada, J. (2024). *Enhancing data tables user experience via automated adaptations*. **Expert Systems with Applications, 255**, 124491. | https://doi.org/10.1016/j.eswa.2024.124491 |
| Mahmood, S., Lai, R., Kim, Y. S., Kim, J. H., Park, S. C., & Oh, H. S. (2005). *A survey of component based system quality assurance and assessment*. **Information and Software Technology, 47**(10), 693–707. | https://doi.org/10.1016/j.infsof.2005.03.007 |
| Miftachudin, M. K. H., & Arfianto, A. Z. (2023). *State management of API web service using Redux on React Native App*. In **Proceedings of the 4th International Conference on Applied Science and Technology on Engineering Science (iCAST-ES 2021)** (pp. 1425–1430). SCITEPRESS. | https://doi.org/10.5220/0010966700003260 |
