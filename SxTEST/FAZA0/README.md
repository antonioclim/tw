# MiniLearn — Faza 0 (Toolchain & server minimal)

Aceasta este structura minimă pentru proiect, destinată verificării rapide a mediului și a fluxului
**server Express + conținut static**. Scopul este de a porni aplicabilitatea în < 2 minute și de a
avea doi senzori de „viață”: `GET /ping` și încărcarea paginii `index.html` din `public/`.

## Structură
```
SxTEST/
  .editorconfig
  .gitignore
  package.json
  public/
    app.js
    index.html
    styles.css
  server/
    index.js
```

## Instalare
> **Premise:** Windows 11, Node.js LTS instalat cu PATH activ (verifică `node -v` și `npm -v`).

```powershell
cd /d Z:\tw\SxTEST
npm install
```

## Rulare (dev)
```powershell
npm run dev
```
Ieșirea ar trebui să conțină adresa:
```
[Faza 0] MiniLearn SxTEST pe http://localhost:3000
  • GET /ping  → 'pong'
  • /         → index.html din /public
```

## Verificare în browser
1. Deschide **Firefox** și navighează la: <http://localhost:3000>  
   - Ar trebui să vezi pagina „MiniLearn — Faza 0”.
2. Deschide **Consola Web** (`Ctrl`+`Shift`+`K`), ar trebui să vezi mesajul:  
   `"[Faza 0] JS încărcat — DOM disponibil? true"`
3. Apasă butonul **„Testează /ping”**. Ar trebui să apară:  
   `Răspuns: pong (HTTP 200)`

## Note
- În Faza 0, **nu** configurăm încă ESLint/Prettier/teste. Acestea apar în fazele următoare.
- Dacă portul `3000` este ocupat, setează `PORT=5173` (de ex.) și rulează din nou:
  ```powershell
  setx PORT 5173
  # deschide un nou PowerShell pentru a prelua variabila
  npm run dev
  ```

## Licență
MIT — 2025-09-23
