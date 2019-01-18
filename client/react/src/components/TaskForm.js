import '../index.css';
import React from 'react';
import { getFields } from '../model/mock.js';
import { Task } from '../model/task.js';

export class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            compName: "Form",
            objForm: new Task(),
            clear: false
        }
        this.clearForm = this.clearForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.formChange = this.formChange.bind(this);
    }

    formChange(e) {
        var updObj = this.state.objForm;
        if (e.target.id === "desc") {
            updObj.description = e.target.value;
        } else if (e.target.id === "prio") {
            updObj.priority = e.target.value;
        } else if (e.target.id === "date") {
            updObj.date = e.target.value;
        }
        this.setState({
            objForm: updObj
        });
    }

    submitForm() {
        var ctx = this;
        this.clearForm();
        ctx.props.submitForm(ctx.state.objForm);
    }

    clearForm() {
        this.setState({
            clear: true
        });
        this.props.clearForm();
    }

    createFields() {
        var fieldList = getFields();
        return fieldList.map((fields) => {
            var fieldGroup = <div key={fields.name} className="form-group">
                <label>{fields.name}</label>
                <input id={fields.name} className="form-control"
                type={fields.type}
                onBlur={fn => this.blurField(fn)}
                defaultValue={this.state.objForm[fields.propName]}
                placeholder={fields.placeholder}
                max={fields.max} min={fields.min} maxLength={fields.maxlength}></input>
            </div>;
            return (fieldGroup);
        });
    }

    setSelectedTask() {
        var updObj;
        var selectedTask = this.props.objSelected;

        if (this.state.clear) {
            updObj = new Task("", 1);
            this.setState({
                clear: false,
                objForm: updObj
            });
        } else {
            if (selectedTask && selectedTask.id_task > 0
                && selectedTask.id_task !== this.state.objForm.id_task) {
                updObj = new Task(selectedTask.description,
                    selectedTask.priority,
                    selectedTask.id_user,
                    selectedTask.date,
                    selectedTask.id_task,
                    selectedTask.status);
                this.setState({
                    selectedObj: selectedTask,
                    objForm: updObj,
                }, );
            }
        }
    }

    render() {
        this.setSelectedTask();
        return (<div>
            <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input id="desc" className="form-control"
                    type="text" onChange={e => this.formChange(e)}
                    value={this.state.objForm.description}
                    placeholder="Your task..." maxLength="140"
                ></input>

                <label htmlFor="prio">Priority</label>
                <input id="prio" className="form-control"
                    type="number" onChange={e => this.formChange(e)}
                    value={this.state.objForm.priority}
                    max="9" min="1" placeholder="Priority from 1 to 9"
                ></input>

                <label htmlFor="date">Due Date</label>
                <input id="date" className="form-control"
                    type="date" onChange={e => this.formChange(e)}
                    value={this.state.objForm.date}
                    max="2099-12-31" min="2001-01-01"
                ></input>
            </div>
            <button className="btn btn-primary" onClick={this.submitForm}>Submit</button>
            <button className="btn btn-primary" onClick={this.clearForm}>Clear</button>
        </div>);
    }
}

export default TaskForm;