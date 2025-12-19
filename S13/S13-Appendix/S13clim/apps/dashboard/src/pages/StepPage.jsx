import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Message } from 'primereact/message';

const PORTS = {
  1: { app: 3001, api: 8081, srt: '/materiale/srt/S13pas1.pdf' },
  2: { app: 3002, api: 8082, srt: '/materiale/srt/S13pas2.pdf' },
  3: { app: 3003, api: 8083, srt: '/materiale/srt/S13pas3.pdf' },
  4: { app: 3004, api: 8084, srt: '/materiale/srt/S13pas4.pdf' }
};

const VIZUAL = {
  1: {
    png: '/materiale/infografice/S13pas1.png',
    html: '/materiale/interactiv/S13pas1.html',
    nota:
      'Infograficul foloseşte termenul „DataGrid” într-un sens generic (componentă de tabel). În codul acestui kit, componenta concretă este DataTable (PrimeReact).'
  },
  2: {
    png: '/materiale/infografice/S13pas2.png',
    html: '/materiale/interactiv/S13pas2.html',
    nota:
      'Materialul pune accent pe ideea de paginare/filtrare declarativă (prin proprietăţi), aplicabilă şi atunci când API-ul concret este PrimeReact DataTable.'
  },
  3: {
    png: '/materiale/infografice/S13pas3.png',
    html: '/materiale/interactiv/S13pas3.html',
    nota:
      'Accentul este pe distincţia critică dintre sortarea lexicală şi sortarea numerică; aceasta rămâne relevantă indiferent de biblioteca UI.'
  },
  4: {
    png: '/materiale/infografice/S13pas4.png',
    html: '/materiale/interactiv/S13pas4.html',
    nota:
      'Materialul explică traseul eveniment → stare → randare → grafic. În kit, biblioteca de vizualizare este react-google-charts; principiul rămâne neschimbat.'
  }
};

function k(text) {
  return <span className="s13-kbd">{text}</span>;
}

