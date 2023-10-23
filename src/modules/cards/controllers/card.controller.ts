import { Response, Request, Router } from "express";
import { CreateCardDTO, ICardService } from "../card.interfaces";
import { CardService } from "../services/card.service";

export class CardController {
  constructor(private cardService: ICardService) {}

  async createCard(req: Request, res: Response) {
    const { title, content, notebookId } = req.body as CreateCardDTO;

    // Validação dos campos
    if (!title || !content || !notebookId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
      const newCard = await this.cardService.createCard({
        title,
        content,
        notebookId,
      });
      return res.status(201).json(newCard);
    } catch (error) {
      return res.status(500).send();
    }
  }

  async getCardsByNotebook(req: Request, res: Response) {
    const { notebookId } = req.params;

    try {
      const cards = await this.cardService.getCardsByNotebook(notebookId);
      return res.status(200).json(cards);
    } catch (error) {
      return res.status(500).send();
    }
  }

  getRouter(): Router {
    const router = Router();

    router.post("/", async (req, res) => {
      await this.createCard(req, res);
    });

    router.get("/:notebookId", async (req, res) => {
      await this.getCardsByNotebook(req, res);
    });

    return router;
  }
}
