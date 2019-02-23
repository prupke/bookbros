class BooksController < ApplicationController
	def index
		# @search = "war+and+peace"

		# @search = Book.find(params[:book_search])
		if params[:book_search]
			@search = params[:book_search]
		end	
		books = [
			{
				id: "in_the_skin_of_a_lion_michael_ondaatje",
				name: "In the Skin of a Lion", 
				author: "Michael Ondaatje"
			},
			{
				id: "strangers_on_a_train_patricia_highsmith",
				name: "Strangers on a Train", 
				author: "Patricia Highsmith"
			}
		]
	end

	def create
		# # @search = Book.new(book)
		# @search = params[:book_search]
		# redirect_to books_url(@search = params[:book_search])
		# # render plain: params[:book_search].inspect
	end

	def show
		@search = params[:book_search]
		redirect_to books_url(@search = params[:book_search])
	end

	private
	
	def book_params
		params.require(:book_search).permit(:book_search)	
	end
end
