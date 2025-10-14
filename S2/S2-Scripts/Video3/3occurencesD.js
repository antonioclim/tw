let occurences = (text, character) => text.split(character).length - 1;

console.log(process.argv.slice(2).join(" ").split("e").length - 1);
