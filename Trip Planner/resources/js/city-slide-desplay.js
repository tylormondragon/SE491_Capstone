//----------------------added------------------------------------------------------------//
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
//-----------------------------------------//--------------------------------------------//



// var country ="Spain";
// var number = 10;
// var url="https://www.triposo.com/api/20200405/location.json?part_of="+country+"&tag_labels=city&order_by=-score&count=25&fields=name,coordinates,images,snippet&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";
// // var url = "https://www.triposo.com/api/20180206/location.json?&fields=coordinates,name&count=4&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";

// fetch(url)
.then( response => {
    return response.json();
}).then(data =>{
appendCountryInfo(data);
})
.catch(function (err) {
console.log(err);
});

function appendCountryInfo(data) {
    var markup = '';
    var dest = document.getElementById("location-name");
    var desc = document.getElementById("description");
    console.log(desc);

    var countryId = data.results.id;
    dest.textContent = data.results.name;
    var textd =data.results.snippet;
    desc.textContent = textd;
    var media = data.results.booking_info;
    
    for (var index = 0; index < media.length; index++) {
        markup += '<li data-target="#myCarousel" data-slide-to="' + index + '"></li>';
    }
    $('#myCarousel .carousel-indicators').html(markup);
    markup = '';
    for (var index = 0; index < media.length; index++) {
        //var imageURL = media[index].vendor_object_url;
        var imageURL= data.results[index].images[index].sizes.medium.url;

        markup += '<div class="item">';
        markup += '<img src="' +imageURL+ '" style="height:100vh;">'
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