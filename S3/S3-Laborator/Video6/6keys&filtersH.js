"use strict";
/**
 * 6keys&filtersH — one‑liner concis.
 */
const getFilteredObjects = (array, criteria) =>
  array.filter((obj) => Object.keys(criteria).every((k) => obj[k] === criteria[k]));

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
