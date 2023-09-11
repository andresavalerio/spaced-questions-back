import { NotebookRepository } from "./notebook.repository";

describe("NotebookRepository", () => {
  let repository: NotebookRepository;

  beforeEach(() => {
    repository = new NotebookRepository();
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
