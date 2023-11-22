import { Response, Request, Router } from "express";
import { CreateCardDTO, ICardService } from "../card.interfaces";
import { CardService } from "../services/card.service";
import { NotebookService } from "../../notebook/services/notebook.service"; 
import { UserService } from "../../user/services/user/user.service"; 
import axios from 'axios';

export class CardController {
  constructor(
    private cardService: ICardService,
    private notebookService: NotebookService, 
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
      const { question, answer } = await this.generateQuestionAndAnswer(notebookContent);

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

  async generateQuestionAndAnswer(content: string): Promise<{ question: string; answer: string }> {
    const url = 'https://chat.maritaca.ai/api/chat/inference';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Key 6532ccfe9aed8cf1b231484c$f5cec2382d3eb5ad9acfe7774be64ab07b743e9041d7e0e511f0f7a98c54142c'
    };
    const body = {
      messages: [
        {
          role: "user",
          content: `Com base na anotação abaixo me de uma pergunta e uma resposta, seguindo o modelo SRS sobre o conteudo estudado. Formate seu retorno em formato json com a pergunta estando na tag data.question e a resposta na tag data.answer: '${content}'`
        }
      ],
      do_sample: "true"
    };
  
    try {
      const response = await axios.post(url, body, { headers });
      const responseData = JSON.parse(response.data.answer).data;
  
      return { question: responseData.question, answer: responseData.answer };
    } catch (error) {
      console.error('Erro ao chamar a API do Maritaca:', error);
      throw new Error('Erro ao gerar pergunta e resposta');
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
