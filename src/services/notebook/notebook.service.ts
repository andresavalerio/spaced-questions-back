import {
  NotebookInsertError,
  NotebookWithoutTitleError,
  NotebookWithoutUsernameError,
} from "../../errors/notebook.errors";
import {
  CreateNotebookDTO,
  INotebookRepository,
  INotebookService,
} from "../../interfaces/notebook.interface";
import { v4 as uuid } from "uuid";
import { NotebookRepository } from "../../repositories/notebook/notebook.repository";

export class NotebookService implements INotebookService {
  private repository: INotebookRepository;

  constructor(repository: INotebookRepository) {
    this.repository = repository;
  }

  async createNotebook(notebook: CreateNotebookDTO): Promise<string> {
    if (notebook.title.length === 0) {
      throw new NotebookWithoutTitleError();
    }

    if (notebook.username.length === 0) {
      throw new NotebookWithoutUsernameError();
    }

    const id = uuid();

    const success = await this.repository.insertNotebook({ ...notebook, id });

    if (!success) throw new NotebookInsertError();

    return id;
  }
}

export const createNotebookService = (): INotebookService => {
  const repository = new NotebookRepository();

  return new NotebookService(repository);
};
