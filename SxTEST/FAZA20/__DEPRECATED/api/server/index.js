import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Sequelize, DataTypes } from "sequelize";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const dbFile     = path.join(__dirname, "minilearn.sqlite");

const app  = express();
const PORT = process.env.PORT || 3006;

app.use(express.json({ limit: "256kb" }));
app.use((req,res,next)=>{
  res.setHeader("Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  next();
});
app.get("/favicon.ico", (_req,res)=> res.status(204).end());

// DB
const sequelize = new Sequelize({ dialect: "sqlite", storage: dbFile, logging:false });

const Course = sequelize.define("Course", {
  title:   { type: DataTypes.STRING,  allowNull:false },
  lang:    { type: DataTypes.STRING,  allowNull:false },
  summary: { type: DataTypes.TEXT,    allowNull:true  }
}, { timestamps:true });

const Lesson = sequelize.define("Lesson", {
  courseId: { type: DataTypes.INTEGER, allowNull:false },
  title:    { type: DataTypes.STRING,  allowNull:false },
  slug:     { type: DataTypes.STRING,  allowNull:false, unique:true },
  order:    { type: DataTypes.INTEGER, allowNull:false },
  html:     { type: DataTypes.TEXT,    allowNull:false },
  lang:     { type: DataTypes.STRING,  allowNull:false },
  duration: { type: DataTypes.INTEGER, allowNull:false }
}, { timestamps:true });

const Quiz = sequelize.define("Quiz", {
  lessonId: { type: DataTypes.INTEGER, allowNull:false },
  items:    { type: DataTypes.JSON,    allowNull:false } // {id,type,stem,options[],correct[],feedback[]}
}, { timestamps:true });

Course.hasMany(Lesson, { foreignKey: "courseId" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

// VALIDÄ‚RI Zod
const Lang = z.enum(["ro","en"]);
const CourseIn = z.object({ title: z.string().min(1), lang: Lang, summary: z.string().optional().default("") });
const LessonIn = z.object({
  courseId: z.number().int().positive(),
  title:    z.string().min(1),
  slug:     z.string().min(1),
  order:    z.number().int().nonnegative(),
  html:     z.string().min(1),
  lang:     Lang,
  duration: z.number().int().positive()
});

// SEED minimal
async function seed(){
  await sequelize.sync();
  const cnt = await Course.count();
  if(cnt===0){
    const c1 = await Course.create({ title:"JS Basics", lang:"ro", summary:"Bazele JS" });
    const c2 = await Course.create({ title:"HTTP & REST", lang:"en", summary:"Fundamente web" });
    const l1 = await Lesson.create({ courseId:c1.id, title:"Tipuri & variabile", slug:"tipuri-variabile", order:0, html:"<h2>Variabile</h2><p>let/const/varâ€¦</p>", lang:"ro", duration:8 });
    const l2 = await Lesson.create({ courseId:c1.id, title:"FuncÈ›ii & scope",     slug:"functii-scope",   order:1, html:"<h2>FuncÈ›ii</h2><p>Declarare, arrowâ€¦</p>",     lang:"ro", duration:10 });
    const l3 = await Lesson.create({ courseId:c2.id, title:"HTTP Semantics",      slug:"http-semantics",  order:0, html:"<h2>HTTP</h2><p>Status, metodeâ€¦</p>",       lang:"en", duration:12 });
    await Quiz.create({ lessonId:l1.id, items:[{id:"q1",type:"single",stem:"`let` este re-asignabil?",options:["da","nu"],correct:[0],feedback:["Corect","Nu"]}] });
  }
}
await seed();

// ROUTES
app.get("/api/health", (_req,res)=> res.json({ status:"ok", ts: Date.now() }));

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

app.get("/api/lessons/:id/quiz", async (req,res)=>{
  const q = await Quiz.findOne({ where:{ lessonId: req.params.id }});
  if(!q) return res.status(404).json({ error:{ code:"NOT_FOUND" } });
  res.json(q.toJSON());
});

app.listen(PORT, ()=> console.log(`[API] http://localhost:${PORT}`));
