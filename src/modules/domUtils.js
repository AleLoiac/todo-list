import { formatDate } from "date-fns";
import { createProject, getProjectList, retrieveProject, retrieveTodo } from "./project";

const projectList = document.querySelector(".project-list");
const openProject = document.querySelector(".open-project");

export function handleProject() {
    const title = prompt("Enter project title");
    if (!isValidTitle(title)) {
        return
    }
    
    const project = createProject(title);
    renderProject(project.name);
}

function isValidTitle(title) {
    const projectList = getProjectList();

    for (const project of projectList) {
        if (project.name === title){
            alert("Existing project");
            return false
        }
    }
    if (!title) {
        return false
    } else if (title.trim() === "") {
        alert("Invalid Title");
        return false
    }
    return true
}

export function renderProject(title) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.textContent = title;
    projectList.appendChild(projectDiv);
}

export function selectProject(name) {
    openProject.textContent = "";

    newElement("h1", "", name, openProject);
    newElement("button", "add-todo-btn", "+ Add New Task", openProject);

    const currentProject = retrieveProject(name);
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
    const currentProject = retrieveProject(projectTitle);
    const currentTodo = retrieveTodo(id, currentProject);

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

    const emptyDiv = newElement("div", "buttons", "", tag);
    newElement("button", "edit-task-btn", "Edit", emptyDiv);
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

export function toggle(projectTitle, todoId, target) {
    const currentProject = retrieveProject(projectTitle);
    const todo = retrieveTodo(todoId, currentProject);

    todo.toggleCompletion();
    const completed = todo.completion ? "Completed" : "Not completed";
    const openCompletion = target.closest(".open-completion");
    const p = target.parentElement.querySelector("p");
    openCompletion.removeChild(p);
    newElement("p", "", completed, openCompletion);
}

export function createTodoFromForm(projectTitle) {
    const currentProject = retrieveProject(projectTitle); 
    const todoTitle = document.querySelector("#title");
    const todoDescription = document.querySelector("#description");
    const todoDueDate = document.querySelector("#date");
    const todoPriority = document.querySelector("#priority");

    currentProject.appendTodo(todoTitle.value, todoDescription.value, todoDueDate.value, todoPriority.value);

    todoTitle.value = "";
    todoDescription.value = "";
    todoDueDate.value = "";
    todoPriority.value = "Low";
}

export function renderDialog(projectTitle, todoId) {  
    const currentProject = retrieveProject(projectTitle);
    const todo = retrieveTodo(todoId, currentProject);

    const dialog = document.querySelector("dialog");
    const todoTitle = document.querySelector("#edit-title");
    const todoDescription = document.querySelector("#edit-description");
    const todoDueDate = document.querySelector("#edit-date");
    const todoPriority = document.querySelector("#edit-priority");

    const currentTodoTitle = todo.title;
    const currentTodoDescription = todo.description;
    const currentTodoDate = todo.dueDate;
    const currentTodoPriority = todo.priority;

    todoTitle.value = currentTodoTitle;
    todoDescription.value = currentTodoDescription;
    todoDueDate.value = formatDate(currentTodoDate, "yyyy-MM-dd");
    todoPriority.value = currentTodoPriority;

    todoTitle.dataset.id = todo.id;

    dialog.showModal();
}

export function editTodo(projectTitle) {
    const currentProject = retrieveProject(projectTitle);
    const todoTitle = document.querySelector("#edit-title");
    const todoId = todoTitle.dataset.id;
    const todo = retrieveTodo(todoId, currentProject);

    const titleValue = document.querySelector("#edit-title").value;
    const descriptionValue = document.querySelector("#edit-description").value;
    const dateValue = document.querySelector("#edit-date").value;
    const priorityValue = document.querySelector("#edit-priority").value;

    todo.edit(titleValue, descriptionValue, dateValue, priorityValue);
}