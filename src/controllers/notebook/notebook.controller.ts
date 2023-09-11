import {
  CreateNotebookDTO,
  INotebookService,
} from "../../interfaces/notebook.interface";
import { type Response, type Request, Router } from "express";
import { createNotebookService } from "../../services/notebook/notebook.service";
import { IController } from "../../interfaces/controller.interface";

export class NotebookController implements IController {
  private service: INotebookService;

  constructor(service: INotebookService) {
    this.service = service;
  }

  async createNotebook(req: Request, res: Response) {
    const data = req.body as CreateNotebookDTO;

    if (!data.username)
      return res.status(400).json({ msg: "dados incorretos" });

    try {
      const id = await this.service.createNotebook(data);

      res.status(200).json({ msg: "Criado com sucesso com o id de " + id, id });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error", error });
    }
  }

  getRouter(): Router {
    const router = Router();

    router.post("/", async (req, res) => {
      await this.createNotebook(req, res);
    });

    return router;
  }
}

export const createNotebookRouter = (): Router => {
  const service: INotebookService = createNotebookService();

  const controller = new NotebookController(service);

  return controller.getRouter();
};
