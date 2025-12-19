const INITIAL_STATE = {
  bookList: [],
  count: 0,
  error: null,
  fetching: false,
  fetched: false
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
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
        bookList: action.payload.records,
        count: action.payload.count,
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
        error: action.payload,
        fetching: false,
        fetched: true
      };
    default:
      return state;
  }
}
