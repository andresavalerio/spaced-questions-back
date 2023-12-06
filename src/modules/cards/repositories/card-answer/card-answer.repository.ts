import database from "database/database";
import {
  CardAnswer,
  ICardAnswerRepository,
} from "modules/cards/interfaces/card-answer.interface";
import { Repository } from "typeorm";

export class CardAnswerRepository implements ICardAnswerRepository {
  private cardAnswerRepository: Repository<CardAnswer>;

  constructor() {
    this.cardAnswerRepository = database.getRepository(CardAnswer);
  }

  async insertCardAnswer(
    id: string,
    cardId: string,
    answer: boolean,
    answerDate: Date
  ): Promise<void> {
    await this.cardAnswerRepository.save({
      id,
      answerDate,
      cardId,
      goodAnswer: answer,
    });
  }
}
