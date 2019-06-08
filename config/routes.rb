Rails.application.routes.draw do
  get 'sessions/index'
  get 'sessions/new'
  get 'users/new'
  get 'users/show'
  get 'users/create'
  get 'users/edit'
  get 'users/update'
  get 'users/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
