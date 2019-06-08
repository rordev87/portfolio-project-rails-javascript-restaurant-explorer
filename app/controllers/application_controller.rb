class ApplicationController < ActionController::Base
  helper_method :logged_in?, :current_user

  def authentication_required
    if !logged_in?
      redirect_to root_path
    end
  end

  def logged_in?
    current_user != nil
  end

  def current_user
    @current_user ||= User.find_by_id(session[:user_id])
  end
end
