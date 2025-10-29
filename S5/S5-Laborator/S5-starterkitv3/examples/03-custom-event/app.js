// app.js – definirea și dispecerizarea unui eveniment personalizat
document.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('target');
  const trigger = document.getElementById('trigger');

  target.addEventListener('alarm', () => {
    target.classList.add('alarm');
    target.textContent = 'ALARMA a fost declanșată!';
    setTimeout(() => {
      target.classList.remove('alarm');
      target.textContent = 'Obiectiv';
    }, 1500);
  });

  trigger.addEventListener('click', () => {
    const ev = new Event('alarm');
    target.dispatchEvent(ev);
  });
});
