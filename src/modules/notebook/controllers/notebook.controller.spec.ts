import request from "supertest";
import express, { type Express } from "express";
import { CreateNotebookDTO, INotebookService } from "../notebook.interfaces";
import { NotebookController } from "./notebook.controller";

const baseCreatNotebookData: CreateNotebookDTO = {
  name: "Testing methodology",
  owner: "Pedro",
};

describe("Notebook controler testing", () => {
  describe("Notebook creation controller behavior", () => {
    let application: Express;
    let notebookService: INotebookService;

    const requestCreateNotebook = (data: CreateNotebookDTO) =>
      request(application).post("/").send(data);

    let response;

    beforeAll(() => {
      notebookService = {
        createNotebook: jest.fn(),
        getNotebooksByOwner: jest.fn(),
      };
    });

    beforeEach(() => {
      response = {};

      application = express();

      application.use(express.json());

      const notebookController = new NotebookController(notebookService);

      const router = notebookController.getRouter();

      application.use("/", router);

      jest.resetAllMocks();
    });

    it("Should have an instance of the notebooks controller", () => {
      expect(application).toBeDefined();
    });

    it("The controller should create a new notebook for the Pedro owner", async () => {
      response = await requestCreateNotebook(baseCreatNotebookData).expect(201);
    });

    it("The controller should return error 400 with 'name is required' for blank notebook name", async () => {
      const blankNameReques: CreateNotebookDTO = {
        name: "",
        owner: "TiiredOfWriting",
      };

      await requestCreateNotebook(blankNameReques).expect(400);
    });
    
    it("The controller should return error 400 with 'name is required' for null notebook name", async () => {
      const blankNameReques = {
        name: null,
        owner: "TiiredOfWriting",
      } as unknown;

      await requestCreateNotebook(blankNameReques as CreateNotebookDTO).expect(400);
    });
    
    it("The controller should return error 400 with 'Owner is required' for blank notebook owner", async () => {
      const blankNameReques: CreateNotebookDTO = {
        name: "Orphanage",
        owner: "",
      };

      await requestCreateNotebook(blankNameReques).expect(400);
    });
    
    it("The controller should return error 400 with 'Owner is required' for null notebook owner", async () => {
      const blankNameReques = {
        name: "Dont Know Owner",
        owner: null,
      } as unknown;

      (await requestCreateNotebook(blankNameReques as CreateNotebookDTO).expect(400));
    });
  });

  describe("Notebook Get Owner Behavior", () => {

    it.todo("Shoudl return notebook owner with id ...")

  })
});
