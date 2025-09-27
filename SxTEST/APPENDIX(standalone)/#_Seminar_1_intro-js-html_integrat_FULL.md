# Seminar 1 — Introducere în JavaScript și HTML (Versiune integrată)


# Tehnologii web — Seminarul 1 (versiune integrată, curs + laborator)

**Titlu:** Introducere în JavaScript și HTML — versiunea integrată (curs + laborator)  
**Autor:** Antonio Clim  
**Afiliere:** ASE — Facultatea de Cibernetică, Statistică și Informatică Economică (CSIE)  
**Data:** 26 septembrie 2025  
**SlugScurt:** `intro-js-html-integrat`  
**Materiale de curs intern (de sprijin):**  
- *Seminar_0_ghid_total.md* — Prolog & setare mediu.  
- *SEMINAR_1_js-seminar-complet.html* — structură & exerciții.  
- PDF-urile All‑in‑One (McFedries; Alvarado) și WT AI‑Assisted (Noring).

---

## Pasul 1 — Reconstrucție & integrare (plan operațional)

- **Tema & scope:** „Introducere în JavaScript și HTML” — reconstruită ca un pachet coerent: documentare + cod runnable + starter kit + rutine de testare.  
- **Public & precondiții:** studenți cu experiență în C++/Python/SQLite/CLI/VS Code; nu presupunem JS/HTML anterior.  
- **Arhitectură didactică:** 4 faze — *Setup & reflex de testare*, *Teorie ancorată*, *Aplicații progresive*, *Evaluare & DoD*.  
- **Comenzi duale:** fiecare pas include variante **PowerShell (Windows)** și **bash (Ubuntu)**.  
- **Integrare materiale interne:** folosim Prologul (Seminar_0) pentru reflexe & mediu; folosim materialul S1 (HTML încărcat) pentru structură și tipologia exercițiilor.  
- **Livrabile:** (1) document MD + DOCX stilat; (2) **Starter ZIP** runnable; (3) instrucțiuni VS Code/Firefox/Git; (4) structură repo & commits semantice.  
- **Bloom:** remember → understand → apply → analyse → evaluate → create; maparea explicită în secțiunile documentului.  
- **Evaluare:** mini‑quiz pe module + temă (termen uzual **7 zile**), *Definition of Done* clar.  
- **CI minim (opțional la S1):** scripturi `lint`/`format`; ulterior GitHub Actions.  
- **Volum țintă:** > 11 000 cuvinte cumulat (livrat în tranșe).

---

## Pasul 2 — Starter Kit (minimul necesar, gata de rulat)

**Descărcare:** 📦 [Seminar_1_Starter_Kit_min.zip](sandbox:/mnt/data/Seminar_1_Starter_Kit_min.zip)

**Structură:**
```
seminar-1-starter/
├─ src/
│  ├─ index.html
│  └─ app.js
├─ assets/
│  └─ style.css
├─ tests/
│  └─ smoke.md
├─ .gitignore
├─ .editorconfig
├─ package.json
└─ README.md
```

**Rulare (alegeți o variantă):**
- **VS Code (Live Server / Live Preview):** deschideți folderul → „Go Live” / „Preview” pe `src/index.html`.  
- **Server simplu Python:**  
  - **bash:** `python3 -m http.server 8080` → deschideți `http://localhost:8080/src/index.html`.

**Comenzi Git & editor:**
- **PowerShell (Windows):**
```powershell
PS: cd <folderul-descarcat>
PS: git init
PS: git add .
PS: git commit -m "chore: seed seminar-1 starter"
PS: code .
```
- **bash (Ubuntu):**
```bash
bash: cd <folderul-descarcat>
bash: git init
bash: git add .
bash: git commit -m "chore: seed seminar-1 starter"
```

> Notă: `package.json` include scriptul `start` (server http Python), fără dependențe — potrivit pentru laborator rapid.

---

## Copertă
**Tehnologii web — Seminarul 1**  
**Titlu:** Introducere în JavaScript și HTML — versiunea integrată (curs + laborator)  
**Autor:** Antonio Clim • **Afiliere:** ASE — CSIE  
**Data:** 26 septembrie 2025 • **Slug:** `intro-js-html-integrat`

---

## Cuprins (nivel 1–2)

- 0. Rezumat executiv  
- 1. Obiective de învățare & introducere  
  - 1.1 Public țintă, precondiții, modul de lucru  
  - 1.2 Maparea obiectivelor pe nivelurile Bloom  
- 2. Mediu & reflex de testare rapidă (PS/bash; VS Code/Firefox/Node/Git)  
- 3. Teorie consolidată (HTML semantic, DOM, BOM, încărcare script, event loop, variabile & tipuri)  
- 4. Aplicații/Cod/Comenzi (A–F) — runnable imediat  
- 5. Evaluare formativă (mini‑quiz pe secțiuni) + temă (≤ 7 zile)  
- 6. Sinteză & cheat‑sheet (tabele)  
- 7. Glosar & FAQ  
- 8. Bibliografie (materiale interne; externe doar cu DOI real)  
- 9. Anexe (soluții explicate)  
- 10. Mini‑laborator L1→L3 (checklist)  
- 11. Anti‑patterns & troubleshooting  
- 12. Prompts utile (ChatGPT & Copilot)  
- 13. Rubrică de evaluare & Definition of Done  
- 14. Întrebări de auto‑verificare (răspunsuri în Anexe)

---

