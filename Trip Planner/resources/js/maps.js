mapboxgl.accessToken = 'pk.eyJ1IjoiYmFhenkiLCJhIjoiY2s5ZGZlcnkyMDFtMTNrbzVlNHE3bjFlbyJ9.JUtMJ9n_9DU0101XIqpLMw';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/baazy/ck9t33oi003sp1in1yumkitms' // replace this with your style URL
});

map.on('load', function() {
  // the rest of the code will go in here
  var layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+'];
  var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

  for (i = 0; i < layers.length; i++) {
    var layer = layers[i];
    var color = colors[i];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }

  map.on('mousemove', function(e) {
    var states = map.queryRenderedFeatures(e.point, {
      layers: ['statedata']
    });

    if (states.length > 0) {
      document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.name + '</strong></h3><p><strong><em>' + states[0].properties.density + '</strong> people per square mile</em></p>';
    } else {
      document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
    }
  });

<<<<<<< Updated upstream
  map.getCanvas().style.cursor = 'default';
  map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);

  // // Add zoom and rotation controls to the map.
  // map.addControl(new mapboxgl.NavigationControl());
  // map.addControl(new mapboxgl.GeolocateControl({
  //   positionOptions: {
  //     enableHighAccuracy: true
  //   },
  //   trackUserLocation: true
  // }));

});
=======
  map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['countries'] // replace this with the name of the layer
    });
    if (features.length> 0){
      document.getElementById('poi').innerHTML = '<h3><strong>' + features[0].properties.name + '</strong></h3>';
        alert(features[0].properties.name);
        getCountryId(features[0].properties.name);
    }
    else {
      document.getElementById('poi').innerHTML = '<p>Country</p>';
    }
  });

function getCountryId (countryName){
    var URLfindID = "https://api.sygictravelapi.com/1.2/en/places/list?query="+countryName+"&levels=country";
    fetch(URLfindID, {
    method: "GET",
    headers: {
    "x-api-key": "M0L7R5tdYB2trBll3IOru9AqsGcx4jlvalKh3esc"
    }
    })
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        var countryID = data.data.places[0].id;
        localStorage.setItem('country-id', countryID);
        localStorage.setItem('country-name', countryName);
        window.document.location = './country-page.html';


    });
}
>>>>>>> Stashed changes
