import { EntitySchema } from "typeorm";
import { Card } from "../card.interfaces";

export const CardSchema = new EntitySchema<Card>({
  name: "Card",
  target: Card,
  columns: {
    id: { type: "varchar", length: 50, primary: true, nullable: false },
    notebookId: { type: "varchar", length: 50, nullable: false },
    userId: { type: "varchar", length: 50, nullable: false },
    question: { type: "text", nullable: false },
    answer: { type: "text", nullable: false },
  },
});
