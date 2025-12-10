# 📘 S2 — Prelucrarea Funcțională a Datelor în Node.js

> **Seminar S2** | Curs de Tehnologii Web | ASE-CSIE  
> Introducere în JavaScript: Sintaxă, Funcții, Iterație și CLI

---

## 📋 Cuprins

- [Despre acest seminar](#-despre-acest-seminar)
- [Structura repository-ului](#-structura-repository-ului)
- [Conținutul detaliat](#-conținutul-detaliat)
  - [S2-Teorie](#s2-teorie)
  - [S2-Scripts](#s2-scripts)
  - [S2-Appendix](#s2-appendix)
- [Concepte acoperite](#-concepte-acoperite)
- [Ghid de parcurgere](#-ghid-de-parcurgere)
- [Cerințe tehnice](#-cerințe-tehnice)
- [Rulare rapidă](#-rulare-rapidă)
- [Exerciții propuse](#-exerciții-propuse)
- [Referințe](#-referințe)

---

## 📖 Despre acest seminar

Seminarul S2 introduce **pattern-urile funcționale de bază** în JavaScript/Node.js, construind progresiv de la concepte simple la transformări expresive folosind `map`, `filter` și `reduce`. 

Materialele sunt organizate în jurul a **6 videoclipuri didactice**, fiecare însoțit de:
- **Scripturi în variante progresive** (A, B, C... F) — de la stil imperativ la stil funcțional
- **Documentație detaliată** în format HTML și Markdown
- **PDF-uri teoretice** pentru studiu individual

### Ce vei învăța:

| Concept | Descriere |
|---------|-----------|
| **Argumente CLI** | Utilizarea `process.argv` pentru scripturi în linia de comandă |
| **Funcții arrow** | Sintaxa ES6+ și diferențele față de function expressions |
| **Stil imperativ vs. funcțional** | Compararea abordărilor și trade-off-urile fiecăreia |
| **Manipularea șirurilor** | `split`, `join`, regex, Unicode (`\p{L}+`) |
| **Metode array** | `map`, `filter`, `reduce`, `some`, `every` |
| **Imutabilitate** | Crearea de noi structuri vs. modificarea in-place |

---

## 📁 Structura repository-ului

```
S2/
├── 📂 S2-Teorie/                              # Materialul teoretic principal
│   └── 📄 Segment 1ROpartA...pdf                  # PDF: Sintaxă, Funcții, Iterație, CLI
│
├── 📂 S2-Scripts/                             # Scripturi demonstrative (6 videoclipuri)
│   ├── 📂 Video1/                                 # Hello World + process.argv
│   │   ├── 1helloA.js                             # Variantă simplă
│   │   └── 1helloB.js                             # Cu slice și join
│   ├── 📂 Video2/                                 # Verificare divisibilitate
│   │   ├── 2adiv.js                               # Varianta imperativă
│   │   ├── 2adivno0.js                            # Cu validare divizor zero
│   │   └── 2adivshort.js                          # One-liner ES6
│   ├── 📂 Video3/                                 # Numărare apariții caracter
│   │   ├── 3occurencesA.js                        # Cu for clasic
│   │   ├── 3occurencesB.js                        # Cu for...of
│   │   ├── 3occurencesC.js                        # Cu filter
│   │   └── 3occurencesD.js                        # One-liner cu split
│   ├── 📂 Video4/                                 # Manipulare array-uri
│   │   ├── 4argumentsA.js → 4argumentsF.js        # 6 variante (mutație → imutabilitate)
│   ├── 📂 Video5/                                 # Verificare numere prime
│   │   ├── 5primeA.js → 5primeF.js                # 6 variante (validare → funcțional dens)
│   ├── 📂 Video6/                                 # Frecvența cuvintelor
│   │   ├── 6freqA.js                              # Cu for...of și obiect
│   │   ├── 6freqB.js                              # Cu reduce
│   │   └── 6freqC.js                              # One-liner cu regex Unicode
│   └── 📄 Segment 1ROpartC...pdf                  # PDF: Paradigme, Recursivitate, Text
│
└── 📂 S2-Appendix/                            # Materiale explicative detaliate
    ├── 📄 Segment 1ROpartB...pdf                  # PDF teoretic suplimentar
    ├── 📄 seminar2video1_explicatie...html        # Explicație Video 1 (HTML)
    ├── 📄 seminar2video1_explicatie...md          # Explicație Video 1 (Markdown)
    ├── 📄 seminar2video2_explicativ...html/md     # Explicație Video 2
    ├── 📄 seminar2video3_explicativ...html/md     # Explicație Video 3
    ├── 📄 seminar2video4_Anexa_Teste...html/md    # Explicație Video 4 (cu teste)
    ├── 📄 seminar2video5_explicativ...html/md     # Explicație Video 5
    └── 📄 seminar2video6_explicativ...html/md     # Explicație Video 6
```

---

## 📚 Conținutul detaliat

### S2-Teorie

Documentul PDF principal care acoperă fundamentele teoretice:

| Document | Conținut |
|----------|----------|
| `Segment 1ROpartA...pdf` | Introducere în JS: Sintaxă de bază, Tipuri de date, Funcții, Structuri de control, Iterație, CLI cu Node.js |

---

### S2-Scripts

Scripturile sunt organizate pe **6 videoclipuri**, fiecare demonstrând o problemă rezolvată în **variante progresive**:

#### 📹 Video 1: Hello World și `process.argv`

Introducere în argumentele din linia de comandă.

| Script | Descriere | Concepte |
|--------|-----------|----------|
| `1helloA.js` | Salut simplu cu un argument | `process.argv[2]`, template literals |
| `1helloB.js` | Salut cu mai multe cuvinte | `slice(2)`, `join(" ")` |

```bash
# Exemplu de rulare
node Video1/1helloA.js Maria        # → Hello, Maria!
node Video1/1helloB.js Ana Maria    # → Hello, Ana Maria!
```

---

#### 📹 Video 2: Verificare divisibilitate

Evoluția de la stil imperativ la expresie compactă.

| Script | Descriere | Stil |
|--------|-----------|------|
| `2adiv.js` | Funcție cu if/else explicit | Imperativ |
| `2adivno0.js` | Cu validare pentru divizor zero | Defensiv |
| `2adivshort.js` | One-liner cu operatorul modulo | Funcțional |

```bash
# Exemplu
node Video2/2adivshort.js 10 5    # → true
node Video2/2adivshort.js 10 3    # → false
```

---

#### 📹 Video 3: Numărare apariții caracter

Patru abordări pentru aceeași problemă — de la `for` clasic la one-liner.

| Script | Abordare | Complexitate |
|--------|----------|--------------|
| `3occurencesA.js` | `for` cu index și `charAt` | O(n) timp, O(1) spațiu |
| `3occurencesB.js` | `for...of` | Mai idiomatică |
| `3occurencesC.js` | `filter` și `length` | Funcțională (alocă array) |
| `3occurencesD.js` | `split` și `length - 1` | One-liner elegant |

```javascript
// Comparație — toate returnează 3 pentru "e" în "an apple a day"
// Varianta D (cea mai compactă):
let occurences = (text, char) => text.split(char).length - 1;
```

---

#### 📹 Video 4: Manipulare array-uri (mutație vs. imutabilitate)

**6 variante** care demonstrează progresiv conceptul de imutabilitate:

| Script | Metodă | Mutație | Observații |
|--------|--------|:-------:|------------|
| `4argumentsA.js` | `push` simplu | ✅ | Modifică array-ul original |
| `4argumentsB.js` | `push` cu rest parameter | ✅ | `...args` pentru argumente variabile |
| `4argumentsC.js` | `push(...args)` cu spread | ✅ | Spread pentru despachetare |
| `4argumentsD.js` | `[...array, ...args]` | ❌ | Creează array nou (imutabil) |
| `4argumentsE.js` | Spread complet | ❌ | Stil funcțional pur |
| `4argumentsF.js` | `concat` | ❌ | Alternativă fără spread |

**Lecție cheie:**
```javascript
// Imperativ (mutație) — eficient dar cu efecte secundare
arr.push(...args);

// Funcțional (imutabil) — predictibil dar alocă memorie
const newArr = [...arr, ...args];
```

---

#### 📹 Video 5: Verificare numere prime

Evoluție de la validare simplă la algoritm optimizat.

| Script | Conținut |
|--------|----------|
| `5primeA.js` | Validare număr de argumente |
| `5primeB.js` | Algoritm de bază (iterare până la n-1) |
| `5primeC.js` | Optimizare cu `Math.sqrt(n)` |
| `5primeD.js` | Cu tratarea cazurilor speciale |
| `5primeE.js` | Refactorizare curată |
| `5primeF.js` | One-liner funcțional cu `Array.from` și `some` |

```javascript
// Varianta F — compactă dar alocă memorie
const isPrime = n => (n = Math.trunc(+n)) > 1 && 
  !Array.from({length: Math.floor(Math.sqrt(n)) - 1}, (_, i) => i + 2)
   .some(d => n % d === 0);
```

---

#### 📹 Video 6: Frecvența cuvintelor (word frequency)

Analiza textului cu `reduce` și expresii regulate Unicode.

| Script | Metodă | Caracteristici |
|--------|--------|----------------|
| `6freqA.js` | `for...of` + obiect contor | Imperativă, clară |
| `6freqB.js` | `reduce` | Funcțională |
| `6freqC.js` | One-liner cu regex `\p{L}+` | Unicode-safe, locale-aware |

```javascript
// Varianta C — corectă pentru diacritice și punctuație
const getCounts = t =>
  (t.match(/\p{L}+/gu) || [])
    .map(x => x.toLocaleLowerCase('ro-RO'))
    .reduce((a, x, _, arr) => (a[x] = (a[x] || 0) + 1 / arr.length, a), {});

getCounts('azi e o zi ploioasă și zile ca acestea');
// { azi: 0.1, e: 0.1, o: 0.1, zi: 0.1, ploioasă: 0.1, și: 0.1, ... }
```

---

### S2-Appendix

Materiale explicative detaliate pentru fiecare videoclip — disponibile în două formate:

| Video | Fișiere | Conținut |
|-------|---------|----------|
| Video 1 | `.html` + `.md` | Explicație `process.argv`, faze de evoluție cod |
| Video 2 | `.html` + `.md` | Comparație imperativ vs. funcțional |
| Video 3 | `.html` + `.md` | Patru abordări pentru numărare |
| Video 4 | `.html` + `.md` | **Anexă cu teste** — mutație vs. imutabilitate |
| Video 5 | `.html` + `.md` | Algoritm prime, optimizări |
| Video 6 | `.html` + `.md` | Regex Unicode, `reduce` avansat |

**Fișierele HTML** pot fi deschise direct în browser pentru vizualizare formatată.

---

## 🧠 Concepte acoperite

### Programare funcțională
- **Funcții pure** — fără efecte secundare
- **Imutabilitate** — creare de structuri noi în loc de modificare
- **Transformări** — `map`, `filter`, `reduce`
- **Compoziție** — înlănțuirea operațiilor

### JavaScript ES6+
- **Arrow functions** — `(x) => x * 2`
- **Template literals** — `` `Hello, ${name}!` ``
- **Rest parameters** — `(...args)`
- **Spread operator** — `[...arr]`
- **Destructuring** — `const [a, b] = arr`

### Node.js CLI
- **`process.argv`** — argumente din linia de comandă
- **Indexare** — `[0]` = node, `[1]` = script, `[2+]` = argumente
- **Procesare** — `slice(2)`, `join(" ")`

### Expresii regulate
- **Sintaxa de bază** — `/pattern/flags`
- **Unicode property escapes** — `\p{L}+` pentru litere
- **Flag-uri** — `g` (global), `u` (unicode)

---

## 📈 Ghid de parcurgere

### Pentru începători:

```
1. Citește PDF-ul teoretic din S2-Teorie
       ↓
2. Rulează scripturile Video1 (Hello World)
       ↓
3. Citește explicația din S2-Appendix/seminar2video1...md
       ↓
4. Continuă cu Video2, Video3... în ordine
       ↓
5. Compară variantele A, B, C... pentru fiecare problemă
```

### Pentru avansați:

```
1. Sari direct la Video4 și Video6 (cele mai complexe)
       ↓
2. Analizează diferențele între variantele imperativ/funcțional
       ↓
3. Experimentează cu modificări proprii
```

---

## ⚙️ Cerințe tehnice

| Componentă | Versiune minimă | Observații |
|------------|-----------------|------------|
| Node.js | 18+ | Pentru Unicode property escapes (`\p{L}`) |
| Editor | Orice | Recomandat: VS Code cu extensia ESLint |
| Terminal | Bash/PowerShell/CMD | Pentru rularea scripturilor |

---

## 🚀 Rulare rapidă

```bash
# Clonare/descărcare repository
cd S2

# Testare Hello World
node S2-Scripts/Video1/1helloA.js Student
# → Hello, Student!

# Testare divisibilitate
node S2-Scripts/Video2/2adivshort.js 15 5
# → true

# Testare numere prime
node S2-Scripts/Video5/5primeF.js 17
# → true

# Testare frecvență cuvinte
node S2-Scripts/Video6/6freqC.js
# → { azi: 0.1, e: 0.1, ... }

# Rulare toate scripturile dintr-un folder
cd S2-Scripts/Video3
for f in *.js; do echo "== $f =="; node "$f"; done
```

---

## 📝 Exerciții propuse

### Nivel începător:

1. **Modifică `1helloB.js`** să afișeze `"Bună ziua, <nume>!"` în loc de `"Hello"`.

2. **Adaugă validare în `2adivshort.js`** pentru cazul când divizorul este 0.

3. **Extinde `3occurencesD.js`** să accepte caracterul ca argument CLI:
   ```bash
   node 3occurencesD.js "hello world" l
   # → 3
   ```

### Nivel intermediar:

4. **Creează o variantă `4argumentsG.js`** care folosește `reduceRight` în loc de `concat`.

5. **Optimizează `5primeF.js`** să nu mai aloce array — folosește un `for` cu `return` timpuriu.

6. **Modifică `6freqC.js`** să returneze doar cuvintele cu frecvență > 10%.

### Nivel avansat:

7. **Implementează streaming** pentru `6freqC.js` — citește text linie cu linie din stdin.

8. **Adaugă suport pentru opțiuni CLI** în orice script:
   ```bash
   node script.js --uppercase --locale=ro-RO "text"
   ```

9. **Creează teste unitare** folosind `node:test` (disponibil în Node 18+).

---

## 📚 Referințe

### Documentație oficială
- [MDN: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Node.js: process.argv](https://nodejs.org/docs/latest/api/process.html#processargv)

### Articole academice
- Backus, J. (1978). *Can programming be liberated from the von Neumann style?* Communications of the ACM.
- Hughes, J. (1989). *Why functional programming matters.* The Computer Journal.

### Tutoriale recomandate
- [JavaScript.info: Arrow Functions](https://javascript.info/arrow-functions)
- [Eloquent JavaScript: Higher-Order Functions](https://eloquentjavascript.net/05_higher_order.html)

---

## 📄 Licență și utilizare

Materialele sunt destinate exclusiv scopurilor educaționale în cadrul cursului de **Tehnologii Web** (ASE-CSIE).

---

<div align="center">

**📖 Material didactic pentru Seminarul S2**

*Tehnologii Web | ASE-CSIE | 2024-2025*

---

**Evoluția stilului: Imperativ → Funcțional → Expresiv**

```
for (let i = 0; i < arr.length; i++) { ... }
        ↓
arr.forEach(item => { ... })
        ↓
arr.map(x => f(x)).filter(p).reduce(r, init)
```

</div>
