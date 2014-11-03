require 'sinatra'
require 'dotenv'
require 'pony'

Dotenv.load

get '/' do
  redirect '/home'
end

get '/home' do
  erb :home, layout: :application
end

get '/residential' do
  erb :residential, layout: :application
end

get '/commercial' do
  erb :commercial, layout: :application
end
