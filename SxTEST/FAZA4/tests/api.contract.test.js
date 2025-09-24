import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server/index.js';

describe('FAZA4 API', ()=>{
  it('health ok', async ()=>{
    const r = await request(app).get('/api/health');
    expect(r.status).toBe(200);
    expect(r.body).toHaveProperty('status','ok');
  });
  it('courses valid', async ()=>{
    const r = await request(app).get('/api/courses');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
    expect(r.body[0]).toHaveProperty('id');
    expect(['ro','en']).toContain(r.body[0].lang);
  });
  it('lessons by course id valid', async ()=>{
    const r = await request(app).get('/api/courses/1/lessons');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
    if(r.body.length){
      expect(r.body[0]).toHaveProperty('courseId',1);
    }
  });
});
