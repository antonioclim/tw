"use strict";
/**
 * 6keys&filtersE — CLI minimalist: node "6keys&filtersE.js" --processor=i5 --ram=8 --brand=HP
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

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

const criteria = {};
if (args.brand) criteria.brand = args.brand;
if (args.processor) criteria.processor = args.processor;
if (args.ram && Number.isFinite(Number(args.ram))) criteria.ram = Number(args.ram);

const result = Object.keys(criteria).length
  ? laptops.filter((o) => Object.keys(criteria).every((k) => o[k] === criteria[k]))
  : laptops;

console.log("result:", result);
