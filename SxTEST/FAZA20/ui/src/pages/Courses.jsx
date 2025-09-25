import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses(){
  const [data,setData] = useState([]);
  const [q,setQ] = useState("");
  const [lang,setLang] = useState("");
  const [sort,setSort] = useState({ key:"title", dir:"asc" });

  async function load(){
    try{ const r = await fetch("/api/courses"); if(!r.ok) throw 0; setData(await r.json()); }
    catch{ setData([]); }
  }
  useEffect(()=>{ load(); },[]);

  const filtered = data.filter(c =>
    (!q || c.title.toLowerCase().includes(q.toLowerCase())) &&
    (!lang || c.lang === lang)
  );
  const sorted = [...filtered].sort((a,b)=> a[sort.key]<b[sort.key]?-1:a[sort.key]>b[sort.key]?1:0);
  const rows = sort.dir==="asc" ? sorted : sorted.reverse();

  return (
    <div className="card">
      <h2>{"Cursuri"}</h2>
      <div className="controls">
        <input placeholder={"Caută…"} value={q} onChange={e=>setQ(e.target.value)} />
        <select value={lang} onChange={e=>setLang(e.target.value)}>
          <option value="">(toate)</option><option>ro</option><option>en</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={()=> setSort({key:"title", dir: sort.key==="title" && sort.dir==="asc" ? "desc":"asc"})}>{"Title"}</th>
            <th onClick={()=> setSort({key:"lang",  dir: sort.key==="lang"  && sort.dir==="asc" ? "desc":"asc"})}>{"Lang"}</th>
            <th>{"→"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(c =>
            <tr key={c.id}>
              <td>{c.title}</td><td>{c.lang}</td>
              <td><Link to={`/lesson/${c.id}`}>{"lecții »"}</Link></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
