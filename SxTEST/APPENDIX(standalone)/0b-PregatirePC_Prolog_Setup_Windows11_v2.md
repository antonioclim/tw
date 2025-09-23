# Seminar 0 — Prolog & Setup (Windows 11, 64‑bit)
**Toolchain, inițializare proiect, server minimal, verificări rapide (Node.js ≥ 18, Firefox → F12/Console)**  
**Varianta Windows 11 x64 — „pas cu pas”, pentru începători**

> Acest ghid are un obiectiv practic: în max. 60–90 de minute, un începător pornește de la un Windows 11 „curat” și ajunge să ruleze un server minimal Express, să verifice cod JS în Node și în Firefox (F12), să ruleze teste rapide (Vitest & Jest) și să aibă linting/formatting automat (ESLint & Prettier). Include remedii pentru probleme uzuale (ex.: `git` nu este recunoscut).

---

## Cuprins
- [0. Rezumat executiv (10 puncte‑cheie)](#0-rezumat-executiv-10-puncte-cheie)
- [1. Obiective de învățare](#1-obiective-de-învățare)
- [2. Mediu & reflex de testare rapidă](#2-mediu--reflex-de-testare-rapidă)
- [3. Instalări fundamentale pe Windows 11 (cu verificări)](#3-instalări-fundamentale-pe-windows-11-cu-verificări)
  - [3.1. PowerShell „corect deschis” și drepturi Administrative când e nevoie](#31-powershell-corect-deschis-și-drepturi-administrative-când-e-nevoie)
  - [3.2. Git pentru Windows (și remediul pentru „git nu este recunoscut”)](#32-git-pentru-windows-și-remediul-pentru-git-nu-este-recunoscut)
  - [3.3. Node.js LTS și NPM](#33-nodejs-lts-și-npm)
  - [3.4. Visual Studio Code + extensii esențiale](#34-visual-studio-code--extensii-esențiale)
  - [3.5. Firefox (sau Firefox Developer Edition)](#35-firefox-sau-firefox-developer-edition)
  - [3.6. LibreOffice & Pandoc (opțional, pentru export DOCX)](#36-libreoffice--pandoc-opțional-pentru-export-docx)
  - [3.7. GitHub CLI (opțional, dar recomandat)](#37-github-cli-opțional-dar-recomandat)
  - [3.8. PNPM & Yarn (opțional), Corepack](#38-pnpm--yarn-opțional-corepack)
- [4. Inițializare proiect: server minimal Express + static](#4-inițializare-proiect-server-minimal-express--static)
  - [4.1. Scaffold „de la zero”](#41-scaffold-de-la-zero)
  - [4.2. Structură minimă de directoare](#42-structură-minimă-de-directoare)
  - [4.3. Cod minimal: `index.js` și `public/index.html`](#43-cod-minimal-indexjs-și-publicindexhtml)
  - [4.4. Scripturi NPM și rulare](#44-scripturi-npm-și-rulare)
  - [4.5. Teste de 10–30 secunde: Node REPL și Firefox Console](#45-teste-de-1030-secunde-node-repl-și-firefox-console)
- [5. ESLint & Prettier, Vitest & Jest — instalare și configurare](#5-eslint--prettier-vitest--jest--instalare-și-configurare)
  - [5.1. Instalare pachete](#51-instalare-pachete)
  - [5.2. Config ESLint (Flat config) și Prettier](#52-config-eslint-flat-config-și-prettier)
  - [5.3. Config Vitest & Jest (oglindă)](#53-config-vitest--jest-oglindă)
  - [5.4. Primul test unitar (oglindă Vitest/Jest)](#54-primul-test-unitar-oglindă-vitestjest)
- [6. Comenzi compuse & explicații](#6-comenzi-compuse--explicații)
- [7. Erori tipice & remedii (Windows 11)](#7-erori-tipice--remedii-windows-11)
- [8. Prompts utile (ChatGPT & Copilot)](#8-prompts-utile-chatgpt--copilot)
- [9. Definition of Done & checklist](#9-definition-of-done--checklist)
- [10. Bibliografie scurtă & standarde (orientare)](#10-bibliografie-scurtă--standarde-orientare)

---

## 0. Rezumat executiv (10 puncte‑cheie)
1. **Deschide PowerShell** (normal și, doar când e necesar, **Administrator**).  
2. **Instalează Git** cu `winget`, verifică `git --version`; dacă „git nu este recunoscut”, ajustează PATH sau reinstalează.  
3. **Instalează Node.js (LTS)** cu `winget`; verifică `node -v` și `npm -v`.  
4. **Instalează VS Code** și extensiile ESLint, Prettier, GitHub Copilot (opțional).  
5. **Firefox**: confirmă că F12 → Console funcționează; testează `console.log("OK")`.  
6. **Inițializează proiectul**: `mkdir tw-seminar-0 && cd tw-seminar-0 && npm init -y`.  
7. **Express + Nodemon**: `npm i express` și `npm i -D nodemon`; rulează un server static + `/ping`.  
8. **ESLint & Prettier**: `npm i -D eslint prettier`; adaugă config și scripturi.  
9. **Vitest & Jest**: `npm i -D vitest jest @types/jest babel-jest @babel/preset-env`; adaugă teste în oglindă.  
10. **Primul push pe GitHub**: `git init`, `gh repo create` (sau web), `git add .`, `git commit -m`, `git push`.  

---

## 1. Obiective de învățare
- Să instalezi și să verifici **Git**, **Node.js**, **NPM**, **VS Code**, **Firefox**, opțional **LibreOffice/Pandoc**.  
- Să creezi un **proiect minimal** (server Express + fișiere statice).  
- Să înțelegi **comenzile compuse** și operatorii shell (`&&`) și **ordinea** lor.  
- Să rulezi **teste rapide** (Vitest & Jest) pe același contract.  
- Să aplici **linting/formatting** automat cu ESLint & Prettier.  
- Să diagnostichezi erorile uzuale (PATH, permisiuni, blocări antivirus) pe Windows 11.

---

## 2. Mediu & reflex de testare rapidă
- **Node REPL**: deschide în PowerShell `node`, tastează:
  ```js
  2 + 2
  globalThis.process.version
  ```
  Ieşire așteptată: `4`, respectiv un șir gen `v20.x.y` sau `v22.x.y`.

- **Firefox Console (F12)**: deschide orice pagină, `F12` → **Console**:
  ```js
  console.log("Hello from Firefox Console");
  const now = new Date().toISOString(); now
  ```
  Vezi mesajul și un timestamp ISO‑8601.

**Reflex**: după fiecare instalare sau pas critic, rulează o **probă de 10–30 sec.** pentru confirmare.

---

## 3. Instalări fundamentale pe Windows 11 (cu verificări)

### 3.1. PowerShell „corect deschis” și drepturi Administrative când e nevoie
- Caută „PowerShell” în Start.  
- **Normal** pentru lucrul de zi cu zi; **Run as administrator** doar la instalări „de sistem”.  
- Verifică politica de execuție (informativ):  
  ```powershell
  Get-ExecutionPolicy
  ```

### 3.2. Git pentru Windows (și remediul pentru „git nu este recunoscut”)
**Simptom raportat**:  
```
git : The term 'git' is not recognized as the name of a cmdlet...
```
**Cauză**: Git nu e instalat sau nu e în `PATH` pentru sesiunea curentă.

**Instalare rapidă (winget):**
```powershell
winget install --id Git.Git -e --source winget
```
**Verificare:**
```powershell
git --version
where git
```
Dacă `where git` nu întoarce o cale gen `C:\Program Files\Git\cmd\git.exe`:
- **Închide și redeschide** PowerShell/VS Code (PATH se reîncarcă).  
- Dacă persistă, reinstalează Git selectând opțiunea *Add Git to PATH* în installerul `.exe`.  
- Verifică PATH în *System Properties → Environment Variables*. Intrări utile:
  - `C:\Program Files\Git\cmd`
  - `C:\Program Files\Git\bin` (opțional)

**Configurare minimă:**
```powershell
git config --global user.name  "Numele Tău"
git config --global user.email "emailul-tau@example.org"
git config --global init.defaultBranch main
```

### 3.3. Node.js LTS și NPM
**Instalare (winget):**
```powershell
winget install --id OpenJS.NodeJS.LTS -e --source winget
```
**Verificare:**
```powershell
node -v
npm -v
```
Așteptat: `v20.x` sau `v22.x` (OK pentru curs). Dacă ai instalat anterior „nvm for Windows”, alege o singură metodă pentru a evita conflicte.

### 3.4. Visual Studio Code + extensii esențiale
**Instalare (winget):**
```powershell
winget install --id Microsoft.VisualStudioCode -e --source winget
```
**Extensii recomandate:**
- **ESLint** (Microsoft)  
- **Prettier** (Prettier)  
- **GitHub Copilot** (opțional, cont licențiat)  
- **Error Lens** (opțional vizual)

**Setări utile (VS Code → Settings):**
- *Format On Save* = On (Prettier)  
- *ESLint: Validate* = `["javascript"]`  
- *Code Actions On Save* = `"source.fixAll.eslint"`

### 3.5. Firefox (sau Firefox Developer Edition)
Instalează ori **Firefox** obișnuit, ori **Firefox Developer Edition**. Verifică F12 → Console funcțional.  
**Experimente de 10 sec.:**
```js
console.log(navigator.userAgent);
document.title
```

### 3.6. LibreOffice & Pandoc (opțional, pentru export DOCX)
Dacă vrei conversie `.md` → `.docx` locală:
```powershell
winget install --id TheDocumentFoundation.LibreOffice -e
winget install --id Pandoc.Pandoc -e
```
Verifică:
```powershell
pandoc -v
```
Conversie exemplu:
```powershell
pandoc -s README.md -o README.docx
```

### 3.7. GitHub CLI (opțional, dar recomandat)
```powershell
winget install --id GitHub.cli -e
gh --version
```
Autentificare:
```powershell
gh auth login
```
(optează pentru HTTPS; urmează wizard‑ul).

### 3.8. PNPM & Yarn (opțional), Corepack
Node ≥ 18 include **Corepack**:
```powershell
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
```
**Notă**: Cursul folosește NPM; PNPM/Yarn sunt alternative valabile.

---

## 4. Inițializare proiect: server minimal Express + static

### 4.1. Scaffold „de la zero”
```powershell
mkdir tw-seminar-0; cd tw-seminar-0
npm init -y
npm i express
npm i -D nodemon
```
- `mkdir` creează directorul proiectului.
- `cd` intră în director.
- `npm init -y` creează `package.json` cu valori implicite.
- `npm i express` adaugă runtime dependency.
- `npm i -D nodemon` adaugă dev dependency (autoreload).

### 4.2. Structură minimă de directoare
```
tw-seminar-0/
  public/
    index.html
  index.js
  package.json
```

### 4.3. Cod minimal: `index.js` și `public/index.html`

**`index.js`**
```js
import express from "express";
import path from "node:path";

const app = express();
const PORT = process.env.PORT || 3000;

// Servește fișiere statice din ./public
app.use(express.static("public"));

// Rută de sănătate
app.get("/ping", (req, res) => {
  res.type("text/plain").send("pong");
});

// Micro‑API: timpul curent în ISO‑8601
app.get("/api/time", (req, res) => {
  res.json({ now: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server pornit: http://localhost:${PORT}`);
});
```

**`public/index.html`**
```html
<!doctype html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello Web</title>
  </head>
  <body>
    <h1>Hello Web</h1>
    <p>
      <a href="/ping" target="_blank">/ping</a> |
      <a href="/api/time" target="_blank">/api/time</a>
    </p>
    <script>
      console.log("Salut din index.html");
    </script>
  </body>
</html>
```

### 4.4. Scripturi NPM și rulare
În `package.json`, adaugă:
```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "lint": "eslint .",
    "format": "prettier -w .",
    "test": "npm run test:vitest && npm run test:jest",
    "test:vitest": "vitest run --reporter verbose",
    "test:jest": "jest --runInBand"
  }
}
```
Rulare:
```powershell
npm run dev
```
Deschide `http://localhost:3000` (sau portul indicat). În Firefox, F12 → **Network** & **Console**.

### 4.5. Teste de 10–30 secunde: Node REPL și Firefox Console
- **Node REPL**: `node` → `new Date().toISOString()`  
- **Firefox Console**: `fetch("/api/time").then(r=>r.json()).then(console.log)`

---

## 5. ESLint & Prettier, Vitest & Jest — instalare și configurare

### 5.1. Instalare pachete
Comanda din ghidul tău:
```powershell
npm i -D eslint prettier vitest jest @types/jest babel-jest @babel/preset-env
```
**Observație**: În PowerShell apare uneori „echo‑ul” comenzii. E normal. Important este ca instalarea să se încheie fără erori. Verifică `devDependencies` în `package.json`.

### 5.2. Config ESLint (Flat config) și Prettier

**`eslint.config.mjs`**
```js
// ESLint Flat Config (ESLint v9+)
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "module" },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error"
    }
  }
];
```

**`.prettierrc.json`**
```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**Verificări:**
```powershell
npm run lint
npm run format
```

### 5.3. Config Vitest & Jest (oglindă)

**`vitest.config.ts`**
```ts
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/vitest/**/*.test.js"]
  }
});
```

**`jest.config.cjs`**
```js
module.exports = {
  testEnvironment: "node",
  transform: { "^.+\.m?js$": "babel-jest" },
  extensionsToTreatAsEsm: [".js"]
};
```

**`babel.config.cjs`**
```js
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]]
};
```

### 5.4. Primul test unitar (oglindă Vitest/Jest)

**`src/add.js`**
```js
export function add(a, b) {
  return Number(a) + Number(b);
}
```

**`tests/vitest/add.test.js`**
```js
import { describe, it, expect } from "vitest";
import { add } from "../../src/add.js";

describe("add", () => {
  it("2 + 3 = 5", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

**`tests/jest/add.jest.test.js`**
```js
import { describe, it, expect } from "@jest/globals";
import { add } from "../../src/add.js";

describe("add (Jest)", () => {
  it("2 + 3 = 5", () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

Rulare:
```powershell
npm run test:vitest
npm run test:jest
npm test
```

---

## 6. Comenzi compuse & explicații
Exemplu:
```powershell
mkdir tw && cd tw && npm init -y
```
- `mkdir tw` → creează directorul.  
- `&&` → **operator de secvențiere**: execută comanda din dreapta **doar dacă** cea din stânga a reușit.  
- `cd tw` → intră în directorul nou.  
- `&& npm init -y` → inițializează proiectul doar dacă s‑a reușit `cd`.  
**De ce ordinea contează**: dacă `cd` eșuează (directorul există cu alt nume), nu vrei să rulezi `npm init -y` în directorul greșit.

---

## 7. Erori tipice & remedii (Windows 11)

### 7.1. „git nu este recunoscut”
- Instalează/reinstalează Git cu `winget`.  
- Închide/repornește PowerShell/VS Code.  
- Verifică PATH: `where git`. Adaugă în PATH `C:\Program Files\Git\cmd`.  
- Dacă folosești **PowerShell Core** și **PowerShell (Windows)**, verifică ambele sesiuni.

### 7.2. „node” sau „npm” nu sunt recunoscute
- Reinstalează Node LTS (winget).  
- Repornește shell.  
- `where node` ar trebui să indice ceva precum `C:\Program Files\nodejs\node.exe`.

### 7.3. Port ocupat (EADDRINUSE)
- Alt proces folosește portul (`3000`). Modifică `PORT` sau închide procesul „fantomă”.  

### 7.4. Antiviruş/Firewall blochează
- Unele suite blochează `node.exe` sau `git.exe`. Aprobă executabilele sau rulează ca Admin la instalare.

### 7.5. Jest + ESM erori de transform
- Asigură `babel-jest` + `extensionsToTreatAsEsm` în `jest.config.cjs`.  
- `type: "module"` în `package.json` este setat.

---

## 8. Prompts utile (ChatGPT & Copilot)
- **Testare**:  
  „Generează 10 *edge‑cases* pentru funcția `add(a,b)` și scrie teste Vitest & Jest care verifică `add(2,3)=5` și tratează non‑numere cu `Number()`.”
- **Refactor**:  
  „Rescrie `add(a,b)` păstrând semnătura; explică *trade‑off*-urile între conversia strictă și toleranța la tip; nu rupe contractele publice.”
- **Comparativ JS ↔ Python ↔ C++**:  
  „Oferă echivalente minimale pentru citirea unui argument din linia de comandă și afișarea sumei în JS (Node), Python și C++, cu explicații.”
- **Robustețe**:  
  „Adaugă `withTimeout` și `withRetry` pentru un `fetch(url)` care poate eșua intermitent; include teste scurte.”

---

## 9. Definition of Done & checklist
- [ ] Git/NPM/Node/VS Code instalate și verificate (`git --version`, `node -v`, `npm -v`).  
- [ ] Proiect creat: `npm init -y`; dependențe instalate (`express`, `nodemon`).  
- [ ] Server rulează, `/ping` și `/api/time` răspund corect.  
- [ ] ESLint & Prettier configurate; `npm run lint` și `npm run format` OK.  
- [ ] Teste `add` verzi în Vitest & Jest; `npm test` OK.  
- [ ] Primul commit & push pe GitHub (opțional cu `gh`).

---

## 10. Bibliografie scurtă & standarde (orientare)

### Literatură științifică (APA 7, DOI)
- Wirfs‑Brock, A., & Eich, B. (2020). *JavaScript: The first 20 years*. **Proceedings of the ACM on Programming Languages, 4**(HOPL), 1–189. https://doi.org/10.1145/3386327  
- Maffeis, S., Mitchell, J. C., & Taly, A. (2008). *An operational semantics for JavaScript*. In **Programming Languages and Systems** (pp. 307–325). Springer. https://doi.org/10.1007/978-3-540-89330-1_22  
- Loring, M. C., Laurenzano, M. A., Newsham, Z., Hovsmith, N., Pande, S., & Barik, T. (2017). *Semantics of asynchronous JavaScript*. **ACM SIGPLAN Notices, 52**(11), 51–62. https://doi.org/10.1145/3170472.3133846  
- Michie, D. (1968). “Memo” functions and machine learning. **Nature, 218**(5136), 19–22. https://doi.org/10.1038/218019a0  
- Spinellis, D. (2005). *Version control systems*. **IEEE Software, 22**(5), 108–109. https://doi.org/10.1109/MS.2005.91  
- Hilton, M., Tunnell, T., Huang, K., Marinov, D., & Dig, D. (2016). *Usage, costs, and benefits of continuous integration in open-source projects*. In **ESEC/FSE 2016** (pp. 426–437). https://doi.org/10.1145/2950290.2950358  

### Standarde / Documentații (fără DOI, surse oficiale)
- Node.js Docs — nodejs.org  
- NPM Docs — docs.npmjs.com  
- Git — git-scm.com  
- Mozilla MDN Web Docs — developer.mozilla.org  
- Visual Studio Code — code.visualstudio.com

---

> **Gata!** Ai infrastructura minimă pentru toate seminariile (0–12). Urmează să construim conținutul specific fiecărui seminar peste acest schelet: rute Express, CLI Node, module ESM, DOM/Events (Firefox), testare în oglindă (Vitest/Jest) și bune practici de calitate (ESLint/Prettier).
