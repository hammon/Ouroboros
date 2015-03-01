package utils;


import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Base64;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * Created by michael on 20/02/15.
 */
public class XMLTest {
    public static void main(String[] args) {

        DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory
                .newInstance();
        DocumentBuilder docBuilder = null;
        try {
            docBuilder = docBuilderFactory.newDocumentBuilder();
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }
        Document document = null;
        try {
            document = docBuilder.parse(new File("/home/michael/dev/f5exam/bookstore.xml"));
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        NodeList nodeList = document.getElementsByTagName("*");
        for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);

            if (node.getNodeType() == Node.ELEMENT_NODE) {
                System.out.println(node.getNodeName());
                NamedNodeMap attrs = node.getAttributes();
                for(int j = 0;j < attrs.getLength();j++){
                    Node a = attrs.item(j);
                    String attrName = a.getNodeName();
                    System.out.println("attr: " + attrName);
                    if(attrName.equals("test")  ){
                        System.out.println("attr val: " + a.getNodeValue());

                        System.out.println("node val: " + node.getTextContent());

                        try {
                            node.setTextContent(decompress(compress(node.getTextContent())) + " :-)))");
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
                // do something with the current element

            }
        }

        DOMSource domSource = new DOMSource(document);
        StringWriter writer = new StringWriter();
        StreamResult result = new StreamResult(writer);
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer transformer = null;
        try {
            transformer = tf.newTransformer();
        } catch (TransformerConfigurationException e) {
            e.printStackTrace();
        }

        try {
            transformer.transform(domSource, result);
        } catch (TransformerException e) {
            e.printStackTrace();
        }

        String xmlStr = writer.toString();
        System.out.println("XML IN String format is: \n" + xmlStr);


        try {
            System.out.println("XML IN String format is: \n" + decompress(compress(xmlStr)));
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("post: " + post("http://posttestserver.com/post.php", xmlStr));


    }

    public static String compress(String str) throws Exception {
        if (str == null || str.length() == 0) {
            return str;
        }
        System.out.println("String length : " + str.length());
        ByteArrayOutputStream obj=new ByteArrayOutputStream();
        GZIPOutputStream gzip = new GZIPOutputStream(obj);
        gzip.write(str.getBytes("UTF-8"));
        gzip.close();
        String outStr = Base64.getEncoder().encodeToString(obj.toByteArray());
        System.out.println("Output String length : " + outStr.length());
        return outStr;
    }

    public static String decompress(String str) throws Exception {
        if (str == null || str.length() == 0) {
            return str;
        }
        System.out.println("Input String length : " + str.length());
        GZIPInputStream gis = new GZIPInputStream(new ByteArrayInputStream(Base64.getDecoder().decode(str.getBytes())));
        //GZIPInputStream gis = new GZIPInputStream(new ByteArrayInputStream(str.getBytes("UTF-8")));
        BufferedReader bf = new BufferedReader(new InputStreamReader(gis, "UTF-8"));
        String outStr = "";
        String line;
        while ((line=bf.readLine())!=null) {
            outStr += line;
        }
        System.out.println("Output String lenght : " + outStr.length());
        return outStr;
    }

    public static String post(String url,String body){

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
    //    connection.setRequestProperty("Content-Type", "application/json");
     //   connection.setRequestProperty("Accept", "application/json");
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
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }


        try {
            response = connection.getInputStream();
        } catch (Exception e) {
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
            BufferedReader reader = null;
            try {
                reader = new BufferedReader(new InputStreamReader(response));
                for (String line; (line = reader.readLine()) != null;) {
                    result += line;
                }
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } finally {
                if (reader != null) try { reader.close(); } catch (IOException e) {}
            }
        }

        return result;
    }
}
