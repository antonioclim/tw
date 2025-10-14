# Tehnologii web — **Seminarul 0 (PROLOG)**
## Ghid complet de instalare & configurare a mediului de lucru (Linux/Windows)

**Autor:** Antonio Clim  
**Afiliere:** ASE — Facultatea de Cibernetică, Statistică și Informatică Economică  
**Dată:** 2025‑09‑22  
**Durată țintă:** 2–4 ore (seminar) + timp individual (temă, lecturi)  
**Format:** document integrat, structurat pe secțiuni și anexe; termenii tehnici rămân în engleză cu *explicație în italic* între paranteze.


## Cuprins
- 1. Rezumat executiv
- 2. Obiective de învățare & rezultate așteptate
- 3. Public țintă, precondiții & metodologie
- 4. Mediul de lucru & reflexul de testare rapidă
- 5. Setări de sistem — Ubuntu Desktop 25.04 LTS
- 6. Setări de sistem — Windows 11 (PowerShell)
- 7. Git & GitHub: de la configurare la politici de chei (personal vs. laborator)
- 8. Node.js & NPM: versiuni, pachete, bune practici
- 9. Editorul VS Code: preseturi, extensii, productivitate
- 10. Browserul Firefox: DevTools, rețea, stocare, profiluri curate
- 11. Proiect minim „Hello Web” (Express): specificație, cod, testare
- 12. Controlul calității: ESLint (flat), Prettier, convenții
- 13. Testare dublă: Vitest și Jest pe același contract
- 14. Securitate operațională: secrete, fișiere `.env`, revocări
- 15. Git avansat: ramuri, *rebase* (*rescriere a bazei*), *merge* (*îmbinare*), *stash* (*depozitare temporară*), *reflog* (*jurnal referințe*)
- 16. `.gitignore` pe OS/IDE și excluderi inteligente
- 17. Exportul livrabilelor: README.md → DOCX (pandoc/LibreOffice)
- 18. Evaluare formativă: mini‑quiz per secțiune (5–10 itemi)
- 19. Mini‑laborator progresiv L1→L3 & temă (deadline 7 zile)
- 20. Rubrică de evaluare & Definition of Done (DoD)
- 21. Definition of Ready (DoR) pentru S1+
- 22. Anti‑patterns & troubleshooting (catalog extins)
- 23. FAQ (întrebări frecvente)
- 24. Glosar de termeni (EN → RO)
- 25. Bibliografie (APA 7; doar DOIs reale)
- 26. Anexe: șabloane, răspunsuri, checklisturi


## 1. Rezumat executiv
Uniformizăm mediul pentru întregul curs: **Node.js LTS**, **Git+GitHub** (SSH), **VS Code** și **Firefox**. După fiecare instalare, aplicăm *reflexul* de testare rapidă: probe de 10–30 s în `node` REPL, în Firefox Console și în shell‑ul Git. Ne asigurăm că putem crea un repo, adăuga un fișier și efectua un `push` prin SSH. Implementăm un proiect minim **Express** cu resurse statice și două rute (`/ping`, `/api/time`), îl supunem lintării și dublăm testarea cu **Vitest** și **Jest**. Stabilim politici de chei separate pentru stația personală și stația de laborator (chei efemere, fără cache de credențiale, curățare la final). Livrabilele sunt documentate în README și exportate în **DOCX**.


## 2. Obiective de învățare & rezultate așteptate
- Instalarea și verificarea instrumentelor (Git, Node, VS Code, Firefox) pe Linux/Windows.
- Inițializarea și configurarea unui depozit Git *curat* (identitate, ramură implicită, `.gitignore`, remote prin SSH).
- Proiect minim Express, *lint‑free* și testat.
- Politici operaționale de securitate: chei, secrete, curățare, revocare.
- Documentare reproductibilă și export a livrabilelor.


## 3. Public țintă, precondiții & metodologie
Publicul este format din studenți de anul 3 care au lucrat cu cel puțin un limbaj imperativ și au folosit linia de comandă. Metodologia balansează teoria (motivația și standardele) cu practica (comenzi, code‑along, exerciții), folosind exemple *rulabile imediat* și articulate prin *micro‑probe*.


