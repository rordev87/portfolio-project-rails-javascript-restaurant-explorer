class Restaurant < ApplicationRecord
  belongs_to :location
  has_many :comments
  has_many :users, through: :comments
  has_many :restaurant_cuisines
  has_many :cuisines, through: :restaurant_cuisines

  scope :all_ids, -> { pluck(:id).sort() }
end
