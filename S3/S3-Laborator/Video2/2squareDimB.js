/**
 * Varianta B — `map` + `reduce` (suma ariilor).
 * Sintaxa ES6 pentru funcții săgeată
 */


const getTotalArea = (squareDimensions) => {
  return squareDimensions
    .map((side) => {
      return side * side;
    })
    .reduce((prev, current) => {
      return prev + current;
    }, 0);
};

const squareDimensions = [3, 5, 12, 3, 5, 3];
const result = getTotalArea(squareDimensions);
console.log("result: ", result);


// => 221