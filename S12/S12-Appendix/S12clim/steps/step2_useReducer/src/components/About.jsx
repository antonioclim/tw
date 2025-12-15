import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container">
      <header className="header">
        <h1>Step 2 – useReducer</h1>
        <p className="muted">
          În acest pas trecem de la <code>useState</code> (stare simplă) la <code>useReducer</code> (logică de stare mai
          complexă): acţiuni, reducer pur şi reset.
        </p>
        <nav className="nav">
          <Link to="/">Home</Link>
          <span className="sep">|</span>
          <Link to="/tasks">/tasks</Link>
        </nav>
      </header>

      <section className="card">
        <h2>Ideea centrală</h2>
        <p>
          <strong>Reducerul</strong> este o funcţie pură: primeşte <em>starea curentă</em> şi o <em>acţiune</em> şi întoarce o
          <strong>stare nouă</strong>. În UI, declanşăm acţiuni cu <code>dispatch</code>, iar React re-randează componenta.
        </p>
      </section>

      <section className="card">
        <h2>Ce exemplificăm practic</h2>
        <ul>
          <li>Stare compusă: <code>{'{ count, history }'}</code>.</li>
          <li>Acţiuni: <code>increment</code>, <code>decrement</code>, <code>reset</code>.</li>
          <li>Imutabilitate: <code>history</code> se actualizează prin copiere (spread), nu prin mutare în loc.</li>
          <li>Un <em>pattern</em> uşor de migrat ulterior către Redux (store global + reduceri).</li>
        </ul>
      </section>

      <section className="card">
        <h2>Fişiere cheie</h2>
        <ul>
          <li>
            <code>src/components/Tasks.jsx</code> – reducer + UI + reset.
          </li>
          <li>
            <code>src/App.jsx</code> – rute (păstrate pentru continuitate cu Step 1).
          </li>
        </ul>
      </section>
    </div>
  );
}
