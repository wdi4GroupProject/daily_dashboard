$(function() {
  var $result = $('#result'),
    $search = $('#search'),
    $do_search = $('#do_search'),
    $search_result = $('#search_result');
  var $temp = $('#temp'),
    $temp_min = $('#temp_min'),
    $temp_max = $('#temp_max'),
    $humidity = $('#humidity'),
    $weather = $('#weather'),
    $country = $('#country'),
    $icon = $('#icon');
  var icon;
  $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous', //the URL to the API
      type: 'POST', //method
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "Zw09h59RXhmshAoVrlyCA2ftvVrgp1xR1mPjsnRqmoprcKMJ3B"); // Enter your mashape key
      }
    }).done(function(data) {
      $result.text(data.quote + ' ---By: ' + data.author);
    })
    .fail(function(request, textStatus, errorThrown) {
      alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    });
  $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?id=1880251&APPID=cea4fd347e4b154f07932297c81bf072&units=metric', //the URL to the API
      type: 'GET', //method
      dataType: 'json',
    }).done(function(data) {
      icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
      $temp.text(data.main.temp);
      $temp_min.text(data.main.temp_min);
      $temp_max.text(data.main.temp_max);
      $humidity.text(data.main.humidity);
      $weather.text(data.weather[0].main);
      $icon.css({
        "background-image": "url(" + icon + ")",
        "background-size": "cover"
      });
      $country.text(data.name);
    })
    .fail(function(request, textStatus, errorThrown) {
      alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    });
  $do_search.on('click', function() {
    $.ajax({
        url: "http://en.wikipedia.org/w/api.php?callback=?", //the URL to the API
        headers: {
          'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4'
        },
        data: {
          action: 'query',
          list: 'search',
          srsearch: $search.val(),
          format: 'json'
        },
        contentType: "application/json; charset=utf-8",
        type: 'GET', //method
        dataType: 'json',
      }).done(function(data) {
        console.log(data);
        $("#search_result").empty();
        $("#search_result").append("Results for <strong> " + $search.val() + " </strong>");
        $.each(data.query.search, function(i, item) {
          $("#search_result").append("<div><a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'>" + item.title + "</a>" + item.snippet + "</div>");
        });
      })
      .fail(function(request, textStatus, errorThrown) {
        alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
      });
  });
});
