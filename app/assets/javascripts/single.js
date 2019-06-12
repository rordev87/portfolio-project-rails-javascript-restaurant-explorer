// single
$(function () {
  if ($("#single-restaurant").length) {
    let currentId = parseInt($("#restaurant-id").attr("data-id"));
    buildSingleRestaurant(currentId);
  }

  $("#add-comment-form").submit(function (event) {
    event.preventDefault();
    let commentBodyElement = $("#body-entry");
    let commentRatingElement = $("#rating-entry");

    let commentBody = commentBodyElement.val();
    let commentRating = commentRatingElement.val();

    let comment = new Comment(commentBody, commentRating);

    if (comment.valid() == true) {

      let values = $(this).serialize();
      addNewComment(values);

      clearCommentForm(commentBodyElement, commentRatingElement);

      if ($("#no-comments-listed").length) {
        $("#no-comments-listed").remove();
      }
    } else {
      commentBodyElement.addClass("error")
      commentRatingElement.addClass("error")
      $("#commentErrorText").css("display", "block");
    }
  })
});

// single
function clearCommentForm(body, rating) {
  body.removeClass("error");
  body.val("");
  rating.removeClass("error");
  rating.val("");
  $("#commentErrorText").css("display", "none");
}

// single
function buildSingleRestaurant(currentId) {
  assignCurrentSingleDataId(currentId);
  emptyCurrentSingleData();
  if ($("#body-entry").length) {
    clearCommentForm($("#body-entry"), $("#rating-entry"));
  }

  $.get("/restaurants/" + currentId + ".json", function (data) {
    let restaurant = new Restaurant(data);
    let html = restaurant.singleHTML();
    let all_ids = getAllRestaurantIds();
    let pager = restaurant.buildPager(currentId, all_ids);
    let comments = restaurant.buildComments(data.comments);

    $("#restaurant-name").text(restaurant.name);
    $("#single-restaurant").append(html).append(pager);
    $("#single-restaurant-comments").append(comments);
  });
}

// single
function assignCurrentSingleDataId(currentId) {
  $("#form-restaurant-id").val(currentId);
}

// single
function emptyCurrentSingleData() {
  $("#single-restaurant").empty();
  $("#single-restaurant-comments").empty();
}

// single
function getAllRestaurantIds() {
  let ids = $("#restaurant-all-ids").attr("data-id");
  return ids;
}

// single
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