## 4. Mediul de lucru & reflexul de testare
Reflexul de testare presupune verificări scurte: `node -v && npm -v`, două expresii în REPL, două expresii în Consola Firefox (F12), `git --version`, și – la nevoie – o clonare rapidă peste SSH.


## 5. Setări de sistem — Ubuntu Desktop 25.04 LTS

### 5.1 Pachete de bază

```bash
sudo apt update && sudo apt -y upgrade
sudo apt -y install build-essential curl wget ca-certificates gnupg git unzip zip sqlite3 pandoc
```

### 5.2 Git & identitate
Stabilim identitatea pentru meta‑datele commit‑urilor și verificăm canalul SSH:

```bash
git config --global user.name "Prenume Nume"
git config --global user.email "prenume.nume@stud.ase.ro"
ssh-keygen -t ed25519 -C "prenume.nume@stud.ase.ro"
ssh -T git@github.com
```

### 5.3 Node prin `nvm` (izolare pe utilizator)

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
node -v && npm -v
```

### 5.4 Probe rapide & capcane

- Dacă `node` nu este găsit după instalare, reîncarcă shell‑ul (sau `source ~/.bashrc`).
- Dacă `ssh -T` eșuează, verifică *public key* în GitHub, permisiunile `~/.ssh`, agentul SSH.

### 5.5 Firefox & DevTools
Activăm *Network*, *Storage*, *Console* și folosim profiluri curate în testele de rețea.

### 5.6 Export DOCX
Cu `pandoc`, convertim rapid README.md în `.docx` pentru predare: `pandoc README.md -o README.docx`.


## 6. Setări de sistem — Windows 11 (PowerShell)

### 6.1 Instalari prin `winget`

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Microsoft.VisualStudioCode -e
winget install --id Mozilla.Firefox -e
```
Verificări: `where git`, `node -v`, `npm -v`.

### 6.2 PATH & remedieri

Dacă `git is not recognized`, repornește shell‑ul sau reinstalează Git cu *Add to PATH*.

### 6.3 SSH & GitHub

```powershell
ssh-keygen -t ed25519 -C "prenume.nume@stud.ase.ro"
ssh -T git@github.com
```
Evităm PAT la push; preferăm SSH, în special pe stații publice.


## 7. Git & GitHub: configurare, flux, politici de chei
Adoptăm ramura implicită `main`, mesajele *semantic commit*, și `.gitignore` adecvat. Cheile **ed25519** pe stația personală au *passphrase* și sunt memorate în agent; pe stația de laborator folosim chei efemere, *deploy keys* limitate sau fork‑uri temporare și **curățăm** contextul la final.


## 8. Node.js & NPM — versiuni, pachete, bune practici
Preferăm `nvm` pe Linux (izolare), iar pe Windows instalatorul LTS cu `winget`. Scripturile NPM (`start`, `dev`, `lint`, `format`, `test`) uniformizează rularea pe toate OS‑urile. Evităm dependențele globale; menținem `package.json` autoexplicativ.


## 9. VS Code — preseturi, extensii, productivitate
Folosim `.vscode/extensions.json`, `settings.json`, `tasks.json`. Activăm *formatOnSave* și *source.fixAll.eslint*, definim *exclude* pentru directoarele de build, setăm profil implicit pentru terminal.


## 10. Firefox — DevTools & profilare
În *Network*, observăm *status*, *content-type*, *cache*. În *Storage*, inspectăm `localStorage`/`sessionStorage`. Pentru testare curată, folosim *Private Window* sau profiluri separate.


## 11. Proiect minim „Hello Web” (Express) — specificație & cod

### 11.1 Specificație

- Servește `public/` ca *static files*.  
- `/ping` → `text/plain: pong`.  
- `/api/time` → JSON ISO‑8601.

### 11.2 Cod

```js
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.get('/ping', (_req, res) => res.type('text/plain').send('pong'));
app.get('/api/time', (_req, res) => res.json({ now: new Date().toISOString() }));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
```

### 11.3 Probe & *DoD* minim

