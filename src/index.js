import "./styles.css";
import { createProject } from "./modules/project";
import { addProject, selectProject, handleProject } from "./modules/domUtils";

const defaultProject = createProject("Default project");
addProject(defaultProject.name);

const addProjectBtn = document.querySelector(".add-project-btn");
const projectList = document.querySelector(".project-list");

addProjectBtn.addEventListener("click", handleProject);

projectList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project")) {
        selectProject(e.target.textContent);
    }
})