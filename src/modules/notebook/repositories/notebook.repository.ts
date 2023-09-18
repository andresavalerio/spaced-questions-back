import { Repository } from "typeorm";
import {
  Notebook,
  CreateNotebookDTO,
  INotebookRepository,
} from "../notebook.interfaces";
import database from "database/database";

export class NotebookRepository implements INotebookRepository {
  private notebookRepository: Repository<Notebook>;

  constructor() {
    this.notebookRepository = database.getRepository(Notebook);
  }

  async createNotebook(notebookDTO: CreateNotebookDTO): Promise<Notebook> {
    const notebook = this.notebookRepository.create(notebookDTO);
    return await this.notebookRepository.save(notebook);
  }
}
