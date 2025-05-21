import { formatDate } from "date-fns";
import { createProject, getProjectList } from "./project";
import { createTodo } from "./todo";

export function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(getProjectList()));
}

export function loadProjects() {
    const rawList = JSON.parse(localStorage.getItem("projects"));
    if (!rawList) {
        return
    }
    const hydratedList = [];
    for (const project of rawList) {
        const projectInstance = createProject(project.name);

        for (const todo of project.list) {
            const todoInstance = createTodo(todo.title, todo.description, formatDate(new Date(todo.dueDate), "PP"), todo.priority);
            todoInstance.completion = todo.completion;
            todoInstance.id = todo.id;
            projectInstance.list.push(todoInstance);
            saveProjects();
        }
        hydratedList.push(projectInstance);
    }
    return hydratedList
}