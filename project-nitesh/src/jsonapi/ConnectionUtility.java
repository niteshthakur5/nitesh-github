package jsonapi;
import java.sql.*;
public class ConnectionUtility {
	public static Connection provideConnection(){
		Connection con=null;
		try{
			Class.forName("com.mysql.jdbc.Driver");  
			 con= DriverManager.getConnection("jdbc:mysql://localhost:3306/cellswebapp","root",""); 
		}catch(Exception e){
			e.printStackTrace();
		}
		return con;
	}

}

