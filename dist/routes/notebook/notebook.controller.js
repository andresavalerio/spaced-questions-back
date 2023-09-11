"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotebookRouter = exports.NotebookController = void 0;
const express_1 = require("express");
const notebook_service_1 = require("../../services/notebook/notebook.service");
class NotebookController {
    constructor(service) {
        this.service = service;
    }
    createNotebook(req, res) {
        const data = req.body;
        if (!data.username)
            return res.status(400).json({ msg: "dados incorretos" });
        try {
            const id = this.service.createNotebook(data);
            res.status(200).json({ msg: "Criado com sucesso com o id de " + id, id });
        }
        catch (error) {
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }
}
exports.NotebookController = NotebookController;
const createNotebookRouter = () => {
    const service = (0, notebook_service_1.createNotebookService)();
    const controller = new NotebookController(service);
    const router = (0, express_1.Router)();
    router.post("/", (req, res) => {
        controller.createNotebook(req, res);
    });
    return router;
};
exports.createNotebookRouter = createNotebookRouter;
