// variatiune din B - Variantă E — inline (fără helper), exact ca porțiunea de final din fișier
// Sintaxa ES6 pentru funcții săgeată
// B ≡ E ca logică/rezultat; B e mai "verbos" pentru a explica, E e mai concis pentru producție.
"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

// direct mapăm predicatul în `filter` și afișăm
const result = words.filter((word) => word !== forbiddenWord && word.length >= minLength);
console.log(result);
// => [ 'wolf', 'snake', 'lion', 'horse' ]