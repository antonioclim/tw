import BookList from './BookList';

function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Seminarul 13 — Componente externe în React</h2>
      <h3 style={{ marginTop: 0 }}>Pasul 3: Sortare (PrimeReact DataTable + Redux)</h3>
      <p style={{ maxWidth: 980, lineHeight: 1.55 }}>
        În acest pas, tabela de date nu mai este doar o suprafaţă de afişare, ci devine un instrument de
        <em>ordonare controlată</em>. Sortarea este formulată explicit prin doi parametri: câmpul de sortare
        (<code>sortField</code>) şi direcţia (<code>sortOrder</code>). În regim <strong>lazy</strong>, aceste valori nu sunt
        cosmetice: ele descriu un contract între client şi server, astfel încât ordinea să fie aplicată corect
        asupra întregului set (nu doar asupra paginii curente).
      </p>
      <p style={{ maxWidth: 980, lineHeight: 1.55 }}>
        Extinderea critică introdusă aici este câmpul <strong>Număr de pagini</strong>, tratat ca mărime numerică.
        În absenţa unei interpretări numerice, sortarea ar degenera într-o ordonare lexicală (de tipul
        &ldquo;100&rdquo; &lt; &ldquo;20&rdquo;), adică o eroare metodologică vizibilă în interfeţe orientate pe date.
      </p>
      <BookList />
    </div>
  );
}

export default App;
