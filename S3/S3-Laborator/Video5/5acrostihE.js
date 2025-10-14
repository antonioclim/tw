// Varianta E se deosebeste de D prin faptul ca extrage cuvintele dintr-un text liber, nu dintr-un array predefinit
/** Varianta E — din text liber, fără cuvinte de legătură
 * Explicație:
 *   - /[^A-Za-z]+/: expresie regulată care găsește orice secvență de caractere care nu sunt litere
 */

const raw = "the quick brown fox, jumps over the 33 lazy dogs";
const words = raw
  .split(/[^A-Za-z]+/)           // separăm prin orice nu‑e literă
  .map((w) => w.trim())
  .filter((w) => w.length > 0);

const acrostic = words.map((w) => w[0]).join("");
console.log(acrostic); 

// => "tqbfjotld"