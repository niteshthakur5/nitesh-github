class Person
	attr_accessor :name, :age
	def initialize(name,age)
		@name = name
		@age = age
	end
end
class Student < Person
	def initialize(name, age, course, marks)
		super name,age
		@course = course
		@marks = marks
	end
	def showDetails
		puts "name = #{@name}","age = #{@age}", "course = #{@course}"
		print "Marks : "
		@marks.each do |key,value|
			print key," = ", value, "\n"
	    end
	end
	def getMarks
		print "Marks is : "
		@marks.each do |key,value|
			print key," = ", value, "\n"
	    end
	end
	def getTotalMarks
	@sum = 0;
		@marks.each do |key,value|
			@sum += value
		end
		return @sum
	end
end
class ArrayExample
	def initialize(array)
		@array = array
	end
	def showArray
		print "Array is = "
		for i in 0...@array.length
			print @array[i], "\t"
		end
	end
	def sumArray
		@sum = 0
		for i in 0...@array.length
			@sum = @sum + @array[i]
		end
		return @sum
	end
	def minArray
		return @array.min
	end
	def maxArray
		return @array.max
	end
	def sortArray
		return @array.sort.join(" ")
	end
end
s = Student.new("nitesh", 24, "MCA", {"M1" => 80, "database" => 70, "java" => 90})
s.showDetails
arrObj = ArrayExample.new([22,10,36,19,7])
s.getMarks
puts "name = #{s.name.capitalize}"
puts "Total marks = #{s.getTotalMarks}"

arrObj.showArray
puts "\nsum of array = #{arrObj.sumArray}"
puts "minimum of this Array = #{arrObj.minArray}"
puts "maximum of this Array = #{arrObj.maxArray}"
print "sorted Array is = ",arrObj.sortArray, "\n"

=begin 
begin 
	puts "Press 1 for student info "
	puts "Press 2 for student's marks "
	puts "Press 3 for student's total marks "
	puts "Press 4 for Array "
	puts "Press 5 for sum of Array "
	puts "Press 6 for minimum of Array "
	puts "Press 7 for maximum of Array "
	puts "Press 8 forsorted Array "
	choice = gets
	case choice
		when 1
			puts s.showDetails
		when 2
			s.getMarks
		when 3
			puts "Total marks = #{s.getTotalMarks}"
		when 4
			arrObj.showArray
		when 5
			puts "\nsum of array = #{arrObj.sumArray}"
		when 6
			puts "minimum of this Array = #{arrObj.minArray}"
		when 7
			puts "maximum of this Array = #{arrObj.maxArray}"
		when 8
			print "sorted Array is = ",arrObj.sortArray, "\n"
		else
			puts "wrong choice"
	end
	
end
=end