// Varianta D — seamana cu varianta C, dar folosind o funcție normală în loc de funcție săgeată
// Sintaxa ES5 pentru funcții normale
// Prima parte ramane la fel cu varianta C
"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

// Inlocuim constanta filterWords cu o functie normala filterWords

//DEL:  const filterWords = (words, forbiddenWord, minLength) =>
//DEL:    words.filter((word) => word !== forbiddenWord && word.length >= minLength);
// construim o functie filterWords care sa primeasca 3 parametrii: words, forbiddenWord, minLength
// si sa returneze un array cu cuvintele care nu sunt egale cu forbiddenWord si au lungimea mai mare sau egala cu minLength
function filterWords(words, forbiddenWord, minLength) {
  return words.filter((word) => word !== forbiddenWord && word.length >= minLength);
}

//Evident, apelam functia cu cei 3 parametri in final (la fel ca inainte)
console.log(filterWords(words, forbiddenWord, minLength));

// => [ 'wolf', 'snake', 'lion', 'horse' ]