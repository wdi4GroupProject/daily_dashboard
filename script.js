$(function() {
  var $search = $('#search'),
    $do_search = $('#do_search'),
    $search_result = $('#search_result');
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
