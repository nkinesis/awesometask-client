import axios from 'axios';
import { Task } from './task.js';
import { Wrapper } from './wrapper.js';
import { Select } from './select.js';


export class Database {
    
    select(storeName, params) {
        if (!params) {
            var cond = "id > 0";
            params = new Select(cond, 10);
        }
        return this.sendRequest(storeName + "Controller", "select", params);
    }

    submit(storeName, entity) {
        var result;
        if (entity["id_" + storeName.toLowerCase()]) {
            result = this.sendRequest(storeName + "Controller", "update", entity);
        } else {
            result = this.sendRequest(storeName + "Controller", "insert", entity);
        }
        return result;
    }

    update(storeName, entity) {
        if (entity) {
            return this.sendRequest(storeName + "Controller", "update", entity);
        }
    }

    delete(storeName, entity) {
        //var c = confirm("Are you sure you want to delete?\nThis action cannot be undone.");
        var c = true;
        if (c) {
            var idParam = "id_" + storeName.toLowerCase();
            var params = {
                [idParam]: entity[idParam]
            };
            return this.sendRequest(storeName + "Controller", "delete", params);
        } else {
            return null;
        }
    }

    sendRequest(cls, mtd, json) {
        var wrapper = new Wrapper(cls, mtd, []);
        wrapper.datalist.push(json);
        //var axios = require('axios');
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