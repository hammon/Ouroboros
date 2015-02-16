package core;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.cli.BasicParser;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;

public class Cli {
    private static final Logger log = Logger.getLogger(Cli.class.getName());
    private String[] args = null;
    private Options options = new Options();
    public CommandLine cmd = null;

    public Cli(String[] args) {

        this.args = args;

        options.addOption("h", "help", false, "show help.");
        options.addOption("f", "file", true, "js file to execute");
        options.addOption("p","port",true,"jetty port");
        options.addOption("w","worker",false,"run worker");

    }

    public void parse() {
        CommandLineParser parser = new BasicParser();


        try {
            cmd = parser.parse(options, args);

            if (cmd.hasOption("h"))
                help();

            if (cmd.hasOption("f")) {
               // log.log(Level.INFO, "Using cli argument -f=" + cmd.getOptionValue("f"));
                // Whatever you want to do with the setting goes here
            } else {
                //log.log(Level.SEVERE, "Missing f option");
                //help();
            }

        } catch (ParseException e) {
            log.log(Level.SEVERE, "Failed to parse command line properties", e);
            help();
        }
    }

    private void help() {
        // This prints out some help
        HelpFormatter formater = new HelpFormatter();

        formater.printHelp("Main", options);
        System.exit(0);
    }
}
