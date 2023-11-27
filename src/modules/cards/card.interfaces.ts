import { Repository } from "typeorm";

export interface CreateCardDTO {
  notebookId: string;
  userId: string;
  question: string;
  answer: string;
}

export interface ICardService {
  createCard(card: CreateCardDTO): Promise<Card>;
  getCardsByNotebook(notebookId: string): Promise<Card[]>;
}

export interface ICardRepository {
  createCard(card: CreateCardDTO): Promise<Card>;
  getCardsByNotebook(notebookId: string): Promise<Card[]>;
}

export interface ILLMService {
  generateQuestionAndAnswer(content: string): Promise<{ question: string; answer: string }>;
}

export abstract class Card {
  id!: string;
  notebookId!: string;
  userId!: string;
  question!: string;
  answer!: string;
}
