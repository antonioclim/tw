# Seminarul 0 — Prolog & Setup complet (toolchain, inițializare proiect, server minimal)
**Autor:** Cadrul didactic (coordonator)  
**Data:** 2025-09-22  
**Nivel:** Începători / Novici  
**Format:** Ghid pas cu pas, cu exemple testabile imediat în **Node.js ≥ 18** și în **Firefox → F12 (Consolă)**

---

## Cuprins
- [0. Rezumat executiv (tl;dr)](#0-rezumat-executiv-tldr)
- [1. Obiective de învățare & rezultate așteptate](#1-obiective-de-învățare--rezultate-așteptate)
- [2. Mediu & reflex de testare rapidă](#2-mediu--reflex-de-testare-rapidă)
  - [2.1. Experimente de 10–30 secunde (Node & Firefox)](#21-experimente-de-1030-secunde-node--firefox)
  - [2.2. Comenzi compuse în shell: explicarea `&&`, `;` și `|`](#22-comenzi-compuse-în-shell-explicarea--și-)
- [3. Instalare & configurare pe Ubuntu Desktop 25.04 LTS (pas cu pas)](#3-instalare--configurare-pe-ubuntu-desktop-2504-lts-pas-cu-pas)
  - [3.1. Actualizare sistem & utilitare de bază](#31-actualizare-sistem--utilitare-de-bază)
  - [3.2. Git + GitHub (SSH, configurare globală)](#32-git--github-ssh-configurare-globală)
  - [3.3. Node.js ≥ 18 (cu `nvm`, alternativ apt)](#33-nodejs--18-cu-nvm-alternativ-apt)
  - [3.4. Editor & unelte: VS Code / Codium, ESLint, Prettier](#34-editor--unelte-vs-code--codium-eslint-prettier)
  - [3.5. Testare: Vitest & Jest (în oglindă)](#35-testare-vitest--jest-în-oglindă)
  - [3.6. Browser: Firefox pentru dezvoltare (DevTools + add‑ons utile)](#36-browser-firefox-pentru-dezvoltare-devtools--addons-utile)
  - [3.7. Pandoc + LibreOffice (pentru export DOCX/PDF din Markdown)](#37-pandoc--libreoffice-pentru-export-docxpdf-din-markdown)
  - [3.8. SQL local: SQLite3 CLI (pentru seminariile 9+)](#38-sql-local-sqlite3-cli-pentru-seminariile-9)
  - [3.9. Alternative opționale: PNPM/Yarn, Workspaces, BrowserSync](#39-alternative-opționale-pnpmyarn-workspaces-browsersync)
- [4. Teorie: HTTP vs HTML, Node.js vs browser, proiect minimal](#4-teorie-http-vs-html-nodejs-vs-browser-proiect-minimal)
- [5. Aplicații/Cod/Comenzi (rulabile imediat)](#5-aplicațiicodcomenzi-rulabile-imediat)
  - [Ex.1 — „Hello web” static + server Express minimal](#ex1--hello-web-static--server-express-minimal)
  - [Ex.2 — Rută de sănătate `GET /ping → pong`](#ex2--rută-de-sănătate-get-ping--pong)
  - [Ex.3 — API de timp `GET /api/time → {{ now: ISO-8601 }}`](#ex3--api-de-timp-get-apitime---now-iso-8601-)
  - [Ex.4 — Script CLI: citirea argumentelor (`process.argv`)](#ex4--script-cli-citirea-argumentelor-processargv)
  - [Ex.5 — Testare rapidă (Vitest + Jest) pe același contract](#ex5--testare-rapidă-vitest--jest-pe-același-contract)
- [6. Mini‑laborator progresiv (L1→L2→L3)](#6-minilaborator-progresiv-l1l2l3)
- [7. Anti‑pattern‑uri, capcane & troubleshooting](#7-antipatternuri-capcane--troubleshooting)
- [8. Prompts utile (ChatGPT & GitHub Copilot)](#8-prompts-utile-chatgpt--github-copilot)
- [9. Rubrică de evaluare & Definition of Done](#9-rubrică-de-evaluare--definition-of-done)
- [10. Întrebări de auto‑verificare + răspunsuri scurte](#10-întrebări-de-autoverificare--răspunsuri-scurte)
- [11. Bibliografie (APA 7) & Standarde/Specificații](#11-bibliografie-apa-7--standardespecificații)

---

## 0. Rezumat executiv (tl;dr)
1. Diferență de rol: **HTTP** = protocol de transfer; **HTML** = limbaj de marcare.  
2. **Node.js** rulează JavaScript pe server/CLI; **browserul** rulează JS în pagină, în sandbox.  
3. Inițializezi un proiect în 3 pași: `mkdir … && cd … && npm init -y` → `npm i express` → cod minimal `index.js`.  
4. Servești fișiere statice din `public/`, plus rute simple (`/ping`, `/api/time`).  
5. Configurezi calitatea: **ESLint + Prettier**; teste „în oglindă”: **Vitest & Jest**.  
6. Testezi rapid orice fragment în **Firefox (F12 → Console)** sau în **Node REPL**.  
7. Git & GitHub: inițializezi repo, legi la remote, împingi codul.  
8. Robusteză: folosește timeouts/`AbortController` doar când e logic (de exemplu, la fetch).  
9. Comparații JS ↔ Python ↔ C++: modele diferite (dinamic vs static), dar ideile rămân aceleași.  
10. **Definition of Done**: server pornește, rutele răspund corect, lint+teste verzi, README clar.

---

## 1. Obiective de învățare & rezultate așteptate
- Să distingi clar **protocol** (HTTP) de **limbaj** (HTML) și de **runtime** (Node).  
- Să instalezi și să configurezi **toolchain‑ul complet** pe Ubuntu 25.04 LTS.  
- Să creezi rapid un **proiect Node** cu un **server Express** care servește static și răspunde JSON.  
- Să înțelegi **comenzile compuse** în shell și să poți explica fiecare componentă.  
- Să rulezi **micro‑experimente** în Node/Firefox și să validezi output‑urile.  
- Să configurezi **ESLint, Prettier** și **Vitest/Jest** pentru un workflow sănătos.  
- Să folosești **Git/GitHub** pentru versionare și colaborare.  
- Să poți formula **prompts** utile pentru AI‑assist, în stil VSL (Verify → Specify → Learn).

---

## 2. Mediu & reflex de testare rapidă

### 2.1. Experimente de 10–30 secunde (Node & Firefox)
**Node REPL:**  
```bash
node
> 2 + 3
5
> ((a,b)=>a+b)(2,3)
5
> process.version
```
**Firefox (F12 → Consolă):**  
```js
[1,2,3].map(x => x*2)  // [2, 4, 6]
globalThis.location.href // URL-ul paginii curente
```

### 2.2. Comenzi compuse în shell: explicarea `&&`, `;` și `|`
- `A && B` → execută **B doar dacă A reușește** (cod 0).  
- `A ; B` → execută **B indiferent** de rezultatul lui A.  
- `A | B` → trimite **stdout‑ul lui A ca stdin** în B (pipeline).  

Ex.:  
```bash
mkdir tw-seminar-0 && cd tw-seminar-0 && npm init -y
```
1) `mkdir` creează directorul; 2) `cd` intră în el (doar dacă `mkdir` a reușit); 3) `npm init -y` generează `package.json` cu răspunsuri implicite.

---

## 3. Instalare & configurare pe Ubuntu Desktop 25.04 LTS (pas cu pas)

> Scop: o singură dată, un **setup complet** pentru toate cele 13 seminarii.

### 3.1. Actualizare sistem & utilitare de bază
```bash
sudo apt update && sudo apt -y upgrade
sudo apt -y install build-essential curl wget ca-certificates gnupg git unzip zip
```

### 3.2. Git + GitHub (SSH, configurare globală)
```bash
git --version
git config --global user.name "Prenume Nume"
git config --global user.email "you@example.org"
ssh-keygen -t ed25519 -C "you@example.org"
cat ~/.ssh/id_ed25519.pub
```
Adaugă cheia publică în **GitHub → Settings → SSH and GPG keys**. Testează:  
```bash
ssh -T git@github.com
```

### 3.3. Node.js ≥ 18 (cu `nvm`, alternativ apt)
**Varianta recomandată (nvm):**  
```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Reîncarcă shell-ul, apoi:
nvm install --lts
node -v && npm -v
```

**Alternativ apt (poate instala versiuni mai vechi):**
```bash
sudo apt -y install nodejs npm
node -v && npm -v
```

### 3.4. Editor & unelte: VS Code / Codium, ESLint, Prettier
- Instalează **VS Code** (Snap) sau **VSCodium**:  
```bash
sudo snap install code --classic   # sau: sudo snap install codium --classic
```
- În proiect:  
```bash
npm i -D eslint prettier
npx eslint --init   # alege ESM, Browser+Node, style standard sau airbnb
```
**Prettier**: creează `.prettierrc.json`:
```json
{ "semi": true, "singleQuote": true, "trailingComma": "es5" }
```

### 3.5. Testare: Vitest & Jest (în oglindă)
```bash
npm i -D vitest jest babel-jest @babel/preset-env @types/jest
```
`package.json`:
```json
{
  "type": "module",
  "scripts": {
    "test:vitest": "vitest run --reporter verbose",
    "test:jest": "jest --runInBand",
    "test": "npm run test:vitest && npm run test:jest"
  }
}
```
`jest.config.cjs`:
```js
module.exports = {
  testEnvironment: 'node',
  transform: { '^.+\.m?js$': 'babel-jest' },
  extensionsToTreatAsEsm: ['.js']
};
```
`babel.config.cjs`:
```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
};
```

### 3.6. Browser: Firefox pentru dezvoltare (DevTools + add‑ons utile)
- **DevTools**: F12 → Inspector, Console, Network, Storage.  
- **Add‑ons utile**: *JSON Viewer*, *React DevTools* (pentru seminariile 10–12).  
- Preferințe: activați „**Enable browser chrome and add‑on debugging toolboxes**” când aveți nevoie de debugging avansat.

### 3.7. Pandoc + LibreOffice (pentru export DOCX/PDF din Markdown)
```bash
sudo apt -y install pandoc libreoffice
```
Export rapid:
```bash
pandoc Seminar0_Prolog_Setup_extins.md -o Seminar0_Prolog_Setup_extins.docx
```

### 3.8. SQL local: SQLite3 CLI (pentru seminariile 9+)
```bash
sudo apt -y install sqlite3
sqlite3 --version
```

### 3.9. Alternative opționale: PNPM/Yarn, Workspaces, BrowserSync
```bash
sudo npm i -g pnpm yarn
sudo npm i -g browser-sync
```

---

## 4. Teorie: HTTP vs HTML, Node.js vs browser, proiect minimal
- **HTTP**: protocol de transport pentru cereri/răspunsuri (metode, status codes, antete).  
- **HTML**: limbaj de marcare pentru structurarea documentelor.  
- **Node.js**: runtime JS pe server/CLI; are module, acces la FS, rețea.  
- **Browser**: rulează JS în pagină, cu API‑uri DOM, restricții de securitate (CSP, CORS).  
- **Proiect minimal**: structură clară `public/` (statice) + `index.js` (server).

---

## 5. Aplicații/Cod/Comenzi (rulabile imediat)

### Ex.1 — „Hello web” static + server Express minimal
**(a) Specificație.** Servește `/public/index.html` la `http://localhost:3000/`.

**(b) Cod minimal.**
```bash
mkdir tw-seminar-0 && cd tw-seminar-0 && npm init -y
npm i express && npm i -D nodemon
mkdir public
printf '<!doctype html><html><body><h1>hello web</h1></body></html>' > public/index.html
```
`index.js`:
```js
import express from 'express';
const app = express();
app.use(express.static('public'));
app.listen(3000, () => console.log('http://localhost:3000'));
```

**(c) Rulare.**
```bash
node index.js      # sau: npx nodemon index.js (autoreload)
```

**(d) De ce funcționează.** `express.static('public')` mapează fișierele din director la rădăcină. 

**(e) JS ↔ Python ↔ C++ (mini‑echivalente).**
- *Python (Flask)*:
```py
from flask import Flask, send_from_directory
app = Flask(__name__)
@app.route('/')
def home(): return send_from_directory('public', 'index.html')
app.run(port=3000)
```
- *C++ (cpp-httplib)*:
```cpp
#include "httplib.h"
int main(){
  httplib::Server svr;
  svr.set_mount_point("/", "./public");
  svr.listen("0.0.0.0", 3000);
}
```

**(f) Test rapid.** Deschide `http://localhost:3000/` → vezi „hello web”.  
**(g) Erori tipice.** Port ocupat (EADDRINUSE) → schimbă portul; folder greșit → verifică `public/`.

---

### Ex.2 — Rută de sănătate `GET /ping → pong`
**(a) Specificație.** La `GET /ping` serverul răspunde text `pong`.

**(b) Cod.**
```js
app.get('/ping', (req,res)=> res.type('text/plain').send('pong'));
```

**(c) Verificare.**
```bash
curl -i http://localhost:3000/ping
```

**(d) Mecanism.** Express face _routing_ pe metodă+cale.  
**(e) Echivalente.**
- *Python Flask*: `@app.get('/ping')` → `return 'pong'`  
- *C++ httplib*: `svr.Get("/ping", [](const auto&, auto& res){ res.set_content("pong","text/plain"); });`
**(f) Test (Vitest).** `expect('pong').toBe('pong')` (schelet).  
**(g) Capcane.** `res.send()` dublu → eroare.

---

### Ex.3 — API de timp `GET /api/time → { now: ISO-8601 }`
**(a) Specificație.** JSON cu timpul curent în ISO‑8601.  
**(b) Cod.**
```js
app.get('/api/time', (req,res)=> res.json({ now: new Date().toISOString() }));
```
**(c) Verificare.**
```bash
curl -s http://localhost:3000/api/time
```
**(d) De ce.** `res.json` setează automat `Content-Type`.  
**(e) Echivalente.** Python/C++ după caz.  
**(f) Test rapid.** `Date.parse(...)` e valid.  
**(g) Edge‑cases.** Fus orar.

---

### Ex.4 — Script CLI: `process.argv`
**(a) Specificație.** Suma numerelor din linia de comandă.  
**(b) Cod (`sum-cli.js`).**
```js
const xs = process.argv.slice(2).map(Number);
const ok = xs.every(Number.isFinite);
if (!ok) { console.error('Folosește numai numere'); process.exit(1); }
console.log(xs.reduce((a,b)=>a+b,0));
```
**(c) Rulare.** `node sum-cli.js 1 2 3` → `6`.  
**(d) Mecanism.** `argv` conține argumentele utilizatorului.  
**(e) Echivalente.** Python/C++ minimal.  
**(f) Test.** Intrări non‑numerice → exit 1.  
**(g) Capcane.** `Number('')` → 0.

---

### Ex.5 — Testare în oglindă (Vitest + Jest)
**(a) Specificație.** `add(2,3)=5`.  
**(b) Cod `src/add.js`.**
```js
export const add = (a,b) => a + b;
```
**(c) Test Vitest & Jest** (schelet ca mai sus).  
**(d) Rulare.** `npm run test`.  
**(e) De ce.** Portabilitate a suitei.  
**(f) Capcane.** ESM + Jest → `babel-jest`.

---

## 6. Mini‑laborator progresiv (L1→L2→L3)
- **L1:** proiect minimal (`express.static`, `/ping`, `/api/time`), README, lint OK.  
- **L2:** adaugă CLI, teste Vitest+Jest, repo GitHub.  
- **L3:** `withTimeout` + `AbortController` pentru fluxuri externe.

---

## 7. Anti‑pattern‑uri, capcane & troubleshooting
- „Totul în `index.js`” → structurează în module.  
- Fără scripturi în `package.json` → adaugă `start`, `dev`, `test`.  
- ESM + Jest fără configurare → adaugă `babel-jest`.  
- Port 3000 ocupat → schimbă portul.  
- Ignori codurile de ieșire în CLI → folosește `process.exit(1)` la erori.

---

## 8. Prompts utile (ChatGPT & GitHub Copilot)
- **Testare:** „Generează 10 *edge‑cases* pentru `/api/time` și scrie teste Vitest care validează formatul ISO‑8601.”  
- **Refactor:** „Împarte serverul în `app.js` (exportă `app`) și `index.js` (bootstrap).”  
- **Comparativ:** „Oferă echivalent minimal în Python/C++ pentru `/ping`.”  
- **Robustețe:** „Adaugă `withTimeout` pentru un `fetch` și scrie teste care verifică respingerea după 50ms.”

---

## 9. Rubrică de evaluare & Definition of Done
- **Corectitudine (40%)**, **Calitate cod (25%)**, **Testare (20%)**, **Documentare (10%)**, **Git workflow (5%)**.  
**DoD:** server funcțional, rute verificate, lint+teste verzi, README clar, repo public.

---

## 10. Întrebări de auto‑verificare + răspunsuri scurte
1. HTTP vs HTML? → Protocol vs limbaj de marcare.  
2. `express.static`? → Servește fișiere direct din director.  
3. `process.argv.slice(2)`? → Argumentele utilizatorului.  
4. ESM+Jest? → `babel-jest` + `extensionsToTreatAsEsm`.  
5. Când `AbortController`? → Anulezi operații asincrone nefolositoare.

---

## 11. Bibliografie (APA 7) & Standarde/Specificații

### Literatură științifică (cu DOI)
- Wirfs‑Brock, A., & Eich, B. (2020). *JavaScript: The first 20 years*. **Proceedings of the ACM on Programming Languages, 4**(HOPL), 1–189. https://doi.org/10.1145/3386327  
- Maffeis, S., Mitchell, J. C., & Taly, A. (2008). *An operational semantics for JavaScript*. In **Programming Languages and Systems** (pp. 307–325). Springer. https://doi.org/10.1007/978-3-540-89330-1_22  
- Loring, M. C., Laurenzano, M. A., Newsham, Z., Hovsmith, N., Pande, S., Barik, T., & others. (2017). *Semantics of asynchronous JavaScript*. **ACM SIGPLAN Notices, 52**(11), 51–62. https://doi.org/10.1145/3170472.3133846  
- Michie, D. (1968). “Memo” functions and machine learning. **Nature, 218**(5136), 19–22. https://doi.org/10.1038/218019a0  
- Ungar, D., & Smith, R. B. (1991). SELF: The power of simplicity. **Higher‑Order and Symbolic Computation, 4**(3), 171–216. https://doi.org/10.1007/BF01806105  
- Ungar, D., & Smith, R. B. (1987). Self: The power of simplicity. In **OOPSLA ‘87**. ACM. https://doi.org/10.1145/38765.38828  

### Standarde/Specificații (fără DOI)
- ECMAScript® Language Specification (ECMA‑262), TC39.  
- HTTP/1.1 (RFC 7230+), IETF.  
- HTML Living Standard, WHATWG.

> Acest prolog pregătește terenul pentru toate cele 13 seminarii și poate fi exportat în DOCX prin `pandoc`.

