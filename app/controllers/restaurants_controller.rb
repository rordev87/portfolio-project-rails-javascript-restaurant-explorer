class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    @locations = Location.all
    @cuisines = Cuisine.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @restaurants.to_json(only: [:id, :name, :description, :phone, :email, :image_url], include: [location: { only: :city}, cuisines: { only: :name }]) }
    end
  end

  def show
    @restaurant_ids = Restaurant.all_ids
    @restaurant = Restaurant.find(params[:id])

    if logged_in?
      @fullname = current_user.full_name
      @avatar_url = current_user.avatar.image_url
    end
    
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @restaurant }
    end
  end
end
