"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotebookRepository = void 0;
class NotebookRepository {
    constructor() {
        this.notebooks = [];
    }
    insertNotebook(notebook) {
        if (!notebook.id)
            return false;
        this.notebooks.push(notebook);
        return true;
    }
}
exports.NotebookRepository = NotebookRepository;
