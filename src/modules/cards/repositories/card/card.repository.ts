import { Raw, Repository } from "typeorm";
import {
  Card,
  CreateCardDTO,
  ICardRepository,
  PatchCardDTO,
} from "../../interfaces/card.interfaces";
import database from "database/database";
import { CardNotFoundError } from "modules/cards/errors/card.errors";

export class CardRepository implements ICardRepository {
  private cardRepository: Repository<Card>;

  constructor() {
    this.cardRepository = database.getRepository(Card);
  }

  async createCard(cardDTO: CreateCardDTO): Promise<Card> {
    const card = this.cardRepository.create(cardDTO);
    return await this.cardRepository.save(card);
  }

  async selectCardsByNotebookId(notebookId: string): Promise<Card[]> {
    return await this.cardRepository.find({ where: { notebookId } });
  }

  async selectRevisionCardsByNotebookId(notebookId: string): Promise<Card[]> {
    return await this.cardRepository.find({
      where: { notebookId, revisionDate: Raw((alias) => `${alias} <= NOW()`) },
    });
  }

  async existsCardById(cardId: string): Promise<boolean> {
    return await this.cardRepository.exist({ where: { id: cardId } });
  }

  async selectRevisionById(cardId: string): Promise<number> {
    const card = await this.cardRepository.findOneBy({ id: cardId });

    if (!card) throw new CardNotFoundError();

    return card.revision;
  }

  async selectRevisionDateById(cardId: string): Promise<Date> {
    const card = await this.cardRepository.findOneBy({ id: cardId });

    if (!card) throw new CardNotFoundError();

    return card.revisionDate;
  }

  async setCardConcluded(cardId: string): Promise<void> {
    await this.cardRepository.update({ id: cardId }, { answer: "TRUE" });
  }

  async updateRevisionById(
    cardId: string,
    nextRevisionReference: number,
    nextRevisionDate: Date
  ): Promise<void> {
    await this.cardRepository.update(
      { id: cardId },
      { revision: nextRevisionReference, revisionDate: nextRevisionDate }
    );
  }

  async selectCardById(cardId: string): Promise<Card> {
    const card = await this.cardRepository.findOneBy({ id: cardId });

    if (!card) throw new CardNotFoundError();

    return card;
  }

  async updateCard(cardId: string, cardData: PatchCardDTO): Promise<void> {
    const { answer, question, rating } = cardData;

    const updateData = { answer, question, rating };

    if (!answer) delete updateData.answer;

    if (!question) delete updateData.question;

    if (!rating) delete updateData.rating;

    await this.cardRepository.update({ id: cardId }, updateData);
  }
}
