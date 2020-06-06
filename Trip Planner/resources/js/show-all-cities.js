function getAllCities(){
    document.querySelector('.bg-modal').style.display = 'flex';
    document.getElementById('c-name').textContent = localStorage.getItem('country-name');
    
    document.querySelector('.close-it').addEventListener('click', function (){
        document.querySelector('.bg-modal').style.display = 'none';
    });
    
    var link = 'https://www.triposo.com/api/20200405/location.json?part_of=';
    var otherstuff = '&tag_labels=city&count=100';
    var infofields = '&fields=id,name,images,snippet';
    var apitoken = '&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp';

    fetch(link + countryName + otherstuff + infofields + apitoken)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        appendAllCities(data);
    })
    .catch(function (err) {
        console.log(err);
    });
}

function appendAllCities(data) {
    
    var allCities = document.getElementById('all-cities');

    for (var i = 0; i < data.results.length; i++) {
        var mainContainer = document.createElement('div');
        var placeTitle = document.createElement('h3');
        var image = document.createElement('img');
        var intro = document.createElement('p');

        mainContainer.className = "city";
        placeTitle.className = "city-name";
        image.className = "city-thumbnail";
        intro.className = "city-intro";

        var currentPlace = data.results[i];
        var placeName = currentPlace.name;
        var placeId = currentPlace.id;
        var iURL = currentPlace.images[0].sizes.thumbnail.url;
        var prx = currentPlace.snippet;
        
        mainContainer.id = placeId;
        image.src = iURL;
        placeTitle.textContent = placeName;
        intro.textContent = prx;
        
        mainContainer.appendChild(image);
        mainContainer.appendChild(placeTitle);
        mainContainer.appendChild(intro);
        allCities.appendChild(mainContainer);
        
        mainContainer.addEventListener("click", function(){ 
            localStorage.setItem('place-id', this.id);
            window.document.location = './city-page.html';
        });

    } 

}


