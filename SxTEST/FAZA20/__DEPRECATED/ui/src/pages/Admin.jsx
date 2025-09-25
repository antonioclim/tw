import React, { useState } from "react";
export default function Admin(){
  const [title,setTitle]=useState(""); const [lang,setLang]=useState("ro"); const [summary,setSummary]=useState(""); const [msg,setMsg]=useState("");
  async function create(){
    setMsg("...");
    try{
      const r = await fetch("/api/courses",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ title, lang, summary }) });
      const t = await r.text(); if(!r.ok) throw new Error(t);
      setMsg("Creat!"); setTitle(""); setSummary("");
    }catch(e){ setMsg("Eroare: "+e.message); }
  }
  return <div className="card">
    <h2>Admin â€“ Curs nou</h2>
    <div className="controls">
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
      <select value={lang} onChange={e=>setLang(e.target.value)}><option>ro</option><option>en</option></select>
      <input placeholder="Summary" value={summary} onChange={e=>setSummary(e.target.value)} style={{minWidth:"18rem"}}/>
      <button onClick={create}>CreeazÄƒ</button> <span>{msg}</span>
    </div>
  </div>;
}
