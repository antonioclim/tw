/**
* 4 - Urmăriți următorul videoclip S4v4 pentru a vedea cum se poate atașa o metodă la prototipul unui tip existent. 
* După ce ați testat exemplul:
* TEMA: implementați metoda 'times' pe tipul Number, astfel încât 3.times(() => {}) să execute funcția de 3 ori.
*
*/

String.prototype.capitalizeWords = function() {
  return this.replace(/\b[a-z]/g, match => match.toUpperCase());
}

console.log("this words will be capitalized.".capitalizeWords());
