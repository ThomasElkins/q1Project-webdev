// API Key // AIzaSyCi-MW1w-4A5cMCJBS9G7dLZryq_lIOLsw

$(function(){

$('#searchButton').click(function(){
  var town = $('#city').val()
  $('#map').append('<iframe src="https://www.google.com/maps/embed/v1/place?q='+ town +'&key=AIzaSyBxPnXkJa0pzukRSn_d1xLRcZDXhEpDJxo" allowfullscreen></iframe>')

$.ajax('https://trailapi-trailapi.p.mashape.com/?limit=6&q[activities_activity_type_name_eq]=hiking&q[city_cont]='+ town +'&radius=30', {
  headers: {
    "X-Mashape-Key": "zUC9v7vhTTmshRZhrNE1rQk5JtbGp1SS6DujsnmsruSvj2RWYd",
    "Accept": "text/plain"
  },
  method: "GET"
}).then(function(data) {
  var hikeArray = data["places"];
  for (var i = 0; i < hikeArray.length; i++){
    var injectName = hikeArray[i]["name"]
    $('#resultsRow').append('<div class="col-md-2">'+ injectName +'</div>')
  }
  // End hike data function
})
// End click function
})
  // End load function
})
