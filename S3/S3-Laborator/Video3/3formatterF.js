/**
 * Varianta F — CLI: node 3formatterF.js --tpl="..." --args="a,b"
 * Explicație:
 *   - parseArgs: parsează argumentele din linia de comandă în obiect
 *   - tpl: șablonul (template) cu {0}, {1}, ...
 * Utilitate practică: permite reutilizarea scriptului cu diferite șabloane și liste de valori.
 *   - args: șir cu argumentele separate prin virgulă, de exemplu "nice,formatted"
 *   - list: vectorul cu argumentele, obținut prin split + trim
 */
function parseArgs(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const [k, v] = argv[i].split("=");
    if (k && k.startsWith("--")) out[k.slice(2)] = v ?? "";
  }
  return out;
}

const { tpl, args } = parseArgs(process.argv);
const list = (args ? args.split(",") : []).map(s => s.trim());

const format = (s, ...rest) =>
  String(s).replace(/\{(\d+)\}/g, (m, index) => {
    const i = Number(index);
    return i < rest.length ? String(rest[i]) : m;
  });

const template = tpl ?? "this is a {0} string and we've {1} it";
const values   = list.length ? list : ["nice", "formatted"];

console.log(format(template, ...values));


// Exemplu de rulare:
//   node formatter_F_cli.js --tpl="this is a {0} string and we've {1} it" --args="nice,formatted"
//   node formatter_F_cli.js --args="nice,formatted"
