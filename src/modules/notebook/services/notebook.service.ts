import {
  CreateNotebookDTO,
  INotebookRepository,
  INotebookService,
  Notebook,
} from "../notebook.interfaces";

export class NotebookService implements INotebookService {
  constructor(private notebookRepository: INotebookRepository) {}

  async createNotebook(notebook: CreateNotebookDTO): Promise<void> {
    await this.notebookRepository.createNotebook(notebook);
  }

  async getNotebooksByOwner(owner: string): Promise<Notebook[]> {
    return await this.notebookRepository.getNotebooksByOwner(owner);
  }
}
