import { Request, Response, Router } from "express";
import { IController } from "interfaces/controller.interface";
import { CardAnswerNotPossibleError } from "modules/cards/errors/card-answer.error";
import { CardNotFoundError } from "modules/cards/errors/card.errors";
import { ICardAnswerService } from "modules/cards/interfaces/card-answer.interface";

export class CardAnswerController implements IController {
  constructor(private cardAnswerService: ICardAnswerService) {}

  private async postAnswer(req: Request, res: Response) {
    try {
      const cardId = req.params.cardId;

      const answer = req.body.answer;

      if (typeof cardId !== "string" || typeof answer !== "boolean")
        return res.status(400).json({ msg: "Bad Request" });

      this.cardAnswerService.saveCardAnswer(cardId, answer);

      return res.status(200).send();
    } catch (error) {
      if (error instanceof CardNotFoundError)
        return res.status(404).json({ msg: "Card not Found" });

      if (error instanceof CardAnswerNotPossibleError)
        return res.status(409).json({ msg: "Card not in revision date" });

      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  getRouter(): Router {
    const router = Router();

    router.post("/", async (req, res) => {
      await this.postAnswer(req, res);
    });

    return router;
  }
}
