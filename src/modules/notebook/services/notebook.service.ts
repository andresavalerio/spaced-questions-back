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

  async getNotebookContent(notebookId: string): Promise<string> {
    const notebook = await this.notebookRepository.getNotebookById(notebookId);

    if (!notebook) {
      return "Cannot find notebook";
    }

    return notebook.content;
  }
}
