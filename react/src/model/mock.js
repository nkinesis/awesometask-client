export function select() {
    return [
        { "id_task": 1, "description": "Go to the movies", "priority": 1, "dueDate": "2018-08-11", "id_user": 1 },
        { "id_task": 2, "description": "Study JavaScript", "priority": 1, "dueDate": "2018-08-11", "id_user": 1 },
        { "id_task": 3, "description": "Read a book", "priority": 1, "dueDate": "2018-08-11", "id_user": 1 },
        { "id_task": 4, "description": "Plant a tree", "priority": 1, "dueDate": "2018-08-11", "id_user": 1 },
        { "id_task": 5, "description": "Go to work", "priority": 1, "dueDate": "2018-08-11", "id_user": 1 },
        { "id_task": 6, "description": "Do homework", "priority": 1, "dueDate": "2018-08-11", "id_user": 1 }
    ];
}

export function getFields() {
    return [
        { "name": "Description", "propName": "description", "placeholder": "Your task ...", "type": "text", "min": "140", "max": "140", "maxlength": "140" },
        { "name": "Priority", "propName": "priority", "placeholder": "(1-9)", "type": "number", "min": "1", "max": "9", "maxlength": "1" },
        { "name": "Due Date", "propName": "date", "placeholder": "Task date",  "type": "text", "min": "2001-01-01", "max": "2100-12-31", "maxlength": "100" }
    ];
}
