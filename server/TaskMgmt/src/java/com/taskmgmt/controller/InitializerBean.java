package com.taskmgmt.controller;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import org.hibernate.Session;

/**
 *
 * @author gabriel
 */
@Singleton
@Startup
public class InitializerBean {

   @PostConstruct
   public void onStartup() {
       //Hibernate connection must be created on startup
       Session s = Controller.getSession();
       System.out.println("Server started. Session: " + s.getStatistics().getClass().toString());  
   }

}