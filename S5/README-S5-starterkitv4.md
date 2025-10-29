
# README — Ghid Firefox Developer Tools pentru **S5‑starterkitv4‑stack**

Acest document descrie pas cu pas rularea proiectului **S5‑starterkitv4‑stack** și explorarea sa în **Firefox Developer Tools**. Ghidul este orientat didactic (ce/unde/cum/și de ce), pentru a fi proiectat sau distribuit studenților.

---

## Cuprins

- [1. Descriere și obiective](#1-descriere-și-obiective)
- [2. Cerințe de sistem](#2-cerințe-de-sistem)
- [3. Instalare și pornire](#3-instalare-și-pornire)
- [4. Deschiderea în Firefox și activarea Developer Tools](#4-deschiderea-în-firefox-și-activarea-developer-tools)
- [5. Orientare în Developer Tools](#5-orientare-în-developer-tools)
  - [5.1 Inspector](#51-inspector)
  - [5.2 Console](#52-console)
  - [5.3 Network](#53-network)
  - [5.4 Storage](#54-storage)
- [6. Explorarea exemplelor 01–07](#6-explorarea-exemplelor-01–07)
  - [6.1 01 — DOM basics (selectare, inserare)](#61-01--dom-basics-selectare-inserare)
  - [6.2 02 — Evenimente: click & keyup](#62-02--evenimente-click--keyup)
  - [6.3 03 — Delegarea evenimentelor](#63-03--delegarea-evenimentelor)
  - [6.4 04 — Evenimente personalizate](#64-04--evenimente-personalizate)
  - [6.5 05 — Form & preventDefault](#65-05--form--preventdefault)
  - [6.6 06 — fetch GET/POST (API)](#66-06--fetch-getpost-api)
  - [6.7 07 — PUT/DELETE (CRUD complet)](#67-07--putdelete-crud-complet)
- [7. Depanare rapidă](#7-depanare-rapidă)
- [8. Flux de lucru recomandat la explorare](#8-flux-de-lucru-recomandat-la-explorare)
- [9. Anexă — Comenzi utile & scurtături](#9-anexă--comenzi-utile--scurtături)

---

## 1. Descriere și obiective

**S5‑starterkitv4‑stack** este un set de exemple educaționale (JS nativ) pentru **DOM** și **Evenimente**, plus două exemple care interacționează cu un **API Express** (GET/POST/PUT/DELETE) pe `http://localhost:8080`. Scopul ghidului este să arate **cum** folosim **Firefox Developer Tools** pentru a înțelege și depana:
- manipularea DOM (creare, inserare, eliminare noduri);
- evenimente (click, keyup, delegare, evenimente personalizate, propagare, `preventDefault`);
- fluxuri client–server cu `fetch` (GET/POST/PUT/DELETE), observate în **Network**;
- sănătatea API‑ului (banner + `/api/health`).

---

## 2. Cerințe de sistem

- **Node.js**: v18+ (recomandat 20 LTS).
- **Firefox** (ultima versiune stabilă).
- **PowerShell** sau un terminal echivalent.
- Arhiva proiectului: `S5-starterkitv4-stack.zip` (conține serverul și exemplele).

---

## 3. Instalare și pornire

1. **Dezarhivează** `S5-starterkitv4-stack.zip` într-un director local.
2. **Deschide un terminal** în acel director.
3. Instalează dependențele:
   ```powershell
   npm install
   ```
4. Pornește serverul:
   ```powershell
   npm start
   ```
   În terminal ar trebui să apară:
   ```text
   API is running at http://localhost:8080
   Health:           http://localhost:8080/api/health
   ```
5. Deschide în Firefox: `http://localhost:8080/`. Vei vedea pagina index cu link‑uri către **01–07**.

> **Notă**: Toate exemplele folosesc un **banner** de stare (dreapta‑sus) care face ping la `/api/health`. Verde = API OK; roșu = API indisponibil.

---

## 4. Deschiderea în Firefox și activarea Developer Tools

- Accesează `http://localhost:8080/`.
- Deschide **Firefox Developer Tools**: **F12** sau `Ctrl+Shift+I` (`Cmd+Opt+I` pe macOS).
- Poziționează panoul cum preferi (jos/lateral/detașat).

---

## 5. Orientare în Developer Tools

### 5.1 Inspector
- Vezi **arborele DOM** și **CSS** aplicat.
- Iconița **`ev`** lângă un element indică **event listeners**. Click pe **ev** pentru detalii (tipul evenimentului, fișier/linie).  
- Poți edita atribute, text, clase și observi **în timp real** efectul în pagină.

### 5.2 Console
- Afișează **erori**, **avertismente**, `console.log`.
- Poți rula expresii/funcții JS pentru a sonda rapid starea DOM‑ului sau variabile globale.

### 5.3 Network
- Listează **toate cererile HTTP** (documente, JS, CSS, fetch/XHR).
- Selectează o cerere pentru **Headers**, **Request/Response**, **Status Code**.  
- Esențial când urmărești `fetch` (GET/POST/PUT/DELETE).

### 5.4 Storage
- Inspectează **Local Storage**, **Session Storage**, **Cookies**.
- În acest starter **nu** se salvează nimic pe client; verificarea e utilă în aplicații reale.

---

## 6. Explorarea exemplelor 01–07

### 6.1 01 — DOM basics (selectare, inserare)

**Scop**: creare și inserare noduri în DOM pe eveniment `click`.

**Pași**  
1. Deschide `/01-dom-basics/`.  
2. **Inspector**: identifică `#msg`, `#add`, `#clear`, `#list`. Observă **ev** pe butoane.  
3. Click **Adaugă** cu text în input → în `#list` apare un `<div class="card">`.  
4. Click **Golește** → `#list` se golește (`replaceChildren()`).  
5. **Console**: verifică `document.querySelectorAll('#list .card').length`.  
6. **Network**: doar încărcarea inițială + `/api/health` (nu sunt cereri ulterioare).

---

### 6.2 02 — Evenimente: click & keyup

**Scop**: `click` (toggle highlight) + `keyup` (previzualizare live).

**Pași**  
1. Deschide `/02-events/`.  
2. **Inspector**: evenimente pe butonul *Schimbă highlight* și pe `#inp`.  
3. Apasă butonul → `#p` capătă/își pierde clasa `hl`.  
4. Tastează în `#inp` → `#prev` se actualizează instant.  
5. **Console**: poți sonda `prev.textContent`/`inp.value`.  
6. **Network**: doar load + `/api/health` (fără trafic la tastare).

---

### 6.3 03 — Delegarea evenimentelor

**Scop**: un **singur listener** pe container (`<ul>`) tratează click‑urile pe butoanele copil.

**Pași**  
1. Deschide `/03-delegation/`.  
2. **Inspector**: vezi `#list` (UL) și un singur **listener** atașat pe UL.  
3. Adaugă un item → `<li>` conține buton **Șterge**.  
4. Click pe butonul **Șterge** → UL, prin **delegare**, elimină `<li>`.  
5. **Console**: verifică `document.querySelectorAll('#list li').length`.  
6. **Network**: doar load + `/api/health`.

---

### 6.4 04 — Evenimente personalizate

**Scop**: `CustomEvent` + `dispatchEvent` + `detail` + `bubbles`.

**Pași**  
1. Deschide `/04-custom-event/`.  
2. **Inspector**: `#inc` (buton), `#val` (span), `#log`. **ev** pe `#val` (listener `counter:changed`).  
3. Click **Increment** → `#val` crește, se emite `counter:changed`; în `#log` apare o linie nouă.  
4. **Console**: poți inspecta ultimul `e.detail.value`.  
5. **Network**: doar load + `/api/health`.

---

### 6.5 05 — Form & preventDefault

**Scop**: interceptează `submit`, validează și afișează rezultat **fără reload**.

**Pași**  
1. Deschide `/05-form-prevent/`.  
2. **Inspector**: form `#f`, mesaj `#msg`.  
3. Trimite formularul (cu/ fără nume) → vezi mesajul; pagina **nu** se reîncarcă (datorită `e.preventDefault()`).  
4. **Console**: fără erori în caz de succes.  
5. **Network**: niciun request de `submit`; doar load + `/api/health`.

---

### 6.6 06 — fetch GET/POST (API)

**Scop**: citește lista de pe server (GET) și adaugă elemente (POST).

**Pași**  
1. Deschide `/06-fetch-get-post/`.  
2. **Network**: la load apare `GET /api/cats` (200) + `GET /api/health`.  
3. Click **Reîncarcă lista** → vezi un nou `GET /api/cats`.  
4. Introdu nume și click **Adaugă** → `POST /api/cats` (Payload `{name:"..."}`) urmat de `GET /api/cats`.  
5. **Inspector**: `#list` conține carduri `#id — name`.  
6. **Console**: erorile de rețea ar apărea aici dacă API e căzut.  
7. **Storage**: neutilizat (persistență pe server).

---

### 6.7 07 — PUT/DELETE (CRUD complet)

**Scop**: editează (PUT) și șterge (DELETE) elemente din listă.

**Pași**  
1. Deschide `/07-put-delete/`. (Dacă lista e goală, adaugă întâi în `/06-...`.)  
2. **Network**: la load `GET /api/cats`.  
3. Editează un nume → click **Salvează** → `PUT /api/cats/:id` + apoi `GET /api/cats`.  
4. Click **Șterge** → `DELETE /api/cats/:id` + apoi `GET /api/cats`.  
5. **Inspector**: lista se re‑randă după fiecare operație.  
6. **Console**: urmărește eventuale erori (ex. API indisponibil).

---

## 7. Depanare rapidă

- **Banner roșu (API OFFLINE)**: verifică terminalul; pornește serverul cu `npm start`.  
- **Port 8080 ocupat** (Windows):
  ```powershell
  netstat -ano | findstr :8080
  taskkill /PID <pid> /F
  ```
- **EJSONPARSE** la `npm start`: `package.json` trebuie să fie **JSON strict** (fără virgule terminale/comentarii).  
- **Import local în ESM**: importurile trebuie cu **extensia `.js`**: `import app from './server.js'`.  
- **Nu apare nimic în 06/07**: rutele `/api/cats` trebuie să răspundă (vezi `server.js`). Verifică **Network** pentru `404/500`.  
- **Formularul (05) se reîncarcă**: verifică `e.preventDefault()` în handlerul `submit`.  
- **Evenimente care „ajung prea departe” (04‑propagare)**: folosește `e.stopPropagation()` selectiv.

---

## 8. Flux de lucru recomandat la explorare

1. Deschide **Console** → verifică **erori** la load.  
2. Inspectează **DOM** cu **Inspector** → identifică elementele și **event listeners**.  
3. În **Network**, urmărește **fetch‑urile** (ordine, payload, coduri HTTP).  
4. Confirmă **efectele în DOM** (Inserare/ștergere/actualizare).  
5. Reia pașii pentru fiecare interacțiune; dacă ceva nu corespunde, revino la Console/Network pentru indicii.

---

## 9. Anexă — Comenzi utile & scurtături

- **Comenzi PowerShell**
  ```powershell
  npm install
  npm start
  ```
- **Scurtături Firefox DevTools**
  - Deschide DevTools: **F12** / `Ctrl+Shift+I` (`Cmd+Opt+I` pe macOS)
  - Căutare în DOM (Inspector): `Ctrl+F`
  - Reîncărcare fără cache: `Ctrl+F5`
- **Endpoint‑uri API**
  - `GET /api/health`
  - `GET /api/cats`
  - `POST /api/cats` body: `{ "name": "Luna" }`
  - `PUT /api/cats/:id` body: `{ "name": "Nou" }`
  - `DELETE /api/cats/:id`
  - `POST /api/cats/seed`

---

**Succes la laborator!** Acest README poate fi proiectat în timpul demonstrațiilor sau distribuit ca fișă de lucru.
