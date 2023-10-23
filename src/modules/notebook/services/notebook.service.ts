import {
  CreateNotebookDTO,
  INotebookRepository,
  INotebookService,
  Notebook,
} from "../notebook.interfaces";

export class NotebookService implements INotebookService {
  constructor(private notebookRepository: INotebookRepository) {}

  async createNotebook(notebook: CreateNotebookDTO): Promise<Notebook> {
    const createdNotebook = await this.notebookRepository.createNotebook(notebook);

    return createdNotebook;
  }

  async getNotebooksByOwner(owner: string): Promise<Notebook[]> {
    return await this.notebookRepository.getNotebooksByOwner(owner);
  }
}
