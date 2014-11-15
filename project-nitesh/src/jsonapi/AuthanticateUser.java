package jsonapi;

import java.io.IOException;
import java.sql.*;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class AuthanticateUser
 */
@WebServlet("/authanticateuser")
public class AuthanticateUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		/*String username = "nitesh";
		String password = "123";*/
		String username = request.getParameter("user");
		String password = request.getParameter("pass");
		try{
			Connection con = ConnectionUtility.provideConnection();
			PreparedStatement ps = con.prepareStatement("select password from login where username = ?");
			ps.setString(1,username);
			ResultSet rs = ps.executeQuery();
			if(rs.next()){ 
				if(password.equals(rs.getString("password"))){
					rs.close();
					ps.close();
					con.close();
					HttpSession hs = request.getSession();
					hs.setAttribute("user", username);
					out.print("true");
				}else{
					rs.close();
					ps.close();
					con.close();
					out.print("false");
				}
			}else{
				rs.close();
				ps.close();
				con.close();
				out.print("false");
			}
		}catch(Exception e)
		{
			out.print(e);
		}
		
	}

}
