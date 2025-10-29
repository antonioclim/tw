// app.js – agendă: adăugare și ștergere elemente DOM
document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('name');
  const list = document.getElementById('list');
  const add = document.getElementById('add');

  add.addEventListener('click', () => {
    const v = name.value.trim();
    if (!v) return;
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = v;
    const rm = document.createElement('button');
    rm.className = 'remove';
    rm.textContent = 'Șterge';
    rm.addEventListener('click', () => li.remove());
    li.appendChild(span);
    li.appendChild(rm);
    list.appendChild(li);
    name.value = '';
    name.focus();
  });
});
