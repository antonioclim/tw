import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import fs from 'node:fs';
import path from 'node:path';
import app from '../server/index.js';

const DB = path.join(path.dirname(new URL(import.meta.url).pathname), '../server/lessons.json');

function readDB(){
  return JSON.parse(fs.readFileSync(DB, 'utf-8'));
}
function writeDB(data){
  fs.writeFileSync(DB, JSON.stringify(data, null, 2), 'utf-8');
}

describe('FAZA5 CRUD', ()=>{
  beforeAll(()=>{
    // reset DB to a known state
    writeDB([
      { id: 101, courseId: 1, title: "Intro", lang:"ro", duration:8 },
      { id: 102, courseId: 1, title: "Scope", lang:"ro", duration:10 }
    ]);
  });

  it('list lessons', async ()=>{
    const r = await request(app).get('/api/lessons');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
    expect(r.body.length).toBeGreaterThan(0);
  });

  it('create lesson', async ()=>{
    const r = await request(app).post('/api/lessons').send({ courseId: 1, title: "Nouă", lang:"ro", duration:9 });
    expect(r.status).toBe(201);
    expect(r.body).toHaveProperty('id');
  });

  it('update lesson', async ()=>{
    const r = await request(app).put('/api/lessons/101').send({ title: "Intro (revizuită)" });
    expect(r.status).toBe(200);
    expect(r.body.title).toContain("revizuită");
  });

  it('delete lesson', async ()=>{
    const r = await request(app).delete('/api/lessons/102');
    expect(r.status).toBe(200);
    const db = readDB();
    expect(db.find(x=>x.id===102)).toBeUndefined();
  });
});
