package utils;

import org.elasticsearch.client.Client;
import org.elasticsearch.node.Node;

import static org.elasticsearch.node.NodeBuilder.*;
/**
 * Created by michael on 26/02/15.
 */
public class ESApp {
    public static void main(String[] args) {



// on startup

        Node node = nodeBuilder().clusterName("esapp").node();
        Client client = node.client();

// on shutdown

        node.close();

    }
}
