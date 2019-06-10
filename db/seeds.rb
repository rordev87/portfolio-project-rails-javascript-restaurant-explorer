RestaurantCuisine.delete_all
Comment.delete_all
Restaurant.delete_all
User.delete_all
Cuisine.delete_all
Location.delete_all
Avatar.delete_all

locations = [
  {city: "Arlington"},
  {city: "Alexandria"},
  {city: "Fairfax"},
  {city: "Tysons Corner"},
  {city: "Great Falls"}
]

cuisines = [
  {name: "Mediterranean"},
  {name: "Indian"},
  {name: "Thai"},
  {name: "Sushi"},
  {name: "Italian"},
  {name: "Mexican"},
  {name: "Chinese"},
  {name: "American"},
  {name: "French"}, 
  {name: "Tex-Mex"} 
]

avatars = [
  {name: "bird", image_url: "bird.png"},
  {name: "bear", image_url: "bear.png"},
  {name: "cat", image_url: "cat.png"},
  {name: "dog", image_url: "dog.png"}
]

users = [
  {first_name: "Bob", last_name: "Cobb", email: "bobcobb@net.com", username: "bobcobb", password: "hello"},
  {first_name: "Hal", last_name: "Hope", email: "halhope@net.com", username: "halhope", password: "hello"},
  {first_name: "Jim", last_name: "Jupe", email: "jimjupe@net.com", username: "jimjupe", password: "hello"},
  {first_name: "Kal", last_name: "Kool", email: "kalkool@net.com", username: "kalkool", password: "hello"},
  {first_name: "Mel", last_name: "Mope", email: "melmope@net.com", username: "melmope", password: "hello"},
  {first_name: "Vin", last_name: "Vane", email: "vinvane@net.com", username: "vinvane", password: "hello"},
  {first_name: "Abe", last_name: "Area", email: "abearea@net.com", username: "abearea", password: "hello"},
  {first_name: "Sal", last_name: "Soap", email: "salsoap@net.com", username: "salsoap", password: "hello"},
  {first_name: "Gil", last_name: "Goat", email: "gilgoat@net.com", username: "gilgoat", password: "hello"},
  {first_name: "Ned", last_name: "Nail", email: "nednail@net.com", username: "nednail", password: "hello"}
]

restaurants = [
  {name: "Tiny Bites", description: "Small food, big taste, come enjoy quality eats.", phone: "7035551231", email: "tiny.bites@eats.net", image_url: "restaurant-01.jpg"},
  {name: "Mighty Meals", description: "Don't dine without mighty taste and enjoyable surroundings.", phone: "7035556346", email: "mighty@eats.net", image_url: "restaurant-02.jpg"},
  {name: "Taste of the City", description: "Small food, big taste, come enjoy quality eats.", phone: "7035559221", email: "city@eats.net", image_url: "restaurant-03.jpg"},
  {name: "Silver Platter", description: "Small food, big taste, come enjoy quality eats.", phone: "7035551268", email: "silver.platter@eats.net", image_url: "restaurant-04.jpg"},
  {name: "Dine in-Town", description: "Small food, big taste, come enjoy quality eats.", phone: "7035550282", email: "dine.now@eats.net", image_url: "restaurant-05.jpg"},
  {name: "Crash and Cook", description: "Small food, big taste, come enjoy quality eats.", phone: "7035550092", email: "cooks@eats.net", image_url: "restaurant-06.jpg"},
  {name: "Gourmet Tastes", description: "Small food, big taste, come enjoy quality eats.", phone: "7035557119", email: "gourmet-tastes@eats.net", image_url: "restaurant-07.jpg"},
  {name: "Riverside Restaurant", description: "Small food, big taste, come enjoy quality eats.", phone: "7035559851", email: "riverside@eats.net", image_url: "restaurant-08.jpg"},
  {name: "Take a Plate", description: "Small food, big taste, come enjoy quality eats.", phone: "7035557188", email: "take-plate@eats.net", image_url: "restaurant-09.jpg"},
  {name: "Your Food Getaway", description: "Small food, big taste, come enjoy quality eats.", phone: "7035551902", email: "getaway-food@eats.net", image_url: "restaurant-10.jpg"},
  {name: "Classic Dining", description: "Small food, big taste, come enjoy quality eats.", phone: "7035558789", email: "classicdining@eats.net", image_url: "restaurant-11.jpg"},
  {name: "Big Appetite", description: "Small food, big taste, come enjoy quality eats.", phone: "7035552001", email: "appetites@eats.net", image_url: "restaurant-12.jpg"},
  {name: "Lunch and Dinner", description: "Small food, big taste, come enjoy quality eats.", phone: "7035551421", email: "lunch-and-dinner@eats.net", image_url: "restaurant-13.jpg"},
  {name: "Meet and Eat", description: "Small food, big taste, come enjoy quality eats.", phone: "7035559851", email: "meeteat@eats.net", image_url: "restaurant-14.jpg"},
  {name: "Edible Delights and Desserts", description: "Small food, big taste, come enjoy quality eats.", phone: "7035556926", email: "edibles@eats.net", image_url: "restaurant-15.jpg"},
  {name: "Food for Thought", description: "Small food, big taste, come enjoy quality eats.", phone: "7035559111", email: "thoughtful@eats.net", image_url: "restaurant-16.jpg"},
  {name: "Feed Bag", description: "Small food, big taste, come enjoy quality eats.", phone: "7035552164", email: "feed-bag@eats.net", image_url: "restaurant-17.jpg"},
  {name: "Master Chefs", description: "Small food, big taste, come enjoy quality eats.", phone: "7035556621", email: "chefs@eats.net", image_url: "restaurant-18.jpg"},
  {name: "No Ordinary Soup", description: "Small food, big taste, come enjoy quality eats.", phone: "7035553217", email: "no-soups@eats.net", image_url: "restaurant-19.jpg"}
]

