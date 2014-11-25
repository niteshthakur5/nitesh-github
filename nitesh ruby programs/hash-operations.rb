hash = {:name => "nitesh", :age =>25}
puts "Simple Hash with each"
hash.each do |key, value|
	print key, " = " , value
end
puts "\n\nnested hash"
hash = { "ob1" =>{:name => "nitesh", :age => 24},
	"obj2" => {:name => "ajit", :age => 25},
	"obj3" => {:name => "shahsank", :age => 22},
}

hash.each do |key,value|
	value.each do |key,value|
		print key, " = ",value, "\n"
	end
end

puts "\nhash with array"
hash = {:name => "nitesh", :marks =>[10,5,6]}
hash.each do |key,value|
	#print key, " = ", value
	if(value.is_a?(Array))
		print key," = "
		value.each do |i|
			print "#{i}", "\t"
		end
	else
		print key, " = ", value, "\n" 
	end
end