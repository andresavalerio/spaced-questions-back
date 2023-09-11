import { NotebookService } from "./notebook.service";
import {
  CreateNotebookDTO,
  INotebookRepository,
  Notebook,
} from "../../interfaces/notebook.interface";
import {
  NotebookWithoutTitleError,
  NotebookWithoutUsernameError,
} from "../../errors/notebook.errors";

export class FakeNotebookRepository implements INotebookRepository {
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

describe("NotebookService", () => {
  let service: NotebookService;

  beforeEach(() => {
    service = new NotebookService(new FakeNotebookRepository());
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should insert notebook", () => {
    const notebook: CreateNotebookDTO = {
      notes: "lorem ipsum",
      title: "novo caderno",
      username: "pimpim",
    };

    const id = service.createNotebook(notebook);

    expect(id).not.toBeNull();
  });

  it("should not insert notebook with errors", () => {
    const notebookWithoutUsername: CreateNotebookDTO = {
      notes: "lorem ipsum",
      title: "novo caderno",
      username: "",
    };

    const notebookWithoutTitle: CreateNotebookDTO = {
      notes: "lorem ipsum",
      title: "",
      username: "pimpim",
    };

    expect(() => {
      service.createNotebook(notebookWithoutTitle);
    }).toThrow(Error);

    expect(() => {
      service.createNotebook(notebookWithoutUsername);
    }).toThrow(Error);
  });
});
