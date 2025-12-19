# S13v3 — Starter kit (Pasul 3): Sortare + extindere numerică pentru „Număr de pagini” (PrimeReact DataTable)

## Context didactic şi ţintă operaţională
Acest proiect reprezintă *pasul al treilea* din Seminarul 13 (**„Componente externe în React”**) şi completează triada
clasică a interfeţelor orientate pe date: **filtrare** (selectare semantică), **paginare** (fereastră ordinală) şi **sortare**
(ordonare după un criteriu declarat).

În regim **lazy** (server-side), sortarea nu poate rămâne un artificiu local: dacă ordinea s-ar aplica doar pe pagina
curentă, utilizatorul ar primi o iluzie de corectitudine (ordonare *intră‑pagină*), în timp ce restul setului ar rămâne
neordonat. De aceea, în această implementare, sortarea este tratată ca **parametrizare explicită a interogării**:
- `sortField` — câmpul de sortare;
- `sortOrder` — direcţia (1 ascendent, -1 descendent).

Extinderea metodologică centrală este introducerea câmpului **„Număr de pagini”** (`pages`), care impune o distincţie
între *ordonare lexicală* şi *ordonare numerică*. În absenţa acestei distincţii, valori precum `100` şi `20` ar fi
ordonate greşit (deoarece „100” < „20” în ordine lexicală), iar eroarea ar fi vizibilă, reproductibilă şi didactic utilă.

## Ce găseşti în kit
- `src/components/BookList.js`
  - DataTable PrimeReact cu **filtrare pe coloană** (Title/Content), **paginare parametrică** şi **sortare pe coloane**;
  - coloană numerică **Număr de pagini** (sortabilă), plus dialog de adăugare/editare cu `InputNumber`.
- `src/actions/index.js`
  - mecanism de coerenţă: reţine ultimul `queryString` pentru ca operaţiile de adăugare/editare să păstreze aceeaşi
    „lentilă” (filtre + paginare + sortare).
- `server/index.js`
  - filtrare server-side (CONTAINS) pentru `title` şi `content`;
  - sortare server-side pentru `id`, `title`, `content`, `pages`;
  - paginare server-side prin `first` şi `rows`;
  - răspuns: `{ count, records, first, rows }`.
- `docs/S13v3.srt` — subtitrările (SRT) asociate materialului video.
- `extras/S13v3nextlab-original.zip` — arhiva originală furnizată (pentru comparaţie şi trasabilitate).

## Instalare şi rulare
### 1) Instalarea dependenţelor
Din rădăcina proiectului:

```bash
npm run setup
```

### 2) Pornirea aplicaţiei (client + server)

În două terminale (sau folosind suita din rădăcină):

```bash
# Terminal A (server)
npm run start:server

# Terminal B (client)
npm start
```

Alternativ, din rădăcina suitei: `npm run start:pas3`.

- Server: `http://localhost:8083`
- Client: `http://localhost:3003`

## Ghid de verificare funcţională (minimal, dar complet)
1) **Sortare textuală**
- apasă pe antetul „Titlu” → observă alternanţa asc/desc;
- repetă pentru „Conţinut”.

2) **Sortare numerică (Număr de pagini)**
- apasă pe antetul „Număr de pagini”;
- urmăreşte ordonarea numerică reală (ex. 144 < 196 < 280 < 352 < 420).

3) **Interacţiunea sortare ↔ paginare**
- sortează după „Număr de pagini” descendent;
- navighează la pagina 2;
- schimbă `rows` (3/5/10/20) şi observă că ordinea se păstrează, deoarece este aplicată la nivelul setului filtrat.

4) **Interacţiunea sortare ↔ filtrare**
- filtrează în „Titlu” un fragment (ex. „Re”);
- sortează în interiorul rezultatului filtrat;
- observă că `count` reflectă cardinalul după filtrare, iar sortarea operează asupra acestui sub‑univers.

## Observaţii conceptuale (pentru raport / jurnal de laborator)
- **Sortarea este o operaţie de structurare, nu de cosmetizare**: ea modifică ordinea observabilă şi, prin urmare,
  interpretarea utilizatorului asupra datelor.
- **Ordine totală vs. ordine parţială**: pe şiruri de caractere, ordinea este de regulă lexicală; pe numere, ordinea
  este aritmetică. Tratarea numerică a `pages` este o condiţie de corectitudine.
- **Determinism prin tie-break**: atunci când două valori sunt egale, serverul foloseşte `id` drept criteriu secundar,
  prevenind reordonări „fantomă” între refresh-uri.

## Extensii recomandate (pentru aprofundare)
- sortare multi-coloană (criterii compuse), menţinând aceeaşi idee: parametri expliciţi → răspuns determinist;
- filtrare numerică pe `pages` (ex. „>= 300”), pentru a discuta diferenţa dintre predicate numerice şi predicate textuale;
- persistenţă reală (SQLite/PostgreSQL) + indexare pentru a introduce discuţia despre costul algoritmic al sortării.
