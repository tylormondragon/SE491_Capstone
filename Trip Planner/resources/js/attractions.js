var theCity = localStorage.getItem('place-id');
//var theCity = "Paris";


//https://www.triposo.com/api/20200405/poi.json?account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp&location_id=Montpellier&fields=id,name,images,snippet

var link = 'https://www.triposo.com/api/20200405/poi.json?location_id=';
var otherstuff = '&count=20';
var infofields = '&fields=id,name,images,snippet';
var apitoken = '&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp';

fetch(link + theCity + otherstuff + infofields + apitoken)
.then(function (response) {
return response.json();
})
.then(function (data) {
    appendAttractions(data);
})
.catch(function (err) {
    console.log(err);
    //document.getElementById("api").innerHTML = '<p>error</p>';
});

function appendAttractions(data) {
    
    var att_h2 = document.createElement('h2');
    att_h2.textContent = "Popular Attractions";

    var attractions_div = document.getElementById('places-here');
    attractions_div.appendChild(att_h2);

    for (var i = 0; i < data.results.length; i++) {
        var mainContainer = document.createElement('div');
        var attractionTitle = document.createElement('a');
        var image = document.createElement('img');
        //var intro = document.createElement('p');

        mainContainer.className = "col span-1-of-3 suggestion";
        image.className = "places";
        attractionTitle.className = "attr-button";

        var currentAttraction = data.results[i];
        var attractionName = currentAttraction.name;
        var attractionId = currentAttraction.id;
        console.log(attractionName);
        //var prx = currentAttraction.perex;
        var iURL = currentAttraction.images[0].sizes.thumbnail.url;
        mainContainer.id = attractionId;
        image.src = iURL;
        attractionTitle.textContent = attractionName;
        //intro.textContent = prx;
        mainContainer.appendChild(image);
        mainContainer.appendChild(attractionTitle);
        //mainContainer.appendChild(intro);
        attractions_div.appendChild(mainContainer);
        
        mainContainer.addEventListener("click", function(){ 
            localStorage.setItem('place-id', this.id);
            alert(this.id);
            //window.document.location = './city-page.html';
        });

    } 

} 

