import "./styles.css";
import { createProject } from "./modules/project";
import { addProject, selectProject } from "./modules/domUtils";
import { handleProject } from "./modules/domUtils";

createProject("Default project");
addProject("Default project");

const addProjectBtn = document.querySelector(".add-project-btn");
const projectList = document.querySelector(".project-list");

addProjectBtn.addEventListener("click", handleProject);

projectList.addEventListener("click", (e) => {
    if (e.target.classList.contains("project")) {
        selectProject(e.target.textContent);
    }
})