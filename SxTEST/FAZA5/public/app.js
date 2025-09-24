// FAZA5 Admin Lite CRUD — UI minimal care lovește /api/lessons
const $ = (s)=>document.querySelector(s);
const api = {
  list: async()=> fetch('/api/lessons').then(r=>r.json()),
  create: async(body)=> fetch('/api/lessons',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(r=>r.json()),
  update: async(id,body)=> fetch('/api/lessons/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(r=>r.json()),
  remove: async(id)=> fetch('/api/lessons/'+id,{method:'DELETE'}).then(r=>r.json())
};

let data = [];
async function reload(){
  $('#status').textContent = 'Se încarcă...';
  try{
    data = await api.list();
    renderTable();
    $('#out').textContent = JSON.stringify(data, null, 2);
    $('#status').textContent = 'OK';
  }catch(e){
    $('#status').textContent = 'Eroare la listare';
  }
}

function renderTable(){
  $('#tbl tbody').innerHTML = (data||[]).map(l => `<tr>
    <td>${l.id}</td><td>${l.courseId}</td><td>${l.title}</td><td>${l.lang}</td><td>${l.duration}</td>
    <td class="actions">
      <a href="#" data-act="edit" data-id="${l.id}">edit</a>
      <a href="#" data-act="del" data-id="${l.id}">delete</a>
    </td>
  </tr>`).join('') || '<tr><td colspan="6"><em>nimic</em></td></tr>';
}

function resetForm(){
  $('#f-id').value = '';
  $('#f-course').value = '';
  $('#f-title').value = '';
  $('#f-lang').value = 'ro';
  $('#f-duration').value = '';
}

$('#btnLoad').addEventListener('click', reload);
$('#btnNew').addEventListener('click', ()=>{ resetForm(); $('#f-course').focus(); });

// Submit create/update
$('#frm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = $('#f-id').value.trim();
  const payload = {
    courseId: Number($('#f-course').value),
    title: $('#f-title').value.trim(),
    lang: $('#f-lang').value,
    duration: Number($('#f-duration').value)
  };
  $('#status').textContent = 'Se salvează...';
  try{
    let res;
    if(id){
      res = await api.update(Number(id), payload);
    } else {
      res = await api.create(payload);
      if(res && res.id) $('#f-id').value = res.id;
    }
    $('#out').textContent = JSON.stringify(res, null, 2);
    await reload();
  }catch(err){
    $('#status').textContent = 'Eroare la salvare';
  }
});

// Reset
$('#btnReset').addEventListener('click', resetForm);

// Edit/Delete handlers
$('#tbl').addEventListener('click', async (e)=>{
  const a = e.target.closest('a[data-act]'); if(!a) return;
  e.preventDefault();
  const id = Number(a.dataset.id);
  if(a.dataset.act === 'edit'){
    const row = data.find(x=>x.id===id);
    if(!row) return;
    $('#f-id').value = row.id;
    $('#f-course').value = row.courseId;
    $('#f-title').value = row.title;
    $('#f-lang').value = row.lang;
    $('#f-duration').value = row.duration;
    $('#f-title').focus();
  }
  if(a.dataset.act === 'del'){
    if(!confirm('Ștergi lecția #' + id + '?')) return;
    $('#status').textContent = 'Se șterge...';
    try{
      const res = await api.remove(id);
      $('#out').textContent = JSON.stringify(res, null, 2);
      await reload();
    }catch(err){
      $('#status').textContent = 'Eroare la ștergere';
    }
  }
});

// Auto-load la deschidere
reload().catch(console.error);
