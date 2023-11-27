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

  async getNotebooksByOwner(owner: string): Promise<Notebook[]> {
    return await this.notebookRepository.find({ where: { owner } });
  }

  async getNotebookById(id: string): Promise<Notebook> {
    const notebook = await this.notebookRepository.findOne({ where: { id } });

    return notebook || {} as Notebook;
  }

  async getNotebookContent(notebookId: string): Promise<string> {
    const notebook = await this.notebookRepository.findOne({ where: { id: notebookId } });

    return notebook?.content || "";
  }
}
