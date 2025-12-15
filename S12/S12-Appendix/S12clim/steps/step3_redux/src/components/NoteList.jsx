import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote } from '../actions/actions';

const notesSelector = (state) => state.list.notes;
const listSliceSelector = (state) => state.list;

function NoteList() {
  const [note, setNote] = useState('');

  const notes = useSelector(notesSelector);
  const listSlice = useSelector(listSliceSelector);
  const dispatch = useDispatch();

  const stateAsJson = useMemo(() => JSON.stringify(listSlice, null, 2), [listSlice]);

  const handleAdd = () => {
    const trimmed = note.trim();
    if (!trimmed) return;
    dispatch(addNote(trimmed));
    setNote('');
  };

  return (
    <div className="grid">
      <section className="card">
        <h2>UI (listă locală, fără server)</h2>
        <p className="muted">
          În acest pas, <strong>Redux</strong> gestionează starea globală.
          Nu folosim încă request-uri către server. Ştergerea unei note este un exemplu de acţiune sincronă.
        </p>

        <div className="row">
          <input
            value={note}
            placeholder="Scrie o notiţă..."
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
            }}
          />
          <button onClick={handleAdd} aria-label="Adaugă notiţă">
            Add
          </button>
        </div>

        <div className="badgeRow">
          <span className="badge">notes: {notes.length}</span>
          <span className="badge">pattern: reducer + actions + store</span>
        </div>

        <ul className="list">
          {notes.map((e) => (
            <li key={e.id} className="listItem">
              <div className="listItemMain">
                <strong>#{e.id}</strong>
                <span className="mono">{e.value}</span>
              </div>
              <button className="danger" onClick={() => dispatch(deleteNote(e.id))}>
                Delete
              </button>
            </li>
          ))}

          {notes.length === 0 && (
            <li className="muted">
              (Nu există note. Adaugă una pentru a vedea cum se actualizează store-ul.)
            </li>
          )}
        </ul>
      </section>

      <section className="card">
        <h2>Redux state (slice)</h2>
        <p className="muted">
          Aici afişăm <code>state.list</code> pentru a face vizibil efectul acţiunilor.
          În practică, acesta este „adevărul” aplicaţiei.
        </p>

        <pre className="code">{stateAsJson}</pre>

        <div className="callout">
          <p><strong>Ce exemplificăm</strong></p>
          <ul>
            <li><code>dispatch(addNote(value))</code> → action → reducer → stare nouă (immutability)</li>
            <li><code>useSelector</code> pentru citirea stării din store</li>
            <li><code>useDispatch</code> pentru declanşarea acţiunilor</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default NoteList;
