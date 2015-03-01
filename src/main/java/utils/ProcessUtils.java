package utils;

import java.io.BufferedReader;
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
            String line;
            Process p = Runtime.getRuntime().exec(cmd);
            BufferedReader bri = new BufferedReader
                    (new InputStreamReader(p.getInputStream()));
            BufferedReader bre = new BufferedReader
                    (new InputStreamReader(p.getErrorStream()));
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
            p.waitFor();
            log.info("Done.");
        }
        catch (Exception err) {
            err.printStackTrace();
        }


        return res;
    }
}
