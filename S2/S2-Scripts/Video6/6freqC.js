// Este mai "densa" (o singură expresie), dar încă lizibilă, comparativ cu 6freqA.js si 6freqB.js
//  Preferă „one‑liner” fără a sacrifica Unicode/cazul; practică pentru „utility scripts”
//  Pentru că despărțirea „numai pe spațiu” nu gestionează punctuația („zi,”)
//   și, uneori, dublele spații. REGEX‑ul \p{L}+ ia doar secvențe de litere, deci „zi,” devine „zi”.

// 6freqC.js — one-liner corect, fără variabile nedeclarate
const getCounts = t =>
  (t.match(/\p{L}+/gu) || [])
    .map(x => x.toLocaleLowerCase('ro-RO'))
    .reduce((a, x, _, arr) => (a[x] = (a[x] || 0) + 1 / arr.length, a), {});

const sampleString = 'azi e o zi ploioasă și zile ca acestea vor mai fi de azi încolo';
console.log(getCounts(sampleString));
//  Variantele A, B, C sunt „one-linere” (expresii unice), dar C este corectă Unicode și insensibilă la majuscule.
