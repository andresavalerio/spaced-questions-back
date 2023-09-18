import { Repository } from "typeorm";

export interface CreateNotebookDTO {
  notebookName: string;
  owner: string;
}

export interface INotebookService {
  createNotebook(notebook: CreateNotebookDTO): void;
}

export interface INotebookRepository {
  createNotebook(notebook: CreateNotebookDTO): Promise<Notebook>;
}

export abstract class Notebook {
  notebookId!: string;
  notebookName!: string;
  owner!: string;
}
