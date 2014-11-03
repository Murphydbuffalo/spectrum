require 'sinatra'
require 'dotenv'
require 'pony'

Dotenv.load

get '/' do
  redirect '/home'
end

get '/home' do
  erb :home
end

get '/residential' do
  erb :residential
end

get '/commercial' do
  erb :commercial
end
