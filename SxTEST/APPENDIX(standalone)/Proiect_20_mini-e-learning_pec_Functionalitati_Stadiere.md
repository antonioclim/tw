# MiniLearn — **Specificații funcționale finale, tehnologii per funcționalitate și etapizare cu checklist**  
**Versiune:** 2025-09-23  
**Autor:** Coordonator proiect / Cadru didactic



> **Obiectivul acestui document** este să prezinte, într-o manieră exhaustivă și riguroasă, 
> **lista finală de specificații funcționale** pentru proiectul *MiniLearn* (micro‑e‑learning), 
> **descrierea funcționalităților finale**, împreună cu **tehnologiile ce vor fi folosite per funcționalitate/specificație**, 
> precum și **o etapizare a proiectului** în pași executabili cu **checklist** de validare. 
> Stilul de expunere este academic/profesionist, dar lizibil, cu formulări recomandative sau imperative — de tipul 
> „**Vom folosi...**”, „**Ar trebui folosite...**”, „**Se recomandă...**” — pentru a pune accent pe reproductibilitate și 
> claritate operațională.
>
> Documentul este conceput să poată fi citit independent, fără a necesita alte resurse, și să poată ghida o echipă de 
> studenți sau cercetători în implementarea coerentă a proiectului din faza zero până la o versiune demonstrabilă.


# Specificații funcționale finale (detaliate)

## Gestionarea cursurilor (Course Management)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Crearea, listarea, căutarea și filtrarea cursurilor.
- Atribuirea limbii (ro/en) și a etichetelor (tags) relevante.
- Vizualizarea metadatelor (titlu, rezumat, număr de lecții, durată totală estimată).
- Exportarea unei liste de cursuri în format JSON/CSV pentru raportare minimală.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Gestionarea cursurilor (Course Management)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Gestionarea lecțiilor (Lesson Management)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Crearea, editarea, ordonarea și publicarea lecțiilor în cadrul unui curs.
- Randarea conținutului în HTML/Markdown cu stilare CSS accesibilă.
- Atașarea materialelor auxiliare (linkuri OER, media).
- Calcularea duratei estimate și marcarea stării (draft/publicată/retired).

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Gestionarea lecțiilor (Lesson Management)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Micro‑paths (trasee de micro‑învățare)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Definirea secvențelor coerente de lecții orientate către un rezultat specific.
- Navigarea ghidată: următoarea lecție recomandată se bazează pe progres.
- Afișarea progresului pe întreg traseul (bară și procent).
- Reguli de acces condiționat (prerechizite între lecții).

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Micro‑paths (trasee de micro‑învățare)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Chestionare formative (Quiz)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Tipuri: single-choice, multiple-choice, short-open, Likert‑scale.
- Feedback imediat (explanator, cu trimiteri la secțiuni din lecție).
- Scor pe întrebare și scor pe lecție; criterii de trecere configurabile.
- Bancă de itemi reutilizabilă și randomizare de itemi/opțiuni.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Chestionare formative (Quiz)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Progres învățare (Learning Progress)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Marcare automată a lecțiilor finalizate; reluare rapidă din locul rămas.
- Stocare locală (localStorage) pentru versiunea minimală.
- Export/import progres în format JSON (portabil între dispozitive).
- Agregare minimală pentru raportare: timp total, scoruri medii.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Progres învățare (Learning Progress)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Administrare conținut (Admin Lite)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Interfețe CRUD pentru cursuri/lecții/quiz; validări de câmpuri.
- Versionare simplificată a lecțiilor (history minimal).
- Previzualizare (preview) înainte de publicare.
- Jurnalizare (loguri) la operațiuni administrative esențiale.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Administrare conținut (Admin Lite)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## API public minimal (REST)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Servicii pentru listarea cursurilor, lecțiilor și quiz‑urilor.
- Endpoint-uri pentru progres și export/import.
- Contracte JSON stabile, cu coduri de status HTTP corecte.
- Politici CORS explicite pentru dezvoltare/local.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **API public minimal (REST)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Interfață utilizator accesibilă (a11y) + i18n

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Structură semantică HTML5 (landmarks), focoase vizibile, aria‑labels.
- Compatibilitate tastatură (navigare fără mouse).
- I18n minimal: UI în română și engleză; persistarea preferinței de limbă.
- Contrast și tipografie lizibile în temă luminoasă/întunecată.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Interfață utilizator accesibilă (a11y) + i18n**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Căutare și filtrare

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Căutare după titlu/etichete; filtrare după limbă și starea lecției.
- Debounce pe input; evidențierea termenilor căutați (highlight).
- Sortare după durată, titlu, dată actualizare.
- Fallback rezonabil la lipsa rețelei (cache scurt pe client).

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Căutare și filtrare**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Raportare minimală & export

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Export JSON/CSV cu metadate de curs/lecție și progres agregat.
- Generarea unui raport sumar (tabel) în UI, cu posibilitate de descărcare.
- Compatibilitate cu foi de calcul (Excel/Sheets).
- Semnături simple de versiune (hash dată/time).

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Raportare minimală & export**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Securitate pragmatică

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Limitare dimensiune payload; validare schema input; sanitizare HTML.
- Jurnalizare evenimente (info/warn/error) și ID cerere pentru corelare.
- Rate limiting ușor pe rute sensibile (admin/progres).
- Politici CORS restrânse pe medii non‑dev.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Securitate pragmatică**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Performanță și toleranță la erori

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Lazy‑loading/Code splitting pentru componente grele (în faza React).
- Retry/backoff cu AbortController pentru apeluri de rețea instabile.
- Cache client pentru liste; invalidare simplă la interval.
- Indicatori vizuali de stare: încărcare, eroare, succes.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Performanță și toleranță la erori**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Integrare front‑end avansată (faza React)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Componentizare a vizualizărilor (listă curs, listă lecții, vizualizare lecție, quiz).
- Routing client‑side simplu; menținerea stării.
- Memoizare și virtualizare listă pentru performanță.
- Integrare tabel (sort/filter) pentru raportare.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Integrare front‑end avansată (faza React)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## Management stare (Redux Toolkit)

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Stare globală pentru progres și preferințe UI (limbă/temă).
- Persistență parțială în localStorage (reconcile la load).
- Selectorii memoizați pentru liste mari.
- Reguli clare de actualizare imutabilă.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **Management stare (Redux Toolkit)**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.

