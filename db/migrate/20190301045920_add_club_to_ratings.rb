class AddClubToRatings < ActiveRecord::Migration[5.2]
  def change
    add_column :ratings, :club, :string
  end
end
