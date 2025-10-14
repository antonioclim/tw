//Aici avem partea "lucrata"/functionala - sectiunea 1 a seminarului 3 (functii si array-uri)
// Parte prezentata in students.nextlab.tech
// Varianta B — variantă „inline” (fără helper), care face direct const result = words.filter(...); console.log(result)
"use strict";

const words = ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"];
const forbiddenWord = "crocodile";
const minLength = 4;

/**
 * Filtrare în doi pași: predicat cu if/return și returnarea lui `result`.
 */
const filterWords = (words, forbiddenWord, minLength) => {
  const result = words.filter((word) => {
    if (word !== forbiddenWord && word.length >= minLength) {
      return true;  // păstrăm elementul
    }
    return false;   // îl eliminăm (elementul)
  });
  return result;
};

console.log(filterWords(words, forbiddenWord, minLength));

// => [ 'wolf', 'snake', 'lion', 'horse' ]

// TRIVIA: Historically, the JS language was prototyped as Mocha and then LiveScript before being renamed JavaScript in 1995. 
// Those are historical names, not current synonyms. Still can be funny to say "Mocha" instead of "JavaScript" in a conversation.
// The name "JavaScript" was chosen for marketing reasons, to capitalize on the popularity of Java (JSE) at the time,
// even though the two languages are quite different in design and purpose.
// The language has evolved significantly since its inception, with major updates like ES6 (ECMAScript 2015) introducing many modern features.
// Today, JavaScript is a versatile language used for both client-side and server-side development, as well as in various frameworks and libraries.