class BooksController < ApplicationController
	

	def index
		if params[:book_search]
			@search = params[:book_search]
		end	
	end

	def create
		@book = Book.new(book_params)
		@book.club = session['club']
		@book.save
		flash[:notice] = 'Added "' + @book.title + '" to your book list!'
		redirect_to books_url(:anchor => @book[:book])
		# @search = params[:book_search]
		# redirect_to books_url(@search = params[:book_search])
		# # render plain: params[:book_search].inspect
	end

	def show
		@books = Book.find(params[:book])
	end

	private

	def book_params
		params.require(:book).permit(:book, :title, :author)
	end
end
