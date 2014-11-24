require "rubygems"
require "json"
json = File.read('books.json')
obj = JSON.parse(json)
	for counter in 0...obj["Books"].length
		puts "\n\n\nDetails for book : #{counter+1}"
		puts "ID = #{obj["Books"][counter]["ID"]}"
		puts "Title = #{obj["Books"][counter]["Title"]}"
		puts "SubTitle = #{obj["Books"][counter]["SubTitle"]}"
		puts "Description = #{obj["Books"][counter]["Description"]}"
		puts "Image = #{obj["Books"][counter]["Image"]}"
		puts "ISBN = #{obj["Books"][counter]["isbn"]}"
	end
	

