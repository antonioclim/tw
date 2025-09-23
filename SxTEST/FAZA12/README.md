# SxTEST — Structură multi-fază (FAZA0, FAZA1, ...)

Acest director conține subproiecte independente pentru fiecare fază (FAZA0, FAZA1 etc.).
Fiecare fază are propriul `package.json`, propriul server (Express) și, de la FAZA4 în sus, teste/config suplimentare.

## Cum rulezi o fază
```powershell
cd /d Z:\tw\SxTEST\FAZA0
npm install
npm run dev
```
sau pentru FAZA1:
```powershell
cd /d Z:\tw\SxTEST\FAZA1
npm install
npm run dev
npm test
```

> Recomandare: păstrăm fiecare fază *self-contained*, ca să putem arăta/demonstra incremental progresul.


## FAZA2
UI listare cursuri/lecții, căutare + filtrare cu "debounce".  
Rulare:
```powershell
cd /d Z:\tw\SxTEST\FAZA2
npm install
npm run dev
# http://localhost:3002
```

## FAZA3
Lecție + Quiz minimal cu API mock (Express).  
Rulare:
```powershell
cd /d Z:\tw\SxTEST\FAZA3
npm install
npm run dev
# http://localhost:3003
npm test
```


## FAZA4
API public minimal cu validări (Zod) și teste de contract (Vitest + Supertest).
```powershell
cd /d Z:\tw\SxTEST\FAZA4
npm install
npm run dev
# http://localhost:3004
npm test
```

## FAZA5
Admin Lite CRUD pentru lecții, validat cu Zod, cu persistenta în JSON, testat cu Vitest + Supertest.
```powershell
cd /d Z:\tw\SxTEST\FAZA5
npm install
npm run dev
# http://localhost:3005
npm test
```


## FAZA6
Persistență cu SQLite/Sequelize; modele Course/Lesson; seed automat; API REST.
```powershell
cd /d Z:\tw\SxTEST\FAZA6
npm install
npm run dev
# http://localhost:3006
npm test
```

## FAZA7
Portare UI în React (CDN) cu hash routing; fetch din API mock.
```powershell
cd /d Z:\tw\SxTEST\FAZA7
npm install
npm run dev
# http://localhost:3007
npm test
```


## FAZA8
React + Redux Toolkit (store: progress & prefs) cu persistență în localStorage; teste pentru reducer/selectors.
```powershell
cd /d Z:\tw\SxTEST\FAZA8
npm install
npm run dev
# http://localhost:3008
npm test
```

## FAZA9
Raportare & export CSV/JSON (agregări pe progres) — utilitare testate cu Vitest.
```powershell
cd /d Z:\tw\SxTEST\FAZA9
npm install
npm run dev
# http://localhost:3009
npm test
```


## FAZA10
React UI complet cu rute (react-router-dom) și split pe pagini (lazy + Suspense).
```powershell
cd /d Z:\tw\SxTEST\FAZA10
npm install
npm run dev
# http://localhost:3010
npm test
```

## FAZA11
Redux Toolkit (de aprofundat): persista parțial pe chei (doar prefs), selectors memoizați complecși.
```powershell
cd /d Z:\tw\SxTEST\FAZA11
npm install
npm run dev
# http://localhost:3011
npm test
```

## FAZA12
Tabel avansat (sort/filter/paginate) + export CSV, implementat în vanilla JS.
```powershell
cd /d Z:\tw\SxTEST\FAZA12
npm install
npm run dev
# http://localhost:3012
npm test
```