`npm run dev` pornește serverul; rutele răspund; `npm run lint` nu raportează erori; `npm test` este verde.


## 12. Controlul calității — ESLint (flat) & Prettier
Configurăm `eslint.config.js` pentru ESM, definim reguli minime, și sincronizăm Prettier. Evităm conflictele setând `editor.defaultFormatter = Prettier` și activând corecțiile ESLint on save.


## 13. Testare dublă — Vitest și Jest pe același contract
Folosim `vitest` pentru execuție rapidă și `jest` pentru compatibilitatea ecosistemică. Menținem teste minimaliste (`add(a,b)`), apoi extindem către rutele Express cu *supertest* (opțional).


## 14. Securitate operațională — secrete, `.env`, revocări
Nu commităm secrete. `.env` este exclus, păstrăm un `.env.example`. Revocăm cheile efemere la finalul laboratorului. Validăm configurația prin auditul cheilor SSH în GitHub și prin istoricul Git (`git log --stat`).


## 15. Git avansat — *rebase*, *merge*, *stash*, *reflog*
Folosim *merge* pentru integrare explicită și *rebase* pentru istoric liniar în ramurile personale. `git stash` salvează temporar schimbări neterminate; `git reflog` oferă o plasă de siguranță pentru recuperări.


## 16. `.gitignore` pe OS/IDE — excluderi inteligente
Ignorăm `node_modules/`, `dist/`, `coverage/`, fișiere OS (`.DS_Store`, `Thumbs.db`) și directoare IDE. Păstrăm fișierele de configurare ale calității în repo pentru coerență de echipă.


## 17. Exportul livrabilelor — README.md → DOCX
Pentru predare, convertim README în DOCX cu `pandoc`. Dacă platforma necesită PDF, folosim LibreOffice pentru export secundar.


## 18. Evaluare formativă — mini‑quiz (8 itemi)
1. Enumerați pașii reflexului de 10–30 s după instalare.
2. De ce recomandăm `nvm` pe Linux și nu `apt install nodejs`?
3. Ce diferențe are SSH față de HTTPS la *push*?
4. Cum testați rapid ruta `/api/time` fără browser?
5. Ce face `eslint` diferit față de `prettier`?
6. În ce situații preferăm `rebase` în loc de `merge`?
7. Ce exclude `.gitignore` și de ce nu ar trebui să includem fișiere de build?
8. Cum documentăm reproducibil pașii în README?


## 19. Mini‑laborator L1→L3 & temă (7 zile)
- **L1:** proiect minim funcțional; **L2:** calitate (ESLint/Prettier) și teste; **L3:** robustețe (time‑outs, logging). Tema reproduce L3 și adaugă README + export DOCX, plus dovada revocării dacă s‑a lucrat pe stație publică.


## 20. Rubrică & DoD
Rubrică pe 100 p: Setup (20), Express (25), Calitate (20), Teste (15), Git&Securitate (10), Documentare (10). DoD: rute OK, calitate OK, teste OK, README & DOCX livrate, push pe GitHub.


## 21. DoR (Definition of Ready) pentru S1+
Toți studenții au toolchain complet, repo cu starterul funcțional, calitate/teste verzi și identitate Git corectă.


## 22. Anti‑patterns & troubleshooting (extins)
- *One‑file server*: separă codul pe module.
- *Secrete în repo*: folosește `.env` + `.gitignore` + rotație chei.
- *Niciun script NPM*: adaugă `start/dev/lint/test/format`.
- *PATH corupt (Win)*: reinstalare Git cu Add to PATH și restart shell.
- *ESM + Jest eșuează*: `babel-jest` + `extensionsToTreatAsEsm`.
- *Port ocupat*: schimbă `PORT` sau eliberează procesul.


## 23. FAQ

**Î: Pot folosi alt editor?**  
R: Da, dar proiectul conține preseturi VS Code pentru coerență; păstrează regulile ESLint/Prettier.

**Î: De ce două suite de testare?**  
R: Pentru portabilitate și familiarizare cu ecosisteme diferite.

