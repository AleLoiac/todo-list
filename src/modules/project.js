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

    getTodoList() {
        return this.list;
    }

    removeTodo(todoId) {
        const index = this.list.findIndex(todo => todo.id === todoId);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }
}

export function createProject(name) {
    const newProject = new Project(name);
    projectList.push(newProject);

    return newProject;
}

export function getProjectList() {
    return [...projectList];
}