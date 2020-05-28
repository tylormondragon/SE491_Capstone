<<<<<<< Updated upstream
=======
var dest = document.getElementById('location-name');
var countryName = localStorage.getItem('country-name');
//var countryName = 'France';
dest.textContent = countryName;
>>>>>>> Stashed changes

const citiesurl = "https://api.sygictravelapi.com/1.2/en/places/list?parents=country:14&levels=city&limit=20";
fetch(citiesurl, {
method: "GET",
headers: {
"x-api-key": "M0L7R5tdYB2trBll3IOru9AqsGcx4jlvalKh3esc"
}
})
.then(function (response) {
return response.json();
})
.then(function (data) {
appendCities(data);
})
.catch(function (err) {
console.log(err);
});

function appendCities(data) {
    
    var h2cities = document.createElement('h2');
    h2cities.textContent = "Popular Cities";
    console.log(h2cities);

    var cities = document.getElementById('cities');
    cities.appendChild(h2cities);

    for (var i = 0; i < data.data.places.length; i++) {
        var mainContainer = document.createElement('div');
        var placeTitle = document.createElement('a');
        var image = document.createElement('img');
        //var intro = document.createElement('p');

        mainContainer.className = "col span-1-of-4 suggestion";
        image.className = "places";
        placeTitle.className = "city-button";

        var currentPlace = data.data.places[i];
        var placeName = currentPlace.name;
        var placeId = currentPlace.id;
        //var prx = currentPlace.perex;
        var iURL = currentPlace.thumbnail_url;

        image.src = iURL;
        placeTitle.textContent = placeName;
        //intro.textContent = prx;
        mainContainer.appendChild(image);
        mainContainer.appendChild(placeTitle);
        //mainContainer.appendChild(intro);
        cities.appendChild(mainContainer);

    } 

} 
