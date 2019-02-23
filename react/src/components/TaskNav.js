import '../index.css';
import React from 'react';
import TaskFrame from './TaskFrame.js';
import TaskSearch from './TaskSearch.js';
import StatsViewer from './StatsViewer.js';
import UserForm from './UserForm.js';
import AboutViewer from './AboutViewer.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class TaskNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compName: "Navbar",
            menuActive: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(e) {
        var ctx = this;
        var updState = !this.state.menuActive;
        var parent = e.target.parentNode;
        if (parent.className === "container") {
            parent = parent.parentNode;
        }
        if (parent.getAttribute("isburger") === "true") {
            ctx.setState({
                menuActive: updState
            }, function () {
                if (ctx.state.menuActive) {
                    parent.className = "expanded";
                } else {
                    parent.className = "burger";
                }
            });
        }
    }

    render() {
        return (
            <Router >
                <div >
                    <div className="navbar navbar-default">
                        <div id="taskNav" className="burger" isburger="true" onClick={this.toggleMenu}>
                            <div className="container">
                                <div className="bar1"></div>
                                <div className="bar2"></div>
                                <div className="bar3"></div>
                            </div>
                            <ul className="nav navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link nav-title" to="/home">AwesomeTask</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/compose">New Task</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/stats">Statistics</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user">User</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mainRouter">
                        <Route exact path="/" component={TaskSearch} />
                        <Route exact path="/home" component={TaskSearch} />
                        <Route path="/compose" component={TaskFrame} />
                        <Route path="/stats" component={StatsViewer} />
                        <Route path="/user" component={UserForm} />
                        <Route path="/about" component={AboutViewer} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default TaskNav;