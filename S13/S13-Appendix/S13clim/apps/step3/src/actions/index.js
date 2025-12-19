const SERVER = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Observaţie de consistenţă: BookList menţine local starea filtrelor/paginării.
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

  if (!response.ok) {
    const body = isJson ? await response.json().catch(() => ({})) : await response.text().catch(() => '');
    const message = (body && body.message) ? body.message : `HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.body = body;
    throw error;
  }

  return isJson ? response.json() : response.text();
};

export function getBooks(queryString = '') {
  lastQueryString = queryString || '';
  return {
    type: 'GET_BOOKS',
    payload: fetch(`${SERVER}/books${buildQuery(queryString)}`)
      .then(asJsonOrThrow)
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
