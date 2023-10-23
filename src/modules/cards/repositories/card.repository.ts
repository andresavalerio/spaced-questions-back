import { Repository } from "typeorm";
import {
  Card,
  CreateCardDTO,
  ICardRepository,
} from "../card.interfaces";
import database from "database/database";

export class CardRepository implements ICardRepository {
  private cardRepository: Repository<Card>;

  constructor() {
    this.cardRepository = database.getRepository(Card);
  }

  async createCard(cardDTO: CreateCardDTO): Promise<Card> {
    const card = this.cardRepository.create(cardDTO);
    return await this.cardRepository.save(card);
  }

  async getCardsByNotebook(notebookId: string): Promise<Card[]> {
    return await this.cardRepository.find({ where: { notebookId } });
  }
}
