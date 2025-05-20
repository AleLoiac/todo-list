import { formatDate } from "date-fns";
import { createTodo } from "./todo";

const projectList = [];

class Project {
    constructor(name) {
        this.name = name;
        this.list = [];
    }

    appendTodo(title, description, dueDate, priority) {
        const todo = createTodo(title, description, formatDate(new Date(dueDate), "PP"), priority);
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

export function retrieveProject(title) {
    const projects = getProjectList();
    let currentProject;

    for (const project of projects) {
        if (project.name === title) {
            currentProject = project;
        }
    }
    return currentProject;
}

export function retrieveTodo(id, currentProject) {
    const todoList = currentProject.getTodoList();

    let currentTodo;
    for (const todo of todoList) {
        if (todo.id === id) {
            currentTodo = todo;
        }
    }
    return currentTodo;
}

export function deleteTodo(projectTitle, todoId) {
    const currentProject = retrieveProject(projectTitle);
    currentProject.removeTodo(todoId);
}