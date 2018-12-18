package com.taskmgmt.DAO;

import com.taskmgmt.controller.Controller;
import com.taskmgmt.controller.HibernateUtil;
import com.taskmgmt.model.OperationReturn;
import com.taskmgmt.model.Task;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

/**
 *
 * @author gabriel
 *
 */
public class TaskDAO {

    public OperationReturn select(String params) {
        Session session = Controller.getSession();
        ArrayList<Task> resultSet = new ArrayList<>();
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery("from Task " + params);
            resultSet = (ArrayList<Task>) q.list();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(false, resultSet);
    }

    public OperationReturn insert(Task t) {
        try {
            Session session = Controller.getSession();
            session.beginTransaction();
            session.save(t);
            session.getTransaction().commit();
        } catch (HibernateException ex) {
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(true);
    }

    public OperationReturn update(Task t) {
        try {
            Session session = Controller.getSession();
            session.beginTransaction();
            session.update(t);
            session.getTransaction().commit();
        } catch (HibernateException ex) {
            System.out.println(ex.getMessage());
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(true);
    }

    public OperationReturn delete(Task t) {
        try {
            Session session = Controller.getSession();
            session.beginTransaction();
            session.delete(t);
            session.getTransaction().commit();
        } catch (HibernateException ex) {
            System.out.println(ex.getMessage());
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(true);
    }

    public List executeQuery(String query) {
        Session session = Controller.getSession();
        List resultSet = new ArrayList<>();
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createSQLQuery(query);
            resultSet = q.list();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return resultSet;
        } finally {
            HibernateUtil.shutdown();
        }
        return resultSet;
    }

}
