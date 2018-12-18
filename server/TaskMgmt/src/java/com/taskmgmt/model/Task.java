package com.taskmgmt.model;

import java.util.Date;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@javax.persistence.Entity
@javax.persistence.Table(name = "task")
@Inheritance(strategy = InheritanceType.JOINED)
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @JoinColumn(name = "id_user", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User user;

    @Basic(optional = false)
    @Column(name = "description")
    private String description;

    @Basic(optional = false)
    @Column(name = "priority")
    private Byte priority;

    @Basic(optional = false)
    @Column(name = "dueDate")
    private Date dueDate;

    @Basic(optional = false)
    @Column(name = "status")
    private Byte status;

    public Task() {

    }

    //For deletes
    public Task(int id) {
        this.id = id;
    }

    //For updates
    public Task(int id, User user, String description, Byte priority, Byte status, Date dueDate) {
        this.id = id;
        this.user = user;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.status = status;
    }

    //For inserts
    public Task(User user, String description, Byte priority, Date dueDate) {
        this.user = user;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.status = 0;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Byte getPriority() {
        return this.priority;
    }

    public void setPriority(Byte priority) {
        this.priority = priority;
    }

    public Date getDueDate() {
        return this.dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Byte getStatus() {
        return this.status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "'task': {" + "id=" + this.id + ", description='" + this.description + "', priority=" + this.priority + ", dueDate='" + this.dueDate + "', status='" + this.status + "', user='" + this.user.getUsername() + "'}";
    }

}
