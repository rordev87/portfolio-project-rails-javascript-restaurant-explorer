$(function() {
  if($("#all-restaurants").length) {
    getAllRestaurants()
  }
  if($("#single-restaurant").length) {
    getSingleRestaurant()
  }
})

function getAllRestaurants() {
  $.get("/restaurants.json", function(data) {
    $.each(data, function(index, value) {
      let restaurant = new Restaurant(value);
      restaurant.phone = restaurant.formatPhone(restaurant.phone);
      let html = restaurant.basicHTML();
      $("#all-restaurants").append(html);
    })
  })
}

function getSingleRestaurant() {
  let currentId = parseInt($("#restaurant-id").attr("data-id"));
  $.get("/restaurants/" + currentId + ".json", function(data) {
    let restaurant = new Restaurant(data);
    restaurant.phone = restaurant.formatPhone(restaurant.phone)
    let singleHtml = restaurant.singleHTML();
    $("#single-restaurant").append(singleHtml)
  })
}

class Restaurant {
  constructor(obj) {
    this.id = obj.id
    this.name = obj.name
    this.description = obj.description
    this.phone = obj.phone
    this.email = obj.email
    this.image = obj.image_url
    this.location = obj.location.city
  }
}

Restaurant.prototype.formatPhone = function(phone_number) {
    var re = /\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g; 
    var subst = '($1) $2-$3';
    var result = phone_number.replace(re, subst);
    return result;
  }

Restaurant.prototype.basicHTML = function() {
  return (`
    <div class="card mb-4">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="/assets/${this.image}" class="card-img" alt="${this.name}" style="border-radius: 0.25rem 0 0 0.25rem;">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title"><a href="/restaurants/${this.id}">${this.name}</a></h5>
            <p class="card-text">${this.description}</p>
            <div class="card-info-box">
              <p class="card-text mb-n1"><i class="fa fa-phone" style="color: black;"></i> <small class="text-muted">${this.phone}</small></p>
              <p class="card-text mb-n1"><i class="fa fa-envelope" style="color: black;"></i> <small class="text-muted">${this.email}</small></p>
              <p class="card-text"><i class="fa fa-map-marker" style="color: black;"></i> <small class="text-muted">${this.location}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
}

Restaurant.prototype.singleHTML = function() {
  return (`
    <div class="card mb-3">
      <img id="restaurant-image" src="/assets/${this.image}" class="card-img-top" alt="${this.name}">
      <div class="card-body">
        <h5 id="restaurant-name-card" class="card-title">${this.name}</h5>
        <p id="restaurant-description" class="card-text">${this.description}</p>
        <div class="card-info-box">
          <p class="card-text mb-n1"><i class="fa fa-phone" style="color: black;"></i> <small id="restaurant-phone" class="text-muted">${this.phone}</small></p>
          <p class="card-text mb-n1"><i class="fa fa-envelope" style="color: black;"></i> <small id="restaurant-email" class="text-muted">${this.email}</small></p>
          <p class="card-text"><i class="fa fa-map-marker" style="color: black;"></i> <small id="restaurant-location" class="text-muted">${this.location}</small></p>
        </div>
      </div>
    </div>
  `)
}