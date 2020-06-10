
mapboxgl.accessToken = 'pk.eyJ1IjoicmVkYW1hcGJveCIsImEiOiJjazl1OHgzbXkwYmZhM2Z0aHNoMjc3MXo0In0.y_RXYPjqVTQyXxZDlbhW0A';
/** 
 * Add the map to the page
*/
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [-77.034084142948, 38.909671288923],
  zoom: 14,
  scrollZoom: false
   
});


var city = localStorage.getItem("place-id");  
//var city = "Paris"
var number = 10;

var url = "https://www.triposo.com/api/20200405/poi.json?account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp&location_id="+city+"&fields=id,name,images,snippet,coordinates";
//var url="https://www.triposo.com/api/20200405/poi.json?part_of="+city+"&tag_labels=city&order_by=-score&count=100&fields=name,coordinates,images,snippet&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";

fetch(url)
.then( response => {
    return response.json();
}).then(data =>{
  
  var s = data.results;

  var stores ='{"type":"FeatureCollection","features":[';
   


  for(var i = 0; i < s.length; i++) {
    var temp= '';
    var poi_id = JSON.stringify(s[i].id);
    var lat = JSON.stringify(s[i].coordinates.latitude);
    var lon = JSON.stringify(s[i].coordinates.longitude);
    var name = JSON.stringify(s[i].name);
    var snippet = JSON.stringify(s[i].snippet);
    var image = document.createElement('img');
  
    image.className = "results";
    var iURLS = data.results[i].images[0].sizes.thumbnail.url;
    var iURL_large = data.results[i].images[0].sizes.medium.url; 
    //var iURLS = data.results[i].images[0].sizes.original.url;

    lat = parseFloat(lat);
    long = parseFloat(lon);
    
    //temp = '{"type":"Feature","properties":{"p_id":'+poi_id+',"name":'+name+',"snippet":'+snippet+',"big_image":'+iURL_large+',"images":"<img  src='+iURLS+'>"},"geometry":{"type":"Point","coordinates":['+lon+','+lat+']}}';
      
    temp = '{"type":"Feature","properties":{"p_id":'+poi_id+',"name":'+name+',"snippet":'+snippet+',"images":"<img  src='+iURLS+'>"},"geometry":{"type":"Point","coordinates":['+lon+','+lat+']}}';
      
    temp = '{"type":"Feature","properties":{"p_id":'+poi_id+',"name":'+name+',"snippet":'+snippet+',"image":"<img  src='+iURL_large+'>","images":"<img  src='+iURLS+'>"},"geometry":{"type":"Point","coordinates":['+lon+','+lat+']}}';
  
    console.log(temp);
    stores=stores.concat(temp+',');

  }

  stores= stores.substring(0,stores.length-1);

  stores+=']}';

  var storeGeojson=JSON.parse(stores);

/**
 * Assign a unique id to each store. You'll use this `id`
 * later to associate each point on the map with a listing
 * in the sidebar.
*/
storeGeojson.features.forEach(function(store, i){
store.properties.id = i;
});
/**
 * Wait until the map loads to make changes to the map.
*/
map.on('load', function (e) {   
/**
  * This is where your '.addLayer()' used to be, instead
  * add only the source without styling a layer
*/
 map.addSource("places", {
  "type": "geojson",
  "data": storeGeojson
});
/**
  * Create a new MapboxGeocoder instance.
*/
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: true,
    bbox: [-77.210763, 38.803367, -76.853675, 39.052643]
});
/**
  * Add all the things to the page:
  * - The location listings on the side of the page
  * - The search box (MapboxGeocoder) onto the map
  * - The markers onto the map
*/   
buildLocationList(storeGeojson);
//map.addControl(geocoder, 'top-left');
addMarkers();
/**
   * Listen for when a geocoder result is returned. When one is returned:
   * - Calculate distances
   * - Sort stores by distance
   * - Rebuild the listings
   * - Adjust the map camera
   * - Open a popup for the closest store
   * - Highlight the listing for the closest store.
*/
geocoder.on('result', function(ev) {

    /* Get the coordinate of the search result */
   // var searchResult = ev.result.geometry;
    /**
      * Calculate distances:
      * For each store, use turf.disance to calculate the distance
      * in miles between the searchResult and the store. Assign the
      * calculated value to a property called `distance`.
    */
    var options = { units: 'miles' };
      storeGeojson.features.forEach(function(store){
        Object.defineProperty(store.properties, 'distance', {
        value: turf.distance(searchResult, store.geometry, options),
        writable: true,
        enumerable: true,
        configurable: true
        }); 
});
/**
  * Sort stores by distance from closest to the `searchResult`
  * to furthest.
*/
storeGeojson.features.sort(function(a,b){
  if (a.properties.distance > b.properties.distance) {
     return 1;
  }
  if (a.properties.distance < b.properties.distance) {
     return -1;
  }
    return 0; // a must be equal to b
});
    /**
     * Rebuild the listings:
     * Remove the existing listings and build the location
     * list again using the newly sorted stores.
    */
    var listings = document.getElementById('listings');
    while (listings.firstChild) {
      listings.removeChild(listings.firstChild);
    }
    buildLocationList(storeGeojson);

    /* Open a popup for the closest store. */
    createPopUp(storeGeojson.features[0]);

    /** Highlight the listing for the closest store. */
    var activeListing = document.getElementById('listing-' + storeGeojson.features[0].properties.id);
    activeListing.classList.add('active');

    /**
     * Adjust the map camera:
     * Get a bbox that contains both the geocoder result and
     * the closest store. Fit the bounds to that bbox.
    */
    var bbox = getBbox(stores, 0, searchResult);
    map.fitBounds(bbox, {
      padding: 100
    });
  });
});

