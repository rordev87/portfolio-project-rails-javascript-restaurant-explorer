// // multiple
// let fullData = [];

// // multiple
// $(function () {
//   if ($("#all-restaurants").length) {
//     loadData(function (data) {
//       buildAllRestaurants(data);
//     });

//     $("#location_select").on("change", function () {
//       $("#cuisine_select").val("");
//       newFilterRestaurants("location", this.value);
//     })

//     $("#cuisine_select").on("change", function () {
//       $("#location_select").val("");
//       newFilterRestaurants("cuisine", this.value);
//     })
//   }
// });

// // single
// $(function () {
//   if ($("#single-restaurant").length) {
//     let currentId = parseInt($("#restaurant-id").attr("data-id"));
//     buildSingleRestaurant(currentId);
//   }

//   $("#add-comment-form").submit(function (event) {
//     event.preventDefault();
//     let commentBodyElement = $("#body-entry");
//     let commentRatingElement = $("#rating-entry");

//     let commentBody = commentBodyElement.val();
//     let commentRating = commentRatingElement.val();

//     let comment = new Comment(commentBody, commentRating);

//     if (comment.valid() == true) {

//       let values = $(this).serialize();
//       addNewComment(values);

//       clearCommentForm(commentBodyElement, commentRatingElement);

//       if ($("#no-comments-listed").length) {
//         $("#no-comments-listed").remove();
//       }
//     } else {
//       commentBodyElement.addClass("error")
//       commentRatingElement.addClass("error")
//       $("#commentErrorText").css("display", "block");
//     }
//   })
// });

// // single
// function clearCommentForm(body, rating) {
//   body.removeClass("error");
//   body.val("");
//   rating.removeClass("error");
//   rating.val("");
//   $("#commentErrorText").css("display", "none");
// }

// // multiple
// function loadData(callback) {
//   $.get("/restaurants.json").done(function (data) {
//     fullData = data;
//     callback(data);
//   });
// }

// // multiple
// function buildAllRestaurants(data) {
//   $("#all-restaurants").empty();
//   $.each(data, function (index, value) {
//     let restaurant = new Restaurant(value);
//     let html = restaurant.multipleHTML();
//     $("#all-restaurants").append(html);
//   })
// }

// // single
// function buildSingleRestaurant(currentId) {
//   assignCurrentSingleDataId(currentId);
//   emptyCurrentSingleData();
//   if ($("#body-entry").length) {
//     clearCommentForm($("#body-entry"), $("#rating-entry"));
//   }

//   $.get("/restaurants/" + currentId + ".json", function (data) {
//     let restaurant = new Restaurant(data);
//     let html = restaurant.singleHTML();
//     let all_ids = getAllRestaurantIds();
//     let pager = restaurant.buildPager(currentId, all_ids);
//     let comments = restaurant.buildComments(data.comments);

//     $("#restaurant-name").text(restaurant.name);
//     $("#single-restaurant").append(html).append(pager);
//     $("#single-restaurant-comments").append(comments);
//   });
// }

// // single
// function assignCurrentSingleDataId(currentId) {
//   $("#form-restaurant-id").val(currentId);
// }

// // single
// function emptyCurrentSingleData() {
//   $("#single-restaurant").empty();
//   $("#single-restaurant-comments").empty();
// }

// // single
// function getAllRestaurantIds() {
//   let ids = $("#restaurant-all-ids").attr("data-id");
//   return ids;
// }

// // restaurant
// class Restaurant {
//   constructor(obj) {
//     this.id = obj.id;
//     this.name = obj.name;
//     this.description = obj.description;
//     this._phone = obj.phone;
//     this.email = obj.email;
//     this.image = obj.image_url;
//     this.location = obj.location.city;
//     this.cuisines = obj.cuisines;
//   }

//   get phone() {
//     var re = /\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g;
//     var subst = '($1) $2-$3';
//     return this._phone.replace(re, subst);
//   }

//   getCuisineNames(cuisines) {
//     let cuisinesOutput = "";
//     if (cuisines.length > 0) {
//       cuisines.forEach(function (cuisine, index) {
//         if (index == cuisines.length - 1) {
//           cuisinesOutput += `<p class="ml-1">${cuisine.name}</p>`
//         } else {
//           cuisinesOutput += `<p class="ml-1">${cuisine.name}</p><p>,</p>`
//         }
//       })
//     }
//     return cuisinesOutput;
//   }

//   multipleHTML() {
//     return (`
//       <div class="card mb-5">
//         <div class="row no-gutters">
//           <div class="col-md-4">
//             <img src="/assets/${this.image}" class="card-img" alt="${this.name}" style="border-radius: 0.25rem 0 0 0.25rem;">
//           </div>
//           <div class="col-md-8">
//             <div class="card-body">
//               <h5 class="card-title"><a href="/restaurants/${this.id}">${this.name}</a></h5>
//               <p class="card-text">${this.description}</p>
//               <div class="card-info-box">
//                 <div class="restaurant-contact">
//                   <p class="card-text mb-n1"><i class="fa fa-phone" style="color: black;"></i> <small class="text-muted">${this.phone}</small></p>
//                   <p class="card-text mb-n1"><i class="fa fa-envelope" style="color: black;"></i> <small class="text-muted">${this.email}</small></p>
//                   <p class="card-text"><i class="fa fa-map-marker" style="color: black;"></i> <small class="text-muted text-location">${this.location}</small></p>
//                 </div>
//                 <div class="restaurant-cuisines">
//                   ${this.getCuisineNames(this.cuisines)}<p class="ml-1"><strong>Cuisines</strong>: </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     `)
//   }

