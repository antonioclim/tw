import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Lesson(){
  const { id } = useParams();
  const [data,setData] = useState([]);

  useEffect(()=>{ (async()=>{
    try{ const r = await fetch(`/api/courses/${id}/lessons`); if(!r.ok) throw 0; setData(await r.json()); }
    catch{ setData([]); }
  })() },[id]);

  return (
    <div className="card">
      <h2>{`Lecții pentru curs ${id}`}</h2>
      {data.length===0? <p>{"(fără lecții sau API indisponibil)"}</p> :
        <table>
          <thead><tr><th>{"Title"}</th><th>{"Lang"}</th><th>{"Duration"}</th></tr></thead>
          <tbody>{data.map(l=> <tr key={l.id}><td>{l.title}</td><td>{l.lang}</td><td>{l.duration}</td></tr>)}</tbody>
        </table>
      }
      <p><Link to="/courses">{"← Înapoi"}</Link></p>
    </div>
  );
}
