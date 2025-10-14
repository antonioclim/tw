"use strict";
/**
 * 6keys&filtersD — criterii ca valori sau funcții‑predicat.
 * Ex.: { ram: v => v >= 8, processor: "i5" }
 */
const match = (obj, criteria) => {
  for (const key of Object.keys(criteria)) {
    const expected = criteria[key];
    const actual = obj[key];
    const ok = (typeof expected === "function") ? expected(actual) : actual === expected;
    if (!ok) return false;
  }
  return true;
};

const getFilteredObjects = (array, criteria) => array.filter(o => match(o, criteria));

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: v => v >= 8 }));
