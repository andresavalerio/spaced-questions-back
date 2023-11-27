import {
    CreateCardDTO,
    ICardRepository,
    ICardService,
    Card,
  } from "../../card.interfaces";
  
  export class CardService implements ICardService {
    constructor(private cardRepository: ICardRepository) {}
  
    async createCard(card: CreateCardDTO): Promise<Card> {
      const createdCard = await this.cardRepository.createCard(card);

      return createdCard;
    }
  
    async getCardsByNotebook(notebookId: string): Promise<Card[]> {
      return await this.cardRepository.getCardsByNotebook(notebookId);
    }
  }
  