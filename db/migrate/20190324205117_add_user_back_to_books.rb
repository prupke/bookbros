class AddUserBackToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :user, :string
  end
end
