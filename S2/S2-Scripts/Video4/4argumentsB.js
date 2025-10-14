// sintaxa inainte de ES6; ca exemplu, fara spread operator
function addToArray(arr, element) {
    let args = arguments;
    let array = args[0];
    for (var i = 1; i < args.length; i++) {
        array.push(args[i]);
    }
    return array;
    
}   

let array = ["a"];



console.log(addToArray(array, "b", "c").join(", "));
