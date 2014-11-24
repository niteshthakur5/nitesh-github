#!/usr/bin/ruby

begin  
   a , b = 5, 0
   temp = a/b
rescue Exception => e
    puts e.message
    puts e.backtrace.inspect
end  
