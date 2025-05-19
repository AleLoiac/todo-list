import "./styles.css";
import { createProject } from "./modules/project";
import { addProject, selectProject, handleProject, selectTodo, deleteTodo, toggle } from "./modules/domUtils";

const defaultProject = createProject("Default project");
addProject(defaultProject.name);
defaultProject.appendTodo("Sweep floor", "Sweep all the house", "15/07/2025", "Low");
defaultProject.appendTodo("Run", "Run for 4 miles", "17/07/2025", "Mid");
defaultProject.appendTodo("Groceries", "Buy groceries for the next week", "14/06/2025", "High");
selectProject(defaultProject.name);

const addProjectBtn = document.querySelector(".add-project-btn");
const projectList = document.querySelector(".project-list");
const openProject = document.querySelector(".open-project");

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
    } else if (todoElement && openProject.contains(todoElement)) {
        const id = todoElement.dataset.id;
        selectTodo(title, id);
    }
})