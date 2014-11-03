require 'sinatra'
require 'dotenv'
require 'pony'

Dotenv.load

def send_mail(name, email, phone, message)
  body =
    "Hi Mark,\n
    \t New message from #{name}:  \n
    \t #{message} \n
    \t They can be reached via email at #{email} \n
    \t #{phone}."

  Pony.mail({
    to: 'murphydbuffalo@gmail.com',
    # to: 'mark@spectruminstallation.com',
    from: "Web-Services@spectruminstallation.com",
    subject: "New message!",
    html_body: erb(:message_email),
    body: body,
    via: :smtp,
    via_options: {
      :address        => 'smtp.mandrillapp.com',
      :port           => '587',
      :user_name      => ENV['MANDRILL_USERNAME'],
      :password       => ENV['MANDRILL_APIKEY'],
      :authentication => :plain,
      :domain         => "heroku.com"
    }
  })
end

def validate_presence_of(*params)
  params.length >= 4 && params.all? { |p| p.length > 0 }
end

get '/' do
  redirect '/home'
end

get '/home' do
  erb :home, layout: :application
end

post '/home' do
  if validate_presence_of(params[:first_name], params[:last_name], params[:email], params[:message])
    @name = "#{params[:first_name]} #{params[:last_name]}"
    @email = params[:email]
    @phone = "And by phone at #{params[:phone]}."
    @message = params[:message]

    send_mail(@name, @email, @phone, @message)
  else
    puts "First name, last name, email and message are required fields."
  end

  redirect '/home'
end

get '/residential' do
  erb :residential, layout: :application
end

post '/residential' do
  if validate_presence_of(params[:first_name], params[:last_name], params[:email], params[:message])
    @name = "#{params[:first_name]} #{params[:last_name]}"
    @email = params[:email]
    @phone = "And by phone at #{params[:phone]}."
    @message = params[:message]

    send_mail(@name, @email, @phone, @message)
  else
    puts "First name, last name, email and message are required fields."
  end

  redirect '/residential'
end

get '/commercial' do
  erb :commercial, layout: :application
end

post '/commercial' do
  if validate_presence_of(params[:first_name], params[:last_name], params[:email], params[:message])
    @name = "#{params[:first_name]} #{params[:last_name]}"
    @email = params[:email]
    @phone = "And by phone at #{params[:phone]}."
    @message = params[:message]

    send_mail(@name, @email, @phone, @message)
  else
    puts "First name, last name, email and message are required fields."
  end

  redirect '/commercial'
end