const CONTENT = {
  1: {
    titlu: 'Pasul 1 – DataTable: adăugare, editare, căutare explicită',
    intentie: [
      'Să identifici rolul unei componente externe (DataTable) ca infrastructură de interacţiune cu datele.',
      'Să construieşti un flux CRUD minimal (Create/Update + Read) mediat de Dialog.',
      'Să distingi între „căutare reactivă” şi „căutare explicită” (declanşată prin buton), ca decizie de control.'
    ],
    ceScriem: [
      'Un component BookList care compune: DataTable + Column + Dialog + InputText + Button.',
      'Acţiuni Redux pentru GET/POST/PUT; reducer care exprimă explicit stările operaţionale: pending/fulfilled/rejected.',
      'Un server Express minimal (in-memory) care expune /books şi susţine persistenţa pe durata sesiunii.'
    ],
    ceFace: [
      'DataTable afişează lista de cărţi; Dialog-ul devine instrumentul de editare controlată a unei singure înregistrări la un moment dat.',
      'Căutarea prin buton operează ca „filtru aplicat” (state separată pentru termenul introdus vs. filtrul efectiv), evitând reîncărcări speculative.',
      'Fluxul Redux face vizibilă tranziţia dintre stări: cerere iniţiată → rezultat → eventuală eroare.'
    ],
    ceExemplificam: [
      'De ce merită reutilizat Dialog-ul pentru Add/Edit: reduce redundanţa şi creşte coerenţa interfeţei.',
      'De ce separăm termenul introdus de filtrul aplicat: pentru a controla momentul în care interogăm/filtrăm şi pentru a evita „zgomotul” de UX.',
      'Cum se justifică integrarea unei biblioteci externe: economisim timp, câştigăm consistenţă vizuală şi obţinem funcţionalităţi standardizate.'
    ],
    repereCod: [
      { fisier: 'apps/step1/src/components/BookList.js', rol: 'UI: tabel, dialog, filtrare/căutare, validare minimală.' },
      { fisier: 'apps/step1/src/actions/index.js', rol: 'I/O: cereri HTTP şi orchestration Redux.' },
      { fisier: 'apps/step1/server/server.js', rol: 'API: GET/POST/PUT /books (memorie, suficient pentru laborator).' }
    ],
    exercitii: [
      'Introduceţi validare: titlul obligatoriu + minim 3 caractere; semnalizare prin Message.',
      'Schimbaţi căutarea: din CONTAINS în STARTS_WITH (şi discutaţi impactul asupra UX).',
      'Introduceţi un câmp „autor” şi extindeţi Dialog-ul fără a rupe logica existentă.'
    ]
  },

  2: {
    titlu: 'Pasul 2 – Filtrare şi paginare: control parametric al volumului de date',
    intentie: [
      'Să adaugi filtrare pe coloană ca mecanism de restrângere semantică.',
      'Să implementezi paginare controlată (rows/first) şi să înţelegi rolul parametrilor.',
      'Să menţii coerenţa dintre UI şi API (aceeaşi interogare → aceeaşi listă).'
    ],
    ceScriem: [
      'Stare locală pentru filtre şi paginare: filters, first, rows.',
      'DataTable configurat cu paginator şi rowsPerPageOptions.',
      'API /books care acceptă parametri (filtre/paginare) şi răspunde cu { count, records }.'
    ],
    ceFace: [
      'Filtrul pe coloană reduce setul de rezultate (subset) înainte de vizualizare.',
      'Paginarea produce o „fereastră” asupra datelor: nu procesăm/afişăm tot, ci doar cât este semnificativ per pagină.',
      'Parametrizarea rows controlează densitatea: câte rânduri trebuie să fie simultan vizibile pentru sarcina curentă.'
    ],
    ceExemplificam: [
      'De ce paginarea este un instrument cognitiv: limitează supraîncărcarea şi susţine explorarea incrementală.',
      'De ce serverul returnează count: pentru ca UI să poată calcula corect numărul de pagini.',
      'De ce păstrăm „ultima interogare”: operaţiile CRUD trebuie să reîmprospăteze exact contextul curent.'
    ],
    repereCod: [
      { fisier: 'apps/step2/src/components/BookList.js', rol: 'UI: filters + paginator + sincronizare cu getBooks(queryString).' },
      { fisier: 'apps/step2/src/actions/index.js', rol: 'Interogare parametrică + memorarea ultimei interogări.' },
      { fisier: 'apps/step2/server/index.js', rol: 'Filtrare + paginare; răspuns cu count/records.' }
    ],
    exercitii: [
      'Adăugaţi un filtru suplimentar pe „conţinut” şi observaţi interacţiunea cu titlul.',
      'Resetaţi automat first la 0 când se schimbă filtrul (evitaţi pagini goale).',
      'Implementaţi o opţiune rowsPerPageOptions extinsă (ex. 5/10/20/50) şi argumentaţi alegerea.'
    ]
  },

  3: {
    titlu: 'Pasul 3 – Sortare: ordine deterministă, inclusiv numerică pentru „număr de pagini”',
    intentie: [
      'Să adaugi sortarea pe coloane şi să menţii starea sortării.',
      'Să tratezi distinct sortarea numerică (pages) faţă de sortarea textuală.',
      'Să înţelegi de ce sortarea trebuie să rămână coerentă cu filtrarea şi paginarea.'
    ],
    ceScriem: [
      'Stare locală sortField/sortOrder şi handler onSort.',
      'API /books care acceptă sortField/sortOrder şi ordonează determinist.',
      'Coloana „pages” definită explicit numeric (InputNumber în dialog, comparare numerică la sortare).'
    ],
    ceFace: [
      'Sortarea reorganizează rezultatele astfel încât utilizatorul să observe rapid extreme, tendinţe, anomalii.',
      'Pentru pages, compararea trebuie să fie numerică; altfel, 100 poate apărea înaintea lui 20 (artefact lexical).',
      'În regim server-side, sortarea este o parte a interogării: parametrii devin contract.'
    ],
    ceExemplificam: [
      'De ce ordinea este un instrument epistemic: aceeaşi listă, altă ordine → altă interpretare.',
      'De ce tipurile contează: o coloană numerică tratată ca text produce concluzii eronate.',
      'De ce resetăm paginarea la sortare: semnificaţia paginii depinde de ordine.'
    ],
    repereCod: [
      { fisier: 'apps/step3/src/components/BookList.js', rol: 'UI: onSort + paginare + filtre + dialog cu InputNumber.' },
      { fisier: 'apps/step3/server/index.js', rol: 'Sortare (inclusiv numerică) + paginare + filtrare.' }
    ],
    exercitii: [
      'Introduceţi sortare „naturală” pentru titlu (ex. Titlu 2 după Titlu 10) şi discutaţi costul implementării.',
      'Adăugaţi un câmp „an publicare” şi implementaţi sortarea numerică şi acolo.',
      'Adăugaţi o opţiune „multisort” şi argumentaţi când este justificată.'
    ]
  },

  4: {
    titlu: 'Pasul 4 – Grafice: Pie Chart în dialog şi multiple vizualizări într-o fereastră modală',
    intentie: [
      'Să integrezi o bibliotecă de vizualizare (externă) în acelaşi flux UI/Redux.',
      'Să proiectezi un dialog ca spaţiu de sinteză, nu doar de editare.',
      'Să experimentezi cu mai multe codări vizuale pentru acelaşi fenomen (comparaţie critică).'
    ],
    ceScriem: [
      'Acţiune getStats() care apelează /books/stats şi aduce date agregate.',
      'Dialog de „Grafice” care conţine un Pie Chart (şi, opţional, alte grafice) – demonstrând integrarea.',
      'API /books/stats care produce statistici derivate (agregări) din setul curent de cărţi.'
    ],
    ceFace: [
      'Graficul nu înlocuieşte tabelul; îl completează: tabelul este granular, graficul este sintetic.',
      'Dialogul modal reduce riscul de „navigare pierdută”: utilizatorul rămâne în contextul tabelului.',
      'Mai multe grafice în acelaşi dialog permit triangulare: aceeaşi întrebare, răspunsuri vizuale diferite.'
    ],
    ceExemplificam: [
      'De ce vizualizarea este o formă de compresie informaţională: transformă liste în distribuţii.',
      'De ce agregarea trebuie să fie explicită: nu „ghicim” din UI, ci calculăm şi justificăm metrici.',
      'De ce alegem o bibliotecă: compatibilitate, licenţă, dimensiune, ergonomie de integrare.'
    ],
    repereCod: [
      { fisier: 'apps/step4/src/components/BookList.js', rol: 'UI: Dialog + Chart + declanşare getStats; integrare cu tabelul.' },
      { fisier: 'apps/step4/src/actions/index.js', rol: 'I/O: getStats + CRUD; menţinerea coerenţei cu interogarea curentă.' },
      { fisier: 'apps/step4/server/index.js', rol: 'API: /books/stats (agregări) + /books (CRUD/filtrare/paginare/sortare).' }
    ],
    exercitii: [
      'Adăugaţi un al doilea grafic (BarChart) şi discutaţi când este preferabil faţă de Pie.',
      'Calculaţi statistici robuste (mediană, quartile) pentru pages şi afişaţi-le în dialog.',
      'Exploraţi alternativa Chart.js (react-chartjs-2) şi argumentaţi diferenţele faţă de abordarea actuală.'
    ]
  }
};

