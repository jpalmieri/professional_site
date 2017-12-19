# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

# https://nowaker.net/post/ruby-on-rails-a-static-site-generator.html
# I'm using the public/ directory because GitLab doesn't allow any other
# directories for their 'gitlab pages' sites
# https://docs.gitlab.com/ee/user/project/pages/getting_started_part_four.html#the-public-directory
# Also see .gitlab-ci.yml
namespace :static do
  desc 'Generate static site in ./public/ directory'
  task :generate do
    Dir.mkdir 'public' unless File.exist? 'public'
    Dir.chdir 'public' do
      `wget -mnH http://localhost:3000/`
      `wget -mnH http://localhost:3000/.well-known/acme-challenge/3gJxkVrNDwuBfYhDs936NvFfeYUy3Ez77BY0JH4tw24`
      `wget -mnH http://localhost:3000/.well-known/acme-challenge/WwSj_WKLEJWROlTD3pNpvnx2QRdJZYxsdC18IV-pNTg`
    end
    `rsync -ruv public/`
  end

  desc 'Run tiny HTTP server from ./public/ directory'
  task :server do
    Dir.chdir 'public' do
      puts 'Started HTTP server at http://localhost:8000/. Press CTRL+C to exit.'
      `python -m SimpleHTTPServer`
    end
  end
end
