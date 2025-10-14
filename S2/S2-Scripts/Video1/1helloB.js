// let sayHello = function (name) {
// ....
//}
//let sayHello => (name) {
// return `Hello, ${name}!`;
//}
// console.log(sayHello(process.argv[0]));
// console.log("Script dicit...");


let sayHello = (name) => `Hello, ${name}!`;

// with 2 arguments we need a slice and a join processed node 1helloB.js to me, a poor student
console.log(sayHello(process.argv.slice(2).join(" ")));