/**
 * Using the coordinates (lng, lat) for
 * (1) the search result and
 * (2) the closest store
 * construct a bbox that will contain both points
*/
function getBbox(sortedStores, storeIdentifier, searchResult) {
  var lats = [sortedStores.features[storeIdentifier].geometry.coordinates[1], searchResult.coordinates[1]]
  var lons = [sortedStores.features[storeIdentifier].geometry.coordinates[0], searchResult.coordinates[0]]
  var sortedLons = lons.sort(function(a,b){
      if (a > b) { return 1; }
      if (a.distance < b.distance) { return -1; }
      return 0;
    });
  var sortedLats = lats.sort(function(a,b){
      if (a > b) { return 1; }
      if (a.distance < b.distance) { return -1; }
      return 0;
    });
  return [
    [sortedLons[0], sortedLats[0]],
    [sortedLons[1], sortedLats[1]]
  ];
}

/**
 * Add a marker to the map for every store listing.
**/
function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  storeGeojson.features.forEach(function(marker) {
    /* Create a div element for the marker. */
    var el = document.createElement('div');
    /* Assign a unique `id` to the marker. */
    el.id = "marker-" + marker.properties.id;
    /* Assign the `marker` class to each marker for styling. */
    el.className = 'marker';

    /**
     * Create a marker using the div element
     * defined above and add it to the map.
    **/
    new mapboxgl.Marker(el, {offset: [0, -23]})
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);

    /**
     * Listen to the element and when it is clicked, do three things:
     * 1. Fly to the point
     * 2. Close all other popups and display popup for clicked store
     * 3. Highlight listing in sidebar (and remove highlight for all other listings)
    **/
    el.addEventListener('click', function(e){
      flyToStore(marker);
      createPopUp(marker);
      var activeItem = document.getElementsByClassName('active');
      e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      var listing = document.getElementById('listing-' + marker.properties.id);
      listing.classList.add('active');
    });
  });
}

/**
 * Add a listing for each store to the sidebar.
**/
function buildLocationList(data) {
  data.features.forEach(function(store, i){
    /**
     * Create a shortcut for `store.properties`,
     * which will be used several times below.
    **/
    var prop = store.properties;

    /* Add a new listing section to the sidebar. */
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + prop.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item';

    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = "link-" + prop.id;
    link.innerHTML = prop.name;
    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.name;
    details.innerHTML = prop.snippet;
    var see_poi = document.createElement('a');
      listing.appendChild(see_poi);
    see_poi.innerHTML = "View Details";
    see_poi.className = "see-poi";
      
    see_poi.addEventListener("click", function(){
        document.querySelector('.bg-modal').style.display = 'flex';
        document.getElementById('poi-name').textContent = prop.name;

        //poi_image.src = prop.big_image
        document.querySelector('#image-here').innerHTML = prop.image;
        getPOIdetails(prop.p_id);
    
        document.querySelector('.close-it').addEventListener('click', function (){
        document.querySelector('.bg-modal').style.display = 'none';
        });
    });

      //listing.addEventListener("click", showPOIdetails(prop.p_id, prop.name));
    //see_poi.onclick = showPOIdetails(prop.p_id, prop.name); 

    if (prop.distance) {
      var roundedDistance = Math.round(prop.distance*100)/100;
      details.innerHTML += '<p><strong>' + roundedDistance + ' miles away</strong></p>';
    }

    /**
     * Listen to the element and when it is clicked, do four things:
     * 1. Update the `currentFeature` to the store associated with the clicked link
     * 2. Fly to the point
     * 3. Close all other popups and display popup for clicked store
     * 4. Highlight listing in sidebar (and remove highlight for all other listings)
    **/
    link.addEventListener('click', function(e){
      for (var i=0; i < data.features.length; i++) {
        if (this.id === "link-" + data.features[i].properties.id) {
          var clickedListing = data.features[i];
          flyToStore(clickedListing);
          createPopUp(clickedListing);
        }
      }
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    });
  });
}

/**
 * Use Mapbox GL JS's `flyTo` to move the camera smoothly
 * a given center point.
**/
function flyToStore(currentFeature) {
  map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
}

/**
 * Create a Mapbox GL JS `Popup`.
**/
function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>'+ currentFeature.properties.name + '</h3>'+
    '<img "' + currentFeature.properties.images)
    .addTo(map);
}
//   popup.getElement().addEventListener('click', event => {

//       if(currentFeature.properties.image ==='<img "' + currentFeature.properties.images+ '" />'){
//          window.location.href = 'details.html';
//       }
  
// });
})

  







