import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './stores/store';

// PrimeReact styles (ca în materialele de laborator)
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
  filter: 'Filtru',
  lt: 'Mai mic decât',
  lte: 'Mai mic sau egal cu',
  gt: 'Mai mare decât',
  gte: 'Mai mare sau egal cu',
  dateIs: 'Data este',
  dateIsNot: 'Data nu este',
  dateBefore: 'Înainte de',
  dateAfter: 'După',
  custom: 'Personalizat',
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
  close: 'Închide',
  dayNames: ['duminică', 'luni', 'marţi', 'miercuri', 'joi', 'vineri', 'sâmbătă'],
  dayNamesShort: ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sâm'],
  dayNamesMin: ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'],
  monthNames: [
    'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
    'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'
  ],
  monthNamesShort: ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'],
  today: 'Astăzi',
  weekHeader: 'Săpt.',
  firstDayOfWeek: 1,
  dateFormat: 'dd/mm/yy',
  weak: 'Slabă',
  medium: 'Medie',
  strong: 'Puternică',
  passwordPrompt: 'Introduceţi o parolă',
  emptyFilterMessage: 'Nu există opţiuni disponibile',
  emptyMessage: 'Nu s-au găsit rezultate',
  'aria.trueLabel': 'Adevărat',
  'aria.falseLabel': 'Fals',
  'aria.nullLabel': 'Neselectat',
  'aria.pageLabel': 'Pagina',
  'aria.firstPageLabel': 'Prima pagină',
  'aria.lastPageLabel': 'Ultima pagină',
  'aria.nextPageLabel': 'Pagina următoare',
  'aria.previousPageLabel': 'Pagina anterioară',
  'aria.selectLabel': 'Selectează',
  'aria.unselectLabel': 'Deselectează',
  'aria.expandLabel': 'Extinde',
  'aria.collapseLabel': 'Restrânge'
});

locale('ro');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>);
