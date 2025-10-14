"use strict";
/**
 * 6keys&filtersG — stil funcțional cu Object.entries(...).every(...).
 */
const getFilteredObjects = (array, criteria) => {
  const entries = Object.entries(criteria);
  return array.filter((obj) => entries.every(([k, v]) => obj[k] === v));
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
