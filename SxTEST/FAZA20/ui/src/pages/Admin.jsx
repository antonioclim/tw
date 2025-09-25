import React, { useState } from "react";

export default function Admin(){
  const [title,setTitle]=useState("");
  const [lang,setLang]=useState("ro");
  const [summary,setSummary]=useState("");
  const [msg,setMsg]=useState("");

  async function create(){
    const T = title.trim(), S = summary.trim();
    if(!T){ setMsg("Eroare: titlul nu poate fi gol."); return; }
    setMsg("Se trimite…");
    try{
      const r = await fetch("/api/courses",{
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ title:T, lang, summary:S })
      });
      const text = await r.text();
      if(!r.ok) throw new Error(text);
      setMsg("Creat!"); setTitle(""); setSummary("");
    }catch(e){ setMsg("Eroare: "+e.message); }
  }

  return (
    <div className="card">
      <h2>{"Admin – Curs nou"}</h2>
      <div className="controls">
        <input placeholder="Title"   value={title}   onChange={e=>setTitle(e.target.value)} />
        <select value={lang} onChange={e=>setLang(e.target.value)}><option>ro</option><option>en</option></select>
        <input placeholder="Summary" value={summary} onChange={e=>setSummary(e.target.value)} style={{minWidth:"18rem"}}/>
        <button onClick={create}>{"Creează"}</button> <span>{msg}</span>
      </div>
    </div>
  );
}
