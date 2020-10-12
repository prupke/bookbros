class ApplicationController < ActionController::Base
	before_action :check_brand
	before_action :check_club
	before_action :set_session

	def set_session
		response.headers['SameSite'] = 'Lax'
	end

	def check_brand
		if !session['brand']
			url = url_for()
			if url.include? 'bookbabes'
				session['brand'] = 'Book Babes'
			else	
				session['brand'] = 'Book Bros'
			end
		end
	end

	def check_club
		
		if !session['club']
			session['club'] = 10
		end

		if !session['name']
			session['name'] = ''
		end 
	end

end
