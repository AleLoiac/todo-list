import "./styles.css";
import { createProject, deleteTodo } from "./modules/project";
import { renderProject, selectProject, handleProject, selectTodo, toggle, createTodoFromForm, renderDialog } from "./modules/domUtils";

const defaultProject = createProject("Default project");
renderProject(defaultProject.name);
defaultProject.appendTodo("Sweep floor", "Sweep all house", "15-07-2025", "Low");
defaultProject.appendTodo("Run", "Run for 4 miles", "17-07-2025", "Medium");
defaultProject.appendTodo("Groceries", "Buy groceries for the next week", "14-06-2025", "High");
selectProject(defaultProject.name);

const addProjectBtn = document.querySelector(".add-project-btn");
const projectList = document.querySelector(".project-list");
const openProject = document.querySelector(".open-project");
const addTodoBtn = document.querySelector(".confirm-task-btn");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector(".close-modal-btn");

addProjectBtn.addEventListener("click", handleProject);

projectList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project")) {
        selectProject(e.target.textContent);
    }
})

openProject.addEventListener("click", (e) => {
    const todoElement = e.target.closest(".todo, .open-todo");
    const projectTitle = document.querySelector(".open-project > h1");
    const title = projectTitle.textContent;

    if (e.target.closest(".toggle-btn")) {
        const id = todoElement.dataset.id;
        toggle(title, id);
    } else if (e.target.closest(".delete-task-btn")) {
        const id = todoElement.dataset.id;
        deleteTodo(title, id);
        selectProject(title);
    } else if (e.target.closest(".edit-task-btn")){
        const id = todoElement.dataset.id;
        renderDialog(title, id);
    } else if (todoElement && openProject.contains(todoElement)) {
        const id = todoElement.dataset.id;
        selectTodo(title, id);
    } else if (e.target.closest(".add-todo-btn")) {
        const banner = document.querySelector(".new-todo-banner");
        if (banner.style.display === 'none') {
		    banner.style.display = 'block';
	    } else {
	    	banner.style.display = 'none';
	    }
    }
})

addTodoBtn.addEventListener("click", (e) => {
    const form = document.querySelector(".new-todo-form");
    if (!form.checkValidity()) {
		return;
	}
    e.preventDefault();

    const projectTitle = document.querySelector(".open-project > h1");
    const title = projectTitle.textContent;
    createTodoFromForm(title);
    selectProject(title);
})

closeDialogBtn.addEventListener("click", () => {
    dialog.close();
})