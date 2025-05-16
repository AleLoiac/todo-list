class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completion = false;
    }
}

export function addTodo(name, description, dueDate, priority) {
    return new ToDo(name, description, dueDate, priority);
}