function occurences(text, character) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === character) {
            count++;
        }

    }
    return count;

}

console.log(occurences("an apple a day keeps the doctor away", "e"));  


