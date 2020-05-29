function myFunction(){
    var city = document.getElementById("txt").value;
    localStorage.setItem("textvalue",city);
    return false; 
}

var country =document.getElementById("location-name").innerHTML=localStorage.getItem("textvalue");  

var number = 10;

var url="https://www.triposo.com/api/20200405/location.json?part_of="+country+"&tag_labels=city&order_by=-score&count=25&fields=name,coordinates,images,snippet&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";
// var url = "https://www.triposo.com/api/20180206/location.json?&fields=coordinates,name&count=4&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";

fetch(url)
.then( response => {
    return response.json();
}).then(data =>{
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

        for (var i = 0; i < data.results.length; i++) {
            var mainContainer = document.createElement('div');
            var placeTitle = document.createElement('a');
            var image = document.createElement('img');
            // var intro = document.createElement('p');

            mainContainer.className = "col span-1-of-4 suggestion";
            image.className = "results";
            placeTitle.className = "city-button";

            var currentPlace = data.results[i];
            var placeName = currentPlace.name;
            var placeId = currentPlace.id;
            // var prx = currentPlace.perex;
  
            var iURL =currentPlace.images[i].sizes.thumbnail.url;
      

            image.src = iURL;
            placeTitle.textContent = placeName;
            // intro.textContent = prx;
            mainContainer.appendChild(image);
            mainContainer.appendChild(placeTitle);
            // mainContainer.appendChild(intro);
            cities.appendChild(mainContainer);
        }
  }