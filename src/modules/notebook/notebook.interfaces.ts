import { Repository } from "typeorm";

export interface CreateNotebookDTO {
  name: string;
  owner: string;
}

export interface INotebookService {
  createNotebook(notebook: CreateNotebookDTO): Promise<Notebook>;
  getNotebooksByOwner(owner: string): Promise<Notebook[]>;
}

export interface INotebookRepository {
  createNotebook(notebook: CreateNotebookDTO): Promise<Notebook>;
  getNotebooksByOwner(owner: string): Promise<Notebook[]>;
}

export abstract class Notebook {
  id!: string;
  name!: string;
  owner!: string;
}
