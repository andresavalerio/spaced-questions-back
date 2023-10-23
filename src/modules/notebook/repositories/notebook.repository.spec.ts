import { NotebookRepository } from "./notebook.repository"

describe('Notebook repository tests',() =>{
    it('Should be defined a instance of the user repository', () =>{
        let notebooksRepositories = new NotebookRepository();
        expect(notebooksRepositories).toBeDefined(); 
    })
})