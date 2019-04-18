class UserMailer < ApplicationMailer
	default from: 'noreply@bookbros.club'

	def register_email
	    @user = params[:user]
	    @email = params[:email]
	    @link = params[:link]
	    # @url  = 'http://example.com/login'
	    mail(to: @email, subject: 'Welcome to Book Bros!')		
	end

end
