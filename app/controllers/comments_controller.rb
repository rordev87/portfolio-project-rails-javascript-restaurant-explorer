class CommentsController < ApplicationController
  def show
    @comment = Comment.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @comment }
    end
  end

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: 201
    else

    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :rating, :user_id, :restaurant_id)
  end
end
