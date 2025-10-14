import express from "express";


const app = express();
const port = 3000;


app.get("/favicon.ico", (req, res) => res.status(204).end());


app.get("/", (req, res) => {
  res.send(`
    <button onclick="ping()" style="font-size:250%;">Ping</button>
    <p id="result" style="font-size:1000%;"></p>
    <script>
      async function ping() {
        const res = await fetch('/ping');
        document.getElementById('result').innerText = await res.text();
      }
    </script>
  `);
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
