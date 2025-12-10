
# Seminar 11 – React starterkit

Acesta este proiectul de laborator pentru Seminarul 11 (React + JSX), gândit
pentru a rula pe **Windows 11**, în **Visual Studio Code**, cu `npm` și
`node` instalate.

## Structură

- `src/` – codul React al starterkit-ului (pagini, pași 1–5, layout).
- `public/teme/` – enunțurile temelor S11v1–S11v5.
- `public/subtitles/` – subtitrările `.srt` pentru înregistrările video S11v1–S11v5.
- `public/S11_original/` – kitul istoric S11step1-5 (S11v1–S11v5, inclusiv GUI + server pentru S11v3).

## Instalare

1. Creează un director gol pe disc, de exemplu:

   ```text
   Z:\tw\SxTEST\FAZA11\S11nextlab
   ```

2. Descarcă arhiva `starterkit_fixed.zip` și dezarhiveaz-o **direct în acest director**,
   astfel încât în `S11nextlab` să vezi fișiere precum:

   ```text
   package.json
   webpack.config.js
   public\
   src\
   ```

3. În VS Code:

   - `File` → `Open Folder...` → selectează `Z:\tw\SxTEST\FAZA11\S11nextlab`

4. În terminal (integrat VS Code sau PowerShell):

   ```bash
   npm install
   npm start
   ```

5. Deschide în browser `http://localhost:3000`.

## Utilizare în seminar

- Folosește meniul de sus pentru a naviga între:

  - **Prezentare generală** – context și flux de lucru.
  - **Teme & resurse** – legături către enunțuri, aplicațiile S11v1–S11v5 și subtitrări.
  - **Pașii 1–5** – demonstrații minimale pentru `useState`, `useEffect`, `props`,
    lifting state și deployment.

- Pentru a rula aplicațiile originale CRA/Node din S11v3, copiază folderele
  `public/S11_original/S11v3/gui` și `public/S11_original/S11v3/server`
  în alt director de lucru și urmează instrucțiunile din pagina „Teme & resurse”.

