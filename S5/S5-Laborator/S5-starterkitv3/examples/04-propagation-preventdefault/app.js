// app.js – demonstrarea propagării și a preventDefault
document.addEventListener('DOMContentLoaded', () => {
  const log = document.getElementById('log');
  const L = (msg) => { log.innerHTML += (msg + '<br>'); };

  document.getElementById('d1').addEventListener('click', () => L('click pe d1'));
  document.getElementById('d2').addEventListener('click', (e) => {
    L('click pe d2 (stopPropagation)');
    e.stopPropagation();
  });
  document.getElementById('d3').addEventListener('click', () => L('click pe d3'));

  document.getElementById('lnk').addEventListener('click', (e) => {
    e.preventDefault();
    L('preventDefault pe link – nu se navighează');
  });
});
