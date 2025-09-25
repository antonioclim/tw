import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store.js";

export default function Prefs(){
  const dispatch = useDispatch();
  const prefs = useSelector(s=> s.prefs);
  return (
    <div className="card">
      <h2>{"Preferințe"}</h2>
      <div className="controls">
        <label>{"Limba: "}
          <select value={prefs.lang} onChange={e=> dispatch(actions.setLang(e.target.value))}>
            <option>ro</option><option>en</option>
          </select>
        </label>
        <button onClick={()=> dispatch(actions.toggleTheme())}>
          {`Comută tema (${prefs.theme})`}
        </button>
      </div>
      <pre>{JSON.stringify(prefs,null,2)}</pre>
    </div>
  );
}
