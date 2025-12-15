import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container">
            <header className="header">
                <h1>404 – Page not found</h1>
                <p className="muted">Acesta este „pasul” în care demonstrăm routing-ul către o rută inexistentă.</p>
            </header>

            <div className="card">
                <p>
                    Înapoi la <Link to="/">Home</Link>.
                </p>
                <p className="muted">
                    Sugestie: încearcă să navighezi la <code>/no-such-route</code> din Home pentru a ajunge aici.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
