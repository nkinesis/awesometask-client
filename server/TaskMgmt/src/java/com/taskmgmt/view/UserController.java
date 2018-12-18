package com.taskmgmt.view;

import com.taskmgmt.DAO.UserDAO;
import com.taskmgmt.controller.Utils;
import com.taskmgmt.model.Parameters;
import com.taskmgmt.model.User;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.taskmgmt.model.OperationReturn;

/**
 *
 * @author gabriel
 */
public class UserController {

    private User entity;

    public UserController() {
        this.entity = new User();
    }

    public String select(Parameters p) {
        JSONObject jo = Utils.getData(p);
        String params = Utils.assembleQuery(jo);
        UserDAO ed = new UserDAO();
        OperationReturn ret = ed.select(params);
        if (ret.resultSetExists()) {
            JSONArray rs = Utils.marshallUserList(ret.getResultSet());
            return rs.toString();
        } else {
            return "Select result: " + ret.getMessage();
        }
    }

    public String insert(Parameters p) {
        OperationReturn result;
        try {
            JSONObject jo = Utils.getData(p);
            entity = Utils.assembleUser(jo, "insert");
            UserDAO ed = new UserDAO();
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
            entity = Utils.assembleUser(jo, "update");
            UserDAO ed = new UserDAO();
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
            entity = Utils.assembleUser(jo, "delete");
            UserDAO ed = new UserDAO();
            result = ed.delete(entity);
        } catch (JSONException ex) {
            result = new OperationReturn(false, ex);
        }
        return "Delete result: " + result.getMessage();
    }
}
