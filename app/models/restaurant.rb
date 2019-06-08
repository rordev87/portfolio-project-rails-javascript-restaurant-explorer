class Restaurant < ApplicationRecord
  belongs_to :location
  has_many :comments
  has_many :restaurant_cuisines
  has_many :cuisines, through: :restaurant_cuisines
end