## CI local & calitate cod

### Descriere generală
Vom folosi o abordare iterativ‑incrementală pentru a implementa această capabilitate, respectând principiile de reproductibilitate, accesibilitate și claritate a contractelor API. Ar trebui definite clar metadatele, stările și fluxurile de utilizare, iar interfața ar trebui să fie robustă la erori și să ofere feedback consistent.

### Cerințe funcționale (detaliate)
- Scripturi npm: lint, format, test, typecheck (dacă se introduce TS).
- Pre‑commit hooks (Husky) pentru verificări rapide.
- Standardizarea stilului (Prettier, EditorConfig).
- Documentație minimă în README per fază.

### User stories (exemplificative)
- Ca student, vreau să pot identifica rapid resursele relevante, pentru a mă concentra pe micro‑obiective clare.
- Ca autor, vreau să pot crea și publica conținut cu efort minim, pentru a reduce timpul până la livrare.
- Ca evaluator, vreau să observ progresul agregat minimal, pentru a calibra intervențiile didactice.

### Criterii de acceptanță (acceptance criteria)
- Interfața oferă feedback imediat pentru acțiuni reușite sau erori (toasts/aria‑live).
- Rutele API răspund cu coduri HTTP corecte și payload JSON valid (fără ambiguități de schemă).
- Persistența locală/SQLite este coerentă și nu corupe datele la reluarea aplicației.
- Timpul de răspuns rămâne sub pragul pragmatic (<200 ms pentru `GET /lessons` pe un dataset mic).

### Considerații de securitate
Ar trebui folosite limitări de mărime pentru payload, validări stricte de schemă, sanitizare HTML și politici CORS restrânse pe medii non‑dev. În plus, ar trebui jurnalizate evenimentele semnificative (info/warn/error) cu corelare la ID de cerere.

### Accesibilitate (a11y) și i18n
Vom folosi o structură semantică HTML5 consistentă (landmarks), focalizare vizibilă, aria‑labels pentru controale și roluri adecvate. Ar trebui folosite două dicționare (ro/en), cu posibilitatea de a comuta și de a persista preferința în `localStorage`.

### Performanță
Ar trebui folosite tehnici de lazy‑loading/code splitting (în faza React), cache pe client pentru liste și `AbortController` pentru a preveni operații inutile. Pentru liste mari, ar trebui adoptată virtualizarea.


### Tehnologii pentru **CI local & calitate cod**

