package core;

//import mtenvs.TasksWatchTask;
//import sun.org.mozilla.javascript.internal.Context;
//import sun.org.mozilla.javascript.internal.Scriptable;
//import utils.*;
import org.elasticsearch.client.Client;
import org.elasticsearch.node.Node;
import tasks.ProcessUrlTask;
import utils.ESUtils;
import utils.HttpUtils;
import utils.ProcessUtils;

        import javax.script.*;
import java.io.*;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

import static org.elasticsearch.node.NodeBuilder.nodeBuilder;


/**
 * Created by malexan on 15/10/2014.
 */
public class Runner {
    private static final Logger log = Logger.getLogger(Runner.class.getName());


    public static void main(String[] args) {

        JettyEmbeddedRunner jetty = new JettyEmbeddedRunner();
//        ESApp es = new ESApp();


//        Node node = nodeBuilder().clusterName("esapp").node();
//        Client client = node.client();
//
//        log.info("es node created");


        ExecutorService executorService = new ThreadPoolExecutor(5,25,1, TimeUnit.MINUTES,new ArrayBlockingQueue<Runnable>(50));

        executorService.submit(new ProcessUrlTask());
//
//                //executorService.execute(new TasksWatchTask(executorService));
//
//                while (!executorService.isTerminated()) {
//                    try {
//                        Thread.sleep(5000);
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
//                log.info("Finished all threads");

        jetty.startServer();

        log.info("after jetty");

 //       node.close();



        //engine.createBindings();
     //   Context cx = Context.enter();
//        try {
//
//
//            Cli cli = new Cli(args);
//            cli.parse();
//
//            if(cli.cmd.hasOption("f")){
//
//                ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");//getEngineByExtension("js");//.
//
//                printMimeTypes();
//
//                Iterator<String> it = engine.getBindings(ScriptContext.GLOBAL_SCOPE).keySet().iterator();
//
//                while (it.hasNext()){
//                    log.info("key: " + it.next());
//                }
//
//
//                Bindings bindings = engine.getBindings( ScriptContext.GLOBAL_SCOPE );
//
//                bindings.put("http",new HttpUtils());
////                bindings.put("exasol",new ExasolUtils());
////                bindings.put("mssql",new MsSqlUtils());
////                bindings.put("runner",new BasicUtils(engine));
////                //   bindings.put("gradle",new utils.GradleUtils());
////                bindings.put("ec2",new AmazonEC2Utils());
////                bindings.put("ssh",new SshUtils());
//                bindings.put("proc",new ProcessUtils());
////                bindings.put("jmx",new JmxUtils());
////                bindings.put("route53",new AmazonRoute53Utils());
////                bindings.put("salt",new SaltStackUtils());
//                bindings.put("es",new ESUtils());
//
//                engine.eval(new FileReader(cli.cmd.getOptionValue("f")));
//
//            }
//            else if(cli.cmd.hasOption("p")){
//                log.info("b4 jetty");
//                JettyEmbeddedRunner jetty = new JettyEmbeddedRunner();
//                int port = Integer.parseInt(cli.cmd.getOptionValue("p"));
//                jetty.startServer(port);
//
//                log.info("after jetty");
//            }
//            else if(cli.cmd.hasOption("w")){
//                ExecutorService executorService = new ThreadPoolExecutor(5,25,1, TimeUnit.MINUTES,new ArrayBlockingQueue<Runnable>(50));
//
//                //executorService.execute(new TasksWatchTask(executorService));
//
//                while (!executorService.isTerminated()) {
//                    try {
//                        Thread.sleep(5000);
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
//                log.info("Finished all threads");
//            }
//
//        } catch (ScriptException e) {
//            e.printStackTrace();
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//        }

    }

    public static void printMimeTypes() {
        ScriptEngineManager manager = new ScriptEngineManager();
        List<ScriptEngineFactory> factories = manager.getEngineFactories();
        for (ScriptEngineFactory factory : factories) {
            List<String> mimeTypes = factory.getNames();
            for (int i = 0; i < mimeTypes.size(); i++) {
                System.out.printf("Supported MIME type " + i + " " + (String) mimeTypes.get(i) + "\n");
            }
        }
    }
}
