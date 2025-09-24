import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, selectLang, selectTheme, selectDoneCount } from '../store.js'
const lessons=[{id:101,title:'Variabile',lang:'ro'},{id:102,title:'Funcții',lang:'ro'},{id:201,title:'HTTP',lang:'en'}];
function Controls(){const d=useDispatch(); const lang=useSelector(selectLang); const theme=useSelector(selectTheme); const done=useSelector(selectDoneCount);
  return(<div className="card"><h2>Preferințe & progres</h2><p>Lecții finalizate: {done}</p>
    <label>Limbă: <select value={lang} onChange={e=>d(actions.setLang(e.target.value))}><option value="ro">ro</option><option value="en">en</option></select></label>{' '}
    <button onClick={()=>d(actions.toggleTheme())}>Comută tema ({theme})</button>{' '}
    <button onClick={()=>d(actions.reset())}>Reset progres</button></div>)}
function LessonList(){const d=useDispatch(); const lang=useSelector(selectLang); const list=lessons.filter(l=>!lang||l.lang===lang);
  return(<div className="card"><h2>Lecții</h2><ul>{list.map(l=>(<li key={l.id}>{l.title} [{l.lang}] <button onClick={()=>d(actions.markDone(l.id))}>Marchează finalizat</button></li>))}</ul></div>)}
export default function App(){return(<><header><h1>SxTEST — FAZA8</h1></header><main><Controls/><LessonList/></main></>)}
