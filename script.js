$(function(){
var $result = $('#result');
  $.ajax({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous', //the URL to the API
      type: 'POST', //method
      dataType: 'json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "Zw09h59RXhmshAoVrlyCA2ftvVrgp1xR1mPjsnRqmoprcKMJ3B"); // Enter your mashape key
      }
    }).done(function(data) {
      $result.text(data.quote+' ---By: '+data.author);
    })
    .fail(function(request, textStatus, errorThrown) {
      $result.text('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    });

});
