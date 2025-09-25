import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions, selectAvgScore, selectTopK } from './store.js'

function Histogram({ attempts }){
  const W=520, H=160, pad=24
  const bins = new Array(10).fill(0)
  attempts.forEach(a => { const idx=Math.max(0,Math.min(9,Math.floor((a.score||0)/10))); bins[idx]++ })
  const max = Math.max(1, ...bins)
  const bw = Math.floor((W-2*pad)/bins.length)
  const bars = bins.map((v,i)=>{
    const h = Math.round((v/max)*(H-2*pad))
    const x = pad + i*bw
    const y = H - pad - h
    return `<rect x='${x}' y='${y}' width='${bw-2}' height='${h}' rx='3'></rect>
            <text x='${x + Math.floor(bw/2)}' y='${H-6}' class='bar-label'>${i*10}</text>`
  }).join('')
  return <div className="chart" dangerouslySetInnerHTML={{__html: `<svg viewBox='0 0 ${W} ${H}' width='100%' height='100%'>${bars}</svg>`}}/>
}

export default function App(){
  const dispatch = useDispatch()
  const avg = useSelector(selectAvgScore)
  const top = useSelector(selectTopK(5))
  const prefs = useSelector(s => s.prefs)
  const attempts = useSelector(s => s.progress.attempts)

  const toggleTheme = ()=> dispatch(actions.toggleTheme())
  const setLang = e => dispatch(actions.setLang(e.target.value))

  return (
    <>
      <header className={prefs.theme==='light'?'light':''}>
        <h1>SxTEST — FAZA11</h1>
      </header>
      <main className={prefs.theme==='light'?'light':''}>
        <div className="card">
          <h2>Redux Toolkit (persist parțial & selectors)</h2>

          <div className="controls">
            <label>Limba:&nbsp;
              <select value={prefs.lang} onChange={setLang}>
                <option value="ro">ro</option>
                <option value="en">en</option>
              </select>
            </label>
            <button onClick={toggleTheme}>Comută tema ({prefs.theme})</button>
          </div>

          <p>Scor mediu: <b>{avg}</b></p>
          <div className="controls">
            <button onClick={()=> dispatch(actions.mark({id:101,score:80}))}>Mark 101:80</button>
            <button onClick={()=> dispatch(actions.mark({id:102,score:95}))}>Mark 102:95</button>
            <button onClick={()=> dispatch(actions.reset())}>Reset</button>
          </div>

          <h3>Top 5 scoruri</h3>
          <pre>{JSON.stringify(top, null, 2)}</pre>

          <h3>Distribuția scorurilor (histogramă)</h3>
          <Histogram attempts={attempts}/>
          <p className="hint">Barele marchează praguri 0,10,20,…,90; înălțimea este frecvența.</p>
        </div>
      </main>
    </>
  )
}
