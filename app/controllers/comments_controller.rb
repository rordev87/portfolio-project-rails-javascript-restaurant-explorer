class CommentsController < ApplicationController
  def show
    @comment = Comment.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @comment }
    end
  end
end
