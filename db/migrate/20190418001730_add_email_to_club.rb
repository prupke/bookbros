class AddEmailToClub < ActiveRecord::Migration[5.2]
  def change
    add_column :clubs, :email, :string
  end
end
