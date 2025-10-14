/**
 * Varianta D — `reduce` fără valoare inițială (funcționează doar pe vector ne‑vid).
 * Sintaxa ES6 pentru funcții săgeată
 * Atenție: pe [] ar arunca eroare — în cod real preferați varianta cu „, 0”.
 * De exemplu, dacă inputul ar fi fost []
 *  const squareDimensions = [];
 * atunci ar fi apărut eroarea: TypeError: Reduce of empty array with no initial value
 * Dar cu , 0 adica reduce((prev, current) => prev + current, 0) ar fi returnat 0.
 */



const getTotalArea = (squareDimensions) =>
  squareDimensions
    .map((side) => side * side)
    .reduce((prev, current) => prev + current); // ideal ar tb. să fie , prev + current, 0 pt. cazul []

const squareDimensions = [3, 5, 12, 3, 5, 3];
const result = getTotalArea(squareDimensions);
console.log("result: ", result);


// => 221