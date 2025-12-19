// URL-ul API-ului poate fi configurat prin variabila de mediu VITE_API_URL.
// În absenţa ei, se foloseşte serverul demo local.
const SERVER = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function getBooks() {
  return async (dispatch) => {
    dispatch({ type: 'GET_BOOKS_PENDING' });

    try {
      const response = await fetch(`${SERVER}/books`);
      if (!response.ok) {
        throw new Error(
          `Eroare la preluarea cărţilor (GET /books): ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      dispatch({ type: 'GET_BOOKS_FULFILLED', payload: data });
    } catch (err) {
      dispatch({ type: 'GET_BOOKS_REJECTED', payload: String(err) });
    }
  };
}

export function addBook(book) {
  return async (dispatch) => {
    dispatch({ type: 'ADD_BOOK_PENDING' });

    try {
      const response = await fetch(`${SERVER}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(
          `Eroare la adăugarea cărţii (POST /books): ${response.status} ${response.statusText}`
        );
      }

      await response.json();
      dispatch({ type: 'ADD_BOOK_FULFILLED' });

      // Conform convenţiei din material: după succes, reîncărcăm lista.
      dispatch(getBooks());
    } catch (err) {
      dispatch({ type: 'ADD_BOOK_REJECTED', payload: String(err) });
    }
  };
}

export function saveBook(id, book) {
  return async (dispatch) => {
    dispatch({ type: 'SAVE_BOOK_PENDING' });

    try {
      const response = await fetch(`${SERVER}/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error(
          `Eroare la salvarea cărţii (PUT /books/${id}): ${response.status} ${response.statusText}`
        );
      }

      await response.json();
      dispatch({ type: 'SAVE_BOOK_FULFILLED' });

      // Conform convenţiei din material: după succes, reîncărcăm lista.
      dispatch(getBooks());
    } catch (err) {
      dispatch({ type: 'SAVE_BOOK_REJECTED', payload: String(err) });
    }
  };
}
