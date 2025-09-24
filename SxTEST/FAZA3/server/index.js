import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3003;

app.get("/api/lessons/:id", (req,res)=>{
  const p = path.join(__dirname, `lesson.${req.params.id}.json`);
  if(!fs.existsSync(p)) return res.status(404).json({error:{code:'NOT_FOUND'}});
  res.json(JSON.parse(fs.readFileSync(p,'utf-8')));
});
app.get("/api/lessons/:id/quiz", (req,res)=>{
  const p = path.join(__dirname, `quiz.${req.params.id}.json`);
  if(!fs.existsSync(p)) return res.status(404).json({error:{code:'NOT_FOUND'}});
  res.json(JSON.parse(fs.readFileSync(p,'utf-8')));
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "..", "public", "index.html")));

app.listen(PORT, () => console.log(`[FAZA3] pe http://localhost:${PORT}`));
