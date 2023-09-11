import {
  INotebookRepository,
  Notebook,
} from "../../interfaces/notebook.interface";

export class NotebookRepository implements INotebookRepository {
  private notebooks: Notebook[];

  constructor() {
    this.notebooks = [];
  }

  insertNotebook(notebook: Notebook): boolean {
    if (!notebook.id) return false;

    this.notebooks.push(notebook);

    return true;
  }
}
