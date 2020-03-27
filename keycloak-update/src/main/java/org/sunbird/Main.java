package org.sunbird;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.HeaderGroup;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;;
public class Main {

	public static void main(String[] args) throws IOException {

		String kcUrl = "http://localhost:8081";
			
		 //JSON parser object to parse read file
        JSONParser jsonParser = new JSONParser();
        
        try 
        {
        	InputStream inputStream = null;
        	if(args.length == 0) {
        		inputStream=ClassLoader.getSystemClassLoader().getResourceAsStream("Employee.json");
        	}else {
        		inputStream= new FileInputStream(new File(args[0]));
        	}
        	InputStreamReader isReader = new InputStreamReader(inputStream);
    		BufferedReader reader = new BufferedReader(isReader);
    		
    		StringBuffer sb = new StringBuffer();
			String str;
			while ((str = reader.readLine()) != null) {
				sb.append(str);
			}
            //Read JSON file
            Object obj = jsonParser.parse(sb.toString());
 
            JSONArray employeeList = (JSONArray) ((JSONObject)obj).get("Employee");
            
            EncryptionSevice enc = new EncryptionSevice();
          
            //Iterate over employee array
            for (int i = 0; i < employeeList.size(); i++) {
				JSONObject jObj =(JSONObject) employeeList.get(i);
				HttpClient httpClient =HttpClientBuilder.create().build();
				System.out.println("KCID: "+jObj.get("kcid")+" Email: "+jObj.get("email")+" Encrypted: "+ enc.encrypt(jObj.get("email").toString()));
				HttpPut putRequest =new HttpPut(kcUrl+"/auth/admin/realms/PartnerRegistry/users/"+jObj.get("kcid"));
				String jsonReq = "{\"email\":\""+ enc.encrypt(jObj.get("email").toString()) +"\"}";
				System.out.println(jsonReq);
				StringEntity entity = new StringEntity(jsonReq, "UTF-8");
				 
				 
				HeaderGroup headerG = new HeaderGroup();
				Header header1 = new BasicHeader("Content-Type", "application/json");
				Header header2 = new BasicHeader("Authorization", "Bearer "+System.getenv("token"));

				headerG.addHeader(header1);
				headerG.addHeader(header2);
				
				
				putRequest.setHeaders(headerG.getAllHeaders());
				putRequest.setEntity(entity);
				HttpResponse response = httpClient.execute(putRequest);
				System.out.println(response.getStatusLine().getStatusCode());
				if(response.getStatusLine().getStatusCode()== 204) {
					System.out.println("Successfully Inserted: " +(i+1)+" records");
				}
				
			}
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        
        		
    }

}