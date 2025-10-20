/**
*3 - Urmăriți videoclipul S4v3.mp4 pentru a vedea cum se implementează un closure pentru memoizarea rezultatelor unei funcții. 
* După ce ați testat exemplul, implementați o variantă recursiva a unei funcții de exponențiere. 
* Atât rezultatele finale cât și cele intermediare vor fi memoizate.
*
*/


function fibGen () {
  const cache = [1, 1]
  const fib = (index) => {
    if (index < cache.length) {
      console.log('found ' + index)
      return cache[index]
    } else {
      console.log('calculated ' + index)
      cache[index] = fib(index - 1) + fib(index - 2)
      return cache[index]
    }
  }

  return fib
}

const fib = fibGen()
console.log(fib(1))
console.log(fib(5))
console.log(fib(3))
