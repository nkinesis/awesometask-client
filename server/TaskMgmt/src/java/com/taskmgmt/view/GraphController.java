package com.taskmgmt.view;

import com.taskmgmt.DAO.TaskDAO;
import com.taskmgmt.controller.Utils;
import com.taskmgmt.model.Parameters;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author gabriel
 */
public class GraphController {

    public String getPriorityIndexGraph(Parameters p) {
        JSONObject filters = Utils.getData(p);
        TaskDAO ed = new TaskDAO();
        ArrayList<Object[]> resultSet = (ArrayList<Object[]>) ed.executeQuery("select id, description, priority, dif, (dif*priority) as ind from\n"
                + "(SELECT id, description, priority, DATEDIFF(dueDate, CURDATE()) as dif\n"
                + "from task\n"
                + "where dueDate between '" + filters.get("startingDate") + "' and DATE_ADD('" + filters.get("startingDate") + "', INTERVAL 7 DAY)\n"
                + "and status = 0) as base\n"
                + "where dif > 0\n"
                + "order by ind asc, priority asc, dif asc\n"
                + "limit 50");
        JSONArray arr = new JSONArray();
        for (Object[] result : resultSet) {
            JSONObject jo = new JSONObject();
            jo.put("id_task", String.valueOf(result[0]));
            jo.put("description", String.valueOf(result[1]));
            jo.put("priority", String.valueOf(result[2]));
            jo.put("deadline", String.valueOf(result[3]));
            jo.put("index", String.valueOf(result[4]));
            arr.put(jo);
        }
        return arr.toString();
    }

    public String getOverdueGraph(Parameters p) {
        TaskDAO ed = new TaskDAO();
        ArrayList<Object[]> resultSet = (ArrayList<Object[]>) ed.executeQuery("select id, description, priority, dueDate, ABS(DATEDIFF(dueDate, CURDATE())) as dif from task\n"
                + "where DATEDIFF(dueDate, CURDATE()) < 0 and status = 0\n"
                + "order by dif desc, priority asc, dueDate desc\n"
                + "limit 100");
        JSONArray arr = new JSONArray();
        for (Object[] result : resultSet) {
            JSONObject jo = new JSONObject();
            jo.put("id_task", String.valueOf(result[0]));
            jo.put("description", String.valueOf(result[1]));
            jo.put("priority", String.valueOf(result[2]));
            jo.put("deadline", String.valueOf(result[3]));
            jo.put("overdue", String.valueOf(result[4]));
            arr.put(jo);
        }
        return arr.toString();

    }

    public String getPriorityAvgGraph(Parameters p) {
        JSONObject filters = Utils.getData(p);
        TaskDAO ed = new TaskDAO();
        ArrayList<Object[]> resultSet = (ArrayList<Object[]>) ed.executeQuery("select dueDate, avg(priority) as avgprio\n"
                + "from task\n"
                + "where dueDate between '" + filters.get("startingDate") + "' and DATE_ADD('" + filters.get("startingDate") + "', INTERVAL 7 DAY)\n"
                + "group by dueDate");
        JSONArray arr = new JSONArray();
        for (Object[] result : resultSet) {
            JSONObject jo = new JSONObject();
            jo.put("dueDate", String.valueOf(result[0]));
            jo.put("avgprio", String.valueOf(result[1]));
            arr.put(jo);
        }
        return arr.toString();
    }
}
