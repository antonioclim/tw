# FAZA9 — Patch Advanced (persistență filtre, Excel export, grafice, import JSON, proxy FAZA6) — 2025-09-24

## Ce adaugă
- **Persistență** în `localStorage` pentru filtre: `q`, `lang`, `minScore`, `perPage`, `sort`, `page`, `mode` (Sample/API).
- **Export Excel** (fără dependențe): generează **Excel XML Spreadsheet 2003** (`.xls`) compatibil Excel.
- **Grafice**: **donut** (repartiție pe limbă) + **stacked bars** (duration vs. avgScore normalizat).
- **Import JSON** prin **drag&drop** (format: `{ rows: [...], meta: ... }`).
- **Integrare FAZA6**: toggle „Load from API” ce folosește **proxy** local (evită CORS) către `http://localhost:3006`.
- **Teste Vitest**: `sortRows`, `filterRows`, `toCSV`, `aggregate` (edge cases).

## Rulare
1. Copiază fișierele peste `Z:\tw\SxTEST\FAZA9\`.
2. `npm run dev` și deschide <http://localhost:3009>.
3. (Dacă vrei teste) instalează Vitest: `npm i -D vitest` apoi `npm test`.

## Notă despre Excel
Exportul este **Excel XML Spreadsheet 2003** (`.xls`) — compatibil cu Excel/LibreOffice — pentru zero dependențe.
Dacă vrei **.xlsx** nativ, pot livra o variantă cu librăria `xlsx`.
