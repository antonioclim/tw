import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';

function classifyStatus(ok, checked) {
  if (!checked) return { severity: 'secondary', label: 'nevalidat' };
  return ok ? { severity: 'success', label: 'activ' } : { severity: 'danger', label: 'inaccesibil' };
}

export default function StepCard({
  step,
  titlu,
  rezumat,
  aplicatieUrl,
  apiUrl,
  rutaExplicatii,
  srtUrl
}) {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [apiOk, setApiOk] = useState(false);

  const status = useMemo(() => classifyStatus(apiOk, checked), [apiOk, checked]);

  useEffect(() => {
    let alive = true;

    async function ping() {
      try {
        const r = await fetch(apiUrl, { method: 'GET' });
        if (!alive) return;
        setApiOk(Boolean(r.ok));
      } catch (e) {
        if (!alive) return;
        setApiOk(false);
      } finally {
        if (!alive) return;
        setChecked(true);
      }
    }

    ping();
    return () => { alive = false; };
  }, [apiUrl]);

  const header = (
    <div className="flex align-items-center justify-content-between gap-2">
      <div className="flex align-items-center gap-2">
        <span className="p-tag p-tag-rounded">Pasul {step}</span>
        <span style={{ fontWeight: 700 }}>{titlu}</span>
      </div>
      <div className="flex align-items-center gap-2">
        <span className="s13-muted" style={{ fontSize: '.92rem' }}>API</span>
        <Tag severity={status.severity} value={status.label} />
      </div>
    </div>
  );

  return (
    <Card header={header} className="h-full">
      <p className="m-0" style={{ lineHeight: 1.55 }}>
        {rezumat}
      </p>

      <Divider />

      <div className="flex flex-column gap-2">
        <div className="flex flex-wrap gap-2">
          <Button
            icon="pi pi-book"
            label="Explicaţii detaliate"
            severity="secondary"
            onClick={() => navigate(rutaExplicatii)}
          />
          <Button
            icon="pi pi-external-link"
            label="Deschide aplicaţia pasului"
            onClick={() => window.open(aplicatieUrl, '_blank', 'noreferrer')}
          />
        </div>

        <div className="flex flex-wrap gap-2 align-items-center">
          <a href={srtUrl} target="_blank" rel="noreferrer" className="p-button p-button-text">
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Subtitrare (PDF)
          </a>

          <span className="s13-muted" style={{ fontSize: '.92rem' }}>
            {aplicatieUrl} · {apiUrl}
          </span>
        </div>
      </div>
    </Card>
  );
}
