import { Utils } from './utils';
import { Wrapper } from './wrapper';
import { Select } from './select';
import { Task } from './task';

export class Database {

    select(context, params?) {
        if (!params) {
            let cond = "id > 0";
            params = new Select(cond, 10);
        }
        return this.sendRequest(context.name + "Controller", "select", params);
    }

    submit(context) {
        let result;
        if (context.selectedEntity) {
            result = this.sendRequest(context.name + "Controller", "update", context.entity);
        } else {
            result = this.sendRequest(context.name + "Controller", "insert", context.entity);
        }
        return result;
    }

    update(context, entity) {
        let sEntity = entity ? entity : context.entity;
        return this.sendRequest("TaskController", "update", sEntity);
    }

    delete(context, entity) {
        let c = confirm("Are you sure you want to delete?\nThis action cannot be undone.");
        if (c) {
            let idParam = "id_" + context.name.toLowerCase();
            let params = {
                [idParam]: entity[idParam]
            };
            console.log(params);
            return this.sendRequest(context.name + "Controller", "delete", params);
        } else {
            return null;
        }
    }

    sendRequest(cls, mtd, json) {
        let wrapper = new Wrapper(cls, mtd, []);
        wrapper.datalist.push(json);
        let axios = require('axios');
        return axios.get('http://localhost:8080/TaskMgmt/Controller?data=' + encodeURIComponent(JSON.stringify(wrapper)));
    }

    mockSelect() {
        let list = [
            new Task("Do work", 1, 1, "20180101", 1, 0),
            new Task("Test app", 1, 1, "20190822", 2, 0),
            new Task("Code TypeScript", 1, 1, "20190111", 3, 0),
        ]
        return list;
    }

    testConnection() {
        let result = this.sendRequest("TestController", "ping", {});
        result.then(function (response) {
            alert(response.data);
        })
            .catch(function (error) {
                alert(error);
            });
    }
}