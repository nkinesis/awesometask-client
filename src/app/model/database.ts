import { Utils } from './utils';
import { Wrapper } from './wrapper';
import { Select } from './select';
import { Task } from './task';

export class Database {

    select(context, params?) {
        if (!params) {
            var cond = "id > 0";
            params = new Select(cond, 10);
        }
        return this.sendRequest(context.name + "Controller", "select", params);
    }

    submit(context) {
        var result;
        if (context.selectedEntity) {
            result = this.sendRequest(context.name + "Controller", "update", context.entity);
        } else {
            result = this.sendRequest(context.name + "Controller", "insert", context.entity);
        }
        return result;
    }

    update(context, entity) {
        var sEntity = entity ? entity : context.entity;
        return this.sendRequest("TaskController", "update", sEntity);
    }

    delete(context, entity) {
        var c = confirm("Are you sure you want to delete?\nThis action cannot be undone.");
        if (c) {
            var idParam = "id_" + context.name.toLowerCase();
            var params = {
                [idParam]: entity[idParam]
            };
            console.log(params);
            return this.sendRequest(context.name + "Controller", "delete", params);
        } else {
            return null;
        }
    }

    sendRequest(cls, mtd, json) {
        var wrapper = new Wrapper(cls, mtd, []);
        wrapper.datalist.push(json);
        var axios = require('axios');
        return axios.get('http://localhost:8080/TaskMgmt/Controller?data=' + encodeURIComponent(JSON.stringify(wrapper)));
    }

    mockSelect() {
        var list = [
            new Task("Do work", 1, 1, "20180101", 1, 0),
            new Task("Test app", 1, 1, "20190822", 2, 0),
            new Task("Code TypeScript", 1, 1, "20190111", 3, 0),
        ]
        return list;
    }

    testConnection() {
        var result = this.sendRequest("TestController", "ping", {});
        result.then(function (response) {
            alert(response.data);
        })
            .catch(function (error) {
                alert(error);
            });
    }
}