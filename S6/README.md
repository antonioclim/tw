# S6 — Selectori CSS și Layout (ghid de structură și utilizare)

Acest director conține materialele complete pentru **Seminarul 6: Selectori CSS și Layout** — organizate pe trei componente complementare:

- **S6-Teorie** — suportul conceptual (suport de curs + kit compact de exemple pentru curs/seminar).
- **S6-Laborator** — setul de exerciții pas-cu-pas (Pașii 1–6 + 04b), pregătite pentru lucrul efectiv în laborator.
- **S6-Appendix** — anexe, fișe de predare/cheat‑sheet și un starter‑kit standard pentru demonstrații rapide.

> Recomandare de parcurgere: **S6-Teorie → S6-Laborator → S6-Appendix** (pentru recapitulare, variante scurte sau alternative).
> Public țintă: studenți anul III (cu noțiuni HTML/CSS de bază).

---

## Obiective (niveluri Bloom)

- **Înțelegere:** să recunoașteți tipurile principale de selectori (de tip, clasă, descendență, pseudo‑clase), modelul de casetă, noțiuni de aliniere.
- **Aplicare:** să stilizați tabele cu `:first-child / :last-child / :nth-child`, să construiți machete simple (float), formulare și meniuri.
- **Analiză:** să comparați abordări (CSS vs. JS în tabelări), să identificați suprascrieri și specificități, să diagnosticați layout‑uri în DevTools.
- **Integrare:** să combinați selecția, cascada și layout‑ul în pagini coerente (ex. login form, meniu orizontal/vertical).

---

## Structură

- **S6-Teorie/**
  - „Suport de Curs CSS – Selectori, Layout și Media Queries” (DOCX).
  - **S6part1‑CURS‑selectori‑layout‑compact.zip** — kit compact pentru curs/seminar (exemple curatoriate pentru selectori și layout).

- **S6-Laborator/**
  - „Seminar 6 (bazat pe nextlab) – Selectori CSS și Layout (Pașii 1–6)” (DOCX).
  - **S6v1‑6nextlab.zip** — exerciții pas‑cu‑pas: 01 selectori bazici, 02 pseudo‑clase/pseudo‑elemente, 03 tabele `:nth‑child` (CSS vs. JS), **04b** tic‑tac‑toe cu float, 04 layout sidebar fix, 05 formular login, 06 meniu vertical.

- **S6-Appendix/**
  - „Fișă de predare — Seminar 6 – CSS (20–30 min)” (DOCX) — ghid scurt de livrare la clasă.
  - „Seminar 6 (bazat pe nextlab) – Selectori CSS și Layout (Pașii 1–6)” (DOCX).
  - „Suport de Curs CSS – Selectori, Layout și Media Queries” (DOCX).
  - **S6v7cssin5modifCSS.zip** — **Standard kit** (pași numerotați 00–15) pentru demonstrații rapide (reset, box‑model, `inline‑block`, flex, poziționare, `:hover`, tranziții/transformări, `@keyframes`, media query).

---

## Cum lucrăm (Firefox + VS Code)

1. **Deschidem proiectele** (extragere arhive în directoare alăturate).
2. **Rulăm local**: deschidere directă în browser sau server static simplu (ex.: *Live Server* în VS Code).
3. **Diagnostic în DevTools (Firefox):**
   - **Inspector → Rules/Computed:** verificăm selecția, suprascrierile, stări forțate (`:hov`).
   - **Layout → Flex/Grid overlays:** evidențiem axele și liniile de grid.
   - **Box Model:** confirmăm `padding/border/margin`, `box-sizing`.
4. **Iterăm**: modificăm CSS/HTML, reîncărcăm și verificăm efectele.

Pentru detalii dedicate fiecărei componente, consultați fișierele:
- [README_S6-Teorie.md](./README_S6-Teorie.md)
- [README_S6-Laborator.md](./README_S6-Laborator.md)
- [README_S6-Appendix.md](./README_S6-Appendix.md)

