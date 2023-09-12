import { Column, Entity, EntitySchema, PrimaryColumn } from "typeorm";
import { Notebook } from "../interfaces/notebook.interface";

export const NotebookModel = new EntitySchema<Notebook>({
  name: "notebook",
  target: Notebook,
  columns: {
    id: { type: "varchar", length: "50", primary: true },
    notes: { type: "text", nullable: true },
    title: { type: "varchar", length: 256, nullable: false },
    username: { type: "varchar", length: 100, nullable: false },
  },
});
