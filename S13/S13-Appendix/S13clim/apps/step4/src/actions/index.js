const SERVER = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Observaţie de consistenţă: BookList menţine local starea filtrelor/paginării/sortării.
// Pentru ca operaţiile de adăugare/salvare/ştergere să rămână coerente cu interogarea curentă,
// reţinem ultimul queryString utilizat la getBooks().
let lastQueryString = '';

const buildQuery = (queryString) => {
  if (!queryString) return '';
  return queryString.startsWith('?') ? queryString : `?${queryString}`;
};

const asJsonOrThrow = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // încercăm să păstrăm mesajul de eroare (dacă există)
    const message =
      (payload && typeof payload === 'object' && (payload.message || payload.error)) ||
      (typeof payload === 'string' ? payload : 'Eroare necunoscută.');
    const err = new Error(message);
    err.payload = payload;
    err.status = response.status;
    throw err;
  }

  return payload;
};

export function getBooks(queryString = '') {
  lastQueryString = queryString || '';
  return {
    type: 'GET_BOOKS',
    payload: fetch(`${SERVER}/books${buildQuery(queryString)}`).then(asJsonOrThrow)
  };
}

export function addBook(book) {
  return {
    type: 'ADD_BOOK',
    payload: fetch(`${SERVER}/books${buildQuery(lastQueryString)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(asJsonOrThrow)
  };
}

export function saveBook(id, book) {
  return {
    type: 'SAVE_BOOK',
    payload: fetch(`${SERVER}/books/${id}${buildQuery(lastQueryString)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(asJsonOrThrow)
  };
}

export function deleteBook(id) {
  return {
    type: 'DELETE_BOOK',
    payload: fetch(`${SERVER}/books/${id}${buildQuery(lastQueryString)}`, {
      method: 'DELETE'
    }).then(asJsonOrThrow)
  };
}

export function getStats(queryString = '') {
  return {
    type: 'GET_STATS',
    payload: fetch(`${SERVER}/books/stats${buildQuery(queryString)}`).then(asJsonOrThrow)
  };
}
