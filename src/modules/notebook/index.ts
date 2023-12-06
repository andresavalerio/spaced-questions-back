import { RouterModifier } from "interfaces/module.interface";
import { NotebookController } from "./controllers/notebook.controller";
import { NotebookService } from "./services/notebook.service";
import { NotebookRepository } from "./repositories/notebook.repository";
import { INotebookService } from "./notebook.interfaces";

const createNotebookController = (): NotebookController => {
  const notebookRepository = new NotebookRepository();

  const notebookService: INotebookService = new NotebookService(
    notebookRepository
  );

  const notebookController = new NotebookController(notebookService);

  return notebookController;
};

export const setNotebookModule: RouterModifier = (application) => {
  const notebookController = createNotebookController();

  const notebookRoute = notebookController.getRouter();

  application.use("/notebooks", notebookRoute);
};
