# S6-Teorie — Suport de curs și kit compact (selectori & layout)

Această componentă reunește **suportul teoretic** și un **kit compact** de exemple pentru *Selectori CSS* și *Layout*.

## Conținut

1. **Suport de Curs CSS – Selectori, Layout și Media Queries** (DOCX)
   - Domenii: selectori elementari/de părinte, pseudo‑clase comune (`:checked`, `:focus`, `:first/last/nth-child`), layout cu `float`, formulare, meniuri; introducere în Flex/Grid și media queries.
2. **S6part1‑CURS‑selectori‑layout‑compact.zip** (kit curatoriat)
   - `S6-selectori-layout-compact/README.md` — ghidul kit‑ului.
   - **Curs (`curs/tw-live-2024-main/c4/css/`)** — 17 fișiere HTML:
- `5.html`
- `6.html`
- `7.html`
- `8.html`
- `9.html`
- `10.html`
- `11.html`
- `12.html`
- `14.html`
- `16.html`
- `17.html`
- `18.html`
- `19.html`
- `20.html`
- `21.html`
- `22.html`
- `14.1.html`
   - **Seminar (`sem/webtech-2024-1108-main/`)** — wk5 și wk6:

     **wk5** (8 fișiere):
- `ex1.html`
- `ex2.html`
- `ex3.html`
- `sol3.html`
- `ex4.html`
- `ex4-modern.html`
- `ex5.html`
- `sol4.html`

     **wk6** (6 fișiere):
- `ex1.html`
- `ex1-sol.html`
- `ex2.html`
- `ex3.html`
- `ex3-sol.html`
- `ex4.html`

## Obiective (Bloom)

- **Înțelegere:** clasificăm selectorii, interpretăm pseudo‑clasele; înțelegem fluxul documentului și efectul `float`.
- **Aplicare:** stilizăm tabele cu `:nth-child`; construim un grid 3×3 cu `float`; stilizăm formular și meniu; introducem noțiuni Flex/Grid.
- **Analiză:** comparăm implementări (CSS vs. JS), examinăm specificitatea și suprascrierile, evaluăm layout‑ul în DevTools.

## Metodă de lucru

1. **Lectură ghidată** din DOCX (întrebări‑cheie de înțelegere după fiecare subsecțiune).
2. **Exersare** pe fișierele `curs/*.html` și `sem/wk5–wk6/*.html`: *Vom modifica* stiluri, *vom observa* efecte, *vom salva* capturi.
3. **Diagnostic** (Firefox DevTools): **Inspector (Rules/Computed)**, **Layout (Flex/Grid overlays)**, stări `:hov`.
4. **Consolidare**: reimplementăm fără a privi soluția, apoi *analizăm* diferențele (ce selector a câștigat, de ce).

> **Cross‑link:** Pentru lucrul dirijat pe pași (01–06 + 04b), vezi [README_S6-Laborator.md](./README_S6-Laborator.md); pentru recapitulare „micro‑abilități”, vezi [README_S6-Appendix.md](./README_S6-Appendix.md).
