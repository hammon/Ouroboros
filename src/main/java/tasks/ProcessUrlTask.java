package tasks;

import org.elasticsearch.action.bulk.BulkItemResponse;
import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.client.Client;
import org.json.JSONArray;
import org.json.JSONObject;
import text.NGram;

import utils.WebUtils;

import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Logger;

import static org.elasticsearch.common.xcontent.XContentFactory.*;

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

        String url = "http://techcrunch.com/";


        String res = web.getPageInfo(url);

        JSONObject pageInfo = new JSONObject(res);

        JSONArray arrLinks = pageInfo.getJSONArray("links");

        String bodyText = pageInfo.getString("text");

        log.info("get ngrams");

        NGram ngram = new NGram(bodyText);

        Map<String,Integer> nCount =  ngram.getTokensCount(1);

        //JSONObject bulk = new JSONObject();

        log.info("prepare es balk");
        Client esClient = _es.getClient();

        BulkRequestBuilder bulkRequest = esClient.prepareBulk();

        nCount.forEach((k,v) ->{

            try {
                bulkRequest.add(esClient.prepareIndex("ouroboros","web1gram")
                    .setSource(jsonBuilder()
                                    .startObject()
                                    .field("str", k)
                                    .field("count", v)
                                    .field("date", new Date())
                                    .field("url", url)
                                    .endObject()
                    )
                );
            } catch (IOException e) {
                e.printStackTrace();
            }


        });

        log.info("send ngrams balk");
        BulkResponse bulkResponse = bulkRequest.execute().actionGet();
        if (bulkResponse.hasFailures()) {
            // process failures by iterating through each bulk response item
            Iterator<BulkItemResponse> it = bulkResponse.iterator();
            while (it.hasNext()){
                BulkItemResponse item = it.next();
                BulkItemResponse.Failure failure = item.getFailure();
                if(failure != null){
                    log.severe(failure.getMessage());
                }
            }
        }

        log.info("finished balk");

//        for(int i = 0;i < arrLinks.length();i++){
//            JSONObject link = arrLinks.getJSONObject(i);
//            System.out.println("href: " + link.getString("href"));
//            System.out.println("text: " + link.getString("text"));
//        }
    }
}
