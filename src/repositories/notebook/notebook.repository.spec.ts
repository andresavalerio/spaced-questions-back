import { Repository } from "typeorm";
import database from "../../database/database";
import { NotebookRepository } from "./notebook.repository";
import { NotebookModel } from "../../models/notebook.model";

describe("NotebookRepository", () => {
  let repository: NotebookRepository;
  let databaseRepository: Repository<NotebookModel>;

  beforeEach(async () => {
    await database.initialize();
  });

  beforeEach(async () => {
    repository = new NotebookRepository();

    databaseRepository = database.getRepository(NotebookModel);

    await databaseRepository.delete("1");
  });

  it("should be defined", async () => {
    const result = await repository.insertNotebook({
      id: "1",
      notes: "abc",
      title: "abc",
      username: "abc",
    });

    expect(result).toBeTruthy();

    const notebook = await databaseRepository.findOne({ where: { id: "1" } });

    expect(notebook).toBeDefined();
    expect(notebook?.id).toBe("1");
  });
});
