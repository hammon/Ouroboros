package utils;

import java.util.logging.Logger;

/**
 * Created by michael on 27/02/15.
 */
public class WebUtils {
    private static final Logger log = Logger.getLogger(ProcessUtils.class.getName());

    static String phantomJsPath = "/home/michael/tools/phantomjs/bin/phantomjs";
    static String scriptPath = "/home/michael/tools/phantomjs/examples/bodyText.js";

    public static void main(String args[]) {
        ProcessUtils proc = new ProcessUtils();

        String url = "http://www.theverge.com/tldr/2015/2/17/8054427/nba-all-star-michael-jordan-last-shot-byron-russel-was-fouled";//http://www.theverge.com/2015/2/16/8044727/jony-ive-lightsaber-design";

        String res = getBodyText( url);

        log.info("res:" + res);
    }

    public static String getBodyText( String url) {
        ProcessUtils proc = new ProcessUtils();
        return proc.exec(phantomJsPath + " " + scriptPath + " " + url);
    }
}
