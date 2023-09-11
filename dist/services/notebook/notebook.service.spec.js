"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeNotebookRepository = void 0;
const notebook_service_1 = require("./notebook.service");
class FakeNotebookRepository {
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
exports.FakeNotebookRepository = FakeNotebookRepository;
describe("NotebookService", () => {
    let service;
    beforeEach(() => {
        service = new notebook_service_1.NotebookService(new FakeNotebookRepository());
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
    it("should insert notebook", () => {
        const notebook = {
            notes: "lorem ipsum",
            title: "novo caderno",
            username: "pimpim",
        };
        const id = service.createNotebook(notebook);
        expect(id).not.toBeNull();
    });
    it("should not insert notebook with errors", () => {
        const notebookWithoutUsername = {
            notes: "lorem ipsum",
            title: "novo caderno",
            username: "",
        };
        const notebookWithoutTitle = {
            notes: "lorem ipsum",
            title: "",
            username: "pimpim",
        };
        expect(() => {
            service.createNotebook(notebookWithoutTitle);
        }).toThrow(Error);
        expect(() => {
            service.createNotebook(notebookWithoutUsername);
        }).toThrow(Error);
    });
});
