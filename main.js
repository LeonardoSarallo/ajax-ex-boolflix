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
        console.log(film);
        $('.container').html('');
        for (var i = 0; i < film.length; i++) {

          var filmObject= film[i];
          var voteChanged = (filmObject.vote_average) / 2;
          var rounded = Math.ceil(voteChanged);

          // stampo con Handlebar

          var source = $('#card-template').html();
          var template = Handlebars.compile(source);
          var context = {
            title: filmObject.title, originaltitle: filmObject.original_title, language: languages(filmObject.original_language), vote: voto(rounded)

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



  // Gestisco il voto con le stelle

function voto(rounded)
{
  var starHtml = '';
  var starEmpty = '';

  for (var k = 0; k < rounded; k++) {

    starHtml += '<i class="fas fa-star"></i>';

  }

  for (var x = 0; x < (5 - rounded); x++) {
    starEmpty += '<i class="far fa-star"></i>';
  }

  var risultato = starHtml + starEmpty;

  return risultato;
}



function languages(language)
{
  var supportedLanguages = ['it', 'en'];
  var languageOutput = '';
  if (supportedLanguages.includes(language)) {
    languageOutput = "<img class='flag' src='" + language + ".png' />";
  }
  else {
    languageOutput = language + ' non supportata';
  }
  return languageOutput;
}
