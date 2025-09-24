# FAZA7 — Patch fără inline scripts și fără CDN (React local + Vite)

## Rulare
```powershell
cd Z:\tw\SxTEST\FAZA7   # pune aici conținutul patch-ului
npm install
npm run dev
```
- UI: http://localhost:5173/#/courses
- API: http://localhost:3007/api/courses


## Build
```powershell
npm run build
npm run preview
```

## Build 11
# fereastra API
```powershell
cd /d Z:\tw\SxTEST\FAZA7
npm run dev:api
```

# fereastra UI (sau rulează în paralel 'npm run dev' care le pornește pe ambele)
```powershell
npm run dev:vite
```

# NOTE:
	UI: http://localhost:5173/#/courses – linkurile ar trebui să fie vizibile (albastru deschis).

	API root: http://localhost:3007/ – apare textul „[FAZA7 API] OK …” (fără erori CSP).

	API endpoints: http://localhost:3007/api/courses și …/api/courses/1/lessons răspund JSON.

