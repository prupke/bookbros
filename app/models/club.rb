class Club < ApplicationRecord
	# def users
	# end
	# def users_atrributes=(attributes)
	# end
	# has_many :users, dependent: :destroy
	# accepts_nested_attributes_for :users
	validates :name, presence: true, length: { minimum: 3 }	
	validates :password, presence: true, length: { minimum: 4 }   
	# validates :user_attributes, presence: true
end
