package com.taskmgmt.view;

import com.taskmgmt.DAO.TaskDAO;
import com.taskmgmt.controller.Utils;
import com.taskmgmt.model.OperationReturn;
import com.taskmgmt.model.Parameters;
import com.taskmgmt.model.Task;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author gabriel
 */
public class TaskController {

    private Task entity;
    
    public TaskController() {
        this.entity = new Task();
    }

    public String select(Parameters p) {
        JSONObject jo = Utils.getData(p);
        String params = Utils.assembleQuery(jo);
        TaskDAO ed = new TaskDAO();
        OperationReturn ret = ed.select(params);
        if (ret.resultSetExists()) {
            JSONArray rs = Utils.marshallTaskList(ret.getResultSet());
            return rs.toString();
        } else {
            return "Select result: " + ret.getMessage();
        }
    }

    public String insert(Parameters p) {
        OperationReturn result;
        try {
            JSONObject jo = Utils.getData(p);
            entity = Utils.assembleTask(jo, "insert");
            TaskDAO ed = new TaskDAO();
            result = ed.insert(entity);
        } catch (JSONException ex) {
            result = new OperationReturn(false, ex);
        }
        return "Insert result: " + result.getMessage();
    }

    public String update(Parameters p) {
        OperationReturn result;
        try {
            JSONObject jo = Utils.getData(p);
            entity = Utils.assembleTask(jo, "update");
            TaskDAO ed = new TaskDAO();
            result = ed.update(entity);
        } catch (JSONException ex) {
            result = new OperationReturn(false, ex);
        }
        return "Update result: " + result.getMessage();
    }

    public String delete(Parameters p) {
        OperationReturn result;
        try {
            JSONObject jo = Utils.getData(p);
            entity = Utils.assembleTask(jo, "delete");
            TaskDAO ed = new TaskDAO();
            result = ed.delete(entity);
        } catch (JSONException ex) {
            result = new OperationReturn(false, ex);
        }
        return "Delete result: " + result.getMessage();
    }
}
