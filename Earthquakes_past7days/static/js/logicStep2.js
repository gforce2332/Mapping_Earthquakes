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
  center: [39.5, -98.51],
  zoom: 3,
  layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Earthquake GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing the GeoJSON data.
d3.json(earthquakeData).then(function(data) {
  console.log(data);

  // This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    radius: getRadius(),
    stroke: true,
    weight: 0.5
  };
}
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  // We turn each feature into a circleMarker on the map.
  pointToLayer: function(feature, latlng) {
    console.log(data);
    return L.circleMarker(latlng);
  },
  // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo  
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