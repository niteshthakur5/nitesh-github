class StudentController < ApplicationController
	def index
		@students = Students.all 
	end
end
