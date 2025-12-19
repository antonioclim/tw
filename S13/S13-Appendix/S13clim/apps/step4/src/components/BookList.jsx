import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooks, addBook, saveBook, deleteBook, getStats } from '../actions';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FilterMatchMode } from 'primereact/api';

import { Chart } from 'react-google-charts';

const bookListSelector = (state) => state.book.bookList;
const countSelector = (state) => state.book.count;
const fetchingSelector = (state) => state.book.fetching;
const errorSelector = (state) => state.book.error;

const statsSelector = (state) => state.book.stats;
const statsFetchingSelector = (state) => state.book.statsFetching;
const statsErrorSelector = (state) => state.book.statsError;

function BookList() {
  const dispatch = useDispatch();

  // --- date din Redux ---
  const books = useSelector(bookListSelector);
  const totalRecords = useSelector(countSelector);
  const loading = useSelector(fetchingSelector);
  const error = useSelector(errorSelector);

  const stats = useSelector(statsSelector);
  const statsLoading = useSelector(statsFetchingSelector);
  const statsError = useSelector(statsErrorSelector);

  // --- stare pentru formular (dialog) ---
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState(null);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  // --- stare pentru dialogul de grafice ---
  const [isChartsDialogShown, setIsChartsDialogShown] = useState(false);

  // --- stare pentru filtrare/paginare/sortare ---
  const initialFilters = useMemo(
    () => ({
      title: { value: null, matchMode: FilterMatchMode.CONTAINS },
      content: { value: null, matchMode: FilterMatchMode.CONTAINS }
    }),
    []
  );

  const [filters, setFilters] = useState(initialFilters);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(1);

  // --- compunerea interogării (contract client→server) ---
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (filters?.title?.value) params.set('title', filters.title.value);
    if (filters?.content?.value) params.set('content', filters.content.value);

    params.set('first', String(first));
    params.set('rows', String(rows));

    if (sortField) {
      params.set('sortField', sortField);
      params.set('sortOrder', String(sortOrder));
    }

    return params.toString();
  }, [filters, first, rows, sortField, sortOrder]);

  // --- încărcare date la modificarea interogării ---
  useEffect(() => {
    dispatch(getBooks(queryString));
  }, [dispatch, queryString]);

  // --- corecţie pentru situaţia „ultima pagină a devenit goală” ---
  useEffect(() => {
    if (!Number.isFinite(totalRecords) || totalRecords <= 0) return;
    if (!Number.isFinite(first) || !Number.isFinite(rows) || rows <= 0) return;

    if (first >= totalRecords) {
      const lastFirst = Math.floor((totalRecords - 1) / rows) * rows;
      if (lastFirst !== first) setFirst(lastFirst);
    }
  }, [totalRecords, first, rows]);

  // --- facilitate: deschidere dialog pentru adăugare ---
  const handleAddClick = () => {
    setIsDialogShown(true);
    setIsNewRecord(true);
    setSelectedBook(null);
    setTitle('');
    setContent('');
    setPages(null);
  };

  // --- facilitate: deschidere dialog pentru editare ---
  const editBook = (rowData) => {
    setIsDialogShown(true);
    setIsNewRecord(false);
    setSelectedBook(rowData);
    setTitle(rowData.title ?? '');
    setContent(rowData.content ?? '');
    setPages(rowData.pages ?? null);
  };

  const hideDialog = () => {
    setIsDialogShown(false);
  };

  const handleSaveClick = () => {
    const t = String(title || '').trim();
    const c = String(content || '').trim();
    const p = Number.parseInt(pages, 10);

    if (!t || !c) {
      alert('Titlul şi conţinutul sunt obligatorii.');
      return;
    }
    if (!Number.isFinite(p) || p <= 0) {
      alert('Numărul de pagini trebuie să fie un întreg pozitiv.');
      return;
    }

    if (isNewRecord) {
      dispatch(addBook({ title: t, content: c, pages: p }));
    } else if (selectedBook?.id != null) {
      dispatch(saveBook(selectedBook.id, { title: t, content: c, pages: p }));
    }

    setIsDialogShown(false);
  };

  const handleDeleteBook = (rowData) => {
    if (!rowData?.id) return;
    const ok = window.confirm('Confirmaţi ştergerea acestei înregistrări?');
    if (!ok) return;
    dispatch(deleteBook(rowData.id));
  };

  // --- filtrare pe coloană (declanşare explicită: „Aplică”) ---
  const handleFilterApply = (evt) => {
    // evt.field; evt.constraints.constraints[0] = { value, matchMode }
    const oldFilters = { ...filters };
    oldFilters[evt.field] = evt.constraints.constraints[0];
    setFilters({ ...oldFilters });
    setFirst(0);
  };

  const handleFilterClear = () => {
    setFilters(initialFilters);
    setFirst(0);
  };

  // --- paginare ---
  const handlePage = (evt) => {
    setFirst(evt.first);
    setRows(evt.rows);
  };

  // --- sortare ---
  const handleSort = (evt) => {
    setSortField(evt.sortField);
    setSortOrder(evt.sortOrder);
    setFirst(0);
  };

  // --- grafice: deschidere dialog + încărcare statistici ---
  const statsQueryString = useMemo(() => {
    const params = new URLSearchParams();
    if (filters?.title?.value) params.set('title', filters.title.value);
    if (filters?.content?.value) params.set('content', filters.content.value);
    return params.toString();
  }, [filters]);

  const openChartsDialog = () => {
    setIsChartsDialogShown(true);
    dispatch(getStats(statsQueryString));
  };

  const closeChartsDialog = () => setIsChartsDialogShown(false);

  const refreshCharts = () => dispatch(getStats(statsQueryString));

  // --- date pentru grafice (format Google Charts) ---
  const pieData = useMemo(() => {
    const rowsData = (stats?.ranges ?? []).map((r) => [r.label, r.value]);
    return [['Interval de pagini', 'Număr de cărţi'], ...rowsData];
  }, [stats]);

  const barData = useMemo(() => {
    const rowsData = (stats?.topByPages ?? []).map((r) => [r.title, r.pages]);
    return [['Titlu', 'Pagini'], ...rowsData];
  }, [stats]);

  const histogramData = useMemo(() => {
    const pagesList = stats?.pagesList ?? [];
    return [['Pagini'], ...pagesList.map((p) => [p])];
  }, [stats]);

  const pieOptions = useMemo(
    () => ({
      title: 'Distribuţia cărţilor după intervale de pagini',
      legend: { position: 'right' },
      chartArea: { width: '92%', height: '80%' },
      sliceVisibilityThreshold: 0
    }),
    []
  );

  const barOptions = useMemo(
    () => ({
      title: 'Cărţi cu cele mai multe pagini (top 10)',
      legend: { position: 'none' },
      chartArea: { width: '70%', height: '75%' },
      hAxis: { title: 'Pagini', minValue: 0 },
      vAxis: { title: 'Titlu' }
    }),
    []
  );

  const histogramOptions = useMemo(
    () => ({
      title: 'Histogramă: distribuţia numerică a paginilor (set filtrat)',
      legend: { position: 'none' },
      chartArea: { width: '90%', height: '70%' }
    }),
    []
  );

  // --- template: antet tabel ---
  const tableHeader = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Button label="Adaugă" icon="pi pi-plus" onClick={handleAddClick} />
        <Button label="Grafice" icon="pi pi-chart-pie" className="p-button-outlined" onClick={openChartsDialog} />
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

  const chartsFooter = (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button label="Recalculează" icon="pi pi-refresh" className="p-button-text" onClick={refreshCharts} />
      <Button label="Închide" icon="pi pi-times" onClick={closeChartsDialog} />
    </div>
  );

  // --- template: coloană operaţii ---
  const opsColumn = (rowData) => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Button label="Editează" icon="pi pi-pencil" className="p-button-text" onClick={() => editBook(rowData)} />
      <Button label="Şterge" icon="pi pi-trash" className="p-button-text p-button-danger" onClick={() => handleDeleteBook(rowData)} />
    </div>
  );

  return (
    <div>
      {error ? (
        <div style={{ marginBottom: '0.75rem', color: '#b00020' }}>
          <strong>Eroare:</strong> {String(error.message || error)}
        </div>
      ) : null}

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
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        emptyMessage="Nu există înregistrări."
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
          sortable
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
          sortable
        />
        <Column header="Număr de pagini" field="pages" sortable />
        <Column header="Operaţii" body={opsColumn} />
      </DataTable>

      {/* Dialog: Adăugare/Editare */}
      <Dialog
        visible={isDialogShown}
        onHide={hideDialog}
        header={isNewRecord ? 'Adăugare carte' : 'Editare carte'}
        footer={dialogFooter}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '22rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="titlu">
              <strong>Titlu</strong>
            </label>
            <InputText
              id="titlu"
              placeholder="Introduceţi titlul (obligatoriu)"
              onChange={(evt) => setTitle(evt.target.value)}
              value={title}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="continut">
              <strong>Conţinut</strong>
            </label>
            <InputText
              id="continut"
              placeholder="Introduceţi un rezumat (obligatoriu)"
              onChange={(evt) => setContent(evt.target.value)}
              value={content}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="pagini">
              <strong>Număr de pagini</strong>
            </label>
            <InputNumber
              id="pagini"
              value={pages}
              onValueChange={(evt) => setPages(evt.value)}
              placeholder="Introduceţi un întreg pozitiv"
              min={1}
              max={100000}
              useGrouping={false}
              inputStyle={{ width: '100%' }}
            />
          </div>
        </div>
      </Dialog>

      {/* Dialog: Grafice (Pie Chart + experimente cu mai multe grafice în modal) */}
      <Dialog
        visible={isChartsDialogShown}
        onHide={closeChartsDialog}
        header="Grafice — sinteză pentru setul filtrat"
        footer={chartsFooter}
        style={{ width: 'min(1100px, 96vw)' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ margin: 0, lineHeight: 1.55, maxWidth: 980 }}>
            În această fereastră modală, datele sunt re-codificate vizual: un <strong>Pie Chart</strong> oferă o
            sinteză distributivă (categorii de mărime), iar un al doilea grafic evidenţiază extremele (top după
            număr de pagini). Opţional, histograma ilustrează structura numerică a variabilei <em>pages</em>.
          </p>

          {statsError ? (
            <div style={{ color: '#b00020' }}>
              <strong>Eroare la încărcarea statisticilor:</strong> {String(statsError.message || statsError)}
            </div>
          ) : null}

          {statsLoading ? (
            <div style={{ opacity: 0.75 }}>Se calculează statistici…</div>
          ) : null}

          {!statsLoading && stats && (stats.count ?? 0) > 0 ? (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                  gap: '1rem',
                  alignItems: 'start'
                }}
              >
                <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: '0.5rem' }}>
                  <Chart chartType="PieChart" width="100%" height="360px" data={pieData} options={pieOptions} />
                </div>

                <div style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: '0.5rem' }}>
                  <Chart chartType="BarChart" width="100%" height="360px" data={barData} options={barOptions} />
                </div>
              </div>

              <div style={{ border: '1px dashed rgba(0,0,0,0.18)', borderRadius: 8, padding: '0.5rem' }}>
                <Chart chartType="Histogram" width="100%" height="300px" data={histogramData} options={histogramOptions} />
              </div>

              <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                <strong>Sumar numeric:</strong>{' '}
                {stats.summary ? (
                  <>
                    minim = <strong>{stats.summary.minPages}</strong>, mediană = <strong>{stats.summary.medianPages}</strong>, medie ={' '}
                    <strong>{stats.summary.meanPages}</strong>, maxim = <strong>{stats.summary.maxPages}</strong>.
                  </>
                ) : (
                  <span>indisponibil.</span>
                )}
              </div>
            </>
          ) : null}

          {!statsLoading && stats && (stats.count ?? 0) === 0 ? (
            <div style={{ opacity: 0.8 }}>
              Pentru filtrul curent, nu există date; graficele nu pot fi construite fără observaţii.
            </div>
          ) : null}
        </div>
      </Dialog>
    </div>
  );
}

export default BookList;
