import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json({ limit: "128kb" }));

// Schemas
const Lang = z.enum(["ro","en"]);
const Course = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  lang: Lang,
  summary: z.string().min(1),
  tags: z.array(z.string()).optional(),
  lessons: z.number().int().nonnegative()
});
const Lesson = z.object({
  id: z.number().int().positive(),
  courseId: z.number().int().positive(),
  title: z.string().min(1),
  lang: Lang,
  duration: z.number().int().positive()
});
const QuizItem = z.object({
  id: z.string().min(1),
  type: z.enum(["single","multiple"]),
  stem: z.string().min(1),
  options: z.array(z.string()).min(2),
  correct: z.array(z.number().int().nonnegative()).min(1)
});
const Quiz = z.object({
  lessonId: z.number().int().positive(),
  items: z.array(QuizItem).min(1)
});

function readJSON(name){
  return JSON.parse(fs.readFileSync(path.join(__dirname, name), "utf-8"));
}

// Routes
app.get("/api/health", (_req,res)=> res.json({ status: "ok", ts: Date.now() }));

app.get("/api/courses", (_req, res) => {
  const data = readJSON("data.courses.json");
  const parsed = z.array(Course).safeParse(data);
  if(!parsed.success) return res.status(500).json({ error: { code:"DATA_INVALID", issues: parsed.error.issues } });
  res.json(parsed.data);
});

app.get("/api/courses/:id/lessons", (req,res)=>{
  const data = readJSON("data.lessons.json");
  const arr = data[req.params.id] || [];
  const parsed = z.array(Lesson).safeParse(arr);
  if(!parsed.success) return res.status(500).json({ error: { code:"DATA_INVALID", issues: parsed.error.issues } });
  res.json(parsed.data);
});

app.get("/api/lessons/:id", (req,res)=>{
  const data = readJSON("data.lessons.json");
  const all = Object.values(data).flat();
  const found = all.find(x=> String(x.id) === String(req.params.id));
  if(!found) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  const parsed = Lesson.safeParse(found);
  if(!parsed.success) return res.status(500).json({ error:{ code:"DATA_INVALID", issues: parsed.error.issues } });
  res.json(parsed.data);
});

app.get("/api/lessons/:id/quiz", (req,res)=>{
  const data = readJSON("data.quizzes.json");
  const quiz = data[req.params.id];
  if(!quiz) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  const parsed = Quiz.safeParse(quiz);
  if(!parsed.success) return res.status(500).json({ error:{ code:"DATA_INVALID", issues: parsed.error.issues } });
  res.json(parsed.data);
});

// Static
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (_req,res)=> res.sendFile(path.join(__dirname, "..", "public", "index.html")));

app.listen(PORT, ()=> console.log(`[FAZA4] pe http://localhost:${PORT}`));

export default app; // pentru teste
