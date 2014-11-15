package jsonapi;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
public class GetJSON {
	public static String getData(String link,String methodType,String contentType) {
		String result="";
		  try{
	          URL url = new URL(link);
			  HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			  conn.setRequestMethod(methodType);
			  conn.setRequestProperty("Accept", contentType);
	          if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "
						+ conn.getResponseCode());
			  }
	          BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
	          String output;
			  while ((output=br.readLine()) != null) {
				result+=output;
			  }
			  conn.disconnect();
		  }catch(MalformedURLException e){
	            e.printStackTrace();
	       }catch(IOException e){
	             e.printStackTrace();
	        }
		  return result;
	}
}
