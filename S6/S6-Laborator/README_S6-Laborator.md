# S6-Laborator — Exerciții (Pașii 1–6 + 04b)

Linia de laborator livrează **exerciții autonome**, câte un subdirector per temă. Puteți deschide fiecare proiect direct în browser sau utiliza *Live Server* (VS Code).

## Conținut (din `S6v1-6nextlab.zip`)

- **01-selectori-bazici/** — selector de tip/clasă/descendență; verificăm specificitatea.
- **02-pseudoclase-pseudoelemente/** — `:hover`, `:focus`, `:checked`; activăm stările în DevTools.
- **03-tabele-nth-child-css-vs-js/** — colorări cu `:first/last/nth-child` vs. script JS; argumentăm pro/contra.
- **04-layout-sidebar-fix/** — coloană principală + sidebar cu `float`; înțelegem `clear` și *document flow*.
- **04b-float-tictactoe/** — grilă 3×3 cu `float`; diagnosticăm alinierea în **Layout**.
- **05-formular-login/** — etichete/controale/buton; stări `:focus`, contrast, feedback.
- **06-meniu-vertical/** — aliniere și `:hover`/aria de clic; navigație accesibilă.

> Fiecare director conține `index.html`, `style.css` și, unde este cazul, `README.md`/`script.js`/`assets/`.

## Obiective (Bloom)

- **Înțelegere:** explicăm pe scurt scopul fiecărui selector/pseudo‑clasă și efectul `float`.
- **Aplicare:** implementăm cerințele; rulăm și verificăm în DevTools.
- **Analiză:** depistăm suprascrieri/conflicte; comparăm CSS vs. JS (tabele).

## Checklist DevTools (Firefox)

- **Inspector → Rules/Computed**: ce regulă câștigă? de ce? există reguli redundante?
- **Layout**: cum se compune macheta (float)? apar „gaps” neașteptate?
- **Accessibility**: focus vizibil, contrast suficient pentru text/butoane/meniuri.

> **Cross‑link:** Pentru recapitularea „micro‑abilităților” CSS (box‑model, flex, poziționare, tranziții), deschideți **Standard kit (00–15)** din [README_S6-Appendix.md](./README_S6-Appendix.md).
