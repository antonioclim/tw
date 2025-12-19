# Seminar 13 – Componente externe în React (Nextlab Suite integrat)

> Observaţie tehnică: suita foloseşte **Vite** (în loc de vechiul flux bazat pe webpack-dev-server) pentru a elimina
> avertizările de deprecieri la rulare şi pentru a reduce drastic avertizările tranzitive la instalare.
Acest pachet reorganizează seminariul **„13. Componente externe în React”** într‑o suită *operaţională* şi *didactică*,
în care:

- pe **portul 3000** rulează un **dashboard** (punct de intrare);
- fiecare **pas (1–4)** rulează ca aplicaţie separată (client + server), pe porturi dedicate;
- dashboard‑ul oferă, pentru fiecare pas, **(a)** explicaţii detaliate (ce scriem / ce face / ce exemplificăm / de ce),
şi **(b)** buton de deschidere a aplicaţiei pasului.

> Instalare tipică (conform infrastructurii tale): `Z:\tw\SxTEST\FAZA13\nextlab`

---

## 0) Precondiţii (Windows 11)

- **Node.js**: recomandat LTS (18 sau 20).
- **npm** disponibil în terminal.
- **Visual Studio Code** (opţional, dar recomandat pentru predare/laborator).

---

## 1) Structura proiectului

- `apps/dashboard` – dashboard‑ul (React) pe **http://localhost:3000**
- `apps/step1` – Pasul 1 (client **3001**, server **8081**)
- `apps/step2` – Pasul 2 (client **3002**, server **8082**)
- `apps/step3` – Pasul 3 (client **3003**, server **8083**)
- `apps/step4` – Pasul 4 (client **3004**, server **8084**)

Materiale:
- `apps/dashboard/public/materiale/` – SRT + document teorie (servite direct din dashboard)
- `docs/` – copie a documentului teoretic (DOCX)
- `extras/` – arhivele originale încărcate (pentru trasabilitate)

---

## 2) Instalare (o singură dată)

Deschide un terminal (PowerShell) în rădăcina proiectului (ex. `Z:\tw\SxTEST\FAZA13\nextlab`) şi rulează:

```bash
npm run setup
```

Acest pas instalează dependenţele pentru dashboard şi pentru fiecare pas (inclusiv serverele Express).

---

## 3) Rulare (mod recomandat pentru predare)

### Variantă A – Porneşti tot (dashboard + paşii 1–4)

```bash
npm run start:all
```

- dashboard: http://localhost:3000
- pas 1: http://localhost:3001
- pas 2: http://localhost:3002
- pas 3: http://localhost:3003
- pas 4: http://localhost:3004

### Variantă B – Porneşti selectiv (de exemplu doar Pasul 2)

```bash
npm run start:pas2
```

---

## 4) Observaţii de operare

1. **Porturi**: fiecare pas este preconfigurat prin fişiere `.env` (client) şi `server/.env` (server).
2. **Securitate browser**: dashboard‑ul poate *deschide* aplicaţiile pasului, dar nu poate porni procese locale.
   Pornirea se face din terminal (prin `npm run start:...`).
3. **Depanare rapidă**:
   - dacă un pas nu se deschide, verifică în terminal că rulează atât clientul cât şi serverul;
   - dacă un port e ocupat, eliberează portul sau modifică `.env`‑urile pasului respectiv.

---

## 5) Repere didactice

Fiecare pas este conceput ca o extindere controlată:

1. **Pasul 1**: DataTable + Dialog + căutare explicită (declanşare prin buton).
2. **Pasul 2**: Filtrare pe coloană + paginare (rânduri/pagină controlate parametric).
3. **Pasul 3**: Sortare; accent pe sortare numerică pentru „număr de pagini”.
4. **Pasul 4**: Grafice într‑un dialog; integrarea bibliotecilor de vizualizare şi comparaţia codărilor.

Dashboard‑ul conţine pagini de explicaţii pentru fiecare pas, formulate astfel încât să susţină atât predarea frontală,
cât şi lucrul asistat în laborator.

---

## 6) Licenţe şi notă metodologică

Acest kit foloseşte biblioteci externe (PrimeReact, PrimeFlex, PrimeIcons, bibliotecă de grafice în Pasul 4).
Înainte de utilizare în proiecte reale, verifică licenţele şi politica instituţională.

