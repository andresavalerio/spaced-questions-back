import {
  CreateNotebookDTO,
  INotebookService,
} from "../../interfaces/notebook.interface";
import { NotebookController } from "./notebook.controller";

class FakeNotebookService implements INotebookService {
  createNotebook(notebook: CreateNotebookDTO): string {
    return "new-id";
  }
}

describe("NotebookController", () => {
  let repository: NotebookController;

  beforeEach(() => {
    repository = new NotebookController(new FakeNotebookService());
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