const BIB = [
  {
    apa: 'Cleveland, W. S., & McGill, R. (1984). Graphical perception: Theory, experimentation, and application to the development of graphical methods. Journal of the American Statistical Association, 79(387), 531–554.',
    doi: 'https://doi.org/10.1080/01621459.1984.10478080'
  },
  {
    apa: 'Hanani, U., Shapira, B., & Shoval, P. (2001). Information filtering: Overview of issues, research and systems. User Modeling and User-Adapted Interaction, 11(3), 203–259.',
    doi: 'https://doi.org/10.1023/A:1011196000674'
  },
  {
    apa: 'Shneiderman, B. (1996). The eyes have it: A task by data type taxonomy for information visualizations. Proceedings of the IEEE Symposium on Visual Languages, 336–343.',
    doi: 'https://doi.org/10.1109/VL.1996.545307'
  }
];

export default function StepPage() {
  const { stepId } = useParams();
  const navigate = useNavigate();

  const step = Number(stepId);
  const meta = CONTENT[step];
  const ports = PORTS[step];
  const viz = VIZUAL[step];

  if (!meta || !ports) {
    return (
      <Card>
        <h3 className="mt-0">Pas inexistent</h3>
        <p className="m-0">Acest pas nu este definit în dashboard.</p>
        <Divider />
        <Button label="Înapoi la dashboard" icon="pi pi-home" onClick={() => navigate('/')} />
      </Card>
    );
  }

  const appUrl = `http://localhost:${ports.app}`;
  const apiUrl = `http://localhost:${ports.api}`;

  return (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-start justify-content-between flex-wrap gap-2">
        <div>
          <h2 className="m-0">{meta.titlu}</h2>
          <p className="s13-subtitle">
            Aplicaţia pasului rulează pe {k(appUrl)}, iar API-ul pe {k(apiUrl)}. Dacă rulezi întreaga suită, acestea sunt
            deja preconfigurate.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button icon="pi pi-arrow-left" label="Dashboard" severity="secondary" onClick={() => navigate('/')} />
          <Button icon="pi pi-external-link" label="Deschide aplicaţia" onClick={() => window.open(appUrl, '_blank', 'noreferrer')} />
          <a href={ports.srt} target="_blank" rel="noreferrer" className="p-button p-button-outlined">
            <span className="pi pi-file" style={{ marginRight: '.5rem' }} />
            Subtitrare (PDF)
          </a>
        </div>
      </div>

      <Message
        severity="warn"
        text={
          'Notă didactică: această explicaţie este deliberat „orientată pe mecanisme”. Ne interesează nu doar „ce funcţionează”, ci şi de ce funcţionează, ce presupune şi ce se poate strica.'
        }
      />

      {viz && (
        <Card>
          <h3 className="mt-0">Material vizual asociat pasului (infografic + pagină interactivă)</h3>
          <p className="m-0" style={{ lineHeight: 1.55 }}>
            Acest kit include, pentru fiecare pas, un <strong>infografic</strong> (PNG) şi o <strong>pagină HTML</strong>{' '}
            interactivă care sintetizează aceeaşi idee din unghiuri complementare: „ce activezi declarativ” vs. „ce logică{' '}
            ar trebui să scrii manual” şi „cum se propagă evenimentul până la randare”. Materialele nu dublează codul, ci{' '}
            îl <em>ancorează conceptual</em>.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-2">
            <a className="p-button p-button-outlined" href={viz.png} target="_blank" rel="noreferrer">
              <span className="pi pi-image" style={{ marginRight: '.5rem' }} />
              Deschide infograficul (PNG)
            </a>

            <a className="p-button p-button-outlined" href={viz.html} target="_blank" rel="noreferrer">
              <span className="pi pi-external-link" style={{ marginRight: '.5rem' }} />
              Deschide materialul interactiv (HTML)
            </a>
          </div>

          <p className="m-0 s13-muted" style={{ lineHeight: 1.55, marginTop: '.75rem' }}>
            {viz.nota}
          </p>

          <Divider />

          <div style={{ overflowX: 'auto' }}>
            <img
              src={viz.png}
              alt={`Infografic asociat pasului ${step}`}
              style={{ width: '100%', maxWidth: 1000, borderRadius: 10, border: '1px solid rgba(0,0,0,.08)' }}
            />
          </div>

          <details style={{ marginTop: '.75rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Previzualizare încorporată (HTML)</summary>
            <div style={{ marginTop: '.75rem' }}>
              <iframe
                title={`Material interactiv pasul ${step}`}
                src={viz.html}
                style={{ width: '100%', height: 720, border: '1px solid rgba(0,0,0,.12)', borderRadius: 10 }}
              />
              <p className="m-0 s13-muted" style={{ lineHeight: 1.55, marginTop: '.5rem' }}>
                Dacă pagina interactivă nu se stilizează corect, cauza tipică este lipsa accesului la resurse CDN (Tailwind/Chart.js). În acest caz, foloseşte infograficul PNG (local) ca suport didactic principal.
              </p>
            </div>
          </details>
        </Card>
      )}

      <Card>
        <h3 className="mt-0">Intenţii de învăţare (formulate operaţional)</h3>
        <ul>
          {meta.intentie.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </Card>

      <div className="grid">
        <div className="col-12 md:col-6">
          <Card>
            <h3 className="mt-0">Ce scriem</h3>
            <ul>
              {meta.ceScriem.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Card>
        </div>
        <div className="col-12 md:col-6">
          <Card>
            <h3 className="mt-0">Ce face în execuţie</h3>
            <ul>
              {meta.ceFace.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </Card>
        </div>
      </div>

      <Card>
        <h3 className="mt-0">Ce exemplificăm şi de ce</h3>
        <ul>
          {meta.ceExemplificam.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </Card>

      <Card>
        <h3 className="mt-0">Repere de cod (unde se află „miezul” logic)</h3>
        <div className="grid">
          {meta.repereCod.map((r, i) => (
            <div key={i} className="col-12 md:col-4">
              <Card className="h-full">
                <p className="m-0" style={{ fontWeight: 700 }}>{r.fisier}</p>
                <p className="m-0 s13-muted" style={{ lineHeight: 1.5, marginTop: '.35rem' }}>{r.rol}</p>
              </Card>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mt-0">Exerciţii scurte (pentru consolidare şi extensie)</h3>
        <ol>
          {meta.exercitii.map((x, i) => <li key={i}>{x}</li>)}
        </ol>
      </Card>

      <Card>
        <h3 className="mt-0">Bibliografie minimală (APA 7; DOI)</h3>
        <ol>
          {BIB.map((b, i) => (
            <li key={i} style={{ marginBottom: '.75rem' }}>
              <div>{b.apa}</div>
              <div className="s13-muted">{b.doi}</div>
            </li>
          ))}
        </ol>
        <Divider />
        <p className="m-0 s13-muted" style={{ lineHeight: 1.55 }}>
          Observaţie: bibliografia de mai sus susţine partea de vizualizare şi filtrare informaţională; documentaţia
          bibliotecilor UI (PrimeReact) rămâne sursa primară pentru API-ul concret al componentelor.
        </p>
      </Card>
    </div>
  );
}
