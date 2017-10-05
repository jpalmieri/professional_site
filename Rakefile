# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

namespace :static do
  desc 'Generate static site in ./out/ directory'
  task :generate do
    Dir.mkdir 'out' unless File.exist? 'out'
    Dir.chdir 'out' do
      `wget -mnH http://localhost:3000/`
    end
    `rsync -ruv --exclude=.svn/ public/ out/`
  end

  desc 'Run tiny HTTP server from ./out/ directory'
  task :server do
    Dir.chdir 'out' do
      puts 'Started HTTP server at http://localhost:8000/. Press CTRL+C to exit.'
      `python -m SimpleHTTPServer`
    end
  end
end
