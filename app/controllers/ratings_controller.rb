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

	def create
		# render plain: params[:rating].inspect
		@rating = Rating.new(rating_params)
		session[:name] = @rating[:name]
		print(session[:name])
		@rating.save
		flash[:notice] = 'Rating saved'
		redirect_to posts_url(:anchor => @rating[:book])
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
		params.require(:rating).permit(:book, :name, :rating, :notes)	
	end

	private

	def check_book
	    redirect_to posts_url unless params[:book].present?
	end
end
