/**
* 5 - Urmăriți videoclipul următor S4v5.mp4 pentru a vedea cum se pot utiliza excepțiile pentru a valida input-urile unei funcții. 
* După ce ați testat exemplul, implementați funcția increaseSalary care primește ca parametrii un array de salarii și
*   un număr, reprezentând procentul cu care se vor mări (ex 10). 
* Funcția aruncă excepții dacă primul parametru nu este un array sau al doilea parametru nu este un număr.
*
*/


const orderCoffee = (type) => {
  const types = {
    SPECIAL: 'SPECIAL',
    REGULAR: 'REGULAR'
  }

  if (Object.values(types).indexOf(type) === -1) {
    throw new Error('coffee error')
  } else {
    console.log(`preparing ${type} coffee`)
  }
}

try {
  orderCoffee('REGULAR')
  orderCoffee('SWEET_COFFEE_NO_SUGAR_NO_CAFFEINE')
} catch (err) {
  console.warn(err)
}
