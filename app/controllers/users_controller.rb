class UsersController < ApplicationController
  before_action :authentication_required, except: [:new, :create]
  
  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = "success|User #{@user.full_name} was successfully created."
      session[:user_id] = user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update_attributes(user_params)
      flash[:notice] = "success|User #{@user.full_name} was successfully updated."
      redirect_to user_path(@user)
    else
      render :edit
    end
  end

  def destroy
    @attraction = Attraction.find(params[:id])
    @attraction.delete

    # remove user session
    session[:user_id] = nil

    flash[:notice] = "success|User #{user.full_name} was successfully deleted."
    redirect_to root_route
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :username, :password, :avatar_id)
  end
end