## 0. Rezumat executiv (puncte‑cheie)
1) **Reflex de testare rapidă:** Node REPL, Firefox Console și server local; validăm mediul prin *snippets* și loguri ordonate.  
2) **HTML semantic + JS:** pagină minimă, comportamente incrementale (*Greet*, *Counter*, *Toggle theme*, *To‑do*, *Form validation*, *Stopwatch*).  
3) **Event loop & evenimente:** *call stack*, *task queue*, *microtasks*; la S1 rămânem pe operații sigure.  
4) **Securitate & claritate:** evităm `innerHTML` pentru inputul utilizatorului; folosim `textContent`; separăm logică/ prezentare.  
5) **Accesibilitate minimă:** `label` asociate; `aria-live="polite"`.  
6) **Comparativ multi‑lingvaje:** echivalente minimale în Python/C++.  
7) **Evaluare continuă:** mini‑quiz pe secțiuni; temă cu *DoD* și rubrică; termen uzual **7 zile**.  
8) **Artefacte livrate:** documentare (MD/DOCX), **Starter ZIP**, instrucțiuni PS/bash/VS Code/Firefox/Git, structură repo.  
9) **Politici de citare:** materiale încărcate — „material de curs intern”; standarde externe — doar cu DOI real (APA 7).  
10) **Scop final:** bază robustă pentru modules, fetch API, async/await, testare automată.

---

## 1. Obiective de învățare & introducere

### 1.1 Public, precondiții, modul de lucru
- **Public:** studenți cu experiență (C++/Python/SQLite/CLI/VS Code); fără JS/HTML anterior.  
- **Precondiții:** CLI de bază, Git init/add/commit, editare VS Code.  
- **Mod de lucru:** explicații scurte + **exemple runnable**; fiecare exemplu are (a)–(g): specificație, cod, comenzi PS/bash, explicații, test, echivalente Python/C++, erori & remedii.  
- **Resurse interne:** folosim structura și tipologia de exerciții din materialul HTML S1 pentru consistență.

### 1.2 Maparea obiectivelor pe Bloom
- **Remember:** elemente semantice HTML, sintaxă JS, *console API*.  
- **Understand:** relația HTML–CSS–JS; *defer/async*; DOM & *event loop*.  
- **Apply:** implementarea *widgets* interactive în pagina noastră.  
- **Analyse:** compararea strategiilor de manipulare DOM; pro/contra.  
- **Evaluate:** mini‑rubrică pentru calitatea codului și accesibilitate.  
- **Create:** extensii ale *stopwatch*-ului (lap‑times) și ale *to‑do*-ului (persistență).

---

> Următorul pas (la comanda „next”): **2. Mediu & reflex de testare rapidă**, cu toate comenzile necesare pentru rulare în VS Code/Firefox și pentru commit/push pe Git.


# 2. Mediu & reflex de testare rapidă (Windows PowerShell / Ubuntu bash)

**Țintă:** să avem un flux în care *scriem → rulăm → observăm → commit/push* în câteva minute. Vom consolida acest „reflex” pentru toate exemplele.

---

## 2.1 Pre‑reche­zi­te & versiuni recomandate

- **Node.js**: LTS (ex. 20.x LTS). Verificare:
  - **PS:** `node -v`
  - **bash:** `node -v`
- **Git**: instalat și configurat user/email.
  - **PS:** `git --version`
  - **bash:** `git --version`
- **VS Code**: extensii recomandate — *ESLint*, *Live Server* sau *Live Preview*.
- **Firefox** (Dev Edition sau Stable) cu **DevTools** (Web Console, Inspector, Network).

> Reflex: dacă una dintre componente lipsește, instalați-o înainte de a continua. (Seminar_0 – Prolog, material de curs intern, conține ghid pas‑cu‑pas.)

---

## 2.2 Creare spațiu de lucru & structură minimă

Vom folosi structura „starter”, dar puteți crea manual aceleași directoare dacă preferați.

**Opțiunea A — Despachetați Starter ZIP (recomandat):**
1) Descărcați: 📦 `Seminar_1_Starter_Kit_min.zip` (vedeți linkul din secțiunea anterioară).
2) Dezarhivați într‑un director de lucru (ex.: `~/work/sem1` sau `C:\Users\<you>\work\sem1`).

**Opțiunea B — Creați manual:**
- **PS:**
```powershell
PS: mkdir seminar-1; cd seminar-1
PS: mkdir src, tests, assets
PS: ni .\src\index.html -ItemType File
PS: ni .\srcpp.js -ItemType File
PS: ni .ssets\style.css -ItemType File
PS: ni .	ests\smoke.md -ItemType File
PS: ni .\README.md -ItemType File
```
- **bash:**
```bash
bash: mkdir -p seminar-1/{src,tests,assets} && cd seminar-1
bash: : > src/index.html
bash: : > src/app.js
bash: : > assets/style.css
bash: : > tests/smoke.md
bash: : > README.md
```

> Reflex: țineți editorul (VS Code) și un terminal deschise în folderul proiectului.

---

## 2.3 Iniţializare Git & commit semantic (end‑to‑end)

- **PS:**
```powershell
PS: git init
PS: git add .
PS: git commit -m "chore: initialize seminar-1 workspace"
PS: git branch -M main
```
- **bash:**
```bash
bash: git init
bash: git add .
bash: git commit -m "chore: initialize seminar-1 workspace"
bash: git branch -M main
```

**Config global (o singură dată pe mașină):**
- **PS:**
```powershell
PS: git config --global user.name "Prenume Nume"
PS: git config --global user.email "you@example.com"
```
- **bash:**
```bash
bash: git config --global user.name "Prenume Nume"
bash: git config --global user.email "you@example.com"
```

