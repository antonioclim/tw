// varianta B a lui 6freqA.js — concisă și corectă Unicode, o singură trecere (adună direct frecvențe)
// Tokenizare pe cuvinte (literă/diacritică), insensibil la majuscule, fără punctuație; 
// fiecare apariție adaugă 1/n, astfel evităm un al doilea pas pentru împărțire.

const getCounts = (text) => {
  // Secventa "ciudata" \p{L}+ prinde secvențe de litere (diacritice incluse) și ignoră semnele de punctuație
  // toLocaleLowerCase('ro-RO') unifică forma cu/lipsă majuscule
  const words = (text.match(/\p{L}+/gu) || []).map(w => w.toLocaleLowerCase('ro-RO'));
  const n = words.length || 1;                       // protecție la text gol
   // Un singur reduce: O(n) timp și O(U) memorie (U = numărul de cuvinte distincte)
  return words.reduce((acc, w) => (acc[w] = (acc[w] || 0) + 1 / n, acc), Object.create(null));
};

//test simplu:
const sampleString = 'azi e o zi ploioasă și zile ca acestea vor mai fi de azi încolo';
console.log(getCounts(sampleString));

// TEMA 1 PENTRU ACASĂ: testează cu texte mai complexe, cu diacritice, majuscule, semne de punctuație etc.
// TEMA 2 PENTRU ACASĂ: adaptează să primească textul din linia de comandă (process.argv)
// TEMA 3 PENTRU ACASĂ: păstreaza abordarea „întâi număr, apoi împart la total” si foloseste (acolo unde trebuie):
//    return Object.fromEntries(Object.entries(counts).map(([k, v]) => [k, v / n]))
