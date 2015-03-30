package utils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.logging.Logger;

/**
 * Created by michael on 27/02/15.
 */
public class WebUtils {
    private static final Logger log = Logger.getLogger(ProcessUtils.class.getName());

    String phantomJsPath = "/home/michael/tools/phantomjs/bin/phantomjs";
    String scriptPath = "/home/michael/dev/Ouroboros/src/main/resources/scripts/phantomjs/pageInfo.js";//"scripts/phantomjs/pageInfo.js";

    public static void main(String args[]) {
        //ProcessUtils proc = new ProcessUtils();

        WebUtils web = new WebUtils();

        String url = "http://www.freedesktop.org/software/systemd/man/systemd-udevd.service.html";

        String res = web.getPageInfo(url);

        log.info("res:" + res);

        JSONObject obj = new JSONObject(res);

        JSONArray arrLinks = obj.getJSONArray("links");

        for(int i = 0;i < arrLinks.length();i++){

            JSONObject link = arrLinks.getJSONObject(i);
            System.out.println("href: " + link.getString("href"));
            System.out.println("text: " + link.getString("text"));
        }
    }

    public String getPageInfo(String url) {
        ProcessUtils proc = new ProcessUtils();

        return proc.exec(new String[] {phantomJsPath,scriptPath,url});
        //return proc.exec(phantomJsPath + " " + scriptPath + " \"" + url + "\"");
    }
}
