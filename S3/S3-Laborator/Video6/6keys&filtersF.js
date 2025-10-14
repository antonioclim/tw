"use strict";
/**
 * 6keys&filtersF — defensiv: respinge obiectele fără cheile din criteriu.
 */
const getFilteredObjects = (array, criteria) => {
  return array.filter((obj) => {
    for (const k of Object.keys(criteria)) {
      if (!(k in obj)) return false;
      if (obj[k] !== criteria[k]) return false;
    }
    return true;
  });
};

const laptops = [
  { brand: "HP",     processor: "i5", ram: 8 },
  { brand: "Dell",   processor: "i5", ram: 16 },
  { brand: "Asus",   processor: "i7", ram: 8 },
  { brand: "Acer",   processor: "i3", ram: 4 },
  { brand: "Lenovo", processor: "i5", ram: 8 }
];

const extended = laptops.concat([{ brand: "Other", cpu: "i5", memory: 8 }]);
console.log("result:", getFilteredObjects(extended, { processor: "i5", ram: 8 }));
