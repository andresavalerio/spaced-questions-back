import { EntitySchema } from "typeorm";
import { Card } from "../interfaces/card.interfaces";

export const CardSchema = new EntitySchema<Card>({
  name: "Card",
  target: Card,
  columns: {
    id: { type: "varchar", length: 50, primary: true, nullable: false },
    question: { type: "text", nullable: false },
    answer: { type: "text", nullable: false },
    notebookId: { type: "varchar", length: 50, nullable: false },
    revision: { type: "int", nullable: false, default: 1 },
    revisionDate: { type: "date", nullable: false },
    rating: { type: "int", nullable: false },
    concluded: { type: "boolean", nullable: false, default: false },
  },

  relations: {
    notebook: {
      target: "Notebook",
      type: "many-to-one",
      joinColumn: {
        name: "notebookId",
      },
      createForeignKeyConstraints: false,
    },
  },
});
