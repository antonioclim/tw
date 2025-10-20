/**
* 6 - Urmăriți  acest videoclip S4v6A.mp4 pentru a vedea cum se poate face o cerere HTTP folosind Promise-uri cu .then. 
* TEMA: După ce ați testat exemplul, bazat pe exemplul anterior implementați o funcție (cu .then) care obține lista avioanelor de deasupra României.
*
*/


const fetch = require('node-fetch')

function getObjectFromUrl (url) {
  return new Promise(resolve =>
    fetch(url)
      .then(response => response.text())
      .then(text => resolve(JSON.parse(text)))
  )
}

function getCountryBounds (country) {
  return new Promise(resolve =>
    getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`)
      .then(object => resolve({
        minLatitude: object[0].boundingbox[0],
        maxLatitude: object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3],
      }))
  )
}

function main () {
  getCountryBounds('Romania')
    .then(bounds => console.log(bounds))
}

main()
