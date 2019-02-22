class PostsController < ApplicationController

	def index
		books = [
			{
				id: "in_the_skin_of_a_lion",
				name: "In the Skin of a Lion", 
				author: "Michael Ondaatje"
			},
			{
				id: "asdfasdfasdf",
				name: "test5", 
				author: "test5 author"
			},
			{
				id: "asdfasdfasdf2",
				name: "test5", 
				author: "test5 author"
			},
			{
				id: "strangers_on_a_train",
				name: "Strangers on a Train", 
				author: "Patricia Highsmith"
			}
		]
		@books = (books.map {|book| book.values})

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