**Legare la GitHub (HTTPS simplu):**
- **PS:**
```powershell
PS: gh repo create user/seminar-1 --public --source . --remote origin --push
# (sau manual)
PS: git remote add origin https://github.com/<user>/seminar-1.git
PS: git push -u origin main
```
- **bash:**
```bash
bash: gh repo create user/seminar-1 --public --source . --remote origin --push
# (sau manual)
bash: git remote add origin https://github.com/<user>/seminar-1.git
bash: git push -u origin main
```

> Dacă nu folosiți `gh` (GitHub CLI), creați repo‑ul din interfața web, apoi rulați `git remote add origin ...` + `git push -u origin main`.

**Strategie de commit (exemple):**
- `feat: add greet widget with validation`
- `feat: counter with min/max and messages`
- `feat: theme toggle persisted in localStorage`
- `feat: todo micro with event delegation`
- `feat: form validation and stopwatch`
- `chore: add editorconfig and basic styles`

---

## 2.4 Rulare locală: server & verificare în browser

**Varianta A — VS Code (Live Server / Live Preview)**
1) Deschideți folderul în VS Code (`code .`).  
2) Deschideți `src/index.html`.  
3) Click *Go Live* (Live Server) sau *Preview* (Live Preview).

**Varianta B — Server Python minimal**
- **bash:**
```bash
bash: python3 -m http.server 8080
# apoi accesați: http://localhost:8080/src/index.html
```
- **PS:**
```powershell
PS: py -3 -m http.server 8080
# apoi deschideți: http://localhost:8080/src/index.html
```

**Firefox DevTools — „reflex de testare”:**
- Deschideți **Web Console** (`Ctrl+Shift+K`).
- Executați `document.title`, `document.querySelectorAll('section').length`.
- Interacționați cu UI; verificați logurile `console.log`/`console.warn`.

---

## 2.5 Node REPL & probe rapide

Folosiți Node REPL pentru a valida expresii JS, fără browser.

- **PS/bashi:**
```bash
node
> [1,2,3].map(n=>n*n)
> (function greet(n){ return `Salut, ${n}!`; })('Ana')
> .exit
```

**Script minim Node (opțional):**
- **PS:**
```powershell
PS: ni .\scripts\hello.mjs -ItemType File
PS: ${source} = @"
export function hello(n){ return `Salut, ${n}!`; }
console.log(hello('Ana'));
"@
PS: Set-Content .\scripts\hello.mjs $source -Encoding UTF8
PS: node scripts/hello.mjs
```
- **bash:**
```bash
bash: mkdir -p scripts
bash: cat > scripts/hello.mjs <<'EOF'
export function hello(n){ return `Salut, ${n}!`; }
console.log(hello('Ana'));
EOF
bash: node scripts/hello.mjs
```

> Reflex: pentru S1, rămânem pe *vanilla JS* în browser; Node e folosit aici doar pentru exerciții rapide în REPL.

---

## 2.6 VS Code — extensii & setări utile

- **Extensii:** ESLint, Live Server/Preview.  
- **Format on Save:** Settings → `editor.formatOnSave = true`.  
- **EditorConfig:** fișier `.editorconfig` existent în Starter setează `utf-8`, LF, 2 spații, `trim_trailing_whitespace`.

**Tasks (opțional):** creați `.vscode/tasks.json` pentru a porni serverul Python din VS Code.

---

## 2.7 Verificare a structurii DOM & a accesibilității

În `src/index.html` (din Starter) avem secțiuni: *Greet*, *Counter*, *To‑do*, *Form*, *Stopwatch*, plus butonul *Toggle theme*. Verificați:
- existența `label[for]` pentru inputuri;  
- `aria-live="polite"` pe zonele de feedback;  
- `role="status"` unde e cazul (mesaje).

**Probe DevTools:**
- Inspector → *Accessibility* pane: verificați `aria-pressed` la butonul To‑do.
- Console → `document.querySelectorAll('section').length` (ar trebui > 0).

---

## 2.8 Smoke tests (rapide)

1) **Greet:** „Ana” → „Salut, Ana!”; gol → mesaj de completare.  
2) **Counter:** `+` peste 10 → avertisment; `-` sub 0 → avertisment.  
3) **Theme:** toggle; reîncărcare → persistă.  
4) **To‑do:** adăugați elemente; marcați ca realizat; re‑marcați.  
5) **Form:** `ana` → invalid; `ana@example.com` → succes.  
6) **Stopwatch:** Start ~3s → Stop ~3.0s; Reset → 0.0s.

---

## 2.9 Troubleshooting (simptom → cauză → remediu)

- **Nu pot accesa `localStorage`** → rulați din `file://` → serviți HTTP (Live Server sau `http.server`).  
- **Elementul e `null`** → scriptul rulează prea devreme → mențineți `defer` pe `<script>`.  
- **Diacritice greșite** → lipsește `<meta charset="utf-8">` → adăugați în `<head>`.  
- **Port ocupat (8080)** → schimbați portul (ex.: 8081) sau închideți procesul care îl folosește.  
- **Commit respins (pre-receive hooks)** → verificați politica repo‑ului; remediați mesajele ESLint/format.

---

## 2.10 Workflow complet (rezumat practic)

1) **Editați** `src/*.html|js|css`.  
2) **Rulați** local (Live Server/Preview sau `python3 -m http.server 8080`).  
3) **Observați** în Firefox DevTools (Console/Inspector).  
4) **Comiteți** modificările (`git add . && git commit -m "feat: ..."`).  
5) **Împingeți** în GitHub (`git push`).  
6) **Repetați** pe fiecare exemplar până trece *smoke test*‑ul.

