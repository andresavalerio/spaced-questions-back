"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notebook_repository_1 = require("./notebook.repository");
describe("NotebookRepository", () => {
    let repository;
    beforeEach(() => {
        repository = new notebook_repository_1.NotebookRepository();
    });
    it("should be defined", () => {
        expect(repository).toBeDefined();
    });
});
