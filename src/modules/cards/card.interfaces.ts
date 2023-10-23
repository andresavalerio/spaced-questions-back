import { Repository } from "typeorm";

export interface CreateCardDTO {
  title: string;
  content: string;
  notebookId: string;
}

export interface ICardService {
  createCard(card: CreateCardDTO): Promise<Card>;
  getCardsByNotebook(notebookId: string): Promise<Card[]>;
}

export interface ICardRepository {
  createCard(card: CreateCardDTO): Promise<Card>;
  getCardsByNotebook(notebookId: string): Promise<Card[]>;
}

export abstract class Card {
  id!: string;
  title!: string;
  content!: string;
  notebookId!: string;
}
