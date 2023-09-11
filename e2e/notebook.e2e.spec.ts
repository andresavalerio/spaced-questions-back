import request from "supertest";
import application from "../src/application";
import { CreateNotebookDTO } from "../src/interfaces/notebook.interface";

describe("NotebookRoute (e2e)", () => {
  const createNotebookData: CreateNotebookDTO = {
    username: "pimpim",
    notes: "content",
    title: "notebook",
  };

  it("should create notebook", () => {
    return request(application)
      .post("/api/notebook")
      .send(createNotebookData)
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBeDefined();
      });
  });

  it("should not create notebook", () => {
    return request(application)
      .post("/api/notebook")
      .send({ ...createNotebookData, username: "" })
      .expect(400);
  });
});
