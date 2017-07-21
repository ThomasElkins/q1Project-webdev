var gMarkers = [];
var bounds;
var map;
function removeMarkers(){
  for(i=0; i<gMarkers.length; i++){
    gMarkers[i].setMap(null);
  }
};
function initMap() {

  $('#searchButton').click(function(startEvent){
    var myOptions = {
      minZoom: 10,
      center: new google.maps.LatLng(cityLat, cityLong),
      mapTypeId: google.maps.MapTypeId.HYBRID

    }
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    bounds = new google.maps.LatLngBounds();
    if (gMarkers.length >= 1) {removeMarkers()}
    $('.clickable').empty();
    var town = $('#city').val();
    var distance = $('#range').val();
    var cityLat
    var cityLong


  $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ town +"&key=AIzaSyAoIyj32avw0yFjL4PxPkuI5F6X3_V5jTQ", function(address){
    cityLat = address["results"][0]["geometry"]["location"]["lat"]
    cityLong = address["results"][0]["geometry"]["location"]["lng"]


  $.ajax('https://trailapi-trailapi.p.mashape.com/?lat='+ cityLat +'&limit=9&lon='+ cityLong +'&q[activities_activity_type_name_eq]=hiking&q[city_cont]='+ town +'&radius='+ distance +'', {
    headers: {
      "X-Mashape-Key": "zUC9v7vhTTmshRZhrNE1rQk5JtbGp1SS6DujsnmsruSvj2RWYd",
      "Accept": "text/plain"
    },
    method: "GET"
  }).then(function(data) {
    var hikeArray = data["places"];
    console.log(hikeArray)
    var markers = [];
    for (var i = 0; i < hikeArray.length; i++){
      var hikeName = hikeArray[i]["name"];
      var hikeInfo = hikeArray[i]["description"]
      var hikeDist = hikeArray[i]["activities"][0]["length"];
      var hikeLat = hikeArray[i]["lat"];
      var hikeLong = hikeArray[i]["lon"];
      var tempMarkers = [];
      tempMarkers.push(hikeName, hikeLat, hikeLong, hikeInfo);
      markers.push(tempMarkers);
      $('#hikeLanding').append('<div class="clickable"><blockquote><p>'+ hikeName +'</p><footer>'+ hikeDist +' miles</footer></blockquote></div>');

        // End for loop for hike data
    }
    var infowindow = new google.maps.InfoWindow(), marker, i;
    for (i = 0; i < markers.length; i++) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i][1], markers[i][2]),
            map: map
        });
        gMarkers.push(marker);
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
        bounds.extend(position);
        //End loop
    }
map.fitBounds(bounds);
    var boundsListener = google.maps.event.addListenerOnce((map), 'bounds_changed', function(event) {
      this.setZoom(7);
    });
    // End hike data function
  })
  // End lat/long function
  })
  // End click function
  })
  // End load function
}
