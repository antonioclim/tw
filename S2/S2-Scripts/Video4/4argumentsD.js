// Varianta D - comparativ cu 4argumentsC.js (ES6+, modifică array‑ul primit; cea mai scurtă/eleganta varianta)
// Ramane imperative (vedem varianta functionala in variatiune E)
// Este echivalentă logic cu for‑ul initial: adaugă toate argumentele în același array și îl întoarce updatat.
// Folosește Array.prototype.push cu spread și o funcție arrow pe o singură linie:
// 2–3 linii, în loc de for + if:

const addToArray = (array, ...args) => (array.push(...args), array);
// ...args colectează argumente variabile (rest parameter)
// array.push(...args) inserează toate elementele dintr‑un foc (O(k))
// Expresia (..., array) folosește operatorul virgulă pentru a returna array după push,
//          deci semantica rămâne identică versiunii tale imperative (mutație in place).
// Variatiune: daca preferi să eviți operatorul virgulă (pentru lizibilitate):
//const addToArray = (array, ...args) => { array.push(...args); return array; };


let array = ["a"];
console.log(addToArray(array, "b", "c").join(", ")); // a, b, c
//console.log(array.join(", "));                       // a, b, c  (confirmă că e același array)
