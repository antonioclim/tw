# S13v4 — Starter kit (Pasul 4): Grafice în Dialog (Pie Chart) + experiment cu mai multe grafice în fereastră modală

## Context didactic şi ţintă operaţională
Acest proiect reprezintă **pasul al patrulea** din Seminarul 13 (*„Componente externe în React”*) şi urmăreşte o mutaţie
metodologică bine delimitată: trecerea de la *afişarea tabulară* la *sinteza vizuală*.

Dacă, în paşii anteriori, DataTable-ul funcţiona ca instrument de:
- **filtrare** (selectare semantică),
- **paginare** (fereastră ordinală),
- **sortare** (ordonare după un criteriu explicit),

în acest pas el devine şi sursă pentru **transformări de reprezentare**: aceleaşi date (cărţi) sunt re‑codificate în
diagrame, astfel încât regularităţi altfel „invizibile” în tabel (distribuţii, extreme, structură numerică) să devină
imediat discutabile.

## Ce demonstrează kitul
1) Integrarea unei biblioteci externe de vizualizare (**react-google-charts**) într-o aplicaţie React care foloseşte deja
   o bibliotecă UI separată (**PrimeReact**).
2) Inserarea unui **Pie Chart** într-un **Dialog** (fereastră modală), ca formă de raportare contextuală.
3) „Experimentarea” (controlată) cu plasarea **mai multor grafice** în aceeaşi fereastră modală:
   - Pie Chart (distribuţie pe intervale de pagini),
   - Bar Chart (top 10 după număr de pagini),
   - Histogramă (structură numerică a variabilei *pages* în setul filtrat).

## Arhitectură (minimă, dar coerentă)
- **Client (React + Redux)**
  - PrimeReact: `DataTable`, `Column`, `Dialog`, `Button`, controale de intrare.
  - react-google-charts: componenta `Chart` pentru diagrame.
  - Redux: starea listei (CRUD) şi starea statisticilor (încărcare separată, pentru grafice).
- **Server (Express)**
  - `/books` — listă paginată şi sortată, cu filtrare prin parametri.
  - `/books/stats` — statistici agregate pentru setul filtrat (fără paginare), utilizate de grafice.

Prin această separaţie, evităm o eroare conceptuală frecventă: construirea unui grafic doar din „pagina curentă” ar produce
o sinteză care nu reprezintă setul de interes, ci un fragment arbitrar.

## Instalare şi rulare
În directorul proiectului:

1) Instalare dependenţe (client + server)
```bash
npm run setup
```

2) Pornire simultană (server + client)
```bash
npm start
```

Accesează:
- client: `http://localhost:3000`
- server: `http://localhost:8080`

## Scenariu de verificare (orientat pe comportamente observabile)
1) **Filtrare**: aplică un filtru pe „Titlu” sau „Conţinut”, apoi observă că:
   - `count` (totalRecords) se schimbă,
   - paginatorul se recalibrează.

2) **Sortare**: sortează după „Număr de pagini” şi confirmă că ordinea este numerică (nu lexicală).

3) **Grafice**:
   - apasă butonul **„Grafice”** din antetul tabelului;
   - confirmă că Pie Chart-ul reflectă distribuţia *în setul filtrat* (nu doar în pagina curentă);
   - compară topul din Bar Chart cu extremele din tabel.

4) **Recalculează**: schimbă filtrul şi apasă „Recalculează” în Dialog: graficele trebuie să se alinieze noului set.

## Fișiere relevante (pentru înţelegerea implementării)
- `src/components/BookList.js`
  - definirea stării de filtrare/paginare/sortare;
  - deschiderea Dialog-ului de grafice;
  - transformarea statisticilor în formate acceptate de Google Charts.
- `server/index.js`
  - funcţiile de filtrare/sortare/paginare (`responsePayload`);
  - endpoint-ul `/books/stats` (agregare + intervalizare + top).

## Artefacte incluse
- `docs/S13v4.srt` — subtitrările furnizate (pentru trasabilitate didactică).
- `extras/S13v4nextlab-original.zip` — arhiva originală primită (ca reper).

## Extensii recomandate (pentru aprofundare)
- înlocuirea intervalizării fixe cu intervalizare bazată pe cuantile (ex. quartile), discutând impactul asupra Pie Chart-ului;
- introducerea unui al doilea criteriu de agregare (ex. grupare pe primele litere ale titlului) pentru a compara tipuri de sinteză;
- validare formală a datelor (schema + teste), astfel încât diagramele să nu fie „victime” ale anomaliilor de input.

## Referinţe (APA 7; DOI)
- Bostock, M., Ogievetsky, V., & Heer, J. (2011). D³: Data-driven documents. *IEEE Transactions on Visualization and Computer Graphics, 17*(12), 2301–2309. https://doi.org/10.1109/TVCG.2011.185
- Cleveland, W. S., & McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. *Journal of the American Statistical Association, 79*(387), 531–554. https://doi.org/10.1080/01621459.1984.10478080
- Schulz, H.-J., Nocke, T., Heitzler, M., & Schumann, H. (2013). A design space of visualization tasks. *IEEE Transactions on Visualization and Computer Graphics, 19*(12), 2366–2375. https://doi.org/10.1109/TVCG.2013.120
- Shneiderman, B. (1996). The eyes have it: A task by data type taxonomy for information visualizations. In *Proceedings of the IEEE Symposium on Visual Languages* (pp. 336–343). IEEE. https://doi.org/10.1109/VL.1996.545307
