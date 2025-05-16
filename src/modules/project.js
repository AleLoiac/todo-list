import { addTodo } from "./todo";

class Project {
    constructor(name) {
        this.name = name;
        this.list = [];
    }

    appendTodo(title, description, dueDate, priority) {
        const todo = addTodo(title, description, dueDate, priority);
        this.list.push(todo);
    }
}

export function addProject(name) {
    return new Project(name);
}