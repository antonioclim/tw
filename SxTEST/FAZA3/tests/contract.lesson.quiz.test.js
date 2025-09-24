import { describe, it, expect } from 'vitest';

const lesson = { id:101, title:'T', html:'<p>x</p>', duration:8, lang:'ro' };
const quiz = { lessonId:101, items:[ {id:'q1', type:'single', options:['a','b'], correct:[1], feedback:['fa','fb']} ] };

describe('contract lesson', ()=>{
  it('are câmpuri cerute', ()=>{
    expect(lesson).toHaveProperty('id');
    expect(lesson).toHaveProperty('title');
    expect(lesson).toHaveProperty('html');
    expect(typeof lesson.duration).toBe('number');
    expect(['ro','en']).toContain(lesson.lang);
  });
});
describe('contract quiz', ()=>{
  it('are câmpuri cerute', ()=>{
    expect(quiz).toHaveProperty('lessonId');
    expect(Array.isArray(quiz.items)).toBe(true);
  });
  it('item single are opțiuni și răspuns corect', ()=>{
    const it = quiz.items[0];
    expect(it.type).toBe('single');
    expect(Array.isArray(it.options)).toBe(true);
    expect(Array.isArray(it.correct)).toBe(true);
  });
});
