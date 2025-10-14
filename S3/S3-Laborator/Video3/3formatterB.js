/**
 * Varianta B — regex unic + funcție de înlocuire.
 * Sintaxa ES6 pentru funcții săgeată
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - ...args este un array cu argumentele suplimentare (de la 1 încolo)
 *   - se folosește un singur RegExp care să găsească toate aparițiile {i}
 *   - funcția de înlocuire primește ca parametri match (ce s-a găsit) și index (captura din paranteze)
 *   - index este convertit în număr și folosit pentru a accesa args[i]
 *   - dacă i e în afara limitelor, se returnează match (adică nu se înlocuiește)
 */


const format = (s, ...args) =>
  String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    return i < args.length ? String(args[i]) : match;
  });

console.log(format("this is a {0} string and we've {1} it", "nice", "formatted"));

// -> this is a nice string and we've formatted it