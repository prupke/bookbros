class BooksController < ApplicationController
	# require goodreads
	# client = Goodreads::Client.new(api_key: "KEY", api_secret: "SECRET")
	# Goodreads.configuration
	

	def index
		@nav = "find_a_book"
		# @goodreads = client.search_books("The Lord Of The Rings")
		if params[:book_search]
			@search = params[:book_search] 
		end	
	end

	def new

	end

	def create
		if !session['club']
			session['club'] = 'demo'
		end
		@book = Book.new(book_params)

		session['name']	= @book.user
		@book.club = session['club']
		if @book.title
			# Rails doesn't get the full title if it contains quotes, so they were replaced in application.js - this adds them back.
			@book.title = (@book.title).gsub("~~", "'")
			@book.title = (@book.title).gsub('::', '"')
		end
		@book.save
		if @book.title
			flash[:notice] = 'Added "' + @book.title + '" to your book list!'
		else
			flash[:notice] = 'Added this book to your book list!'	
		end	
		redirect_to posts_url(:anchor => @book[:book])
		# @search = params[:book_search]
		# redirect_to books_url(@search = params[:book_search])
		# render plain: params[:book_search].inspect
	end

	def show
		@book = params[:id]
	end

	def destroy
		@book = Book.find(params[:id])
		@book_title = @book.title
		if (session['name'] == 'admin' and @book.club = session['club']) or @book.user = ''
			@book.destroy
			if @book_title
				flash[:notice] = 'Removed "' + @book_title + '" from your book list.'
			else
				flash[:notice] = 'Removed from your book list.'	
			end	
		else
			redirect_back(fallback_location: posts_url, notice: 'You do not have permission to delete this.')
		end		

		redirect_to posts_url
	end


	private

	def book_params
		params.require(:book).permit(:book, :title, :author, :user, :club)
	end
end
