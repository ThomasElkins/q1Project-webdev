// API Key // AIzaSyCi-MW1w-4A5cMCJBS9G7dLZryq_lIOLsw

$(function(){

$('#searchButton').click(function(){
  var town = $('#city').val()
  $('#map').append('<iframe src="https://www.google.com/maps/embed/v1/place?q='+ town +'&key=AIzaSyBxPnXkJa0pzukRSn_d1xLRcZDXhEpDJxo" allowfullscreen></iframe>')

})

  // End load function
})
