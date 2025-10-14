"use strict";
/**
 * 6keys&filtersB — bucle "for" explicite (didactic).
 * Echivalent logic cu A, util pentru depănare cu breakpoints.
 */
const getFilteredObjects = (array, criteria) => {
  const out = [];
  for (const obj of array) {
    let ok = true;
    for (const k of Object.keys(criteria)) {
      if (obj[k] !== criteria[k]) { ok = false; break; }
    }
    if (ok) out.push(obj);
  }
  return out;
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

console.log("result:", getFilteredObjects(laptops, { processor: "i5", ram: 8 }));
