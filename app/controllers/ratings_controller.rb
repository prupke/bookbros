class RatingsController < ApplicationController

	def index
		@ratings = Rating.all
	end

	def new

	end

	def show
		@rating = Rating.find(params[:id])
	end

	def create
		# render plain: params[:rating].inspect
		@rating = Rating.new(rating_params)
		session[:name] = @rating[:name]
		print(session[:name])
		@rating.save
		redirect_to posts_url(:anchor => @rating[:book])
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
