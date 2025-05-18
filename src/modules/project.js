import { addTodo } from "./todo";

const projectList = [];

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

export function createProject(name) {
    const newProject = new Project(name);
    projectList.push(newProject);

    return newProject;
}