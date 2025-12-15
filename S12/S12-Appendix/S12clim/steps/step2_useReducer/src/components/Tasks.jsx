import { useMemo, useReducer } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  count: 0,
  history: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, 'increment']
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, 'decrement']
      };
    case 'reset':
      return { ...INITIAL_STATE, history: [...state.history, 'reset'] };
    default:
      return state;
  }
}

export default function Tasks() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const stateAsJson = useMemo(() => JSON.stringify(state, null, 2), [state]);

  return (
    <div className="container">
      <header className="header">
        <div>
          <h2 style={{ margin: 0 }}>Step 2 – useReducer</h2>
          <p className="muted" style={{ marginTop: 6 }}>
            Demonstrăm un <em>reducer</em> pur (fără side-effects), acţiuni explicite şi o stare mai complexă (count + history).
          </p>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <span className="sep">•</span>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <div className="grid">
        <section className="card">
          <h3 style={{ marginTop: 0 }}>UI (ce testăm la seminar)</h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
            <div className="pill">Count</div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>{state.count}</div>
          </div>

          <div className="actions">
            <button onClick={() => dispatch({ type: 'increment' })}>Increment (+1)</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement (-1)</button>
            <button className="danger" onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          </div>

          <h4 style={{ marginBottom: 8 }}>History (urmărim acţiunile)</h4>
          {state.history.length === 0 ? (
            <p className="muted">Nu există acţiuni încă. Apăsaţi unul dintre butoane.</p>
          ) : (
            <ol className="history">
              {state.history.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ol>
          )}
        </section>

        <section className="card">
          <h3 style={{ marginTop: 0 }}>Starea curentă (debug vizual)</h3>
          <pre className="code">{stateAsJson}</pre>

          <div className="callout">
            <strong>De reţinut:</strong>
            <ul style={{ marginTop: 8 }}>
              <li>Reducerul primeşte (state, action) şi returnează o stare nouă.</li>
              <li>Nu modificăm direct state; folosim obiecte/array-uri noi (immutability).</li>
              <li>Resetul revine la INITIAL_STATE (pattern util în formulare/wizards).</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
