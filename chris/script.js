$(function(){
  var $submitBtn = $('#submitBtn');
  var $quote = $('#quote');
  var $author = $('#author');
  var $loader = $('.loader');


  $submitBtn.on('click', function(e) {

  // prevent the default behavior of the link
  e.preventDefault();
  var url_link = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";

  // execute the AJAX request
  $.ajax({
    // where the data live
    url: url_link,
    headers: {'X-Mashape-Key': "eacbvBkAmomshikYXvMKDr0B269ap16OPTRjsn9MD1cVErXCtc",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
    },
    type: "POST",

    // what is their type
    dataType: 'json',
    // show the loader before making the request
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



});
