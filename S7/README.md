# 🎨 S7 — CSS Layout: Flexbox, Grid și Design Responsiv

> **Seminar S7** | Curs de Tehnologii Web | ASE-CSIE  
> De la selectori CSS la interfețe moderne cu Flexbox și CSS Grid

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S7-Teorie](#s7-teorie)
  - [S7-Laborator](#s7-laborator)
  - [S7-Appendix](#s7-appendix)
- [Kit-ul de 30 de pași (60 minute)](#-kit-ul-de-30-de-pași-60-minute)
- [Cei 10 pași către Chat UI](#-cei-10-pași-către-chat-ui)
- [Concepte cheie](#-concepte-cheie)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Exerciții propuse](#-exerciții-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S7 este dedicat **layout-ului CSS modern** — tehnicile esențiale pentru construirea interfețelor web responsive. Seminarul combină două abordări complementare:

1. **Kit 30 pași (60 min)** — Parcurgere incrementală de la zero: atașare CSS, Box Model, poziționare, până la Flexbox
2. **10 pași Chat UI** — Construirea progresivă a unei interfețe de chat folosind Flexbox și CSS Grid

### Ce vei învăța:

| Modul | Concepte | Rezultat |
|-------|----------|----------|
| **Pașii 01–11** | Inline/intern/extern CSS, ID, clase | Înțelegerea cascadei |
| **Pașii 12–16** | Reset universal, tipografie, lizibilitate | Fundație solidă |
| **Pașii 17–21** | Box Model, `display: block` | Control asupra spațierii |
| **Pașii 22–27** | `inline-block`, `position` | Poziționare precisă |
| **Pașii 28–30** | `fixed`, `sticky`, Flexbox | Layout modern |
| **Chat UI 05–10** | Grid areas, Media Queries | Interfață completă |

---

## 📁 Structura repository-ului

```
S7/
├── 📂 S7-Teorie/                                        # Materiale teoretice
│   ├── 📄 B S7part2-CURS) Suport de Curs CSS...docx         # Selectori, Layout, Media Queries
│   ├── 📄 C 7 (teorie lung expl AT)_ Layout modern...docx   # Flexbox, Grid, Design Responsiv
│   └── 📦 S7part2-CURS)-selectori-layout-compact.zip        # Exemple compacte
│
├── 📂 S7-Laborator/                                     # Materiale practice
│   ├── 📄 A - S6v8css1hourkit...docx                        # Ghid pentru kit-ul de 60 min
│   ├── 📦 S6v8css1hourkit.zip                               # ⭐ Kit 30 pași CSS (60 min)
│   │   ├── 01/ → 30/                                        # Fiecare pas = index.html + style.css
│   │   ├── 04b-float-tictactoe/                             # Bonus: grilă 3×3 cu float
│   │   ├── README.md                                        # Index și instrucțiuni
│   │   └── SEMINAR-PLAN.md                                  # Plan temporal (Bloom)
│   │
│   └── 📂 nextlab/                                      # ⭐ Server Node.js + 10 exemple
│       ├── server.js                                        # Express server (port 8080)
│       ├── package.json                                     # Dependențe Node.js
│       ├── 📂 public/                                       # Fișiere statice
│       │   ├── index.html                                   # Pagină principală cu link-uri
│       │   ├── common.css                                   # Stiluri comune
│       │   └── common.js                                    # JS comun
│       └── 📂 examples/                                     # Cele 10 exemple progresive
│           ├── 01/ → 04/                                    # Pași din arhivele S7v1-v4
│           ├── 05/                                          # Flex: schelet pagină
│           ├── 06/                                          # Reflow Flex (wrap)
│           ├── 07/                                          # Grid 80/20
│           ├── 08/                                          # Meniu responsive (burger)
│           ├── 09/                                          # Chat UI cu Grid areas
│           └── 10/                                          # Contacts + Messages (final)
│
└── 📂 S7-Appendix/                                      # Materiale suplimentare
    ├── 📄 A - S6v8css1hourkit...docx                        # Ghid practic
    ├── 📄 B S7part2-CURS)...docx                            # Teorie selectori
    ├── 📄 C 7 (teorie lung expl AT)...docx                  # Teorie layout
    ├── 📦 S6v8css1hourkit.zip                               # Kit 30 pași
    └── 📦 S7part2-CURS)-selectori-layout-compact.zip        # Exemple compacte
```

---

## 📚 Conținutul detaliat

### S7-Teorie

| Document | Subiecte |
|----------|----------|
| **Suport de Curs CSS** | Selectori (element, clasă, ID, atribut), specificitate, cascadă, Box Model, unități de măsură, Media Queries |
| **Layout modern CSS** | Flexbox (container/items, axe, aliniere), CSS Grid (template-columns/rows, areas, gap), Design Responsiv |

---

### S7-Laborator

Laboratorul conține **două kit-uri practice** complementare:

#### 1️⃣ S6v8css1hourkit.zip — 30 de pași în 60 de minute

Kit complet pentru învățarea CSS de la zero, organizat în 30 de foldere numerotate. Fiecare folder conține:
- `index.html` — starea HTML după aplicarea pasului
- `style.css` — stilurile CSS cumulative
- `README.md` — explicații (Ce / Unde / De ce / Scop)

#### 2️⃣ nextlab/ — Server cu 10 exemple progresive

Aplicație Node.js care servește 10 exemple HTML/CSS, construind treptat o interfață de chat.

---

### S7-Appendix

Copii ale materialelor teoretice și practice pentru referință rapidă.

---

## 🎯 Kit-ul de 30 de pași (60 minute)

### Plan temporal (conform taxonomiei Bloom)

| Interval | Pași | Focus | Nivel Bloom |
|----------|------|-------|-------------|
| 0–5' | 01–04 | Setup HTML, legare CSS | Cunoaștere |
| 5–15' | 05–11 | Inline → intern → extern; ID/clasă | Înțelegere |
| 15–25' | 12–16 | Reset universal, tipografie | Aplicare |
| 25–35' | 17–21 | Box Model, `display: block` | Aplicare |
| 35–45' | 22–27 | `inline-block`, poziționare | Analiză |
| 45–52' | 28 | `fixed` vs `sticky` | Analiză |
| 52–60' | 29–30 | Flexbox | Sinteză |

### Detaliu pași

| Pas | Titlu | Ce înveți |
|-----|-------|-----------|
| **01** | Structură HTML minimă | Scheletul de bază al paginii |
| **02** | Metatags + `<title>` | charset, viewport, titlu document |
| **03** | Leagă CSS extern | `<link rel="stylesheet">` |
| **04** | Adaugă `<h1>` | Primul element vizibil |
| **04b** | Float Tic-Tac-Toe | **Bonus:** Grilă 3×3 cu `float` și clearfix |
| **05** | Stil inline | `style="color: blue"` direct pe element |
| **06** | Stil intern | `<style>` în `<head>` |
| **07** | Stil extern | Mutare în `style.css` |
| **08** | Fundal `<body>` | `background-color` |
| **09** | ID pe element | `id="title"` pentru stilizare țintită |
| **10** | CSS pe `#title` | Selector de ID |
| **11** | Clase & paragrafe | `.para-text` — selectori de clasă |
| **12** | Reset universal | `* { margin:0; padding:0; box-sizing:border-box }` |
| **13** | Culoare RGBA | `rgba(r, g, b, alpha)` pentru transparență |
| **14** | Dimensiune titlu | `font-size`, `text-align` |
| **15** | Font family | `font-family`, `font-weight` |
| **16** | Line-height | Lizibilitate și spațiere verticală |
| **17** | Box model — container | `<div class="box">` |
| **18** | Dimensiuni box | `width`, `height`, `background` |
| **19** | Border | `border: 5px solid red` |
| **20** | Padding & margin | Spațiere interioară și exterioară |
| **21** | Link-uri block | `a { display: block }` |
| **22** | Structură inline-block | HTML pentru 3 div-uri |
| **23** | Stil inline-block | `display: inline-block` + dimensiuni |
| **24** | Container poziționare | `.position-container` |
| **25** | `position: relative` | Deplasare față de poziția inițială |
| **26** | `position: absolute` | Scos din flux, relativ la body |
| **27** | Părinte relativ | Context de poziționare |
| **28** | `fixed` vs `sticky` | Comportament la scroll |
| **29** | Structură Flex | `.flex-container` |
| **30** | Flexbox CSS | `display: flex` + centrare |

---

## 💬 Cei 10 pași către Chat UI

### Progresie vizuală

```
┌─────────────────────────────────────────────────────────────────┐
│  Pas 05: Flex Schelet          │  Pas 07: Grid 80/20           │
│  ┌──────────────────────┐      │  ┌────────────┬───────┐       │
│  │      HEADER          │      │  │  Content   │ Chat  │       │
│  ├────────┬─────────────┤      │  │   80%      │  20%  │       │
│  │ Sidebar│    Pane     │      │  │            │       │       │
│  │  15%   │     85%     │      │  └────────────┴───────┘       │
│  ├────────┴─────────────┤      │                               │
│  │      FOOTER          │      │                               │
│  └──────────────────────┘      │                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Pas 09: Chat UI Grid          │  Pas 10: Final (Messages)     │
│  ┌─────────┬────────────┐      │  ┌─────────┬────────────┐     │
│  │ Search  │  Chat HD   │      │  │ Search  │  Alice     │     │
│  ├─────────┼────────────┤      │  ├─────────┼────────────┤     │
│  │ Alice   │            │      │  │ Alice   │ ┌────────┐ │     │
│  │ Bob     │   Chat     │      │  │ Bob     │ │ Hello  │ │     │
│  │ Carol   │   Area     │      │  │ Carol   │ │   Hi!  │ │     │
│  ├─────────┼────────────┤      │  ├─────────┼────────────┤     │
│  │         │  Input     │      │  │         │ [Type...]  │     │
│  └─────────┴────────────┘      │  └─────────┴────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Detaliu exemple

| Pas | Titlu | Concepte CSS | Cod cheie |
|-----|-------|--------------|-----------|
| **05** | Flex: schelet pagină | `flex-direction: column`, `vh` units | `body { display: flex; flex-direction: column }` |
| **06** | Reflow Flex | `flex-wrap: wrap`, `justify-content` | `flex-wrap: wrap; justify-content: space-around` |
| **07** | Grid 80/20 | `grid-template-columns`, `grid-template-areas` | `grid-template-columns: 80% 20%` |
| **08** | Meniu responsive | `@media`, burger menu | `@media (max-width: 400px) { .menu { display: none } }` |
| **09** | Chat UI Grid | Grid areas complexe, avatar | `grid-template-areas: "search chat-hd" "contacts chat"` |
| **10** | Contacts + Messages | Message bubbles, styling complet | `.msg:nth-child(odd/even)` pentru bule alternante |

### Pas 05 — Flex: Schelet pagină

```css
body {
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header { height: 15vh; display: flex; align-items: center; }
.content { display: flex; height: 70vh; }
.sidebar { width: 15%; display: flex; flex-direction: column; }
.pane { flex: 1; }
.footer { height: 15vh; }
```

### Pas 07 — Grid 80/20

```css
.grid {
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 10vh 1fr 10vh;
  grid-template-areas:
    "content-hd chat-hd"
    "content    chat"
    "content    chat-in";
  height: 80vh;
}
.content-hd { grid-area: content-hd; }
.chat-hd    { grid-area: chat-hd; }
.content    { grid-area: content; }
.chat       { grid-area: chat; }
.chat-in    { grid-area: chat-in; }
```

### Pas 08 — Meniu responsive

```css
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
}
.burger { display: none; }

@media screen and (max-width: 400px) {
  .menu { display: none; }
  .burger {
    display: flex;
    position: fixed;
    top: 10px; left: 10px;
    /* burger icon styles */
  }
}
```

### Pas 10 — Message bubbles

```css
.msg {
  max-width: 75%;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
}
.msg:nth-child(odd) {
  background: #f2f3f5;
  align-self: flex-start;  /* mesaje primite - stânga */
}
.msg:nth-child(even) {
  background: #cde7ff;
  align-self: flex-end;    /* mesaje trimise - dreapta */
  text-align: right;
}
```

---

## 🧠 Concepte cheie

### Box Model

```
┌─────────────────────────────────────┐
│             MARGIN                  │
│   ┌─────────────────────────────┐   │
│   │         BORDER              │   │
│   │   ┌─────────────────────┐   │   │
│   │   │      PADDING        │   │   │
│   │   │   ┌─────────────┐   │   │   │
│   │   │   │   CONTENT   │   │   │   │
│   │   │   └─────────────┘   │   │   │
│   │   └─────────────────────┘   │   │
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Regula de aur:** `box-sizing: border-box` face ca `width` să includă padding și border.

### Flexbox vs Grid

| Aspect | Flexbox | Grid |
|--------|---------|------|
| Dimensiune | 1D (rând SAU coloană) | 2D (rânduri ȘI coloane) |
| Control | Conținut → Layout | Layout → Conținut |
| Ideal pentru | Navigații, carduri, centrare | Layout-uri de pagină, galerii |
| Proprietate | `display: flex` | `display: grid` |

### Poziționare CSS

| Valoare | Comportament | Utilizare |
|---------|--------------|-----------|
| `static` | Default, în flux normal | — |
| `relative` | Deplasare față de poziția inițială | Ajustări fine, context pentru `absolute` |
| `absolute` | Scos din flux, relativ la părinte poziționat | Overlay-uri, tooltips |
| `fixed` | Relativ la viewport, rămâne la scroll | Header-uri sticky, butoane flotante |
| `sticky` | Hibrid: `relative` până la threshold, apoi `fixed` | Secțiuni care se „lipesc" |

### Media Queries — Breakpoints comune

```css
/* Mobile first */
.element { /* stiluri mobile */ }

@media (min-width: 576px)  { /* Small devices */ }
@media (min-width: 768px)  { /* Tablets */ }
@media (min-width: 992px)  { /* Desktops */ }
@media (min-width: 1200px) { /* Large desktops */ }
```

---

## 📈 Ghid de parcurgere

### Traseul rapid (2 ore)

```
1. Rulează kit-ul de 30 pași cu Live Server
       ↓
2. Inspectează fiecare pas în Firefox DevTools
       ↓
3. Pornește serverul nextlab (npm start)
       ↓
4. Parcurge exemplele 05-10 și modifică codul
       ↓
5. Construiește propria interfață de chat
```

### Traseul aprofundat (4+ ore)

```
1. Citește documentele DOCX din S7-Teorie
       ↓
2. Parcurge toți cei 30 de pași, făcând exercițiile
       ↓
3. Studiază exemplul 04b (Tic-Tac-Toe cu float)
       ↓
4. Analizează codul Grid din exemplele 07-10
       ↓
5. Implementează o variantă responsive a Chat UI
       ↓
6. Adaugă animații și tranziții
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune | Utilizare |
|------------|----------|-----------|
| Node.js | 18+ | Pentru serverul nextlab |
| npm | 9+ | Instalare dependențe |
| Firefox | Latest | DevTools pentru CSS (recomandat) |
| VS Code | Latest | Editor cu Live Server |

### Extensii recomandate

**Firefox:**
- Web Developer
- ColorZilla
- axe DevTools (accesibilitate)

**VS Code:**
- Live Server
- Prettier
- Stylelint
- CSS Peek

---

## 🚀 Rulare rapidă

### Kit-ul de 30 de pași

```bash
# Dezarhivează kit-ul
cd S7/S7-Laborator
unzip S6v8css1hourkit.zip
cd S6v8css1hourkit

# Deschide în VS Code cu Live Server
code .
# Click dreapta pe 01/index.html → Open with Live Server

# SAU folosește Python
python -m http.server 8000
# Deschide http://localhost:8000/01/
```

### Serverul nextlab

```bash
# Instalare și pornire
cd S7/S7-Laborator/nextlab
npm install
npm start

# Deschide în browser
# http://localhost:8080
```

### Verificare funcționare

```bash
# Health check
curl http://localhost:8080/health
# → {"ok":true,"ts":1699999999999}
```

---

## 📝 Exerciții propuse

### Nivel 1 — Înțelegere

1. **Box Model:** Creează un card cu `padding: 20px`, `border: 2px solid`, `margin: 10px`. Folosește DevTools pentru a vizualiza Box Model.

2. **Specificitate:** Care selector câștigă? `#title`, `.title`, `h1`? De ce?

3. **Inline vs Block:** Transformă o listă de link-uri din inline în block și observă diferența.

### Nivel 2 — Aplicare

4. **Flexbox Navigation:** Creează un meniu orizontal cu 5 link-uri, centrate și cu spațiere egală.

5. **Grid Gallery:** Construiește o galerie 3×3 folosind CSS Grid cu `gap: 10px`.

6. **Responsive Card:** Creează un card care pe mobil ocupă 100% lățime, iar pe desktop doar 300px.

### Nivel 3 — Sinteză

7. **Dashboard Layout:** Implementează un layout cu sidebar fix (200px), header sticky și conținut scrollabil.

8. **Chat Complet:** Pornind de la pasul 10, adaugă:
   - Funcționalitate de scroll în lista de contacte
   - Indicator „typing..."
   - Timestamp pentru fiecare mesaj
   - Dark mode cu CSS variables

9. **Media Query Challenge:** Creează un layout care:
   - Pe mobil (<576px): o coloană
   - Pe tabletă (576-992px): 2 coloane
   - Pe desktop (>992px): 3 coloane + sidebar

---

## 🔧 Instrumente DevTools

### Firefox Inspector — Ce să verifici

| Tab | Utilizare |
|-----|-----------|
| **Rules** | Vezi toate regulile CSS aplicate, specificitate |
| **Computed** | Valori finale după cascadă |
| **Layout** | Box Model vizual, Grid/Flex overlay |
| **Changes** | Modificări făcute în DevTools |

### Scurtături utile

| Acțiune | Shortcut |
|---------|----------|
| Deschide DevTools | `F12` sau `Ctrl+Shift+I` |
| Inspector element | `Ctrl+Shift+C` |
| Responsive Mode | `Ctrl+Shift+M` |
| Toggle CSS property | Click pe checkbox |

---

## 📚 Referințe

### Documentație oficială
- [MDN: CSS Layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN: CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [MDN: Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)

### Tutoriale interactive
- [Flexbox Froggy](https://flexboxfroggy.com/) — Învață Flexbox prin joc
- [Grid Garden](https://cssgridgarden.com/) — Învață Grid prin joc
- [CSS Tricks: Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Tricks: Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

### Generatoare și tool-uri
- [CSS Grid Generator](https://cssgrid-generator.netlify.app/)
- [Flexbox Generator](https://www.cssportal.com/css-flexbox-generator/)
- [Layoutit Grid](https://grid.layoutit.com/)

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

---

<div align="center">

**🎨 Material didactic pentru Seminarul S7**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția layout-ului CSS:**

```
Tables (1996)  →  Float (2000)  →  Flexbox (2012)  →  Grid (2017)
────────────────────────────────────────────────────────────────
  Hack-uri        Clearfix         1D Layout         2D Layout
  Rigid           Fragil           Flexibil          Puternic
```

---

**Structura seminarului:**

```
┌────────────────────────────────────────────────────────────┐
│                    S7 — CSS Layout                         │
├────────────────────────┬───────────────────────────────────┤
│  Kit 30 pași (60 min)  │  nextlab: 10 pași Chat UI        │
│  ──────────────────    │  ────────────────────────         │
│  • Atașare CSS         │  • Flex schelet                   │
│  • Box Model           │  • Grid 80/20                     │
│  • Poziționare         │  • Media Queries                  │
│  • Flexbox intro       │  • Chat complet                   │
└────────────────────────┴───────────────────────────────────┘
```

</div>
