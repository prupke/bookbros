class RatingsController < ApplicationController

	def index
		@ratings = Rating.all.order('rating DESC')
	end

	def new

	end

	def edit
		@rating = Rating.find(params[:id])
		if @rating.name == session[:name]
			@book = Book.find_by(book: @rating.book)
		else
			redirect_to posts_url
		end
	end

	def destroy
		@rating = Rating.find(params[:id])
		@post = Book.find_by(book: @rating.book)
		if @rating.name == session['name'] and @post.club = session['club']
			@rating.destroy
		else
			redirect_back(fallback_location: posts_url(@post), notice: 'You do not have permission to delete this.')
		end		
	    respond_to do |format|
	      # format.html { redirect_to posts_url, notice: 'Rating was successfully destroyed.' }
	      format.html { redirect_back(fallback_location: posts_url(@post), notice: 'Rating deleted.') }

	      format.json { head :no_content }
	    end
		# redirect_back(fallback_location: posts_url(:anchor => @rating[:book]))
	end

	def create
		# render plain: params[:rating].inspect
		@rating = Rating.new(rating_params)
		session[:name] = @rating[:name]
		@rating.club = session[:club]
		print(session[:name])
		print(session[:club])

		@rating.save
		flash[:notice] = 'Rating saved'
		# redirect_to posts_url(:anchor => @rating[:book])
		redirect_back(fallback_location: posts_url(:anchor => @rating[:book]))
	end

	def update
		@rating = Rating.find(params[:id])
		if (@rating.update(rating_params))
			@book = Book.find_by(book: @rating.book)
			flash[:notice] = 'Rating updated'
			redirect_to ('/posts/' + (@book.id).to_s)
		else
			render edit
		end
	end

	
	private

		def rating_params
			params.require(:rating).permit(:book, :name, :rating, :notes, :club)	
		end

	private

		def check_book
		    redirect_to posts_url unless params[:book].present?
		end
end
