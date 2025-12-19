import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import { TabView, TabPanel } from 'primereact/tabview';

function prettyJson(x) {
  try {
    return JSON.stringify(typeof x === 'string' ? JSON.parse(x) : x, null, 2);
  } catch {
    return typeof x === 'string' ? x : JSON.stringify(x, null, 2);
  }
}

function safeParseJson(text) {
  if (!text || !text.trim()) return { ok: true, value: undefined };
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    return { ok: false, error: e };
  }
}

function buildCurl({ method, url, headers, body }) {
  const h = headers || {};
  const headerFlags = Object.entries(h)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '')
    .map(([k, v]) => `-H "${k}: ${String(v).replace(/"/g, '\\"')}"`)
    .join(' ');

  const hasBody = body !== undefined && body !== null && String(body).trim() !== '' && !['GET', 'HEAD'].includes(method);
  const bodyFlag = hasBody ? `-d '${String(body).replace(/'/g, "'\\''")}'` : '';
  return `curl -X ${method} ${headerFlags} ${bodyFlag} "${url}"`.replace(/\s+/g, ' ').trim();
}

function buildPowerShell({ method, url, headers, body }) {
  const h = headers || {};
  const hasBody = body !== undefined && body !== null && String(body).trim() !== '' && !['GET', 'HEAD'].includes(method);
  const headersLiteral = Object.keys(h).length
    ? `@{ ${Object.entries(h)
        .map(([k, v]) => `'${k}'='${String(v).replace(/'/g, "''")}'`)
        .join('; ')} }`
    : '$null';

  const bodyLiteral = hasBody ? `'${String(body).replace(/'/g, "''")}'` : '$null';
  return `Invoke-RestMethod -Method ${method} -Uri '${url}' -Headers ${headersLiteral}${hasBody ? ` -Body ${bodyLiteral} -ContentType 'application/json'` : ''}`;
}

const ENVIRONMENTS = [
  { label: 'Pasul 1 — API CRUD minimal (8081)', value: { step: 1, baseUrl: 'http://localhost:8081' } },
  { label: 'Pasul 2 — filtrare + paginare (8082)', value: { step: 2, baseUrl: 'http://localhost:8082' } },
  { label: 'Pasul 3 — + sortare (8083)', value: { step: 3, baseUrl: 'http://localhost:8083' } },
  { label: 'Pasul 4 — + statistici (8084)', value: { step: 4, baseUrl: 'http://localhost:8084' } }
];

