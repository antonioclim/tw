# Starter Kit – Evenimente & DOM (Node.js + Express, port 8080)

Acest starter kit conține **7 exemple** gradate (01–07) pentru evenimente în browser și manipularea DOM, plus un
server **Express** unic pe **portul 8080** care servește paginile și expune un API demonstrativ.

## Cum se rulează pe Windows în Visual Studio Code (VSC)

1. **Prerechizite**: instalați Node.js LTS de pe site-ul oficial (repornire terminal după instalare).
2. Deschideți acest folder în VSC (`File → Open Folder...`).
3. În terminalul VSC, rulați:
   ```bash
   npm install
   npm start
   ```
4. În terminal va apărea mesajul **API is running**.
5. Deschideți în browser `http://localhost:8080/` și accesați exemplele din meniu.
   - API de sănătate: `http://localhost:8080/health` sau `http://localhost:8080/api/health`.

## Structură
- `index.js` – punct de intrare.
- `server.js` – server Express pe 8080; servește `/examples` și expune API `/api/cats` (GET/POST/PUT/DELETE) + `/health`.
- `examples/` – fiecare subfolder conține un exemplu cu `index.html`, `app.js` și `README.md`.
- `.vscode/launch.json` – configurare de lansare în VSC.
- `package.json` – scripturi npm.

## Exemple
1. **01-click** – handler `click`; actualizare DOM.
2. **02-keyup-preview** – previzualizare live la tastare (`keyup`).
3. **03-custom-event** – eveniment personalizat (dispatchEvent).
4. **04-propagation-preventdefault** – propagare & `preventDefault()`.
5. **05-dom-agenda** – creare/eliminare noduri DOM (mini-agendă).
6. **06-fetch-get-post** – consum API (GET/POST) cu `fetch`.
7. **07-put-delete** – completare CRUD (PUT/DELETE).

**Notă:** Rulați o singură instanță a serverului pe portul 8080.

### Health check
- **Endpoint simplu:** `GET /api` → `{ "status": "API is running" }`
- **Endpoint detaliat:** `GET /api/health` → `{ status, name, version, uptime, timestamp }`
- **Banner UI:** Toate paginile din `examples/` includ `/<health.js>` care afișează automat starea API în partea superioară a paginii.
