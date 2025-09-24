import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Lessons(){
  const { id } = useParams()
  const [data, setData] = useState([])

  useEffect(()=>{
    fetch(`/api/courses/${id}/lessons`).then(r=>r.json()).then(setData).catch(console.error)
  },[id])

  return (
    <section>
      <h2>Lecții pentru curs {id}</h2>
      <ul>
        {data.map(l => (
          <li key={l.id}>
            <details>
              <summary>{l.title} ({l.lang}, {l.duration}m)</summary>
              <div dangerouslySetInnerHTML={{__html: l.html || '<p>Conținut…</p>'}} />
            </details>
          </li>
        ))}
      </ul>
      <p><Link to="/courses">← Înapoi</Link></p>
    </section>
  )
}
