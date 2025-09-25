import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3012;

app.use(express.static(path.join(__dirname, "..", "public")));
app.get("/", (_req,res)=> res.sendFile(path.join(__dirname, "..", "public", "index.html")));

app.listen(PORT, ()=> console.log(`[FAZA12] pe http://localhost:${PORT}`));
export default app;