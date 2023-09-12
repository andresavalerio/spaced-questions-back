import { Repository } from "typeorm";
import database from "../../database/database";
import {
  INotebookRepository,
  Notebook,
} from "../../interfaces/notebook.interface";
import {
  NotebookInsertError,
  NotebookWithoutIdError,
} from "../../errors/notebook.errors";

export class NotebookRepository implements INotebookRepository {
  private repository: Repository<Notebook>;

  constructor() {
    this.repository = database.getRepository(Notebook);
  }

  async insertNotebook(notebook: Notebook): Promise<void> {
    if (!notebook.id) throw new NotebookWithoutIdError();

    try {
      await this.repository.save(notebook);
    } catch (error) {
      throw new NotebookInsertError();
    }
  }
}
