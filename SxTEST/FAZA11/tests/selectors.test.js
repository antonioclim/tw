import { describe, it, expect } from 'vitest'

function avg(arr){ return arr.length? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0 }
function topK(arr,k){ return [...arr].sort((a,b)=>b-a).slice(0,k) }

describe('avg & topK', ()=>{
  it('avg rotunjește', ()=>{ expect(avg([80,95])).toBe(88); expect(avg([])).toBe(0) })
  it('topK desc', ()=>{ expect(topK([1,9,5,7],2)).toEqual([9,7]) })
})
