const INITIAL_STATE = {
  notes: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] }

    case 'DELETE_NOTE':
      // Delete by note.id (stable identifier), not by array index.
      return { ...state, notes: state.notes.filter((n) => n.id !== action.payload) }

    default:
      return state
  }
}
