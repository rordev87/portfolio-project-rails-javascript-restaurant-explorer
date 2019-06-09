Rails.application.routes.draw do
  root "sessions#index"

  get "/about", to: "sessions#about", as: "about"
  get "/login", to: "sessions#new"
  post "/sessions", to: "sessions#create"
  get "/logout", to: "sessions#destroy"

  resources :users, only: [:show, :new, :create, :edit, :update, :destroy]

  resources :restaurants, only: [:index, :show]
end
