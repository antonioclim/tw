/** Varianta C — cu inițiale litere mari */

const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];

const acrosticUpper = words
  .map((w) => w[0].toUpperCase())
  .join("");
console.log(acrosticUpper); 


// => "TQBFJOTLD"