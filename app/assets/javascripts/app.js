$(function () {
  if ($("#all-restaurants").length) {
    getAllRestaurants()
  }

  if ($("#single-restaurant").length) {
    let currentId = parseInt($("#restaurant-id").attr("data-id"));

    getSingleRestaurant(currentId);

    $("#add-comment-form").submit(function (event) {
      event.preventDefault();
      let values = $(this).serialize();
      addNewComment(values);
      $("#body-entry").val("");
      $("#rating-entry").val("");
      if ($("#no-comments-listed").length) {
        $("#no-comments-listed").remove();
      }
    })
  }

  $("#location_select").on("change", function () {
    $("#cuisine_select").val("");
    filterRestaurants("location", this.value);
  })

  $("#cuisine_select").on("change", function () {
    $("#location_select").val("");
    filterRestaurants("cuisine", this.value);
  })
})

function getAllRestaurants() {
  $.get("/restaurants.json", function (data) {
    $.each(data, function (index, value) {
      let restaurant = new Restaurant(value);
      restaurant.phone = restaurant.formatPhone(restaurant.phone);
      restaurant.cuisines = restaurant.getCuisineNames(restaurant.cuisines);
      let html = restaurant.basicHTML();
      $("#all-restaurants").append(html);
    })
  })
}

function getSingleRestaurant(currentId) {
  $("#form-restaurant-id").val(currentId);
  $("#single-restaurant").empty();
  $("#single-restaurant-comments").empty();
  $.get("/restaurants/" + currentId + ".json", function (data) {
    let restaurant = new Restaurant(data);
    restaurant.phone = restaurant.formatPhone(restaurant.phone);
    restaurant.cuisines = restaurant.getCuisineNames(restaurant.cuisines);
    let singleHtml = restaurant.singleHTML();
    let pager = restaurant.buildPager(currentId)
    let comments = restaurant.buildComments(data.comments)
    $("#restaurant-name").text(restaurant.name);
    $("#single-restaurant").append(singleHtml).append(pager);
    $("#single-restaurant-comments").append(comments);
  });
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
    this.cuisines = obj.cuisines
  }
}

function filterRestaurants(type, search) {
  $(".card").css("display", "block");
  $("#no-restaurants").css("display", "none");
  if (search != "") {
    if (type == "location") {
      let allCards = $(".card");
      allCards.each(function (index, value) {
        if (value.getElementsByClassName("text-location")[0].innerText != search) {
          $(".card").eq(index).css("display", "none");
        }
      });

      let visible = $(".card[style='display: block;']").length;
      if (visible == 0) {
        $("#no-restaurants").css("display", "block")
      }
    } else if (type == "cuisine") {
      let allCards = $(".card");
      allCards.each(function (index, value) {
        let entries = value.getElementsByClassName("restaurant-cuisines")[0].getElementsByTagName("p");
        // debugger;
        let match = false;

        for (var i = 0; i < entries.length; i++) {
          if (entries[i].innerText != search) {
            match = false;
          } else {
            match = true;
            return;
          }
        }
        if (match != true) {
          $(".card").eq(index).css("display", "none");
        }
      });

      let visible = $(".card[style='display: block;']").length;
      if (visible == 0) {
        $("#no-restaurants").css("display", "block")
      }
    }
  }
}

Restaurant.prototype.buildComments = function (commentsData) {
  commentsArray = []
  if (commentsData.length > 0) {
    $.each(commentsData, function (index, value) {
      comment =
        `<div class="comments-media media my-3">
          <img src="/assets/${value.user.avatar.image_url}" class="mr-3" alt="${value.user.avatar.name}">
          <div class="media-body">
            <h5 class="mt-0">Comment from ${value.user.first_name} ${value.user.last_name}</h5>
            ${value.body}
          </div>
          <div class="media-rating">
          <i class="fa fa-star text-warning" aria-hidden="true"></i> ${value.rating}
          </div>
        </div>`;
      commentsArray.push(comment);
    })
  } else {
    comment = `<div id="no-comments-listed" class="comments-media my-3">No Comments for this Restaurant</div>`
    commentsArray.push(comment);
  }
  return commentsArray;
}