---

> În tranșa următoare trecem la **3. Teorie consolidată** (HTML semantic, DOM/BOM, încărcare script, event loop, variabile & tipuri) și apoi reluăm **Aplicații A–F** gata de rulat, îmbunătățite cu verificări și clarificări din materialul S1 (inclus ca material de curs intern).


# 3. Teorie consolidată (fundamente Web Platform, nivel S1)

> Obiectiv: să stabilim un vocabular comun (HTML semantic, DOM/BOM, încărcare script, event loop, variabile & tipuri) care explică **de ce** exemplele funcționează, nu doar **cum**.

---

## 3.1 HTML semantic — de ce contează

**HTML** definește **structura** documentului. Un document bine structurat este mai ușor de stilat (CSS), de îmbunătățit (JS) și de interpretat de către cititoare de ecran și crawler‑e.
- **Landmarks** (repere): `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- **Regulă**: *separation of concerns* — HTML (structură), CSS (prezentare), JS (comportament).
- **Id vs. class**: `id` este unic într‑un document; `class` este reutilizabilă și poate aștepta mai multe valori.

**Micro‑ghid de alegere semantică:**
- Grupări logice de conținut → `section` cu titlu `h2/h3` coerent.
- Conținut independent (poate fi citit în afara contextului) → `article`.
- Navigație → `nav` (linkuri către secțiuni/ pagini).
- Element auxiliar (ex. note laterale) → `aside`.

**Accesibilitate minimă:**
- `label[for]` conectat la `input#id`; etichetele cresc aria de click și claritatea.
- `aria-live="polite"` pe zone ce afișează feedback dinamic.
- `role="status"` atunci când zona transmite stări de sistem.

> *Capcană comună:* *div soup* — folosirea exclusivă a `div` în locul elementelor semantice. **Remediu:** alegeți elementul semantic potrivit înainte de a crea un `div`.

---

## 3.2 DOM & BOM — ce manipulăm de fapt

**DOM (Document Object Model)** reprezintă documentul ca **arbore de noduri**. Fiecare element HTML corespunde unui **obiect** (nod) pe care îl putem **selecta** și **modifica** din JS.

### Selectare & traversare
- `document.querySelector(selector)` → primul nod care corespunde selectorului CSS.
- `document.querySelectorAll(selector)` → *NodeList* (iterabilă).
- `element.closest(selector)` → cel mai apropiat strămoș care corespunde selectorului.

### Proprietăți sigure pentru text
- `element.textContent = "..."` — setează **text brut** (preferat pentru input de la utilizator).
- Evităm `innerHTML` pentru date neîncredințate (risc de injecții).

### Clase & atribute
- `element.classList.add/remove/toggle('nume-clasă')` pentru stiluri.
- `element.setAttribute('aria-...','...')` pentru accesibilitate.

**BOM (Browser Object Model)** oferă interacțiuni cu fereastra și istoricul de navigare: `window`, `location`, `history`, `console`. Pentru laboratorul S1, ne bazăm mai ales pe `console` pentru observabilitate și pe `location` pentru a înțelege originea (`http://localhost:8080`).

---

## 3.3 Încărcarea scripturilor — `defer`, `async`, inline

**Fără `defer/async`**, un `<script>` în `<head>` **blochează parsarea** HTML, riscând selecții `null`.  
**`defer`**: descarcă în paralel, **execută după parsare**, **păstrează ordinea** scripturilor — recomandat pentru cod care atinge DOM.  
**`async`**: descarcă în paralel, **execută imediat ce e gata**, **nu păstrează ordinea** — potrivit pentru scripturi independente (analytics).

> *Regulă practică S1:* folosiți **`defer`** pe toate scripturile care manipulează DOM; acest lucru armonizează codul și reduce erorile „Cannot read properties of null”.

---

## 3.4 Event model & event loop (intuitiv)

JS în browser este **single‑threaded** la nivel de **call stack**, dar poate orchestra operații asincrone prin **cozi**:
- **Task queue (macrotasks)**: click, `setTimeout`, evenimente rețea.
- **Microtask queue**: *Promises*, `MutationObserver`.
- **Event loop**: când **stack‑ul** e gol, se rulează **toate microtasks**, apoi **un task** din coada de macrotasks.

**Consecință practică:** nu plasați operații costisitoare în *handlers* de UI — pot bloca interfața. Pentru S1 rămânem pe evenimente simple (`click`, `keydown`, `submit`) și un `setInterval` moderat (`100ms`) pentru *stopwatch*.

---

## 3.5 Variabile, tipuri, strict mode

- `let` (re‑atribuire permisă, **block scope**), `const` (constanță de referință), `var` (**function scope** – evităm în cod modern).
- **Primitive**: `number`, `string`, `boolean`, `null`, `undefined`, `bigint`, `symbol`.
- **Non‑primitive**: obiecte, funcții, *arrays*.
- `"use strict"` activează reguli mai stricte (de ex., variabile nedeclarate devin erori).

**Pattern S1:** folosiți `const` pentru referințe stabile (selecții DOM, funcții) și `let` pentru *state* (ex. `count`).

---

## 3.6 Observabilitate: Console API

- `console.log(obj)` — log lizibil (preferabil cu obiecte: `{event:'greet', name, at}`).
- `console.warn/console.error` — pentru anomalii/erori.
- `console.table(array)` — pentru liste (ex. *lap times* pe stopwatch).

