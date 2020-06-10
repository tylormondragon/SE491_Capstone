
//var theCity =localStorage.getItem("place-id");  

// var theCity = "Amsterdam"
// console.log(theCity);

//var id="W__3107461";
function getPOIdetails (id){
console.log(id);

var url="https://www.triposo.com/api/20200405/property.json?poi_id="+id+"&fields=name,value&account=I0OEOPWQ&token=0d843xcrheh2r5cz6qj5a0b1kos2qjbp";
fetch(url)
.then( response => {
    return response.json();
}).then(data =>{
  
    
buildLocationList(data);

    /**
     * Add a listing for each store to the sidebar.
    **/
    function buildLocationList(data) {
        var listings = document.getElementById('poi-details');

          data.results.forEach(function(store, i){

            var prop = store;


            var listing = listings.appendChild(document.createElement('div'));
    
            listing.className = 'item';
            var link = listing.appendChild(document.createElement('h3'));

            link.innerHTML = prop.name;
            var details = listing.appendChild(document.createElement('div'));
            link.className = "info-type";
            
            details.innerHTML = prop.value;
            details.className = "info-detail";
            //details.innerHTML = prop.booking_info.price.amount+' '+prop.booking_info.price.currency;


          });
        }


})
}

  


