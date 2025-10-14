/**
 * Varianta A — pas‑cu‑pas: iterează indiciile și înlocuiește toate aparițiile {i}.
 * Sintaxa ES6 pentru funcții săgeată
 * Explicație:
 *   - s este șirul de formatat, cu {0}, {1}, ...
 *   - ...args este un array cu argumentele suplimentare (de la 1 încolo)
 *   - pentru fiecare argument, se construiește un RegExp care să găsească toate aparițiile {i}
 */
const format = (s, ...args) => {
  let out = String(s);
  for (let i = 0; i < args.length; i++) {
    const re = new RegExp("\\{" + i + "\\}", "g"); // /{i}/g
    out = out.replace(re, String(args[i]));
  }
  return out;
};

console.log(format("this is a {0} string and we've {1} it", "nice", "formatted"));
// -> this is a nice string and we've formatted it
