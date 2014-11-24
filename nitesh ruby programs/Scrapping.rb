class Scrapping
	def readFile
		file = File.open("C:/Users/Nitin/Desktop/cell try/cell-design.html","r")
		tempArray = []
		flag = false
		file.each_line do |line|
			charArray = (line.to_s)
			charArray = charArray.strip
			#puts charArray.length
			for i in 0...charArray.length
				if(charArray[i] == "<")
					tempArray.push(charArray[i])
					flag = false
				elsif(charArray[i] == ">")
					tempArray.pop()
					flag = true
				else
					if(flag)
						print charArray[i]
					end
				end
			end
			#puts "\n"
		end
		if(tempArray.length!=0)
			puts "error in parsing"
		end
	end
end
s = Scrapping.new
s.readFile