// Varianta clasica, folosind iteratii for
// Sintaxa ES5 pentru funcții normale
/**
 * Ce se vede în fișier:
 *   Un parseArgs minimalist (--words=... --forbidden=... --minLength=...);
 *   Un "constructor" words din argumente (sau fallback la lista implicită);
 *   Calculează result cu același predicat și îl afișează.
 */


function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const [k, v] = argv[i].split("=");
    if (k && k.startsWith("--")) args[k.slice(2)] = v ?? true;
  }
  return args;
}

const args = parseArgs(process.argv);
const words = (args.words ? String(args.words).split(",") :
  ["fox","wolf","snake","crocodile","lion","cat","crocodile","horse"]).map(s => s.trim());

const forbiddenWord = args.forbidden ?? "crocodile";
const minLength = Number.isFinite(Number(args.minLength)) ? Number(args.minLength) : 4;

const result = words.filter((word) => word !== forbiddenWord && word.length >= minLength);
console.log(result);


/**
 * Exemple de rulare:
 *   node script.js (implicit (folosește datasetul din fișier))
 *   node script.js --words="bear,ant,crocodile,lioness,lynx" --forbidden=crocodile --minLength=4
 */