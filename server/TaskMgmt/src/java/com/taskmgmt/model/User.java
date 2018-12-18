package com.taskmgmt.model;

import com.taskmgmt.controller.Utils;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import org.hibernate.annotations.DynamicUpdate;

@javax.persistence.Entity
@javax.persistence.Table(name = "user")
@Inheritance(strategy = InheritanceType.JOINED)
@DynamicUpdate
public class User implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @Column(name = "username")
    private String username;

    @Basic(optional = false)
    @Column(name = "passwd")
    private String passwd;

    @Basic(optional = false)
    @Column(name = "creationDate")
    private Date creationDate;

    @Basic(optional = false)
    @Column(name = "email")
    private String email;

    private Set tasks = new HashSet(0);

    public User() {
    }

    //For deletes
    public User(int id) {
        this.id = id;
    }

    //For inserts
    public User(String email, String username, String passwd, Date creationDate) {
        this.email = email;
        this.username = username;
        this.passwd = passwd;
        this.creationDate = creationDate;
    }

    //For updates
    public User(int id, String email, String username, String passwd, Date creationDate) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.passwd = passwd;
        this.creationDate = creationDate;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswd() {
        return this.passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public Date getCreationDate() {
        return this.creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Set getTasks() {
        return this.tasks;
    }

    public void setTasks(Set tasks) {
        this.tasks = tasks;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "'user': {" + "id=" + this.id + ", username='" + this.username + "', passwd=" + Utils.getMockPwd(this) + ", email='" + this.email + ", creationDate='" + this.creationDate + "'}";
    }

}
