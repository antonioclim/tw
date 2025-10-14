// cu argumente externe: node 2adivno0.js 10 5 dar si cu verificare daca divizorul este zero -> false

const [,, n, d] = process.argv; 
console.log(+d !== 0 && (+n % +d === 0));

