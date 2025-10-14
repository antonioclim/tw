// Varianta E - comparativ cu 4argumentsD.js (tot ES6+, fără modificarea array‑ului — stil funcțional)
// Este varianta functionala (precedenta este imperative)
// Creează și întoarce un array nou (nu atinge originalul). 
// Este deseori preferat în stil funcțional / cod imutabil [!].


const addToArray = (array, ...args) => [...array, ...args];

let array = ["a"];                     //a ramas la fel ca in var D

const rezultat = addToArray(array, "b", "c");
console.log(rezultat.join(", ")); // a, b, c



//console.log(array.join(", "));    //doar de verificare
