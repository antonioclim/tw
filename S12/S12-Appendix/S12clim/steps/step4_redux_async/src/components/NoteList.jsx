import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, getNotes } from '../actions/actions';

const notesSelector = (state) => state.list.notes;
const fetchingSelector = (state) => state.list.fetching;
const fetchedSelector = (state) => state.list.fetched;
const errorSelector = (state) => state.list.error;
const listSliceSelector = (state) => state.list;

// Keep the same base as in actions (override-able through VITE_API_BASE).
const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8080';

function normaliseError(err) {
  if (!err) return '';

  // redux-promise-middleware usually passes an Error, but we guard.
  if (typeof err === 'string') return err;

  if (err instanceof Error) return err.message;

  // Common shape: { message, response, ... }
  if (typeof err.message === 'string') return err.message;

  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function NoteList() {
  const dispatch = useDispatch();

  const notes = useSelector(notesSelector);
  const fetching = useSelector(fetchingSelector);
  const fetched = useSelector(fetchedSelector);
  const error = useSelector(errorSelector);
  const listSlice = useSelector(listSliceSelector);

  const errorText = useMemo(() => normaliseError(error), [error]);
  const sliceAsJson = useMemo(() => JSON.stringify(listSlice, null, 2), [listSlice]);

  useEffect(() => {
    // Load initial list (async action)
    dispatch(getNotes());
  }, [dispatch]);

  const handleReload = () => dispatch(getNotes());

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const statusLabel = fetching
    ? 'loading…'
    : fetched
      ? 'ready'
      : 'idle';

  return (
    <div className="grid">
      <section className="card">
        <h2>Notes (from API)</h2>
        <p className="muted">
          Status: <strong>{statusLabel}</strong> · API: <code>{API_BASE}</code>
        </p>

        <div className="actions">
          <button onClick={handleReload} disabled={fetching}>Reload</button>
          <a className="linkButton" href={`${API_BASE}/health`} target="_blank" rel="noreferrer">API /health</a>
          <a className="linkButton" href={`${API_BASE}/notes`} target="_blank" rel="noreferrer">API /notes</a>
        </div>

        {errorText ? (
          <div className="alert">
            <strong>Network / server error:</strong>
            <div className="code" style={{ marginTop: 8 }}>{errorText}</div>
            <p className="muted" style={{ marginTop: 8 }}>
              Dacă vezi o eroare de tip <em>Failed to fetch</em>, porneşte mai întâi „Notes API” din Dashboard.
            </p>
          </div>
        ) : null}

        <div className="stack">
          <h3 style={{ margin: '12px 0 8px' }}>List</h3>
          {notes.length === 0 ? (
            <p className="muted">Nu există note. (Sau serverul nu a returnat încă date.)</p>
          ) : (
            <ul className="list">
              {notes.map((n) => (
                <li key={n.id} className="listItem">
                  <div className="listMain">
                    <div><strong>#{n.id}</strong></div>
                    <div className="muted">{n.content}</div>
                  </div>
                  <button
                    className="danger"
                    onClick={() => handleDelete(n.id)}
                    disabled={fetching}
                    title="DELETE /notes/:id"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="card">
        <h2>Redux slice: <code>list</code></h2>
        <p className="muted">
          În acest pas, acţiunile sunt promisiuni, iar middleware-ul generează automat sufixele{' '}
          <code>_PENDING</code>, <code>_FULFILLED</code>, <code>_REJECTED</code>.
        </p>

        <div className="code">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{sliceAsJson}</pre>
        </div>

        <ul className="muted" style={{ marginTop: 12 }}>
          <li>
            Reducer: <code>src/reducers/list-reducer.js</code>
          </li>
          <li>
            Actions: <code>src/actions/actions.js</code>
          </li>
          <li>
            Store + middleware: <code>src/stores/store.js</code>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default NoteList;
