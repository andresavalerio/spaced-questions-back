import { Repository } from "typeorm";

export interface CreateNotebookDTO {
  name: string;
  owner: string;
}

export interface INotebookService {
  createNotebook(notebook: CreateNotebookDTO): void;
}

export interface INotebookRepository {
  createNotebook(notebook: CreateNotebookDTO): Promise<Notebook>;
}

export abstract class Notebook {
  id!: string;
  name!: string;
  owner!: string;
}
