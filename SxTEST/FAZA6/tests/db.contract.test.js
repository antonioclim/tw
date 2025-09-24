import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app, { Course } from '../server/index.js';

describe('FAZA6 DB API', ()=>{
  it('courses list ok', async ()=>{
    const r = await request(app).get('/api/courses');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
  it('create course ok', async ()=>{
    const r = await request(app).post('/api/courses').send({ title:'Test', lang:'ro', summary:'S' });
    expect(r.status).toBe(201);
    expect(r.body).toHaveProperty('id');
  });
});
