import React from 'react';
import '../index.css';

export class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            compName: "List"
        }
        this.setSelected = this.setSelected.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    getTasks() {

    }

    setSelected(e) {
        this.props.setSelected(e);
    }

    completeTask(e) {
        this.props.completeTask(e);
    }

    removeTask(e) {
        this.props.removeTask(e);
    }

    render() {
        if (this.props.objList) {
            var liClass = "list-group-item list-group-item-action list-group-item-info";
            var btnOk = <button className="btnOK glyphicon glyphicon-ok"
                title="finish" aria-hidden="true" onClick={fn => this.completeTask(fn)}>
            </button>
            var btnDel = <button className="btnDel glyphicon glyphicon-remove"
                title="delete" aria-hidden="true" onClick={fn => this.removeTask(fn)}>
            </button>
            var items = this.props.objList.map((obj) => {
                return (
                    <a key={obj.id_task} idtask={obj.id_task} className={liClass} 
                    href="#" onClick={fn => this.setSelected(fn)}>
                        {btnOk} {btnDel} {obj.description} on {obj.date}
                    </a>
                );
            });
            return (<div className="list-group">
                {items}
            </div>);
        } else {
            return (
                <div className="list-group">
                    <a className="list-group-item" href="#" >No records to show. Create a task to start!</a>
                </div>
            );
        }
    }
}

export default TaskList;