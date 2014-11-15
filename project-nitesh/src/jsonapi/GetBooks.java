package jsonapi;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class GetBooks
 */
@WebServlet("/getbooks")
public class GetBooks extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		PrintWriter out=response.getWriter();
		String link1="";
		String methodType="";
		String contentType="";
		contentType=request.getHeader("Content-Type");
		link1=(String)request.getParameter("link"); 
		methodType=request.getMethod();
		//out.print(link1 +"\n"+methodType+"\n"+contentType);
		String result=GetJSON.getData(link1,methodType,contentType);
		out.print(result);
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request,response);
	}

}
