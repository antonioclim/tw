const $ = (s)=>document.querySelector(s);

async function api(url, options){
  const r = await fetch(url, options);
  const t = await r.text();
  let j = null; try{ j = JSON.parse(t); }catch{}
  return { ok:r.ok, status:r.status, text:t, json:j };
}

let courses = [];
async function loadCourses(){
  const r = await api('/api/courses');
  courses = Array.isArray(r.json) ? r.json : [];
  $('#outCourses').textContent = JSON.stringify(courses, null, 2);
  renderCourses();
}
function renderCourses(){
  const q = $('#q').value.trim().toLowerCase();
  const lang = $('#lang').value;
  const rows = courses
    .filter(c => (!q || c.title.toLowerCase().includes(q)) && (!lang || c.lang===lang))
    .map(c => `<tr>
      <td>${c.id}</td><td>${c.title}</td><td>${c.lang}</td><td>${c.summary}</td>
      <td><a href="#" class="btn-lessons" data-id="${c.id}">lecții »</a></td></tr>`).join('');
  $('#tblCourses tbody').innerHTML = rows || '<tr><td colspan="5"><em>nimic</em></td></tr>';
}
$('#btnCourses').addEventListener('click', loadCourses);
$('#q').addEventListener('input', ()=> setTimeout(renderCourses, 150));
$('#lang').addEventListener('change', renderCourses);
$('#tblCourses').addEventListener('click', (e)=>{
  const a = e.target.closest('.btn-lessons'); if(!a) return;
  e.preventDefault();
  $('#courseId').value = a.dataset.id;
  loadLessonsByCourse();
});

$('#btnNewCourse').addEventListener('click', ()=>{
  document.querySelector('details[open]')?.removeAttribute('open');
  document.querySelector('details').setAttribute('open','true');
  $('#c-title').focus();
});
$('#frmCourse').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const payload = { title: $('#c-title').value.trim(), lang: $('#c-lang').value, summary: $('#c-summary').value.trim() };
  $('#c-status').textContent = 'Se salvează...';
  const r = await api('/api/courses', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
  $('#c-status').textContent = r.ok ? 'Creat' : ('Eroare ('+r.status+')');
  await loadCourses();
});

async function loadLessonsByCourse(){
  const id = $('#courseId').value;
  if(!id){ $('#outLessons').textContent='Introduceți un ID de curs.'; return; }
  const r = await api(`/api/courses/${id}/lessons`);
  const arr = Array.isArray(r.json) ? r.json : [];
  $('#outLessons').textContent = JSON.stringify(arr, null, 2);
  $('#tblLessons tbody').innerHTML = arr.map(l => `<tr>
    <td>${l.id}</td><td>${l.order}</td><td>${l.title}</td><td>${l.lang}</td><td>${l.duration}</td><td>${l.slug}</td>
  </tr>`).join('') || '<tr><td colspan="6"><em>nimic</em></td></tr>';
}
$('#btnLessons').addEventListener('click', loadLessonsByCourse);

$('#btnLessonBySlug').addEventListener('click', async ()=>{
  const slug = $('#slug').value.trim();
  if(!slug){ $('#outLesson').textContent='Introduceți un slug.'; return;}
  const r = await api('/api/lessons/'+encodeURIComponent(slug));
  $('#outLesson').textContent = JSON.stringify(r.json ?? r.text, null, 2);
  $('#lessonHtml').innerHTML = (r.json && r.json.html) ? r.json.html : '<em>fără conținut</em>';
});

loadCourses().catch(console.error);
