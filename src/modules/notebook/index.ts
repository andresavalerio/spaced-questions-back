import { ApplicationModifier } from "interfaces/module.interface";
import { NotebookController } from "./controllers/notebook.controller";
import { NotebookService } from "./services/notebook.service";
import { NotebookRepository } from "./repositories/notebook.repository";

const createNotebookController = (): NotebookController => {
  const notebookRepository = new NotebookRepository();

  const notebookService = new NotebookService(notebookRepository);

  const notebookController = new NotebookController(notebookService);

  return notebookController;
};

export const setNotebookModule: ApplicationModifier = (application) => {
  const notebookController = createNotebookController();

  const notebookRoute = notebookController.getRouter();

  application.use("/notebooks", notebookRoute);
};
