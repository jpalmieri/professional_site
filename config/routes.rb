Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'welcome#index'
  get ".well-known/acme-challenge/dAHcqu8kzPqLcef-jqxJXekSD_3Ag0_fMKvrQRdl6M4", to: 'welcome#acme_challenge'
  get ".well-known/acme-challenge/X0_EsCxMiaVaHvU0OGzjQxcopUcNcawP4CttCPwYrHo", to: 'welcome#acme_challenge_2'
end
