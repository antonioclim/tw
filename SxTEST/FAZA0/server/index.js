// Faza 0 — server minimal Express (ESM)
// Rulăm cu: `npm run dev`  (sau `npm start`)
// Endpointuri: GET /ping (sanity), conținut static din /public

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de sănătate minimal
app.get("/ping", (req, res) => {
  res.type("text/plain").send("pong");
});

// Servire fișiere statice din /public
app.use(express.static(path.join(__dirname, "..", "public")));

// Fallback: dacă se cere rădăcina, servim index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[Faza 0] MiniLearn SxTEST pe http://localhost:${PORT}`);
  console.log("  • GET /ping  → 'pong'");
  console.log("  • /         → index.html din /public");
});
