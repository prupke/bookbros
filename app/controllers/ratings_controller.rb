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

		@rating.save
		redirect_to posts_url
	end
	
	private

	def rating_params
		params.require(:rating).permit(:book, :name, :rating)	
	end

	private

	def check_book
	    redirect_to posts_url unless params[:book].present?
	end
end
