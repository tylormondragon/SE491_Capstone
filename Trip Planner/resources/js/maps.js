
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlY2t0aGFtZXRob2QiLCJhIjoiY2s5dGU4cHRjMDJubzNsbzBsam4wdXJiYiJ9.sttfX7yRs6g1UD1KS_cNtw';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11'
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl({
positionOptions: {
  enableHighAccuracy: true
},
  trackUserLocation: true
}));
