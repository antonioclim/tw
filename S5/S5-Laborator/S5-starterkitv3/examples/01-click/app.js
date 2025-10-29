// app.js – atașarea unui handler pentru evenimentul "click"
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');
  const out = document.getElementById('out');

  btn.addEventListener('click', () => {
    const now = new Date().toLocaleTimeString();
    out.textContent = `Buton apăsat la ${now}. DOM a fost actualizat.`;
  });
});
