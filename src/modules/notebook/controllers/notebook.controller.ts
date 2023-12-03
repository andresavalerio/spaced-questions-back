import { Response, Request, Router } from "express";
import { CreateNotebookDTO, INotebookService } from "../notebook.interfaces";
import { NotebookService } from "../services/notebook.service";
import { IController } from "../../../interfaces/controller.interface";
import {
  NotebookDuplicateError,
  NotebookNotFoundError,
} from "../notebook.errors";

export class NotebookController implements IController {
  private notebookService: INotebookService;

  constructor(notebookService: INotebookService) {
    this.notebookService = notebookService;
  }

  async createNotebook(req: Request, res: Response) {
    const { name, owner } = req.body as CreateNotebookDTO;

    // Validação dos campos
    if (!name || name === "") {
      return res.status(400).json({ msg: "Missing name value" });
    }

    if (!owner || owner === "") {
      return res.status(400).json({ msg: "Missing owner value" });
    }

    try {
      const newNotebook = await this.notebookService.createNotebook({
        name,
        owner,
        content: "",
      });
      return res.status(201).json(newNotebook);
    } catch (error) {
      if (error instanceof NotebookDuplicateError) {
        return res.status(409).json({ msg: "duplicated notebook" });
      }
      return res.status(500).send();
    }
  }

  async getNotebooksByOwner(req: Request, res: Response) {
    const { owner } = req.params; // Pegando o "owner" dos parâmetros da URL

    try {
      const notebooks = await this.notebookService.getNotebooksByOwner(owner);
      return res.status(200).json(notebooks);
    } catch (error) {
      return res.status(500).send();
    }
  }

  async getNotebookContent(req: Request, res: Response) {
    const { notebookId } = req.params;

    try {
      const content = await this.notebookService.getNotebookContentById(
        notebookId
      );

      return res.status(200).json({ content });
    } catch (error) {
      if (error instanceof NotebookNotFoundError)
        return res
          .status(404)
          .json({ msg: "Notebook not found or access denied" });

      return res.status(500).json({ msg: "Internal server error" });
    }
  }

  getRouter(): Router {
    const router = Router();

    router.post("/", async (req, res) => {
      await this.createNotebook(req, res);
    });

    router.get("/:owner", async (req, res) => {
      await this.getNotebooksByOwner(req, res);
    });

    router.get("/:notebookId/content", async (req, res) => {
      await this.getNotebookContent(req, res);
    });

    return router;
  }
}
