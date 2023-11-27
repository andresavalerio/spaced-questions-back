import { Response, Request, Router } from "express";
import { CreateCardDTO, ICardService } from "../card.interfaces";
import { LLMService } from "../services/llm/llm.service";
import { INotebookService } from "modules/notebook/notebook.interfaces";

export class CardController {
  constructor(
    private cardService: ICardService,
    private notebookService: INotebookService, 
    private llmService: LLMService
  ) {}

  async createCard(req: Request, res: Response) {
    const { notebookId, userId } = req.body as CreateCardDTO;

    // Validação dos camposU
    if (!notebookId || !userId) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    try {
      // Obtenha o conteúdo do caderno
      const notebookContent = await this.notebookService.getNotebookContent(notebookId);
      if (!notebookContent) {
        return res.status(404).json({ msg: "Notebook not found or access denied" });
      }

      // Chame a API do Maritaca para gerar pergunta e resposta
      const { question, answer } = await this.llmService.generateQuestionAndAnswer(notebookContent);

      // Crie o card com a pergunta e a resposta
      const newCard = await this.cardService.createCard({
        notebookId,
        userId,
        question,
        answer
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
