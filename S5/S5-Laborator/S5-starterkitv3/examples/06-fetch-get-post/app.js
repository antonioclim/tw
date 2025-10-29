// app.js – comunicare cu serverul Express (GET/POST pe /api/cats)
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('list');
  const reload = document.getElementById('reload');
  const name = document.getElementById('name');
  const add = document.getElementById('add');

  async function load() {
    list.innerHTML = '<em>Se încarcă...</em>';
    const r = await fetch('/api/cats');
    if (!r.ok) { list.textContent = 'Eroare la încărcare'; return; }
    const cats = await r.json();
    list.innerHTML = '';
    cats.forEach(c => {
      const div = document.createElement('div');
      div.className = 'card';
      div.textContent = `#${c.id} ${c.name}`;
      list.appendChild(div);
    });
  }

  async function addCat() {
    const v = name.value.trim();
    if (!v) return;
    const r = await fetch('/api/cats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: v })
    });
    if (r.ok) {
      name.value = '';
      await load();
    }
  }

  reload.addEventListener('click', load);
  add.addEventListener('click', addCat);
  load();
});
