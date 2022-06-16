// Add console.log to check to see if the code is working.
console.log("working");

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets= L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/gforce2332/Mapping_Earthquakes/main/torontoNeighborhoods.json";

let myStyle = {
  color: "blue",
  fillColor: "yellow",
  weight: 1
}

d3.json(torontoHoods).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
      style: myStyle,
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h3>Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
      }
  }).addTo(map);
});

// Inside the d3.json() method, add the airportData variable.
// Inside the anonymous function(), add the data parameter, which references the airportData.
// Pass this data to the L.geoJSON() layer and then it'll be added to the map with addTo(map).

// Then Add our 'graymap' tile layer to the map.
streets.addTo(map);

// Assign the titleLayer() method to the variable 'streets'
// The URLS include an API URL with a reference to the accessToken, and the OpenStreetMap URL
// Add the 'maxZoom' attribute and assign it to a value of 18
// Add 'id' attribute and assign it 'mapbox.streets' which will show the streets on the map
// Add the accessToken attribute and assign it to the value of the API_KEY
// Call addTo() function with map object, 'map' on the greymap object tile layer. The addTo() will add the graymap object tile layer to the 'let map'