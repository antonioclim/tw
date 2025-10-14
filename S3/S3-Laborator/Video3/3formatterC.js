/**
 * Varianta C — primește argumentele sub formă de vector.
 * Sintaxa ES6 pentru funcții săgeată
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - arr este un array cu argumentele (de la 0 încolo)
 *   - se folosește un singur RegExp care să găsească toate aparițiile {i}
 *   - funcția de înlocuire primește ca parametri match (ce s-a găsit) și index (captura din paranteze)
 *   - index este convertit în număr și folosit pentru a accesa arr[i]
 *   - dacă i e în afara limitelor, se returnează match (adică nu se înlocuiește)
 */
const format = (s, arr) =>
  String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    return Array.isArray(arr) && i < arr.length ? String(arr[i]) : match;
  });

console.log(format("this is a {0} string and we've {1} it", ["nice", "formatted"]));

// -> this is a nice string and we've formatted it


// Exemplu cu array vid:
// console.log(format("this is a {0} string and we've {1} it", []));