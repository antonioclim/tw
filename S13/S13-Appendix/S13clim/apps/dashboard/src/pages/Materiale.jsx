import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';

export default function Materiale() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-start justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="m-0">Materiale – ghid şi subtitrări</h2>
          <p className="s13-subtitle">
            În această versiune a kit-ului păstrăm intenţionat doar artefactele didactice strict necesare: un document
            introductiv (Pasul 0), un ghid practic unitar pentru seminar şi subtitrări în format PDF, asociate fiecărui
            pas. Astfel, setul rămâne coerent, uşor de distribuit şi lipsit de duplicări care ar complica inutil
            instalarea şi auditarea.
          </p>
        </div>
        <Button icon="pi pi-arrow-left" label="Dashboard" severity="secondary" onClick={() => navigate('/')} />
      </div>

      <Card>
        <h3 className="mt-0">Materiale principale</h3>
        <p className="m-0" style={{ lineHeight: 1.55 }}>
          <strong>S13pas0.pdf</strong> fixează contextul seminarului şi stabileşte „contractul” de lucru (ce urmărim şi
          cum verificăm). <strong>Ghidul practic (DOCX)</strong> concentrează paşii operaţionali şi deciziile de
          implementare (Redux + PrimeReact), astfel încât să poţi reproduce laboratorul fără a depinde de un fir narativ
          exclusiv video.
        </p>

        <Divider />

        <div className="flex flex-wrap gap-2">
          <a className="p-button p-button-outlined" href="/materiale/S13pas0.pdf" target="_blank" rel="noreferrer">
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Deschide S13pas0.pdf
          </a>

          <a
            className="p-button p-button-outlined"
            href="/materiale/A (S13-seminar) – Ghid practic_ Redux și PrimeReact.docx"
            target="_blank"
            rel="noreferrer"
          >
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Deschide ghidul practic (DOCX)
          </a>
        </div>
      </Card>

      <Card>
        <h3 className="mt-0">Subtitrări (PDF) – paşii 1–4</h3>
        <p className="m-0" style={{ lineHeight: 1.55 }}>
          Subtitrările au fost consolidate în PDF-uri per pas, pentru citire rapidă şi referenţiere în fişe/teme. În
          predare, acestea funcţionează ca „index semantic”: poţi identifica imediat momentul introducerii unei
          funcţionalităţi (filtrare, paginare, sortare, grafice) şi poţi reproduce secvenţa în cod.
        </p>

        <Divider />

        <div className="flex flex-column gap-2">
          <a className="p-button p-button-text" href="/materiale/srt/S13pas1.pdf" target="_blank" rel="noreferrer">
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Pasul 1 – S13pas1.pdf
          </a>
          <a className="p-button p-button-text" href="/materiale/srt/S13pas2.pdf" target="_blank" rel="noreferrer">
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Pasul 2 – S13pas2.pdf
          </a>
          <a className="p-button p-button-text" href="/materiale/srt/S13pas3.pdf" target="_blank" rel="noreferrer">
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Pasul 3 – S13pas3.pdf
          </a>
          <a className="p-button p-button-text" href="/materiale/srt/S13pas4.pdf" target="_blank" rel="noreferrer">
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Pasul 4 – S13pas4.pdf
          </a>
        </div>
      </Card>

      <Card>
        <h3 className="mt-0">Infografice (PNG) şi materiale interactive (HTML)</h3>
        <p className="m-0" style={{ lineHeight: 1.55 }}>
          Pentru a sprijini învăţarea prin <em>vizualizare</em> şi pentru a reduce încărcarea cognitivă în timpul
          navigării prin cod, kitul include o serie de <strong>infografice</strong> (PNG, accesibile offline) şi pagini
          <strong>HTML interactive</strong> (care pot folosi resurse CDN pentru stilizare şi grafice). Aceste materiale
          sunt conceptuale: uneori folosesc termenul „DataGrid” ca etichetă generică pentru un tabel de date; în aplicaţii
          folosim concret <strong>PrimeReact DataTable</strong>.
        </p>

        <Divider />

        <div className="flex flex-column gap-2">
          <div className="flex flex-wrap gap-2 align-items-center">
            <span style={{ fontWeight: 700, minWidth: 120 }}>Introducere</span>
            <a className="p-button p-button-text" href="/materiale/infografice/S13intro.png" target="_blank" rel="noreferrer">
              <span className="pi pi-image" style={{ marginRight: '.5rem' }} />
              Infografic (PNG)
            </a>
            <a className="p-button p-button-text" href="/materiale/interactiv/S13intro.html" target="_blank" rel="noreferrer">
              <span className="pi pi-external-link" style={{ marginRight: '.5rem' }} />
              Interactiv (HTML)
            </a>
          </div>

          {[1, 2, 3, 4].map((pas) => (
            <div key={pas} className="flex flex-wrap gap-2 align-items-center">
              <span style={{ fontWeight: 700, minWidth: 120 }}>Pasul {pas}</span>
              <a
                className="p-button p-button-text"
                href={`/materiale/infografice/S13pas${pas}.png`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="pi pi-image" style={{ marginRight: '.5rem' }} />
                Infografic (PNG)
              </a>
              <a
                className="p-button p-button-text"
                href={`/materiale/interactiv/S13pas${pas}.html`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="pi pi-external-link" style={{ marginRight: '.5rem' }} />
                Interactiv (HTML)
              </a>
            </div>
          ))}
        </div>

        <Divider />

        <p className="m-0 s13-muted" style={{ lineHeight: 1.55 }}>
          Recomandare de utilizare: în timpul predării, proiectează infograficul (PNG) ca suport vizual stabil; foloseşte
          pagina HTML interactivă pentru demonstraţii punctuale (de exemplu, pentru a evidenţia diferenţa dintre sortarea
          lexicală şi cea numerică).
        </p>
      </Card>

      <Card>
        <h3 className="mt-0">Colecţie Postman (opţional)</h3>
        <p className="m-0" style={{ lineHeight: 1.55 }}>
          Dacă preferi un client extern, poţi importa această colecţie în Postman pentru a testa rapid rutele API (GET,
          POST, PUT, DELETE) şi pentru a reproduce aceeaşi secvenţă de interogări pe toate cele patru servere (8081–8084).
        </p>

        <Divider />

        <a
          className="p-button p-button-outlined"
          href="/materiale/postman/S13-seminar13.postman_collection.json"
          target="_blank"
          rel="noreferrer"
        >
          <span className="pi pi-download" style={{ marginRight: '.5rem' }} />
          Descarcă colecţia Postman (JSON)
        </a>
      </Card>

      <Card>
        <h3 className="mt-0">Notă operaţională (Windows 11)</h3>
        <p className="m-0 s13-muted" style={{ lineHeight: 1.55 }}>
          Dacă deschizi proiectul în <strong>Visual Studio Code</strong>, rulează comenzile în terminalul integrat
          (PowerShell sau cmd). Pentru o instalare standard în <span className="s13-kbd">Z:\tw\SxTEST\FAZA13\nextlab</span>,
          este suficient să dezarhivezi kitul în acel director şi să rulezi <span className="s13-kbd">npm install</span> urmat de{' '}
          <span className="s13-kbd">npm run start:all</span>.
        </p>
      </Card>
    </div>
  );
}
