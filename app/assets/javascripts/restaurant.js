// Restaurant class
class Restaurant {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this._phone = obj.phone;
    this.email = obj.email;
    this.image = obj.image_url;
    this.location = obj.location.city;
    this.cuisines = obj.cuisines;
  }

  // getter for phone that adds formatting for area codes
  get phone() {
    var re = /\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g;
    var subst = '($1) $2-$3';
    return this._phone.replace(re, subst);
  }

  // take array of cuisine objects and build html
  getCuisineNames(cuisines) {
    let cuisinesOutput = "";
    if (cuisines.length > 0) {
      cuisines.forEach(function (cuisine, index) {
        if (index == cuisines.length - 1) {
          cuisinesOutput += `<p class="ml-1">${cuisine.name}</p>`
        } else {
          cuisinesOutput += `<p class="ml-1">${cuisine.name}</p><p>,</p>`
        }
      })
    }
    return cuisinesOutput;
  }

  // method used when appending html for multiple restaurants
  multipleHTML() {
    return (`
      <div class="card mb-5">
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
                  ${this.getCuisineNames(this.cuisines)}<p class="ml-1"><strong>Cuisines</strong>: </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `)
  }

  // method used when appending html for a single restaurant
  singleHTML() {
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
          ${this.getCuisineNames(this.cuisines)} <p class="ml-1"><strong>Cuisines</strong>: </p>
          </div>
        </div>
      </div>
    `)
  }

  // method for building the pagination feature on a page for a single restaurant 
  buildPager(currentId, all_ids) {
    let idsString = all_ids.split("|");
    let ids = idsString.map(x => parseInt(x));
    let currentIndex = ids.indexOf(currentId);

    let isFirst = false;
    let isLast = false;

    if (currentIndex == 0) {
      isFirst = true;
    }

    if (currentIndex == ids.length - 1) {
      isLast = true;
    }

    let previousId = ids[parseInt(currentIndex) - 1];
    let nextId = ids[parseInt(currentIndex) + 1];

    return (`
      <nav aria-label="pager">
        <ul class="pagination">
          <li class="page-item ${isFirst ? 'disabled' : ''}">
            <a id="previous-restaurant" class="page-link" onclick="buildSingleRestaurant(${previousId}); return false;" href="#" tabindex="-1" aria-disabled="${isFirst ? 'true' : 'false'}">Previous</a>
          </li>
          <li class="page-item ${isLast ? 'disabled' : ''}"">
            <a id="next-restaurant" class="page-link" onclick="buildSingleRestaurant(${nextId}); return false;" href="#" aria-disabled="${isLast ? 'true' : 'false'}">Next</a>
          </li>
        </ul>
      </nav>
    `)
  }

  // method to build comments from json data in a restaurant has_many comments association
  buildComments(commentsData) {
    let commentsArray = []
    if (commentsData.length > 0) {
      $.each(commentsData, function (index, value) {
        let comment =
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
      let comment = `<div id="no-comments-listed" class="comments-media my-3">No Comments for this Restaurant</div>`
      commentsArray.push(comment);
    }
    return commentsArray;
  }
}
