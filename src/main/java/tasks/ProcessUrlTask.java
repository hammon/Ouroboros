package tasks;

import org.json.JSONArray;
import org.json.JSONObject;
import utils.WebUtils;

import java.util.logging.Logger;

/**
 * Created by michael on 3/23/15.
 */
public class ProcessUrlTask extends TaskBase{

    private static final Logger log = Logger.getLogger(ProcessUrlTask.class.getName());

    @Override
    public void run() {
        log.info("run started ...");
        process();
        log.info("process finished ...");
    }

    void process(){
        WebUtils web = new WebUtils();

        JSONObject pageInfo = new JSONObject(web.getPageInfo("http://www.reuters.com"));

        JSONArray arrLinks = pageInfo.getJSONArray("links");

        for(int i = 0;i < arrLinks.length();i++){

            JSONObject link = arrLinks.getJSONObject(i);
            System.out.println("href: " + link.getString("href"));
            System.out.println("text: " + link.getString("text"));
        }
    }
}
