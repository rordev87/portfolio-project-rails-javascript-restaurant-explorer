class SessionsController < ApplicationController
  def index
    # home page
  end

  def new
    @user = User.new
  end

  def create
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      flash[:notice] = "success|You are now logged in."
      redirect_to user_path(user)
    else
      flash[:notice] = "danger|Invalid login, please try again."
      redirect_to signin_path
    end
  end

  def destroy
    session[:user_id] = nil
    @current_user = nil;
    flash[:notice] = "success|You have been logged out."
    redirect_to root_path
  end
end
