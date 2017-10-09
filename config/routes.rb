Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'welcome#index'
  get ".well-known/acme-challenge/R3dBz6-qATFpoFD8g6pKpo9WYjMY_bnbGfw73YuqTNI", to: 'welcome#acme_challenge'
  get ".well-known/acme-challenge/T4iJRKmsEQMJ3RKrvvGsRrUfaTTb_1S_WTH457A07fw", to: 'welcome#acme_challenge_2'
end
