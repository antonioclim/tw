import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Lesson(){
  const { id } = useParams()
  const [html,setHtml] = useState('<p>Loading...</p>')
  useEffect(()=>{ setHtml(`<h2>Lecție #${id}</h2><p>Conținut mock demonstrativ.</p>`) },[id])
  return <div className="card">
    <div dangerouslySetInnerHTML={{__html: html}}/>
    <p><Link to="/courses">← Înapoi la cursuri</Link></p>
  </div>
}
