import React from 'react';
import { Database } from '../model/database.js';
import { Select } from '../model/select.js';
import { TaskList } from './TaskList.js';
import { TaskForm } from './TaskForm.js';
import { Task } from '../model/task.js';
import { Utils } from '../model/utils.js';
import '../index.css';

export class TaskFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            compName: "Main",
            objList: null,
            objSelected: null,
        }
        this.getTasks = this.getTasks.bind(this);
    }

    getTasks(callback) {
        var db = new Database();
        var ctx = this;
        var params = new Select("status = 0", 10, "dueDate desc");
        db.select("Task", params).then(function (response) {
            ctx.setState({
                objList: [response],
                objSelected: null
            });
            if (callback) {
                callback();
            }
        });
    }

    setSelected(e) {
        var id = e.target.getAttribute("idtask");
        for (var task of this.state.objList[0].data) {
          if (task.id_task === Number.parseInt(id)) {
            this.setState({ objSelected: task });
            break;
          }
        }
    }

    completeTask(e) {
        var selId = e.target.parentNode.getAttribute("idtask");
        if (selId) {
          var db = new Database();
          var ctx = this;
          var updObj;
          for (var task of this.state.objList[0].data) {
            if (task.id_task === Number.parseInt(selId)) {
              updObj = task;
              break;
            }
          }
          if (updObj) {
            updObj.status = "1";
            db.update("Task", updObj).then(
              function (response) {
                console.log(response);
                ctx.getTasks();
              }
            );
          }
        }
    }

    removeTask(e) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            var selId = e.target.parentNode.getAttribute("idtask");
            if (selId) {
                var db = new Database();
                var delObj = new Task("", 1, 1, "", selId);
                var ctx = this;
                db.delete("Task", delObj).then(
                    function (response) {
                        console.log(response);
                        ctx.getTasks();
                    }
                );
            }
        }
    }

    submitForm(obj) {
        var db = new Database();
        var ctx = this;
        db.submit("Task", obj).then(
          function reponseAction(response) {
            console.log(response);
            ctx.getTasks();
          }
        );
    }

    clearForm() {
        var u = new Utils();
        var updObj = new Task("", 1, 1, u.getDate());
        this.setState({
            objSelected: updObj
        });
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        var clsBox = "mainWrapper";
        if (this.state.objList) {
            return <div className={clsBox}>
                <TaskForm
                    submitForm={fn => this.submitForm(fn)}
                    clearForm={fn => this.clearForm(fn)}
                    changeForm={fn => this.changeForm(fn)}
                    objSelected={this.state.objSelected}
                >
                </TaskForm>
                <TaskList
                    objList={this.state.objList[0].data}
                    setSelected={fn => this.setSelected(fn)}
                    removeTask={fn => this.removeTask(fn)}
                    completeTask={fn => this.completeTask(fn)}
                ></TaskList>
            </div>
        } else {
            return <div className={clsBox}>
                <TaskForm
                    submitForm={fn => this.submitForm(fn)}
                    clearForm={fn => this.clearForm(fn)}
                    changeForm={fn => this.changeForm(fn)}
                >
                </TaskForm>
            </div>
        }
    }
}

export default TaskFrame;