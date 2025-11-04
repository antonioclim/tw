// server.js (CommonJS; no "type":"module" needed)
const express = require('express');
const path = require('path');
const fs = require('fs');

const app  = express();
const ROOT = __dirname;
const PORT = 8080;

// Discover step folders "NN-..." that have an index.html
function getSteps() {
  return fs.readdirSync(ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && /^\d{2}-/.test(d.name))
    .filter(d => fs.existsSync(path.join(ROOT, d.name, 'index.html')))
    .map(d => d.name)
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
}

app.get('/', (req, res) => {
  const steps = getSteps();
  const links = steps.map(name => (
    `<li><a href="/${encodeURIComponent(name)}/">${name}</a></li>`
  )).join('\n');

  res.send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>S6v7cssin5modifCSS — steps 00–15</title>
<style>
  :root { --c1:#0a66c2; --b:#f7f7f9; --bd:#e3e6eb; }
  body{font:16px/1.5 system-ui,Segoe UI,Arial,sans-serif; background:#fff; color:#222; margin:0;}
  header{padding:1.25rem 1rem; border-bottom:1px solid var(--bd); background:var(--b);}
  main{max-width:1000px;margin:1.5rem auto;padding:0 1rem;}
  h1{margin:.2rem 0 0;font-size:1.25rem}
  .muted{color:#666;font-size:.9rem}
  ul{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:.6rem}
  li a{display:block;padding:.7rem .9rem;border:1px solid var(--bd);border-radius:.45rem;text-decoration:none;color:#222;background:#fff}
  li a:hover{border-color:var(--c1); box-shadow:0 0 0 3px rgba(10,102,194,.12);}
  footer{max-width:1000px;margin:2rem auto;padding:0 1rem 2rem;color:#666;font-size:.85rem}
  code{background:#f0f3f7;border:1px solid #e1e5ea;border-radius:.25rem;padding:.05rem .3rem}
</style>
</head>
<body>
  <header>
    <div class="muted">Local index • http://localhost:${PORT}</div>
    <h1>S6v7cssin5modifCSS — Steps 00–15</h1>
  </header>
  <main>
    <p>Choose a step (each opens its own <code>index.html</code>):</p>
    <ul>${links}</ul>
  </main>
  <footer>Root: <code>${ROOT.replace(/\\\\/g,'/')}</code></footer>
</body>
</html>`);
});

// Serve the whole kit statically (folders keep their own index.html)
app.use(express.static(ROOT, { extensions: ['html'] }));

app.listen(PORT, () => {
  console.log(`Starter kit running at http://localhost:${PORT} (root=${ROOT})`);
});
