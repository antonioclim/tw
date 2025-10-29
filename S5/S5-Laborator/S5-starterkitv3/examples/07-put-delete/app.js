// app.js – editare și ștergere pe /api/cats/:id
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('list');

  async function load() {
    const r = await fetch('/api/cats');
    const cats = r.ok ? await r.json() : [];
    list.innerHTML = '';
    cats.forEach(c => {
      const row = document.createElement('div');
      row.className = 'row';
      const id = document.createElement('div');
      id.textContent = `#${c.id}`;
      const input = document.createElement('input');
      input.value = c.name;
      const btnSave = document.createElement('button');
      btnSave.textContent = 'Actualizează';
      btnSave.addEventListener('click', async () => {
        const r = await fetch(`/api/cats/${c.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: input.value.trim() })
        });
        if (r.ok) await load();
      });
      const btnDelete = document.createElement('button');
      btnDelete.textContent = 'Șterge';
      btnDelete.addEventListener('click', async () => {
        const r = await fetch(`/api/cats/${c.id}`, { method: 'DELETE' });
        if (r.ok || r.status === 204) await load();
      });
      row.append(id, input, btnSave, btnDelete);
      list.appendChild(row);
    });
  }

  load();
});
