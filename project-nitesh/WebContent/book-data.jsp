<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"% import="java.io.*" /%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="application/json"; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<body> 
<% 
// String fileName=getServletContext().getRealPath("jsp.txt");

File f=new File("http://it-ebooks-api.info/v1/search/php"); 

InputStream in = new FileInputStream(f); 

BufferedInputStream bin = new BufferedInputStream(in); 

DataInputStream din = new DataInputStream(bin); 
StringBuffer sb=new StringBuffer(); 
while(din.available()>0) 
    { 
    sb.append(din.readLine()); 
    } 

try {    
    PrintWriter pw = new PrintWriter(new FileOutputStream(getServletContext().getRealPath("book.json")));// save file 
    pw.println(sb.toString()); 
    pw.close(); 
} catch(IOException e) { 
   e.getMessage(); 
} 
          
in.close(); 
bin.close(); 
din.close(); 
%> 

</body> 
</html> 
</body>
</html>