Restaurant.prototype.buildPager = function (currentId) {
  let previousId = parseInt(currentId) - 1;
  let nextId = parseInt(currentId) + 1;
  return (`
    <nav aria-label="pager">
      <ul class="pagination">
        <li class="page-item ${currentId == 1 ? 'disabled' : ''}">
          <a id="previous-restaurant" class="page-link" onclick="getSingleRestaurant(${previousId}); return false;" href="#" tabindex="-1" aria-disabled="${currentId == 1 ? 'true' : 'false'}">Previous</a>
        </li>
        <li class="page-item">
          <a id="next-restaurant" class="page-link" onclick="getSingleRestaurant(${nextId}); return false;" href="#">Next</a>
        </li>
      </ul>
    </nav>
  `)
}

Restaurant.prototype.formatPhone = function (phone_number) {
  var re = /\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g;
  var subst = '($1) $2-$3';
  var result = phone_number.replace(re, subst);
  return result;
}

Restaurant.prototype.getCuisineNames = function (cuisinesArray) {
  cuisines = "";
  if (cuisinesArray.length > 0) {
    cuisinesArray.forEach(function (cuisine, index) {
      if (index == cuisinesArray.length - 1) {
        cuisines += `<p class="ml-1">${cuisine.name}</p>`
      } else {
        cuisines += `<p class="ml-1">${cuisine.name}</p><p>,</p>`
      }
    })
  }
  return cuisines;
}

Restaurant.prototype.basicHTML = function () {
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
              <div class="restaurant-contact">
                <p class="card-text mb-n1"><i class="fa fa-phone" style="color: black;"></i> <small class="text-muted">${this.phone}</small></p>
                <p class="card-text mb-n1"><i class="fa fa-envelope" style="color: black;"></i> <small class="text-muted">${this.email}</small></p>
                <p class="card-text"><i class="fa fa-map-marker" style="color: black;"></i> <small class="text-muted text-location">${this.location}</small></p>
              </div>
              <div class="restaurant-cuisines">
                ${this.cuisines} <p class="ml-1"><strong>Cuisines</strong>: </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
}

Restaurant.prototype.singleHTML = function () {
  return (`
    <div class="card mb-3">
      <img id="restaurant-image" src="/assets/${this.image}" class="card-img-top" alt="${this.name}">
      <div class="card-body">
        <h5 id="restaurant-name-card" class="card-title">${this.name}</h5>
        <p id="restaurant-description" class="card-text">${this.description}</p>
        <div class="card-info-box">
        <div class="restaurant-contact">
          <p class="card-text mb-n1"><i class="fa fa-phone" style="color: black;"></i> <small class="text-muted">${this.phone}</small></p>
          <p class="card-text mb-n1"><i class="fa fa-envelope" style="color: black;"></i> <small class="text-muted">${this.email}</small></p>
          <p class="card-text"><i class="fa fa-map-marker" style="color: black;"></i> <small class="text-muted">${this.location}</small></p>
        </div>
        <div class="restaurant-cuisines">
          ${this.cuisines} <p class="ml-1"><strong>Cuisines</strong>: </p>
        </div>
      </div>
    </div>
  `)
}

function addNewComment(values) {
  let fullname = $("#user-fullname").attr("data-value");
  let avatar_url = $("#user-avatar-url").attr("data-value");
  var newComment = $.post('/comments', values);
  newComment.done(function (data) {
    comment =
      `<div class="comments-media media my-3">
          <img src="/assets/${avatar_url}" class="mr-3" alt="${fullname}">
          <div class="media-body">
            <h5 class="mt-0">Comment from ${fullname}</h5>
            ${data['body']}
          </div>
          <div class="media-rating">
          <i class="fa fa-star text-warning" aria-hidden="true"></i> ${data['rating']}
          </div>
        </div>`;
    $("#single-restaurant-comments").append(comment);
  });
}