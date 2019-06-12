// multiple
let fullData = [];

// multiple
$(function () {
  if ($("#all-restaurants").length) {
    loadData(function (data) {
      buildAllRestaurants(data);
    });

    $("#location_select").on("change", function () {
      $("#cuisine_select").val("");
      newFilterRestaurants("location", this.value);
    })

    $("#cuisine_select").on("change", function () {
      $("#location_select").val("");
      newFilterRestaurants("cuisine", this.value);
    })
  }
});

// multiple
function loadData(callback) {
  $.get("/restaurants.json").done(function (data) {
    fullData = data;
    callback(data);
  });
}

// multiple
function buildAllRestaurants(data) {
  $("#all-restaurants").empty();
  $.each(data, function (index, value) {
    let restaurant = new Restaurant(value);
    let html = restaurant.multipleHTML();
    $("#all-restaurants").append(html);
  })
}

// multiple
function newFilterRestaurants(type, search) {
  let newData = [];

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
      newData = fullData;
    }
  });

  buildAllRestaurants(newData);
}