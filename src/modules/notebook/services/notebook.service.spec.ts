import { CreateNotebookDTO, INotebookService, Notebook } from "../notebook.interfaces";
import { NotebookService } from "./notebook.service";
import { NotebookRepository } from "../repositories/notebook.repository";

jest.mock("../repositories/notebook.repository");

const mockNotebookRepository: Notebook[] = [
  
];

const mockNotebookCreation = jest
    .spyOn(NotebookRepository.prototype, 'createNotebook')
    .mockImplementation(async (notebookDto) => {
        return new Promise((resolver) => {
            setTimeout(() => {
                const newNotebook: Notebook = {
                    id: '1',
                    name: notebookDto.name,
                    owner: notebookDto.owner
                } as Notebook
                mockNotebookRepository.push(newNotebook)
                resolver(newNotebook)
            },200)
        })
    })
let notebookRepository: NotebookRepository;
let notebookService: INotebookService

beforeEach(() => {
    notebookRepository = new NotebookRepository();
    notebookService = new NotebookService(notebookRepository);
});

describe("Notebook Service", () => {
  it("Should create a empty instance of notebook service", () => {
    expect(notebookService).toBeDefined();
  });

  it('Should insert one new notebook on the repository',async () => {

    const newNotebook: CreateNotebookDTO = {
        name: "Testing Subjects",
        owner: "Pedro"
    }
    const createdNotebook = await notebookRepository.createNotebook(newNotebook)

    expectNewNotebookToBeReturned(newNotebook, createdNotebook);

    expect(mockNotebookCreation).toHaveBeenCalled()

  })

});

function expectNewNotebookToBeReturned(newNotebook: CreateNotebookDTO, createdNotebook: Notebook) {
    expect(createdNotebook).toHaveProperty('id');
    expect(createdNotebook.id).toBe('1');
    expect(createdNotebook).toHaveProperty('name');
    expect(createdNotebook.name).toBe(newNotebook.name);
    expect(createdNotebook).toHaveProperty('owner');
    expect(createdNotebook.owner).toBe(newNotebook.owner);
}

