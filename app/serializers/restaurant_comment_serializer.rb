class RestaurantCommentSerializer < ActiveModel::Serializer
  attributes :body, :rating, :user_id
end
