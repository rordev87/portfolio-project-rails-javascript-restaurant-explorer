class CommentSerializer < ActiveModel::Serializer
  attributes :body, :rating, :user_id
end
