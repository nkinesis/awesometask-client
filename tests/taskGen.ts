import { Database } from "../database";
import { Task } from "../task";

export class TaskGen {

    db: Database;
    tasklist: Task[];

    verbs: string[];
    places: string[];
    actions: string[];
    things: string[];
    know: string[];
    enter: string[];
    single: string[];

    constructor() {
        this.db = new Database();
        this.verbs = ["Go", "Do", "Buy", "Study", "Watch"];
        this.single = ["Sleep", "Read", "Work"];
        this.places = ["movies", "park", "mall", "party", "friend's house", "work", "airport", "home", "for a walk", "university"];
        this.actions = ["housework", "homework", "things", "work", "exercises", "dishes", "laundry", "a favor to a friend"];
        this.things = ["groceries", "food", "supplies", "xmas decorations", "stuff", "water bottle", "bread", "beans", "chocolate", "candy"];
        this.know = ["Biology", "JavaScript", "Math", "History", "Geography", "Angular2", "Algorithms", "English", "Portuguese", "articles"];
        this.enter = ["movie", "documentary", "TV", "YouTube videos", "classes", "soccer game", "hockey game", "TV series", "baseball game", "gameplays"]
        this.tasklist = [];
    }

    putZero(value) {
        if (value > 0 && value < 10) {
            return "0" + value;
        } else {
            return value;
        }
    }

    generate() {
        let count = 0;
        console.log("sf");
        while (count < 200) {
            var t = new Task("", 1, 1);
            var r = Math.floor((Math.random() * 100));
            var prio = Math.floor((Math.random() * 10));
            var day = Math.floor((Math.random() * 28));
            var month = Math.floor((Math.random() * 12));

            t.priority = prio;
            t.date = "2019-" + this.putZero(month) + "-" + this.putZero(day);
            if (r >= 0 && r < 20) {
                t.description = this.verbs[0] + " to " + this.places[prio];
            } else if (r >= 20 && r < 40) {
                t.description = this.verbs[1] + " " + this.actions[prio];
            } else if (r >= 40 && r < 60) {
                t.description = this.verbs[2] + " " + this.things[prio];
            } else if (r >= 60 && r < 80) {
                t.description = this.verbs[3] + " " + this.know[prio];
            } else {
                t.description = this.verbs[4] + " " + this.enter[prio];
            }
            this.tasklist.push(t);
            count++;
        }
        console.log(this.tasklist);
    }

    populate(pos) {
        var context = this;
        if (pos < this.tasklist.length) {
            this.db.sendRequest("TaskController", "insert", this.tasklist[pos])
                .then(function (response) {
                    pos++;
                    context.populate(pos);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }


}