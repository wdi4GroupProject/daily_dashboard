$(function(){
var $temp = $('#temp'),
    $temp_min = $('#temp_min'),
    $temp_max = $('#temp_max'),
    $humidity = $('#humidity'),
    $weather = $('#weather'),
    $icon = $('#icon');
    var icon;
  $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?id=1880251&APPID=cea4fd347e4b154f07932297c81bf072&units=metric', //the URL to the API
      type: 'GET', //method
      dataType: 'json',
    }).done(function(data) {
      icon='http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
      $temp.text(data.main.temp);
      $temp_min.text(data.main.temp_min);
      $temp_max.text(data.main.temp_max);
      $humidity.text(data.main.humidity);
      $weather.text(data.weather[0].main);
      $icon.css({"background-image":"url("+icon+")","background-size":"cover"});
    })
    .fail(function(request, textStatus, errorThrown) {
      alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    });

});