comments = [
  {body: "Great meals are to be found here. Be sure to try the daily specials too.", rating: "4"},
  {body: "Was impressed with the options. The long wait for my order to arrive was a different issue though.", rating: "3"},
  {body: "There's a lot to like about this place. Will come back again soon.", rating: "5"},
  {body: "The food looked good, but lacked flavor.", rating: "2"},
  {body: "Impressive location, the food goes along with it too. Nice place.", rating: "4"},
  {body: "I was hopeful, but disappointed with the food. They need better chefs.", rating: "1"},
  {body: "Good food, can't complain.", rating: "4"},
  {body: "Wanted to like it, but the service was rude and unresponsive when I pointed out problems with my order.", rating: "1"},
  {body: "Great place! Recommended.", rating: "5"},
  {body: "Must have been an off day, will come again to see if there's improvement.", rating: "2"},
  {body: "Had the daily special. Very tasty.", rating: "4"},
  {body: "Not bad, but not great either.", rating: "3"},
  {body: "Enjoyed my time. The live music added to the cozy atmosphere.", rating: "4"},
  {body: "Food was good, but impossible to find parking nearby.", rating: "3"},
  {body: "Waited a long time for a table. After that, it wasn't too bad.", rating: "3"},
  {body: "Nice place. Will come back soon.", rating: "4"},
  {body: "Food was cold - it was supposed to be hot!", rating: "1"},
  {body: "Fancy dining experience. Recommended.", rating: "4"},
  {body: "Be sure to have a big appetite, portions are grand!", rating: "4"},
  {body: "Fabuluous experience! Especially enjoyed the range of starters and drinks.", rating: "5"}
]

locations.each do |location|
  Location.create(location)
end

cuisines.each do |cuisine|
  Cuisine.create(cuisine)
end

avatars.each do |avatar|
  Avatar.create(avatar)
end

avatar_ids = Avatar.all.map { |a| a.id }

users.each do |user|
  u = User.new(user)
  u.avatar_id = avatar_ids.sample
  u.save
end

location_ids = Location.all.map { |l| l.id }

restaurants.each do |restaurant|
  r = Restaurant.new(restaurant)
  r.location_id = location_ids.sample
  r.save
end

user_ids = User.all.map { |u| u.id }
restaurant_ids = Restaurant.all.map { |r| r.id }

comments.each do |comment|
  c = Comment.new(comment)
  c.user_id = user_ids.sample
  c.restaurant_id = restaurant_ids.sample
  c.save
end

cuisine_ids = Cuisine.all.map { |c| c.id }

Restaurant.all.each do |restaurant|
  random_number = (1..3).to_a.sample
  all_numbers = []

  while random_number > 0
    cuisine_number = cuisine_ids.sample
    unless all_numbers.include?(cuisine_number)
      all_numbers << cuisine_number
      rc = RestaurantCuisine.new(restaurant: restaurant, cuisine_id: cuisine_number)
      rc.save
    end
    random_number -= 1
  end
end