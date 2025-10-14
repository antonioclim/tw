//varianta 5primeB.js CORECTATA
const checkPrime = (n) => {
       for (let i = 2; i <= Math.sqrt(n); i++) {
        if (!(n % i)) {
            return false

        }
        //dar daca ajungem la final fara sa gasim un stfel de numar? Atunci punem return true
        // dar daca il punem aici, functia va iesi prea devreme din iteratie si vom avea true si la 21, 27 etc:
        // NU AICI: return true 
    }
    return true
}

if (process.argv.length < 3) {
    console.log('not enough params')
} else {
    console.log(checkPrime(parseInt(process.argv[2])))
}