import NoteList from './NoteList';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Step 4 – Redux (async)</h1>
        <p className="muted">
          În acest pas mutăm operaţia de ştergere (şi încărcarea iniţială) în zona asincronă: acţiunile returnează <em>Promise</em>, iar reducerul primeşte automat stări de tip <code>..._PENDING / ..._FULFILLED / ..._REJECTED</code>.
        </p>
      </header>

      <section className="card">
        <h2>Ce exemplificăm</h2>
        <ul>
          <li>
            API local (Express) pe portul <strong>8080</strong> – endpoint-uri GET/POST/PUT/DELETE pentru <code>/notes</code>.
          </li>
          <li>
            Redux + <code>redux-promise-middleware</code>: un flux standard pentru stările asincrone (pending/fulfilled/rejected).
          </li>
          <li>
            UI: încărcare listă, indicator de „loading”, erori de reţea şi ştergere prin request (DELETE).
          </li>
          <li>
            Validare rapidă: folosiţi butoanele <b>API /health</b> şi <b>API /notes</b> (din pagină) pentru a vedea răspunsurile JSON direct în browser.
          </li>
          <li>
            Observaţi în DevTools → Network: la încărcare se face <code>GET /notes</code>, iar la Delete se face <code>DELETE /notes/:id</code>.
          </li>
        </ul>
      </section>

      <NoteList />

      <footer className="footer muted">
        Recomandare didactică: porniţi mai întâi „Notes API (port 8080)” din Dashboard, apoi Step 4. Dacă browserul nu se conectează la <code>localhost:8080</code>, folosiţi <code>127.0.0.1:8080</code>.
      </footer>
    </div>
  );
}

export default App;
