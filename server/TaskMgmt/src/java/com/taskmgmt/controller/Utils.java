package com.taskmgmt.controller;

import com.taskmgmt.model.Parameters;
import com.taskmgmt.model.Task;
import com.taskmgmt.model.User;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author gabriel
 */
public class Utils {

    public static Parameters preparaParametros(HttpServletRequest request, String pathapp) throws IOException {
        Parameters parametros = new Parameters();
        Map<String, String[]> a = request.getParameterMap();
        String jsonData = "";
        for (Map.Entry<String, String[]> entry : a.entrySet()) {
            jsonData = new String(entry.getValue()[0].getBytes("iso-8859-1"), "UTF-8");
        }
        JSONObject jsonObj = new JSONObject(jsonData);
        parametros.setParameter("cls", jsonObj.get("cls").toString());
        parametros.setParameter("mtd", jsonObj.get("mtd").toString());
        parametros.setParameter("datalist", jsonObj.get("datalist").toString());
        parametros.setParameter("pathApp", pathapp);
        parametros.setSessao(request.getSession());
        return parametros;
    }

    public static Object executaMetodo(Object classe, String metodo, Object[] parametros) {
        try {
            Class objClasse = classe.getClass();
            Class[] tipoParams = new Class[parametros.length];
            for (int i = 0; i < parametros.length; i++) {
                Object superClasse = parametros[i].getClass().getSuperclass();
                Object nomeSuperClasse = parametros[i].getClass().getSuperclass().getSimpleName();
                if ((superClasse != null && nomeSuperClasse.equals("Tabela")) && !parametros[i].getClass().getSimpleName().equals("Parametros")) {
                    tipoParams[i] = Object.class;
                } else {
                    tipoParams[i] = parametros[i].getClass();
                }
            }
            Method objMetodo;
            try {
                objMetodo = objClasse.getMethod(metodo, tipoParams);
            } catch (NoSuchMethodException | SecurityException ex) {
                objMetodo = objClasse.getSuperclass().getMethod(metodo, tipoParams);
            }
            Object objRetorno = objMetodo.invoke(classe, parametros);
            return objRetorno;
        } catch (IllegalAccessException | IllegalArgumentException | NoSuchMethodException | SecurityException | InvocationTargetException ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }

    public static Date strToDate(String s) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd").parse(s);
        } catch (ParseException ex) {
            System.out.println(ex.getMessage());
        }
        return null;
    }

    public static JSONObject getData(Parameters p) {
        return new JSONObject(p.getParameter("datalist").replace("[{", "{").replace("}]", "}"));
    }

    public static JSONArray marshallTaskList(ArrayList<Task> taskList) {
        JSONArray array = new JSONArray();
        for (Task t : taskList) {
            JSONObject json = new JSONObject();
            json.put("id_task", t.getId());
            json.put("description", t.getDescription());
            json.put("priority", t.getPriority());
            json.put("date", t.getDueDate());
            json.put("id_user", t.getUser().getId());
            json.put("status", t.getStatus());
            array.put(json);
        }

        return array;
    }

    public static JSONArray marshallUserList(ArrayList<User> userList) {
        JSONArray array = new JSONArray();
        for (User u : userList) {
            JSONObject json = new JSONObject();
            json.put("id_user", u.getId());
            json.put("email", u.getEmail());
            json.put("username", u.getUsername());
            json.put("password", u.getPasswd());
            json.put("creationDate", u.getCreationDate().toString().substring(0, 10));
            array.put(json);
        }

        return array;
    }

    public static Task assembleTask(JSONObject json, String mtd) throws JSONException {
        String f_id, f_usr, f_dcs, f_pri, f_st, f_dt;
        User usrObj;

        switch (mtd) {
            case "delete":
                f_id = String.valueOf(fromJSON(json, "id_task"));
                return new Task(Integer.parseInt(f_id));
            case "update":
                f_id = String.valueOf(fromJSON(json, "id_task"));
                f_usr = String.valueOf(fromJSON(json, "id_user"));
                f_dcs = String.valueOf(fromJSON(json, "description"));
                f_pri = String.valueOf(fromJSON(json, "priority"));
                f_dt = String.valueOf(fromJSON(json, "date"));
                f_st = String.valueOf(fromJSON(json, "status"));
                usrObj = new User(Integer.parseInt(f_usr));
                return new Task(Integer.parseInt(f_id), usrObj, f_dcs, Byte.parseByte(f_pri), Byte.parseByte(f_st), Utils.strToDate(f_dt));
            case "insert":
                f_usr = String.valueOf(fromJSON(json, "id_user"));
                f_dcs = String.valueOf(fromJSON(json, "description"));
                f_pri = String.valueOf(fromJSON(json, "priority"));
                f_dt = String.valueOf(fromJSON(json, "date"));
                usrObj = new User(Integer.parseInt(f_usr));
                return new Task(usrObj, f_dcs, Byte.parseByte(f_pri), Utils.strToDate(f_dt));
            default:
                return null;
        }
    }

    public static User assembleUser(JSONObject json, String mtd) throws JSONException {
        String f_id, f_unm, f_pwd, f_eml, f_cdt;

        switch (mtd) {
            case "delete":
                f_id = String.valueOf(fromJSON(json, "id_user"));
                return new User(Integer.parseInt(f_id));
            case "update":
                f_id = String.valueOf(fromJSON(json, "id_user"));
                f_unm = String.valueOf(fromJSON(json, "username"));
                f_pwd = String.valueOf(fromJSON(json, "password"));
                f_eml = String.valueOf(fromJSON(json, "email"));
                f_cdt = String.valueOf(fromJSON(json, "creationDate"));
                return new User(Integer.parseInt(f_id), f_eml, f_unm, f_pwd, Utils.strToDate(f_cdt));
            case "insert":
                f_unm = String.valueOf(fromJSON(json, "username"));
                f_pwd = String.valueOf(fromJSON(json, "password"));
                f_eml = String.valueOf(fromJSON(json, "email"));
                f_cdt = String.valueOf(fromJSON(json, "creationDate"));
                return new User(f_eml, f_unm, f_pwd, Utils.strToDate(f_cdt));
            default:
                return null;
        }
    }

    public static String assembleQuery(JSONObject json) {
        try {
            int l = Integer.parseInt(String.valueOf(fromJSON(json, "limit")));
            String where = !isPropNull(json, "condition") ? "where " + fromJSON(json, "condition") : "where id > 0";
            String order = !isPropNull(json, "orderby") ? "order by " + fromJSON(json, "orderby") : "";
            String limit = (l < 100) ? ("limit " + l) : "limit 100";

            if (order.length() > 0) {
                return where + "\n" + order + "\n" + limit;
            } else {
                return where + "\n";
            }

        } catch (JSONException ex) {
            return "where id > 0, limit 100";
        }
    }

    public static String getMockPwd(User u) {
        if (u == null || u.getPasswd() == null) {
            return "*";
        } else {
            int lt = u.getPasswd().length();
            String mock = "";
            for (int i = 0; i < lt; i++) {
                mock += "*";
            }
            return mock;
        }
    }

    public static String fromJSON(JSONObject json, String key) {
        return json.get(key).toString();
    }

    public static boolean isNull(String s) {
        return (s == null || s.trim().length() == 0);
    }

    public static boolean isPropNull(JSONObject json, String key) {
        try {
            return (fromJSON(json, key) == null || fromJSON(json, key).trim().length() == 0);
        } catch (JSONException ex) {
            return false;
        }
    }

}
