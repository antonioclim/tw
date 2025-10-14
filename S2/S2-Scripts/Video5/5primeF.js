// Este o varianta "densa" - "condensata" - a variantei 5primeD.js
//   Pe scurt: O formulă compactă care evită bucla „manuală” (dar emai puțin eficientă, chiar daca foarte scurtă).
//   Creează o listă de posibili divizori și verifică dacă vreunul divide.


const isPrime = n => (n = Math.trunc(+n)) > 1 && !Array.from({length: Math.max(0, Math.floor(Math.sqrt(n)) - 1)}, (_, i) => i + 2).some(d => n % d === 0);
process.argv[2] ? console.log(isPrime(process.argv[2])) : console.log('not enough params');


//  Varianta F e „frumoasă” ca expresie, dar mai costisitoare (alocă un array). Pentru uz real, preferă E sau D.