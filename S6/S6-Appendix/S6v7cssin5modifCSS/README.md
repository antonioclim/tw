# Standard kit CSS — S6v7cssin5 (pași numerotați, versiunea corectată)

Acest kit reproduce **strict** pașii din materialul „S6v7cssin5modifCSS (cheat sheet 30 de minute)” și este aliniat cu fișa de predare livrată anterior.
Fiecare pas are propriul director cu `index.html` și `style.css`. Din Pasul 03 încolo se folosește **fișier CSS extern**.

> Modificările tehnice față de arhiva inițială: am corectat declarații CSS invalide (ex. `border:... solid #ddd`) și am eliminat linii reziduale `...`, astfel încât toate exemplele să ruleze fără erori.

## Index pași

| #  | Director                    | Fișier(e)              | Ce modificăm la acest pas                                 | Ce verificăm în DevTools |
|----|-----------------------------|------------------------|------------------------------------------------------------|--------------------------|
| 00 | `00-start/`                 | `index.html`, `style.css` | Schelet HTML; CSS gol                                      | Inspector → nu există reguli active |
| 01 | `01-inline-style/`          | `index.html`           | `style="color:red"` pe `<h1>` (stil **inline**)            | Inspector → `h1` are atribut `style` |
| 02 | `02-internal-style/`        | `index.html`           | Bloc `<style>` în `<head>` (`h1 { color:red }`)            | Rules → regula este în document |
| 03 | `03-step/`                  | `style.css`            | Reset universal `*{margin:0;padding:0;box-sizing:border-box}` + tipografie de bază | Computed → margin/padding 0, box-sizing `border-box` |
| 04 | `04-step/`                  | `style.css`            | `.box-model` (color, background, width/height, padding, border, margin) | Layout → Box model vizibil |
| 05 | `05-step/`                  | `style.css`            | `text-align:center` pe `.box-model`                        | Textul este centrat orizontal |
| 06 | `06-step/`                  | `style.css`            | `padding:10px 20px 30px 40px` (shorthand TRBL)             | Layout → padding TRBL corect |
| 07 | `07-step/`                  | `style.css`            | `padding-*` pe laturi (longhand)                           | Rules → `padding-top/right/bottom/left` |
| 08 | `08-step/`                  | `style.css`            | `display:inline-block` (container + `<h2>`)                | Elemente pot sta pe același rând |
| 09 | `09-step/`                  | `style.css`            | `display:flex` + `align-items:center` + `justify-content:center` (centrare perfectă) | Layout → Flex overlay |
| 10 | `10-step/`                  | `style.css`            | `position:relative` (container) + `position:absolute; top/left` pe `<h2>` | Box devine ancoră pentru absolut |
| 11 | `11-step/`                  | `style.css`            | `h2:hover { color:red }`                                   | Forțați :hover în DevTools |
| 12 | `12-step/`                  | `style.css`            | `transition` pe `h2` + `transform:scale` la :hover         | Animations → tranziție vizibilă |
| 13 | `13-step/`                  | `style.css`            | `box-shadow` pe `.box-model`                               | Umbra vizibilă, parametrii corecți |
| 14 | `14-step/`                  | `style.css`            | `@keyframes spin` + `animation: spin 4s linear infinite`   | Animations → rotație continuă |
| 15 | `15-step/`                  | `style.css`            | `@media (min-width:600px)` → schimbare de background       | Responsive Mode → breakpoint 600px |

## Notă despre secțiunea „cards”
În `index.html` există o secțiune demonstrativă `<section class="cards">` cu carduri simple. Stilizarea lor se află în fiecare `style.css` în blocul „Tipografie & layout de bază” și **nu afectează** demonstrațiile din pașii 04–15. Bordura a fost corectată la `1px solid #ddd`.

## Cum rulați
1. Deschideți fiecare subdirector direct în browser (double‑click pe `index.html`) **sau** rulați un server static (ex. `npx serve` în directorul rădăcină `S6-CSS-seminar-kit/`).
2. Pentru fiecare pas, folosiți Firefox DevTools:
   - **Inspector → Rules** pentru a vedea regula nou introdusă;
   - **Layout (Flex/Grid)** pentru pașii 09–10;
   - **Animations** pentru pașii 12 și 14;
   - **Responsive Design Mode** pentru pasul 15.

Succes la parcurgere!
