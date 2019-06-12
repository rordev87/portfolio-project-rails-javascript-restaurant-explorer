// On document ready
$(function () {
  // if page has 'single-restaurant' element, grab restaurant id from page and begin building restaurant
  if ($("#single-restaurant").length) {
    let currentId = parseInt($("#restaurant-id").attr("data-id"));
    buildSingleRestaurant(currentId);
  }
  
  // attach submit event handler to button
  $("#add-comment-form").submit(function (event) {
    event.preventDefault();
    
    // capture form field input
    let commentBodyValue = getFormFieldValue("#body-entry");
    let commentRatingValue = getFormFieldValue("#rating-entry");

    // create new comment object and check for valid input
    let comment = new Comment(commentBodyValue, commentRatingValue);
    if (comment.valid() == true) {
      // if comment is valid - serialize form values and padd to addNewComment function
      let values = $(this).serialize();      
      addNewComment(values);
      
      // clear comment form fields and remove error class/message
      clearCommentForm("#body-entry");
      clearCommentForm("#rating-entry");
      $("#commentErrorText").css("display", "none");

      // remove a no-comments element after adding a new comment
      if ($("#no-comments-listed").length) {
        $("#no-comments-listed").remove();
      }
    } else {
      // if comment is not valid display error class/message
      updateElementClass("#body-entry", "add", "error");
      updateElementClass("#rating-entry", "add", "error");
      $("#commentErrorText").css("display", "block");
    }
  })
});

// build a single restaurant entry
function buildSingleRestaurant(currentId) {
  // assign restaurant id to comment form field
  assignCurrentSingleDataId(currentId);
  
  // clear html content in restaurant and comments area - prepare for new restaurant contnet 
  emptyCurrentSingleData();
  
  // if a comment form is on the page, clear the input fields
  if ($("#body-entry").length) {
    clearCommentForm("#body-entry");
    clearCommentForm("#rating-entry");
    $("#commentErrorText").css("display", "none");
  }

  // use the current id for an ajax get request for restaurant data
  $.get("/restaurants/" + currentId + ".json", function (data) {
    // create a new restaurant object and build/append html
    let restaurant = new Restaurant(data);
    let html = restaurant.singleHTML();
    
    // retrieve ids for all restaurants in database and build the pager feature
    let all_ids = getAllRestaurantIds();
    let pager = restaurant.buildPager(currentId, all_ids);
    
    // build restaurant comments with json data via restaurant has_many comments association
    let comments = restaurant.buildComments(data.comments);

    // assign text values to heading and append html/page/comments to page elements
    $("#restaurant-name").text(restaurant.name);
    $("#single-restaurant").append(html).append(pager);
    $("#single-restaurant-comments").append(comments);
  });
}

// retrieve form field input values
const getFormFieldValue = (fieldName) => {
  return $(fieldName).val();
}

// add or remove a class from an element
const updateElementClass = (element, type, className) => {
  if (type == "add") {
    $(element).addClass(className);
  } else if (type == "remove") {
    $(element).removeClass(className);
  }
}

// remove comment error messages and input value
const clearCommentForm = (element) => {
  updateElementClass(element, "remove", "error");  
  $(element).val("");  
}

// assign currentId to form field element
const assignCurrentSingleDataId = (currentId) => {
  $("#form-restaurant-id").val(currentId);
}

// clear restaurant data from element
const emptyCurrentSingleData = () => {
  $("#single-restaurant").empty();
  $("#single-restaurant-comments").empty();
}

// retrieve restaurantIds from element data-id
const getAllRestaurantIds = () => {
  return ids = $("#restaurant-all-ids").attr("data-id");
}

// process new comment ajax post request to insert a new comment
function addNewComment(values) {
  // retrieve temp data for user's name and avatar to insert into post callback
  let fullname = $("#user-fullname").attr("data-value");
  let avatar_url = $("#user-avatar-url").attr("data-value");

  // execute the ajax post request and process and append the callback with response data to the page
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
