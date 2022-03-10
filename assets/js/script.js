// input form id = zipcode
var zipInputEl = document.querySelector("#zipcode");

// restaurants container id = restaurants-container
var restaurantsContainerEl = document.querySelector("#restaurants-container");

// events container id = events-container
var eventsContainerEl = document.querySelector("#events-container");

// // search form submit handler
// var formSubmitHandler = function (event) {
//   // prevent page from refreshing
//   event.preventDefault();

//   // get value from input element
//   var zipCode = zipInputEl.value.trim();

//   if (zipCode) {
//     getRestaurants(zipCode);
//     getEvents(zipCode);

//     // clear old content
//     restaurantsContainerEl.textContent = "";
//     eventsContainerEl.textContent = "";
//     zipInputEl.value = "";
//   } else {
//     alert("Please enter a zip code");
//   }
// };

// function to get restaurants
var getRestaurants = function (zip) {
  // format the restaurants api url
  var apiRestarauntsUrl =
    "https://api.documenu.com/v2/restaurants/zip_code/" +
    zip +
    "?&key=eda9aa817e609c57e8a4a9e40109f7d9";

  // make a request to url
  fetch(apiRestarauntsUrl)
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
  return n
}

let currentDate = new Date()
let formattedDate = currentDate.getFullYear() + "-" + addLeadingZeros(currentDate.getMonth() + 1) + "-" + addLeadingZeros(currentDate.getDate())
console.log(formattedDate);

getRestaurants("97212");
getMovies("97212");
