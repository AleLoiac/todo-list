class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.id = crypto.randomUUID();
        this.description = description || "";
        this.dueDate = dueDate;
        this.priority = priority || "low";
        this.completion = false;
    }

    toggleCompletion() {
        this.completion = !this.completion;
    }
}

export function createTodo(title, description, dueDate, priority) {
    if (!title) {
        return
    }
    return new ToDo(title, description, dueDate, priority);
}