import request from "supertest";
import express, { type Express } from "express";
import { NotebookController } from "./notebook.controller";
import { CreateNotebookDTO, INotebookService, Notebook } from "../notebook.interfaces";
import { NotebookDuplicateError, NotebookNotFoundError } from "../notebook.errors";

const baseCreateNotebookData: CreateNotebookDTO = {
  name: "Test Notebook",
  owner: "testOwner"
};

describe("NotebookController", () => {
  let application: Express;
  let service: INotebookService;

  const requestCreateNotebook = (data: CreateNotebookDTO) =>
    request(application).post("/").send(data);

  beforeAll(() => {
    service = {
      createNotebook: jest.fn(),
      getNotebooksByOwner: jest.fn(),
    };
  });

  beforeEach(() => {
    application = express();

    application.use(express.json());

    const controller = new NotebookController(service);

    const router = controller.getRouter();

    application.use("/", router);

    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(application).toBeDefined();
  });

  describe("createNotebook", () => {
    it("should create notebook", async () => {
      await requestCreateNotebook(baseCreateNotebookData).expect(201);
    });

    it("should not create notebook without some property", async () => {
      const toNullifyKeys: Array<keyof CreateNotebookDTO> = [
        "name",
        "owner"
      ];

      for (const key of toNullifyKeys) {
        await requestCreateNotebook({ ...baseCreateNotebookData, [key]: "" })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(`missing ${key} value`);
          });
      }
    });

    it("should not create notebook with the same name", async () => {
      jest.spyOn(service, "createNotebook").mockImplementation(() => {
        throw new NotebookDuplicateError();
      });

      await requestCreateNotebook(baseCreateNotebookData)
        .expect(409)
        .then((response) => {
          expect(response.body.msg).toBe("duplicated notebook");
        });
    });
  });
});
