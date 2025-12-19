const INITIAL_STATE = {
  bookList: [],
  error: null,
  fetching: false,
  fetched: false,
};

export default function bookReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_BOOKS_PENDING':
      return { ...state, error: null, fetching: true, fetched: false };
    case 'GET_BOOKS_FULFILLED':
      return { ...state, bookList: action.payload, fetching: false, fetched: true };
    case 'GET_BOOKS_REJECTED':
      return { ...state, error: action.payload, fetching: false, fetched: false };

    // Componenta reîncarcă lista după ADD/SAVE reuşit, deci nu actualizăm bookList direct aici.
    case 'ADD_BOOK_PENDING':
    case 'SAVE_BOOK_PENDING':
      return { ...state, error: null };
    case 'ADD_BOOK_REJECTED':
    case 'SAVE_BOOK_REJECTED':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
