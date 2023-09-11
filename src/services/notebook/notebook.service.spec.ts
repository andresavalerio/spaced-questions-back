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

  insertNotebook(notebook: Notebook): Promise<boolean> {
    if (!notebook.id) new Promise((resolve) => resolve(false));

    this.notebooks.push(notebook);

    return new Promise((resolve) => resolve(true));
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

  it("should insert notebook", async () => {
    const notebook: CreateNotebookDTO = {
      notes: "lorem ipsum",
      title: "novo caderno",
      username: "pimpim",
    };

    const id = await service.createNotebook(notebook);

    expect(id).not.toBeNull();
  });

  it("should not insert notebook with errors", async () => {
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

    await expect(async () => {
      await service.createNotebook(notebookWithoutTitle);
    }).rejects.toThrow(Error);

    await expect(async () => {
      await service.createNotebook(notebookWithoutUsername);
    }).rejects.toThrow(Error);
  });
});
