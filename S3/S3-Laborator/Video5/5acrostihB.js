/** Varianta B — concisă, cu `map` + `join`
* Deosebirile dintre 5acrostihA.js și 5acrostihB.js sunt minore,
* dar suficiente pentru a justifica existența ambelor variante în demo-uri didactice.
* Deosebiri:
*    1) în 5acrostihA.js se face pas‑cu‑pas (intermediar), iar aici totul într‑un singur pas
*    2) în 5acrostihA.js se afișează inițialele ca array, apoi ca șir; aici doar ca șir
* La ce ajută?
*    - arată flexibilitatea lui `map` și `join`
*    - arată că există mai multe moduri de a rezolva aceeași problemă
*/




const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];

const acrostic = words.map((w) => w[0]).join("");
console.log(acrostic); // "tqbfjotld"

// => "tqbfjotld"