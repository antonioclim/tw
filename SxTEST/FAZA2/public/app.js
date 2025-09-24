const $ = (s)=>document.querySelector(s);
const listEl = $("#courses");
const lessonsEl = $("#lessons");
const qEl = $("#q");
const langEl = $("#lang");
const refreshEl = $("#refresh");

let rawCourses = [];
let selectedCourseId = null;
let debounceTimer;

function highlight(text, q){
  if(!q) return text;
  const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),'ig');
  return text.replace(rx, m=>`<mark>${m}</mark>`);
}

async function loadCourses(){
  const r = await fetch("/api/courses");
  rawCourses = await r.json();
  renderCourses();
}
async function loadLessons(courseId){
  const r = await fetch(`/api/courses/${courseId}/lessons`);
  const lessons = await r.json();
  lessonsEl.innerHTML = lessons.map(l=>`<li>${l.title} <small>(${l.lang}, ${l.duration}m)</small></li>`).join("");
}

function renderCourses(){
  const q = qEl.value.trim();
  const lang = langEl.value;
  const filtered = rawCourses.filter(c=>{
    const inLang = !lang || c.lang===lang;
    const hay = (c.title+' '+c.summary+' '+(c.tags||[]).join(' ')).toLowerCase();
    const okQ = !q || hay.includes(q.toLowerCase());
    return inLang && okQ;
  });
  listEl.innerHTML = filtered.map(c=>`<li>
    <a href="#" data-id="${c.id}" class="course">${highlight(c.title,q)}</a>
    <small> [${c.lang}] tags: ${(c.tags||[]).join(', ')} — ${c.lessons} lecții</small>
  </li>`).join("");
}

listEl.addEventListener('click', (e)=>{
  const a = e.target.closest('a.course');
  if(!a) return;
  e.preventDefault();
  selectedCourseId = a.dataset.id;
  loadLessons(selectedCourseId);
});

qEl.addEventListener('input', ()=>{
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(renderCourses, 250);
});
langEl.addEventListener('change', renderCourses);
refreshEl.addEventListener('click', loadCourses);

loadCourses();
