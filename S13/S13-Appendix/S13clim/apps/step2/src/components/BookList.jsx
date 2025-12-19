import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks, addBook, saveBook } from '../actions';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

const bookListSelector = (state) => state.book.bookList;
const countSelector = (state) => state.book.count;
const fetchingSelector = (state) => state.book.fetching;

function BookList() {
  // --- stare pentru formular (dialog) ---
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // --- stare pentru filtrare (server-side, declanşată explicit) ---
  const initialFilters = useMemo(
    () => ({
      title: { value: null, matchMode: FilterMatchMode.CONTAINS },
      content: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }),
    []
  );

  const [filters, setFilters] = useState(initialFilters);

  // --- stare pentru paginare (server-side) ---
  const [first, setFirst] = useState(0); // indexul primului rând din fereastra curentă
  const [rows, setRows] = useState(5);   // numărul de rânduri per pagină (controlat parametric)

  // --- query string calculat (filtre + paginare) ---
  const [queryString, setQueryString] = useState('');

  const books = useSelector(bookListSelector);
  const totalRecords = useSelector(countSelector);
  const loading = useSelector(fetchingSelector);
  const dispatch = useDispatch();

  // Recalcularea queryString-ului ori de câte ori se schimbă filtrele sau paginarea.
  useEffect(() => {
    const keys = Object.keys(filters);
    const computedFilterString = keys
      .map((key) => ({ key, value: filters[key].value }))
      .filter((e) => e.value !== null && e.value !== undefined && `${e.value}`.trim() !== '')
      .map((e) => `${encodeURIComponent(e.key)}=${encodeURIComponent(e.value)}`)
      .join('&');

    // Paginarea este un contract explicit cu serverul: trimitem fereastra [first, first+rows).
    const paging = `first=${encodeURIComponent(first)}&rows=${encodeURIComponent(rows)}`;

    const joined = [computedFilterString, paging].filter(Boolean).join('&');
    setQueryString(joined);
  }, [filters, first, rows]);

  // Efectul care materializează interogarea: serverul produce o listă (records) + un total (count).
  useEffect(() => {
    dispatch(getBooks(queryString));
  }, [dispatch, queryString]);

  // Corecţie de robusteţe: dacă după ştergeri/filtrări ajungem într-o pagină &ldquo;în gol&rdquo;,
  // repoziţionăm fereastra astfel încât paginatorul să afişeze ultima pagină validă.
  useEffect(() => {
    if (totalRecords > 0 && first >= totalRecords) {
      const newFirst = Math.max(0, totalRecords - rows);
      if (newFirst !== first) {
        setFirst(newFirst);
      }
    }
  }, [totalRecords, first, rows]);

  // --- facilitate: deschidere dialog pentru adăugare ---
  const handleAddClick = () => {
    setIsDialogShown(true);
    setIsNewRecord(true);
    setSelectedBook(null);
    setTitle('');
    setContent('');
  };

  // --- ascundere dialog ---
  const hideDialog = () => {
    setIsDialogShown(false);
  };

  // --- salvare (adăugare sau actualizare) ---
  const handleSaveClick = () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      // Într-un laborator, minimalismul e preferabil: validare sintactică simplă.
      alert('Vă rugăm să completaţi atât titlul, cât şi conţinutul (ambele sunt obligatorii).');
      return;
    }

    if (isNewRecord) {
      dispatch(addBook({ title: trimmedTitle, content: trimmedContent }));
    } else {
      dispatch(saveBook(selectedBook, { title: trimmedTitle, content: trimmedContent }));
    }

    setIsDialogShown(false);
    setSelectedBook(null);
    setTitle('');
    setContent('');
  };

  const editBook = (rowData) => {
    setSelectedBook(rowData.id);
    setTitle(rowData.title);
    setContent(rowData.content);
    setIsDialogShown(true);
    setIsNewRecord(false);
  };

  // --- filtrare: &ldquo;Aplică&rdquo; transmite starea filtrului în queryString ---
  const handleFilterApply = (evt) => {
    const oldFilters = { ...filters };

    // PrimeReact furnizează constrângeri (constraints); pentru laborator presupunem unică regulă (CONTAINS).
    oldFilters[evt.field] = evt.constraints.constraints[0];

    setFirst(0); // filtrarea schimbă universul; reîncepem de la prima pagină.
    setFilters({ ...oldFilters });
  };

  // --- filtrare: &ldquo;Şterge&rdquo; readuce filtrele la starea iniţială ---
  const handleFilterClear = () => {
    setFirst(0);
    setFilters(initialFilters);
  };

  // --- paginare: evenimentul de paginare actualizează parametrii (first/rows) ---
  const handlePage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const tableHeader = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Button label="Adaugă" icon="pi pi-plus" onClick={handleAddClick} />
        <span style={{ opacity: 0.75 }}>
          Set curent: <strong>{totalRecords}</strong> înregistrări (după filtrare)
        </span>
      </div>
      <div style={{ fontFamily: 'monospace', opacity: 0.7, fontSize: '0.85rem' }}>
        {queryString ? `?${queryString}` : ''}
      </div>
    </div>
  );

  const dialogFooter = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
      <Button label="Renunţă" className="p-button-text" onClick={hideDialog} />
      <Button label="Salvează" icon="pi pi-save" onClick={handleSaveClick} />
    </div>
  );

  const opsColumn = (rowData) => {
    return (
      <Button label="Editează" icon="pi pi-pencil" onClick={() => editBook(rowData)} />
    );
  };

  return (
    <div>
      <DataTable
        value={books}
        header={tableHeader}
        lazy
        loading={loading}
        paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPage={handlePage}
        rowsPerPageOptions={[3, 5, 10, 20]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Afişare {first}–{last} din {totalRecords}"
      >
        <Column
          header="Titlu"
          field="title"
          filter
          filterField="title"
          filterPlaceholder="Filtrare (conţine…)"
          onFilterApplyClick={handleFilterApply}
          onFilterClear={handleFilterClear}
          showFilterMatchModes={false}
          showFilterOperator={false}
        />
        <Column
          header="Conţinut"
          field="content"
          filter
          filterField="content"
          filterPlaceholder="Filtrare (conţine…)"
          onFilterApplyClick={handleFilterApply}
          onFilterClear={handleFilterClear}
          showFilterMatchModes={false}
          showFilterOperator={false}
        />
        <Column header="Operaţii" body={opsColumn} style={{ width: '10rem' }} />
      </DataTable>

      <Dialog
        visible={isDialogShown}
        onHide={hideDialog}
        header={isNewRecord ? 'Adăugare carte' : 'Editare carte'}
        footer={dialogFooter}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '22rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="titlu"><strong>Titlu</strong></label>
            <InputText
              id="titlu"
              placeholder="Introduceţi titlul (obligatoriu)"
              onChange={(evt) => setTitle(evt.target.value)}
              value={title}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="continut"><strong>Conţinut</strong></label>
            <InputText
              id="continut"
              placeholder="Introduceţi conţinutul (obligatoriu)"
              onChange={(evt) => setContent(evt.target.value)}
              value={content}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default BookList;
