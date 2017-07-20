// API Key // AIzaSyCi-MW1w-4A5cMCJBS9G7dLZryq_lIOLsw
// MAP JS Key // AIzaSyDysTMMJGBMd3xGFhySpk4D-uKW3p7L47s

// $('#map').append('<iframe src="https://www.google.com/maps/embed/v1/place?q='+ town +'&key=AIzaSyBxPnXkJa0pzukRSn_d1xLRcZDXhEpDJxo" allowfullscreen></iframe>')
// $(document).ready(function(){
function clearMarkers() {
       setMapOnAll(null);
     }

var map;
function initMap() {
  var bounds = new google.maps.LatLngBounds();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.8283, lng: -98.5795},
    zoom: 4
  });

  $('#searchButton').click(function(startEvent){
    $('.clickable').empty();
    var town = $('#city').val();
    var distance = $('#range').val();


  $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ town +"&key=AIzaSyAoIyj32avw0yFjL4PxPkuI5F6X3_V5jTQ", function(address){
    var cityLat = address["results"][0]["geometry"]["location"]["lat"]
    var cityLong = address["results"][0]["geometry"]["location"]["lng"]


  $.ajax('https://trailapi-trailapi.p.mashape.com/?lat='+ cityLat +'limit=6&lon='+ cityLong +'&q[activities_activity_type_name_eq]=hiking&q[city_cont]='+ town +'&radius='+ distance +'', {
    headers: {
      "X-Mashape-Key": "zUC9v7vhTTmshRZhrNE1rQk5JtbGp1SS6DujsnmsruSvj2RWYd",
      "Accept": "text/plain"
    },
    method: "GET"
  }).then(function(data) {
    var hikeArray = data["places"];
    var markers = [];
    for (var i = 0; i < hikeArray.length; i++){
      var hikeName = hikeArray[i]["name"];
      var hikeDist = hikeArray[i]["activities"][0]["length"];
      var hikeLat = hikeArray[i]["lat"];
      var hikeLong = hikeArray[i]["lon"];
      var tempMarkers = [];
      tempMarkers.push(hikeName, hikeLat, hikeLong);
      markers.push(tempMarkers);
      $('#resultsRow').append('<div class="col-md-2 col-lg-2 clickable"><h4>'+ hikeName +'</h4><h6>'+ hikeDist +' miles</h6></div>');

        // End for loop for hike data
    }
    var infowindow = new google.maps.InfoWindow(), marker, i;
    for (i = 0; i < markers.length; i++) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i][1], markers[i][2]),
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
        map.fitBounds(bounds);
    }
    // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    //     this.setZoom(8);
    //     google.maps.event.removeListener(boundsListener);
      // });
    // End hike data function
  })
  // End lat/long function
  })
  // End click function
  })
  // End load function
  // })
}
