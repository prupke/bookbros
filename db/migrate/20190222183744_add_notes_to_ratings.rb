class AddNotesToRatings < ActiveRecord::Migration[5.2]
  def change
    add_column :ratings, :notes, :string
  end
end
