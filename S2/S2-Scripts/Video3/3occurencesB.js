function occurences(text, character) {
    return text.split(character).length - 1;
}

console.log(occurences("an apple a day keeps the doctor away", "e"));  