> **Reflex:** logați evenimentele semnificative cu structuri consistente; veți depana mai rapid.

---

## 3.7 Siguranță & accesibilitate — reguli S1

- **Fără `innerHTML`** pe date de intrare.
- **`label[for]`** pentru toate `input`‑urile.
- **`aria-live="polite"`** pe zone de feedback dinamic.
- **Ordine de tab naturală**; evitați atributele `tabindex` arbitrare la S1.

---

# 4. Aplicații/Cod/Comenzi — A–C (rulabile, integrate în Starter)

> În Starter Kit aveți implementările complete; aici le explicăm și marcăm „reflexele” (comenzi, teste, Git).

---

## 4.1 A — Greet (input → feedback)

**(a) Specificație.** Un buton **Greet** citește `#name`, validează minim (non‑vid), afișează mesaj în `<output id="out">` și scrie un log structurat.

**(b) Cod (extras din Starter, `src/app.js`).**
```javascript
const input = document.querySelector('#name');
const btn   = document.querySelector('#btn-greet');
const out   = document.querySelector('#out');

btn?.addEventListener('click', () => {
  const name = (input.value || '').trim();
  if (!name) {
    out.textContent = 'Introduceți un nume, vă rog.';
    console.warn('Empty name submitted');
    return;
  }
  out.textContent = `Salut, ${name}!`;
  console.log({ event: 'greet', name, at: new Date().toISOString() });
});
```

**(c) Comenzi.**
- **VS Code:** *Go Live* / *Preview* pe `src/index.html`.
- **Server Python:** `python3 -m http.server 8080` → `http://localhost:8080/src/index.html`.

**(d) Test (Firefox).**
- `Ana` → „Salut, Ana!” și log `{event:'greet', ...}`.
- Gol → mesaj de completare + `console.warn`.

**(e) Echivalente (transfer cognitiv).**
- *Python CLI:*
```python
name = input("Introduceți numele: ").strip()
print(f"Salut, {name}!" if name else "Introduceți un nume, vă rog.")
```
- *C++ CLI:* `std::getline` + „trim” + condiție `empty()`.

**(f) Erori frecvente & remedii.**
- `btn` e `null` → lipsește `defer` sau `id` greșit → verificați `<script defer>` și `#btn-greet`.

---

## 4.2 B — Counter (+/−, min/max, mesaje)

**(a) Specificație.** Două butoane controlează un contor. Nu scade sub 0, avertizează la MAX (10).

**(b) Cod (extras).**
```javascript
const countOut = document.querySelector('#count');
const btnMinus = document.querySelector('#btn-minus');
const btnPlus  = document.querySelector('#btn-plus');
const countMsg = document.querySelector('#count-msg');
let count = 0; const MIN = 0, MAX = 10;

function renderCount(){ countOut.textContent = String(count); }
function setMessage(msg){ countMsg.textContent = msg || ''; }

btnPlus?.addEventListener('click', () => {
  if (count < MAX) { count++; renderCount(); setMessage(''); }
  else { setMessage('Am atins valoarea maximă.'); }
});
btnMinus?.addEventListener('click', () => {
  if (count > MIN) { count--; renderCount(); setMessage(''); }
  else { setMessage('Valoarea nu poate fi mai mică decât 0.'); }
});
renderCount();
```

**(c) Test.** `+` de 11 ori → mesaj MAX; `−` sub 0 → mesaj MIN.

**(d) Observabilitate (opțional).**
- Logați `{event:'count/inc', count}` la `+` și `{event:'count/dec', count}` la `−`.

**(e) Echivalente.**
- *Python*: funcții `inc/dec` cu limite.
- *C++*: `std::pair<int,std::string>` ca rezultat (valoare, mesaj).

---

## 4.3 C — Toggle theme (persistență `localStorage`)

**(a) Specificație.** Butonul `#btn-theme` comută între „light/dark” și persistă alegerea.

**(b) Cod (extras).**
```javascript
const btnTheme = document.querySelector('#btn-theme');
const THEME_KEY = 'pref-theme';
function applyTheme(mode){
  document.documentElement.classList.toggle('theme-dark', mode === 'dark');
}
function loadTheme(){ return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'; }
function saveTheme(mode){ localStorage.setItem(THEME_KEY, mode); }
let mode = loadTheme(); applyTheme(mode);
btnTheme?.addEventListener('click', () => {
  mode = (mode === 'light') ? 'dark' : 'light';
  applyTheme(mode); saveTheme(mode);
});
```

**(c) Test.** Comutați tema → reîncărcați pagina → modul rămâne.

**(d) Erori frecvente.**
- Rulați din `file://` → `localStorage` poate fi restricționat → serviți peste HTTP (`http.server` / Live Server).

---

### Workflow Git recomandat după fiecare exemplar
```bash
git add .
git commit -m "feat: implement A/B/C (greet/counter/theme) with tests and notes"
git push
```

> În următoarea tranșă: **4.4–4.6 (D–F)** — *Keyboard interactions*, *Event delegation (To‑do)* și *Stopwatch* cu `setInterval`; apoi **5. Evaluare formativă** extinsă și **6. Cheat‑sheet** recapitulativ.


# 4. Aplicații/Cod/Comenzi — D–F (rulabile, integrate), apoi 5–6

---

## 4.4 D — Interacțiuni din tastatură (Enter / Escape) pentru `#name`

**(a) Specificație.**  
La **Enter** pe inputul `#name` se declanșează butonul *Greet*; la **Escape** se golește câmpul și se re‑focalizează inputul.

