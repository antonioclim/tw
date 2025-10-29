// app.js – actualizare previzualizare la fiecare tastă (keyup)
document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('name');
  const pv = document.getElementById('pv');
  name.addEventListener('keyup', (e) => {
    const v = e.target.value;
    pv.innerHTML = v ? `Previzualizare: <strong>${v}</strong>` : 'Previzualizare: <em>(nimic încă)</em>';
  });
});
