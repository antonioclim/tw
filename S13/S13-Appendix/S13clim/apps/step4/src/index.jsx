import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './stores/store';

// PrimeReact styles (temă + componente)
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Localizare PrimeReact (etichete pentru filtrare/paginare etc.)
import { addLocale, locale } from 'primereact/api';

addLocale('ro', {
  startsWith: 'Începe cu',
  contains: 'Conţine',
  notContains: 'Nu conţine',
  endsWith: 'Se termină cu',
  equals: 'Egal cu',
  notEquals: 'Diferit de',
  noFilter: 'Fără filtru',
  lt: 'Mai mic decât',
  lte: 'Mai mic sau egal cu',
  gt: 'Mai mare decât',
  gte: 'Mai mare sau egal cu',
  dateIs: 'Data este',
  dateIsNot: 'Data nu este',
  dateBefore: 'Înainte de',
  dateAfter: 'După',
  clear: 'Şterge',
  apply: 'Aplică',
  matchAll: 'Potriveşte toate',
  matchAny: 'Potriveşte oricare',
  addRule: 'Adaugă regulă',
  removeRule: 'Elimină regulă',
  accept: 'Da',
  reject: 'Nu',
  choose: 'Alege',
  upload: 'Încarcă',
  cancel: 'Renunţă',
  dayNames: ['Duminică', 'Luni', 'Marţi', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
  dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
  dayNamesMin: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'],
  monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
  monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'],
  today: 'Astăzi',
  weekHeader: 'Săpt.',
  firstDayOfWeek: 1,
  dateFormat: 'dd.mm.yy',
  weak: 'Slab',
  medium: 'Mediu',
  strong: 'Puternic',
  passwordPrompt: 'Introduceţi o parolă',
  emptyFilterMessage: 'Nu există opţiuni',
  emptyMessage: 'Nu există rezultate',
  aria: {
    trueLabel: 'Adevărat',
    falseLabel: 'Fals',
    nullLabel: 'Neselectat',
    star: '1 stea',
    stars: '{star} stele',
    selectAll: 'Selectează tot',
    unselectAll: 'Deselectează tot',
    close: 'Închide',
    previous: 'Anterior',
    next: 'Următor',
    navigation: 'Navigare',
    scrollTop: 'Derulează sus',
    moveTop: 'Mută sus',
    moveUp: 'Mută în sus',
    moveDown: 'Mută în jos',
    moveBottom: 'Mută jos',
    moveToTarget: 'Mută la ţintă',
    moveToSource: 'Mută la sursă',
    moveAllToTarget: 'Mută tot la ţintă',
    moveAllToSource: 'Mută tot la sursă',
    pageLabel: 'Pagină {page}',
    firstPageLabel: 'Prima pagină',
    lastPageLabel: 'Ultima pagină',
    nextPageLabel: 'Pagina următoare',
    prevPageLabel: 'Pagina anterioară',
    rowsPerPageLabel: 'Rânduri pe pagină',
    jumpToPageDropdownLabel: 'Salt la pagină',
    jumpToPageInputLabel: 'Salt la pagină',
    selectRow: 'Selectare rând',
    unselectRow: 'Deselectare rând',
    expandRow: 'Extindere rând',
    collapseRow: 'Restrângere rând',
    showFilterMenu: 'Afişează meniul de filtrare',
    hideFilterMenu: 'Ascunde meniul de filtrare',
    filterOperator: 'Operator de filtrare',
    filterConstraint: 'Constrângere de filtrare',
    editRow: 'Editare rând',
    saveEdit: 'Salvează editarea',
    cancelEdit: 'Anulează editarea',
    listView: 'Vizualizare listă',
    gridView: 'Vizualizare grilă',
    slide: 'Glisează',
    slideNumber: '{slideNumber}',
    zoomImage: 'Măreşte imaginea',
    zoomIn: 'Măreşte',
    zoomOut: 'Micşorează',
    rotateRight: 'Roteşte dreapta',
    rotateLeft: 'Roteşte stânga'
  }
});

locale('ro');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>);
