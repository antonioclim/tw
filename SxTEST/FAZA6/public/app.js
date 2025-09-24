const $ = (s)=>document.querySelector(s);
const setStatus = (m, warn=false)=> { const el=$('#status'); if(el){ el.textContent=m; el.style.color = warn? '#f7768e':'#a3c5ff'; } };
const api = async (path, opts)=> { const r=await fetch(path, opts); const t=await r.text(); try{ return { ok:r.ok, json:JSON.parse(t) } } catch { return { ok:r.ok, text:t } } };

async function loadCourses(){
  setStatus('Se încarcă /api/courses...');
  const res = await api('/api/courses');
  if(!res.ok){ setStatus('Eroare /api/courses', true); return; }
  renderCourses(res.json); setStatus('OK');
  const json=$('#json'); if(json) json.textContent = JSON.stringify(res.json, null, 2);
}
function renderCourses(list){
  const q = $('#q')?.value.trim().toLowerCase() || '';
  const lang = $('#lang')?.value || '';
  const filtered = (list||[]).filter(c => (!q || c.title.toLowerCase().includes(q)) && (!lang || c.lang===lang));
  const tb = $('#tbl tbody'); if(!tb) return;
  tb.innerHTML = filtered.map(c => `<tr>
    <td>${c.id}</td><td>${c.title}</td><td>${c.lang}</td><td>${c.summary||''}</td>
    <td><a href="#" class="less" data-id="${c.id}">lecții »</a></td>
  </tr>`).join('');
}

async function createCourse(){
  const title=$('#fTitle')?.value||''; const lang=$('#fLang')?.value||'ro'; const summary=$('#fSummary')?.value||'';
  if(!title){ setStatus('Title obligatoriu', true); return; }
  const res = await api('/api/courses', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({title,lang,summary}) });
  if(!res.ok){ setStatus('Eroare creare curs', true); return; }
  setStatus('Curs creat'); loadCourses();
}

async function loadLessons(){
  const id = Number($('#cid')?.value||0); if(!id){ setStatus('ID invalid', true); return; }
  const res = await api(`/api/courses/${id}/lessons`);
  if(!res.ok){ setStatus('Eroare la /lessons', true); return; }
  const ltb = $('#ltbl tbody'); if(ltb) ltb.innerHTML = res.json.map(l=> `<tr>
    <td>${l.id}</td><td>${l.order??''}</td><td>${l.title}</td><td>${l.lang}</td><td>${l.duration}</td><td>${l.slug||''}</td>
  </tr>`).join('');
  const lj = $('#ljson'); if(lj) lj.textContent = JSON.stringify(res.json, null, 2);
}

async function loadBySlug(){
  const slug = $('#slug')?.value.trim(); if(!slug){ setStatus('Slug lipsă', true); return; }
  const res = await api(`/api/lessons/${encodeURIComponent(slug)}`);
  if(!res.ok){ setStatus('Eroare la /lessons/:slug', true); return; }
  const pv = $('#preview'); if(pv){ pv.innerHTML = res.json.html || '(fără HTML)'; }
  const sj = $('#sjson'); if(sj) sj.textContent = JSON.stringify(res.json, null, 2);
}

// Wiring (cu gărzi)
$('#load')?.addEventListener('click', loadCourses);
$('#q')?.addEventListener('input', loadCourses);
$('#lang')?.addEventListener('change', loadCourses);
$('#newCourse')?.addEventListener('click', ()=>{ const d=document.querySelector('.form'); if(d) d.open = true; });
$('#create')?.addEventListener('click', createCourse);
$('#loadLessons')?.addEventListener('click', loadLessons);
$('#loadBySlug')?.addEventListener('click', loadBySlug);
$('#tbl')?.addEventListener('click', (e)=>{ const a=e.target.closest('a.less'); if(!a)return; e.preventDefault(); const id=a.getAttribute('data-id'); if(id){ $('#cid').value=id; loadLessons(); } });

// Auto-load
loadCourses().catch(()=> setStatus('Nu se poate încărca /api/courses', true));
