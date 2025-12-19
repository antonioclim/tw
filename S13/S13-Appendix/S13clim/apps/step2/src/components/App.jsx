import BookList from './BookList';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Seminarul 13 — Componente externe în React</h2>
      <h3 style={{ marginTop: 0 }}>Pasul 2: Filtrare pe coloană şi paginare (PrimeReact DataTable + Redux)</h3>
      <p style={{ maxWidth: 900, lineHeight: 1.5 }}>
        Acest mini-proiect operaţionalizează două idei esenţiale pentru interfeţe orientate pe date: (i) filtrarea
        explicită, declanşată controlat (prin &ldquo;Aplică&rdquo; / &ldquo;Şterge&rdquo;), şi (ii) paginarea controlată prin parametri
        (indicele primului rând şi numărul de rânduri per pagină). În consecinţă, clientul nu presupune că posedă
        întregul set de date, ci negociază cu serverul fereastra curentă de observaţie.
      </p>
      <BookList />
    </div>
  );
}

export default App;
