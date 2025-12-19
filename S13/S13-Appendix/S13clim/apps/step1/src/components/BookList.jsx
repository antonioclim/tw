import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks, addBook, saveBook } from '../actions';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { FilterMatchMode } from 'primereact/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const selectorCarti = (state) => state.book.bookList;
const selectorEroare = (state) => state.book.error;
const selectorIncarcare = (state) => state.book.fetching;

function BookList() {
  // Stare locală: formular (dialog) pentru adăugare/editare
  const [titlu, setTitlu] = useState('');
  const [continut, setContinut] = useState('');
  const [dialogVizibil, setDialogVizibil] = useState(false);
  const [esteInregistrareNoua, setEsteInregistrareNoua] = useState(true);
  const [idCarteSelectata, setIdCarteSelectata] = useState(null);

  // Stare locală: căutare (filtrare) în tabel
  const [termenCautareTitlu, setTermenCautareTitlu] = useState('');
  const [filtre, setFiltre] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const dispatch = useDispatch();
  const carti = useSelector(selectorCarti);
  const eroare = useSelector(selectorEroare);
  const incarca = useSelector(selectorIncarcare);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const inchideDialog = () => {
    setDialogVizibil(false);
  };

  const deschideDialogAdaugare = () => {
    setDialogVizibil(true);
    setEsteInregistrareNoua(true);
    setIdCarteSelectata(null);
    setTitlu('');
    setContinut('');
  };

  const deschideDialogEditare = (rowData) => {
    setIdCarteSelectata(rowData.id);
    setTitlu(rowData.title ?? '');
    setContinut(rowData.content ?? '');
    setDialogVizibil(true);
    setEsteInregistrareNoua(false);
  };

  const esteFormularValid = useMemo(() => titlu.trim().length > 0, [titlu]);

  const salveaza = () => {
    if (!esteFormularValid) {
      // Validare minimală, deliberat explicită: titlul este câmp-ancoră semantic.
      return;
    }

    const payload = { title: titlu.trim(), content: continut.trim() };

    if (esteInregistrareNoua) {
      dispatch(addBook(payload));
    } else {
      dispatch(saveBook(idCarteSelectata, payload));
    }

    setDialogVizibil(false);
    setIdCarteSelectata(null);
    setTitlu('');
    setContinut('');
  };

  const aplicaCautareDupaTitlu = () => {
    const termen = termenCautareTitlu.trim();
    setFiltre({
      global: { value: termen.length ? termen : null, matchMode: FilterMatchMode.CONTAINS },
    });
  };

  const reseteazaCautarea = () => {
    setTermenCautareTitlu('');
    setFiltre({ global: { value: null, matchMode: FilterMatchMode.CONTAINS } });
  };

  const baraCautare = (
    <div className="flex flex-column md:flex-row md:align-items-center md:justify-content-between gap-2">
      <div className="flex align-items-center gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={termenCautareTitlu}
            onChange={(e) => setTermenCautareTitlu(e.target.value)}
            placeholder="Titlul (sau un fragment)"
            aria-label="Căutare după titlu"
          />
        </span>
        <Button
          label="Caută"
          icon="pi pi-filter"
          onClick={aplicaCautareDupaTitlu}
          className="p-button-outlined"
        />
        <Button
          label="Resetare"
          icon="pi pi-times"
          onClick={reseteazaCautarea}
          className="p-button-text"
        />
      </div>

      <div className="text-sm text-600">
        <span className="font-semibold">Observaţie:</span> filtrarea se aplică exclusiv câmpului „Titlu”.
      </div>
    </div>
  );

  const subsolTabel = (
    <div className="flex justify-content-between align-items-center" style={{ width: '100%' }}>
      <div className="text-sm text-600">
        {Array.isArray(carti) ? `Înregistrări: ${carti.length}` : 'Înregistrări: 0'}
      </div>
      <Button label="Adaugă" icon="pi pi-plus" onClick={deschideDialogAdaugare} />
    </div>
  );

  const subsolDialog = (
    <div className="flex justify-content-end" style={{ width: '100%' }}>
      <Button
        label="Salvează"
        icon="pi pi-save"
        onClick={salveaza}
        disabled={!esteFormularValid}
      />
    </div>
  );

  const coloanaOperatii = (rowData) => {
    return <Button label="Editează" icon="pi pi-pencil" onClick={() => deschideDialogEditare(rowData)} />;
  };

  return (
    <div className="flex flex-column gap-3">
      <div>
        <h2 className="m-0">Catalog de cărţi (demo)</h2>
        <p className="mt-2 mb-0 text-700">
          Componenta centrală este un <span className="font-semibold">DataTable</span> din PrimeReact, integrat într-un flux de
          date orchestrat de Redux. În această etapă, accentul cade pe <span className="font-semibold">afişare</span>,
          <span className="font-semibold"> adăugare</span>, <span className="font-semibold">editare</span> şi
          <span className="font-semibold"> căutare</span> prin filtrare.
        </p>
      </div>

      {eroare ? (
        <Message
          severity="error"
          text={`Eroare operaţională: ${eroare}. Verificaţi dacă serverul rulează pe ${API_URL}.`}
        />
      ) : null}

      <DataTable
        value={carti}
        header={baraCautare}
        footer={subsolTabel}
        filters={filtre}
        globalFilterFields={['title']}
        loading={incarca}
        stripedRows
        showGridlines
        emptyMessage="Nu există cărţi de afişat."
      >
        <Column header="Titlu" field="title" />
        <Column header="Conţinut" field="content" />
        <Column header="Operaţii" body={coloanaOperatii} style={{ width: '10rem' }} />
      </DataTable>

      <Dialog
        visible={dialogVizibil}
        onHide={inchideDialog}
        header={esteInregistrareNoua ? 'Carte nouă' : 'Editare carte'}
        footer={subsolDialog}
        modal
        style={{ width: '32rem', maxWidth: '95vw' }}
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="titlu">Titlu</label>
            <InputText
              id="titlu"
              value={titlu}
              onChange={(e) => setTitlu(e.target.value)}
              placeholder="Introduceţi titlul"
              autoFocus
            />
            {!esteFormularValid ? (
              <small className="text-red-600">Titlul este obligatoriu (minimum un caracter non-spaţiu).</small>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="continut">Conţinut</label>
            <InputText
              id="continut"
              value={continut}
              onChange={(e) => setContinut(e.target.value)}
              placeholder="Introduceţi un rezumat scurt / o notă"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default BookList;
