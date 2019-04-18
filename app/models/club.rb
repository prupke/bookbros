class Club < ApplicationRecord
	# def users
	# end
	# def users_atrributes=(attributes)
	# end
	# has_many :users, dependent: :destroy
	# accepts_nested_attributes_for :users
	validates :name, presence: true, length: { minimum: 3 }	
	validates :email, presence: true, length: { minimum: 7 }   
	# validates :user_attributes, presence: true
end
