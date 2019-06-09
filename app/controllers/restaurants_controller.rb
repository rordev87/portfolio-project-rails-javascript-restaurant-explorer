class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @restaurants }
    end
  end

  def show
  end
end
