// sintaxa ES6; precizam inca de la inceput ca avem un numar variabil de argumente:
function addToArray(array, ...args) {
// atunci nu mai avem nevoie de urmatoarele doua atribuiri "let"
//    let args = arguments;
//    let array = args[0];

//dar: in acest caz vectorul args porneste de la index 0
    for (var i = 0; i < args.length; i++) {
        array.push(args[i]);
    }
    return array;
    
}   

let array = ["a"];



console.log(addToArray(array, "b", "c").join(", "));
