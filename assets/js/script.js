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
    getRestaurants(zipCode);
    getMovies(zipCode);

    //     // clear old content
    //     restaurantsContainerEl.textContent = "";
    //     eventsContainerEl.textContent = "";
    //     zipInputEl.value = "";
    //   } else {
    //     alert("Please enter a zip code");
  }
};

// function to get restaurants
var getRestaurants = function (zip) {
  // format the restaurants api url
  var apiRestaurantsUrl =
    "https://api.documenu.com/v2/restaurants/zip_code/" +
    zip +
    "?&key=eda9aa817e609c57e8a4a9e40109f7d9";

  // make a request to url
  fetch(apiRestaurantsUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Documenu");
    });
};

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

var displayRestaraunts = function (restaurantsData) {
  // clear any previous entries in restaurant section
  $("#restaurants").empty();

  // get data for 15 restaurants
  for (i = 1; i <= 15; i++) {
    // create elements for restaurant card
    var restaurantCard = $("<div>").addClass("p-10");
    var restaurantLi = $("<li>").addClass(
      "rounded-lg shadow-lg bg-white max-w-sm"
    );

    // append <li> to <div> restaurant card
    restaurantCard.append(restaurantLi);

    // create elements for restaurant card body
    var restaurantCardBody = $("<div>").addClass("p-6");

    // append <div> to <li>
    restaurantLi.append(restaurantCardBody);

    // create elements for restaurant card content
    var restaurantName = $("<h5>")
      .addClass("text-gray-800 text-xl font-medium mb-5")
      .text(restaurantsData[i].restaurant_name);
  }
};

// event handler
$("#submit").on("click", formSubmitHandler);
