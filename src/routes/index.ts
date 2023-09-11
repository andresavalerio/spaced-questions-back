import { Router, type Express } from "express";

import { createNotebookRouter } from "./notebook/notebook.controller";

export const setApplicationRoutes = (application: Express) => {
  const router = Router();

  router.use("/notebook", createNotebookRouter());

  application.use("/api", router);
};
