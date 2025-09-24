import express from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json({ limit: "128kb" }));

// zod schema
const Lang = z.enum(["ro","en"]);
const Lesson = z.object({
  id: z.number().int().positive(),
  courseId: z.number().int().positive(),
  title: z.string().min(1),
  lang: Lang,
  duration: z.number().int().positive()
});
const LessonCreate = Lesson.omit({ id: true }).extend({
  id: z.number().int().positive().optional()
});
const LessonUpdate = Lesson.partial().extend({ id: z.number().int().positive().optional() });

function dbPath(){ return path.join(__dirname, "lessons.json"); }
function readLessons(){ return JSON.parse(fs.readFileSync(dbPath(),"utf-8")); }
function writeLessons(arr){ fs.writeFileSync(dbPath(), JSON.stringify(arr, null, 2), "utf-8"); }

// CRUD
app.get("/api/lessons", (_req,res)=>{
  const arr = readLessons();
  res.json(arr);
});

app.post("/api/lessons", (req,res)=>{
  const p = LessonCreate.safeParse(req.body);
  if(!p.success) return res.status(400).json({ error:{ code:"VALIDATION_ERROR", issues:p.error.issues } });
  const arr = readLessons();
  const newId = p.data.id ?? (Math.max(0, ...arr.map(x=>x.id)) + 1);
  const row = { id: newId, ...p.data };
  const check = Lesson.safeParse(row);
  if(!check.success) return res.status(400).json({ error:{ code:"VALIDATION_ERROR", issues:check.error.issues } });
  arr.push(row); writeLessons(arr);
  res.status(201).json(row);
});

app.put("/api/lessons/:id", (req,res)=>{
  const id = Number(req.params.id);
  if(!Number.isInteger(id) || id<=0) return res.status(400).json({ error:{ code:"INVALID_ID" } });
  const p = LessonUpdate.safeParse(req.body);
  if(!p.success) return res.status(400).json({ error:{ code:"VALIDATION_ERROR", issues:p.error.issues } });
  const arr = readLessons();
  const idx = arr.findIndex(x=>x.id===id);
  if(idx<0) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  const updated = { ...arr[idx], ...p.data, id };
  const check = Lesson.safeParse(updated);
  if(!check.success) return res.status(400).json({ error:{ code:"VALIDATION_ERROR", issues:check.error.issues } });
  arr[idx] = updated; writeLessons(arr);
  res.json(updated);
});

app.delete("/api/lessons/:id", (req,res)=>{
  const id = Number(req.params.id);
  if(!Number.isInteger(id) || id<=0) return res.status(400).json({ error:{ code:"INVALID_ID" } });
  const arr = readLessons();
  const idx = arr.findIndex(x=>x.id===id);
  if(idx<0) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  const [deleted] = arr.splice(idx,1);
  writeLessons(arr);
  res.json({ deleted });
});

// Static
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (_req,res)=> res.sendFile(path.join(__dirname, "..", "public", "index.html")));

app.listen(PORT, ()=> console.log(`[FAZA5] pe http://localhost:${PORT}`));

export default app;
