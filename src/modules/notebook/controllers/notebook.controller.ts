import { Response, Request, Router } from "express";
import { CreateNotebookDTO } from "../notebook.interfaces";
import { NotebookService } from "../services/notebook.service";

export class NotebookController {
  constructor(private notebookService: NotebookService) {}

  async createNotebook(req: Request, res: Response) {
    const { notebookName, owner } = req.body;
    const notebookData: CreateNotebookDTO = {
      notebookName,
      owner,
    };

    // Validação dos campos
    if (!notebookName) {
      return res.status(400).send("Name is required");
    }
    
    if (!owner) {
      return res.status(400).send("Content is required");
    }

    try {
      const newNotebook = await this.notebookService.createNotebook(notebookData);
      return res.status(201).json(newNotebook);
    } catch (error) {
      return res.status(500).send();
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
