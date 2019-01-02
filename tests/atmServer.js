/*
Awesome Task Manager - Node Mock Server
Install VS code throug CLI to avoid console bug: https://code.visualstudio.com/docs/setup/linux
*/

var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
    });
    var message = JSON.parse(url.parse(decodeURIComponent(req.url), true).query.data);
    var params = message.datalist[0];
    var response = lookup.call(message.cls, message.mtd, params);
    res.end(JSON.stringify(response));
}).listen(8080);

var utils = (function () {
    function isIterable(obj) {
        // checks for null and undefined
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    };
    function getYear() {
        let today = new Date();
        return today.getFullYear();
    };

    function getDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = "0" + dd
        }

        if (mm < 10) {
            mm = "0" + mm
        }

        return yyyy + '-' + mm + '-' + dd;
    };
    return {
        getYear: getYear,
        getDate: getDate,
        isIterable: isIterable
    };
})();

var storage = (function () {
    var today =  utils.getDate();
    var taskStore = [
        { id_task: 1, id_user: 1, description: "Do work", priority: 1, date: today, status: "0" },
        { id_task: 2, id_user: 1, description: "Test app", priority: 5, date: today, status: "0" },
        { id_task: 3, id_user: 1, description: "Code TypeScript", priority: 3, date: today, status: "0" }
    ]
    var userStore = [
        { id_user: 1, email: "ullmanng162@gmail.com", username: "root", password: "root2A", creationDate: "2018-04-01" }
    ];

    function create(cls, data) {
        var store = taskStore;
        if (cls === "UserController") {
            store = userStore;
        }
        if (utils.isIterable(data)) {
            for (let obj of data) {
                store.push(obj);
            }
        } else {
            store.push(data);
        }

    };
    function read(cls, data) {
        //TODO: search using conditions, limit output, order output
        //[ { condition: 'status = 0', limit: 10, orderby: 'dueDate desc' } ]
        if (cls === "UserController") {
            return userStore;
        } else {
            return taskStore;
        }
    };
    function update(cls, updObj) {
        var store = taskStore;
        var key = "id_task";
        if (cls === "UserController") {
            store = userStore;
            key = "id_user";
        }
        var lt = store.length;
        for (let i = 0; i < lt; i++) {
            if (updObj[key] === store[i][key]) {
                store[i] = updObj;
                break;
            }
        }
        return "Update status: true";
    };
    function del(cls, delObj) {
        var store = taskStore;
        var key = "id_task";
        if (cls === "UserController") {
            store = userStore;
            key = "id_user";
        }
        var lt = store.length;

        for (let i = 0; i < lt; i++) {
            if (delObj[key] == store[i][key]) {
                store.splice(i, 1);
                break;
            }
        }
        return "Delete status: true";
    };
    function ping() {
        return "Server is online! Current time: " + new Date();
    };
    return {
        insert: create,
        select: read,
        update: update,
        del: del,
        ping: ping
    }
})();

var lookup = (function () {
    function call(cls, mtd, params) {
        if (cls === "TestController") {
            switch (mtd) {
                case "ping":
                    return storage.ping();
                default:
                    return "Function " + mtd + " not found.";
            }
        } else if (cls === "TaskController" || cls === "UserController") {
            switch (mtd) {
                case "select":
                    return storage.select(cls, params);
                case "insert":
                    return storage.insert(cls, params);
                case "update":
                    return storage.update(cls, params);
                case "delete":
                    return storage.del(cls, params);
                default:
                    return "Function " + mtd + " not found.";
            }
        } else {
            return "Function " + cls + "." + mtd + " not found.";
        }
    }
    return {
        call: call
    }
})();

