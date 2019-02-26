Rails.application.routes.draw do
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 
root 'posts#index', as: 'home'

# get 'rating' => 'pages#rating'

resources :posts

resources :ratings

resources :books, as: 'books'

end