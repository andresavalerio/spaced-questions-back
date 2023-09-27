import { EntitySchema } from "typeorm";
import { Notebook } from "../notebook.interfaces";

export const NotebookSchema = new EntitySchema<Notebook>({
  name: "Notebook",
  target: Notebook,
  columns: {
    id: { type: "varchar", length: 50, primary: true, nullable: false },
    name: { type: "varchar", length: 100, nullable: false },
    owner: { type: "varchar", length: 100, nullable: false },
  },
});
