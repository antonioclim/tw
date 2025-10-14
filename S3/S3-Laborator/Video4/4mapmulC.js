/**
 * Varianta C — map într-o variabilă intermediară, apoi afișare
 * (același efect, dar mai ușor de inspectat - debugging)
 * Explicație:
 *   - folosim `sample.map(...)` pentru a crea un nou array cu valorile dublate
 *   - rezultatul este stocat în variabila `doubled`
 *   - apoi afișăm conținutul lui `doubled`
 */


const sample = [1, 2, 3, 4, 5];
const doubled = sample.map((x) => x * 2);
console.log(doubled);

// => [ 2, 4, 6, 8, 10 ]