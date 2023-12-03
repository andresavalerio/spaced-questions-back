import { Response, Request, Router } from "express";
import {
  CreateCardDTO,
  ICardService,
  PatchCardDTO,
} from "../../interfaces/card.interfaces";
import { IController } from "interfaces/controller.interface";
import { NotebookNotFoundError } from "modules/notebook/notebook.errors";

export class CardController implements IController {
  constructor(private cardService: ICardService) {}

  private async createCard(req: Request, res: Response) {
    const { notebookId } = req.body as CreateCardDTO;

    if (!notebookId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
      const newCard = await this.cardService.createCardByNotebookId(notebookId);

      return res.status(201).json(newCard);
    } catch (error) {
      console.error(error);

      return res.status(500).send();
    }
  }

  private async getCardsByNotebook(req: Request, res: Response) {
    const { notebookId } = req.params;
    const { all } = req.query;

    try {
      const cardsPromise = all
        ? this.cardService.getCardsByNotebookId(notebookId)
        : this.cardService.getRevisionCardsByNotebookId(notebookId);

      const cards = await cardsPromise;

      return res.status(200).json(cards);
    } catch (error) {
      if (error instanceof NotebookNotFoundError)
        return res.status(404).send({ msg: "Notebook not Found" });

      return res.status(500).send();
    }
  }

  private async patchCard(req: Request, res: Response) {
    const { answer, question, rating } = req.body as PatchCardDTO;

    const cardId = req.params.cardId;

    if (!cardId) return res.status(400).json({ msg: "Bad Request" });

    const hasMutation = !!answer || !!question || !!rating;

    if (!hasMutation) return res.status(400).json({ msg: "Bad Request" });

    await this.cardService.updateCard(cardId, { answer, question, rating });

    return res.status(200).json();
  }

  public getRouter(): Router {
    const router = Router();

    router.post("/", async (req, res) => {
      await this.createCard(req, res);
    });

    router.get("/:notebookId", async (req, res) => {
      await this.getCardsByNotebook(req, res);
    });

    router.patch("/:cardId", async (req, res) => {
      await this.patchCard(req, res);
    });

    return router;
  }
}
