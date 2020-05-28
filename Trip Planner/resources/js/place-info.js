var dest = document.getElementById("location-name");

var countryID = localStorage.getItem('country-id');
dest.textContent = localStorage.getItem('country-name');
console.log(dest.textContent);

//var url = "https://api.sygictravelapi.com/1.2/en/places/country:14";
var url = "https://api.sygictravelapi.com/1.2/en/places/" + countryID;
fetch(url, {
method: "GET",
headers: {
"x-api-key": "M0L7R5tdYB2trBll3IOru9AqsGcx4jlvalKh3esc"
}
})
.then(function (response) {
return response.json();
})
.then(function (data) {
    appendCountryInfo(data);
})
.catch(function (err) {
    console.log(err);
    //document.getElementById("api").innerHTML = '<p>error</p>';
});

function appendCountryInfo(data) {
    var markup = '';
    var dest = document.getElementById("location-name");
    var desc = document.getElementById("description");
    console.log(desc);

    var countryId = data.data.place.id;
    dest.textContent = data.data.place.name;
    var textd = data.data.place.description.text;
    desc.textContent = textd;
    var media = data.data.place.main_media.media;

    for (var index = 0; index < media.length; index++) {
        markup += '<li data-target="#myCarousel" data-slide-to="' + index + '"></li>';
    }
    $('#myCarousel .carousel-indicators').html(markup);
    markup = '';
    for (var index = 0; index < media.length; index++) {
        var imageURL = media[index].url;

        markup += '<div class="item">';
        //markup += '<img src="' +imageURL+ '" style="height:100vh;">'
        markup += '<img src="' +imageURL+ '">';
        markup += '</div>';
    }
    $('#myCarousel .carousel-inner').html(markup);
    $('#myCarousel .item').first().addClass('active');
    $('#myCarousel .carousel-indicators > li').first().addClass('active');
    $('#myCarousel').carousel({
        pause: true,
        interval: false
    });
}

