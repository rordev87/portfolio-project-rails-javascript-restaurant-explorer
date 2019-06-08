class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :description
      t.string :phone
      t.string :email
      t.string :image_url
      t.references :location, foreign_key: true

      t.timestamps
    end
  end
end
