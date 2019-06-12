// comment class
class Comment {
  constructor(body, rating) {
    this.body = body;
    this.rating = rating;
  }

  // validation method - checking for empty/null values
  valid() {
    if (this.body == "" || this.rating == null) {
      return false;
    } else {
      return true;
    }
  }
}
