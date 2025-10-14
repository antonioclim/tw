# Explicație detaliată linie cu linie (Express Ping → Pong)

Acest document explică fiecare linie, fiecare cuvânt compus și fiecare simbol dintr-un exemplu minim de server **Node.js + Express** care răspunde cu `pong` la cereri `GET /ping` și servește o pagină HTML cu un buton „Ping”.

---

## Cod complet

```js
import express from "express";
const app = express();
const port = 3000;

// Servim un HTML cu un buton
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Ping-Pong</title></head>
    <body>
      <button onclick="ping()">Ping</button>
      <p id="result"></p>
      <script>
        async function ping() {
          const res = await fetch('/ping');
          const text = await res.text();
          document.getElementById('result').innerText = text;
        }
      </script>
    </body>
    </html>
  `);
});

// Endpointul „/ping”
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

---

## Explicații linie cu linie

### `import express from "express";`
- `import` → cuvânt-cheie pentru importarea unui modul.  
- `express` → simbolul local, denumirea pe care o dăm modulului.  
- `from` → indică sursa.  
- `"express"` → șir de caractere, numele pachetului instalat prin npm.

---

### `const app = express();`
- `const` → definește o constantă.  
- `app` → variabila noastră (convenție în Express).  
- `=` → atribuire.  
- `express()` → apel de funcție, returnează un obiect aplicație Express.

---

### `const port = 3000;`
- `port` → variabilă constantă cu valoarea numerică 3000.  

---

### `// Servim un HTML cu un buton`
Comentariu (ignorat de interpretator).  

---

### `app.get("/", (req, res) => { ... })`
- `app` → obiect Express.  
- `.get` → metodă pentru definirea unui handler de tip `GET`.  
- `"/"` → ruta rădăcină.  
- `(req, res)` → parametrii callbackului: cerere și răspuns.  
- `=>` → definește arrow function.  

---

### `res.send(\``
- `res` → obiect răspuns.  
- `.send` → metodă pentru trimiterea unui răspuns.  
- `` ` `` → backtick, începe un template literal multiline.  

---

### Blocul HTML
Trimis ca răspuns atunci când se accesează `/`.

- `<!DOCTYPE html>` → declară tipul documentului.  
- `<html lang="en">` → început document HTML.  
- `<meta charset="UTF-8">` → setare de codificare UTF-8.  
- `<title>` → titlul paginii.  
- `<button onclick="ping()">Ping</button>` → buton ce apelează funcția `ping()`.  
- `<p id="result"></p>` → element gol pentru afișarea rezultatului.  
- `<script>...</script>` → cod JS pentru funcția `ping()`.  

#### Scriptul JS
```js
async function ping() {
  const res = await fetch('/ping');
  const text = await res.text();
  document.getElementById('result').innerText = text;
}
```
- `async` → funcție asincronă.  
- `await fetch('/ping')` → trimite cerere GET la `/ping`.  
- `await res.text()` → citește răspunsul ca text.  
- `document.getElementById('result')` → selectează elementul cu id `result`.  
- `.innerText = text;` → setează textul interior ca `pong`.  

---

### `app.get("/ping", (req, res) => { res.send("pong"); })`
- Definește endpointul `/ping`.  
- Răspunde la cereri GET cu textul „pong”.  

---

### `app.listen(port, () => { ... })`
- Pornește serverul pe portul specificat.  
- `console.log(...)` → afișează un mesaj în terminal.  
- Template literal cu ``${port}`` inserează valoarea variabilei.

---

## Rezultat
- La accesarea `http://localhost:3000/` → se servește pagina HTML cu buton.  
- La accesarea `http://localhost:3000/ping` sau apăsarea butonului → se primește `pong`.  
