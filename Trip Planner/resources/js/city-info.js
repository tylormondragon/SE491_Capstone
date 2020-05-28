
var cityID = localStorage.getItem('place-id');

var link = 'https://www.triposo.com/api/20200405/location.json?id=';

var apitoken = '&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp';

fetch(link + cityID + apitoken )
.then(function (response) {
return response.json();
})
.then(function (data) {
    appendCityInfo(data);
})
.catch(function (err) {
    console.log(err);
    //document.getElementById("api").innerHTML = '<p>error</p>';
});

function appendCityInfo(data) {
    var dest = document.getElementById('location-name');

    dest.textContent = data.results[0].name;
    
    var markup = '';
    //var dest = document.getElementById("location-name");
    var desc = document.getElementById("description");
    console.log(desc);
    
    desc.innerHTML = `<p>${JSON.stringify(data.results[0].content)}</p>`;

    //desc.textContent = textd;
    var media = data.results[0].images;

    for (var index = 0; index < media.length; index++) {
        markup += '<li data-target="#myCarousel" data-slide-to="' + index + '"></li>';
    }
    $('#myCarousel .carousel-indicators').html(markup);
    markup = '';
    for (var index = 0; index < media.length; index++) {
        var imageURL = media[index].source_url;

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

