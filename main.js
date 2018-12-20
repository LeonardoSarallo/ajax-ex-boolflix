$(document).ready(function() {


  $('#button').click(function() {
    filmTvSeries();
  });
});






  // Funzione chiamata Film / tvSeries

function filmTvSeries() {
  var searchVal = $('#search').val();


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
      console.log(data);
      $('.container').html('');
      var film = data.results;

      for (var i = 0; i < film.length; i++) {
        // $('.container').html('');
        var filmContent = film[i];

        print(filmContent);

      }
      $.ajax({
        url: 'https://api.themoviedb.org/3/search/tv',
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
            tvSeries = film[i];
            tvSeries.title = tvSeries.name;
            tvSeries.original_title = tvSeries.original_name;
            print(tvSeries);

          }

        },
        error: function()
        {
          alert('si è verificato un errore');
        }

      });
    },
    error: function()
    {
      alert('si è verificato un errore');
    }
  });
}



  //Funzione poster


function poster(filmContent)
{
  var poster = '';
  var posterMovie = 'https://image.tmdb.org/t/p/w342' + filmContent.poster_path;
  var poster = "<img class='' src='" + posterMovie + "' />";
  return poster;

}





  // Funzione per stampare

function print(filmContent)
{



  var voteChanged = (filmContent.vote_average) / 2;
  var rounded = Math.ceil(voteChanged);



  var source = $('#card-template').html();
  var template = Handlebars.compile(source);
  var context = {

   poster: poster(filmContent), title: filmContent.title, originaltitle: filmContent.original_title, language: languages(filmContent.original_language), vote: voto(rounded), overview: filmContent.overview

  };
  var html = template(context);
  $('.container').append(html);
}

  // Gestisco il voto con le stelle

function voto(rounded)
{
  var starHtml = '';
  var starEmpty = '';

  for (var k = 0; k < rounded; k++) {

    starHtml += '<i id="yellow" class="fas fa-star"></i>';

  }

  for (var x = 0; x < (5 - rounded); x++) {
    starEmpty += '<i class="far fa-star"></i>';
  }

  var risultato = starHtml + starEmpty;

  return risultato;
}

  //Gestione flags

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
