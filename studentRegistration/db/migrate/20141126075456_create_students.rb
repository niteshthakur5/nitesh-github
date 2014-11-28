class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :fName
      t.string :lName
      t.string :gender
      t.string :course

      t.timestamps
    end
  end
end
