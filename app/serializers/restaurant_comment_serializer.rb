class RestaurantCommentSerializer < ActiveModel::Serializer
  attributes :body, :rating
  belongs_to :user
end
