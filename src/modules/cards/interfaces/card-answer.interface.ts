import { Card } from "./card.interfaces";

export class CardAnswer {
  // Columns
  id!: string;
  cardId!: string;
  goodAnswer!: boolean;
  answerDate!: Date;

  // Relations
  card?: Card;
}

export interface ICardAnswerService {
  saveCardAnswer(cardId: string, answer: boolean): Promise<void>;
}

export interface ICardAnswerRepository {
  insertCardAnswer(
    id: string,
    cardId: string,
    answer: boolean,
    date: Date
  ): Promise<void>;
}
