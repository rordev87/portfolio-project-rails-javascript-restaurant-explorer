class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    @locations = Location.all
    @cuisines = Cuisine.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @restaurants }
    end
  end

  def show
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
