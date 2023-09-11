"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotebookService = exports.NotebookService = void 0;
const notebook_errors_1 = require("../../errors/notebook.errors");
const uuid_1 = require("uuid");
const notebook_repository_1 = require("../../repositories/notebook/notebook.repository");
class NotebookService {
    constructor(repository) {
        this.repository = repository;
    }
    createNotebook(notebook) {
        if (notebook.title.length === 0) {
            throw new notebook_errors_1.NotebookWithoutTitleError();
        }
        if (notebook.username.length === 0) {
            throw new notebook_errors_1.NotebookWithoutUsernameError();
        }
        const id = (0, uuid_1.v4)();
        const success = this.repository.insertNotebook(Object.assign(Object.assign({}, notebook), { id }));
        if (!success)
            throw new notebook_errors_1.NotebookInsertError();
        return id;
    }
}
exports.NotebookService = NotebookService;
const createNotebookService = () => {
    const repository = new notebook_repository_1.NotebookRepository();
    return new NotebookService(repository);
};
exports.createNotebookService = createNotebookService;
