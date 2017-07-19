// API Key // AIzaSyCi-MW1w-4A5cMCJBS9G7dLZryq_lIOLsw

$(function(){

$('#searchButton').click(function(){
  $('.clickable').empty();
  var town = $('#city').val();
  var distance = $('#range').val();
  $('#map').append('<iframe src="https://www.google.com/maps/embed/v1/place?q='+ town +'&key=AIzaSyBxPnXkJa0pzukRSn_d1xLRcZDXhEpDJxo" allowfullscreen></iframe>')

$.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ town +"&key=AIzaSyAoIyj32avw0yFjL4PxPkuI5F6X3_V5jTQ", function(address){
  var lat = address["results"][0]["geometry"]["location"]["lat"]
  var long = address["results"][0]["geometry"]["location"]["lng"]

$.ajax('https://trailapi-trailapi.p.mashape.com/?lat='+ lat +'limit=6&lon='+ long +'&q[activities_activity_type_name_eq]=hiking&q[city_cont]='+ town +'&radius='+ distance +'', {
  headers: {
    "X-Mashape-Key": "zUC9v7vhTTmshRZhrNE1rQk5JtbGp1SS6DujsnmsruSvj2RWYd",
    "Accept": "text/plain"
  },
  method: "GET"
}).then(function(data) {
  var hikeArray = data["places"];
  for (var i = 0; i < hikeArray.length; i++){
    var injectName = hikeArray[i]["name"];
    var injectDist = hikeArray[i]["activities"][0]["length"]
    var injectImage = hikeArray[i]["activities"][0]["thumbnail"]
    $('#resultsRow').append('<div class="col-md-2 clickable"><h4>'+ injectName +'</h4><h6>'+ injectDist +' <img src="'+ injectImage +'"/> ');
  }
  // End hike data function
})
// End lat/long function
})
// End click function
})
  // End load function
})
