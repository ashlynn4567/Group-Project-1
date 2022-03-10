// get zipcode from input form
var zipInputEl = document.querySelector("#input-zipcode");

// restaurants container id = restaurants-container
var restaurantsContainerEl = document.querySelector("#restaurants-container");

// events container id = events-container
var eventsContainerEl = document.querySelector("#events-container");

// search form submit handler
var formSubmitHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var zipCode = zipInputEl.value.trim();

  if (zipCode) {
    // getRestaurants(zipCode);
    getMovies(zipCode);

    //     // clear old content
    //     restaurantsContainerEl.textContent = "";
    //     eventsContainerEl.textContent = "";
    //     zipInputEl.value = "";
    //   } else {
    //     alert("Please enter a zip code");
  }
};

// // function to get restaurants
// var getRestaurants = function (zip) {
//   // format the restaurants api url
//   var apiRestaurantsUrl =
//     "http://opentable.herokuapp.com/api/restaurants?zip=" + zip;

//   // make a request to url
//   fetch(apiRestaurantsUrl)
//     .then(function (response) {
//       // request was successful
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert("Unable to connect to Documenu");
//     });
// };

// function to get movies
var getMovies = function (zip) {
  // format the movies api url
  var apiMoviesUrl =
    "http://data.tmsapi.com/v1.1/movies/showings?startDate=" +
    formattedDate +
    "&zip=" +
    zip +
    "&api_key=yhya8sn6myd6z9exxw4538ph";

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

var displayMovies = function (moviesData) {
  // clear any previous entries in restaurant section
  // $("#movies").empty();

  // display movie title
  $.each(moviesData, function (index, movie) {
    console.log(movie.title);

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
    var movieName = $("<h5>")
      .addClass("text-gray-800 text-xl font-medium mb-5")
      .text(movie.title);

    movieCardBody.append(movieName);

    // display showtimes & theaters
    $.each(movie.showtimes, function (index, showtime) {
      console.log(showtime.theatre.name);
      console.log(showtime.dateTime);

      // create elements for showtimes
      var showtimesUl = $("<ul>");
      var showtimeLi = $("<li>");

      // append <li> to <ul>
      showtimesUl.append(showtimeLi);

      var showtimeP = $("<p>")
        .addClass("text-gray-800 text-base mb-4")
        .text(showtime.theatre.name + " - " + showtime.dateTime);

      showtimeLi.append(showtimeP);
      movieCardBody.append(showtimesUl);
    });

    // append card to movie <ul> on page
    $("#movies").append(movieCard);
  });
};

// event handler
$("#submit").on("click", formSubmitHandler);
