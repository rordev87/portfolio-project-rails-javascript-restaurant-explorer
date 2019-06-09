class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @restaurants }
    end
  end

  def show
    @restaurant = Restaurant.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @restaurant }
    end
  end
end
