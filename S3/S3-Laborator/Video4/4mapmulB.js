/**
 * Varianta B — funcție ajutătoare `double` și apoi `sample.map(double)`
 * (aceeași logică; dar ceva mai lizibil în demouri didactice)
 * Explicație:
 *   - funcția `double` primește un număr și returnează dublul său
 *   - `sample.map(double)` aplică funcția `double` fiecărui element din array
 *   - rezultatul este un nou array cu valorile dublate
 */


const sample = [1, 2, 3, 4, 5];
const double = (x) => { return x * 2; };
console.log(sample.map(double));


// => [ 2, 4, 6, 8, 10 ]