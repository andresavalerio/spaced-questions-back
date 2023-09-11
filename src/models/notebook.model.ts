import { Column, Entity, PrimaryColumn } from "typeorm";
import { Notebook } from "../interfaces/notebook.interface";

@Entity()
export class NotebookModel implements Notebook {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public title!: string;

  @Column()
  public notes!: string;

  @Column()
  public username!: string;
}
