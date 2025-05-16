class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description || "";
        this.dueDate = dueDate;
        this.priority = priority || "low";
        this.completion = false;
    }

    toggleCompletion() {
        this.completion = !this.completion;
    }

    changePriority(value) {
        this.priority = value;
    }
}

export function addTodo(title, description, dueDate, priority) {
    if (!title) {
        return
    }
    return new ToDo(title, description, dueDate, priority);
}