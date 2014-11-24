#!/usr/bin/ruby

class Person
    @@name
    def setName(name)
        @name = name
    end
    def getName
        return @name
    end
end

p = Person.new
p.setName("nitesh")
puts "hello "+p.getName+"!!"