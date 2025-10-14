// Varianta E — 2 linii, ES6+ cu optimizare pe numere impare
//   Sărim peste toți divizorii pari (în afară de 2). E puțin mai eficientă pentru intrări mari.


const isPrime = n => { n = Math.trunc(+n); if (n < 2) return false; if (n % 2 === 0) return n === 2; for (let i = 3, L = Math.floor(Math.sqrt(n)); i <= L; i += 2) if (n % i === 0) return false; return true; };
process.argv[2] ? console.log(isPrime(process.argv[2])) : console.log('not enough params');


