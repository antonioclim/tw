import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Card } from 'primereact/card';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';

import StepCard from '../components/StepCard';

const steps = [
  {
    step: 1,
    titlu: 'DataTable: adăugare, editare, căutare explicită',
    rezumat:
      'Construim un tabel de date (componentă externă) ca instrument de administrare a entităţilor „carte”: afişare, adăugare, editare; apoi introducem căutarea declanşată prin buton, ca decizie deliberată de control asupra interogării.',
    aplicatieUrl: 'http://localhost:3001',
    apiUrl: 'http://localhost:8081',
    rutaExplicatii: '/pas/1',
    srtUrl: '/materiale/srt/S13pas1.pdf'
  },
  {
    step: 2,
    titlu: 'Filtrare pe coloană şi paginare parametrică',
    rezumat:
      'Introducem filtrarea pe coloană (ca restrângere semantică locală) şi paginarea (ca fereastră cognitivă/tehnică asupra datelor), controlată prin parametri de tip „rows per page”.',
    aplicatieUrl: 'http://localhost:3002',
    apiUrl: 'http://localhost:8082',
    rutaExplicatii: '/pas/2',
    srtUrl: '/materiale/srt/S13pas2.pdf'
  },
  {
    step: 3,
    titlu: 'Sortare: ordonare deterministă, inclusiv numeric pe „pagini”',
    rezumat:
      'Adăugăm sortarea coloanelor şi o extindem coerent pentru câmpuri numerice (număr de pagini), evitând confuziile sortării lexicale. Obţinem astfel o ordine epistemică stabilă.',
    aplicatieUrl: 'http://localhost:3003',
    apiUrl: 'http://localhost:8083',
    rutaExplicatii: '/pas/3',
    srtUrl: '/materiale/srt/S13pas3.pdf'
  },
  {
    step: 4,
    titlu: 'Grafice: Pie Chart în Dialog şi fereastră modală cu mai multe vizualizări',
    rezumat:
      'Integram biblioteci de vizualizare pentru a produce o sinteză vizuală (Pie Chart) din aceleaşi date; apoi experimentăm cu mai multe grafice într-o singură fereastră modală, pentru a compara codări şi ipoteze.',
    aplicatieUrl: 'http://localhost:3004',
    apiUrl: 'http://localhost:8084',
    rutaExplicatii: '/pas/4',
    srtUrl: '/materiale/srt/S13pas4.pdf'
  }
];

export default function Home() {
  const navigate = useNavigate();

  function descarcaFisier(href) {
    const a = document.createElement('a');
    a.href = href;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const materialeModel = [
    {
      label: 'Ghid practic (DOCX)',
      icon: 'pi pi-file',
      command: () => descarcaFisier('/materiale/A (S13-seminar) – Ghid practic_ Redux și PrimeReact.docx')
    }
  ];

  return (
    <div className="flex flex-column gap-3">
      <div className="s13-hero">
        <h2 className="m-0">Dashboard – Seminar 13: Componente externe în React</h2>
        <p className="s13-subtitle">
          Acest dashboard este punctul de intrare pe <span className="s13-kbd">http://localhost:3000</span>. De aici
          deschizi aplicaţiile pentru fiecare pas (pe porturi dedicate) şi accesezi explicaţii detaliate, centrate pe:
          <em> ce scriem, ce produce în execuţie, ce exemplifică şi de ce</em>.
        </p>
      </div>

      <Message
        severity="info"
        text={
          'Recomandare pragmatică: rulează suitele în mod orchestrat (dashboard + paşi) pentru a evita coliziuni de port şi pentru a păstra un traseu didactic coerent.'
        }
      />

      <Card>
        <h3 className="mt-0">Rulare pe Windows 11 (VSC / PowerShell)</h3>
        <p className="m-0" style={{ lineHeight: 1.55 }}>
          În directorul de instalare (de exemplu <span className="s13-kbd">Z:\tw\SxTEST\FAZA13\nextlab</span>), execută:
        </p>

        <pre className="s13-code">
{`npm run setup
npm run start:all`}
        </pre>

        <div className="flex flex-wrap gap-2">
          <SplitButton
            icon="pi pi-folder-open"
            label="Materiale (PDF + DOCX)"
            severity="secondary"
            onClick={() => descarcaFisier('/materiale/S13pas0.pdf')}
            model={materialeModel}
          />
          <Button
            icon="pi pi-play"
            label="Deschide Pasul 1 (aplicaţie)"
            onClick={() => window.open('http://localhost:3001', '_blank', 'noreferrer')}
          />
        </div>

        <Divider />

        <p className="m-0 s13-muted" style={{ lineHeight: 1.55 }}>
          Dacă o aplicaţie de pas nu răspunde, cauza tipică este că nu rulează încă procesul aferent (client + server) sau
          portul este ocupat. În acest kit, fiecare pas are porturile lui predefinite.
        </p>
      </Card>

      <Card>
        <h3 className="mt-0">Introducere vizuală – fluxuri React/Redux şi rolul componentelor externe</h3>
        <p className="m-0" style={{ lineHeight: 1.55 }}>
          Înainte de a intra în paşi, merită să fixăm două idei „de cadru”: (1) cum circulă datele într-o aplicaţie React
          (eveniment → stare → randare) şi (2) cum structurează Redux schimbarea de stare (acţiune → reducer → store →
          re-randare). Infograficul şi pagina interactivă sunt suporturi conceptuale, independente de biblioteca UI aleasă.
        </p>

        <Divider />

        <div className="flex flex-wrap gap-2">
          <a
            className="p-button p-button-outlined"
            href="/materiale/infografice/S13intro.png"
            target="_blank"
            rel="noreferrer"
          >
            <span className="pi pi-image" style={{ marginRight: '.5rem' }} />
            Deschide infograficul (PNG)
          </a>
          <a
            className="p-button p-button-outlined"
            href="/materiale/interactiv/S13intro.html"
            target="_blank"
            rel="noreferrer"
          >
            <span className="pi pi-external-link" style={{ marginRight: '.5rem' }} />
            Deschide materialul interactiv (HTML)
          </a>
        </div>

        <details style={{ marginTop: '.75rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Previzualizare (PNG)</summary>
          <div style={{ marginTop: '.75rem', overflowX: 'auto' }}>
            <img
              src="/materiale/infografice/S13intro.png"
              alt="Infografic introductiv – fluxurile React/Redux"
              style={{ width: '100%', maxWidth: 1000, borderRadius: 10, border: '1px solid rgba(0,0,0,.08)' }}
            />
          </div>
        </details>
      </Card>

      <div className="grid">
        {steps.map((s) => (
          <div key={s.step} className="col-12 md:col-6">
            <StepCard {...s} />
          </div>
        ))}
      </div>
    </div>
  );
}
