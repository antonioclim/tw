/**
* 6 - Urmăriți  acest videoclip S4v6B.mp4 pentru a vedea cum se poate face o cerere HTTP folosind Promise-uri cu  async/await. 
* TEMA: După ce ați testat exemplul, bazat pe exemplul anterior implementați o funcție (cu async/await) care obține lista avioanelor de deasupra României.
*
*/


const fetch = require('node-fetch');

async function getObjectFromUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  return JSON.parse(text);
}

async function getCountryBounds(country) {
  const object = await getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`);
  return {
    minLatitude: object[0].boundingbox[0],
    maxLatitude: object[0].boundingbox[1],
    minLongitude: object[0].boundingbox[2],
    maxLongitude: object[0].boundingbox[3]
  };
}

function main() {
  getCountryBounds('Romania')
    .then(bounds => console.log(bounds));
}

main();
