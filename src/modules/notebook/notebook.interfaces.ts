export interface CreateNotebookDTO {
  name: string;
  owner: string;
  content: string;
}

export interface INotebookService {
  createNotebook(notebook: CreateNotebookDTO): Promise<Notebook>;
  getNotebooksByOwner(owner: string): Promise<Notebook[]>;
  getNotebookContentById(notebookId: string): Promise<string>;
  getNotebookById(id: string): Promise<Notebook>;
}

export interface INotebookRepository {
  createNotebook(notebook: CreateNotebookDTO): Promise<Notebook>;
  getNotebooksByOwner(owner: string): Promise<Notebook[]>;
  getNotebookById(id: string): Promise<Notebook>;
  getNotebookContent(notebookId: string): Promise<string>;
}

export abstract class Notebook {
  id!: string;
  name!: string;
  owner!: string;
  content!: string;
}
