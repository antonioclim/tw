import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Button } from 'primereact/button';

import Home from './pages/Home';
import StepPage from './pages/StepPage';
import Materiale from './pages/Materiale';
import ApiTester from './pages/ApiTester';
import NotFound from './pages/NotFound';

function Topbar() {
  return (
    <div className="s13-topbar">
      <div className="s13-container">
        <div className="flex align-items-center justify-content-between flex-wrap gap-2" style={{ padding: '.85rem 0' }}>
          <div>
            <div style={{ fontWeight: 800, letterSpacing: '.2px' }}>Tehnologii Web · Seminar 13</div>
            <div className="s13-muted" style={{ marginTop: '.2rem' }}>
              Componente externe în React · DataTable, filtrare, paginare, sortare, grafice
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Link to="/" className="p-button p-button-text">
              <span className="pi pi-home" style={{ marginRight: '.5rem' }} />
              Dashboard
            </Link>
            <Link to="/api" className="p-button p-button-text">
              <span className="pi pi-send" style={{ marginRight: '.5rem' }} />
              Postman Lite
            </Link>
            <Link to="/materiale" className="p-button p-button-text">
              <span className="pi pi-folder" style={{ marginRight: '.5rem' }} />
              Materiale
            </Link>
            <Button
              icon="pi pi-play"
              label="Start: all"
              severity="secondary"
              onClick={() => {
                // Acest buton nu porneşte procese (limitare de securitate a browserului).
                // Este un indicator didactic: utilizatorul porneşte din terminal comanda npm run start:all.
                alert('Porneşte suita completă din terminal: npm run start:all');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="s13-shell">
        <Topbar />

        <main className="s13-main">
          <div className="s13-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pas/:stepId" element={<StepPage />} />
              <Route path="/api" element={<ApiTester />} />
              <Route path="/materiale" element={<Materiale />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <footer className="s13-footer">
          <div className="s13-container">
            <div className="flex flex-wrap justify-content-between gap-2">
              <div>
                <strong>Notă:</strong> Dashboard-ul rulează pe portul 3000. Paşii 1–4 rulează pe porturi dedicate (3001–3004),
                iar serverele aferente pe 8081–8084.
              </div>
              <div>
                <span className="pi pi-info-circle" style={{ marginRight: '.35rem' }} />
                Pentru instalare tipică: <span className="s13-kbd">npm run setup</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
