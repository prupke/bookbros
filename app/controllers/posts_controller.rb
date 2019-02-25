class PostsController < ApplicationController

	def index
		@books = Book.where(club = "club='bookbros'")

		@title = 'Book Bros';
		@ratings = Rating.all

		@rating_total = 0
		@rating_count = 0

	end

	def create
		@rating = ratings_controller.create(rating_params)
		ratings_controller.request = request
		ratings_controller.response = response
		ratings_controller.post
	end
		# render plain: params[:post].inspect
		# @post = Post.new(params[:post])
		# @post.save
		# redirect_to @post


	# private 

	# def post_params
	# 	params.require(:post).permit(:name, :rating)
	# end
	
end