**(b) Cod (de adăugat în `src/app.js`).**
```javascript
// ===== Keyboard interactions pentru inputul #name =====
input?.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter') {
    btn?.click(); // reutilizăm logica existentă (DRY)
  } else if (ev.key === 'Escape') {
    input.value = '';
    out.textContent = '';
    setTimeout(() => input.focus(), 0); // focus politicos în următorul task
  }
});
```

**(c) Comenzi.**
- VS Code: *Go Live* / *Preview* pe `src/index.html`.
- Python: `python3 -m http.server 8080` → `http://localhost:8080/src/index.html`.

**(d) Test (Firefox).**  
Introduceți un nume → **Enter** → mesaj de salut; **Escape** → câmp gol, focus în `#name`.

**(e) Echivalente (conceptual).**  
- *CLI Python/C++*: ar cere biblioteci de input neliniar (în afara scopului S1); ideea logică rămâne „confirmă/renunță”.

**(f) Erori & remedii.**  
- Dublă declanșare la Enter → formularul face submit nativ → folosiți `ev.preventDefault()` dacă transformați în `<form>`.

---

## 4.5 E — *Event delegation* pentru To‑do micro (listă dinamică)

**(a) Specificație.**  
O listă `<ul id="todo-list">` primește itemi noi; marcarea se face printr‑un buton din dreptul fiecărui item. Un singur *listener* pe container se ocupă de toate butoanele (scalabil).

**(b) Cod (HTML + JS, extras)**
HTML (în `<main>`):
```html
<section aria-labelledby="todo-title">
  <h2 id="todo-title">To‑do micro</h2>
  <label for="todo-input">Sarcină:</label>
  <input id="todo-input" type="text" placeholder="ex.: Citește capitolul 1" />
  <button id="todo-add" type="button">Adaugă</button>
  <ul id="todo-list"></ul>
  <p id="todo-msg" aria-live="polite"></p>
</section>
```
JS (în `src/app.js`):
```javascript
const todoInput = document.querySelector('#todo-input');
const todoAdd   = document.querySelector('#todo-add');
const todoList  = document.querySelector('#todo-list');
const todoMsg   = document.querySelector('#todo-msg');

function addTodo(text){
  const li = document.createElement('li');
  li.innerHTML = `<button class="mark" aria-pressed="false">✓</button> <span>${text}</span>`;
  todoList.appendChild(li);
}

todoAdd?.addEventListener('click', () => {
  const text = (todoInput.value || '').trim();
  if (!text) { todoMsg.textContent = 'Introduceți un text non‑vid.'; return; }
  addTodo(text);
  todoInput.value = '';
  todoInput.focus();
  todoMsg.textContent = 'Element adăugat.';
});

todoList?.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button.mark');
  if (!btn) return;
  const pressed = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', String(!pressed));
  btn.nextElementSibling?.classList.toggle('done', !pressed);
});
```

**(c) Stil minim (în `<head>` sau `assets/style.css`).**
```css
.done { text-decoration: line-through; opacity: .7; }
#todo-list { list-style: none; padding-left: 0; }
#todo-list li { margin: .25rem 0; }
.mark { width: 2rem; }
```

**(d) Test.**  
Adăugați 2–3 itemi, marcați/unmarcați; inspectați `aria-pressed` în DevTools.

**(e) Erori & remedii.**  
- Clickul pe ✓ nu are efect → structura diferă de cea din `addTodo` → verificați `closest('button.mark')`.

---

## 4.6 F — *Stopwatch* cu `setInterval` (legat de *event loop*)

**(a) Specificație.**  
Afișează timpul la fiecare 100 ms; suportă Start/Stop/Reset, cu acumulare corectă a duratei.

**(b) Cod (HTML + JS, extras)**
HTML:
```html
<section aria-labelledby="sw-title">
  <h2 id="sw-title">Stopwatch</h2>
  <output id="sw-out" aria-live="polite">0.0s</output>
  <div>
    <button id="sw-start" type="button">Start</button>
    <button id="sw-stop" type="button">Stop</button>
    <button id="sw-reset" type="button">Reset</button>
  </div>
</section>
```
JS:
```javascript
const swOut   = document.querySelector('#sw-out');
const swStart = document.querySelector('#sw-start');
const swStop  = document.querySelector('#sw-stop');
const swReset = document.querySelector('#sw-reset');

let t0 = 0, acc = 0, timerId = null;
function renderSW(ms){ swOut.textContent = (ms / 1000).toFixed(1) + 's'; }
function tick(){ const now = Date.now(); renderSW(acc + (now - t0)); }

swStart?.addEventListener('click', () => {
  if (timerId) return;
  t0 = Date.now();
  timerId = setInterval(tick, 100);
});
swStop?.addEventListener('click', () => {
  if (!timerId) return;
  clearInterval(timerId); timerId = null;
  acc = acc + (Date.now() - t0);
  renderSW(acc);
});
swReset?.addEventListener('click', () => {
  if (timerId) { clearInterval(timerId); timerId = null; }
  t0 = 0; acc = 0; renderSW(0);
});
```

**(c) Test.**  
Start ~3s → Stop → ~3.0s; Start din nou → Stop → cumul; Reset → 0.0s.

**(d) Observații.**  
- `setInterval` e livrat prin *task queue*; folosim `Date.now()` pentru a calcula corect timpul (nu incrementăm „orb” cu 100 ms).

**(e) Erori & remedii.**  
- Timpul „fuge” la tab inactiv → throttling de tab; pentru precizie mare, preferați `performance.now()` și tab activ.

---

