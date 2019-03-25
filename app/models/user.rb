class User < ApplicationRecord
  # belongs_to :club,
  # foreign_key: :club
  # Attributes: name:string
  validates :user, presence: true;
  validates_presence_of :club
end
