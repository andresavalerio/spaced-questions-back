import {
  CreateNotebookDTO,
  INotebookRepository,
  INotebookService,
} from "../notebook.interfaces";

export class NotebookService implements INotebookService {
  constructor(private notebookRepository: INotebookRepository) {}

  async createNotebook(notebook: CreateNotebookDTO): Promise<void> {
    await this.notebookRepository.createNotebook(notebook);
  }
}
