// comment
class Comment {
  constructor(body, rating) {
    this.body = body;
    this.rating = rating;
  }

  valid() {
    if (this.body == "" || this.rating == null) {
      return false;
    } else {
      return true;
    }
  }
}