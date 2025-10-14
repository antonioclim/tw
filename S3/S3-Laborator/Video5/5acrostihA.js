/**
 * Acrostih: extrage prima literă din fiecare cuvânt și formează un nou șir.
 * Explicație:
 *   - folosim `map` pentru a extrage prima literă a fiecărui cuvânt
 *   - rezultatul este un array cu inițialele cuvintelor
 *   - folosim `join` pentru a concatena inițialele într-un singur șir
 * Poate fi util pentru a genera acronime sau coduri scurte (ca parte dintr-o aplicație mai mare):
 *   - generarea de coduri unice pentru elemente (ex: coduri de produse, etichete)
 *   - crearea de acronime pentru titluri sau denumiri lungi
 *   - generarea de identificatori (tip UUID) pentru utilizatori sau entități
 *   - in combinatie cu baze de date sau sisteme de autentificare
 */


const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];

// 1) map -> extragem prima literă a fiecărui cuvânt
const initialsArray = words.map((w) => w[0]);      // ["t","q","b","f","j","o","t","l","d"]
console.log(initialsArray);

// 2) (opțional) join -> un singur șir
const acrostic = initialsArray.join("");           // "tqbfjotld"
console.log(acrostic);

// => "tqbfjotld"