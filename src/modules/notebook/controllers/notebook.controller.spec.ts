import request from "supertest";
import express, { type Express } from "express";
import { CreateNotebookDTO, INotebookService } from "../notebook.interfaces";
import { NotebookController } from "./notebook.controller";

const baseCreatNotebookData: CreateNotebookDTO = {
  name: "Testing methodology",
  owner: "Pedro",
};

describe("Notebook controler testing", () => {
  
  let response;

  let application: Express;
  let notebookService: INotebookService;
  
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

  describe("Notebook creation controller behavior", () => {

    const requestCreateNotebook = (data: CreateNotebookDTO) =>
      request(application).post("/").send(data);

    it("Should have an instance of the notebooks controller", () => {
      expect(application).toBeDefined();
    });

    it("The controller should create a new notebook for the Pedro owner", async () => {
      jest
        .spyOn(notebookService, "createNotebook")
        .mockImplementation((data) => {
          return data;
        });

      response = requestCreateNotebook(baseCreatNotebookData);

      await response;

      response.then((response) => {
        expect(response.status).toBe(201);
        expect(response).toHaveProperty("body.name", "Testing methodology");
        expect(response).toHaveProperty("body.owner", "Pedro");
      });
      expect(notebookService.createNotebook).lastCalledWith(
        baseCreatNotebookData
      );
    });

    it("The controller should return error 400 with 'name is required' for blank notebook name", async () => {
      const blankNameReques: CreateNotebookDTO = {
        name: "",
        owner: "TiiredOfWriting",
      };

      await requestCreateNotebook(blankNameReques).then((response) => {
        expect(response.status).toBe(400);
        expect(response).toHaveProperty("text", "Name is required");
      });

      expect(notebookService.createNotebook).not.toHaveBeenCalled();
    });

    it("The controller should return error 400 with 'name is required' for null notebook name", async () => {
      const blankNameReques = {
        name: null,
        owner: "TiiredOfWriting",
      } as unknown;

      await requestCreateNotebook(blankNameReques as CreateNotebookDTO).then(
        (response) => {
          expect(response.status).toBe(400);
          expect(response).toHaveProperty("text","Name is required");
        }
      );

      expect(notebookService.createNotebook).not.toHaveBeenCalled();
    });

    it("The controller should return error 400 with 'Owner is required' for blank notebook owner", async () => {
      const blankNameReques: CreateNotebookDTO = {
        name: "Orphanage",
        owner: "",
      };

      await requestCreateNotebook(blankNameReques).then( response => {
        expect(response.status).toBe(400)
        expect(response).toHaveProperty('text','Owner is required')
      });

      expect(notebookService.createNotebook).not.toHaveBeenCalled();
    });

    it("The controller should return error 400 with 'Owner is required' for null notebook owner", async () => {
      const blankNameReques = {
        name: "Dont Know Owner",
        owner: null,
      } as unknown;

      await requestCreateNotebook(blankNameReques as CreateNotebookDTO).then( response => {
        expect(response.status).toBe(400);
        expect(response).toHaveProperty('text', 'Owner is required')
      });

      expect(notebookService.createNotebook).not.toHaveBeenCalled();
    });
  });

  describe("Notebook Get Owner Behavior", () => {
    it("Should return notebook owner with id ...", () => {
      
    });
  });
});
