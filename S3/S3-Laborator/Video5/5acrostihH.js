/**
 * Varianta H — doar din doua linii de cod
 * Funcție care primește un array de cuvinte și returnează acronimul    
 * Explicație:
 *   - `words.map((w) => w[0])`: creează un nou array cu prima literă din fiecare cuvânt
 *   - `.join("")`: unește literele într-un singur șir, fără spații între ele
 */

const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
console.log(words.map((w) => w[0]).join("")); 

// => "tqbfjotld"