/**
 * Varianta A — direct în `console.log`: sample.map(x => x * 2)
 * Exemplu simplu de funcție săgeată concisă.
 * Explicatie:
 *   - fără acolade, deci o singură expresie
 *   - valoarea expresiei este returnată implicit
 */

// "use strict";
const sample = [1, 2, 3, 4, 5];
console.log(sample.map((x) => x * 2));

// => [ 2, 4, 6, 8, 10 ]