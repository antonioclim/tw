// NOTE: On Windows, some browsers (notably Firefox) may prefer IPv6 for `localhost`.
// If the API is bound to IPv4, `http://localhost:8080` can intermittently fail.
// Using 127.0.0.1 is the most robust default.
// You can override from the environment (Vite): VITE_API_BASE=http://localhost:8080
const SERVER = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8080'

export function getNotes() {
  return {
    type: 'GET_NOTES',
    payload: fetch(`${SERVER}/notes`).then((r) => {
      if (!r.ok) throw new Error(`GET /notes failed: ${r.status}`)
      return r.json()
    })
  }
}

export function deleteNote(id) {
  return {
    type: 'DELETE_NOTE',
    payload: fetch(`${SERVER}/notes/${id}`, { method: 'DELETE' }).then((r) => {
      if (!r.ok) throw new Error(`DELETE /notes/${id} failed: ${r.status}`)
      return r.json()
    })
  }
}
