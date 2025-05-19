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
    const list = newElement("div", "todo-list", "", openProject);

    for (const todo of todoList) {
        renderTodo(todo, list);
    }
}

function renderTodo(todo, parent) {
    const newTodo = newElement("div", "todo", "", parent);
    newTodo.dataset.id = todo.id;
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

export function selectTodo(projectTitle, id) {
    const projectList = getProjectList();
    let currentProject;

    for (const project of projectList) {
        if (project.name === projectTitle) {
            currentProject = project;
        }
    }
    const todoList = currentProject.getTodoList();

    let currentTodo;
    for (const todo of todoList) {
        if (todo.id === id) {
            currentTodo = todo;
        }
    }

    if (!currentTodo) return;

    const currentTodoTag = document.querySelector(`.todo[data-id="${currentTodo.id}"]`);
    const currentOpenTodoTag = document.querySelector(`.open-todo[data-id="${currentTodo.id}"]`);

    if (currentTodoTag) {
        currentTodoTag.classList.toggle("open-todo");
        currentTodoTag.classList.toggle("todo");

        renderOpenTodo(currentTodoTag, currentTodo);
    } else {
        currentOpenTodoTag.classList.toggle("open-todo");
        currentOpenTodoTag.classList.toggle("todo");

        renderClosedTodo(currentOpenTodoTag, currentTodo);
    }
    
}

function renderOpenTodo(tag, todo) {
    tag.textContent = "";

    const completed = todo.completion ? "Completed" : "Not completed";

    const emptyDiv = newElement("div", "", "", tag);
    newElement("button", "delete-task-btn", "⨯", emptyDiv);
    const openPair = newElement("div", "open-pair", "", tag);
    newElement("p", "open-title", todo.title, openPair);
    newElement("p", "", todo.dueDate, openPair);
    newElement("p", "open-description", todo.description, tag);
    const openPriority = newElement("div", "open-priority", "", tag);
    newElement("p", "", "Priority:", openPriority);
    newElement("p", "", todo.priority, openPriority);
    const openCompletion = newElement("div", "open-completion", "", tag);
    newElement("button", "toggle-btn", "Toggle", openCompletion);
    newElement("p", "", completed, openCompletion);
}

function renderClosedTodo(tag, todo) {
    tag.textContent = "";

    newElement("p", "", todo.title, tag);
    newElement("p", "", todo.dueDate, tag);
}