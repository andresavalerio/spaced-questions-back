import {
    CreateCardDTO,
    ICardRepository,
    ICardService,
    Card,
  } from "../card.interfaces";
  
  export class CardService implements ICardService {
    constructor(private cardRepository: ICardRepository) {}
  
    async createCard(card: CreateCardDTO): Promise<void> {
      await this.cardRepository.createCard(card);
    }
  
    async getCardsByNotebook(notebookId: string): Promise<Card[]> {
      return await this.cardRepository.getCardsByNotebook(notebookId);
    }
  }
  