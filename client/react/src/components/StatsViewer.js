import React from 'react';
import '../index.css';
import { Database } from '../model/database';
import { Utils } from '../model/utils';

export class StatsViewer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            compName: "Stats",
            listTabIndex: [],
            listTabOverdue: []
        }
        this.fetchIndexTable = this.fetchIndexTable.bind(this);
        this.fetchOverdueTable = this.fetchOverdueTable.bind(this);
        this.createIndexTable = this.createIndexTable.bind(this);
        this.createOverdueTable = this.createOverdueTable.bind(this);
    }

    validateArray(arr){
        return arr && (arr.length > 0) && arr[0] && (Object.keys(arr[0]).length > 0);
    }

    createEmptyRow(){
        return <tr className="list-group">
            <td>No records to show.</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    }

    fetchIndexTable() {
        var context = this;
        var list = [];
        var u = new Utils();
        var db = new Database();
        var filter = { "startingDate": u.getDate() };
        var r = db.sendRequest("GraphController", "getPriorityIndexGraph", filter);
        r.then(function (response) {
            for (var json of response.data) {
                list.push(json);
            }
            context.setState({
                listTabIndex: list
            });
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchOverdueTable() {
        var context = this;
        var list = [];
        var u = new Utils();
        var db = new Database();
        var filter = { "startingDate": u.getDate() };
        var r = db.sendRequest("GraphController", "getOverdueGraph", filter);
        r.then(function (response) {
            for (var json of response.data) {
                list.push(json);
            }
            context.setState({
                listTabOverdue: list
            });
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    createIndexTable() {
        var header = <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Days to deadline</th>
            <th>Priority Index</th>
        </tr>;
        var rows = this.createEmptyRow();
        if (this.validateArray(this.state.listTabIndex)) {
            rows = this.state.listTabIndex.map((val) => {
                return <tr key={val.id_task}>
                    <td>{val.id_task}</td>
                    <td>{val.description}</td>
                    <td>{val.priority}</td>
                    <td>{val.deadline}</td>
                    <td>{val.index}</td>
                </tr>
            });
        }


        return (<div><h2>Tasks by Priority Index (next 7 days)</h2>
            <div className="tableWrapper">
                <table className="table table-responsive table-condensed">
                    <thead>
                        {header}
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div></div>);
    }

    createOverdueTable() {
        var header = <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Days overdue</th>
        </tr>;
        var rows = this.createEmptyRow();
        if (this.validateArray(this.state.listTabOverdue)) {
            rows = this.state.listTabOverdue.map((val) => {
                return <tr key={val.id_task}>
                    <td>{val.id_task}</td>
                    <td>{val.description}</td>
                    <td>{val.priority}</td>
                    <td>{val.deadline}</td>
                    <td>{val.overdue}</td>
                </tr>
            });
        }
        return (<div><h2>Tasks Overdue (last 100 tasks)</h2>
            <div className="tableWrapper">
                <table className="table table-responsive table-condensed">
                    <thead>
                        {header}
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div></div>);
    }

    componentDidMount() {
        this.fetchIndexTable();
        this.fetchOverdueTable();
    }

    render() {
        if (this.state.listTabIndex && this.state.listTabOverdue) {
            var tb1 = this.createIndexTable();
            var tb2 = this.createOverdueTable();
            return <div className="mainWrapper">
                {tb1}
                {tb2}
            </div>
        } else {
            return <div className="mainWrapper">Loading...</div>
        }
    }
}

export default StatsViewer;