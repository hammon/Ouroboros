package utils;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.util.logging.Logger;

public class HttpUtils {

    private static final Logger log = Logger.getLogger(HttpUtils.class.getName());

	public String get(String url){

        log.info("HttpUtils.get url: " + url);
		URLConnection connection = null;
		try {
			connection = new URL(url).openConnection();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		connection.setRequestProperty("Accept-Charset", "UTF-8");
		
		InputStream response = null;
		
		try {
			response = connection.getInputStream();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		InputStreamReader is = new InputStreamReader(response);
		StringBuilder sb=new StringBuilder();
		BufferedReader br = new BufferedReader(is);
		String read = null;
		try {
			read = br.readLine();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		while(read != null) {
		    //log.info(ln(read);
		    sb.append(read);
		    try {
				read =br.readLine();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		
		return sb.toString();
		
	}
	
	public String post(String url,String body){
		
		HttpURLConnection connection = null;
		try {
			connection = (HttpURLConnection) new URL(url).openConnection();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		connection.setDoOutput(true);
		connection.setDoInput(true);
		connection.setInstanceFollowRedirects(false); 
		try {
			connection.setRequestMethod("POST");
		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		connection.setRequestProperty("Content-Type", "application/json"); 
		connection.setRequestProperty("Accept", "application/json");
		connection.setRequestProperty("charset", "UTF-8");
		connection.setRequestProperty("Content-Length", "" + Integer.toString(body.getBytes().length));
		connection.setUseCaches (false);

		DataOutputStream wr;
		try {
			wr = new DataOutputStream(connection.getOutputStream ());
			wr.writeBytes(body);
			wr.flush();
			wr.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		String result = "";
		InputStream response = null;
		
		try {
			if(connection.getResponseCode() == -1){
				BufferedReader reader = null;
				response =  connection.getErrorStream();
				reader = new BufferedReader(new InputStreamReader(response, "UTF-8"));
		        for (String line; (line = reader.readLine()) != null;) {
		        	result += line;
		        }
		        return result;
			}
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		
		try {
			response = connection.getInputStream();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			try {
				//Integer code = connection.getResponseCode();
				//result = code.toString() + " " + connection.getResponseMessage();
				
				//connection.getErrorStream();
				BufferedReader reader = null;
				response =  connection.getErrorStream();
				reader = new BufferedReader(new InputStreamReader(response, "UTF-8"));
		        for (String line; (line = reader.readLine()) != null;) {
		        	result += line;
		        }
		        response.close();
		        
				return result;
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		
		String contentType = connection.getHeaderField("Content-Type");
		String charset = null;
		for (String param : contentType.replace(" ", "").split(";")) {
		    if (param.startsWith("charset=")) {
		        charset = param.split("=", 2)[1];
		        break;
		    }
		}

		
		
		if (charset != null) {
		    BufferedReader reader = null;
		    try {
		        reader = new BufferedReader(new InputStreamReader(response, charset));
		        for (String line; (line = reader.readLine()) != null;) {
		        	result += line;
		        }
		    } catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
		        if (reader != null) try { reader.close(); } catch (IOException e) {}
		    }
		} else {
		    // It's likely binary content, use InputStream/OutputStream.
		}
		
		return result;
	}
}
