
require "dbi"
begin 
	dbh = DBI.connect("DBI:Mysql:rubytrialdb:localhost", "root", "")
	dbh.do( "insert into studentdemo values('nitesh', 24, 'MCA')")
	puts "values inserted"
	rescue Exception => e
		puts e.message
end


=begin
require "mysql"
con = Mysql.new("localhost","root","","rubytrialdb")
rs = con.query("select * from studentdemo")
rs.each_hash{|h| puts h["name"]}
con.close
=end