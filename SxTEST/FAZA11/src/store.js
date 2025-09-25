import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit'

// Persist partial (prefs only)
const LS='f11_state'
const load = ()=> { try{ return JSON.parse(localStorage.getItem(LS)||'{}') }catch{ return {} } }
const save = (state)=> { try{ localStorage.setItem(LS, JSON.stringify({ prefs: state.prefs })) }catch{} }

const prefs = createSlice({
  name:'prefs',
  initialState:{ lang:'ro', theme:'dark' },
  reducers:{
    setLang:(s,a)=>{ s.lang=a.payload },
    toggleTheme:(s)=>{ s.theme=s.theme==='dark'?'light':'dark' }
  }
})

const progress = createSlice({
  name:'progress',
  initialState:{ byLesson:{}, attempts:[] },
  reducers:{
    mark:(s,a)=>{ const {id,score}=a.payload; s.byLesson[id]={ status:'done', score }; s.attempts.push({id,score,ts:Date.now()}); },
    reset:(s)=>{ s.byLesson={}; s.attempts=[]; }
  }
})

export const store = configureStore({
  reducer:{ prefs: prefs.reducer, progress: progress.reducer },
  preloadedState: load()
})
store.subscribe(()=> save(store.getState()))

// Advanced selectors
export const selectAttempts = s => s.progress.attempts
export const selectAvgScore = createSelector(selectAttempts, atts => {
  if(!atts.length) return 0
  return Math.round(atts.reduce((a,b)=>a+b.score,0)/atts.length)
})
export const selectTopK = k => createSelector(selectAttempts, atts => {
  return [...atts].sort((a,b)=> b.score - a.score).slice(0,k)
})

export const actions = { ...prefs.actions, ...progress.actions }
