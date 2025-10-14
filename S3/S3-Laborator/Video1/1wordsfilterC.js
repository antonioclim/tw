//Varianta C — funcție săgeată concisă (o singură expresie)
// Sintaxa ES6 pentru funcții săgeată

"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

/**
 * o singură expresie; predicatul direct în filter.
 */
const filterWords = (words, forbiddenWord, minLength) =>
  words.filter((word) => word !== forbiddenWord && word.length >= minLength);

console.log(filterWords(words, forbiddenWord, minLength));

// => [ 'wolf', 'snake', 'lion', 'horse' ]