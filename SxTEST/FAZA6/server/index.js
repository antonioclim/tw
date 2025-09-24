import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize, DataTypes } from "sequelize";
import { z } from "zod";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json({ limit: "128kb" }));

// DB setup
const dbFile = path.join(__dirname, "minilearn.sqlite");
const sequelize = new Sequelize({ dialect: "sqlite", storage: dbFile, logging: false });

export const Course = sequelize.define("Course", {
  title: { type: DataTypes.STRING, allowNull:false },
  lang: { type: DataTypes.STRING, allowNull:false },
  summary: { type: DataTypes.TEXT, allowNull:false }
}, { timestamps:true });

export const Lesson = sequelize.define("Lesson", {
  title: { type: DataTypes.STRING, allowNull:false },
  slug: { type: DataTypes.STRING, allowNull:false, unique:true },
  order: { type: DataTypes.INTEGER, allowNull:false },
  html: { type: DataTypes.TEXT, allowNull:false },
  lang: { type: DataTypes.STRING, allowNull:false },
  duration: { type: DataTypes.INTEGER, allowNull:false }
}, { timestamps:true });

Course.hasMany(Lesson, { foreignKey: "courseId" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

// Schemas
const Lang = z.enum(["ro","en"]);
const CourseIn = z.object({ title: z.string().min(1), lang: Lang, summary: z.string().min(1) });
const LessonIn = z.object({
  courseId: z.number().int().positive(),
  title: z.string().min(1),
  slug: z.string().min(1),
  order: z.number().int().nonnegative(),
  html: z.string().min(1),
  lang: Lang,
  duration: z.number().int().positive()
});

async function seed() {
  await sequelize.sync();
  const cnt = await Course.count();
  if (cnt === 0) {
    const c1 = await Course.create({ title:"JS Basics", lang:"ro", summary:"Bazele JS" });
    const c2 = await Course.create({ title:"HTTP & REST", lang:"en", summary:"Fundamente web" });
    await Lesson.bulkCreate([
      { courseId: c1.id, title:"Tipuri & variabile", slug:"tipuri-variabile", order:0, html:"<p>Variabile...</p>", lang:"ro", duration:8 },
      { courseId: c1.id, title:"Funcții & scope", slug:"functii-scope", order:1, html:"<p>Funcții...</p>", lang:"ro", duration:10 },
      { courseId: c2.id, title:"HTTP Semantics", slug:"http-semantics", order:0, html:"<p>RFC 9110...</p>", lang:"en", duration:12 },
    ]);
  }
}
await seed();

// Routes
app.get("/api/courses", async (_req,res)=>{
  const rows = await Course.findAll({ order:[["id","ASC"]] });
  res.json(rows.map(r=>r.toJSON()));
});

app.post("/api/courses", async (req,res)=>{
  const p = CourseIn.safeParse(req.body);
  if(!p.success) return res.status(400).json({ error:{ code:"VALIDATION_ERROR", issues:p.error.issues } });
  const row = await Course.create(p.data);
  res.status(201).json(row.toJSON());
});

app.get("/api/courses/:id/lessons", async (req,res)=>{
  const rows = await Lesson.findAll({ where:{ courseId: req.params.id }, order:[["order","ASC"]] });
  res.json(rows.map(r=>r.toJSON()));
});

app.get("/api/lessons/:slug", async (req,res)=>{
  const row = await Lesson.findOne({ where:{ slug: req.params.slug }});
  if(!row) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  res.json(row.toJSON());
});

// Static
app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (_req,res)=> res.sendFile(path.join(__dirname, "..", "public", "index.html")));

app.listen(PORT, ()=> console.log(`[FAZA6] pe http://localhost:${PORT}`));

export default app;
