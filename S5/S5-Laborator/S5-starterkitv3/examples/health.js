// health.js – inserează un banner în UI cu starea API (apelează /api/health)
(function () {
  function makeStyle() {
    if (document.getElementById('health-style')) return;
    var css = [
      '#health-banner{position:fixed;top:0;left:0;right:0;z-index:9999;display:flex;justify-content:center;font-family:Arial, sans-serif}',
      '#health-banner .pill{margin:.5rem auto;padding:.35rem .75rem;border-radius:999px;font-size:.9rem;box-shadow:0 1px 3px rgba(0,0,0,.1)}',
      '#health-banner .ok{background:#e6ffed;border:1px solid #b7ebc6;color:#2f855a}',
      '#health-banner .down{background:#ffe6e6;border:1px solid #ffb3b3;color:#9b2c2c}',
      'body{padding-top:2.2rem;}'
    ].join('\n');
    var style = document.createElement('style');
    style.id = 'health-style';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }

  function render(statusObj) {
    var banner = document.getElementById('health-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'health-banner';
      document.body.prepend(banner);
    }
    banner.innerHTML = '';
    var pill = document.createElement('div');
    pill.className = 'pill ' + (statusObj.ok ? 'ok' : 'down');
    pill.textContent = statusObj.text || (statusObj.ok ? 'API OK' : 'API indisponibil');
    banner.appendChild(pill);
  }

  function check() {
    var controller = new AbortController();
    var timer = setTimeout(function(){ controller.abort(); }, 3500);
    fetch('/api/health', { cache: 'no-store', signal: controller.signal })
      .then(function(r){
        clearTimeout(timer);
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data){
        var txt = 'API OK – v' + (data.version || '?') + ' – uptime ' + Math.floor((data.uptime||0)) + 's';
        render({ ok:true, text: txt });
      })
      .catch(function(){
        render({ ok:false, text: 'API indisponibil – verificați că serverul rulează pe :8080' });
      });
  }

  document.addEventListener('DOMContentLoaded', function(){
    try { makeStyle(); } catch(e) {}
    check();
  });
})();
