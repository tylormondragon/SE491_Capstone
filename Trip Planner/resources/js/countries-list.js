var continentID = localStorage.getItem('continent-id');
const citiesurl = "https://api.sygictravelapi.com/1.2/en/places/list?parents=" + continentID + "&levels=country&limit=100";
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
appendData(data);
})
.catch(function (err) {
console.log(err);
});

function appendData(data) {
    var countriesContainer = document.getElementById('all-countries');

    for (var i = 0; i < data.data.places.length; i++) {
        var mainContainer = document.createElement('div');
        var countryTitle = document.createElement('h3');
        var image = document.createElement('img');
        var intro = document.createElement('p');

        mainContainer.className = "country";
        image.className = "country-thumbnail";

        var currentPlace = data.data.places[i];
        var countryName =i + currentPlace.name;
        var placeId = currentPlace.id;
        var prx = currentPlace.perex;
        var iURL = currentPlace.thumbnail_url;

        image.src = iURL;
        countryTitle.textContent = countryName;
        intro.textContent = prx;

        mainContainer.appendChild(countryTitle);
        mainContainer.appendChild(image);
        mainContainer.appendChild(intro);
        countriesContainer.appendChild(mainContainer);

    } 

} 
