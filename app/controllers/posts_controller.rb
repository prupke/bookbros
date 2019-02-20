class PostsController < ApplicationController

	def index

		books = [
			{
				id: "in_the_skin_of_a_lion",
				name: "In the Skin of a Lion", 
				author: "Michael Ondaatje"
			},
			# {
			# 	id: "the_lorax",
			# 	name: "The Lorax", 
			# 	author: "Dr. Suess"
			# },
			{
				id: "test_2",
				name: "Test Book 2", 
				author: "Test Author 2"
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

		# ratings = Rating.all
		# @ratings_2 = (@ratings.map {|rating| @ratings.values})
		@rating_total = 0
		@rating_count = 0
		# for each in Rating.all do
			# book = each.book
			# @rating_total += each.rating

			# rating = each.rating
			# for each in books do
			# 	@rating_total[i] = {book: @books[0], rating: rating}
			# end
			# @rating_count += each.size 
			# for each do
			# 	@rating_total[0] += each.rating 
			# end	
		# end

		# Dir.pwd
		# Dir.chdir(File.dirname('public'))
		# @books = {
		# 	name: 'in_the_skin_of_a_lion',
		# 	title: 'In the Skin of a Lion', 
		# 	author: 'Michael Ondaatje',
		# 	name: 'strangers_on_a_train',
		# 	title: 'Strangers on a Train',
		# 	author: 'Patricia Highsmith'
		
		# }

							

		# for each in @books do
		# 	print @books[0]
		# 	puts "#{i} #{@books}"
		# end
		# @books = (books.map {|book| [book["id"], book["name"], book["author"]]})
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