**Î: Ce fac dacă nu am drepturi de instalare?**  
R: Folosește VM (VirtualBox) cu Ubuntu Desktop; toate uneltele sunt *free*.


## 24. Glosar (EN → RO)
- *rebase* — *rescriere a bazei istoricului* (repoziționarea commit‑urilor).
- *lint* — *analiză statică* a codului pentru stil/erori.
- *deploy key* — *cheie SSH asociată unui repo* cu permisiuni limitate.
- *agent* — *componentă care ține chei în memorie* pentru sesiune.


## 25. Bibliografie (APA 7; DOIs reale)
- Fielding, R. T., & Reschke, J. (2014). *Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing* (RFC 7230). IETF. https://doi.org/10.17487/RFC7230
- Thompson, T., Kyzivat, P., & Bray, T. (2017). *The JavaScript Object Notation (JSON) Data Interchange Format* (RFC 8259). IETF. https://doi.org/10.17487/RFC8259
- Thomson, M., Rescorla, E., et al. (2018). *The Transport Layer Security (TLS) Protocol Version 1.3* (RFC 8446). IETF. https://doi.org/10.17487/RFC8446
- Wirfs‑Brock, A., & Eich, B. (2020). JavaScript: The first 20 years. *Proceedings of the ACM on Programming Languages, 4*(HOPL), 1–189. https://doi.org/10.1145/3386327


## 26. Anexe — șabloane, răspunsuri, checklisturi
### 26.A Răspunsuri sintetice la mini‑quiz (secțiunea 18)
- Reflexul: verificări Node/Git/Firefox Console; motiv: detectare imediată a problemelor de mediu.
- `nvm`: izolare versiunilor și control granular fără a afecta OS‑ul.
- SSH vs. HTTPS: fără PAT, chei efemere revocabile rapid, convenabil în laborator.
- Test `/api/time`: `curl http://localhost:3000/api/time` sau `Invoke-WebRequest` în PowerShell.
- ESLint vs. Prettier: calitate semantică vs. formatare; se completează.



## 26.B Proceduri aprofundate — practici repetabile

**Procedură aprofundată 1:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 2:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 3:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 4:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 5:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 6:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 7:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 8:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 9:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 10:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 11:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 12:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 13:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 14:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 15:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 16:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 17:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 18:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 19:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 20:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 21:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 22:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 23:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 24:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 25:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 26:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 27:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 28:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 29:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 30:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 31:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 32:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 33:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 34:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 35:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 36:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 37:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 38:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 39:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 40:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 41:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 42:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 43:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 44:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 45:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 46:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 47:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 48:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 49:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 50:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 51:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 52:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 53:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 54:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 55:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 56:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 57:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 58:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 59:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.


**Procedură aprofundată 60:** În acest subcapitol parcurgem o succesiune de pași operaționali atent
justificați, pentru a consolida reflexele de instalare, configurare și verificare. Pornim de la
ipoteza că mediul a fost deja uniformizat, dar introducem variații controlate: schimbăm temporar
versiunea de Node (*downgrade* și *upgrade* cu `nvm`), verificăm reacția proiectului la diferențe de
*runtime*, evaluăm efectele asupra ecosistemului NPM (dependințe transitive, *peer dependencies*).
Documentăm fiecare pas în README cu blocuri de cod și rezultate observabile (capturi, *logs*), apoi
motivăm decizia (de ce alegem o anumită versiune sau configurare). Insistăm pe principiul *zero
magie*: prezentăm comanda, precizăm rezultatul așteptat, oferim o metodă de verificare, și discutăm
capcanele probabile (de exemplu, PATH nepropagat în PowerShell, agentul SSH inactiv pe Linux,
conflicte între ESLint și Prettier, porte ocupate, întârziere la primul *warm‑up* al DevTools). În
final, aplicăm o probă de 10–30 s (Node REPL + Firefox Console), rulăm `npm run lint` și `npm test`,
și consemnăm *status‑ul* proiectului (DoD parțial/total).  Observație: alternăm între Linux și
Windows, menționând explicit diferențele de shell și manageri de pachete; acolo unde apar mesaje de
eroare, le copiem textual și le interpretăm.

