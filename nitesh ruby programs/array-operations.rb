array = [10,5,35,26,15]
puts "simple 1D array with each block"
array.each do |i|
	print "#{i}\t"
end
puts "\n2D array with each"
array = [[10,5],[6,7],[7,8],[9,2]]
array.each do |i|
	#puts "#{i}"
	i.each do |j|
		puts "#{j}"
	end
end
puts "\narray with hashes"
array = [{:name => "nitesh", :age => 24},
	{:name => "ajit", :age => 25},
	{:name => "shahsank", :age => 22}
]
array.each do |i|
	i.each do |key,value|
		print key, " = ", value, "\n"
	end
end