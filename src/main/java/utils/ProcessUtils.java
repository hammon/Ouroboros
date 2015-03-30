package utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Logger;

/**
 * Created by malexan on 23/11/2014.
 */
public class ProcessUtils {

    private static final Logger log = Logger.getLogger(ProcessUtils.class.getName());

    public static void main(String args[]) {
        ProcessUtils proc = new ProcessUtils();

        String url = "http://www.theverge.com/tldr/2015/2/17/8054427/nba-all-star-michael-jordan-last-shot-byron-russel-was-fouled";//http://www.theverge.com/2015/2/16/8044727/jony-ive-lightsaber-design";

        String res = proc.exec("/home/michael/tools/phantomjs/bin/phantomjs /home/michael/tools/phantomjs/examples/bodyText.js " + url);
       
        log.info("res:" + res);
    }


    public String exec(String cmd){
        String res = "";

        try {

            Process p = Runtime.getRuntime().exec(cmd);
            res = getOutput(p);

        }
        catch (Exception e) {
            log.severe(String.valueOf(e.getStackTrace()));
        }


        return res;
    }

    String exec(String [] cmd){

        String res = "";

        try {

            log.info("ProcessUtils.exec");

            ProcessBuilder builder = new ProcessBuilder(cmd);
            builder.redirectErrorStream(false);
            Process p = builder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            StringBuilder stringBuilder = new StringBuilder();
            String line = null;
            while ( (line = reader.readLine()) != null) {
                stringBuilder.append(line);
                stringBuilder.append(System.getProperty("line.separator"));
            }

//            Process p = Runtime.getRuntime().exec(cmd);
//            res = getOutput(p);

            try {
                int exitValue = p.waitFor();
                System.out.println("\n\nExit Value is " + exitValue);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            res = stringBuilder.toString();

        }
        catch (Exception e) {
            log.severe(String.valueOf(e.getStackTrace()));
        }


        return res;
    }

     String getOutput( Process p) throws IOException, InterruptedException {
        String res = "";
        String line;

        BufferedReader bri = new BufferedReader(new InputStreamReader(p.getInputStream()));
        BufferedReader bre = new BufferedReader(new InputStreamReader(p.getErrorStream()));

        while ((line = bri.readLine()) != null) {
            res+=line + "\n";
        //log.info(line);
        }
        bri.close();

        while ((line = bre.readLine()) != null) {
            //res+=line + "\n";
            log.info(line);
        }

        bre.close();

       //  p.waitFor();

        log.info("Done.");
        return res;
    }
}
