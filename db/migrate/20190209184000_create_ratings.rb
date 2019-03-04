class CreateRatings < ActiveRecord::Migration[5.2]
  def change
    create_table :ratings do |t|
      t.string :book
      t.string :name
      t.float :rating
      t.string :notes
      t.timestamps
    end
  end
end
