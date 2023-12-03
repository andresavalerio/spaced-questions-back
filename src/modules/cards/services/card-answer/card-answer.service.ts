import { createId } from "helpers/create-id";
import { CardAnswerNotPossibleError } from "modules/cards/errors/card-answer.error";
import { CardRevisionLimitPassedError } from "modules/cards/errors/card.errors";

import {
  ICardAnswerRepository,
  ICardAnswerService,
} from "modules/cards/interfaces/card-answer.interface";

import { ICardService } from "modules/cards/interfaces/card.interfaces";

export class CardAnswerService implements ICardAnswerService {
  constructor(
    private cardAnswerRepository: ICardAnswerRepository,
    private cardService: ICardService
  ) {}

  async saveCardAnswer(cardId: string, answer: boolean): Promise<void> {
    const isAnswerable = this.cardService.isCardAnswerable(cardId);

    if (!isAnswerable) throw new CardAnswerNotPossibleError();

    const today = new Date();

    const id = createId();

    await this.cardAnswerRepository.insertCardAnswer(id, cardId, answer, today);

    try {
      await this.cardService.updateRevisionDateBasedOnAnswer(cardId, answer);
    } catch (error) {
      const isCardConcluded = error instanceof CardRevisionLimitPassedError;

      if (!isCardConcluded) throw error;

      await this.cardService.concludeCard(cardId);
    }
  }
}
