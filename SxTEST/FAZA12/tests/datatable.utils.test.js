import { describe, it, expect } from 'vitest';

function sortRows(arr,{key,dir}){
  const s = [...arr].sort((x,y)=> (x[key]<y[key]?-1:x[key]>y[key]?1:0));
  return dir==='asc'? s : s.reverse();
}
function filterRows(arr,{q,lang}){
  return arr.filter(r=> (!q || (r.title+' '+r.lang).toLowerCase().includes(q.toLowerCase())) && (!lang || r.lang===lang));
}
function paginate(arr,{page,perPage}){
  const start = (page-1)*perPage; return arr.slice(start, start+perPage);
}

describe('datatable utils', ()=>{
  const rows = [{id:2,title:'B',lang:'ro',duration:6},{id:1,title:'A',lang:'en',duration:5},{id:3,title:'C',lang:'ro',duration:7}];
  it('sort asc/desc', ()=>{
    expect(sortRows(rows,{key:'id',dir:'asc'})[0].id).toBe(1);
    expect(sortRows(rows,{key:'id',dir:'desc'})[0].id).toBe(3);
  });
  it('filter q + lang', ()=>{
    expect(filterRows(rows,{q:'b',lang:''}).length).toBe(1);
    expect(filterRows(rows,{q:'',lang:'ro'}).length).toBe(2);
  });
  it('paginate works', ()=>{
    expect(paginate([1,2,3,4,5],{page:2,perPage:2})).toEqual([3,4]);
  });
});
