class User < ApplicationRecord
  has_secure_password
  
  belongs_to :avatar
  has_many :comments
  has_many :restaurants, through: :comments

  EMAIL_REGEX = /\A[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\Z/i.freeze

  validates :first_name, :last_name, :username, :email,
    presence: true

  validates :email,
    format: { with: EMAIL_REGEX }

  validates :username,
    uniqueness: true

  def full_name
    "#{first_name} #{last_name}"
  end
end
