import { ApplicationModifier } from "interfaces/module.interface";
import { setUserModule } from "./user";
import { setNotebookModule } from "./notebook";
import { Router } from "express";

export const setApplicationModules: ApplicationModifier = (application) => {
  const router = Router();

  setUserModule(router);

  setNotebookModule(router);

  application.use("/api", router);
};