# 5. Evaluare formativă (extinsă) + temă (≤ 7 zile)

## 5.1 Mini‑quiz (A) — conceptual (10 itemi)
1) (*remember*) Ce face `defer`?  
**R:** Amână execuția până după parsarea HTML și menține ordinea scripturilor.  
2) (*remember*) Ce returnează `querySelectorAll`?  
**R:** *NodeList* iterabilă.  
3) (*understand*) Diferența `textContent` vs `innerHTML`?  
**R:** `textContent` setează text brut (sigur pentru input); `innerHTML` interpretează HTML.  
4) (*apply*) Un input fără `label[for]` — care e corectarea minimă?  
**R:** Adăugați `<label for="id">...` și `id` pe `input`.  
5) (*analyse*) Avantaj cheie al *event delegation*?  
**R:** Un singur listener pentru elemente dinamice/numeroase; scalabilitate.  
6) (*analyse*) Dezavantaj *event delegation*?  
**R:** Gestionarea `event.target`/`closest` mai complexă.  
7) (*evaluate*) E potrivit `sessionStorage` pentru tema UI?  
**R:** Nu; preferăm `localStorage` pentru persistență跨 sesiuni.  
8) (*apply*) Cum preveniți submitul unui formular în demo local?  
**R:** `ev.preventDefault()` în handlerul `submit`.  
9) (*understand*) De ce evităm operații costisitoare în handlers?  
**R:** Blochează *call stack*, interfața „îngheață”.  
10) (*create*) Adăugați „Lap” la *stopwatch* — ce date memorați?  
**R:** Un `Array<number>` cu timpi relativi și o funcție `renderLaps()`.

## 5.2 Mini‑quiz (B) — practică (5 itemi cu cod scurt)
1) Completați: `document.________('#out')` pentru a selecta outputul.  
**R:** `querySelector`  
2) Afișați mesaj sigur într‑un element `p` cu id `msg`.  
**R:** `document.querySelector('#msg').textContent = 'OK';`  
3) Adăugați/înlăturați clasa `done` pe `el`.  
**R:** `el.classList.toggle('done')`  
4) Log structurat pentru evenimentul `login` cu utilizator `ana`.  
**R:** `console.log({event:'login', user:'ana', at:new Date().toISOString()});`  
5) Preveniți reîncărcarea la formular.  
**R:** `ev.preventDefault()` în `frm.addEventListener('submit', ev => { ... })`

## 5.3 Temă pentru acasă (deadline: în ≤ 7 zile)

**Tema S1 — „Micro‑SPA fără framework”**  
Cerințe:  
- Extindeți Starter‑ul cu **„Lap times”** la *stopwatch* și **persistență** To‑do în `localStorage`.  
- Adăugați un **buton „Clear all”** pentru To‑do cu confirmare.  
- Scrieți un **README** concis: pași PS/bash/VS Code, capturi de ecran, *Definition of Done*.  
- **Git:** minim 5 commituri semantice (de ex. `feat: add lap times`, `feat: persist todo`, `feat: clear all`, `docs: update README`, `chore: polish styles`).

**Definition of Done (DoD) pentru temă:**  
- Fără erori în Web Console.  
- *Lap times* afișate, To‑do persistă între sesiuni.  
- `README` cu pași de rulare și secțiune „Known issues”.  
- Repo public pe GitHub; link livrat la predare.

**Grilă de punctaj (100p):**  
- Funcționalitate (40) • Calitate cod (25) • Accesibilitate minimă (10) • Observabilitate/loguri (10) • Documentare (10) • Disciplina Git (5).

---

# 6. Sinteză & Cheat‑sheet (recapitulare rapidă)

## 6.1 DOM
| Sarcină | API | Observații |
|---|---|---|
| Selectare singulară | `document.querySelector(sel)` | `#id`, `.class`, `tag[attr]` |
| Selectare multiplă | `document.querySelectorAll(sel)` | *NodeList* iterabilă |
| Text sigur | `el.textContent = '...'` | evită interpretarea HTML |
| Clase CSS | `el.classList.add/remove/toggle(x)` | fără manipulare brută `className` |
| Atribute ARIA | `el.setAttribute('aria-...','...')` | pentru cititoare de ecran |

## 6.2 Evenimente
| Eveniment | Când | Notă |
|---|---|---|
| `click` | activare buton/zonă | cel mai frecvent |
| `keydown` | tastă apăsată | folosiți `ev.key` („Enter”) |
| `submit` | trimitere formular | `ev.preventDefault()` pentru demo local |
| `DOMContentLoaded` | DOM construit | alternativă la `defer` |

## 6.3 Reflex de testare
1) Deschideți DevTools (Console).  
2) Interacționați cu UI.  
3) Observați loguri structurate (`console.log({event:'...', ...})`).  
4) *Smoke tests* (Greet/Counter/Theme/To‑do/Form/Stopwatch).

## 6.4 Git — exemplu de sesiune
```bash
git add .
git commit -m "feat: add keyboard interactions and todo delegation"
git push
```

---

> Urmează: **7. Glosar & FAQ**, **8. Bibliografie** (materiale interne + eventuale surse standard cu DOI), **9. Anexe (soluții)**, **10. Mini‑laborator L1→L3**, **11. Anti‑patterns & troubleshooting**, **12. Prompts utile**, **13. Rubrică & DoD**, **14. Întrebări de auto‑verificare** — toate consolidate în varianta integrată.


# 7. Glosar & FAQ

