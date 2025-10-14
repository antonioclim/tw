/**
 * Utilizare:
 *   node 5acrostihG.js --text="the quick brown fox jumps over the lazy dog"
 *   node 5acrostihG.js --words="the,quick,brown,fox,jumps,over,the,lazy,dog"
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

let words = [];
if (args.text) {
  words = String(args.text)
    .split(/[^A-Za-z]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
} else if (args.words) {
  words = String(args.words)
    .split(",")
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
} else {
  // fallback (exemplul canonic)
  words = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];
}

const acrostic = words.map((w) => w[0]).join("");
console.log(acrostic);
