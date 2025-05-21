import "./styles.css";
import { createProject, deleteTodo } from "./modules/project";
import { renderProject, selectProject, handleProject, selectTodo, toggle, createTodoFromForm, renderDialog, editTodo } from "./modules/domUtils";
import { loadProjects } from "./modules/storage";

const storage = loadProjects();

if (!storage) {
    const defaultProject = createProject("Default project");
    renderProject(defaultProject.name);
    defaultProject.appendTodo("Learn Guitar", "Practice chords and learn a new song", new Date(Date.now() + 24*60*60*1000), "Medium");
    defaultProject.appendTodo("Game Night", "Play board games with friends", new Date(Date.now() + 48*60*60*1000), "Low");
    defaultProject.appendTodo("Try New Recipe", "Cook a Thai curry from scratch", new Date(Date.now() + 72*60*60*1000), "High");
    selectProject(defaultProject.name);
} else {
    for (const project of storage) {
        renderProject(project.name);
    }
    selectProject(storage[0].name);
}

const addProjectBtn = document.querySelector(".add-project-btn");
const projectList = document.querySelector(".project-list");
const openProject = document.querySelector(".open-project");
const addTodoBtn = document.querySelector(".confirm-task-btn");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector(".close-modal-btn");
const confirmEditBtn = document.querySelector(".confirm-edit-btn");

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
        const target = e.target;
        toggle(title, id, target);
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

confirmEditBtn.addEventListener("click", (e) => {
    const form = document.querySelector("dialog > form");
    if (!form.checkValidity()) {
		return;
	}
    e.preventDefault();

    const projectTitle = document.querySelector(".open-project > h1");
    const title = projectTitle.textContent;
    editTodo(title);
    selectProject(title);
    dialog.close();
})