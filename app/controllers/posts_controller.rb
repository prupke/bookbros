class PostsController < ApplicationController

	def index
		# if (!params[:page]) then
		# 	@page = 1
		# else
		# 	@page = params[:page]	
		# end
		# @total_books = Book.count
		# print("TOTAL BOOKS: " + @total_books.to_s)
		# @books = Book.order('created_at DESC').page(params[:page])
		# session[:club] = 'bookbros'

		# url = url_for()

		# if url.include? '0.0.0.0:3000'
		# 	session['bookbabes'] = true
		# end	
		@nav = "home"	

		if params[:club]
			@club_candidate = Club.find_by_password(params[:club])
			if !@club_candidate.nil?
				print("Club: " + @club_candidate.name)
				session['club'] = @club_candidate.id
			end
		end
		
		# default_per_page = 15
		# total_pages = Book.page(1).total_pages
		# session[:club] = 'default'

		@books = Book.where(club: session[:club]).order('id DESC').limit(25)

		# @books = Book.joins("LEFT JOIN ratings r ON r.book = books.book").select('books.*, r.*').where(club: session[:club).order('id DESC').limit(5)

		print("CLUB:" + session['club'].to_s)
		@ratings = Rating.where(club: session[:club]).order('rating DESC')
		@rating_total = 0
		@rating_count = 0
	end 

	def switch
		if session['brand'] == 'Book Bros'
			session['brand'] = 'Book Babes'
		else
			session['brand'] = 'Book Bros'
		end	

		redirect_back(fallback_location: posts_url)
	end	

	def about

	end

	def show
		@book = Book.find_by_id(params[:id])
		# print("book.club: " + @book.club.to_s + ", session.club: " + session[:club].to_s)
		# print("session name: " + session['name'].to_s + ", book.user: " + @book.user.to_s)
		# print("\n\nBOOK TITLE: " +  @book.title)

		if @book.club.to_s == session[:club].to_s
			@rating_total = 0
			@rating_count = 0
			@ratings = Rating.where(book: @book.book, club: session[:club]).order('rating DESC')
		else
			flash[:notice] = "You are not in this club."
			redirect_to posts_url(club: session[:club])
		end

	end

	# def paginate
	# 	params[:page] = 1

	# 	@books = Book.paginate(page: params[:page]).where(club = "club='bookbros'")

	# end

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
