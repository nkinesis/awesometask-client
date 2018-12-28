import React from 'react';
import { Database } from '../model/database.js';
import { Select } from '../model/select.js';
import { TaskList } from './TaskList.js';
import { Task } from '../model/task.js';
import { Utils } from '../model/utils.js';
import '../index.css';

export class TaskSearch extends React.Component {
    constructor(props) {
        super(props);
        var u = new Utils();
        this.state = {
            compName: "Search",
            objList: null,
            sDate: u.getDate(),
            sName: "",
            sFinish: false

        }
        this.getTasks = this.getTasks.bind(this);
        this.formChange = this.formChange.bind(this);
        this.formKeyPress = this.formKeyPress.bind(this);
    }

    getTasks(where) {
        var db = new Database();
        var ctx = this;
        var params = new Select(where, 10, "dueDate desc");
        db.select("Task", params).then(function (response) {
            ctx.setState({
                objList: [response]
            });
        });
    }

    buildWhere() {
        var where = "dueDate = '" + this.state.sDate + "' ";
        if (this.state.sFinish) {
            where += "and status >= 0 ";
        } else {
            where += "and status = 0 ";
        }
        if (this.state.sName.trim().length > 0) {
            where += "and description like '%" + this.state.sName + "%'";
        }
        return where;
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
            if (updObj && updObj.status === 0) {
                updObj.status = "1";
                db.update("Task", updObj).then(
                    function (response) {
                        console.log(response);
                        ctx.getTasks();
                    }
                );
            } else {
                window.alert("This task has already been finished.")
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
                        ctx.getTasks(ctx.buildWhere());
                    }
                );
            }
        }
    }

    setSelected(){
        //Nothing to do
    }

    formChange(e) {
        var ctx = this;
        if (e.target.id === "sDate") {
            this.setState({ sDate: e.target.value });
        } else if (e.target.id === "sName") {
            this.setState({ sName: e.target.value });
        } else if (e.target.id === "sFinish") {
            this.setState({ sFinish: e.target.checked }, function(){
                ctx.getTasks(ctx.buildWhere());
            });
        }
    }

    formKeyPress(e) {
        if (e.key === "Enter") {
            if (e.target.id === "sDate" && e.target.value.length === 10) {
                document.querySelector("#sName").focus();
            } else if (e.target.id === "sName") {
                document.querySelector("#sFinish").focus();
            } else if (e.target.id === "sFinish") {
                document.querySelector("#sDate").focus();
            }
            this.getTasks(this.buildWhere());
        }
    }

    componentDidMount() {
        var u = new Utils();
        var status = "and status = 0 ";
        if (this.state.sFinish) {
            status = "and status >= 0 ";
        }
        this.getTasks("dueDate = '" + u.getDate() + "' " + status);
    }

    render() {
        if (this.state.objList) {
            return <div className="mainWrapper">
                <div className="form-group">
                    <label>Search By Date</label>
                    <input autoFocus id="sDate" className="form-control"
                        type="date" onChange={this.formChange}
                        onKeyPress={this.formKeyPress}
                        value={this.state.sDate}
                        max="2099-12-31" min="2001-01-01"
                    ></input>
                    <label>Search By Description</label>
                    <input id="sName" className="form-control"
                        type="text" onChange={this.formChange}
                        onKeyPress={this.formKeyPress}
                        value={this.state.sName}
                        maxLength="20"
                    ></input>
                    <div className="form-group form-check">
                        <input id="sFinish" className="form-check-input"
                            type="checkbox" onChange={this.formChange}
                            onKeyPress={this.formKeyPress}></input>
                        <label className="form-check-label">Show finished</label>
                    </div>
                </div>
                <TaskList
                    objList={this.state.objList[0].data}
                    setSelected={fn => this.setSelected(fn)}
                    removeTask={fn => this.removeTask(fn)}
                    completeTask={fn => this.completeTask(fn)}
                ></TaskList>
            </div>
        } else {
            return <div className="mainWrapper">
                Loading...
        </div>
        }

    }
}

export default TaskSearch;