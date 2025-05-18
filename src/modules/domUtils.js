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
    
    addProject(title);
    createProject(title);
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
    openProject.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = name;
    openProject.appendChild(h1);

    const addButton = document.createElement("button");
    addButton.textContent = "+ Add New Task";
    addButton.classList.add("add-todo-btn");
    openProject.appendChild(addButton);
}