const PRESETS = {
  1: [
    {
      name: 'Ping (GET /)',
      method: 'GET',
      path: '/',
      description: 'Verifică faptul că serverul de laborator răspunde (indicator operaţional).'
    },
    {
      name: 'Listă cărţi (GET /books)',
      method: 'GET',
      path: '/books',
      description: 'Returnează lista curentă (in-memory) de cărţi.'
    },
    {
      name: 'Adaugă carte (POST /books)',
      method: 'POST',
      path: '/books',
      body: { title: 'Carte demonstrativă', content: 'Conţinut demonstrativ (Pasul 1).' },
      description: 'Inserează o carte nouă şi întoarce elementul creat.'
    },
    {
      name: 'Actualizează carte (PUT /books/{id})',
      method: 'PUT',
      path: '/books/{id}',
      needsId: true,
      body: { title: 'Titlu actualizat', content: 'Conţinut actualizat.' },
      description: 'Actualizează cartea identificată prin id (în lipsa id-ului corect, răspunde 404).'
    }
  ],
  2: [
    {
      name: 'Ping (GET /)',
      method: 'GET',
      path: '/',
      description: 'Descrierea API-ului (endpointuri + parametri).'
    },
    {
      name: 'Listă (GET /books?first=0&rows=5)',
      method: 'GET',
      path: '/books?title=&content=&first=0&rows=5',
      description: 'Filtrare (contains) + paginare: returnează {count, records, first, rows}.'
    },
    {
      name: 'Adaugă (POST /books)',
      method: 'POST',
      path: '/books?first=0&rows=5',
      body: { title: 'Carte nouă (Pasul 2)', content: 'Text de laborator.' },
      description: 'Inserează şi întoarce fereastra paginată actualizată.'
    },
    {
      name: 'Actualizează (PUT /books/{id})',
      method: 'PUT',
      path: '/books/{id}?first=0&rows=5',
      needsId: true,
      body: { title: 'Titlu editat (Pasul 2)', content: 'Conţinut editat.' },
      description: 'Actualizează şi întoarce fereastra paginată actualizată.'
    },
    {
      name: 'Şterge (DELETE /books/{id})',
      method: 'DELETE',
      path: '/books/{id}?first=0&rows=5',
      needsId: true,
      description: 'Şterge o carte şi întoarce fereastra paginată actualizată.'
    }
  ],
  3: [
    {
      name: 'Ping (GET /)',
      method: 'GET',
      path: '/',
      description: 'Descrierea API-ului (filtrare + paginare + sortare).'
    },
    {
      name: 'Listă sortată (GET /books … sortField=pages)',
      method: 'GET',
      path: '/books?title=&content=&first=0&rows=5&sortField=pages&sortOrder=-1',
      description: 'Ordonare numerică pe pages (descrescător), cu tie-break deterministic.'
    },
    {
      name: 'Adaugă (POST /books)',
      method: 'POST',
      path: '/books?first=0&rows=5&sortField=title&sortOrder=1',
      body: { title: 'Carte nouă (Pasul 3)', content: 'Text de laborator.', pages: 321 },
      description: 'Inserează şi întoarce fereastra filtrată/sortată/paginată.'
    },
    {
      name: 'Actualizează (PUT /books/{id})',
      method: 'PUT',
      path: '/books/{id}?first=0&rows=5&sortField=title&sortOrder=1',
      needsId: true,
      body: { title: 'Titlu editat (Pasul 3)', content: 'Conţinut editat.', pages: 222 },
      description: 'Actualizează şi întoarce fereastra filtrată/sortată/paginată.'
    },
    {
      name: 'Şterge (DELETE /books/{id})',
      method: 'DELETE',
      path: '/books/{id}?first=0&rows=5&sortField=title&sortOrder=1',
      needsId: true,
      description: 'Şterge şi întoarce fereastra filtrată/sortată/paginată.'
    }
  ],
  4: [
    {
      name: 'Ping (GET /)',
      method: 'GET',
      path: '/',
      description: 'Descrierea API-ului (CRUD + stats pentru grafice).'
    },
    {
      name: 'Listă sortată (GET /books)',
      method: 'GET',
      path: '/books?title=&content=&first=0&rows=5&sortField=title&sortOrder=1',
      description: 'Returnează fereastra filtrată/sortată/paginată.'
    },
    {
      name: 'Statistici (GET /books/stats)',
      method: 'GET',
      path: '/books/stats?title=&content=',
      description: 'Returnează statistici agregate pentru vizualizări (pie, top etc.).'
    },
    {
      name: 'Adaugă (POST /books)',
      method: 'POST',
      path: '/books?first=0&rows=5&sortField=title&sortOrder=1',
      body: { title: 'Carte nouă (Pasul 4)', content: 'Text de laborator.', pages: 444 },
      description: 'Inserează şi întoarce fereastra filtrată/sortată/paginată.'
    },
    {
      name: 'Actualizează (PUT /books/{id})',
      method: 'PUT',
      path: '/books/{id}?first=0&rows=5&sortField=title&sortOrder=1',
      needsId: true,
      body: { title: 'Titlu editat (Pasul 4)', content: 'Conţinut editat.', pages: 333 },
      description: 'Actualizează şi întoarce fereastra filtrată/sortată/paginată.'
    },
    {
      name: 'Şterge (DELETE /books/{id})',
      method: 'DELETE',
      path: '/books/{id}?first=0&rows=5&sortField=title&sortOrder=1',
      needsId: true,
      description: 'Şterge şi întoarce fereastra filtrată/sortată/paginată.'
    }
  ]
};

