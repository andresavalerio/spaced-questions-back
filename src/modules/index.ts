import { ApplicationModifier } from "interfaces/module.interface";
import { setUserModule } from "./user";

export const setApplicationModules: ApplicationModifier = (application) => {
  setUserModule(application);
};
