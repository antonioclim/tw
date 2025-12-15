const INITIAL_STATE = {
  notes: [],
  error: null,
  fetching: false,
  fetched: false
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_NOTES_PENDING':
    case 'DELETE_NOTE_PENDING':
      return { ...state, error: null, fetching: true, fetched: false }

    case 'GET_NOTES_FULFILLED':
    case 'DELETE_NOTE_FULFILLED':
      // the server returns the *full* updated list
      return { ...state, notes: action.payload, error: null, fetching: false, fetched: true }

    case 'GET_NOTES_REJECTED':
    case 'DELETE_NOTE_REJECTED':
      return { ...state, error: action.payload, fetching: false, fetched: false }

    default:
      return state
  }
}
