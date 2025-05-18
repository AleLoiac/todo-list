import "./styles.css";
import { createProject } from "./modules/project";
import { addProject } from "./modules/domUtils";
import { handleProject } from "./modules/domUtils";

createProject("Default project");
addProject("Default project");

const addProjectBtn = document.querySelector(".add-project-btn");

addProjectBtn.addEventListener("click", handleProject);