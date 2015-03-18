package core;

import org.eclipse.jetty.server.*;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.util.resource.Resource;
import web.CharGramServlet;
import web.FilesServlet;
import web.GetTextServlet;
import web.NGramServlet;


public class JettyEmbeddedRunner {

    public static void main(String[] args) {
        JettyEmbeddedRunner jetty = new JettyEmbeddedRunner();

        jetty.startServer();

    }

    int _port = 8080;

    public void startServer(int port){
        _port = port;
        startServer();
    }

//    class AuthResourceHandler extends ResourceHandler{
//        @Override
//        public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
//            String authHeader = request.getHeader("Authorization");
//
//            if (authHeader != null ) {
////                String[] up = parseBasic(authHeader.substring(authHeader.indexOf(" ") + 1));
////                String username = up[0];
////                String password = up[1];
////                if (authenticateUser(username, password)) {
////                    super.handle(target, baseRequest, request, response);
////                    return;
////                }
//            }
//
////            response.setHeader("WWW-Authenticate", "BASIC realm=\"SecureFiles\"");
////            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Please provide username and password");
//            super.handle(target, baseRequest, request, response);
//        }
//    }

    public void startServer() {
        try {
            Server server = new Server();

            //server.setAttribute("rootPath","/home/michael/dev/Ouroboros/data");

            ServerConnector connector = new ServerConnector(server);
            connector.setPort(_port);

            server.setConnectors(new Connector[] { connector });

            ContextHandler context0 = new ContextHandler();
            context0.setContextPath("/");



            //context0.setAttribute("rootPath","/home/michael/dev/Ouroboros/data");

            ResourceHandler rh0 = new ResourceHandler();
            rh0.setBaseResource(Resource.newResource(JettyEmbeddedRunner.class.getClassLoader().getResource("webStatic")));

            context0.setHandler(rh0);



            ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);



            //context.setAttribute("rootPath", "/home/michael/dev/Ouroboros/data");
            context.setAttribute("rootPath", "/home/michael");

            ServletHolder servletHolder = new ServletHolder(FilesServlet.class);
            context.addServlet(servletHolder, "/api/files");

            ServletHolder ngramHolder = new ServletHolder(NGramServlet.class);
            context.addServlet(ngramHolder, "/api/ngram");

            ServletHolder charGramHolder = new ServletHolder(CharGramServlet.class);
            context.addServlet(charGramHolder, "/api/chargram");

            ServletHolder getTextHolder = new ServletHolder(GetTextServlet.class);
            context.addServlet(getTextHolder, "/api/text");
//
//            ServletHolder ec2InstancesHolder = new ServletHolder(Ec2InstancesServlet.class);
//            handler.addServlet(ec2InstancesHolder, "/ec2/instances");
//
//            ServletHolder ec2InstanceHolder = new ServletHolder(Ec2InstanceServlet.class);
//            handler.addServlet(ec2InstanceHolder, "/ec2/instance");
//
//            ServletHolder propsHolder = new ServletHolder(PropertiesSerlvet.class);
//            handler.addServlet(propsHolder, "/props");
//
//            ServletHolder ec2servletHolder = new ServletHolder(DatePrintServlet.class);
//            handler.addServlet(ec2servletHolder, "/app");


//            context.addServlet(new ServletHolder(new DefaultServlet() {
//                @Override
//                protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//                    response.setCharacterEncoding("UTF-8");
//                    response.setContentType("text/html");
//
//                    response.getWriter().append("<form method='POST' action='/j_security_check'>"
//                            + "<input type='text' name='j_username'/>"
//                            + "<input type='password' name='j_password'/>"
//                            + "<input type='submit' value='Login'/></form>");
//                }
//            }), "/login");


    //////////////***********************//////////////////////

//            Constraint constraint = new Constraint();
//            constraint.setName(Constraint.__FORM_AUTH);
//            constraint.setRoles(new String[]{"user","admin","moderator"});
//            constraint.setAuthenticate(true);
//
//            ConstraintMapping constraintMapping = new ConstraintMapping();
//            constraintMapping.setConstraint(constraint);
//            constraintMapping.setPathSpec("/*");
//
//            ConstraintSecurityHandler securityHandler = new ConstraintSecurityHandler();
//            securityHandler.addConstraintMapping(constraintMapping);
//
//            HashLoginService loginService = new HashLoginService();
//            loginService.putUser("username", new Password("password"), new String[] {"user"});
//            securityHandler.setLoginService(loginService);
//
//            FormAuthenticator authenticator = new FormAuthenticator("/login.html", "/login.html", false);
//
//            securityHandler.setAuthenticator(authenticator);
//
//            context.setSecurityHandler(securityHandler);




            ContextHandlerCollection contexts = new ContextHandlerCollection();

            contexts.setHandlers(new Handler[] { context0,context });
            server.setHandler(contexts);

            System.err.println(server.dump());

            server.start();
            server.join();

//         //
//            Server server = new Server();
//            ServerConnector c = new ServerConnector(server);
//            c.setIdleTimeout(1000);
//            c.setAcceptQueueSize(10);
//            c.setPort(8080);
//            c.setHost("localhost");
//
//
//
//            ContextHandler context0 = new ContextHandler();
//            context0.setContextPath("/");
//            ResourceHandler rh0 = new ResourceHandler();
//            rh0.setBaseResource(Resource.newResource(JettyEmbeddedRunner.class.getClassLoader().getResource("web")));
//            context0.setHandler(rh0);
//
//            ContextHandlerCollection contexts = new ContextHandlerCollection();
//            contexts.setHandlers(new Handler[] { context0 });
//            server.setHandler(contexts);
//
////            String webDir = JettyEmbeddedRunner.class.getClassLoader().getResource("web").toExternalForm();
////            log.info(ln("webDir: " + webDir);
////            ServletContextHandler context = new ServletContextHandler(server,"/", true, false);
////           // context.setContextPath("/");
////            context.setResourceBase(webDir);
////             //... just for testing
////            context.setWelcomeFiles(new String[]{ "index.html" });
//
//
//
//
//            ServletContextHandler handler = new ServletContextHandler(server,"/app", true, false);
//            ServletHolder servletHolder = new ServletHolder(DatePrintServlet.class);
//            handler.addServlet(servletHolder, "/date");
//
//            server.addConnector(c);
//            server.start();
//            server.join();
//         //   log.info(ln("after server.start();");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}