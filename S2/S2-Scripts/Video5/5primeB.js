//implementam o functie tip arrow (nu cu let pentru ca va fi o constanta, deci ...):
const checkPrime = (n) => {
    //ar trebui sa facem si o verifcare simpla - max radacina patrata din nr nostru (folosim biblioteca Math)
    for (let i = 2; i <= Math.sqrt(n); i++) {
        // deci daca numarul nostru este divizibil cu acest i atunci nu este prim
        // operatorul modulo % ne-ar returna 0 daca avem divizibilitate, atunci ar trebui un not "!" plus return
        if (!(n % i)) {
            return false

        }
        //dar daca ajungem la final fara sa gasim un stfel de numar? Atunci punem return true
        return true
    }
    
}
// modificam console.log():
// dar console.log(checkPrime(process.argv[2])) nu va functiona pt ca parametrul nostru este string deci:
// trebuie sa facem conversia/parsing in integer si introducem parseInt: 

if (process.argv.length < 3) {
    console.log('not enough params')
} else {
    console.log(checkPrime(parseInt(process.argv[2])))
}