- **Front‑end (UI):** Vom folosi HTML5 semantic, CSS (Flex/Grid) și JavaScript (ESM). În faza React, vom folosi componentizare, router client‑side și tehnici de optimizare (memoizare, lazy‑loading).  
- **Back‑end (API):** Vom folosi Node.js (LTS) cu Express pentru definirea rutelor REST (`GET/POST/PUT/DELETE`). Validarea request‑urilor ar trebui făcută cu un validator de schemă (ex.: `zod` sau `joi`).  
- **Persistență:** Pentru versiunea minimală, ar trebui folosit `localStorage` (progres, preferințe). Pentru versiunea consolidată, vom folosi `SQLite` prin ORM (Sequelize).  
- **Testare:** Pentru unit/integration vom folosi `Vitest` sau `Jest`. Pentru E2E (opțional) vom folosi `Playwright`.  
- **Calitate:** Ar trebui folosite ESLint `eslint:recommended`, Prettier și EditorConfig. Commit‑urile ar trebui trecute prin hook‑uri `pre-commit`.  
- **Accesibilitate:** Ar trebui folosită semantică HTML5, `aria-*`, focus vizibil și contraste suficiente.  
- **i18n:** Dicționare `{ ro: {...}, en: {...} }`, persistență preferințe limbă în `localStorage`.



# Țesătura tehnologică per specificație (sinopsis transversal)

În această secțiune vom sintetiza, într‑o manieră transversală, legăturile dintre specificațiile funcționale și 
tehnologiile aferente, astfel încât să fie evident „ce anume” se potrivește „la ce” și „de ce”.

- **UI de listare (cursuri/lecții) & navigare** → Vom folosi HTML5 semantic, CSS (Flex/Grid), JS (ESM); în faza React, 
  vom folosi componentizare (`<CourseList/>`, `<LessonList/>`) și `react-router-dom` pentru navigare; filtrare/căutare 
  cu debounce; highlight termenilor căutați.  
- **Vizualizare lecție & quiz** → Ar trebui folosite componente curate pentru conținut (renderer Markdown → HTML securizat) 
  și itemi de quiz (single/multiple/open/scale). Feedback imediat; scor și criteriu de trecere configurabil.  
- **Progres** → Vom folosi localStorage în versiunea minimală (chei per `lessonId` / `pathId`), iar în faza consolidată 
  SQLite/Sequelize cu model `Progress`. Export/import JSON cu validare schemă.  
- **API** → Vom folosi Express (Node LTS), middleware pentru erori, validatoare de schemă (`zod`/`joi`), CORS explicit în dev, 
  rate limiting ușor pe rute sensibile.  
- **Admin Lite** → CRUD cu formulare accesibile; validări; previzualizare conținut; jurnalizare operațiuni; versiuni simple.  
- **Accesibilitate & i18n** → Vom folosi landmarks HTML5, aria‑labels, focus vizibil; dicționare `{ ro, en }` și persistarea preferinței.  
- **Calitate** → Ar trebui folosite ESLint, Prettier, EditorConfig; Vitest/Jest pentru teste; Playwright opțional E2E.  
- **Performanță & toleranță la erori** → Lazy‑loading, memoizare, virtualizare; retry/backoff + `AbortController`; indicatori UX clari.


# Etapizare detaliată a proiectului (faze + checklist)

## Faza 0 — Inițializare & reflex VSL

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Inițializare repo și structură directoare.
- Server minimal Express (`GET /ping → pong`).
- Pagină statică `public/index.html` cu structură semantică.
- Scripturi npm: `dev`, `start`, `lint`, `format`, `test`.
- README cu pași de rulare și criterii DoD.

#### Checklist (Definition of Done)
- [ ] Inițializare repo și structură directoare.
- [ ] Server minimal Express (`GET /ping → pong`).
- [ ] Pagină statică `public/index.html` cu structură semantică.
- [ ] Scripturi npm: `dev`, `start`, `lint`, `format`, `test`.
- [ ] README cu pași de rulare și criterii DoD.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 1 — Modele și utilitare de bază

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Definire modele logice (Course/Lesson/Quiz/Progress).
- Utilitare pure (validatori, transformări DTO).
- Primele teste unit (Vitest/Jest).
- Stabilirea contractelor JSON (draft).

#### Checklist (Definition of Done)
- [ ] Definire modele logice (Course/Lesson/Quiz/Progress).
- [ ] Utilitare pure (validatori, transformări DTO).
- [ ] Primele teste unit (Vitest/Jest).
- [ ] Stabilirea contractelor JSON (draft).
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 2 — UI listare cursuri/lecții + filtrare/căutare

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Listă cursuri, listă lecții; filtrare după limbă/tag; căutare.
- Debounce input; highlight; sortări principale.
- Accesibilitate (aria‑labels, focus).

#### Checklist (Definition of Done)
- [ ] Listă cursuri, listă lecții; filtrare după limbă/tag; căutare.
- [ ] Debounce input; highlight; sortări principale.
- [ ] Accesibilitate (aria‑labels, focus).
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 3 — Vizualizare lecție & quiz (variantă minimală)

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Renderer Markdown→HTML securizat; șabloane CSS pentru conținut.
- Quiz simple; feedback imediat; scor; criteriu de trecere.
- Persistență progres în localStorage.

