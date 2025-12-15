const META = {
  step1: {
    short: 'React Router (rute, navigare, 404, parametri, /about)',
    details: 'step1.html'
  },
  step2: {
    short: 'useReducer (stare mai complexă, istoric, reset)',
    details: 'step2.html'
  },
  step3: {
    short: 'Redux (store, actions, reducers) + delete note (local)',
    details: 'step3.html'
  },
  step4: {
    short: 'Redux async (redux-promise-middleware) + delete note (request)',
    details: 'step4.html'
  },
  tool: {
    short: 'API Playground (mini-Postman) pentru /health şi /notes (GET/POST/DELETE)',
    details: 'tool_postman_lite.html'
  },
  api: {
    short: 'Server local (Express) pentru Step 4: GET/POST/PUT/DELETE /notes',
    details: 'api.html'
  }
};

async function api(method, url) {
  const res = await fetch(url, { method });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}`);
  }
  return data;
}

function badge(status) {
  const span = document.createElement('span');
  span.className = 'badge ' + (status ? 'running' : 'stopped');
  span.textContent = status ? 'RUNNING' : 'STOPPED';
  return span;
}

function card(id, info) {
  const div = document.createElement('div');
  div.className = 'card';
  const h2 = document.createElement('h2');
  h2.textContent = info.label || id;

  const p = document.createElement('p');
  p.textContent = META[id]?.short || '';

  const row = document.createElement('div');
  row.className = 'row';

  const badgeEl = badge(Boolean(info.running));
  badgeEl.id = `badge-${id}`;

  const port = document.createElement('span');
  port.className = 'badge';
  port.textContent = `port ${info.port}`;

  const btnStart = document.createElement('button');
  btnStart.className = 'primary';
  btnStart.textContent = 'Start';
  btnStart.onclick = async () => {
    btnStart.disabled = true;
    try {
      await api('POST', `/api/start/${id}`);
    } catch (e) {
      alert(e);
    } finally {
      btnStart.disabled = false;
      await refresh();
    }
  };

  const btnStop = document.createElement('button');
  btnStop.className = 'danger';
  btnStop.textContent = 'Stop';
  btnStop.onclick = async () => {
    btnStop.disabled = true;
    try {
      await api('POST', `/api/stop/${id}`);
    } catch (e) {
      alert(e);
    } finally {
      btnStop.disabled = false;
      await refresh();
    }
  };

  const btnOpen = document.createElement('button');
  btnOpen.textContent = 'Open';
  btnOpen.onclick = () => {
    // For the API card, open a small docs page (root). It links to /health and /notes.
    // On Windows + Firefox, `localhost` may resolve to IPv6 first. The notes API is safest on 127.0.0.1.
    const host = id === 'api' ? '127.0.0.1' : 'localhost';
    const url = `http://${host}:${info.port}`;
    window.open(url, '_blank');
  };

  const btnDetails = document.createElement('button');
  btnDetails.textContent = 'Detalii';
  btnDetails.onclick = () => window.location.href = META[id]?.details || 'index.html';

  row.appendChild(badgeEl);
  row.appendChild(port);
  row.appendChild(btnStart);
  row.appendChild(btnStop);
  row.appendChild(btnOpen);
  row.appendChild(btnDetails);

  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(row);

  return div;
}

async function refresh() {
  const status = await api('GET', '/api/status');

  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (const id of ['step1','step2','step3','step4','tool','api']) {
    grid.appendChild(card(id, status[id]));
  }
}

refresh();
setInterval(refresh, 2500);
