$(function(){
  var $submitBtn = $('#submitBtn');
  var $quote = $('#quote');
  var $author = $('#author');
  var $loader = $('.loader');
  var $T_weather_icon = $('#T_weather_icon');
  // var latitude;
  // var longitude;



  $submitBtn.on('click', function(e) {
  // prevent the default behavior of the link
  e.preventDefault();
  var url_link = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";

  $.ajax({
    url: url_link,
    headers: {'X-Mashape-Key': "eacbvBkAmomshikYXvMKDr0B269ap16OPTRjsn9MD1cVErXCtc",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
    },
    type: "POST",
    dataType: 'json',
    beforeSend: function() {
      $loader.show();
    }
  }).done(successFunction)
    .fail(failFunction)
    .always(alwaysFunction);
  });

  function alwaysFunction(){
    $loader.hide();
  }
  function successFunction(data){
    $quote.html('<strong>&ldquo;</strong><em> '+ data.quote +' </em><strong>&rdquo;</strong>');
    $author.html('<small>- ' + data.author + '</small>');
  }
  function failFunction(request, textStatus, errorThrown){
    $quote.text(textStatus + ' occurred during your request: '+ errorThrown );
  }

  $submitBtn.trigger('click');

  $.ajax({
    // where the data live
    url: "http://morning-dusk-83442.herokuapp.com/users",
    headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Accept": "application/json"
    },
    type: "GET",

    // what is their type
    dataType: 'json',
    // show the loader before making the request
    beforeSend: function (request) {
    },
  }).done(teamDoneFn)
    .fail(teamFailFn);

  function teamFailFn(request, textStatus, errorThrown){
    $('#members').text(request+ textStatus + ' occurred during your request: '+ errorThrown );
  }
  function teamDoneFn(data){
    var member_name = [];
    data.forEach(function(unit){
      member_name.push(unit.name);
    });
    $('#members').text(member_name.join(', '));
  }

  // get lat & long from address
  $.get('https://ipapi.co/json/', function( data ){
    weather_grab(data.latitude, data.longitude);
    forecast_grab(data.latitude, data.longitude);
  });

  // define weather based on lat & long
  var weather_grab = function(latitude, longitude){
    // define weather url
    var URL_weather = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units=metric&APPID=780850e6d3554ee2a6717fdd0baa203a';

    $.get(URL_weather, function( data ){
      alert(data);
      $('#location').text(data.name+", "+data.sys.country);

      $('#T_weather').text(data.weather[0].description.toTitleCase());

      $('#T_temp').text(data.main.temp.toFixed(1));

      // identify icon type based on weather code
      // insert weather icon
      $('#T_weather_icon').html(icon_return(weather_code_trans(data.weather[0].id)));
    });
  };

  // define forecast based on lat & long
  var forecast_grab = function(latitude, longitude){
    // define forecast url
    var URL_forecast =
     'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&units=metric&APPID=780850e6d3554ee2a6717fdd0baa203a';

    $.get(URL_forecast, function( data ){
      alert(URL_forecast);
      alert(data.list[0].dt_txt);
      var forecast24 = data.list[7];
      var forecast48 = data.list[15];
      var forecast72 = data.list[23];

      $('#T24_temp').html(Math.round(forecast24.main.temp)+"&#176;C");
      $('#T48_temp').html(Math.round(forecast48.main.temp)+"&#176;C");
      $('#T72_temp').html(Math.round(forecast72.main.temp)+"&#176;C");

      $('#T24_weather_icon').html(icon_return(weather_code_trans(forecast24.weather[0].id)));
      $('#T48_weather_icon').html(icon_return(weather_code_trans(forecast48.weather[0].id)));
      $('#T72_weather_icon').html(icon_return(weather_code_trans(forecast72.weather[0].id))); 

      // identify icon type based on weather code
      // insert weather icon
      //$('#T_weather_icon').html(icon_return(weather_code_trans(data.weather[0].id)));
    });
  };

  // 7,15,23
  // {"dt":1471111200,"main":{"temp":28.6,"temp_min":27.91,"temp_max":28.6,"pressure":1022.2,"sea_level":1022.84,"grnd_level":1022.2,"humidity":99,"temp_kf":0.68},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":32},"wind":{"speed":3.46,"deg":158.011},"rain":{},"sys":{"pod":"n"},"dt_txt":"2016-08-13 18:00:00"},
// {"city":{"id":1880252,"name":"Singapore","coord":{"lon":103.850067,"lat":1.28967},"country":"SG","population":0,"sys":{"population":0}},"cod":"200","message":0.0319,"cnt":40,"list":[{"dt":1471111200,"main":{"temp":28.6,"temp_min":27.91,"temp_max":28.6,"pressure":1022.2,"sea_level":1022.84,"grnd_level":1022.2,"humidity":99,"temp_kf":0.68},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"clouds":{"all":32},"wind":{"speed":3.46,"deg":158.011},"rain":{},"sys":{"pod":"n"},"dt_txt":"2016-08-13 18:00:00"},



  // add title case to Strings
  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // get type of weather from weather code (http://openweathermap.org/weather-conditions)
  var weather_code_trans = function(number){
    if (number >= 200 && number <= 232 || number >= 960 && number <= 962 || number >= 900 && number <= 902){
      return "thunder-storm"; }
    if (number >= 500 && number <= 531){
      return "rainy"; }
    if (number >= 300 && number <= 321){
      return "sunny_showers"; }
    if (number >= 600 && number <= 622 || number == 906){
      return "snowy"; }
    if (number == 800 || number >= 951 && number <= 955){
      return "clear"; }
    if (number >= 801 && number <= 804){
      return "cloudy"; }
    if (number >= 701 && number <= 781 || number >= 903 && number <= 905 || number >= 956 && number <= 959){
      return "others"; }
  };

  // function to swap out weather icon
  var icon_return = function(logo){
    switch (logo) {
    case "thunder-storm":
      return thunder_storm_html;
    case "rainy":
      return rainy_html;
    case "snowy":
      return snowy_html;
    case "cloudy":
      return cloudy_html;
    case 'clear':
      return sunny_html;
    case "sunny_showers":
      return sunny_showers_html;
    default:
      return '??';
    }
  };

  // weather icon html to be inserted
  var sunny_showers_html  = '<div class="icon sun-shower"><div class="cloud"></div><div class="sun"><div class="rays"></div></div><div class="rain"></div></div>';

  var thunder_storm_html =
  '<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>';

  var cloudy_html = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';

  var snowy_html = '<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>';

  var sunny_html = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';

  var rainy_html = '<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>';

});

//{"_id":1880251,"name":"Republic of Singapore","country":"SG","coord":{"lon":103.800003,"lat":1.36667}}
