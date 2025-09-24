import { describe, it, expect } from 'vitest';
// test utilitar simplu (no DOM)
function matchLessonPath(hash){ const m = hash.match(/^#\/(lesson)\/(\d+)/); return m?{type:m[1], id:Number(m[2])}:null; }
describe('route helper', ()=>{
  it('recunoaște #/lesson/:id', ()=>{
    expect(matchLessonPath('#/lesson/42').id).toBe(42);
    expect(matchLessonPath('#/courses')).toBe(null);
  });
});