class User < ApplicationRecord
  has_secure_password
  
  belongs_to :avatar
  has_many :comments
end
