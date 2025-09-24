import { describe, it, expect } from 'vitest'

function sortRows(arr,{key,dir}){ const s=[...arr].sort((a,b)=> a[key]<b[key]?-1:a[key]>b[key]?1:0 ); return dir==='asc'?s:s.reverse(); }
function filterRows(arr,{q,lang,minScore}){ return arr.filter(r => (!q || (r.title+' '+r.lang).toLowerCase().includes(q.toLowerCase())) && (!lang || r.lang===lang) && (r.avgScore>=minScore)); }
function toCSV(rows){ const header=['lessonId','title','lang','duration','avgScore']; const esc=v=>'"'+String(v).replaceAll('"','""')+'"'; return '\ufeff'+header.join(',')+'\n'+rows.map(r=>header.map(h=>esc(r[h])).join(',')).join('\n'); }
function aggregate(lessons, progress){
  const by=new Map(); for(const p of progress){ const l=lessons.find(x=>x.id===p.lessonId); if(!l) continue;
    const rec=by.get(l.id)||{lessonId:l.id,title:l.title,lang:l.lang,duration:l.duration,scores:[]};
    rec.scores.push(p.score); by.set(l.id, rec);
  }
  const rows=[...by.values()].map(r=>({...r,avgScore:Math.round((r.scores.reduce((a,b)=>a+b,0)/r.scores.length)||0)}));
  const totalDuration=rows.reduce((a,b)=>a+b.duration,0); return {rows,totalDuration};
}

describe('sortRows stability on equal keys', ()=>{
  it('keeps relative order when equal', ()=>{
    const arr=[{title:'A',x:1},{title:'B',x:1},{title:'C',x:2}];
    const r=sortRows(arr,{key:'x',dir:'asc'});
    expect(r[0].title).toBe('A'); expect(r[1].title).toBe('B'); // stable-like behaviour by our comparator
  })
})

describe('filterRows combinations', ()=>{
  const base=[{title:'Variabile',lang:'ro',avgScore:80},{title:'HTTP',lang:'en',avgScore:70}];
  it('q + lang + minScore', ()=>{
    let r=filterRows(base,{q:'vari',lang:'',minScore:0}); expect(r.length).toBe(1);
    r=filterRows(base,{q:'',lang:'en',minScore:0}); expect(r.length).toBe(1);
    r=filterRows(base,{q:'',lang:'',minScore:75}); expect(r.length).toBe(1);
  })
})

describe('toCSV BOM + quoting', ()=>{
  it('starts with BOM and quotes values', ()=>{
    const csv = toCSV([{lessonId:1,title:'A,B',lang:'ro',duration:5,avgScore:90}]);
    expect(csv.charCodeAt(0)).toBe(0xFEFF);
    expect(csv.includes('"A,B"')).toBe(true);
  })
})

describe('aggregate edge cases', ()=>{
  it('handles lesson without scores', ()=>{
    const lessons=[{id:1,title:'A',lang:'ro',duration:5},{id:2,title:'B',lang:'en',duration:7}];
    const progress=[{lessonId:1,score:80}];
    const r=aggregate(lessons,progress);
    const b=r.rows.find(x=>x.lessonId===2);
    expect(b).toBeUndefined(); // no row if no scores
  })
})
