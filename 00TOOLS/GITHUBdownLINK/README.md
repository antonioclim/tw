# GitHub Directory Downloader

Această aplicație vă permite să descărcați conținutul unui subdirector dintr-un depozit GitHub sub forma unei arhive ZIP. Utilizatorul introduce URL-ul către directorul dorit și (opțional) un token personal de acces (PAT) pentru a accesa depozite private sau pentru a mări limita de rată a API-ului GitHub.

## Instalare

1. Asigurați-vă că aveți instalat [Node.js](https://nodejs.org/) (versiunea 16 sau mai recentă).
2. Deschideți un terminal în directorul aplicației și rulați:

```bash
npm install
```

Acest lucru va instala dependențele necesare: `express`, `node-fetch` și `jszip`.

## Utilizare

Porniți serverul cu:

```bash
npm start
```

Apoi deschideți în browser adresa `http://localhost:8080`. Introduceți URL-ul către directorul GitHub în formatul `https://github.com/utilizator/repo/tree/ramura/director` și, dacă este necesar, token-ul personal. După trimiterea formularului, serverul va:

1. Analiza URL-ul pentru a extrage numele utilizatorului, depozitului, ramura (ref) și directorul.
2. Apela API-ul GitHub pentru a obține arborele complet al depozitului, apoi va filtra numai fișierele din directorul specificat.
3. Pentru fiecare fișier, va descărca conținutul prin API-ul GitHub și îl va adăuga într-o arhivă ZIP.
4. Va trimite către browser fișierul ZIP rezultat pentru descărcare.

## Observații

- Pentru depozite private sau pentru a evita limitările stricte de rată ale GitHub, introduceți un token personal de acces (PAT) în câmpul „Token”. Token-ul trebuie să aibă permisiuni `repo` pentru a accesa depozite private.
- Pentru depozite foarte mari sau directoare cu mii de fișiere, descărcarea și crearea arhivei pot dura mai mult timp.
- Aplicația folosește doar API-ul public GitHub și rulează local pe portul 8080.

## Licență

Acest proiect este oferit sub licența MIT. Consultați fișierul `LICENSE` pentru detalii.


## 🔐 Limitări GitHub API – fără token vs. cu token

### Fără token
- 60 request-uri/oră per IP
- Directoare mari pot produce `403 rate limit exceeded`

### Cu token (PAT)
- 5000 request-uri/oră per cont
- Recomandat pentru proiecte mari și repo-uri private

## 🧭 Ghid generare Personal Access Token (PAT)

1. Autentificare pe GitHub → Settings
2. Developer settings → Personal access tokens
3. Alege Fine-grained sau Classic
4. Configurează permisiunile necesare (public_repo sau repo)
5. Copiază token-ul generat
6. Rulează aplicația cu:
   - Windows PowerShell:
     ```powershell
     $env:GITHUB_TOKEN="ghp_xxx"
     ```
   - Linux/macOS:
     ```bash
     export GITHUB_TOKEN="ghp_xxx"
     ```

