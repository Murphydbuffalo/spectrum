require 'sinatra'
require 'dotenv'
require 'pony'

Dotenv.load

def send_mail(template, options={})
  if template == 'message'
    body =
      "Hi Mark,\n
      \t New message from #{options[:name]}:  \n
      \t #{options[:message]} \n
      \t They can be reached via email at #{options[:email]} \n
      \t #{options[:phone]}."

    template = :message_email
  else
    body =
      "Hi Mark,\n
      \t #{options[:name]} from #{options[:company]} is interested in becoming a Spectrum subcontractor. \n
      \t They can be reached via email at #{options[:email]} \n
      \t #{options[:phone]}."

    template = :career_email
  end

  Pony.mail({
    to: 'murphydbuffalo@gmail.com',
    # to: 'mark@spectruminstallation.com',
    from: "Web-Services@spectruminstallation.com",
    subject: "New message!",
    html_body: erb(template),
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
    @phone = "Or by phone at #{params[:phone]}."
    @message = params[:message]

    send_mail('message', { name: @name, email: @email, phone: @phone, message: @message })
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
    @phone = "Or by phone at #{params[:phone]}."
    @message = params[:message]

    send_mail('message', { name: @name, email: @email, phone: @phone, message: @message })
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
    @phone = "Or by phone at #{params[:phone]}."
    @message = params[:message]

    send_mail('message', { name: @name, email: @email, phone: @phone, message: @message })
  else
    puts "First name, last name, email and message are required fields."
  end

  redirect '/commercial'
end

post '/careers' do
  if validate_presence_of(params[:name], params[:company], params[:email], params[:phone])
    @name = params[:name]
    @email = params[:email]
    @phone = "Or by phone at #{params[:phone]}."
    @company = params[:company]

    send_mail('career', { name: @name, email: @email, phone: @phone, company: @company })
  else
    puts "All fields are required."
  end

  redirect '/commercial'
end
