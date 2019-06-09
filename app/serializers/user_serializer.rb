class UserSerializer < ActiveModel::Serializer
  attributes :first_name, :last_name, :username
  belongs_to :avatar
end
