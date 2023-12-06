import { EntitySchema } from "typeorm";
import { CardAnswer } from "../interfaces/card-answer.interface";

export const CardAnswerSchema = new EntitySchema<CardAnswer>({
  name: "CardAnswer",
  target: CardAnswer,
  columns: {
    id: { type: "varchar", length: 50, primary: true, nullable: false },
    answerDate: { type: "date", nullable: false },
    cardId: { type: "varchar", length: 50, nullable: false },
    goodAnswer: { type: "boolean", nullable: true },
  },

  relations: {
    card: {
      target: "Card",
      type: "many-to-one",
      joinColumn: {
        name: "cardId",
      },
      createForeignKeyConstraints: false,
    },
  },
});
