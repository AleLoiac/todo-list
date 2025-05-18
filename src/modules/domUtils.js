import { createProject, getProjectList } from "./project";

const projectList = document.querySelector(".project-list");
const openProject = document.querySelector(".open-project");

export function addProject(title) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.textContent = title;
    projectList.appendChild(projectDiv);
}

export function handleProject() {
    const title = prompt("Enter project title");
    if (!isValidTitle(title)) {
        return
    }
    
    const project = createProject(title);
    addProject(project.name);
}

function isValidTitle(title) {
    const projectNames = [];
    const projectList = getProjectList();
    for (const project of projectList) {
        projectNames.push(project.name);
    }
    if (projectNames.includes(title)) {
        alert("Project already exists");
        return
    } else if (title === "") {
        alert("Invalid Title");
    }
    if (!title) {
        return
    }
    return true
}

export function selectProject(name) {
    openProject.textContent = "";

    newElement("h1", "", name, openProject)
    newElement("button", "add-todo-btn", "+ Add New Task", openProject);

    const projectList = getProjectList();
    let currentProject;

    for (const project of projectList) {
        if (project.name === name) {
            currentProject = project;
        }
    }
    const todoList = currentProject.getTodoList();

    for (const todo of todoList) {
        renderTodo(todo);
    }
}

function renderTodo(todo) {
    const todoList = newElement("div", "todo-list", "", openProject)
    const newTodo = newElement("div", "todo", "", todoList);
    newElement("p", "", todo.title, newTodo);
    newElement("p", "", todo.dueDate, newTodo);
}

function newElement(tag, className, textContent, parent) {
	const element = document.createElement(tag);
	if (className) element.classList.add(className);
	if (textContent) element.textContent = textContent;
	parent.appendChild(element);
    return element
}