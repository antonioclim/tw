/**
 * Varianta E — funcție declarată (non‑arrow), aceeași logică ca B.
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - ...args este un array cu argumentele suplimentare (de la 1 încolo)
 *   - se folosește un singur RegExp care să găsească toate aparițiile {i}
 *   - funcția de înlocuire primește ca parametri match (ce s-a găsit) și index (captura din paranteze)
 *   - index este convertit în număr și folosit pentru a accesa args[i]
 *   - dacă i e în afara limitelor, se returnează match (adică nu se înlocuiește)
 * (/\{(\d+)\}/g unde:
 *       / este delimitatorul, \{ scăpat, (\d+) captura, \} scăpat, g global)
 *       \ este caracter de evadare (escape character)
 *       d+ înseamnă cifre (digit) una sau mai multe (+)
 *       g înseamnă global (toate aparițiile, nu doar prima)    
 */
function format(s, ...args) {
  return String(s).replace(/\{(\d+)\}/g, (match, index) => {
    const i = Number(index);
    return i < args.length ? String(args[i]) : match;
  });
}

console.log(format("this is a {0} string and we've {1} it", "nice", "formatted"));

// -> this is a nice string and we've formatted it