## 7.1 Glosar (selectiv)
- **DOM (Document Object Model)** — *reprezentarea arbore a documentului HTML manipulabilă din JS*.
- **BOM (Browser Object Model)** — *obiecte ale ferestrei/navigației (window, location, history, console)*.
- **Event loop** — *mecanismul care „pompează” evenimentele din cozi către call stack*.
- **ARIA** — *atribute pentru accesibilitate (expun semantica către cititoare de ecran)*.
- **Delegation (event)** — *un singur listener pe container gestionează interacțiunile elementelor copil*.
- **`localStorage`** — *stocare key–value persistentă la nivel de origine (origin)*.
- **`defer`** — *atribut de script care amână execuția până după parsarea DOM, păstrând ordinea*.

## 7.2 FAQ
**Î: Pot pune toate scripturile la finalul `body`?**  
**R:** Da, dar `defer` în `<head>` e preferat pentru claritate și predictibilitate.

**Î: Cum evit „div soup”?**  
**R:** Folosiți elemente semantice (`header/nav/main/section/article/aside/footer`) și titluri (`h1–h3`) coerente.

**Î: De ce nu `innerHTML` pentru text introdus de utilizator?**  
**R:** Risc de injecții; `textContent` menține datele ca text brut.

**Î: Pot salva preferințe și în cookies?**  
**R:** Da, dar pentru preferințe UI per site `localStorage` e mai simplu (nu expiră implicit).

**Î: Cum diagnostic blocaje UI?**  
**R:** Profilare în DevTools (Performance), reducerea logicii în *handlers*, folosirea logurilor structurate.

---

# 8. Bibliografie

**Materiale de curs intern (fără DOI):**
- Seminar_0_ghid_total.md — *Prolog & setare mediu.*
- SEMINAR_1_js-seminar-complet.html — *structură & exerciții consolidate pentru S1.*
- McFedries, P. — *HTML, CSS & JavaScript All‑in‑One* (PDF încărcat).
- Alvarado, J. — *All‑In‑One HTML, CSS & JavaScript* (PDF încărcat).
- Noring, C. — *WT AI‑Assisted Programming for Web Learning* (PDF încărcat).

**Notă despre surse externe:** Pentru S1 nu am introdus specificații cu DOI. Dacă în iterațiile viitoare adăugăm referințe la standarde IETF (RFC), acestea vor fi citate în stil APA 7 cu DOI de forma `10.17487/RFCXXXX`.

---

# 9. Anexe — soluții explicate (selecție)

## 9.1 „Greet” — variante
- Varianta cu mesaj de eroare temporizat (dispare după 3s).
- Variantă cu buton *Clear* care șterge și poziționează *focus* pe input.

## 9.2 „To‑do” — persistenta în `localStorage` (schemă)
```javascript
const KEY = 'todos';
function loadTodos(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
function saveTodos(items){ localStorage.setItem(KEY, JSON.stringify(items)); }
```

## 9.3 „Stopwatch” — Lap times (schemă)
```javascript
const laps = [];
function addLap(ms){ laps.push(ms); console.table(laps.map((v,i)=>({lap:i+1, s:(v/1000).toFixed(2)}))); }
```

---

# 10. Mini‑laborator progresiv (L1→L2→L3)

**L1 — Bază:** rulați Starter‑ul, verificați „smoke tests”, comiteți primul set de schimbări.  
**L2 — Intermediar:** adăugați „Lap times”, persistați To‑do, creați README cu capturi.  
**L3 — Extins:** introduceți un `lint`/`format`, creați un workflow GitHub Actions pentru lint.

Checklist per nivel: vezi Secțiunea 10 (în versiunea integrată).

---

# 11. Anti‑patterns & troubleshooting (consolidat)

**Anti‑patterns:** `innerHTML` pe input user; scripturi blocante fără `defer/async`; lipsa `label`/`aria` pentru elemente interactive.  
**Troubleshooting:** element `null` → verificați `defer` și `id`‑uri; `localStorage` inaccesibil → serviți HTTP; port ocupat → schimbați portul sau închideți procesul.

---

# 12. Prompts utile (ChatGPT & Copilot)

- „Generează un *diff* de refactor pentru a separa logică de UI în acest fișier `app.js`.”  
- „Propune 5 teste manuale *edge cases* pentru formularul de e‑mail.”  
- „Scrie un checklist de *accessibility smoke tests* pentru această pagină.”

---

# 13. Rubrică de evaluare & Definition of Done (consolidat)

**Rubrică (100p):** Funcționalitate (40) • Calitate cod (25) • Accesibilitate (10) • Observabilitate (10) • Documentare (10) • Git (5).  
**DoD:** fără erori în Console; `defer` pe scripturile DOM; `textContent` pentru input; preferință de temă persistată; README cu pași PS/bash.

---

# 14. Întrebări de auto‑verificare (răspunsuri în Anexe)

1) Ce landmark semantic folosești pentru navigația principală?  
2) Unde montezi clasa de temă pentru întreaga pagină? De ce?  
3) Ce diferență produce `defer` într‑o pagină cu scripturi care manipulează DOM?  
4) Cum se aplică *event delegation* într‑o listă care se populează dinamic?  
5) Ce pași minimi sunt necesari pentru a persista o preferință UI în `localStorage`?  
6) Cum ai extinde *stopwatch* cu *lap times* și cum ai reprezenta datele?  
7) Un coleg propune să folosească `innerHTML` pentru a introduce mesajul de salut. Cum argumentezi alternativa?  
8) Cum ai structura logurile pentru depanare rapidă?

---

**Sfârșit — Secțiunile 7–14 (versiunea integrată).**

