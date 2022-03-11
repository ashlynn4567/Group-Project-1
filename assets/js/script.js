// get zipcode from input form
var zipInputEl = document.querySelector("#input-zipcode");

// search form submit handler
var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var zipCode = zipInputEl.value.trim();

  if (zipCode) {
    getBreweries(zipCode);
    getMovies(zipCode);

    zipInputEl.value = "";
  } else {
    alert("Please enter a zip code");
  }
};

// function to get breweries
var getBreweries = function (zip) {
  // format the restaurants api url
  var apiBreweriesUrl =
    "https://api.openbrewerydb.org/breweries?by_postal=" + zip;

  // make a request to url
  fetch(apiBreweriesUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayBreweries(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

// function to get movies
var getMovies = function (zip) {
  // format the movies api url
  var apiMoviesUrl =
    "https://data.tmsapi.com/v1.1/movies/showings?startDate=" +
    formattedDate +
    "&zip=" +
    zip +
    "&api_key=z5sq89ny4cppt4xqgkd44rtw";

  //&api_key=yhya8sn6myd6z9exxw4538ph

  // make a request to url
  fetch(apiMoviesUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayMovies(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect");
    });
};

//add DATE YO - JACKSON
function addLeadingZeros(n) {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
}

let currentDate = new Date();
let formattedDate =
  currentDate.getFullYear() +
  "-" +
  addLeadingZeros(currentDate.getMonth() + 1) +
  "-" +
  addLeadingZeros(currentDate.getDate());
console.log(formattedDate);

// Display breweries on page
var displayBreweries = function (breweriesData) {
  // clear any previous entries in breweries section
  $("#breweries").empty();

  // display brewery name
  $.each(breweriesData, function (index, brewery) {
    // create elements for movie card
    var breweryCard = $("<div>").addClass("p-10");
    var breweryLi = $("<li>").addClass(
      "rounded-lg shadow-lg bg-white max-w-sm"
    );

    // append <li> to <div> brewery card
    breweryCard.append(breweryLi);

    // create elements for brewery card body
    var breweryCardBody = $("<div>").addClass("p-6");

    // append <div> to <li>
    breweryLi.append(breweryCardBody);

    // create element for brewery title content
    var breweryName = $("<h5>")
      .addClass("text-gray-800 text-xl font-medium mb-5")
      .text(brewery.name);

    var breweryAddress = $("<p>")
      .addClass("text-gray-800 text-base mb-4")
      .text(brewery.street);

    var breweryUrl = $("<a>")
      .attr("href", brewery.website_url)
      .attr("target", "blank")
      .text(brewery.website_url);

    breweryCardBody.append(breweryName, breweryAddress, breweryUrl);

    // append card to breweries section on page
    $("#breweries").append(breweryCard);
  });
};

// Display movies on page
var displayMovies = function (moviesData) {
  // clear any previous entries in restaurant section
  $("#movies").empty();

  // display movie title
  $.each(moviesData, function (index, movie) {
    // create elements for movie card
    var movieCard = $("<div>").addClass("p-10");
    var movieLi = $("<li>").addClass("rounded-lg shadow-lg bg-white max-w-sm");

    // append <li> to <div> restaurant card
    movieCard.append(movieLi);

    // create elements for restaurant card body
    var movieCardBody = $("<div>").addClass("p-6");

    // append <div> to <li>
    movieLi.append(movieCardBody);

    // create element for movie title content
    var movieName = $("<h5>").addClass(
      "text-gray-800 text-xl font-medium mb-5"
    );

    var movieUrl = $("<a>")
      .attr("href", movie.officialUrl)
      .attr("target", "blank")
      .text(movie.title);

    movieName.append(movieUrl);

    movieCardBody.append(movieName);

    // display showtimes & theaters
    $.each(movie.showtimes, function (index, showtime) {
      var newDate = new Date(showtime.dateTime);
      movieTime = newDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // create elements for showtimes
      var showtimesUl = $("<ul>");
      var showtimeLi = $("<li>");

      // append <li> to <ul>
      showtimesUl.append(showtimeLi);

      var showtimeP = $("<p>")
        .addClass("text-gray-800 text-base mb-4")
        .text(showtime.theatre.name + " - " + movieTime);

      showtimeLi.append(showtimeP);
      movieCardBody.append(showtimesUl);
    });

    // append card to movie <ul> on page
    $("#movies").append(movieCard);
  });
};

// event handler
$("#submit").on("click", formSubmitHandler);
