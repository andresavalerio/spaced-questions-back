"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notebook_controller_1 = require("./notebook.controller");
class FakeNotebookService {
    createNotebook(notebook) {
        return "new-id";
    }
}
describe("NotebookController", () => {
    let repository;
    beforeEach(() => {
        repository = new notebook_controller_1.NotebookController(new FakeNotebookService());
    });
    it("should be defined", () => {
        expect(repository).toBeDefined();
    });
});
