Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'welcome#index'
  get 'index', to: 'welcome#index'
  get ".well-known/acme-challenge/3gJxkVrNDwuBfYhDs936NvFfeYUy3Ez77BY0JH4tw24", to: 'welcome#acme_challenge'
  get ".well-known/acme-challenge/WwSj_WKLEJWROlTD3pNpvnx2QRdJZYxsdC18IV-pNTg", to: 'welcome#acme_challenge_2'
end
