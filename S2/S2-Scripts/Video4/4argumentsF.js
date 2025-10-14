// Varianta F - comparativ cu 4argumentsE.js (tot ES6+, fără modificarea array‑ului — stil funcțional)
// Este o alternativă scurtă, fără mutație, folosind "concat"


const addToArray = (array, ...args) => array.concat(args);
// ...args colectează argumente variabile (rest parameter)

let array = ["a"];                     //a ramas la fel ca in var D si E

console.log(addToArray(array, "b", "c").join(", "));    // Voila:  a, b, c

//COCLUZII (dupa toate variantele A-F):
// 1)Rest vs. spread (...):
//   – Rest parameter strânge argumentele variabile într‑un array: (...args)
//   – Spread „desface” un array în argumente individuale: push(...args) sau construiește un array nou: [...array, ...args].
// 2)Imperativ vs. funcțional:
//   – Imperativ (Variantele B si C): mută array‑ul original (eficient, O(k) timp, O(1) memorie suplimentară).
//   – Funcțional (Varianta 2/3): nu modifică intrarea; creează un nou array (mai sigur semantic, dar cu cost O(n + k)). 

//WHICH ONE TO USE?
//  Alege varianta în funcție de context/constrangeri:
//    – dacă performanța și lipsa alocărilor contează → Varianta B sau C (mutație).
//    – dacă immutabilitatea/predictibilitatea fluxului contează → Variantele D, E sau F.

