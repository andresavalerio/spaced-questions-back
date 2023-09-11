import { Repository } from "typeorm";
import database from "../../database/database";
import {
  INotebookRepository,
  Notebook,
} from "../../interfaces/notebook.interface";
import { NotebookModel } from "../../models/notebook.model";

export class NotebookRepository implements INotebookRepository {
  private repository: Repository<NotebookModel>;

  constructor() {
    this.repository = database.getRepository(NotebookModel);
  }

  async insertNotebook(notebook: Notebook): Promise<boolean> {
    if (!notebook.id) return false;

    try {
      await this.repository.save(notebook);
    } catch (error) {
      return false;
    } finally {
      return true;
    }
  }
}
