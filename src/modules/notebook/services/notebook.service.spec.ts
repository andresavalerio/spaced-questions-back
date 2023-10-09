import {
  CreateNotebookDTO,
  INotebookService,
  Notebook,
} from "../notebook.interfaces";
import { NotebookService } from "./notebook.service";
import { NotebookRepository } from "../repositories/notebook.repository";

jest.mock("../repositories/notebook.repository");

let mockNotebookRepository: Notebook[] = [];

const setMockNotebookRepository = () => {
  mockNotebookRepository = [
    {
      id: "2",
      name: "Context to Tests",
      owner: "Pedro",
    } as Notebook,
  ];
};

const mockNotebookCreation = jest
  .spyOn(NotebookRepository.prototype, "createNotebook")
  .mockImplementation(async (notebookDto) => {
    return new Promise((resolver) => {
      setTimeout(() => {
        const newNotebook: Notebook = {
          id: "1",
          name: notebookDto.name,
          owner: notebookDto.owner,
        } as Notebook;
        mockNotebookRepository.push(newNotebook);
        resolver(newNotebook);
      }, 200);
    });
  });

const mockGetNotebooksByOwner = jest
  .spyOn(NotebookRepository.prototype, "getNotebooksByOwner")
  .mockImplementation(async (notebookOwner: string) => {
    return new Promise((resolver) => {
      setTimeout(() => {
        const ownersNotebooks: Notebook[] = mockNotebookRepository.filter(
          (notebook) => (notebook.owner = notebookOwner)
        );
        resolver(ownersNotebooks);
      }, 100);
    });
  });

let notebookRepository: NotebookRepository;
let notebookService: INotebookService;

describe("Notebook Service", () => {
  describe("Creation of Notebook Context", () => {
    beforeEach(() => {
      notebookRepository = new NotebookRepository();
      notebookService = new NotebookService(notebookRepository);
    });

    afterEach(() => {
      setMockNotebookRepository();
    });

    it("Should create a empty instance of notebook service", () => {
      expect(notebookService).toBeDefined();
    });

    it("Should insert one new notebook on the repository", async () => {
      const newNotebook: CreateNotebookDTO = {
        name: "Testing Subjects",
        owner: "Pedro",
      };
      const createdNotebook = await notebookRepository.createNotebook(
        newNotebook
      );

      expectNewNotebookToBeReturned(newNotebook, createdNotebook);

      expect(mockNotebookCreation).toHaveBeenCalled();
    });

    it.skip("Should get an error when the name is blank", async () => {
        const newNotebookWithNoName: CreateNotebookDTO = {
            name: "",
            owner: "Pedro",
          };
        
        const createdNotebook = notebookRepository.createNotebook(
            newNotebookWithNoName
          );

        expect(async() => await createdNotebook).toThrow(Error)

    });
    
    it.skip("Should get an error when the notebook name is blank", async () => {
        const newNotebookWithOutOwner: CreateNotebookDTO = {
            name: "I am an orphan",
            owner: "",
          };
        
        const createdNotebook = notebookRepository.createNotebook(
            newNotebookWithOutOwner
          );

        expect(async() => await createdNotebook).toThrow(Error)

    });
  });

  describe("Getting already existent notebook context", () => {
    beforeEach(() => {
      notebookRepository = new NotebookRepository();
      setMockNotebookRepository();
      notebookService = new NotebookService(notebookRepository);
    });

    it("Gets an already existent notebook", async () => {
      const ownersNotebooks = await notebookRepository.getNotebooksByOwner(
        "Pedro"
      );

      expect(ownersNotebooks).toContainEqual({
        id: "2",
        name: "Context to Tests",
        owner: "Pedro",
      } as Notebook);

      expect(mockGetNotebooksByOwner).toBeCalled();
    });
  });
});

function expectNewNotebookToBeReturned(
  newNotebook: CreateNotebookDTO,
  createdNotebook: Notebook
) {
  expect(createdNotebook).toHaveProperty("id");
  expect(createdNotebook.id).toBe("1");
  expect(createdNotebook).toHaveProperty("name");
  expect(createdNotebook.name).toBe(newNotebook.name);
  expect(createdNotebook).toHaveProperty("owner");
  expect(createdNotebook.owner).toBe(newNotebook.owner);
}
