/** Varianta D — fără cuvinte de legătură 
 *  Poate fi util pentru acronime (ex. NATO, UNESCO, etc.)
 *  Pot fi extinse cu alte cuvinte de legătură (ex. în, și, cu, de, la, pe, pentru, etc.)
 *  Sau chiar cu semne de punctuație (ex. ,, ., !, ?, ;, :, -, _, etc.)
*/



const words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
const stopwords = new Set(["the","a","an"]);

const acrosticNoStops = words
  .filter((w) => !stopwords.has(w.toLowerCase()))
  .map((w) => w[0])
  .join("");

console.log(acrosticNoStops); 
// =>  "qbfjotld"