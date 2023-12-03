import { INotebookService } from "modules/notebook/notebook.interfaces";
import {
  ICardRepository,
  ICardService,
  Card,
  ILLMService,
  ICardScheduler,
  Revision,
  PatchCardDTO,
} from "../../interfaces/card.interfaces";
import { CardNotFoundError } from "modules/cards/errors/card.errors";

export class CardService implements ICardService {
  constructor(
    private cardRepository: ICardRepository,
    private notebookService: INotebookService,
    private cardSchedulerService: ICardScheduler,
    private llmService: ILLMService
  ) {}

  async createCardByNotebookId(notebookId: string): Promise<Card> {
    const notebookContent = await this.notebookService.getNotebookContentById(
      notebookId
    );

    const { question, answer } =
      await this.llmService.generateQuestionAndAnswer(notebookContent);

    const createdCard = await this.cardRepository.createCard({
      notebookId,
      question,
      answer,
    });

    return createdCard;
  }

  async getCardsByNotebookId(notebookId: string): Promise<Card[]> {
    return await this.cardRepository.selectCardsByNotebookId(notebookId);
  }

  async getRevisionCardsByNotebookId(notebookId: string): Promise<Card[]> {
    return await this.cardRepository.selectRevisionCardsByNotebookId(
      notebookId
    );
  }

  async isCardAnswerable(cardId: string): Promise<boolean> {
    const hasCard = await this.cardRepository.existsCardById(cardId);

    if (!hasCard) throw new CardNotFoundError();

    const revisionDate = await this.cardRepository.selectRevisionDateById(
      cardId
    );

    const today = new Date();

    return today >= revisionDate;
  }

  async updateRevisionDateBasedOnAnswer(
    cardId: string,
    answer: boolean
  ): Promise<void> {
    const presentRevision: number =
      await this.cardRepository.selectRevisionById(cardId);

    const [nextRevisionReference, nextRevisionDate]: Revision =
      this.cardSchedulerService.predictNextRevisionBasedOnAnswer(
        presentRevision,
        answer
      );

    await this.cardRepository.updateRevisionById(
      cardId,
      nextRevisionReference,
      nextRevisionDate
    );
  }

  async concludeCard(cardId: string): Promise<void> {
    const hasCard = await this.cardRepository.existsCardById(cardId);

    if (!hasCard) throw new CardNotFoundError();

    await this.cardRepository.setCardConcluded(cardId);
  }

  async updateCard(cardId: string, cardData: PatchCardDTO): Promise<Card> {
    const hasCard = await this.cardRepository.existsCardById(cardId);

    if (!hasCard) throw new CardNotFoundError();

    await this.cardRepository.updateCard(cardId, cardData);

    return await this.cardRepository.selectCardById(cardId);
  }
}
