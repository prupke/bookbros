class ClubsController < ApplicationController
  before_action :set_club, only: [:show, :edit, :update, :destroy]

  # GET /clubs
  # GET /clubs.json
  def index
    # session['club'] = 'demo'
    if session['club']
      return redirect_to :action => "show", id: session['club']
    else
      return redirect_to new_clubs_url
    end  

    # if !session['club']
    #   session['club'] = 30
    # end
    # @club.users = [ @user ]
  end

  # GET /clubs/1
  # GET /clubs/1.json
  def show
    # print("CLUB: " + session['club'])
    # print("PARAM: " + params[:name])
    if session['club'] != params[:id]
      redirect_back(fallback_location: posts_url, notice: 'You are not a member of this club.')
    end 
    @club = Club.where(name: params[:id])
    @books = Book.where(club: params[:id])
    @user_books = @books.distinct.select(:user)

    @ratings = Rating.where(club: params[:id])
    # @user_ratings = @ratings.distinct.pluck(:name)

    @rating_count = 0
    @rating_total = 0
    @user_rating_count = 0
    @user_rating_total = 0    
    # render plain: @club.inspect


  end


  # GET /clubs/new
  def new
    @club = Club.new()
  end

  # GET /clubs/1/edit
  def edit
  end

  # POST /clubs
  # POST /clubs.json
  def create
    render plain: params[:club].inspect
    @club = Club.create(club_params)
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
    respond_to do |format|
      if @club.save
        session['club'] = @club.id
        # session['user'] = @club
        format.html { render clubs_url, notice: 'Your club has been created.' }
        format.json { render :show, status: :created, location: @club }

      else
        format.html { render :index }
        format.json { render json: @club.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /clubs/1
  # PATCH/PUT /clubs/1.json
  def update
    respond_to do |format|
      if @club.update(club_params)
        format.html { redirect_to @club, notice: 'Your club was successfully updated.' }
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
      params.require(:club).permit(:name, :password, :user)
    end
end
