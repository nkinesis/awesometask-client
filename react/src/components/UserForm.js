import React from 'react';
import '../index.css';
import { Database } from '../model/database.js';
import { Select } from '../model/select.js';

export class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            compName: "User",
            objForm: null
        }
        this.getUser = this.getUser.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    getUser() {
        var db = new Database();
        var ctx = this;
        var params = new Select("id = 1", 1, "");
        db.select("User", params).then(function (response) {
            ctx.setState({
                objForm: response.data[0]
            });
        });
    }

    submitForm(){
        var context = this;
        var db = new Database();
        if (this.checkPassword()) {
          db.submit("User", this.state.objForm)
            .then(function (response) {
              console.log(response);
              window.alert("User data saved!");
              context.getUser();
            })
            .catch(function (error) {
              console.log(error);
              context.getUser();
            });
        } else {
          window.alert("The password MUST have:\n" +
            "- At least 6 characters\n" +
            "- Upper case and lower case characters\n");
        }
    }

    formChange(e) {
        var updObj = this.state.objForm;
        if (e.target.id === "username") {
            updObj.username = e.target.value;
        } else if (e.target.id === "pwd") {
            updObj.password = e.target.value;
        }
        this.setState({
            objForm: updObj
        });
    }

    testConnection(){
        var db = new Database();
        db.testConnection();
    }

    checkPassword() {
        var pwd = this.state.objForm.password;
        var regexp = new RegExp('(?=.*[a-z])(?=.*[A-Z])');
        var conditions = regexp.test(pwd);
        return pwd.length >= 6 && conditions;
      }

    componentDidMount() {
        this.getUser();
    }

    render() {
        if (this.state.objForm) {
            return (
                <div className="mainWrapper">
                    <div className="form-group">
                        <label>Email</label>
                        <input id="email" className="form-control"
                            type="text" readOnly defaultValue={this.state.objForm.email}></input>

                        <label>Creation Date</label>
                        <input id="cDate" className="form-control"
                            type="date" readOnly defaultValue={this.state.objForm.creationDate}></input>

                        <label>Username</label>
                        <input id="username" className="form-control"
                            type="text" onChange={e => this.formChange(e)}
                            value={this.state.objForm.username}></input>

                        <label>Password</label>
                        <input id="pwd" className="form-control"
                            type="password" onChange={e => this.formChange(e)}
                            value={this.state.objForm.password}></input>
                    </div>
                    <button className="btn btn-primary" onClick={this.submitForm}>Submit</button>
                    <button className="btn btn-primary" onClick={this.testConnection}>Test Connection</button>
                </div>
            );
        } else {
            return <div className="mainWrapper">Loading...</div>
        }
    }
}

export default UserForm;