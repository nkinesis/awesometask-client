package com.taskmgmt.DAO;

import com.taskmgmt.controller.Controller;
import com.taskmgmt.controller.HibernateUtil;
import com.taskmgmt.model.OperationReturn;
import com.taskmgmt.model.User;
import java.util.ArrayList;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;

/**
 *
 * @author gabriel
 *
 */
public class UserDAO {

    public OperationReturn select(String params) {
        Session session = Controller.getSession();
        ArrayList<User> resultSet = new ArrayList<>();
        try {
            org.hibernate.Transaction tx = session.beginTransaction();
            Query q = session.createQuery("from User " + params);
            resultSet = (ArrayList<User>) q.list();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(false, resultSet);
    }

    public OperationReturn insert(User e) {
        try {
            Session session = Controller.getSession();
            session.beginTransaction();
            session.save(e);
            session.getTransaction().commit();
        } catch (HibernateException ex) {
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(true);
    }

    public OperationReturn update(User e) {
        try {
            Session session = Controller.getSession();
            session.beginTransaction();
            session.update(e);
            session.getTransaction().commit();
        } catch (HibernateException ex) {
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(true);
    }

    public OperationReturn delete(User e) {
        try {
            Session session = Controller.getSession();
            session.beginTransaction();
            session.delete(e);
            session.getTransaction().commit();
        } catch (HibernateException ex) {
            return new OperationReturn(false, ex);
        } finally {
            HibernateUtil.shutdown();
        }
        return new OperationReturn(true);
    }

}
