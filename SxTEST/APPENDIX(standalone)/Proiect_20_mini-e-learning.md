---
title: "Proiect 20 — Micro e‑learning — MiniLearn"
author: "Revolvix (implicit) — curs Tehnologii Web"
date: "2025-09-23"
version: "1.0.0"
---

# Proiect 20 — Micro e‑learning — *MiniLearn*

> **Sesiune:** 2025–2026 • **Public țintă:** studenți novici (au parcurs seminariile 0→12)  
> **Echipe:** implicit 2 studenți; excepțiile (1 sau 3) se aprobă **în prealabil** de cadrul didactic; membrii din **aceeași grupă**; restanțierii se înscriu în primele 2 săptămâni.  
> **Mapare strictă:** fiecare pas introduce DOAR noțiunile până la seminarul curent.

---

## Cuprins

- [1) Titlu + meta](#1-titlu--meta)
- [2) Rezumat executiv](#2-rezumat-executiv)
- [3) Obiective de învățare & rezultate așteptate](#3-obiective-de-învățare--rezultate-așteptate)
- [4) Cerințe funcționale](#4-cerințe-funcționale)
- [5) Cerințe nefuncționale](#5-cerințe-nefuncționale)
- [6) Setup mediu & toolchain](#6-setup-mediu--toolchain)
- [7) Plan de lucru pe pași (Sem. 0→12)](#7-plan-de-lucru-pe-pași-sem-0→12)
- [8) Integrare continuă & calitate](#8-integrare-continuă--calitate)
- [9) Evaluare & Definition of Done](#9-evaluare--definition-of-done)
- [10) Prompts utile (VSL)](#10-prompts-utile-vsl)
- [11) Bibliografie (în curs)](#11-bibliografie-apa-7)
- [12) Anexe](#12-anexe)

...

## 2) Rezumat executiv

- Portal *micro e‑learning* cu cursuri scurte (*micro‑lessons*), chestionare, progres salvat local + API simplu.  
- Progresie incrementală: fiecare pas folosește doar noțiunile predate până la acel seminar.  
- Front‑end cu HTML/CSS/JS (Sem.0–7), React (Sem.10), Redux Toolkit (Sem.11), componente externe pentru tabele/grafice (Sem.12).  
- Back‑end minimal Express (Sem.0/8) + persistenta SQLite/Sequelize (Sem.9).  
- Testare „în oglindă” (Vitest + Jest) pe aceleași contracte unde este rezonabil.  
- Practici de robustețe: timeout, retry/backoff, `AbortController`, semafor, memoizare cu TTL.  
- Accesibilitate (aria‑labels) și i18n elementar (ro/en).  
- CI local (scripturi npm): lint, format, test.  
- Repo pe GitHub pentru **fiecare membru**; README standardizat cu pași de rulare și justificări tehnologice.

...

## 7) Plan de lucru pe pași (Sem. 0→12)

### Sem.0 — Toolchain & server minimal
Cod minim Express cu `GET /ping → "pong"`, servește `public/index.html`.  
Test rapid: `curl http://localhost:3000/ping` → `pong`.

### Sem.1 — JS modern, funcții, CLI
Implementări `concat`, `cmp`, `sum`, `fib`, `freq` + CLI.  
Teste Vitest/Jest pe aceleași contracte.

### Sem.2 — Funcții & array-uri
Utilitare pure (`format`, `myMap`, `censor`).

### Sem.3 — Obiecte, excepții, memoization, async/await
Entități, memoizare cu TTL, `withTimeout`, `withRetry`, semafor.

### Sem.4 — Module, evenimente & DOM
ESM nativ, delegare evenimente, `AbortController`.

### Sem.5 — CSS Selectors & Layout
Pseudo-clase, grilă 3×3, form styling.

### Sem.6 — CSS Layout & Media Queries
Flexbox/Grid responsiv.

### Sem.7 — Fetch API + formulare + JSON
Formular + listă mesaje (fallback localStorage).

### Sem.8 — REST cu Node/Express
CRUD `/api/items`, validări simple.

### Sem.9 — Persistență SQLite/Sequelize
Modele `Course`, `Lesson`, migrații.

### Sem.10 — React
Listare + filtrare, buton „Favourite”.

### Sem.11 — Redux Toolkit
Slice `progress`, persist în localStorage.

### Sem.12 — Componente externe
DataTable + export CSV.

...

## 11) Bibliografie (în curs)

- Wirfs‑Brock, A., & Eich, B. (2020). *JavaScript: The first 20 years*. https://doi.org/10.1145/3386327  
- Loring, M. C., et al. (2017). *Semantics of asynchronous JavaScript*. https://doi.org/10.1145/3170472.3133846   
- Fielding, R. et al. (2022). *HTTP Semantics (RFC 9110).* https://doi.org/10.17487/RFC9110  
- Bray, T. (2017). *The JSON Data Interchange Format (RFC 8259).* https://doi.org/10.17487/RFC8259  
- Fette, I., & Melnikov, A. (2011). *The WebSocket Protocol (RFC 6455).* https://doi.org/10.17487/RFC6455  

---

*(Document detaliat dar în curs de revizuire, consolidat într-un fișier Markdown descărcabil. Revizuirile vor veni pas cu pas.)*
