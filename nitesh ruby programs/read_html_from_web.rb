require 'net/http'

source = Net::HTTP.get('stackoverflow.com', '/index.html')
puts source