#### Checklist (Definition of Done)
- [ ] Renderer Markdown→HTML securizat; șabloane CSS pentru conținut.
- [ ] Quiz simple; feedback imediat; scor; criteriu de trecere.
- [ ] Persistență progres în localStorage.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 4 — API public minimal & validări

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Rute `/api/courses`, `/api/lessons/:id`, `/api/lessons/:id/quiz`.
- Middleware erori; validări schemă; statusuri HTTP corecte.
- Testare contract API (unit/integration).

#### Checklist (Definition of Done)
- [ ] Rute `/api/courses`, `/api/lessons/:id`, `/api/lessons/:id/quiz`.
- [ ] Middleware erori; validări schemă; statusuri HTTP corecte.
- [ ] Testare contract API (unit/integration).
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 5 — Admin Lite (CRUD)

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Formulare accesibile pentru adăugare/editare lecții/quiz.
- Previzualizare (preview) și jurnalizare operațiuni.
- Versionare simplificată a lecțiilor.

#### Checklist (Definition of Done)
- [ ] Formulare accesibile pentru adăugare/editare lecții/quiz.
- [ ] Previzualizare (preview) și jurnalizare operațiuni.
- [ ] Versionare simplificată a lecțiilor.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 6 — Persistență SQLite (Sequelize)

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Definire modele Sequelize; migrații și seed minimal.
- Adaptarea API pentru persistare reală.
- Testare integrare DB + rollback pe erori.

#### Checklist (Definition of Done)
- [ ] Definire modele Sequelize; migrații și seed minimal.
- [ ] Adaptarea API pentru persistare reală.
- [ ] Testare integrare DB + rollback pe erori.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 7 — React (componentizare)

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Portare UI în React (liste, vizualizare lecție, quiz).
- Routing client‑side (`react-router-dom`), code splitting.
- Memoizare selectivă și virtualizare listă.

#### Checklist (Definition of Done)
- [ ] Portare UI în React (liste, vizualizare lecție, quiz).
- [ ] Routing client‑side (`react-router-dom`), code splitting.
- [ ] Memoizare selectivă și virtualizare listă.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 8 — Management stare (Redux Toolkit)

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Slice pentru progres + preferințe UI; persist parțial în localStorage.
- Selectorii memoizați; reguli stricte de update imutabil.
- Testare logică de reducer/selectors.

#### Checklist (Definition of Done)
- [ ] Slice pentru progres + preferințe UI; persist parțial în localStorage.
- [ ] Selectorii memoizați; reguli stricte de update imutabil.
- [ ] Testare logică de reducer/selectors.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 9 — Raportare & export

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- Export JSON/CSV cu agregări (timp, scor).
- Tabel UI cu sort/filter (componență externă).
- Descărcare fișier; compatibilitate Excel/Sheets.

#### Checklist (Definition of Done)
- [ ] Export JSON/CSV cu agregări (timp, scor).
- [ ] Tabel UI cu sort/filter (componență externă).
- [ ] Descărcare fișier; compatibilitate Excel/Sheets.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante

## Faza 10 — Calitate & CI local

### Obiective
- Vom folosi o abordare incrementală cu livrabile verificabile la fiecare pas.
- Ar trebui folosite teste și scripturi standard pentru a garanta calitatea la fiecare commit.

### Livrabile
- ESLint/Prettier/EditorConfig integrate în scripts.
- Husky `pre-commit`; `npm run test` obligatoriu local.
- README final cu capturi și exemple CLI.

#### Checklist (Definition of Done)
- [ ] ESLint/Prettier/EditorConfig integrate în scripts.
- [ ] Husky `pre-commit`; `npm run test` obligatoriu local.
- [ ] README final cu capturi și exemple CLI.
- [ ] Toate testele verzi; lint fără erori; format standardizat
- [ ] Documentație (README) actualizată cu pași de rulare și capturi relevante




# Concluzii și recomandări finale

- **Vom folosi** o strategie incrementală, cu livrabile clare și contracte API stabilite timpuriu, pentru a reduce ambiguitățile.  
- **Ar trebui folosite** practici de calitate (test, lint, format) înainte de fiecare push, astfel încât să păstrăm stabilitatea pe tot parcursul dezvoltării.  
- **Se recomandă** o documentație succintă, dar exactă, cu exemple reproducibile (CLI, capturi), pentru a facilita evaluarea.  
- **Vom monitoriza** riscurile (salt tehnologic prea devreme, derapaj de scope, datorii tehnice) și vom menține evidențe transparente cu remedieri programate.  

Acest document poate servi drept **ghid unic** de implementare și evaluare, ușor de urmat atât de către studenți, cât și de către cadre didactice.
