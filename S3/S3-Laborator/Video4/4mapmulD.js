/**
 * Varianta D — CLI parametric - permite specificarea array-ului și a multiplicatorului din linia de comandă:
 *   node script.js --arr=1,2,3,4,5 --mul=2
 * Dacă nu se dau argumente, folosește [1,2,3,4,5] și multiplicatorul 2.
 * Explicație:
 *   - parseArgs: funcție care parsează argumentele din linia de comandă în obiect
 *   - arr: șir cu elementele separate prin virgulă, de exemplu "1,2,3,4,5" 
 * Utilitate practică: permite reutilizarea scriptului cu diferite seturi de date.
 *   - mul: multiplicatorul, de exemplu 2
 *   - se folosește map pentru a crea un nou array cu valorile înmulțite
 *   - rezultatul este afișat în consolă
 */
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const [k, v] = argv[i].split("=");
    if (k && k.startsWith("--")) args[k.slice(2)] = v ?? "";
  }
  return args;
}

const args = parseArgs(process.argv);
const arr = args.arr
  ? String(args.arr).split(",").map(s => Number(s.trim())).filter(Number.isFinite)
  : [1, 2, 3, 4, 5];

const mul = Number.isFinite(Number(args.mul)) ? Number(args.mul) : 2;

const out = arr.map(x => x * mul);
console.log(out);
