class GetdataController < ApplicationController
	require 'net/http'
	require 'json'
  def getjson
	#response = Net::HTTP.get_response('http://it-ebooks-api.info/v1/search/php%20mysql/page/3','')
	#render text: response
	uri = URI('http://it-ebooks-api.info/v1/search/php%20mysql/page/3')
	json = Net::HTTP.get(uri) # => String
	@obj = JSON.parse(json)
	render :json => @obj
	#render "getjson"
	# for counter in 0...obj["Books"].length
		# #@bookObject = 
		# #result += "\n\n\nDetails for book : #{counter+1} ID = #{obj["Books"][counter]["ID"]}"
		
		# #puts "Title = #{obj["Books"][counter]["Title"]}"
		# #puts "SubTitle = #{obj["Books"][counter]["SubTitle"]}"
		# #puts "Description = #{obj["Books"][counter]["Description"]}"
		# #puts "Image = #{obj["Books"][counter]["Image"]}"
		# #puts "ISBN = #{obj["Books"][counter]["isbn"]}"
		
	# end
	#render text: result
  end
end
