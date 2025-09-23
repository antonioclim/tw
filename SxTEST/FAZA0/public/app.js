// Faza 0 — verificări în Consola Web + test fetch('/ping')
// Deschide consola: Ctrl+Shift+K (Firefox). Ar trebui să vezi mesajele de mai jos.

console.log('[Faza 0] JS încărcat — DOM disponibil?', !!document.body);

const btn = document.getElementById('btnPing');
const out = document.getElementById('outPing');

btn?.addEventListener('click', async () => {
  out.textContent = 'Trimit cerere către /ping...';
  try {
    const res = await fetch('/ping', { method: 'GET' });
    const txt = await res.text();
    out.textContent = `Răspuns: ${txt} (HTTP ${res.status})`;
  } catch (err) {
    console.error(err);
    out.textContent = 'Eroare: nu s-a putut contacta /ping';
  }
});
