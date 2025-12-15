import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <header className="header">
                <h1>Seminar 12 – Step 2: useReducer</h1>
                <p className="muted">
                    Scop: demonstrăm gestionarea unei <strong>stări mai complexe</strong> într-o componentă React
                    folosind <code>useReducer</code> (în locul mai multor <code>useState</code>), păstrând router-ul
                    din Step 1 doar ca mecanism de navigare.
                </p>
            </header>

            <section className="card">
                <h2>Ce exemplificăm</h2>
                <ul>
                    <li>O stare compusă (<code>count</code> + <code>history</code>) actualizată atomic.</li>
                    <li>Reducer pur (fără efecte secundare), cu acţiuni declarative.</li>
                    <li>Imutabilitate: fiecare acţiune returnează o <em>stare nouă</em>.</li>
                    <li>O acţiune <code>reset</code> care revine la starea iniţială.</li>
                </ul>
            </section>

            <section className="card">
                <h2>Navigare rapidă</h2>
                <div className="actions">
                    <button onClick={() => navigate("tasks")}>Deschide /tasks (demo useReducer)</button>
                    <button onClick={() => navigate("about")}>Deschide /about (explicaţii)</button>
                </div>
                <p className="muted">
                    Alternativ (Link): <Link to="/tasks">/tasks</Link> · <Link to="/about">/about</Link> · Test 404:{" "}
                    <Link to="/ruta-inexistenta">/ruta-inexistenta</Link>
                </p>
            </section>

            <section className="card">
                <h2>Fişiere cheie (de urmărit în VS Code)</h2>
                <ul>
                    <li><code>src/components/Tasks.jsx</code> – reducer + UI + logica acţiunilor.</li>
                    <li><code>src/App.jsx</code> – rutele pentru Home / Tasks / About / 404.</li>
                </ul>
            </section>
        </div>
    );
};

export default Home;
