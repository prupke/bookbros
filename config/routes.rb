Rails.application.routes.draw do
  resources :clubs
# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 
root 'posts#index', as: 'home'

get 'bookbabes' => 'posts#bookbabes'

get 'about' => 'posts#about'

get 'switch' => 'posts#switch'

get '/404' => 'errors#not_found'

# get '/422' => 'errors#unacceptable'

get '/500' => 'errors#internal_error'

# get 'rating' => 'pages#rating'

resources :posts 
# do
#   collection do
#     get 'paginate'
#   end
# end

resources :ratings

resources :books, as: 'books'

resources :clubs

resources :users

get '*path', to: 'errors#not_found'

end