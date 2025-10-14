"use strict";
/**
 * 6keys&filtersC — comparație insensibilă la majuscule pentru string‑uri.
 * Menține egalitatea strictă pentru tipurile non‑string.
 */
const eq = (a, b) => (typeof a === "string" && typeof b === "string")
  ? a.toLowerCase() === b.toLowerCase()
  : a === b;

const getFilteredObjects = (array, criteria) => {
  return array.filter((obj) =>
    Object.keys(criteria).every((k) => eq(obj[k], criteria[k]))
  );
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
