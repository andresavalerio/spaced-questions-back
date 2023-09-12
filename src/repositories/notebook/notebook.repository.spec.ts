import { Repository } from "typeorm";
import database from "../../database/database";
import { NotebookRepository } from "./notebook.repository";
import { Notebook } from "../../interfaces/notebook.interface";
import { NotebookWithoutIdError } from "../../errors/notebook.errors";

describe("NotebookRepository", () => {
  let repository: NotebookRepository;
  let notebookRepository: Repository<Notebook>;

  beforeAll(async () => {
    const initializedDatabase = await database.initialize();

    await initializedDatabase.dropDatabase();

    await initializedDatabase.synchronize(true);

    repository = new NotebookRepository();

    notebookRepository = database.getRepository(Notebook);

    await notebookRepository.find();
  });

  it("should be defined", async () => {
    expect(repository).toBeDefined();
  });

  it("should insert notebook", async () => {
    await notebookRepository.delete("1");

    await repository.insertNotebook({
      id: "1",
      notes: "abc",
      title: "abc",
      username: "abc",
    });

    const notebook = await notebookRepository.findOne({ where: { id: "1" } });

    expect(notebook).toBeDefined();

    expect(notebook?.id).toBe("1");
  });

  it("should not insert notebook", async () => {
    await notebookRepository.delete("1");

    await expect(async () => {
      await repository.insertNotebook({
        id: "",
        notes: "abc",
        title: "abc",
        username: "abc",
      });
    }).rejects.toThrow(NotebookWithoutIdError);

    const notebook = await notebookRepository.findOne({ where: { id: "1" } });

    expect(notebook).toBeNull();
  });
});
