import { ApplicationModifier } from "interfaces/module.interface";
import { setUserModule } from "./user";
import { setNotebookModule } from "./notebook";

export const setApplicationModules: ApplicationModifier = (application) => {
  setUserModule(application);

  setNotebookModule(application);
};
