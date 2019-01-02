package com.taskmgmt.controller;

import com.taskmgmt.model.Parameters;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Session;

/**
 *
 * @author gabriel
 *
 */
public class Controller extends HttpServlet {

    private static Session session = null;

    static {
        System.out.println("Creating Controller...");
        session = HibernateUtil.getSessionFactory().openSession();
    }

    public static Session getSession() {
        if (session == null || !session.isOpen()) {
            return HibernateUtil.getSessionFactory().openSession();
        } else {
            return session;
        }
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param parametros servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "null");
        response.setContentType("text/html;charset=UTF-8");
        Parameters params = Utils.preparaParametros(request, getServletContext().getRealPath("/"));
        processaRequest(params, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        System.out.println(request.getRequestURI());
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Awesome Task Manager";
    }// </editor-fold>

    protected void processaRequest(Parameters parametros, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder retorno = new StringBuilder();
        try (PrintWriter out = response.getWriter()) {
            try {
                String cls = parametros.getParameter("cls");
                String mtd = parametros.getParameter("mtd");
                if (cls != null && mtd != null && !cls.trim().equals("") && !mtd.trim().equals("")) {
                    Class tipoParametros[] = new Class[1];
                    tipoParametros[0] = Parameters.class;
                    Class classe = Class.forName("com.taskmgmt.view." + cls);
                    Method metodo = classe.getMethod(mtd, tipoParametros);
                    Object params[] = new Object[1];
                    params[0] = parametros;
                    Constructor constructClasse = classe.getConstructor();
                    Object objClasse = constructClasse.newInstance();
                    Object retMetodo = metodo.invoke(objClasse, params);
                    retorno.append((String) retMetodo);
                } else {
                    retorno.append("erro:Classe ou método inválido!");
                }
            } catch (ClassNotFoundException | IllegalAccessException | IllegalArgumentException | InstantiationException
                    | NoSuchMethodException | SecurityException | InvocationTargetException ex) {
                retorno.append("erro:").append(ex.getMessage());
            }
            out.println(retorno.toString());
        }

    }
}
