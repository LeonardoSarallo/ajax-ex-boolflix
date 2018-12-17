$(document).ready(function() {

  $('#button').click(function() {
    var searchVal = $('#search').val();
    console.log(searchVal);

    $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: 'f220b27ce9fae93a14b0e272a5ed631a',
        language: 'it',
        query: searchVal
      },
      success: function(data)
      {
        var film = data.results;

        for (var i = 0; i < film.length; i++) {
          var filmObject= film[i];
          var source = $('#card-template').html();
          var template = Handlebars.compile(source);
          var context = {
            title: filmObject.title, originaltitle: filmObject.original_title, language: filmObject.original_language, vote: filmObject.vote_average

          };
          var html = template(context);
          $('.container').append(html);

        }
      },
      error: function()
      {
        alert('si è verificato un errore');
      }
    });
  });
});
