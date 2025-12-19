const INITIAL_STATE = {
  bookList: [],
  count: 0,

  // Stare pentru operaţiile de date (DataTable)
  error: null,
  fetching: false,
  fetched: false,

  // Stare pentru statistici (grafice)
  stats: null,
  statsError: null,
  statsFetching: false,
  statsFetched: false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // --- cereri pentru listă (CRUD + reîncărcare) ---
    case 'GET_BOOKS_PENDING':
    case 'ADD_BOOK_PENDING':
    case 'SAVE_BOOK_PENDING':
    case 'DELETE_BOOK_PENDING':
      return { ...state, error: null, fetching: true, fetched: false };

    case 'GET_BOOKS_FULFILLED':
    case 'ADD_BOOK_FULFILLED':
    case 'SAVE_BOOK_FULFILLED':
    case 'DELETE_BOOK_FULFILLED':
      return {
        ...state,
        bookList: action.payload?.records ?? [],
        count: action.payload?.count ?? 0,
        error: null,
        fetching: false,
        fetched: true
      };

    case 'GET_BOOKS_REJECTED':
    case 'ADD_BOOK_REJECTED':
    case 'SAVE_BOOK_REJECTED':
    case 'DELETE_BOOK_REJECTED':
      return {
        ...state,
        bookList: [],
        count: 0,
        error: action.payload,
        fetching: false,
        fetched: true
      };

    // --- cereri pentru statistici (grafice) ---
    case 'GET_STATS_PENDING':
      return { ...state, statsError: null, statsFetching: true, statsFetched: false };

    case 'GET_STATS_FULFILLED':
      return { ...state, stats: action.payload, statsError: null, statsFetching: false, statsFetched: true };

    case 'GET_STATS_REJECTED':
      return { ...state, stats: null, statsError: action.payload, statsFetching: false, statsFetched: true };

    default:
      return state;
  }
}
