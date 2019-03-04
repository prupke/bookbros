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
		redirect_to posts_url(:anchor => @book[:book])
		# @search = params[:book_search]
		# redirect_to books_url(@search = params[:book_search])
		# # render plain: params[:book_search].inspect
	end

	def show
		@books = Book.find(params[:book])
	end

	def destroy
		@book = Book.find(params[:id])
		@book_title = @book.title
		if session['name'] == 'admin' and @book.club = session['club']
			@book.destroy
		else
			redirect_back(fallback_location: posts_url, notice: 'You do not have permission to delete this.')
		end		
	    respond_to do |format|
	      # format.html { redirect_to posts_url, notice: 'Rating was successfully destroyed.' }
	      format.html { redirect_to posts_url, notice: "Deleted '" + @book_title + "' from your book list." }

	      format.json { head :no_content }
	    end
		# redirect_back(fallback_location: posts_url(:anchor => @rating[:book]))
	end


	private

	def book_params
		params.require(:book).permit(:book, :title, :author)
	end
end
