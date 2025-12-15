import NoteList from './NoteList';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Step 3 – Redux (sync)</h1>
        <p className="muted">
          În acest pas construim structura clasică Redux: <strong>store</strong>,
          <strong> reducers</strong>, <strong>actions</strong> şi conectarea UI-ului
          prin <code>useSelector</code> / <code>useDispatch</code>.
        </p>
      </header>

      <section className="card">
        <h2>Ce demonstrăm</h2>
        <ul>
          <li>
            Stare globală în Redux (lista de notiţe) şi actualizări imutabile (prin reducer).
          </li>
          <li>
            Flux sincron: <code>dispatch(action)</code> → <code>reducer</code> → UI re-randat.
          </li>
          <li>
            Ştergere locală (fără server): <em>delete note (local)</em>.
          </li>
        </ul>
      </section>

      <NoteList />
    </div>
  );
}

export default App;
