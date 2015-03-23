package tasks;

import utils.ESUtils;

import java.util.logging.Logger;

/**
 * Created by michael on 3/23/15.
 */
public abstract class TaskBase implements Runnable{
    protected ESUtils _es = new ESUtils();

    private static final Logger log = Logger.getLogger(TaskBase.class.getName());
}
