import { EntitySchema } from "typeorm";
import { Notebook } from "../notebook.interfaces";

export const NotebookSchema = new EntitySchema<Notebook>({
  name: "Notebook",
  target: Notebook,
  columns: {
    notebookId: { type: "varchar", primary: true, generated: "increment", nullable: false, unique: true },
    notebookName: { type: "varchar", length: 100, nullable: false },
    owner: { type: "varchar", length: 100, nullable: false },
  },
});
