export function addNote(content) {
  return {
    type: 'ADD_NOTE',
    payload: content
  }
}

export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    payload: id
  }
}
