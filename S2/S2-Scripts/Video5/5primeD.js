// Varianta D — 2 linii, ES6+ minimală (corectă)
//   Folosește conversia numerică rapidă cu +, calculează limita √n o singură dată, verifică divizibilitatea și afișează rezultatul.
//   Mesajul „not enough params” rămâne, dar totul este mult mai condensat.

const isPrime = n => { n = Math.trunc(+n); if (n < 2) return false; for (let i = 2, L = Math.floor(Math.sqrt(n)); i <= L; i++) if (n % i === 0) return false; return true; };
process.argv[2] ? console.log(isPrime(process.argv[2])) : console.log('not enough params');

