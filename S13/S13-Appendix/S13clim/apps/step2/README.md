# S13v2 — Starter kit (Pasul 2): Filtrare pe coloană şi paginare în PrimeReact DataTable

## Context didactic şi ţintă operaţională
Acest proiect reprezintă *pasul al doilea* din Seminarul 13 (**„Componente externe în React”**) şi urmăreşte consolidarea unei conduite inginereşti în manipularea interfeţelor orientate pe date: datele sunt expuse într‑un tabel (componentă externă), sunt filtrate în mod controlat, iar navigarea prin setul de rezultate este făcută prin **paginare parametrică**.

În mod esenţial, proiectul transformă DataTable dintr‑un simplu vizualizator într‑un **instrument de interogare**: utilizatorul nu operează asupra „întregului univers” al înregistrărilor, ci asupra unei *ferestre* definite de două coordonate:
- **filtrele** (de tip *conţine*),
- **paginarea** (indicele `first` şi mărimea paginii `rows`).

În consecinţă, serverul returnează **două artefacte**: `records` (fereastra curentă) şi `count` (totalul după filtrare), astfel încât paginatorul să rămână matematic bine definit.

## Ce găseşti în kit
- `src/components/BookList.js` — DataTable PrimeReact cu **filtre pe coloană** şi **paginare**.
- `src/reducers/book-reducer.js` — reducer care stochează atât `records`, cât şi `count`.
- `server/index.js` — API Express minimal, care implementează:
  - filtrare server-side pe `title` şi `content` (CONTAINS),
  - paginare server-side controlată prin `first` şi `rows`.
- `docs/S13v2.srt` — subtitrările (SRT) asociate materialului video.

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

Alternativ, din rădăcina suitei: `npm run start:pas2`.

- Server: `http://localhost:8082`
- Client: `http://localhost:3002`

## Explorare funcţională (ghid de testare)
1. **Inspectează setul iniţial**: tabelul afişează o primă pagină (mărime implicită: 5).
2. **Aplică filtrare**:
   - în coloana *Titlu* sau *Conţinut*, deschide filtrul,
   - introdu un fragment,
   - apasă **Aplică**.
   - observă: `count` se schimbă (totalul după filtrare), iar paginatorul se recalibrează.
3. **Şterge filtrarea**: foloseşte **Şterge** şi verifică revenirea la lista completă.
4. **Paginare**:
   - navighează între pagini;
   - modifică numărul de rânduri pe pagină din dropdown;
   - observă-showcase: parametrii `first` şi `rows` sunt vizibili în antet (sub forma query-ului calculat), evidenţiind contractul client–server.
5. **Adăugare / editare**:
   - adaugă o carte; apoi filtrează pentru a o regăsi;
   - editează un rând; verifică faptul că rezultatul rămâne coerent cu fereastra curentă.

## Observaţii conceptuale (pentru raport)
- **Filtrare controlată**: nu declanşăm cereri la fiecare tastă; filtrarea este o acţiune explicită („Aplică”), reducând zgomotul reţelei şi făcând operaţia auditabilă.
- **Paginare ca fereastră de observaţie**: `first` şi `rows` descriu o selecţie ordinală asupra unui set ordonat; fără `count`, paginatorul nu poate estima cardinalul setului şi, implicit, numărul de pagini.
- **Separarea responsabilităţilor**:
  - clientul formulează interogarea (filtre + paginare),
  - serverul execută interogarea şi întoarce atât rezultatul, cât şi metadatele necesare UI.

## Extensii recomandate
- introducerea sortării server-side (`sortField`, `sortOrder`), menţinând aceeaşi filosofie: parametri expliciţi → răspuns determinist.
- adăugarea unei coloane de *ştergere* cu confirmare (ConfirmDialog).
- persistenţă reală (ex. SQLite/PostgreSQL) şi integrarea unei politici de validare (schema JSON).

---

### Referinţe tehnice (fără DOI; pentru utilizare imediată)
- PrimeReact v10: Locale API şi opţiunile de localizare.
- PrimeReact v10: DataTable API (paginator, rows, totalRecords, onPage, filter).

