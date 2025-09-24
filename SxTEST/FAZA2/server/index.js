import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3002;

function readJSON(p){ return JSON.parse(fs.readFileSync(p, "utf-8")); }

app.get("/api/courses", (_req, res) => {
  const data = readJSON(path.join(__dirname, "data.courses.json"));
  res.json(data);
});
app.get("/api/courses/:id/lessons", (req, res) => {
  const data = readJSON(path.join(__dirname, "data.lessons.json"));
  const lessons = data[req.params.id] || [];
  res.json(lessons);
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "..", "public", "index.html")));

app.listen(PORT, () => console.log(`[FAZA2] pe http://localhost:${PORT}`));
