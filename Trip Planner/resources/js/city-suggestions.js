var countryID = '';
var dest = document.getElementById('location-name');
var countryName = localStorage.getItem('country-name');
dest.textContent = countryName;
/*
var URLforID = "https://www.triposo.com/api/20200405/location.json?tag_labels=country&annotate=trigram:"+countryName+"&trigram=>=0.3&count=1&fields=id,name,score,snippet&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";

fetch(URLforID)
.then(function (response) {
return response.json();
})
.then(function (data) {
    countryID = data.results[0].id;
})
.catch(function (err) {
    console.log(err);
});*/

var link = 'https://www.triposo.com/api/20200405/location.json?part_of=';
var otherstuff = '&tag_labels=city&count=20';
var infofields = '&fields=id,name,images';
var apitoken = '&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp';


/*var URLforID = "https://www.triposo.com/api/20200405/location.json?tag_labels=city&annotate=trigram:"+res+"&trigram=>=0.3&count=20&fields=id,name,score,snippet,images,part_of&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";*/

fetch(link + countryName + otherstuff + infofields + apitoken)
//var res = countryName.substring(0, 5);
//console.log(res);


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


    var cities = document.getElementById('places-here');

    for (var i = 0; i < data.results.length; i++) {
        var mainContainer = document.createElement('div');
        var placeTitle = document.createElement('a');
        var image = document.createElement('img');
        //var intro = document.createElement('p');

        mainContainer.className = "col span-1-of-4 suggestion";
        image.className = "places";
        placeTitle.className = "city-button";

        var currentPlace = data.results[i];
        var placeName = currentPlace.name;
        console.log (placeName);
        var placeId = currentPlace.id;
        var iURL = currentPlace.images[0].sizes.thumbnail.url;
        
        mainContainer.id = placeId;
        image.src = iURL;
        placeTitle.textContent = placeName;
        
        mainContainer.appendChild(image);
        mainContainer.appendChild(placeTitle);
        cities.appendChild(mainContainer);
        
        mainContainer.addEventListener("click", function(){ 
            localStorage.setItem('place-id', this.id);
            window.document.location = './city-page.html';
        });

    } 

}


