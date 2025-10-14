// Ne trebuie un text pe care sa-l putem testa
// si un caracter al carui numar de aparitii in text sa-l numaram
// putem folosi process.argv pentru a prelua parametrii din linia de comanda
// dar pentru simplitate, vom folosi un text si caracter hardcodate
const sampleString = 'azi e o zi ploioasa si zile ca aceastea vor mai fi de azi incolo'
//Functia va fi de tip arrow function:
const getCounts = (text, character) => {
    //Ne trebuie o metoda care sa imparta fraza in cuvinte (simplu, separatorul este spatiu si restul sunt cuvinte)
    const words = text.split(' ')
    // alegem cum sa reprezentam rezultatul; pentru fiecare cuvant avem o cheie si o valoare (numarul de aparitii)
    // deci un obiect este potrivit
    const result = {}
        //iteram prin lista de cuvinte
    for (let word of words) {
        //daca cuvantul nu exista in obiect, il initializam cu 0
        if (word in result) {
            //Trebuie sa implementam numarul de aparitii
            result[word]++
        } else {
            //Suntem la prima aparitie a cuvantului, il initializam cu 1
            result[word] = 1;
        }   

    }
    //dar vrem sa vedem frecventa aparitiilo adica bumarul de aparitii supra nr total de cuvinte
    //pentru asta iteram prin cheile obiectului (printr-un for)
    for (let word in result) {
        result[word] /= words.length
    }
    return result;
}

//test simplu:
console.log(getCounts(sampleString));
