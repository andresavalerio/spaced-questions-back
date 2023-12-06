import { Notebook } from "modules/notebook/notebook.interfaces";

export interface CreateCardDTO {
  notebookId: string;
  question: string;
  answer: string;
}

export interface PatchCardDTO {
  question?: string;
  answer?: string;
  rating?: number;
}

export interface ICardService {
  updateCard(cardId: string, cardData: PatchCardDTO): Promise<Card>;
  concludeCard(cardId: string): Promise<void>;
  updateRevisionDateBasedOnAnswer(
    cardId: string,
    answer: boolean
  ): Promise<void>;

  isCardAnswerable(cardId: string): Promise<boolean>;
  createCardByNotebookId(notebookId: string): Promise<Card>;
  getCardsByNotebookId(notebookId: string): Promise<Card[]>;
  getRevisionCardsByNotebookId(notebookId: string): Promise<Card[]>;
}

export interface ICardRepository {
  updateCard(cardId: string, cardData: PatchCardDTO): Promise<void>;
  selectCardById(cardId: string): Promise<Card>;
  setCardConcluded(cardId: string): Promise<void>;
  selectRevisionById(cardId: string): Promise<number>;
  updateRevisionById(
    cardId: string,
    nextRevisionReference: number,
    nextRevisionDate: Date
  ): Promise<void>;
  createCard(card: CreateCardDTO): Promise<Card>;
  selectCardsByNotebookId(notebookId: string): Promise<Card[]>;
  selectRevisionCardsByNotebookId(notebookId: string): Promise<Card[]>;
  existsCardById(cardId: string): Promise<boolean>;
  selectRevisionDateById(cardId: string): Promise<Date>;
}

export interface ICardScheduler {
  predictNextRevisionBasedOnAnswer(
    presentRevisionReference: number,
    answer: boolean
  ): Revision;
}

export interface ILLMService {
  generateQuestionAndAnswer(
    content: string
  ): Promise<{ question: string; answer: string }>;

  evaluateAnswer(
    question: string,
    answer: string,
    content: string
  ): Promise<{ score: number; interpretation: string }>;
}

export abstract class Card {
  // Columns
  id!: string;
  notebookId!: string;

  //Patchable
  question!: string;
  answer!: string;
  rating?: number;

  revision!: number;
  revisionDate!: Date;
  concluded!: boolean;

  // Relations
  notebook?: Notebook;
}

export type Revision = [number, Date];
