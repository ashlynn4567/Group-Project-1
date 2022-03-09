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
  // format the github api url
  var apiRestarauntsUrl =
    "https://api.documenu.com/v2/restaurants/zip_code/" +
    zip +
    "?&key=eda9aa817e609c57e8a4a9e40109f7d9";

  // make a get request to url
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

getRestaurants("97212");
