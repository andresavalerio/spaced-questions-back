"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setApplicationRoutes = void 0;
const express_1 = require("express");
const notebook_controller_1 = require("./notebook/notebook.controller");
const setApplicationRoutes = (application) => {
    const router = (0, express_1.Router)();
    router.use("/notebook", (0, notebook_controller_1.createNotebookRouter)());
    application.use("/api", router);
};
exports.setApplicationRoutes = setApplicationRoutes;
