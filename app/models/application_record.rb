class ApplicationRecord < ActiveRecord::Base
	self.abstract_class = true
	
	# before_create :get_club

	# private
	# 	def get_club
	# 		self.club = session['club']
	# 	end	
end
