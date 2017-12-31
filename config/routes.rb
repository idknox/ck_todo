Rails.application.routes.draw do
  root 'home#show'

  namespace :api do
    resources :todos, except: [:new]
  end
end
