class ClubsController < ApplicationController
  before_action :set_club, only: [:show, :edit, :update, :destroy]

  # GET /clubs
  # GET /clubs.json
  def index
    # session['club'] = 'demo'
    if session['club'] != 'demo'
      return redirect_to :action => "show", id: session['club']
    else
      return redirect_to new_club_url
    end  

    # if !session['club']
    #   session['club'] = 30
    # end
    # @club.users = [ @user ]
  end

  # GET /clubs/1
  # GET /clubs/1.json
  def show
    print("CLUB: " + session['club'].to_s)
    print("PARAM: " + params[:id].to_s)

    @club = Club.find_by_id(params[:id])


    # @user_club = Club.find(session[:club])

    # print("club: " + @club.to_s)

    # print("User club: " + @user_club.name.to_s)

    # print("CLUB: " + @club[:id].to_s)
    if session['club'].to_s != params[:id].to_s
      redirect_back(fallback_location: posts_url, notice: 'You are not logged into this club.')
    end 
    @books = Book.where(club: params[:id])
    @user_books = @books.distinct.select(:user)

    if session['club'] != 'demo'
      @club_link = "http://www.bookbros.club?club=" + @club.password
    end

    @password = @club.password

    @ratings = Rating.where(club: params[:id])
    # @user_ratings = @ratings.distinct.pluck(:name)

    @rating_count = 0
    @rating_total = 0
    @user_rating_count = 0
    @user_rating_total = 0   
    @self_rating_count = 0
    @self_rating_total = 0        
    # render plain: @club.inspect


  end


  # GET /clubs/new
  def new
    @club = Club.new()
  end

  # GET /clubs/1/edit
  def edit
    @club = Club.find_by_id(params[:id])

  end

  # POST /clubs
  # POST /clubs.json
  def create
    # render plain: params[:club].inspect
    @club = Club.create(club_params)
    require 'securerandom'
    random_string = SecureRandom.hex

    @club.password = random_string

    @club.save
    # @club.update(:users_attributes => {:name => params['name']})

    # @user.save
    # session['id'] = @user.id
    # session['user'] = @user.name
    # @user.(:user_attributes => {:name => @club.users })
    # @club.users = {params[:user][:user]}
    # @club.users = {:user=>"admin2"}
    # @user = User.new(params['user'], @club.id)
    # @user.save
    # respond_to do |format|
      if @club.save
        session['club'] = @club.id
        @key = @club.password.to_s
        print("KEY: " + @club.password.to_s) 
        print(session['club'].to_s)
        # session['user'] = @club
        # format.html { 
          redirect_to @club, notice: 'Your club has been created.', key: @key
        # }
        # format.json { render :show, status: :created, location: @club }

      else
        format.html { render :index }
        # format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    # end
  end

  # PATCH/PUT /clubs/1
  # PATCH/PUT /clubs/1.json
  def update
    @club = Club.find_by_id(params[:id])

    respond_to do |format|
      if @club.update(club_params)
        format.html { 
          redirect_to @club, notice: 'Your club was successfully updated.' }
        format.json { render :show, status: :ok, location: @club }
      else
        format.html { render :edit }
        format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clubs/1
  # DELETE /clubs/1.json
  def destroy
    @club = Club.find(params[:id])
    @club.destroy
    respond_to do |format|
      format.html { redirect_to clubs_url, notice: 'Your club was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  # def users

  # end

  # def user_attributes
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_club
      # @club = Club.find(club_params)
    end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def club_params
      # params.fetch(:club, {})
      params.require(:club).permit(:name, :password)
    end
end
