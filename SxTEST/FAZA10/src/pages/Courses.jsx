import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Courses(){
  const [data,setData] = useState([])
  const [q,setQ] = useState('')
  useEffect(()=>{
    setData([
      {id:1,title:'JS Basics',lang:'ro',lessons:2},
      {id:2,title:'HTTP & REST',lang:'en',lessons:1},
      {id:3,title:'Modules',lang:'ro',lessons:3}
    ])
  },[])
  const list = data.filter(c => (c.title+' '+c.lang).toLowerCase().includes(q.toLowerCase()))
  return <div className="card">
    <h2>Cursuri</h2>
    <input placeholder="Caută..." value={q} onChange={e=>setQ(e.target.value)}/>
    <table><thead><tr><th>Title</th><th>Lang</th><th>Lessons</th></tr></thead>
      <tbody>{list.map(c=> <tr key={c.id}>
        <td><Link to={`/lesson/${c.id}`}>{c.title}</Link></td><td>{c.lang}</td><td>{c.lessons}</td>
      </tr>)}</tbody>
    </table>
  </div>
}
