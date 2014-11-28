class Students < ActiveRecord::Base
	validates :fName, presence: true
	validates :lName, presence: true
	validates :course, presence: true
end
