import { EntitySchema } from "typeorm";
import { Card } from "../card.interfaces";

export const CardSchema = new EntitySchema<Card>({
  name: "Card",
  target: Card,
  columns: {
    id: { type: "varchar", length: 50, primary: true, nullable: false },
    title: { type: "varchar", length: 100, nullable: false },
    content: { type: "text", nullable: false },
    notebookId: { type: "varchar", length: 50, nullable: false },
  },
});
