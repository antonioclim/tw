# S12 – Redux (NextLab) – Kit de predare cu Dashboard (Vite)

Acest proiect este un **starter kit didactic** pentru Seminarul 12 (Redux), construit astfel încât studenţii să poată:

- rula **toate aplicaţiile** (pas cu pas) în paralel;
- naviga dintr-un **dashboard central** (port 3000) către fiecare pas (porturile 3001–3004);
- parcurge **materiale explicative în HTML** (interactive, bine grupate) pentru fiecare pas;
- testa **Notes API** (port 8080) prin Postman şi (opţional) printr-un „Postman-lite” inclus în dashboard.

> Observaţie: fişierele `.srt` sunt păstrate în `resources/subtitles/` pentru arhivare, însă dashboard-ul trimite studenţii către ghidurile HTML aferente.

---

## Structură

```
S12nextlab/
  dashboard/                 # server static (port 3000) + resurse HTML
  steps/
    step1_router/            # React Router (port 3001)
    step2_useReducer/        # useReducer (port 3002)
    step3_redux/             # Redux (port 3003)
    step4_redux_async/       # Redux + async (port 3004)
  servers/
    notes-api/               # Express API (port 8080)
  resources/
    slides/                  # documente .docx
    subtitles/               # .srt (arhivă)
```

---

## Cerinţe

- Windows 11
- Node.js LTS (recomandat) + npm în PATH
- Visual Studio Code

---

## Instalare (Windows)

Din rădăcina proiectului:

```powershell
.\install_all.bat
```

Scriptul rulează `npm install` în toate directoarele relevante.

---

## Rulare (Dashboard + toţi paşii + API)

```powershell
.\run_dashboard.bat
```

Se pornesc:

- Dashboard: http://localhost:3000
- Step 1: http://localhost:3001
- Step 2: http://localhost:3002
- Step 3: http://localhost:3003
- Step 4: http://localhost:3004
- Notes API: http://localhost:8080

---

## Dashboard – ce găsiţi şi cum folosiţi

Dashboard-ul (port 3000) este un „hub” didactic:

- **buton de lansare** pentru fiecare pas;
- **buton de explicaţii** (HTML) pentru fiecare pas:
  - `step1.html` – ghid Step 1 (React Router)
  - `step2.html` – ghid Step 2 (useReducer)
  - `step3.html` – ghid Step 3 (Redux)
  - `step4.html` – ghid Step 4 (Redux async + API)
- **Ghid Postman (Notes API)** – `postman.html`
- **Postman-lite** (opţional) – `tool_postman_lite.html`
- **API quick links** – `api.html`

---

## Resurse incluse

### Ghiduri HTML (pentru studenţi)

Aceste ghiduri sunt servite direct de dashboard (port 3000) şi sunt concepute să fie citite „în paralel” cu rularea aplicaţiilor:

- http://localhost:3000/step1.html
- http://localhost:3000/step2.html
- http://localhost:3000/step3.html
- http://localhost:3000/step4.html

### Teorie (DOCX)

- `resources/slides/A (S12-teorie) React Router, useReducer și Redux Toolkit.docx`

> Notă: dacă aveţi o versiune finală/actualizată a teoriei, o puteţi înlocui direct cu acest fişier (păstrând numele), fără să modificaţi dashboard-ul.

### Subtitrări (SRT – arhivă)

- `resources/subtitles/S12v1.srt`
- `resources/subtitles/S12v2.srt`
- `resources/subtitles/S12v3.srt`
- `resources/subtitles/S12v4.srt`

---

## Notes API (servers/notes-api)

API-ul este gândit ca suport pentru Step 4 şi pentru demonstraţii (Postman).

Endpoint-uri:

- `GET /health`
- `GET /notes`
- `POST /notes`
- `DELETE /notes/:id`

Rulare (manual, dacă nu folosiţi `run_dashboard.bat`):

```powershell
cd servers\notes-api
npm start
```

---

## Recomandări pentru predare

- Porniţi cu dashboard-ul şi deschideţi fiecare pas în tab separat.
- Alternaţi între:
  - **aplicaţia din pas** (ce vede studentul)
  - **ghidul HTML** (ce discutăm + de ce)
  - **codul din VSC** (ce modificăm efectiv)
- Pentru Step 4, rulaţi o demonstraţie scurtă în Postman (colecţie + request-uri), apoi comparaţi cu comportamentul din aplicaţie.

---

## Troubleshooting rapid

- Dacă un port este ocupat, opriţi procesul sau schimbaţi portul în scripturile `.bat` / `package.json`.
- Dacă dashboard-ul nu poate lansa un pas, verificaţi că:
  - a rulat `install_all.bat` cu succes;
  - există Node.js în PATH;
  - nu există politici restrictive de execuţie pentru scripturile `.bat`.

