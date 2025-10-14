//Aici avem partea de baza, de la care pornim sectiunea 1 a seminarului 3 (functii si array-uri)
// Parte prezentata in students.nextlab.tech
// Setul de date comun: un array de cuvinte ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"]
// Criterii comune: forbiddenWord = "crocodile", minLength = 4
// Cerinta: sa se scrie o functie care sa returneze un array nou, care sa contina: 
// doar cuvintele care nu sunt egale cu forbiddenWord si care au lungimea mai mare sau egala decat minLength
const words = [
  "fox",
  "wolf",
  "snake",
  "crocodile",
  "lion",
  "cat",
  "crocodile",
  "horse"
];

const forbiddenWord = "crocodile";
const minLength = 4;
/**
 * Păstrează doar cuvintele diferite de `forbiddenWord` și cu lungime ≥ `minLength`.
 * Notă: `filter` NU modifică `words`, ci creează un tablou nou (immutabil).
 */

const filterWords = (words, forbiddenWord, minLength) => {
   //pas 1:  filter parcurge fiecare word din words;
   //pas 2: Predicatul conjunctiv: (word !== forbiddenWord) și (word.length >= minLength);
   //ppas 3: Doar elementele pentru care predicatul este true rămân în rezultat; ordinea elementelor este păstrată.
};

console.log(filterWords(words, forbiddenWord, minLength));
