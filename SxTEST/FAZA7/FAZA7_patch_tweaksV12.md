# FAZA7 — Patch Tweaks v1.2 (Local React + Vite, fără inline/CDN)
**Data:** 2025-09-24

## Conținutul pachetului
- `FAZA7_patch_tweaksV12.md` (acest document)
- `index.html` (patch)
- `src/App.jsx` (patch)
- `src/theme.css` (nou)
- `HOWTO.txt` (instrucțiuni rapide)

## Ce rezolvă
1. Fără **inline scripts** și **CDN** (deja migrat la Vite + deps locale).
2. Linkuri/texte **lizibile** pe fundal închis (temă).
3. Elimină **favicon 404** (favicon inline).
4. Elimină **warnings React Router** (RouterProvider + future flags v7).
5. `GET /` pe API (3007) deja răspunde text simplu (din patch anterior).

## Pași de aplicare
1. **Închide** procesele `npm run dev`.
2. **Copiază** fișierele din acest pachet în: `Z:\tw\SxTEST\FAZA7\` păstrând căile:
   - `index.html` → `Z:\tw\SxTEST\FAZA7\index.html`
   - `src\App.jsx` → `Z:\tw\SxTEST\FAZA7\src\App.jsx`
   - `src\theme.css` → `Z:\tw\SxTEST\FAZA7\src\theme.css`
3. Deschide `Z:\tw\SxTEST\FAZA7\src\main.jsx` și verifică/importă linia:
   ```js
   import './theme.css'
   ```
4. **Repornește** în două terminale (sau folosește `npm run dev` dacă ai `run-p` configurat):
   ```powershell
   # terminal 1
   cd /d Z:\tw\SxTEST\FAZA7
   npm run dev:api

   # terminal 2
   cd /d Z:\tw\SxTEST\FAZA7
   npm run dev:vite
   ```
5. Deschide UI: <http://localhost:5173/#/courses> și API: <http://localhost:3007/>.

## Notă „single-port mode”
Dacă vrem UI+API pe 3007:
- `npm run build`
- cream `server-static.js` conform exemplului din documentațiile anterioare
- `node server-static.js`
