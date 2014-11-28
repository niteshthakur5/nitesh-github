class StudentsController < ApplicationController
	def index
		@students = Students.all 
		respond_to do |format|
			format.js {render :js => "hello();"}
		end
	end
	def new
		@students = Students.new
	end
	def create
		@students = Students.new(students_params)
		if @students.save
			redirect_to @students
		else
			render "new"
		end
	end
	def show
		@students = Students.find(params[:id])
	end
	def edit
		@students = Students.find(params[:id])
	end
	def update
		@students = Students.find(params[:id])
		if @students.update(students_params)
			redirect_to @students
		else
			render "edit"
		end
	end
	def destroy
		@students = Students.find(params[:id])
		@students.destroy
 		redirect_to root_path
	end
	private
		def students_params
			params.require(:students).permit(:fName, :lName, :gender, :course)
		end
end
