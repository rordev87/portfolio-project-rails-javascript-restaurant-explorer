// initialize empty array - used to hold full data for all restaurants
let fullData = [];

// document ready - identify content on restaurants list page and attach event handlers to filter select controls
$(function () {
  if ($("#all-restaurants").length) {
    loadData(function (data) {
      // use data to build an index list of all restaurants
      buildAllRestaurants(data);
    });

    // location filter
    $("#location_select").on("change", function () {
      $("#cuisine_select").val("");
      newFilterRestaurants("location", this.value);
    })

    // cuisine filter
    $("#cuisine_select").on("change", function () {
      $("#location_select").val("");
      newFilterRestaurants("cuisine", this.value);
    })
  }
});

// utilize a callback function to execute ajax get request, wait for response - assign data to variable - before returning
function loadData(callback) {
  $.get("/restaurants.json").done(function (data) {
    fullData = data;
    callback(data);
  });
}

// build html and append for all restaurants passed via the json data object
function buildAllRestaurants(data) {
  // clear element container for all restaurants
  $("#all-restaurants").empty();

  // iterate over json data - build individual restaurant objects and html - append to page
  $.each(data, function (index, value) {
    let restaurant = new Restaurant(value);
    let html = restaurant.multipleHTML();
    $("#all-restaurants").append(html);
  })
}

// filters for location or cuisine
function newFilterRestaurants(type, search) {
  // empty array to hold filtered json data
  let newData = [];

  // iterate over fullData for restaurants and push to array based on matches
  $.each(fullData, function (index, value) {
    if (search != "") {
      if (type == "location") {
        if (value.location["city"] == search) {
          newData.push(value);
        }
      } else if (type == "cuisine") {
        for (var i = 0; i < value.cuisines.length; i++) {
          if (value.cuisines[i]["name"] == search) {
            newData.push(value);
            return;
          }
        }
      }
    } else {
      // empty search results in passing all json data
      newData = fullData;
    }
  });

  // take new json data and pass it to function for building restaurants and html
  buildAllRestaurants(newData);
}
