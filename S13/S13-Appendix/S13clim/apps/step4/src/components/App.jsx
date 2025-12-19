import BookList from './BookList';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Seminarul 13 — Componente externe în React</h2>
      <h3 style={{ marginTop: 0 }}>
        Pasul 4: Grafice (Dialog modal + Pie Chart; integrare <em>react-google-charts</em>)
      </h3>

      <p style={{ maxWidth: 1040, lineHeight: 1.6 }}>
        În acest pas, tabela de date este extinsă dincolo de rolul ei strict tabular: ea devine sursa unei
        <strong>transformări vizuale</strong> a informaţiei. În termenii unei inginerii a interfeţelor orientate pe date,
        introducem o punte între <em>model</em> (înregistrări: titlu, conţinut, număr de pagini) şi <em>reprezentare</em>
        (diagrame care sintetizează distribuţii, ierarhii sau extreme).
      </p>

      <p style={{ maxWidth: 1040, lineHeight: 1.6 }}>
        Concret, utilizăm un <strong>Dialog</strong> (PrimeReact) drept „container epistemic” în care plasăm un
        <strong>Pie Chart</strong> şi, experimental, încă un grafic suplimentar. Această arhitectură este intenţionat
        modulară: datele sunt filtrate/paginate/sortate prin parametri expliciţi, iar vizualizările sunt alimentate
        printr-un endpoint dedicat de statistici, menţinând coerenţa între ceea ce se vede în tabel şi ceea ce se
        rezumă în diagramă.
      </p>

      <BookList />
    </div>
  );
}

export default App;
