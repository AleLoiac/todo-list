import { formatDate } from "date-fns";
import { getProjectList } from "./project";

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.description = description || "";
        this.dueDate = formatDate(new Date(dueDate), "PP");
        this.priority = priority || "low";
        this.completion = false;
    }

    toggleCompletion() {
        this.completion = !this.completion;
        localStorage.setItem("projects", JSON.stringify(getProjectList()));
    }

    edit(title, description, dueDate, priority) {
        this.title = title;
        this.description = description || "";
        this.dueDate = formatDate(new Date(dueDate), "PP");
        this.priority = priority || "low";
        localStorage.setItem("projects", JSON.stringify(getProjectList()));
    }
}

export function createTodo(title, description, dueDate, priority) {
    if (!title) {
        return
    }
    return new ToDo(title, description, formatDate(new Date(dueDate), "PP"), priority);
}