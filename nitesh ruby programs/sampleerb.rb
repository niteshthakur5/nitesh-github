<% page_title = "Demo of ERB" %>
<% salutaion = "Dear programmer," %>
<html>
<head>
<title><%= page_title %></title>
</head>
<body>
<p>
	the current date is : <%=Time.now.strftime("%Y/%m/%d")%>
</p>
<ul>
	<% 3.times do%>
		<li>link</li>
	<%end%>
</ul>
<p><%= salutaion %></p>
<p>This is an  example of how erb fils out a template.</p> 
</body>
</html>