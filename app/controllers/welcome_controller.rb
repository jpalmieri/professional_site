class WelcomeController < ApplicationController
  def index
  end

  def acme_challenge
    render layout: false
  end

  def acme_challenge_2
    render layout: false
  end
end
