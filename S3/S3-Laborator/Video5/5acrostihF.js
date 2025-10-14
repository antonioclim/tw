/**
 * Funcție pură: primește o listă de cuvinte și întoarce acrostihul.
 */
function acrosticFromWords(words) {
  return words.map((w) => w[0]).join("");
}

const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
console.log(acrosticFromWords(words));

// => "tqbfjotld"