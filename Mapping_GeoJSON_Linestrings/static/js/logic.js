// Create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [44.0, -80.0],
  zoom: 2,
  layers: [dark]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/gforce2332/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data
d3.json(torontoData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data
  L.geoJSON(data, {
      style: myStyle,
      onEachFeature: function(feature, layer) {
          layer.bindPopup("<h2>Airline: " + feature.properties.airline + "</h2> <hr> <h3>Destination: " + feature.properties.dst + "</h3>");
      }
  }).addTo(map);
});

// Inside the d3.json() method, add the airportData variable.
// Inside the anonymous function(), add the data parameter, which references the airportData.
// Pass this data to the L.geoJSON() layer and then it'll be added to the map with addTo(map).


// Assign the titleLayer() method to the variable 'streets'
// The URLS include an API URL with a reference to the accessToken, and the OpenStreetMap URL
// Add the 'maxZoom' attribute and assign it to a value of 18
// Add 'id' attribute and assign it 'mapbox.streets' which will show the streets on the map
// Add the accessToken attribute and assign it to the value of the API_KEY
// Call addTo() function with map object, 'map' on the greymap object tile layer. The addTo() will add the graymap object tile layer to the 'let map'

// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport, {
  // We turn each feature into a marker on the map.
//  pointToLayer: function(feature, latlng) {
//    console.log(feature);
//    .bindPopup("<h2>" + feature.properties.name + "</h2> <hr > <h3>" + feature.properties.city + " " + feature.properties.country + "</h3>");
//  }

//}).addTo(map);

// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer)
//     layer.bindPopup("<h2>Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + feature.properties.name +  "</h3>");
//   }
// }).addTo(map);