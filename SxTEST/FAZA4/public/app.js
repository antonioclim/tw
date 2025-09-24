// FAZA4 — playground pentru API. Fără framework, doar fetch + accesibilitate de bază.
const $ = (s)=>document.querySelector(s);
const meta = (ms)=> ms.toFixed(0)+' ms';

async function call(url){
  const t0 = performance.now();
  const res = await fetch(url);
  const t1 = performance.now();
  const txt = await res.text();
  let json = null; try{ json = JSON.parse(txt); }catch{}
  return { status: res.status, ok: res.ok, ms: t1-t0, txt, json };
}

// 1) /api/health
$("#btnHealth").addEventListener("click", async ()=>{
  $("#outHealth").textContent = "se apelează...";
  try{
    const r = await call("/api/health");
    $("#outHealth").textContent = r.json ? JSON.stringify(r.json, null, 2) : r.txt;
    $("#metaHealth").innerHTML = `<li>Status: ${r.status}</li><li>Timp: ${meta(r.ms)}</li>`;
  }catch(e){
    $("#outHealth").textContent = "Eroare: " + e.message;
  }
});

// 2) /api/courses
let courses = [];
async function loadCourses(){
  const r = await call("/api/courses");
  courses = Array.isArray(r.json) ? r.json : [];
  $("#outCourses").textContent = JSON.stringify(courses, null, 2);
  renderCourses();
}
function renderCourses(){
  const q = $("#q").value.trim().toLowerCase();
  const lang = $("#lang").value;
  const filtered = courses.filter(c => {
    const hay = (c.title + " " + (c.tags||[]).join(" ")).toLowerCase();
    const okQ = !q || hay.includes(q);
    const okL = !lang || c.lang === lang;
    return okQ && okL;
  });
  const rows = filtered.map(c => `<tr>
    <td>${c.id}</td>
    <td>${c.title}</td>
    <td>${c.lang}</td>
    <td>${(c.tags||[]).join(", ")}</td>
    <td>${c.lessons}</td>
    <td><a class="btn" href="#" data-id="${c.id}">lecții »</a></td>
  </tr>`).join("");
  $("#tblCourses tbody").innerHTML = rows || '<tr><td colspan="6"><em>nimic</em></td></tr>';
}
$("#btnCourses").addEventListener("click", loadCourses);
$("#q").addEventListener("input", ()=> setTimeout(renderCourses, 150));
$("#lang").addEventListener("change", renderCourses);
$("#tblCourses").addEventListener("click", (e)=>{
  const a = e.target.closest("a[data-id]"); if(!a) return;
  e.preventDefault();
  $("#courseId").value = a.dataset.id;
  loadLessons();
});

// 3) /api/courses/:id/lessons
async function loadLessons(){
  const id = $("#courseId").value || "";
  $("#outLessons").textContent = "se apelează...";
  if(!id) { $("#outLessons").textContent = "Introduceți un ID de curs."; return; }
  try{
    const r = await call(`/api/courses/${id}/lessons`);
    const arr = Array.isArray(r.json) ? r.json : [];
    $("#outLessons").textContent = JSON.stringify(arr, null, 2);
    $("#tblLessons tbody").innerHTML = arr.map(l => `<tr>
      <td>${l.id}</td><td>${l.title}</td><td>${l.lang}</td><td>${l.duration}</td>
    </tr>`).join("") || '<tr><td colspan="4"><em>nimic</em></td></tr>';
  }catch(e){
    $("#outLessons").textContent = "Eroare: " + e.message;
  }
}
$("#btnLessons").addEventListener("click", loadLessons);

// auto-load courses on first paint
loadCourses().catch(console.error);
