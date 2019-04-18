class UserMailer < ApplicationMailer
	default from: 'noreply@bookbros.club'

	def register_email
	    @email = params[:email]
	    @club_link = params[:club_link]
	    # @url  = 'http://example.com/login'
	    mail(to: @email, subject: 'Welcome to Book Bros!')		
	end

end
