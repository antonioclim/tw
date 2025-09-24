import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Courses(){
  const [data, setData] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{
    fetch('/api/courses').then(r=>r.json()).then(setData).catch(console.error)
  },[])

  const list = data.filter(c => (c.title+' '+c.lang).toLowerCase().includes(q.toLowerCase()))

  return (
    <section>
      <h2>Cursuri</h2>
      <input
        placeholder="Caută…"
        value={q}
        onChange={e=>setQ(e.target.value)}
        style={{background:'#121a38', color:'#e6e9ef', border:'1px solid #2e3a66', borderRadius:6, padding:8}}
      />
      <ul>
        {list.map(c => (
          <li key={c.id}>
            <Link to={`/course/${c.id}`}>{c.title} [{c.lang}] — {c.lessons} lessons</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