export default function ApiTester() {
  const navigate = useNavigate();

  const [env, setEnv] = useState(ENVIRONMENTS[0].value);
  const [activeTab, setActiveTab] = useState(0);

  const [idValue, setIdValue] = useState('1');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState(`${ENVIRONMENTS[0].value.baseUrl}/`);
  const [headersText, setHeadersText] = useState(prettyJson({ Accept: 'application/json' }));
  const [bodyText, setBodyText] = useState(prettyJson({}));

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);

  const methods = useMemo(
    () => ['GET', 'POST', 'PUT', 'DELETE'].map((m) => ({ label: m, value: m })),
    []
  );

  const stepPresets = useMemo(() => PRESETS[env.step] ?? [], [env.step]);

  function applyPreset(preset) {
    const nextMethod = preset.method;
    setMethod(nextMethod);

    const id = String(idValue || '1').trim() || '1';
    const fullPath = (preset.path || '/').replace('{id}', id);
    setUrl(`${env.baseUrl}${fullPath}`);

    const h = { Accept: 'application/json' };
    if (['POST', 'PUT'].includes(nextMethod)) h['Content-Type'] = 'application/json';
    setHeadersText(prettyJson(h));

    if (preset.body !== undefined) {
      setBodyText(prettyJson(preset.body));
    } else {
      setBodyText(prettyJson({}));
    }

    setError('');
    setResponse(null);
  }

  async function send() {
    setSending(true);
    setError('');
    setResponse(null);

    // 1) headers
    const parsedHeaders = safeParseJson(headersText);
    if (!parsedHeaders.ok || (parsedHeaders.value && typeof parsedHeaders.value !== 'object')) {
      setSending(false);
      setError('Header-ele trebuie să fie un obiect JSON valid (ex.: {"Accept":"application/json"}).');
      return;
    }

    const headers = parsedHeaders.value || {};

    // 2) body (doar dacă metoda o cere)
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(method);
    let body = undefined;
    if (hasBody) {
      const parsedBody = safeParseJson(bodyText);
      if (!parsedBody.ok) {
        setSending(false);
        setError('Body-ul trebuie să fie JSON valid (sau gol).');
        return;
      }
      if (parsedBody.value !== undefined) {
        body = JSON.stringify(parsedBody.value);
      }
      // dacă utilizatorul a uitat Content-Type, îl completăm pragmatic
      if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
    }

    // 3) fetch
    const started = performance.now();
    try {
      const r = await fetch(url, {
        method,
        headers,
        body
      });

      const elapsedMs = Math.round((performance.now() - started) * 10) / 10;

      const text = await r.text();
      let json = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }

      const headersObj = {};
      r.headers.forEach((v, k) => {
        headersObj[k] = v;
      });

      setResponse({
        ok: r.ok,
        status: r.status,
        statusText: r.statusText,
        elapsedMs,
        headers: headersObj,
        text,
        json
      });
    } catch (e) {
      setError(`Eroare de reţea / CORS / server indisponibil: ${e?.message || String(e)}`);
    } finally {
      setSending(false);
    }
  }

  function onEnvChange(next) {
    setEnv(next);
    setActiveTab(next.step - 1);
    setUrl(`${next.baseUrl}/`);
    setResponse(null);
    setError('');
  }

  const canShowBody = ['POST', 'PUT', 'PATCH'].includes(method);

  const curl = useMemo(() => {
    const parsedHeaders = safeParseJson(headersText);
    const headers = parsedHeaders.ok && parsedHeaders.value && typeof parsedHeaders.value === 'object' ? parsedHeaders.value : {};
    const body = canShowBody ? bodyText : undefined;
    return buildCurl({ method, url, headers, body: body && body.trim() ? body : undefined });
  }, [method, url, headersText, bodyText, canShowBody]);

  const ps = useMemo(() => {
    const parsedHeaders = safeParseJson(headersText);
    const headers = parsedHeaders.ok && parsedHeaders.value && typeof parsedHeaders.value === 'object' ? parsedHeaders.value : {};
    const body = canShowBody ? bodyText : undefined;
    return buildPowerShell({ method, url, headers, body: body && body.trim() ? body : undefined });
  }, [method, url, headersText, bodyText, canShowBody]);

  return (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-start justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="m-0">Postman Lite – consolă REST încorporată</h2>
          <p className="s13-subtitle">
            Scopul acestei pagini este operaţional şi epistemic: îţi permite să verifici, direct şi controlat, semantica
            metodelor <span className="s13-kbd">GET</span>, <span className="s13-kbd">POST</span>, <span className="s13-kbd">PUT</span>,
            <span className="s13-kbd">DELETE</span> pentru API-urile paşilor 1–4, fără a depinde de UI-ul React.
          </p>
        </div>
        <Button icon="pi pi-arrow-left" label="Dashboard" severity="secondary" onClick={() => navigate('/')} />
      </div>

      <Message
        severity="info"
        text="Recomandare: porneşte mai întâi suita completă (npm run start:all). Dacă API-ul nu răspunde, verifică porturile 8081–8084."
      />

      <Card>
        <h3 className="mt-0">1) Alege contextul (pasul / serverul)</h3>
        <div className="flex flex-column gap-2">
          <div className="flex flex-wrap gap-2 align-items-center">
            <span style={{ fontWeight: 700 }}>Mediu API:</span>
            <Dropdown
              value={env}
              options={ENVIRONMENTS}
              optionLabel="label"
              onChange={(e) => onEnvChange(e.value)}
              style={{ minWidth: '28rem' }}
            />
            <span className="s13-muted">Bază: {env.baseUrl}</span>
          </div>

          <Divider />

          <h3 className="mt-0">2) Alege o cerere predefinită (colecţie didactică)</h3>
          <p className="m-0 s13-muted" style={{ lineHeight: 1.55 }}>
            Cererile sunt alese deliberat pentru a acoperi traseul de laborator: (a) „ping”, (b) listare, (c) inserare,
            (d) actualizare, (e) ştergere şi (f) statistici (Pasul 4). Pentru rutele cu <span className="s13-kbd">{`{id}`}</span>,
            completează câmpul de mai jos.
          </p>

          <div className="flex flex-wrap gap-2 align-items-center" style={{ marginTop: '.75rem' }}>
            <span style={{ fontWeight: 700 }}>id (pentru {`{id}`})</span>
            <InputText value={idValue} onChange={(e) => setIdValue(e.target.value)} style={{ width: '10rem' }} />
            <span className="s13-muted">(ex.: 1, 2, 3 …)</span>
          </div>

          <div style={{ marginTop: '.75rem' }}>
            <TabView activeIndex={activeTab} onTabChange={(e) => {
              setActiveTab(e.index);
              const nextEnv = ENVIRONMENTS[e.index]?.value;
              if (nextEnv) onEnvChange(nextEnv);
            }}>
              <TabPanel header="Pasul 1">
                <div className="flex flex-column gap-2">
                  {(PRESETS[1] || []).map((p) => (
                    <Button
                      key={p.name}
                      label={p.name}
                      icon="pi pi-angle-right"
                      severity="secondary"
                      onClick={() => applyPreset(p)}
                      className="justify-content-start"
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel header="Pasul 2">
                <div className="flex flex-column gap-2">
                  {(PRESETS[2] || []).map((p) => (
                    <Button
                      key={p.name}
                      label={p.name}
                      icon="pi pi-angle-right"
                      severity="secondary"
                      onClick={() => applyPreset(p)}
                      className="justify-content-start"
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel header="Pasul 3">
                <div className="flex flex-column gap-2">
                  {(PRESETS[3] || []).map((p) => (
                    <Button
                      key={p.name}
                      label={p.name}
                      icon="pi pi-angle-right"
                      severity="secondary"
                      onClick={() => applyPreset(p)}
                      className="justify-content-start"
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel header="Pasul 4">
                <div className="flex flex-column gap-2">
                  {(PRESETS[4] || []).map((p) => (
                    <Button
                      key={p.name}
                      label={p.name}
                      icon="pi pi-angle-right"
                      severity="secondary"
                      onClick={() => applyPreset(p)}
                      className="justify-content-start"
                    />
                  ))}
                </div>
              </TabPanel>
            </TabView>
          </div>

          <Divider />

          <h3 className="mt-0">3) Execută cererea (şi interpretează răspunsul)</h3>

          <div className="grid">
            <div className="col-12 lg:col-7">
              <div className="flex flex-column gap-2">
                <div className="flex flex-wrap gap-2 align-items-center">
                  <Dropdown value={method} options={methods} onChange={(e) => setMethod(e.value)} style={{ width: '8rem' }} />
                  <InputText value={url} onChange={(e) => setUrl(e.target.value)} style={{ flex: '1 1 auto', minWidth: '18rem' }} />
                  <Button icon="pi pi-send" label={sending ? 'Se trimite…' : 'Trimite'} disabled={sending} onClick={send} />
                </div>

                <div>
                  <span className="s13-muted" style={{ fontSize: '.95rem' }}>
                    Notă: pentru rutele cu {`{id}`} poţi fie să completezi câmpul „id” şi să reselectezi presetul, fie să
                    modifici manual URL-ul.
                  </span>
                </div>

                <Divider />

                <h4 className="mt-0">Headers (JSON)</h4>
                <InputTextarea
                  value={headersText}
                  onChange={(e) => setHeadersText(e.target.value)}
                  rows={6}
                  autoResize
                  style={{ width: '100%', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
                />

                <h4 className="mt-2">Body (JSON)</h4>
                <InputTextarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  rows={8}
                  autoResize
                  disabled={!canShowBody}
                  style={{ width: '100%', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
                />
                {!canShowBody && (
                  <span className="s13-muted" style={{ fontSize: '.9rem' }}>
                    Pentru metoda {method}, body-ul nu este utilizat.
                  </span>
                )}
              </div>
            </div>

            <div className="col-12 lg:col-5">
              <Card>
                <h4 className="mt-0">Răspuns</h4>
                {error ? <Message severity="error" text={error} /> : null}

                {response ? (
                  <div className="flex flex-column gap-2" style={{ marginTop: '.75rem' }}>
                    <div>
                      <strong>Status:</strong> {response.status} {response.statusText}{' '}
                      <span className="s13-muted">({response.elapsedMs} ms)</span>
                    </div>
                    <div>
                      <strong>OK:</strong> {String(response.ok)}
                    </div>

                    <Divider />

                    <h4 className="mt-0">Body</h4>
                    <pre className="s13-code" style={{ maxHeight: 360, overflow: 'auto' }}>
{response.json !== null ? prettyJson(response.json) : (response.text || '(gol)')}
                    </pre>

                    <h4 className="mt-2">Headers (răspuns)</h4>
                    <pre className="s13-code" style={{ maxHeight: 220, overflow: 'auto' }}>
{prettyJson(response.headers)}
                    </pre>
                  </div>
                ) : (
                  <p className="m-0 s13-muted" style={{ lineHeight: 1.55 }}>
                    Răspunsul va apărea aici. În practica laboratorului, acesta este punctul în care validezi ipoteze:
                    „serverul întoarce structura aşteptată?”, „paginarea furnizează count?”, „sortarea este numerică sau
                    lexicală?”, „DELETE actualizează fereastra?”.
                  </p>
                )}
              </Card>

              <Card style={{ marginTop: '1rem' }}>
                <h4 className="mt-0">Comenzi echivalente (pentru reproducibilitate)</h4>
                <p className="m-0 s13-muted" style={{ lineHeight: 1.55 }}>
                  Aceleaşi cereri pot fi rulate şi din linia de comandă; astfel obţii trasabilitate şi poţi depana fără UI.
                </p>

                <Divider />

                <h5 className="mt-0">cURL</h5>
                <pre className="s13-code" style={{ maxHeight: 140, overflow: 'auto' }}>{curl}</pre>

                <h5 className="mt-2">PowerShell</h5>
                <pre className="s13-code" style={{ maxHeight: 160, overflow: 'auto' }}>{ps}</pre>

                <Divider />

                <a className="p-button p-button-text" href="/materiale/postman/S13-seminar13.postman_collection.json" target="_blank" rel="noreferrer">
                  <span className="pi pi-download" style={{ marginRight: '.5rem' }} />
                  Descarcă şi colecţia Postman (JSON)
                </a>
              </Card>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
