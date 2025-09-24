import { describe, it, expect } from 'vitest';

function aggregate(lessons, progress){
  const byLesson = new Map();
  for(const p of progress){
    const l = lessons.find(x=>x.id===p.lessonId);
    if(!l) continue;
    const rec = byLesson.get(l.id) || { title:l.title, lang:l.lang, duration:l.duration, scores:[] };
    rec.scores.push(p.score);
    byLesson.set(l.id, rec);
  }
  const rows = [...byLesson.entries()].map(([id,rec])=>{
    const avg = rec.scores.reduce((a,b)=>a+b,0)/rec.scores.length;
    return { lessonId:id, title:rec.title, lang:rec.lang, duration:rec.duration, avgScore:Math.round(avg) };
  });
  const totalDuration = rows.reduce((a,b)=>a+b.duration,0);
  return { rows, totalDuration };
}

function toCSV(rows){
  const header = ['lessonId','title','lang','duration','avgScore'];
  const escape = (v)=> `"${String(v).replace(/"/g,'""')}"`;
  return [header.join(','), ...rows.map(r=> header.map(h=>escape(r[h])).join(','))].join('\n');
}

describe('aggregate & toCSV', ()=>{
  const lessons = [{id:1,title:'A',lang:'ro',duration:5},{id:2,title:'B',lang:'en',duration:7}];
  const progress = [{user:'u1',lessonId:1,score:80},{user:'u2',lessonId:1,score:100},{user:'u1',lessonId:2,score:70}];
  it('aggregă medii și total durată', ()=>{
    const r = aggregate(lessons, progress);
    expect(r.rows.length).toBe(2);
    const a = r.rows.find(x=>x.lessonId===1);
    expect(a.avgScore).toBe(90);
    expect(r.totalDuration).toBe(12);
  });
  it('CSV are header și rânduri egale cu numărul de items', ()=>{
    const csv = toCSV([{lessonId:1,title:'A',lang:'ro',duration:5,avgScore:90}]);
    const lines = csv.split('\n');
    expect(lines.length).toBe(2);
    expect(lines[0].split(',').length).toBe(5);
  });
});
