import { configureStore, createSlice, createSelector } from "@reduxjs/toolkit";
const LS="ml_prefs";
const load = ()=> { try{ return JSON.parse(localStorage.getItem(LS)||"{}") }catch{ return {} } };
const save = (s)=> { try{ localStorage.setItem(LS, JSON.stringify({ prefs: s.prefs })) }catch{} };

const prefs = createSlice({
  name:"prefs", initialState:{ lang:"ro", theme:"dark" },
  reducers:{ setLang:(s,a)=>{ s.lang=a.payload }, toggleTheme:(s)=>{ s.theme=s.theme==="dark"?"light":"dark" } }
});
const progress = createSlice({
  name:"progress", initialState:{ byLesson:{}, attempts:[] },
  reducers:{
    mark:(s,a)=>{ const {id,score}=a.payload; s.byLesson[id]={status:"done",score}; s.attempts.push({id,score,ts:Date.now()}); },
    reset:(s)=>{ s.byLesson={}; s.attempts=[]; }
  }
});

export const store = configureStore({ reducer:{ prefs:prefs.reducer, progress:progress.reducer }, preloadedState: load() });
store.subscribe(()=> save(store.getState()));
export const actions = { ...prefs.actions, ...progress.actions };

// selectors
export const selectAttempts = s=> s.progress.attempts;
export const selectAvgScore = createSelector(selectAttempts, A=> A.length? Math.round(A.reduce((a,b)=>a+b.score,0)/A.length):0);
export const selectTopK = k => createSelector(selectAttempts, A=> [...A].sort((x,y)=>y.score-x.score).slice(0,k));
