package com.taskmgmt.model;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;

/**
 *
 * @author gabriel
 */
public class Parameters {

    private HashMap<String, String> parametros;
    private HttpSession sessao;

    public Parameters() {
        this.parametros = new HashMap<>();
    }

    public String getParameter(String parametro) {
        return parametros.get(parametro);
    }

    public String getParameter(int parametro) {
        int i = 0;
        for (Map.Entry<String, String> entry : this.parametros.entrySet()) {
            if (i == parametro) {
                return entry.getValue();
            }
            i++;
        }
        return null;
    }

    public HashMap<String, String> getParameterMap() {
        return this.parametros;
    }

    public void setParameter(String parametro, String valor) {
        this.parametros.put(parametro, valor);
    }

    public int length() {
        return this.parametros.size();
    }

    public void setSessao(HttpSession session) {
        sessao = session;
    }

    public HttpSession getSessao() {
        return sessao;
    }
}
