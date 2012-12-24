require 'sinatra'

get '/' do
  haml :index
end

get '/css/index.css' do
  less :"less/index"
end