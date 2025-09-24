import { configureStore, createSlice, createSelector } from '@reduxjs/toolkit'
const LS_KEY='minilearn_f8'; const load=()=>{try{return JSON.parse(localStorage.getItem(LS_KEY)||'{}')}catch{return{}}}; const save=s=>{try{localStorage.setItem(LS_KEY,JSON.stringify(s))}catch{}};
const prefs=createSlice({name:'prefs',initialState:{lang:'ro',theme:'dark'},reducers:{setLang:(s,a)=>{s.lang=a.payload},toggleTheme:(s)=>{s.theme=s.theme==='dark'?'light':'dark'}}});
const progress=createSlice({name:'progress',initialState:{byLesson:{}},reducers:{markDone:(s,a)=>{const id=a.payload; s.byLesson[id]={status:'done',ts:Date.now()}},reset:(s)=>{s.byLesson={}}}});
export const store=configureStore({reducer:{prefs:prefs.reducer,progress:progress.reducer},preloadedState:load()}); store.subscribe(()=>save(store.getState()));
export const actions={...prefs.actions,...progress.actions}; export const selectLang=s=>s.prefs.lang; export const selectTheme=s=>s.prefs.theme;
export const selectDoneCount=createSelector(s=>s.progress.byLesson, m=>Object.values(m).filter(x=>x.status==='done').length);
