import { createProject } from "./project";

const projectList = document.querySelector(".project-list");

export function addProject(title) {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.textContent = title;
    projectList.appendChild(projectDiv);
}

export function handleProject() {
    const title = prompt("Enter project title");
    if (title === "") {
        alert("Invalid Title");
    }
    if (!title) {
        return
    }
    addProject(title);
    createProject(title);
}