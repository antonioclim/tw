/**
 * Varianta A — doar transformare cu `map` (listează ariile fiecărui pătrat).
 * Sintaxa ES6 pentru funcții săgeată
 */


const getTotalArea = (squareDimensions) => {
  return squareDimensions.map((side) => {
    return side * side;
  });
};

const squareDimensions = [3, 5, 12, 3, 5, 3];
const result = getTotalArea(squareDimensions);
console.log("result: ", result);


// => [ 9, 25, 144, 9, 25, 9 ]
