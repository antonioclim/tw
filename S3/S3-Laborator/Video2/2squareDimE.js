/**
 * Varianta E (opțional) — igienă minimă a datelor (convertire la număr + filtrare finite),
 * apoi `map` + `reduce`.
 * Exemple:
 *  - set curat:        [3, 5, 12, 3, 5, 3]         -> 221
 *  - set „murdar”:     [3, "5", 12, null, 3, 5, 3] -> 221 (null -> 0; totalul rămâne 221)
 * Acesta este o variantă robustă, care poate prelucra și date „murdare”!!!
 */
const getTotalAreaSafe = (squareDimensions) =>
  squareDimensions
    .map(Number)               // conversie numerică
    .filter(Number.isFinite)   // elimină NaN / ±Infinity (păstrează 0)
    .map((side) => side * side)
    .reduce((sum, a) => sum + a, 0);

// Demonstrație:
const clean = [3, 5, 12, 3, 5, 3];
const dirty = [3, "5", 12, null, 3, 5, 3];

console.log("result clean: ", getTotalAreaSafe(clean)); // 221
console.log("result dirty: ", getTotalAreaSafe(dirty)); // 221

// Exemplu cu set vid:
// console.log("result empty: ", getTotalAreaSafe([]));     // 0