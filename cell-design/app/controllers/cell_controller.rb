class CellController < ApplicationController
  def index
  end
  def createJSON
	uri = URI(params[:link])
	json = Net::HTTP.get(uri)
	@obj = JSON.parse(json)
	#flash[:notice] = "succesfulyy got json"
	render :json => @obj
  end
end
