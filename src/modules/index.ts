import { ApplicationModifier } from "interfaces/module.interface";
import { setUserModule } from "./user";
import { Router } from "express";

export const setApplicationModules: ApplicationModifier = (application) => {
  const router = Router();

  setUserModule(router);

  application.use("/api", router);
};