//   singleHTML() {
//     return (`
//       <div class="card mb-3">
//         <img id="restaurant-image" src="/assets/${this.image}" class="card-img-top" alt="${this.name}">
//         <div class="card-body">
//           <h5 id="restaurant-name-card" class="card-title">${this.name}</h5>
//           <p id="restaurant-description" class="card-text">${this.description}</p>
//           <div class="card-info-box">
//           <div class="restaurant-contact">
//             <p class="card-text mb-n1"><i class="fa fa-phone" style="color: black;"></i> <small class="text-muted">${this.phone}</small></p>
//             <p class="card-text mb-n1"><i class="fa fa-envelope" style="color: black;"></i> <small class="text-muted">${this.email}</small></p>
//             <p class="card-text"><i class="fa fa-map-marker" style="color: black;"></i> <small class="text-muted">${this.location}</small></p>
//           </div>
//           <div class="restaurant-cuisines">
//           ${this.getCuisineNames(this.cuisines)} <p class="ml-1"><strong>Cuisines</strong>: </p>
//           </div>
//         </div>
//       </div>
//     `)
//   }

//   buildPager(currentId, all_ids) {
//     let idsString = all_ids.split("|");
//     let ids = idsString.map(x => parseInt(x));
//     let currentIndex = ids.indexOf(currentId);

//     let isFirst = false;
//     let isLast = false;

//     if (currentIndex == 0) {
//       isFirst = true;
//     }

//     if (currentIndex == ids.length - 1) {
//       isLast = true;
//     }

//     let previousId = ids[parseInt(currentIndex) - 1];
//     let nextId = ids[parseInt(currentIndex) + 1];

//     return (`
//       <nav aria-label="pager">
//         <ul class="pagination">
//           <li class="page-item ${isFirst ? 'disabled' : ''}">
//             <a id="previous-restaurant" class="page-link" onclick="buildSingleRestaurant(${previousId}); return false;" href="#" tabindex="-1" aria-disabled="${isFirst ? 'true' : 'false'}">Previous</a>
//           </li>
//           <li class="page-item ${isLast ? 'disabled' : ''}"">
//             <a id="next-restaurant" class="page-link" onclick="buildSingleRestaurant(${nextId}); return false;" href="#" aria-disabled="${isLast ? 'true' : 'false'}">Next</a>
//           </li>
//         </ul>
//       </nav>
//     `)
//   }

//   buildComments(commentsData) {
//     let commentsArray = []
//     if (commentsData.length > 0) {
//       $.each(commentsData, function (index, value) {
//         let comment =
//           `<div class="comments-media media my-3">
//             <img src="/assets/${value.user.avatar.image_url}" class="mr-3" alt="${value.user.avatar.name}">
//             <div class="media-body">
//               <h5 class="mt-0">Comment from ${value.user.first_name} ${value.user.last_name}</h5>
//               ${value.body}
//             </div>
//             <div class="media-rating">
//             <i class="fa fa-star text-warning" aria-hidden="true"></i> ${value.rating}
//             </div>
//           </div>`;
//         commentsArray.push(comment);
//       })
//     } else {
//       let comment = `<div id="no-comments-listed" class="comments-media my-3">No Comments for this Restaurant</div>`
//       commentsArray.push(comment);
//     }
//     return commentsArray;
//   }
// }

// // multiple
// function newFilterRestaurants(type, search) {
//   let newData = [];

//   $.each(fullData, function (index, value) {
//     if (search != "") {
//       if (type == "location") {
//         if (value.location["city"] == search) {
//           newData.push(value);
//         }
//       } else if (type == "cuisine") {
//         for (var i = 0; i < value.cuisines.length; i++) {
//           if (value.cuisines[i]["name"] == search) {
//             newData.push(value);
//             return;
//           }
//         }
//       }
//     } else {
//       newData = fullData;
//     }
//   });

//   buildAllRestaurants(newData);
// }

// // comment
// class Comment {
//   constructor(body, rating) {
//     this.body = body;
//     this.rating = rating;
//   }

//   valid() {
//     if (this.body == "" || this.rating == null) {
//       return false;
//     } else {
//       return true;
//     }
//   }
// }

// // single
// function addNewComment(values) {
//   let fullname = $("#user-fullname").attr("data-value");
//   let avatar_url = $("#user-avatar-url").attr("data-value");

//   var newComment = $.post('/comments', values);
//   newComment.done(function (data) {
//     comment =
//       `<div class="comments-media media my-3">
//           <img src="/assets/${avatar_url}" class="mr-3" alt="${fullname}">
//           <div class="media-body">
//             <h5 class="mt-0">Comment from ${fullname}</h5>
//             ${data['body']}
//           </div>
//           <div class="media-rating">
//           <i class="fa fa-star text-warning" aria-hidden="true"></i> ${data['rating']}
//           </div>
//         </div>`;
//     $("#single-restaurant-comments").append(comment);
//   });
// }