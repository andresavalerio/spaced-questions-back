import { NotebookNotFoundError } from "../notebook.errors";
import {
  CreateNotebookDTO,
  INotebookRepository,
  INotebookService,
  Notebook,
} from "../notebook.interfaces";

export class NotebookService implements INotebookService {
  constructor(private notebookRepository: INotebookRepository) {}

  async createNotebook(notebook: CreateNotebookDTO): Promise<Notebook> {
    const createdNotebook = await this.notebookRepository.createNotebook(
      notebook
    );

    return createdNotebook;
  }

  async getNotebooksByOwner(owner: string): Promise<Notebook[]> {
    return await this.notebookRepository.getNotebooksByOwner(owner);
  }

  async getNotebookContentById(notebookId: string): Promise<string> {
    const notebook = await this.notebookRepository.getNotebookById(notebookId);

    if (!notebook) throw new NotebookNotFoundError();

    return notebook.content;
  }

  async getNotebookById(id: string): Promise<Notebook> {
    const notebook = await this.notebookRepository.getNotebookById(id);

    if (!notebook) throw new NotebookNotFoundError();

    return notebook;
  }
}
