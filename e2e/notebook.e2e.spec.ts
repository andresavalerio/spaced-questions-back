import { type Express } from "express";
import request from "supertest";
import { createApplication } from "../src/application";
import { CreateNotebookDTO } from "../src/interfaces/notebook.interface";

describe("NotebookRoute (e2e)", () => {
  let application: Express;

  const createNotebookData: CreateNotebookDTO = {
    username: "pimpim",
    notes: "content",
    title: "notebook",
  };

  beforeAll(async () => {
    application = await createApplication();
  });

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
