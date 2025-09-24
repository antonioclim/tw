import { describe, it, expect } from 'vitest';

function markDone(state, id){
  const s = JSON.parse(JSON.stringify(state));
  s.byLesson[id] = { status:'done', ts: 123 };
  return s;
}
function doneCount(byLesson){
  return Object.values(byLesson).filter(x=>x.status==='done').length;
}

describe('progress slice (logic echivalentă)', ()=>{
  it('markDone setează status done', ()=>{
    const s = { byLesson:{} };
    const r = markDone(s, 101);
    expect(r.byLesson[101].status).toBe('done');
  });
  it('selector doneCount numără corect', ()=>{
    const n = doneCount({ a:{status:'done'}, b:{status:'new'}, c:{status:'done'} });
    expect(n).toBe(2);
  });
});
